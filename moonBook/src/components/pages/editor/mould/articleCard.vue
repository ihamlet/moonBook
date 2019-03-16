<template>
  <div class="article-card">
    <div class="article-item">
      <articleTips @onRead='onRead' @doUpload='doUpload' />
      <articleItem v-if='photo || content' :photo='photo' :text='content' @onRead='onRead' :type='upLoadType'/>
    </div>
  </div>
</template>

<script>
import axios from './../../../lib/js/api'
import { compress,checkHtml } from './../../../lib/js/util'
import articleItem from './articleItem'
import articleTips from './articleTips'

export default {
  name: 'article-card',
  props: ['content'],
  components: {
    articleTips,
    articleItem
  },
  data() {
    return {
      sTipsShow: false,
      percent: 0,
      ossSign:'',
      percent: 0,
      photoLength:0,
      photo:'',
      upLoadType:'image'
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    upLoandData(data) {
      this.photo = data.photos[0].photo
    },
    onRead(data) {
      this.upLoadType = data.upLoadType
      let file = data.file
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
    doUpload(data) {
      let file = data.file
      let type = data.type
      this.upLoadType = data.upLoadType
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
        this.photo = {
          is_audio: type == 'audio' ? 1 : 0,
          is_video: type == 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`,
          height: 0,
          width: 0
        }
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

        }
      }).then(() => {
        // 设置localStorage
        this.photo = {
          photo: path,
          is_audio: 0,
          is_video: 0,
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0
        }
        this.percent = 0
      })
    }
  }
}
</script>
<style scoped>
</style>
