<template>
  <div class="graphic">
    <van-nav-bar left-text="取消" @click-left="onClickLeft" :border='false'>
      <div class="user-info" slot='title'>
        <div class="avatar">
          <img :src="getAvatar(userDataState.avatar)" />
        </div>
      </div>
      <div class="head-bar-btn theme-color" slot="right">
        <van-loading color="#409eff" v-if='percent!=0'/>
        <div class="release-btn"  @click="onClickRelease" v-else>
          <i class="iconfont">
            &#xe72c;
          </i>
          发布
        </div>
      </div>
    </van-nav-bar>
    <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <div class="textarea-module">
      <van-cell-group>
        <van-field class="theme-textarea" v-model="grapicData.text" type="textarea" placeholder="记录孩子成长的每一天！" rows="4"
          autosize />
        <van-tag class="tag" type="primary" v-if='cateName'> #{{cateName}}</van-tag>
        <van-cell title-class='theme-color' title="#选择分类" :value="grapicData.text.length>0?grapicData.text.length:''"
          is-link arrow-direction="down" @click="show = true" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="同步到" value-class='cell-value' :value='synchronous' center is-link @click="isResultShow = true" />
      </van-cell-group>
    </div>
    <div class="upload-module flex wrap">
      <van-cell>
        <van-row gutter="4">
          <van-col :span="8" v-for='(item,index) in grapicData.photos' :key="index">
            <div class="preview img-grid" :class="[item.thumb?'transparent':'']">
              <img class="thumb" :src="item.thumb" :large="item.is_video==1?'':item.photo" preview />
              <div class="close-btn" @click="deletePhoto(index)">
                <i class="iconfont">&#xe647;</i>
              </div>
              <van-tag class="type-tag" color="#7232dd" v-if='item.is_video == 1'>视频</van-tag>
            </div>
          </van-col>
          <van-col :span="8" v-if='9 > imagesLength'>
            <div class="img-grid" @click="UploadTypeShow = true">
              <div class="photo-upload">
                <i class="iconfont">&#xe664;</i>
                <span class="directions">照片/视频</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-cell>
    </div>
    <van-popup class="page-popup-layer" position="bottom" v-model="isResultShow" get-container='#app'>
      <van-checkbox-group v-model="result">
        <div class="form-title">同步到</div>
        <van-cell-group>
          <van-cell v-for="(item,index) in resultList" clickable :key="index" :title="item.title" @click="toggle(index)">
            <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' />
    </van-popup>

    <van-actionsheet v-model="actionShow" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="actionShow = false" />
    <van-actionsheet v-model="UploadTypeShow" :actions="uploadType" cancel-text="取消" @select="onUploadTypeSelect" @cancel="UploadTypeShow = false" />

    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
      <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
    </div>

  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapGetters } from 'vuex'
import topicList from './../../module/release/topicList'
import { compress,checkHtml } from './../../lib/js/util'

export default {
  name: 'graphic',
  components: {
    topicList
  },
  computed: {
    ...mapGetters(['userDataState']),
    imagesLength() {
      return this.grapicData.photos.length
    },
    synchronous() {
      let array = []
      this.resultList.forEach(element => {
        this.result.forEach(e => {
          if (e == element.name) {
            array.push(element.title)
          }
        })
      })
      return array.join(',')
    }
  },
  data() {
    let self = this
    return {
      result: [],
      isResultShow: false,
      resultList: '',
      show: false,
      actionShow: false,
      UploadTypeShow: false,
      grapicData: {
        text: '',
        photos: []
      },
      ossSign: '',
      mediaContent: [],
      percent: 0,
      photoLength: 0,
      cateId: '',
      cateName: '',
      actions: [{
        name: '保存草稿',
        type: 'save'
      }, {
        name: '不保存',
        type: 'noSave'
      }],
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
      }]
    }
  },
  created() {
    this.fetchData()
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
    ...mapActions(['getUserData']),
    fetchData() {
      // 从本地存储获取发布数据
      if(this.$route.query.type == 'edit'){
          axios.get(`/book/SchoolArticle/getEdit?post_id=${this.$route.query.post_id}`).then(res => {
            if(res.data.status == 1){
              this.grapicData.photos = res.data.data.photos
              if(checkHtml(res.data.data.details)){
                this.grapicData.text = ''
              }else{
                this.grapicData.text = res.data.data.details
              }
            }
          })
      }else{
        if (localStorage.getItem('grapicData')) {
          this.grapicData = JSON.parse(localStorage.getItem('grapicData'))
        }
      }

      let array = []
      if (this.userDataState.child_id > 0) {
        array.push({
          title: `${this.userDataState.child_name}@主页`,
          name: 'baby-home'
        })
      }
      if (this.userDataState.banji_id > 0) {
        array.push({
          title: `${this.userDataState.child_name}@班级`,
          name: 'class-zoom'
        })
      }
      array.push({
        title: '发现',
        name: 'apps-find'
      })
      this.resultList = array
      array.forEach(e => {
        this.result.push(e.name)
      })
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })

      this.getUserData()
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
          this.grapicData.photos.isLoading = true
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
    onClickLeft() {
      if (!this.grapicData.text.length && !this.grapicData.photos.length) {
        if (this.$route.query.back) {
          this.$router.push({
            name: this.$route.query.back,
            query: {
              id: this.$route.query.id
            }
          })
        } else {
          this.$router.push({
            name: 'home'
          })
        }
      } else {
        this.actionShow = true
      }
    },
    onSelect(item) {
      if (item.type == 'save') {
        localStorage.setItem('grapicData', JSON.stringify(this.grapicData))
        if (this.$route.query.back) {
          this.$router.push({
            name: this.$route.query.back,
            query: {
              id: this.$route.query.id
            }
          })
        } else {
          this.$router.push({
            name: 'home'
          })
        }
        this.actionShow = false
      } else {
        if (this.$route.query.back) {
          this.$router.push({
            name: this.$route.query.back,
            query: {
              id: this.$route.query.id
            }
          })
        } else {
          this.$router.push({
            name: 'home'
          })
        }
        localStorage.setItem('grapicData', '')
        this.actionShow = false
        this.grapicData = {
          text: '',
          photos: []
        }
      }
    },
    onClickRelease() {
      if (!this.grapicData.text.length && !this.grapicData.photos.length) {
        if (this.$route.query.back) {
          this.$router.push({
            name: this.$route.query.back
          })
        } else {
          this.$router.push({
            name: 'home'
          })
        }
      } else if (this.grapicData.text.length < 12000) {
        let data = {
          details: this.grapicData.text,
          template_id: 1,
          photos: this.grapicData.photos,
          cate_id: this.cateId,
          post_id: this.$route.query.post_id || ''
        }

        this.result.forEach(e => {
          if (e == 'apps-find') {
            data.to_school = 1
          }

          if (e == 'class-zoom') {
            data.to_banji = 1
          }

          if (e == 'baby-home') {
            data.to_baby = 1
          }
        })

        axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {
          this.$router.push({
            name: this.result[0],
            query: {
              id: this.result[0] == 'class-zoom' ? this.userDataState.banji_id : this.userDataState.child_id
            }
          })
        })
      }
    },
    deletePhoto(index) {
      this.grapicData.photos.splice(index, 1)
      this.photoLength--
    },
    toTopicPage() {
      this.show = true
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
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
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then((res) => {
        this.grapicData.photos.push({
          is_audio: type == 'audio' ? 1 : 0,
          is_video: type == 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`,
          height: 0,
          width: 0
        })

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
      }).then((res) => {
        this.grapicData.photos.push({
          photo: path,
          is_audio: 0,
          is_video: 0,
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0
        })
        this.percent = 0
      })
    },
    selectTag(tag) {
      this.cateName = tag.cate_name
      this.cateId = tag.cate_id
    },
    getAvatar(img) {
      if (!img) {
        return img
      }

      let pos = img.indexOf('http://')
      let result
      if (pos === 0) {
        result = img.replace('http:', 'https:')
      } else {
        result = img
      }
      return result
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
  top: 56%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  color: #9e9e9e;
  width: 4.375rem /* 70/16 */;
}

.photo-upload i.iconfont,
.photo-upload .directions {
  display: block;
}

.photo-upload i.iconfont {
  font-size: 2.1875rem /* 35/16 */;
}

.photo-upload .directions {
  font-size: 0.8125rem /* 13/16 */;
  margin-top: 0.625rem /* 10/16 */;
}

.preview {
  position: relative;
}

.preview .close-btn {
  width: 1.25rem /* 20/16 */;
  height: 1.25rem /* 20/16 */;
  line-height: 1.25rem /* 20/16 */;
  position: absolute;
  right: 0 /* 5/16 */;
  top: 0 /* 5/16 */;
  text-align: center;
  line-height: 1.25rem /* 20/16 */;
  background: #000;
  color: #fff;
  opacity: 0.5;
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

.progress {
  padding: 0.625rem /* 10/16 */;
}

.user-info .avatar {
  padding: 0.3125rem /* 5/16 */ 0;
}

.user-info .avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
}

.tag {
  margin-left: 0.9375rem /* 15/16 */;
  margin-top: 0.3125rem /* 5/16 */;
}

.img-grid img.thumb {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
}

.type-tag {
  position: absolute;
  bottom: 0.3125rem /* 5/16 */;
  right: 0.3125rem /* 5/16 */;
}

.img-grid{
  background: #f8f8f8;
}
</style>
<style>
.cell-value.van-cell__value {
  flex: 5;
}
</style>

