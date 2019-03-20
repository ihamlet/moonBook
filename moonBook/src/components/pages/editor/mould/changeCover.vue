<template>
  <div class="change-cover">
    <van-nav-bar :title="$route.meta.title" left-text="返回" right-text="完成" left-arrow @click-left="onBack">
      <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='percent != 0' class="theme-btn" type="primary" size="small" @click="onBack" round>完成</van-button>
      </div>
    </van-nav-bar>
    <div class="img-cover theme-background">
        <img v-if='cover || getImageList.length' :src='cover?cover:getImageList[0]'/>
    </div>
    <van-progress v-if='percent!=0&&percent!=100' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #409eff)" />
    <div class="img-list">
        <van-col span="6" v-for='(img,index) in getImageList' :key="index">
            <div class="img-grid" @click="topImg(img,index)">
                <img class="img-item" :src="img" />
                <div class="select-icon" v-if="iconfontIndex == index">
                    <i class="iconfont">&#xe653;</i>
                </div>
            </div>
        </van-col>
        <van-col span="6">
            <div class="img-grid" @click="$refs.selectPhoto.$refs.input.click()">
                <div class="photo-upload">
                <i class="iconfont">&#xe664;</i>
                <span class="directions">上传封面</span>
                </div>
            </div>
        </van-col>

         <van-uploader ref='selectPhoto' :after-read="onRead" />
    </div>
  </div>
</template>
<script>
import axios from './../../../lib/js/api'
import { compress } from './../../../lib/js/util'
import { mapState,mapGetters,mapActions } from 'vuex'

export default {
  name: 'changeCover',
  computed: {
    ...mapState('beautifulArticle',['cover']),
    ...mapGetters('beautifulArticle',['getImageList'])  
  },
  data() {
    return {
        iconfontIndex: 0,
        photoLength:0,
        ossSign:'',
        percent:0
    }
  },
  created () {
      this.fetchData()
  },
  watch: {
    '$router':'fetchData',
  },
  methods: {
      ...mapActions('beautifulArticle',['addCover']),
      fetchData(){
          let index
          let array = this.getImageList
          array.forEach((element,i) => {
              if(element == this.cover){
                  index = i
              }
          })

          this.iconfontIndex = index

        axios.get('/book/api/oss_sign').then(res => {
            this.ossSign = res.data.data
        })
      },
      onBack(){
          this.$router.go(-1)
      },
      topImg(img,index){
          this.iconfontIndex = index
          this.addCover(img)
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
        this.addCover(path)
        this.percent = 0
      })
    }
  }
}
</script>
<style scoped>
.change-cover{
  width: 100%;
  overflow: hidden;
}

.img-cover{
    width: 100%;
    height: 11.25rem /* 180/16 */;
    overflow: hidden;
    position: relative;
}

.img-cover img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-item{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.select-icon{
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5625rem /* 25/16 */;
    height: 1.5625rem /* 25/16 */;
    background: rgba(0,0,0,.5);
    text-align: center;
    line-height: 1.5625rem /* 25/16 */;
}

.select-icon .iconfont{
    color: #fff;
}

.img-grid{
    background: #fff;
}
</style>
