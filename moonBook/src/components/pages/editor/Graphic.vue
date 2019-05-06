<template>
  <div class="graphic page-padding">
    <van-nav-bar :border='false' fixed>
      <div class="user-info" slot='title'>
        <div class="avatar">
          <img :src="userDataState.avatar" v-http2https/>
        </div>
      </div>
      <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='percent != 0'  class="theme-btn" type="primary" size="small" @click="onClickRelease" round>发布</van-button>
      </div>
    </van-nav-bar>

    <div class="textarea-module">
      <van-progress v-if='percent!=0&&percent!=100&&!progressIsShow' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #0084ff)" />
      <van-cell-group>
        <van-field :border='false' class="theme-textarea" v-model="grapicData.text" type="textarea" :placeholder="icon" rows="2" autosize />
        <div class="upload-module flex wrap">
          <van-cell :border='false'>
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
              <van-col :span="8" v-if='boolean'>
                <div class="img-grid" @click="uploaderImg">
                  <div class="photo-upload">
                    <i class="iconfont">&#xe664;</i>
                    <span class="directions">{{typeUpload?'添加视频':'添加图片'}}</span>
                  </div>
                </div>
              </van-col>
            </van-row>
          </van-cell>
        </div>
        <div class="article-card" v-if='post'>
          <van-cell>
            <articleCard :item='post' :detailsId='post.post_id || post.tushu_id' @toDetails='toArticle'/>
          </van-cell>
        </div>
      </van-cell-group>
    </div>
    <!-- 分类设置、同步、设置机构标签 -->
    <articleSetting type='mould'/>
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
      <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
    </div>

    <van-popup v-model="progressIsShow" class="progress-popup" :close-on-click-overlay='false'>
      <div class="progress">
        <div class="upload-upload">视频正在上传中...</div>
        <van-progress v-if='percent!=0' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #0084ff)" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import topicList from './../../module/release/topicList'
import articleSetting from './mould/articleSetting'
import articleCard from './../../module/card/articleCard'
import { compress,checkHtml } from './../../lib/js/util'

export default {
  name: 'graphic',
  components: {
    topicList,
    articleSetting,
    articleCard
  },
  computed: {
    ...mapState('openWX',['ready','imgList']),
    ...mapState('articleSetting', ['group','tag']),
    ...mapGetters('articleSetting',['getResult']),
    ...mapGetters(['userDataState','managerState']),
    imagesLength() {
      return this.grapicData.photos.length
    },
    boolean(){
      let boolean = true
      if(this.typeUpload){
        if(this.imagesLength == 1){
          boolean = false
        }
      }else{
        if(this.imagesLength >= 9){
          boolean = false
        }
      }
      return boolean
    }
  },
  data() {
    let u = navigator.userAgent
    return {
      icon:'\ue658\ue65f\ue65e\ue661\ue659\ue65a\ue65b\ue655\ue660\ue662',
      show: false,
      actionShow: false,
      grapicData: {
        text: '',
        photos: []
      },
      isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //安卓终端
      isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      ossSign: '',
      mediaContent: [],
      percent: 0,
      photoLength: 0,
      videoThumb:'',
      typeUpload:'',
      post:'',
      progressIsShow: false
    }
  },
  created() {
    this.fetchData()
  },
  //去掉页面数据缓存
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false 
    next()
  },
  watch: {
    grapicData: {
      handler(val) {
        localStorage.setItem('grapicData',JSON.stringify(val))
      },
      deep: true
    },
    imgList:{
      handler(val) {
        this.grapicData.photos = val
        this.photoLength = val.length
      },
      deep: true
    },
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX',['selectImg']),
    ...mapActions(['release']),
    ...mapMutations('openWX',['clearImg']),
    fetchData() {
      if (localStorage.getItem('grapicData')) {
        this.grapicData = JSON.parse(localStorage.getItem('grapicData'))
      }
  
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })

      //如果路由存在文章ID 说明是转发文章 这里根据id来获取文章详情
      if(this.$route.query.post_id){
        let articleDetailData = {
          params:{
            ajax:1,
            id:this.$route.query.post_id
          }
        }

        axios.get('/book/SchoolArticle/detail',articleDetailData).then(res => {
          if(res.data.status == 1){
            if(res.data.data.post.extra){
              this.post = JSON.parse(res.data.data.post.extra)
            }else{
              let postData = res.data.data.post
              this.post = {
                title: postData.template_id == 1?`${postData.user.username}的晒一晒`:postData.title, //内容
                post_id: postData.post_id || 0,
                type:'post'
              }
            }
          }
        })
      }
      
      if(this.$route.query.book_id){
        if(this.$route.query.book_id > 0){
          let bookDetailData = {
            params:{
              ajax:1,
              book_id: this.$route.query.book_id,
            }
          }

          axios.get('/book/ShelfBook/getInfo',bookDetailData).then(res=>{
            if(res.data.status == 1){
              let bookData = res.data.data
              this.post = {
                title: bookData.title, //内容
                tushu_id: bookData.tushu_id || 0,
                sign_read_count: this.$route.query.sign_read_count,
                type:'book'
              }
            }
          })
        }else{
          this.post = {
            title: '自选图书', //内容
            post_id: 0,
            sign_read_count: this.$route.query.sign_read_count,
            type:'book'
          }    
        }
      }

      //判断路由自动触发小视频 视频
      if(this.$route.query.upVideo){
        this.$nextTick(() => {
          switch(this.$route.query.upVideo){
            case 1:
              this.$refs.fileVideo.click()
              this.typeUpload = 'fileVideo'
            break
            case 2:
              this.$refs.selectFileVideo.click()
              this.typeUpload = 'selectFileVideo'
            break
          }
        })
      }
    },
    uploaderImg(){
      switch(this.typeUpload){
        case 'fileVideo':
          this.$refs.fileVideo.click()
        break
        case 'selectFileVideo':
          this.$refs.selectFileVideo.click()
        break
        default:
          if(this.ready){
            // 传上传张数
            this.selectImg(9-this.photoLength)
          }else{
            this.$refs.selectPhoto.$refs.input.click()
          }
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
    onSelect(item) {
        this.$router.go(-1)
        this.actionShow = false
        this.grapicData = {
          text: '',
          photos: []
        }
    },
    onClickRelease() {
      if (!this.grapicData.text.length && !this.grapicData.photos.length) {
        if (this.$route.query.back && this.$route.name!='home') {
          this.$router.push({
            name: this.$route.query.back,
            query: {
              id:  this.$route.query.id
            }
          })
        } else {
          this.$router.push({
            name: 'apps-find'
          })
        }
      } else if (this.grapicData.text.length < 12000) {
          // 发布
          let data = {
            details: this.grapicData.text,
            template_id: 1,
            photos: this.grapicData.photos,
            tags: this.$route.query.tags,
            extra: this.post
          }

          if(this.$route.query.back == 'baby-home'){
            data.child_id = this.$route.query.id
          }

          if(this.$route.query.back == 'class-home'){
            data.banji_id = this.$route.query.id
          }
          
          if(this.$route.query.back == 'apps-school'){
            data.school_id = this.$route.query.id
          }

          this.release(data).then(res=>{
            switch(res.data.status){
              case 1:

                if(this.$route.query.post_id&&this.$route.query.post_id > 0){
                  let commentData = {
                    post_id: this.post.post_id,
                    contents: '收录了这篇文章',
                  }

                  axios.post('/book/SchoolArticleComment/edit?ajax=1', commentData).then(res => {})
                }

                this.clearImg()
                this.$toast.success('发布成功')

                if(this.getResult[0]!=''&&this.getResult[0]!='apps-find'){
                  this.$router.replace({
                    name: this.getResult[0],
                    query:{
                      ...this.$route.query,
                      id: this.getResult[0] == 'baby-home'?this.userDataState.child_id:this.userDataState.teacher_banji_id > 0?this.userDataState.teacher_banji_id:this.userDataState.banji_id
                    }
                  })
                }else{
                  this.$router.replace({
                    name: 'apps-find'
                  })
                }
                
              break
              case 0:
                this.$toast.fail(res.data.msg)
              break
            }
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
    doUpload(e) {
      let file = e.target.files[0]
      let type = e.target.dataset.type
      let formData = new FormData()
      //  动态获取视频截取大小以获取视频封面
      let size = e.target.files[0].size/1024/1024/2

      let sizeVal

      if(this.isIOS){
        sizeVal = 3
      }else{
        sizeVal = size > 3 ? 3 : size
      }

      let maxSize = 1024 * 1024 * sizeVal
      let blob = file.slice(0, maxSize)

      formData.append('file',blob,file.name)

      let url = '/book/file/get_video_screen'

      axios({
        url: url,
        data: formData,
        method: 'post',
        onUploadProgress: p => {
          this.progressIsShow = true
          this.percent = 1
        }
      }).then( res => {
          let info = res.data.data
          this.grapicData.photos.push({
            thumb: info.thumb,
            height: info.height,
            width: info.width,
            rotate: info.rotate,
            duration: Math.floor(info.duration) || 15
          })

        this.upOssMedia(type, file)
      })
    },
    upOssMedia(type, file) {
      if (!this.ossSign) {
        alert('未能获取上传参数')
      }
      let url = this.ossSign.host
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
        this.grapicData.photos[0].is_audio =  type == 'audio' ? 1 : 0
        this.grapicData.photos[0].is_video =  type == 'video' ? 1 : 0
        this.grapicData.photos[0].photo = path
        this.percent = 0
        this.progressIsShow = false
      })
    },
    upOssPhoto(blob, file, base64) {
      let img = new Image()
      img.src = base64

      let fd = new FormData()
      let url = this.ossSign.host
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
    toArticle(data){
      this.$router.push({
        name:data.routeName,
        query:{
          ...this.$route.query,
          id: data.detailsId
        }
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

.user-info{
  position: relative;
  width: 100%;
  height: 2.8125rem /* 45/16 */;
}

.user-info .avatar{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.user-info .avatar,
.user-info .avatar img{
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

.textarea-module{
  padding-top: 2.8125rem /* 45/16 */;
}

.prompt-text{
  color: #E6A23C;
  background: #fff;
  padding-left: 15px;
}

.progress-popup{
  background: transparent;
  width: 100%;
  height: 70vh;
}

.upload-upload{
  margin-bottom: 20px;
}

.progress{
  color: #fff;
  text-align: center;
}
</style>
<style>
.cell-value.van-cell__value {
  flex: 5;
}
</style>

