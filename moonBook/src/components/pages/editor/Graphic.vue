<template>
  <div class="graphic">
    <van-nav-bar left-text="取消" @click-left="onClickLeft" :border='false'>
      <div class="user-info" slot='title'>
        <div class="avatar">
          <img :src="getAvatar(userDataState.avatar)" />
        </div>
      </div>
      <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='percent != 0' class="theme-btn" type="primary" size="small" @click="onClickRelease" round>发布</van-button>
      </div>
    </van-nav-bar>
    <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
      
    <div class="textarea-module">
      <van-cell-group>
        <van-field class="theme-textarea" v-model="grapicData.text" type="textarea" placeholder="记录孩子成长的每一天！" rows="4" autosize />
        
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
                <div class="img-grid" @click="uploaderImg">
                  <div class="photo-upload">
                    <i class="iconfont">&#xe664;</i>
                    <span class="directions">添加照片</span>
                  </div>
                </div>
              </van-col>
            </van-row>
          </van-cell>
        </div>
      </van-cell-group>
    </div>

    <!-- 分类设置、同步、设置机构标签 -->
    <articleSetting type='mould'/>
    <van-actionsheet v-model="actionShow" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="actionShow = false" />
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
      <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
    </div>

  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapState, mapActions, mapGetters } from 'vuex'
import topicList from './../../module/release/topicList'
import articleSetting from './mould/articleSetting'
import { compress,checkHtml,contains } from './../../lib/js/util'

export default {
  name: 'graphic',
  components: {
    topicList,
    articleSetting
  },
  computed: {
    ...mapState('openWX',['ready','imgList']),
    ...mapState('articleSetting', ['result','group','tag']),
    ...mapGetters(['userDataState','managerState']),
    imagesLength() {
      return this.grapicData.photos.length
    }
  },
  data() {
    let self = this
    return {
      show: false,
      actionShow: false,
      grapicData: {
        text: '',
        photos: []
      },
      ossSign: '',
      mediaContent: [],
      percent: 0,
      photoLength: 0,
      actions: [{
        name: '保存草稿',
        type: 'save'
      }, {
        name: '不保存',
        type: 'noSave'
      }],
      videoThumb:'',
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
    imgList:{
      handler(val) {
        this.grapicData.photos = val
      },
      deep: true
    },
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX',['selectImg']),
    ...mapActions(['release']),
    fetchData() {
      // 从本地存储获取发布数据
      if(this.$route.query.type == 'edit'){
          let articleData = {
            post_id:this.$route.query.post_id
          }

          axios.get('/book/SchoolArticle/getEdit',articleData).then(res => {
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

      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })

      //判断路由自动触发小视频 视频
      if(this.$route.query.upVideo){
        this.$nextTick(() => {
          switch(this.$route.query.upVideo){
            case 1:
              this.$refs.fileVideo.click()
            break
            case 2:
              this.$refs.selectFileVideo.click()
            break
          }
        })
      }
    },
    uploaderImg(){
      if(this.ready){
        // 传上传张数
        this.selectImg(9)
      }else{
        this.$refs.selectPhoto.$refs.input.click()
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
        // 如果通知没有内容？
        if(this.tag.cate_name == '通知'&&!this.grapicData.text.length){
          this.$toast('请输入通知内容')
        }else{
          // 发布
          let data = {
            details: this.grapicData.text,
            template_id: 1,
            photos: this.grapicData.photos
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
            switch(res){
              case 1:
                if(this.$route.query.back && this.$route.query.back!='home' && this.$route.query.back!='my'){
                  this.$router.push({
                    name: this.$route.query.back,
                    query: {
                      id:  this.$route.query.id,
                      cate_id: this.tag.cate_id
                    }
                  })
                }else{
                  switch(true){
                    case contains(this.result,'apps-find'):
                      this.$router.push({
                        name:'apps-find' 
                      })
                    break
                    case contains(this.result,'baby-home'):
                      this.$router.push({
                        name:'baby-home',
                        query:{
                          id: this.userDataState.child_id
                        }
                      })
                    break
                    case contains(this.result,'class-home'):
                      this.$router.push({
                        name:'class-home',
                        query:{
                          id: this.userDataState.banji_id
                        } 
                      })
                    break
                    default:
                    this.$router.push({
                      name:'zoom',
                      query:{
                        id: this.userDataState.user_id
                      }
                    })
                  }
                }
                this.$toast.success('发布成功')
              break
              case 0:
                this.$toast(res.data.info)
              break
            }
          })
        }
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
      let maxSize = 1024 * 1024 * 3
      let blob = file.slice(0, maxSize)

      formData.append('file',blob,file.name)

      let url = '/book/file/get_video_screen'

      axios({
        url: url,
        data: formData,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then( res => {
         let info = res.data.data
          this.grapicData.photos.push({
            thumb: info.thumb,
            height: info.height,
            width: info.width,
            rotate: info.rotate,
            duration: Math.floor(info.duration) || 10
          })
        this.percent = 0
      })

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
          this.grapicData.photos[0].is_audio =  type == 'audio' ? 1 : 0
          this.grapicData.photos[0].is_video =  type == 'video' ? 1 : 0
          this.grapicData.photos[0].photo = path
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
</style>
<style>
.cell-value.van-cell__value {
  flex: 5;
}
</style>

