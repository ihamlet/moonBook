<template>
  <div class="publishing">
    <van-nav-bar title="文章发布" left-text="取消" @click-left="onClickLeft" fixed>
      <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='percent != 0' class="theme-btn" type="primary" size="small" @click="release" round>发布</van-button>
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
      <div class="edit-content" :class="[editBarShow?'bar-show':'']">
        <quill-editor ref='myQuillEditor' v-model="grapicData.content" :options="editorOption" />
      </div>
    </div>
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' type='edit' :topicList='topicList'/>
    </van-popup>

    <van-popup class="page-popup-layer" overlay-class='bg-opacity' position="bottom" v-model="linkShow" get-container='#app' @close='$refs.field.blur()'>
      <van-cell-group>
        <van-cell>
          <div class="title">获取公共账号文章</div>
          <van-field ref='field' class="input-link" label-align='center' v-model="link" placeholder="粘贴公众账号文章链接" />
        </van-cell>
        <van-cell>
          <van-button class="theme-btn" square type="primary" size="large" :loading='isLoading'  @click="setContent">获取文章内容</van-button>
        </van-cell>
      </van-cell-group>
    </van-popup>
    <div class="fixed-btn">
      <van-button square type="primary" @click="onCopyLink" size="large">获取微信公众号文章</van-button>
    </div>
    <van-actionsheet v-model="actionShow" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="actionShow = false"/>
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
import { mapGetters } from 'vuex'

export default {
  name: 'publishing',
  components: {
    quillEditor,
    topicList
  },
  computed:{
    ...mapGetters(['managerState','userDataState'])
  },
  data() {
    return {
      scrollTop: 0,
      editBarShow: false,
      actionShow: false,
      show: false,
      ossSign: '',
      percent: 0,
      cateName: '',
      cateId: 0,
      UploadTypeShow: false,
      linkShow: false,
      isLoading: false,
      grapicData: {
        title: '',
        content: '',
        photos: []
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
            ['bold', 'italic', 'image', 'video'],
            [{ list: 'ordered' }, { list: "bullet" }],
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
      }],
      topicList:[],
      link:''
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
      // 获取文章分类

      let data = {
        params:{
          portal_name:'宝贝主页'
        }
      }

      if(this.$route.query.back == 'class-home'){
        data.params.portal_name = '班级主页'
      }    

      if(this.$route.query.back == 'apps-school'){
        data.params.portal_name = '学校主页'
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if(element.access_level == 0){
              data.push(element)
            }else{
              this.managerState.forEach(e =>{
                if((this.$route.query.id == e.banji_id||this.$route.query.id == e.school_id)&& e.item_relation != 'parent'){
                  data.push(element)
                }
              })
            }
          })
          this.topicList = data
          this.cateId = data[0].cate_id
          this.cateName = data[0].cate_name
        }
      })

      if(this.$route.query.type == 'edit'){
          axios.get(`/book/SchoolArticle/getEdit?post_id=${this.$route.query.post_id}`).then(res => {
            if(res.data.status == 1){
              this.grapicData.title = res.data.data.title
              this.grapicData.content = res.data.data.details
              this.grapicData.photos = res.data.data.photos
            }
          })
      }else{
        if (localStorage.getItem('articleData')) {
          this.grapicData = JSON.parse(localStorage.getItem('articleData'))
        }
      }

      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    onCopyLink(){
      this.linkShow = true
      this.$nextTick(() => {
        this.$refs.field.focus()
      })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 82) {
        this.editBarShow = true
      } else {
        this.editBarShow = false
      }
    },
    onClickLeft() {
      if (!this.grapicData.content.length && !this.grapicData.title.length) {
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
        localStorage.setItem('articleData', JSON.stringify(this.grapicData))
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
        localStorage.setItem('articleData', '')
        this.actionShow = false
        this.grapicData = {
          text: '',
          photos: []
        }
      }
    },
    release() {
      if (!this.grapicData.title.length) {
        this.$toast('请输入标题')
      } else if (!this.cateId) {
        this.$toast('请选择分类')
      } else if (!this.grapicData.content.length) {
        this.$toast('请输入正文')
      } else {
        let data = {
          title: this.grapicData.title,
          details: this.grapicData.content,
          photos: this.grapicData.photos,
          cate_id: this.cateId,
          post_id: this.$route.query.post_id || '',
          to_baby:1,
          to_school:1,
          to_banji:1
        }

        axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {          
          if (res.data.status == 1) {
            if(this.$route.query.back){
              this.$router.push({
                name:this.$route.query.back,
                query:{
                  id: this.$route.query.id ||　'',
                  cate_id: this.cateId || ''
                }
              })
            }else{
              if(this.userDataState.child_id > "0"){
                this.$router.push({
                  name: 'baby-home',
                  query:{
                    id: this.userDataState.child_id
                  }
                })
              }else{
                this.$router.push({
                  name: 'app-find'
                })
              }
            }
          }else{
            this.$toast(res.data.info)
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
    setContent(){
      let regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/

      if(this.link.length != 0 && regex.test(this.link)){
        this.isLoading = true

        let data = {
          params:{
            url: this.link
          }
        }
        axios.get('/book/api/article_gather',data).then(res=>{
          if(res.data.status == 1){
            this.grapicData.content = res.data.data.content
            this.grapicData.title = res.data.data.title
            this.isLoading = false
            this.linkShow = false
            this.link = ''
          }else{
            this.$toast.fail(res.data.msg)
            this.isLoading = false
            this.linkShow = false
          }
        })
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
          thumb: `${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`
        })
        this.addImage(`${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`)
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
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0
        })
        this.addImage(path)
        this.percent = 0
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
.container {
  padding-top: 2.8125rem /* 45/16 */;
  padding-bottom: 3.125rem /* 50/16 */;
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

.title{
  text-align: center;
  font-size: 1.25rem /* 20/16 */;
  padding: .625rem /* 10/16 */ 0;
  margin-bottom: 3.125rem /* 50/16 */;
}

.input-link{
  margin: 1.25rem /* 20/16 */ auto 1.875rem /* 30/16 */;
  text-align: center;
}

</style>
<style>
.edit-title .van-field__control {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.publishing .ql-toolbar.ql-snow {
  width: 100%;
  background: #f2f2f2;
  z-index: 10;
}

.publishing .edit-content.bar-show .ql-toolbar.ql-snow {
  position: fixed;
  top: 45px;
}

.publishing .ql-toolbar.ql-snow {
  width: 100%;
}

.publishing .ql-toolbar.ql-snow,
.publishing .ql-container.ql-snow {
  border: none;
}

.ql-editor {
  font-size: 1rem /* 16/16 */;
  padding-bottom: 5rem /* 80/16 */;
}

.publishing .ql-snow.ql-toolbar button,
.publishing .ql-snow .ql-toolbar button{
  height: auto;
  width: auto;
}

.publishing .ql-snow.ql-toolbar button svg, 
.publishing .ql-snow .ql-toolbar button svg{
  width: 1.5625rem /* 25/16 */;
}

.fixed-btn{
  position: fixed;
  bottom:0;
  width: 100%;
}
</style>

