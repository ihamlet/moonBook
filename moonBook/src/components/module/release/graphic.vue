<template>
  <div class="graphic">
    <van-progress :percentage="process" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <van-nav-bar title="发布" left-text="取消" @click-left="onClickLeft" @click-right="onClickRight">
      <div class="head-bar-btn theme-color" slot="right">
        <i class="iconfont">
          &#xe72c;
        </i>
        发布
      </div>
    </van-nav-bar>
    <div class="textarea-module">
      <van-cell-group>
        <van-field class="theme-textarea" v-model="grapicData.text" type="textarea" placeholder="说些什么？不妨分享最近看的书 (∩_∩)"
          rows="4" autosize />
        <div class="media flex flex-align">
          <div class="theme-color" v-for='(list,index) in mediaContent' :key="index">
            <div class="file-name">
              <i class="iconfont clear-file" @click="deletePhoto(index)">&#xe683;</i>
              <i class="iconfont">&#xe61f;</i>
              {{list.name}}
            </div>
          </div>
        </div>
        <van-cell>
          <div class="flex flex-align">
            <div class="upload-media flex flex-align">
              <div class="btn-video" @click="uploadVideo">
                <i class="iconfont">&#xe625;</i>
              </div>
              <div class="btn-audio" @click="uploadAudio">
                <i class="iconfont">&#xe627;</i>
              </div>
            </div>
            <div class="topic theme-color" @click="toTopicPage">
              #选择话题
            </div>
            <div class="text-length" :class="[grapicData.text.length>140?'danger':'']" v-if='grapicData.text.length>0'>{{grapicData.text.length}}</div>
          </div>
        </van-cell>
        <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
        <input type="file" accept="audio/*" capture="microphone" ref='fileAudio' data-type='audio' hidden @change='doUpload'>
      </van-cell-group>
      <van-checkbox-group v-model="result">
        <div class="form-title">同步到</div>
        <van-cell-group>
          <van-cell v-for="(item,index) in resultList" clickable :key="index" :title="item.title" @click="toggle(index)">
            <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div class="upload-module flex wrap">
      <van-cell>
        <van-row gutter="2">
          <van-col :span="8" v-for='(item,index) in grapicData.photos' :key="index">
            <div class="preview img-grid" v-lazy:background-image='item.thumb' :class="[item.thumb?'transparent':'']">
              <i class="iconfont" @click="deletePhoto(index)">&#xe683;</i>
            </div>
          </van-col>
          <van-col :span="8" v-if='9 > imagesLength'>
            <van-uploader class="img-grid" :after-read="onRead" multiple>
              <div class="photo-upload">
                <i class="iconfont">&#xe607;</i>
              </div>
            </van-uploader>
          </van-col>
        </van-row>
      </van-cell>
    </div>
    <van-popup class="page-popup-layer" position="bottom" v-model="show">
      <topic-list />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import topicList from './topicList'
import { compress } from './../../lib/js/util.js'

export default {
  name: 'graphic',
  components: {
    topicList
  },
  computed: {
    imagesLength() {
      return this.grapicData.photos.length
    }
  },
  data() {
    let self = this
    return {
      result: [],
      resultList: '',
      show: false,
      grapicData: {
        text: '',
        photos: []
      },
      ossSign: '',
      mediaContent: [],
      process: 0,
      photoLength: 0
    }
  },
  created() {
    this.fetchData().then(this.getOssSign)
  },
  watch: {
    grapicData: {
      handler(val) {
        if (val.text.match('#')) {
          this.show = true
        }
      },
      deep: true
    },
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      return axios.get('/book/memberUser/getInfo').then(res => {
        console.log('/book/memberUser/getInfo 需要给我当前宝贝ID，名字', res)

        let array = []

        array.push({
          title: '发现',
          name: 'find'
        })

        if (res.data.child_id > 0) {
          array.push({
            title: `${res.data.child_name}@宝贝主页`,
            name: 'baby-home'
          })
        }
        if (res.data.banji_id > 0) {
          array.push({
            title: `${res.data.child_name}@${res.data.banji_name}班`,
            name: 'class-zoom'
          })
        }
        this.resultList = array

        array.forEach(e => {
          this.result.push(e.name)
        })
      })
    },
    onRead(file) {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      let array = []

      if (!file.length) {
        array.push(file)
      } else {
        array = file
      }

      array.forEach(element => {
        if (this.photoLength < 9) {
          this.photoLength++
          this.grapicData.photos.isLoading = true
          compress(element.content, 500, 0.618, 'blob').then(val => {
            val.toBlob((blob) => {
              let fd = new FormData()
              fd.append('file', blob, element.file.name)
              axios.post('/book/file/upload', fd, config).then((res) => {
                console.log('upload', res)
                if (res.data.status === 1) {
                  this.grapicData.photos.push({
                    photo: res.data.data.path,
                    thumb: res.data.data.thumb,
                    isLoading: false
                  })
                } else {
                  this.$toast.fail('上传失败,请重新上传')
                }
              })
            })
          })
        } else {
          this.$dialog.alert({
            message: `<div class='text-center'>最多只能上传9张图片</div>`
          })
        }
      })

    },
    onClickLeft() {
      this.$emit('close')
    },
    onClickRight() {
      if (!this.grapicData.text.length && !this.grapicData.photos.length) {
        this.$emit('close')
      } else if (this.grapicData.text.length < 140) {
        let data = {
          details: this.grapicData.text,
          template_id: 1,
          photos: this.grapicData.photos
        }

        this.result.forEach(e => {
          if (e == 'find') {
            data.to_school = 1
          }

          if (e == 'class-zoom') {
            data.to_banji = 1
          }

          if (e == 'baby-home') {
            data.to_baby = 1
          }
        })

        axios.post(`/book/SchoolArticle/edit?ajax=1`, data).then(res => {
          this.$emit('close')
          this.$router.push({ name: this.result[0] })
        })
      }
    },
    deletePhoto(index) {
      this.grapicData.photos.splice(index, 1)
      this.mediaContent.splice(index, 1)
      this.photoLength--
    },
    toTopicPage() {
      this.show = true
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    uploadVideo() {
      this.$refs.fileVideo.click()
    },
    uploadAudio() {
      this.$refs.fileAudio.click()
    },
    getOssSign() {
      axios.get('/book/api/oss_sign').then(res => {
        console.log(res)
        this.ossSign = res.data.data
      })
    },
    doUpload(e) {
      let file = e.target.files[0]
      let type = e.target.dataset.type
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
          thumb: ''
        })
        this.mediaContent.push({
          name: file.name,
          type: type
        })

      })
    }
  }
}
</script>
<style scoped>
.bar {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
}

.text-length.danger {
  color: #f56c6c;
}

.photo-upload {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.photo-upload i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #c0c4cc;
}

.preview {
  position: relative;
}

.preview i.iconfont {
  position: absolute;
  right: 0.3125rem /* 5/16 */;
  top: 0.3125rem /* 5/16 */;
  font-size: 1.5rem /* 24/16 */;
  color: #f44336;
}

.btn-video,
.btn-audio {
  width: 3rem /* 48/16 */;
  height: 3rem /* 48/16 */;
  text-align: center;
  line-height: 3rem /* 48/16 */;
}

.btn-video i.iconfont,
.btn-audio i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.btn-video i.iconfont {
  background: linear-gradient(90deg, #ff765c, #ff23b3);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.3125rem /* 5/16 */ #ff2383;
}

.btn-audio i.iconfont {
  background: linear-gradient(90deg, #00c2ab, #3e94ff);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.3125rem /* 5/16 */ #3e94ff;
}

.upload-media {
  flex: 5;
}

.topic {
  flex: 2;
  text-align: center;
}

.text-length {
  flex: 1;
  text-align: center;
}

.media {
  font-size: 0.75rem /* 12/16 */;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  position: relative;
}

.media div {
  margin-right: 0.625rem /* 10/16 */;
}

.file-name {
  position: relative;
}

.file-name .clear-file {
  position: absolute;
  right: -0.9375rem /* 15/16 */;
  top: -0.3125rem /* 5/16 */;
  color: #f44336;
}

.progress {
  padding: 0.625rem /* 10/16 */;
}
</style>
