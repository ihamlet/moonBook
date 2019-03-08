<template>
  <div class="tips flex" :class="[position == 'top'?'flex-column top':'flex-align bottom']">
    <div class="tips-list" :class="[position == 'bottom'?'flex-align flex':'',isShow?'pulse animated':'']">
      <div class="btn" :class="[position == 'top'?'flex-align flex':'']" v-for='(list,index) in relaseList' :key="index" @click="toRelease(index)">
        <div class="iconfont" :class="list.icon"></div>
        <div class="name">{{list.name}}</div>
      </div>
    </div>
    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" multiple />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
      <input type="file" accept="video/*" capture="camcorder" ref='fileVideo' data-type='video' hidden @change='doUpload'>
    </div>
    <div class="close-btn" @click="$emit('close')" v-if='position != "top"' :class="[isShow?'rotateIn animated':'']">
      <i class="iconfont">&#xe647;</i>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { compress } from './../../lib/js/util'
import { mapGetters } from 'vuex'

export default {
  name: 'tips',
  props: ['position', 'isShow'],
  computed: {
    ...mapGetters(['managerState'])
  },
  data() {
    return {
      percent: 0,
      photoLength: 0,
      ossSign: '',
      grapicData: {
        text: '',
        photos: []
      },
      relaseList: [{
        name: '发图文',
        type: 'image',
        icon: 'icon-weibo'
      }, {
        name: '拍小视频',
        type: 'shootVideo',
        icon: 'icon-paishipin'
      }, {
        name: '发视频',
        type: 'video',
        icon: 'icon-shipin'
      }, {
        name: '文章',
        type: 'article',
        icon: 'icon-wenzhang'
      }, {
        name: '发提问',
        type: 'question',
        icon: 'icon-tiwen'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    grapicData: {
      handler(val) {
        localStorage.setItem('grapicData', JSON.stringify(val))
      },
      deep: true
    },
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    toRelease(index) {
      switch (index) {
        case 0:
          this.$router.push({
            name: 'graphic',
            query: {
              back: this.$route.name,
              id: this.$route.query.id
            }
          })
          break
        case 1:
          this.$refs.fileVideo.click()
          break
        case 2:
          this.$refs.selectFileVideo.click()
          break
        case 3:
          this.$router.push({
            name: 'publishing',
            query: {
              back: this.$route.name,
              id: this.$route.query.id
            }
          })
          break
        case 4:

          break
      }
    },
    onRead(file) {
      let array = []
      if (file.length) {
        array = file
      } else {
        array.push(file)
      }


      // 先发布图片 @王伟
      // 
      // let f = () => {
      //   return new Promise((resolve, reject) => {
      //     array.forEach((element, index) => {
      //       if (this.photoLength < 9) {
      //         this.photoLength++
      //         this.grapicData.photos.isLoading = true
      //         compress(element.content, 1200, 0.8, 'blob').then(val => {
      //           val.toBlob((blob) => {
      //             this.upOssPhoto(blob, element.file, element.content).then(() => {
      //               index === array.length - 1 && resolve()
      //             })
      //           })
      //         })
      //       } else {
      //         this.$dialog.alert({
      //           message: '最多只能上传9张图片'
      //         })
      //       }
      //     })
      //   })
      // }

      // f().then(() => {
      //   this.$router.push({
      //     name: 'graphic',
      //     query: {
      //       back: this.$route.name,
      //       id: this.$route.query.id
      //     }
      //   })
      // })
    },
    doUpload(e) {
      let file = e.target.files[0]
      let type = e.target.dataset.type
      this.upOssMedia(type, file).then(() => {
        this.$router.push({
          name: 'graphic',
          query: {
            back: this.$route.name,
            id: this.$route.query.id
          }
        })
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

      return axios({
        url: url,
        data: data,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
          this.$toast.loading({
            mask: false
          })
          if (this.percent == 100) {
            this.$toast.clear()
          }
        }
      }).then((res) => {
        this.grapicData.photos.push({
          media: true,
          is_audio: type == 'audio' ? 1 : 0,
          is_video: type == 'video' ? 1 : 0,
          photo: path,
          thumb: `${path}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`
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

      return axios({
        url: url,
        data: fd,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
          this.$toast.loading({
            mask: false
          })
          if (this.percent == 100) {
            this.$toast.clear()
          }
        }
      }).then((res) => {
        this.grapicData.photos.push({
          photo: path,
          thumb: `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`,
          height: img.height || 0,
          width: img.width || 0
        })
      })
    }
  }
}
</script>
<style scoped>
.icon-weibo::before {
  content: '\e6d6';
}

.icon-wenzhang::before {
  content: '\e976';
}

.icon-paishipin::before {
  content: '\e62a';
}

.icon-shipin::before {
  content: '\e62b';
}

.icon-tiwen::before {
  content: '\e62c';
}

.tips.bottom .icon-weibo::before {
  color: #7197e7;
}

.tips.bottom .icon-wenzhang::before {
  color: #35c7da;
}

.tips.bottom .icon-paishipin::before {
  color: #ec736e;
}

.tips.bottom .icon-shipin::before {
  color: #6ddea7;
}

.tips.bottom .icon-tiwen::before {
  color: #f5c944;
}

.tips.top {
  width: 6.25rem /* 100/16 */;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */;
  border-radius: 0.5rem /* 8/16 */;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  position: relative;
}

.tips.top::before {
  content: '';
  right: 0.625rem /* 10/16 */;
  width: 0;
  height: 0;
  border-width: 0 0.625rem /* 10/16 */ 0.75rem /* 12/16 */;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.8); /*透明 透明  灰*/
  position: absolute;
  top: -0.75rem /* 12/16 */;
}

.tips.top .btn {
  height: 2.25rem /* 36/16 */;
  border-bottom: 0.0625rem /* 1/16 */ solid rgba(255, 255, 255, 0.3);
}

.tips.top .btn:last-child {
  border-bottom: none;
}

.tips.top .btn .iconfont {
  margin-right: 0.9375rem /* 15/16 */;
  font-size: 1.375rem /* 22/16 */;
}

.tips.top .btn .name {
  font-size: 0.8125rem /* 13/16 */;
}

.tips.bottom {
  width: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0), #fff);
  padding: 1.25rem /* 20/16 */ 0 3.75rem /* 60/16 */ 0;

  position: absolute;
  bottom: 0;
}

.tips.bottom .tips-list {
  width: 17.5rem /* 280/16 */;
  margin: 0 auto;
  padding: .625rem /* 10/16 */;
  background: #fff;
  border-radius: .625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.2);
}

.tips.bottom .btn {
  flex: 1;
  text-align: center;
}

.tips.bottom .btn .iconfont {
  font-size: 2.125rem /* 34/16 */;
}

.tips.bottom .btn .name {
  font-size: 0.75rem /* 12/16 */;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  bottom: 0.9375rem /* 15/16 */;
  left: 50%;
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  text-align: center;
  line-height: 2rem /* 32/16 */;
  background: #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
  margin-left: -1rem /* 16/16 */;
}
</style>
