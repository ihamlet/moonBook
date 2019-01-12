<template>
  <div class="publishing">
    <van-nav-bar title="文章发布" left-text="取消" @click-left="actionShow = true" fixed>
      <div class="head-bar-btn theme-color" slot="right" @click="release">
        <i class="iconfont">
          &#xe72c;
        </i>
        发布
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="edit-title">
        <van-cell-group>
          <van-field v-model="grapicData.title" placeholder="文章标题" rows="1" />
        </van-cell-group>
      </div>
      <div class="classify">
        <van-cell title-class='theme-color' title="#选择分类" :value="cateName" is-link arrow-direction="down" @click="show = true" />
      </div>   
      <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
      <div class="edit-content" :class="[isQlToolbarShow?'bar-show':'']">
        <quill-editor ref='myQuillEditor' v-model="grapicData.content" :options="editorOption" @focus="onEditorFocus($event)" @blur="onEditorBlur($event)"/>
      </div>
    </div>
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' />
    </van-popup>

    <van-actionsheet v-model="actionShow" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="actionShow = false" />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { compress } from './../../lib/js/util'
import topicList from './../../module/release/topicList'


export default {
  name: 'publishing',
  components: {
    quillEditor,
    topicList
  },
  data() {
    return {
      isQlToolbarShow: false,
      actionShow:false,
      show: false,
      ossSign: '',
      percent: 0,
      cateName: '',
      cateId: 0,
      UploadTypeShow: false,
      grapicData: {
        title: '',
        content: '',
        photos:[]
      },
      fixedHeaderBar: true,
      history: {
        delay: 1000,
        maxStack: 50,
        userOnly: false
      },
      editorOption: {
        placeholder: '输入正文',
        modules: {
          toolbar: [
            ['bold', 'italic', 'image', 'video', 'link'],
            [{ list: 'ordered' }, { list: "bullet" }],
            [{ 'color': [] }, { 'background': [] }],
            ['blockquote']
          ]
        }
      },
      actions: [{
        name: '保存文章',
        type: 'save'
      }, {
        name: '清空内容',
        type: 'noSave'
      }]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
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
      if (localStorage.getItem('articleData')) {
        this.grapicData = JSON.parse(localStorage.getItem('articleData'))
      }

      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    onEditorFocus(e){
      this.isQlToolbarShow = true
    },
    onEditorBlur(e){
      this.isQlToolbarShow = false
    },
    onSelect(item) {
      if (item.type == 'save') {
        localStorage.setItem('articleData', JSON.stringify(this.grapicData))
        if (this.$route.query.back) {
          this.$router.push({
            name: this.$route.query.back
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
            name: this.$route.query.back
          })
        } else {
          this.$router.push({
            name: 'home'
          }) 
        }
        localStorage.setItem('articleData', '')
        this.actionShow = false
        this.grapicData = {
          text: '',
          photos: []
        }
      }
    },
    release() {
      if (this.grapicData.title.length == 0) {
        this.$toast('请输入标题')
      } else if ( this.cateId == 0 ) {
        this.$toast('请选择分类')
      } else if ( this.grapicData.content.length == 0 ) {
        this.$toast('请输入正文')
      } else {
        let data = {
          title: this.grapicData.title,
          details: this.grapicData.content,
          photos: this.grapicData.photos,
          cate_id: this.cateId,
          to_school: 1
        }

        axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {
          if (res.data.status == 1) {
            this.$router.push({
              name:'apps-find'
            })
          }
        })
      }
    },
    imgHandler() {
      this.$refs.selectPhoto.$refs.input.click()
    },
    videoHandler() {
      this.$refs.selectFileVideo.click()
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (88 < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    onRead(file) {
      let array = []
      if (file.length) {
        array = file
      } else {
        array.push(file)
      }
      array.forEach(element => {
        compress(element.content, 1200, 0.8, 'blob').then(val => {
          val.toBlob((blob) => {
            this.upOssPhoto(blob, element.file, element.content)
          })
        })
      })
    },
    addImage(path) {
      let addRange = this.$refs.myQuillEditor.quill.getSelection()
      this.$refs.myQuillEditor.quill.insertEmbed(addRange !== null ? addRange.index : 0, 'image', path)
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
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then((res) => {
        this.grapicData.photos.push({
          media: true,
          is_audio: type === 'audio' ? 1 : 0,
          is_video: type === 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-percent=video/snapshot,t_2000,f_jpg,w_0,h_0,m_fast`
        })

        this.addImage(`${path}?x-oss-percent=video/snapshot,t_2000,f_jpg,w_0,h_0,m_fast`)
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
          this.grapicData.photos.push({
            photo: path,
            thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
            height: img.height || 0,
            width: img.width || 0
          })

          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then((res) => {
        this.addImage(path)
      })
    },
    selectTag(tag) {
      this.cateName = tag.cate_name
      this.cateId = tag.cate_id
    }
  }
}
</script>
<style scoped>
.container{
  padding-top: 2.8125rem /* 45/16 */;
  background: #fff;
}

.publishing {
  background: #fff;
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
  top: -0.3125rem /* 5/16 */;
  font-size: 1.5rem /* 24/16 */;
  color: red;
  z-index: 9;
}

.quill-code {
  border: none;
  height: auto;
}
</style>
<style>
.edit-content.fixed .ql-toolbar.ql-snow {
  position: fixed;
  bottom: 0;
}

.edit-title .van-field__control {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.publishing .ql-toolbar.ql-snow {
  width: 100%;
  background: #f2f2f2;
  z-index: 10;
}


.publishing .edit-content.bar-show .ql-toolbar.ql-snow{
  display: block;
}

.publishing .ql-toolbar.ql-snow{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: none;
}

.publishing .ql-toolbar.ql-snow,
.publishing .ql-container.ql-snow {
  border: none;
}

.ql-editor {
  min-height: 100vh;
  font-size: 1rem /* 16/16 */;
  padding-bottom: 5rem /* 80/16 */;
}
</style>

