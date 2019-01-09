<template>
  <div class="publishing">
    <van-progress v-if='process > 0' :percentage="process" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <van-nav-bar title="发布长文" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="edit-title">
        <van-cell-group>
          <van-field v-model="grapicData.title" placeholder="文章标题" rows="1" />
        </van-cell-group>
      </div>
      <div class="edit-content">
        <quill-editor ref='myQuillEditor' v-model="grapicData.content" :options="editorOption" />
      </div>
    </div>

    <div class="file-manager">
      <div class="scroll-x">
        <div class="file-list flex">
          <div class="file-img scroll-item" v-for='(item,index) in grapicData.photos' :key="index">
            <div class="preview img-grid" :class="[item.thumb?'transparent':'']" @click="select(item,index)">
              <img :src="item.thumb" />
            </div>
            <i class="iconfont" @click="deletePhoto(index)">&#xe683;</i>
          </div>
        </div>
      </div>
    </div>

    <van-actionsheet v-model="UploadTypeShow" :actions="uploadType" cancel-text="取消" @select="onUploadTypeSelect"
      @cancel="UploadTypeShow = false" />

    <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
    <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
  </div>
</template>
<script>
import axios from './lib/js/api'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { compress } from './lib/js/util'

export default {
  name: 'publishing',
  components: {
    quillEditor
  },
  data() {
    return {
      ossSign: '',
      process: 0,
      UploadTypeShow: false,
      grapicData: {
        title: '',
        content: '',
        photos: []
      },
      uploadType: [{
        name: '从手机选择图片',
        type: 'photo',
        index: 0,
      }, {
        name: '上传视频',
        type: 'fileVideo',
        index: 1,
      }, {
        name: '拍摄视频',
        type: 'uploadVideo',
        index: 2,
      }],
      editorOption: {
        placeholder: '输入正文',
        modules: {
          toolbar: [
            ['bold', 'italic', 'image', 'video'],
            [{ list: 'ordered' }, { list: "bullet" }],
            ['blockquote']
          ]
        }
      }
    }
  },
  mounted() {
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
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
    onClickLeft() {
      this.$router.push({
        name: 'home'
      })
    },
    deletePhoto(index) {
      this.grapicData.photos.splice(index, 1)
    },
    imgHandler() {
      this.UploadTypeShow = true
    },
    videoHandler() {
      this.UploadTypeShow = true
    },
    onUploadTypeSelect(item) {
      switch (item.index) {
        case 0:
          this.$refs.selectPhoto.$refs.input.click()
          break;
        case 1:
          this.$refs.selectFileVideo.click()
          break;
        case 2:
          this.$refs.fileVideo.click()
          break;
      }

      this.UploadTypeShow = false
    },
    onRead(file) {
      console.log(file)
      let array = []
      if (file.length) {
        array = file
      } else {
        array.push(file)
      }
      array.forEach(element => {
        this.grapicData.photos.isLoading = true
        compress(element.content, 1200, 0.8, 'blob').then(val => {
          val.toBlob((blob) => {
            this.upOssPhoto(blob, element.file, element.content)
          })
        })
      })
    },
    select(item, index) {
      let addRange = this.$refs.myQuillEditor.quill.getSelection()
      this.$refs.myQuillEditor.quill.insertEmbed(addRange !== null ? addRange.index : 0, 'image', item.photo)
      this.$refs.myQuillEditor.quill.setSelection(addRange.index + 1)
    },
    doUpload(e) {
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
          let percent = 100 * (p.loaded / p.total)
          this.process = percent
        }
      }).then((res) => {
        this.process = 0
        this.grapicData.photos.push({
          media: true,
          is_audio: type === 'audio' ? 1 : 0,
          is_video: type === 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-process=video/snapshot,t_13000,f_jpg,w_0,h_0,m_fast`
        })
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
          let percent = 100 * (p.loaded / p.total)
          this.process = percent
        }
      }).then((res) => {
        this.process = 0
        this.grapicData.photos.push({
          photo: path,
          thumb: `${path}?x-oss-process=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0,
          isLoading: false
        })
      })
    }
  }
}
</script>
<style scoped>
.publishing {
  background: #fff;
  min-height: 100vh;
}

.file-list {
  padding-left: 0.625rem /* 10/16 */;
}

.img-grid {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  margin-right: 0.625rem /* 10/16 */;
  overflow: hidden;
  padding-bottom: 0;
  position: relative;
}

.img-grid img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.file-img {
  position: relative;
}

.file-img i.iconfont {
  position: absolute;
  right: 0;
  top: -.3125rem /* 5/16 */;
  font-size: 1.5rem /* 24/16 */;
  color: red;
  z-index: 9;
}
</style>
<style>
.edit-title .van-field__control {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.ql-toolbar.ql-snow {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  border-top: 0.0625rem /* 1/16 */ solid #ebeef5;
  border-left: none;
  border-right: none;
  border-bottom: none;
  z-index: 10;
}

.publishing .ql-container.ql-snow {
  border: none;
}
</style>

