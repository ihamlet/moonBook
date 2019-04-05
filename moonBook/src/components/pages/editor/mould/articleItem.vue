<template>
  <div class="article-item">
    <van-cell>
      <van-row gutter="10">
        <van-col span="6">
          <div class="img-grid" @click="onClick">
            <div class="photo" v-if='item.photos'>
              <img :src="item.photos.thumb" alt="" srcset="">
            </div>
          </div>
        </van-col>
        <van-col span="16">
          <div class="text-box" @click="toPublishing">
            <div class="text-content" v-if='item.text' v-html="item.text" v-line-clamp:20="3"></div>
            <div class="add-text" v-else>
              <div class="description">点击添加文字</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-cell>

    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>

  </div>
</template>
<script>
import axios from './../../../lib/js/api.js'
import Publishing from './../Publishing'
import { compress, checkHtml } from './../../../lib/js/util'
import { mapActions, mapState, mapMutations } from 'vuex'
 
export default {
  name: 'article-item',
  props:{
    item:{
      type: Object,
      default:{
        index: 0,
        photos: {},
        text: ''
      }
    },
    index:{
      required: true,
      type: Number
    },
    ossSign:{
      required: true,
      type: Object,
      default:{}
    }
  },
  components: {
    Publishing
  },
  computed: {
    ...mapState('beautifulArticle',['ready']),
    ...mapState('openWX', ['ready', 'imgList']),
  },
  data() {
    return {
      show: false,
      video:{}
    }
  },
  watch: {
    imgList(val){
      let data = {
        index: this.index,
        photos: val
      }

      this.change(data)
    }
  },
  methods: {
    ...mapActions('beautifulArticle',['change','requestPercent']),
    ...mapActions('openWX', ['selectImg']),
    ...mapMutations('openWX', ['clearImg']),
    toPublishing() {
      this.$router.push({
        name: 'publishing',
        query: {
          index: this.index,
          onClickType:'change',
          back: this.$route.query.back,
          id: this.$route.query.id
        }
      })
    },
    onClick(){
      if(this.item.type == 'video'){
        this.$refs.selectFileVideo.click()
      }else{
        if (this.ready) {
          this.clearImg()
          this.selectImg(1)
        } else {
          this.$refs.selectPhoto.$refs.input.click()
        }
      }
    },
    onRead(file) {
      let array = []
      array.push(file)
      array.forEach(element => {
        compress(element.content, 1200, 0.8, 'blob').then(val => {
          val.toBlob((blob) => {
            this.upOssPhoto(blob, element.file, element.content)
          })
        })
      })
    },
    doUpload(e){
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
        this.video = {
          thumb: info.thumb,
          height: info.height,
          width: info.width,
          rotate: info.rotate,
          duration: Math.floor(info.duration) || 10
        }
        this.upOssMedia(type, file)
        this.percent = 0
      })
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
          this.requestPercent(this.percent)
        }
      }).then((res) => {
        this.video.is_audio =  type == 'audio' ? 1 : 0
        this.video.is_video =  type == 'video' ? 1 : 0
        this.video.photo = path
        this.change(this.video)
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

        let data = {
          index: this.index,
          photos:{
            photo: path,
            is_audio: 0,
            is_video: 0,
            thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
            height: img.height || 0,
            width: img.width || 0
          }
        }

        this.change(data)

        this.requestPercent(0)
        this.percent = 0
      })
    }
  }
}
</script>
<style scoped>
.article-item {
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
}

.img-grid {
  background: #f2f2f2;
  margin-top: 0;
}

.photo img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.add-text {
  width: 100%;
  font-size: 1rem /* 16/16 */;
  color: #c0c4cc;
}
</style>
