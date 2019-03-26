<template>
  <div class="article-card">
    <van-progress v-if='PercentNum!=0&&PercentNum!=100' :percentage="PercentNum" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <div class="article-item">
      <articleTips @onRead='onRead' @doUpload='doUpload' :index='0'/>
      <draggable v-model="articleList" handle='.handle'>
        <div class="item" v-for='(item,index) in articleList' :key="index">
          <articleItem :item='item' :index='index' :type='upLoadType' @onRead='onRead' @doUpload='doUpload'/>
          <articleTips @onRead='onRead' @doUpload='doUpload' :index='index+1'/>

          <!-- 删除排序 -->
          <div class="operation">
            <div class="delete" @click="deleteArticle(index)">
              <i class="iconfont">&#xe651;</i>
            </div>
            <div class="sort handle">
              <i class="iconfont">&#xe68d;</i>
            </div>
          </div>

        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import axios from './../../../lib/js/api'
import { compress,checkHtml } from './../../../lib/js/util'
import draggable from 'vuedraggable'
import articleItem from './articleItem'
import articleTips from './articleTips'
import { mapActions,mapGetters } from 'vuex'

export default {
  name: 'article-card',
  props: ['PercentNum'],
  components: {
    articleTips,
    articleItem,
    draggable
  },
  computed: {
    ...mapGetters('beautifulArticle',['getArticleList']),
    articleList:{
      get(){
        return this.getArticleList
      },
      set(value){
        this.upDataList(value)
      }
    }
  },
  data() {
    return {
      percent: 0,
      ossSign:'',
      percent: 0,
      photoLength:0,
      photo:'',
      upLoadType:'image',
      mediaInfo:'',
      handle:'',
      loop: null,
      flag:true
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('beautifulArticle',['add','revise','requestPercent','delete','upDataList']),
    // 置底滚动位置
    scroll(){
        this.$nextTick(() => {
          let scrollHeight = document.documentElement.scrollHeight
          document.documentElement.scrollTop  = scrollHeight
        })
    },
    fetchData() {
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    deleteArticle(index){
      this.delete(this.getArticleList[index])
    },
    // 方法调用
    onRead(data) {
      this.upLoadType = data.upLoadType
      let file = data.file
      let index = data.index
      let array = []
      let onClickType = data.onClickType
      
      if (file.length) {
        array = file
      } else {
        array.push(file)
      }

      array.forEach(element => {
        if (this.photoLength < 9) {
          this.photoLength++
          compress(element.content, 1200, 0.8, 'blob').then(val => {
            val.toBlob((blob) => {
              this.upOssPhoto(blob, element.file, element.content, index,onClickType)
            })
          })
        } else {
          this.$dialog.alert({
            message: `<div class='text-center'>最多只能上传9张图片</div>`
          })
        }
      })
    },
    doUpload(data) {
      let file = data.file
      let type = data.type
      let index = data.index
      this.upLoadType = data.upLoadType
      let onClickType = data.onClickType

      let formData = new FormData()
      let maxSize = 1024 * 1024 * 3
      let blob = file.slice(0, maxSize)

      formData.append('file',blob,file.name)

      let url = '/book/file/get_video_screen'

      axios({
        url: url,
        data: formData,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then( res => {
        this.mediaInfo = res.data.data
        this.upOssMedia(type, file, index, onClickType)
      })

      this.percent = 0
    },

    //上传
    upOssMedia(type, file, index,onClickType) {
      if (!this.ossSign) {
        alert('未能获取上传参数')
      }

      let url = this.ossSign.host.replace('http:', 'https:')
      let data = new FormData()
      let key = this.ossSign.dir + '/' + Date.now() + file.name
      let path = url + '/' + this.ossSign.dir + '/' + Date.now() + file.name

      data.append('key', key)
      data.append('OSSAccessKeyId', this.ossSign.accessid)
      data.append('policy', this.ossSign.policy)
      data.append('success_action_status', 200)
      data.append('signature', this.ossSign.signature)
      data.append('file', file)

      axios({
        url: url,
        data: data,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
          this.requestPercent(this.percent)
        }
      }).then(() => {
        let data = {
          is_audio: type == 'audio' ? 1 : 0,
          is_video: type == 'video' ? 1 : 0,
          photo: path,
          thumb: this.mediaInfo?this.mediaInfo.thumb:`${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`,
          height: 0,
          width: 0,
          type:'video',
          index:index
        }

        if(onClickType){
          let reviseData = {
            index:index,
            data:data
          }

          this.revise(reviseData)
        }else{
          this.add(data)
        }
  
        this.percent = 0
        this.scroll()
        this.requestPercent(0)
      })
    },
    upOssPhoto(blob, file, base64, index,onClickType) {
      let img = new Image()
      img.src = base64

      let fd = new FormData()
      let url = this.ossSign.host.replace('http:', 'https:')
      let key = this.ossSign.dir + '/' + Date.now() + file.name
      let path = url + '/' + this.ossSign.dir + '/' + Date.now() + file.name

      fd.append('key', key)
      fd.append('OSSAccessKeyId', this.ossSign.accessid)
      fd.append('policy', this.ossSign.policy)
      fd.append('success_action_status', 200)
      fd.append('signature', this.ossSign.signature)
      fd.append('file', blob, file.name)

      axios({
        url: url,
        data: fd,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
          this.requestPercent(this.percent)
        }
      }).then(() => {
        let data = {
          photo: path,
          is_audio: 0,
          is_video: 0,
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0,
          type:'image',
          index:index
        }

        if(onClickType){
          let reviseData = {
            index:index,
            data:data
          }
 
          this.revise(reviseData)
        }else{
          this.add(data)
        }

        this.percent = 0
        this.scroll()
        this.requestPercent(0)
      })
    }
  }
}
</script>
<style scoped>
.item{
  position: relative;
}

.operation {
  width: 2.1875rem /* 35/16 */;
  text-align: center;
  position: absolute;
  top: .625rem /* 10/16 */;
  right: 0;
}

.operation .delete {
  margin-bottom: 0.625rem /* 10/16 */;
}
</style>
