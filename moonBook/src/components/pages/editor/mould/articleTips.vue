<template>
  <div class="article-tips">
    <div class="add">
      <div class="insert">
        <i class="iconfont" @click="tipsShow">&#xe728;</i>
      </div>
    </div>

    <div class="list flex flex-align" v-show='isTipsShow'>
      <div class="icon-item" v-for='(item,itemIndex) in tipsList' :key="itemIndex" @click="select(item)">
        <div class="iconfont" :class="item.icon"></div>
        <span>{{item.name}}</span>
      </div>
    </div>
    
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead"/>
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>
  </div>
</template>
<script>
import axios from './../../../lib/js/api'
import { compress,checkHtml } from './../../../lib/js/util'

export default {
  name: 'article-tips',
  props: ['addTop', 'addBottom'],
  data() {
    return {
      isTipsShow: true,
      ossSign:'',
      percent: 0,
      photoLength:0,
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
      grapicData:{
          text:'',
          photos:[]
      }
    }
  },
  created () {
    this.fetchData()  
  },
  watch: {
    '$router': 'fetchData'  
  },
  methods: {
    fetchData(){
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    tipsShow() {
      this.isTipsShow = !this.isTipsShow
    },
    select(item){
        switch(item.index){
            case 0:
                this.$refs.selectPhoto.$refs.input.click()
            break
            case 1:
                this.$router.push({
                    name:'publishing',
                    query:{
                        id: this.$route.query.id,
                        back: this.$route.query.back
                    }
                })
            break
            case 2:
                this.$refs.selectFileVideo.click()
            break
        }

        this.isTipsShow = false
    },
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
    doUpload(){
      let file = e.target.files[0]
      let type = e.target.dataset.type
      this.upOssMedia(type, file)
    },
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
        }
      }).then(() => {
        this.grapicData.photos.push({
          is_audio: type == 'audio' ? 1 : 0,
          is_video: type == 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`,
          height: 0,
          width: 0
        })

        this.percent = 0

        this.$emit('upLoandData',this.grapicData)
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
        this.percent = 0

        this.$emit('upLoandData',this.grapicData)
      })
    }
  }
}
</script>
<style scoped>
.icon-tupian::before {
  content: '\e643';
}

.icon-shipin::before{
    content: '\e611'
}

.icon-wenzi::before{
    content: '\e642'
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

.list {
  position: absolute;
  width: 11.25rem /* 180/16 */;
  height: 3.625rem /* 58/16 */;
  left: 50%;
  z-index: 10;
  background: #fff;
  transform: translate3d(-50%, 0, 0);
  border-radius: .5rem /* 8/16 */;
  box-shadow: 0 .3125rem /* 5/16 */ .9375rem /* 15/16 */ rgba(0,0,0,.2)
}

.list::before{
    content:'';
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

.list .icon-item{
    flex: 1;
    text-align: center;
}

.list .icon-item .iconfont{
    font-size: 1.5rem /* 24/16 */;
}

.list .icon-item span{
    font-size: .875rem /* 14/16 */;
}
</style>

