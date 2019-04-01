<template>
  <div class="article-card">
    <draggable v-model="articleList" handle='.handle'>
      <div class="item" v-for='(item,index) in articleList' :key="index" ref='articleDom'>
        <div class="add" v-if='index == 0' @click="setAddIndex(index)">
          <div class="insert">
            <i class="iconfont">&#xe728;</i>
          </div>
        </div>
        <div class="card-item" v-if='item.photos || item.text'>
          <articleItem :item='item' :index='item.index' :ossSign='ossSign'/>
          <div class="add" @click="setAddIndex(index+1)">
            <div class="insert">
              <i class="iconfont">&#xe728;</i>
            </div>
          </div>
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
      </div>
    </draggable>

    <transition leave-active-class="bounceOut" enter-active-class="bounceIn">
      <div class="icon-list flex flex-align" v-show='isTipsShow' :style="{top:domTop + 'px'}">
        <div class="icon-item" v-for='(item,itemIndex) in tipsList' :key="itemIndex" @click="select(item)">
          <div class="iconfont" :class="item.icon"></div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </transition>

    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>

    <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
  </div>
</template>

<script>
import axios from './../../../lib/js/api'
import { compress, checkHtml } from './../../../lib/js/util'
import draggable from 'vuedraggable'
import articleItem from './articleItem'
import { mapActions,mapMutations, mapGetters, mapState } from 'vuex'

export default {
  name: 'article-card',
  components: {
    articleItem,
    draggable
  },
  computed: {
    ...mapState('beautifulArticle', ['articleItem']),
    ...mapState('openWX', ['ready', 'imgList']),
    articleList: {
      get() {
        return this.articleItem
      },
      set(value) {
        this.drag(value)
      }
    },
    cardList(){
      let array = []
      this.grapicData.photos.forEach((e, i) => {
        array.push({
          type: e.is_video == 0?'image':'video',
          index: i,
          photos: e
        })
      })

      return array
    }
  },
  data() {
    return {
      ossSign: '',
      percent: 0,
      photoLength: 0,
      addIndex: 0,
      tipsList: [{
        type: 'images',
        icon: 'icon-tupian',
        name: '图片',
        index: 0
      }, {
        type: 'text',
        icon: 'icon-wenzi',
        name: '文字',
        index: 1
      }, {
        type: 'video',
        icon: 'icon-shipin',
        name: '视频',
        index: 2
      }],
      isTipsShow: true,
      grapicData: {
        photos: []
      },
      domTop: 40
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData',
    cardList(val){
      this.add(val)
      this.photoLength = 0
    },
    imgList:{
      handler(val) {
        this.grapicData.photos = val
        this.photoLength = val.length
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('beautifulArticle', ['add', 'revise', 'delete', 'requestPercent','drag']),
    ...mapMutations('beautifulArticle',['setIndex']),
    ...mapActions('openWX', ['selectImg']),
    fetchData() {
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },    
    setAddIndex(index){
      this.setIndex(index)
      this.$refs.articleDom.forEach((e,i)=>{
        if(i == index){
          this.domTop = e.offsetTop == 0?40:e.offsetTop
        }
      })
    },
    deleteArticle(index) {
      this.delete(index)
    },
    select(item) {
      switch (item.index) {
        case 0:
          if (this.ready) {
            this.selectImg(9)
          } else {
            this.$refs.selectPhoto.$refs.input.click()
          }
          break
        case 1:
          this.$router.push({
            name: 'publishing',
            query: {
              index: this.articleItem.length,
              back: this.$route.query.name,
              back_name: this.$route.query.back_name,
              id: this.$route.query.id,
              onClickType: 'revise'
            }
          })
          break
        case 2:
          this.$refs.selectFileVideo.click()
          break
      }
    },
    // 方法调用
    onRead(file) {
      let array = []
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
              this.upOssPhoto(blob, element.file, element.content)
            })
          })
        } else {
          this.$dialog.alert({
            message: `<div class='text-center'>最多只能上传9张图片</div>`
          })
        }
      })
    },
    doUpload(e) {
      let file = e.target.files[0]
      let type = e.target.dataset.type
      let formData = new FormData()
      let maxSize = 1024 * 1024 * 3
      let blob = file.slice(0, maxSize)

      formData.append('file', blob, file.name)

      let url = '/book/file/get_video_screen'

      axios({
        url: url,
        data: formData,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
          this.requestPercent(this.percent)
        }
      }).then(res => {
        let info = res.data.data
        this.grapicData.photos.push({
          thumb: info.thumb,
          height: info.height,
          width: info.width,
          rotate: info.rotate,
          duration: Math.floor(info.duration) || 10
        })
        this.upOssMedia(type, file)
        this.percent = 0
      })
    },
    //上传
    upOssMedia(type, file) {
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
      }).then((res) => {
        this.grapicData.photos[this.grapicData.photos.length-1].is_audio =  type == 'audio' ? 1 : 0
        this.grapicData.photos[this.grapicData.photos.length-1].is_video =  type == 'video' ? 1 : 0
        this.grapicData.photos[this.grapicData.photos.length-1].photo = path
        this.requestPercent(0)
        this.percent = 0
      })
    },
    upOssPhoto(blob, file, base64) {
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

        this.grapicData.photos.push({
          photo: path,
          is_audio: 0,
          is_video: 0,
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0
        })

        this.requestPercent(0)
        this.percent = 0
      })
    }
  }
}
</script>
<style scoped>
.item {
  position: relative;
}

.operation {
  width: 2.1875rem /* 35/16 */;
  text-align: center;
  position: absolute;
  top: 0.625rem /* 10/16 */;
  right: 0;
}

.operation .delete {
  margin-bottom: 0.625rem /* 10/16 */;
}

.icon-list {
  position: absolute;
  width: 11.25rem /* 180/16 */;
  height: 3.625rem /* 58/16 */;
  left: 50%;
  z-index: 10;
  background: #fff;
  margin-left: -5.625rem /* 90/16 */;
  border-radius: 0.5rem /* 8/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.2);
}

.icon-list::before {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 12px;
  border-color: transparent transparent #fff transparent;
  width: 0px;
  height: 0px;
  left: 50%;
  top: -1.25rem /* 20/16 */;
  transform: translate3d(-50%, 0, 0);
  z-index: 9;
}

.icon-list .icon-item {
  flex: 1;
  text-align: center;
}

.icon-list .icon-item .iconfont {
  font-size: 1.5rem /* 24/16 */;
}

.icon-list .icon-item span {
  font-size: 0.875rem /* 14/16 */;
}

.icon-tupian::before {
  content: '\e643';
}

.icon-shipin::before {
  content: '\e611';
}

.icon-wenzi::before {
  content: '\e642';
}

.add {
  height: 2.5rem /* 40/16 */;
  line-height: 2.5rem /* 40/16 */;
  width: 100%;
  text-align: center;
  position: relative;
}

.add .iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #c0c4cc;
}

.card-item {
  position: relative;
}
</style>
