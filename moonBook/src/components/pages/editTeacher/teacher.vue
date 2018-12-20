<template>
  <div class="add-child">
    <van-nav-bar :title="$route.query.pageTitle" left-arrow left-text="我的"/>
    <van-cell-group>
        <div class="avatar-uploader">
            <van-uploader :after-read="onRead">
                <div class="prompt flex">
                <img :src="banji.avatar" v-if="banji.avatar"/>
                <div class="box" v-else>
                    <van-icon class="icon" name="photograph" />
                </div>
                <div class="text">上传老师头像</div>
                </div>
            </van-uploader>
        </div>
    </van-cell-group>

    <!-- 截图工具 -->
    <van-popup class="cropper-popup" v-model="cropperShow" get-container='#app'>
      <vue-cropper class="theme-cropper" ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
        :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
        :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"></vue-cropper>
      <van-button class="theme-btn" type="primary" :loading='cropperLoading' @click="getCropData">完成截图</van-button>
    </van-popup>

    <!-- 提交编辑 -->
    <div class="form-submit">
      <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="edit">提交</van-button>
    </div>

  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions,mapGetters } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { format } from './../../lib/js/util'
import avatar from './../../module/avatar'

export default {
  name: 'teacher',
  components: {
    VueCropper,
    avatar
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      fileName: '',
      cropperLoading: false,
      radio: '1',
      submitLoading: false,
      banji: {
        avatar: '',
      },
      pickerShow: false,
      cropperShow: false,
      option: {
        img: '',
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 350,
        autoCropHeight: 350,
        centerBox: true,
        high: true
      }
    }
  },
  methods: {
    ...mapActions(['getUserData']),
    onRead(file) {
      this.cropperShow = true
      this.option.img = file.content
      this.fileName = file.file.name
    },
    getCropData() {
      this.cropperLoading = true
      this.$refs.cropper.getCropBlob(blob => {
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        let fd = new FormData()
        fd.append('file', blob, this.fileName)
        axios.post('/book/file/upload', fd, config).then((res) => {
          this.cropperShow = false
          this.cropperLoading = false
          if (res.data.status === 1) {
            this.banji.avatar = res.data.data.thumb
          } else {
            this.$toast.fail('上传失败,请重新上传')
          }
        })
      })
    },
    edit(){

    }
  }
}
</script>
<style scoped>
.avatar-uploader .box{
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;
}

.avatar-uploader .box .icon.van-icon{
    font-size: 1.625rem /* 26/16 */;
    line-height: 6.25rem /* 100/16 */;
    color: #9E9E9E;
}
</style>

