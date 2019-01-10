<template>
  <div class="publishing">
    <van-nav-bar title="发布长文" left-text="返回" left-arrow @click-left="onClickLeft">
      <div class="head-bar-btn theme-color" slot="right" @click="release">
        <i class="iconfont">
          &#xe72c;
        </i>
        发布
      </div>
    </van-nav-bar>
    <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <div class="container">
      <div class="edit-title">
        <van-cell-group>
          <van-field v-model="grapicData.title" placeholder="文章标题" rows="1" />
        </van-cell-group>
      </div>
      <div class="edit-content" :class="[fixedHeaderBar?'':'fixed']">
        <quill-editor ref='myQuillEditor' v-model="grapicData.content" :options="editorOption" />
      </div>
      <van-cell title-class='theme-color' title="#选择分类" is-link arrow-direction="down" @click="show = true"/>
    </div>
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' />
    </van-popup>
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
      show:false,
      ossSign: '',
      percent: 0,
      cateName:'',
      cateId: 0,
      UploadTypeShow: false,
      grapicData: {
        title: '',
        content: ''
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
      }
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
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    onClickLeft() {
      this.$router.push({
        name: 'home'
      })
    },
    release(){
      if(this.grapicData.title.length == 0){
        this.$toast('请输入标题')
      }else if(this.grapicData.content.length == 0){
        this.$toast('请输入正文')
      }else if(this.cateId == 0){
        this.$toast('请选择分类')
      }else {
        let data = {
          details: this.grapicData.content,
          template_id: 2,
          cate_id: this.cateId
        }

        axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {
          if(res.data.data.status == 1){
          
          }
        })
      }
    },
    imgHandler() {
      this.$refs.selectPhoto.$refs.input.click()
    },
    videoHandler(){
      this.$refs.selectFileVideo.click()
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if ( 88 < this.scrollTop) {
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
        this.addImage(`${path}?x-oss-percent=video/snapshot,t_13000,f_jpg,w_0,h_0,m_fast`)
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
        this.addImage(path)
      })
    },
    selectTag(tag){
      this.cateName = tag.cate_name
      this.cateId = tag.cate_id
    }
  }
}
</script>
<style scoped>
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
.edit-content.fixed .ql-toolbar.ql-snow{
  position: fixed;
  top:0;
}

.edit-title .van-field__control {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.publishing .ql-toolbar.ql-snow{
  width: 100%;
  background: #f2f2f2;
  z-index: 10;
}

.publishing .ql-toolbar.ql-snow,
.publishing .ql-container.ql-snow {
  border: none;
}

.ql-editor {
  min-height: 50vh;
  padding-bottom: 50vh;
  font-size: 1rem /* 16/16 */;
}
</style>

