<template>
  <div class="add-child  page-padding">
    <van-nav-bar :title="$route.query.pageTitle" left-arrow :left-text="$route.query.back?'返回':'我的'" :right-text="$route.query.type=='edit'?'删除':''"
      @click-left="onClickLeft" @click-right="onClickRight('delete')" />
    <div class="avatar-uploader">
      <i class="iconfont" v-if='userDataState.isVip' :class="`vip-${userDataState.card_level}`">&#xe776;</i>
      <van-uploader :after-read="onRead">
        <div class="prompt" v-if='!childInfo.avatar'>
          <avatar :gender='childInfo.gender' />
          <div class="text">请上传头像</div>
        </div>
        <div class="avatar-preview" v-else>
          <img :src="childInfo.avatar" alt="女孩默认头像">
        </div>
      </van-uploader>
    </div>
    <van-cell-group>
      <van-field v-model="childInfo.name" input-align='right' label="孩子姓名" placeholder="请输入孩子姓名" :error-message="errorMessage.name" />
      <van-field v-model="childInfo.birthday" input-align='right' readonly label="孩子生日" placeholder="请选择日期"
        :error-message="errorMessage.birthday" @click="pickerShow = true" />
      <van-field v-model="childInfo.relation_name" input-align='right' label="您是孩子的？" placeholder="例如：爸爸" />
    </van-cell-group>
    <van-cell-group class="theme-switch">
      <van-switch-cell v-model="settingSurrent" @input="onInput" title="设为当前宝贝" />
    </van-cell-group>
    <van-radio-group v-model="radio">
      <div class="form-title">孩子性别</div>
      <van-cell-group>
        <van-cell title="男孩" clickable @click="radio = '1'">
          <van-radio class="theme-radio" name="1" />
        </van-cell>
        <van-cell title="女孩" clickable @click="radio = '2'">
          <van-radio class="theme-radio" name="2" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-radio-group>
      <div class="form-title">学校设置</div>
      <van-cell-group>
        <van-cell value='设置' title-class='cell-school-title' :title='info.school_name' :label='info.class_name' center
          is-link @click="toSetting(info)" />
      </van-cell-group>
    </van-radio-group>

    <!-- 截图工具 -->
    <van-popup class="cropper-popup" v-model="cropperShow" get-container='#app'>
      <vue-cropper class="theme-cropper" ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
        :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
        :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"></vue-cropper>
      <van-button class="theme-btn" type="primary" :loading='cropperLoading' @click="getCropData">完成截图</van-button>
    </van-popup>

    <!-- 日期选择器 -->
    <van-popup class="picker-popup" position="bottom" v-model="pickerShow" get-container='#app'>
      <van-datetime-picker title='日期选择' v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
        @confirm="pickerShow = false" @cancel='cancelPicker' />
    </van-popup>

    <!-- 添加宝贝 -->
    <div class="form-submit" v-if="$route.query.type=='add'">
      <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="submit">提 交</van-button>
    </div>

    <!-- 提交编辑 -->
    <div class="form-submit" v-else>
      <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="edit">提交修改</van-button>
    </div>

    <van-popup class="card-routing-popup" v-model="show" get-container='#app'>
      <card-routing/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapGetters } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { format } from './../../lib/js/util'
import avatar from './../../module/avatar'
import cardRouting from './../../module/cardRouting'

export default {
  name: 'child',
  components: {
    VueCropper,
    avatar,
    cardRouting
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      info: '',
      show:false,
      fileName: '',  
      cropperLoading: false,
      radio: '1',
      submitLoading: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(format(new Date(), 'yyyy') - 20, 0, 0),
      maxDate: new Date(format(new Date(), 'yyyy') - 1, 0),
      currentDate: new Date(format(new Date(), 'yyyy') - 2, 0, 0),
      settingSurrent: false,
      childInfo: {
        name: '',
        gender: 'boy',
        avatar: '',
        birthday: '',
        relation_name: ''
      },
      errorMessage: {
        name: '',
        birthday: ''
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
  created() {
    this.fetchData()
  },
  watch: {
    listenData(val) {
      this.childInfo = val
    },
    radio(val) {
      localStorage.setItem('radio', val)
      val == '1' ? this.childInfo.gender = 'boy' : this.childInfo.gender = 'girl'
    },
    currentDate(val) {
      this.childInfo.birthday = format(new Date(val), 'yyyy-MM-dd')
    },
    childInfo: {
      handler(val) {
        localStorage.setItem('childInfo', JSON.stringify(val))
      },
      deep: true
    },
    $router: 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {
      if (localStorage['childInfo'] != undefined) {
        this.childInfo = JSON.parse(localStorage['childInfo'])
      }

      if (localStorage['radio'] != undefined) {
        this.radio = localStorage['radio']
      }

      if (this.$route.query.id) {
        axios.get(`/book/family/getChildByUser?child_id=${this.$route.query.id}`).then(res => {
          let date = new Date(res.data.data.birthday * 1000)
          this.childInfo.name = res.data.data.name
          this.childInfo.avatar = res.data.data.avatar
          this.childInfo.gender = res.data.data.sex
          this.childInfo.relation_name = res.data.data.relation_name
          this.currentDate = date

          if (res.data.data.is_current_child == 1 || this.userDataState.child_id == this.$route.query.id) {
            this.settingSurrent = true
          }

          this.info = res.data.data
        })
      }

    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
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
            this.childInfo.avatar = res.data.data.thumb
          } else {
            this.$toast.fail('上传失败,请重新上传')
          }
        })
      })
    },
    onClickLeft() {
      if(this.$route.query.back){
        this.$router.push({
          name:this.$route.query.back
        })
      }else{
        this.$router.push({
          name: 'my'
        })
      }
    },
    cancelPicker() {
      this.childInfo.birthday = ''
      this.pickerShow = false
    },
    // 孩子添加编辑API
    operationApi(id) {

      if (id) {
        this.childInfo.id = id
      }

      this.submitLoading = true
      return new Promise((resolve, reject) => {
        axios.post('/book/baby/edit', this.childInfo).then(res => {
          if (res.data.status) {
            this.getUserData()
            resolve(res.data.data.child_id)
          }
        })
      })
    },
    submit() {
      if (!this.childInfo.avatar) {
        this.$toast.fail('请上传头像')
      }

      if (!this.childInfo.name || this.childInfo.name.match(/^[\u4e00-\u9fa5]{2,4}$/i) == null) {
        this.errorMessage.name = '请正确填写孩子的姓名'
        setTimeout(() => {
          this.errorMessage.name = ''
        }, 2000)
      } else if (this.childInfo.birthday == '') {
        this.errorMessage.birthday = '请填写孩子的生日'
        setTimeout(() => {
          this.errorMessage.birthday = ''
        }, 2000)
      } else {
        this.operationApi().then(res => {
          
          if(this.$route.query.back == 'register'){
            this.show = true
          }else{
            this.$router.push({
              name:'home'
            })
          }


          this.submitLoading = false

          if (!res) {
            this.$toast.fail('创建失败')
          }
        })
      }
    },
    edit() {
      this.operationApi(this.$route.query.id).then(res => {

        this.$router.push({
          name: 'my'
        })

        if (res) {
          this.$toast.success('修改成功')
        } else {
          this.$toast.success('修改成功')
        }
      })
    },
    onClickRight(type) {
      if (type == 'jump') {
        this.$router.push({
          name: 'my'
        })
      }
      if (type == 'delete') {
        this.$dialog.alert({
          message: `<div class='text-center'>确定要删除吗？</div>`,
          confirmButtonText: '取消',
          cancelButtonText: '确认',
          showCancelButton: true
        }).then(() => {
          this.$router.push({
            name: 'my'
          })
        }).catch(() => {
          axios.get(`/book/baby/del?child_id=${this.$route.query.id}`).then(res => {
            this.getUserData()
            this.$router.push({
              name: 'my'
            })
          })
        })
      }
    },
    toSetting(info) {
      this.operationApi().then(res => {
        this.$router.push({
          name: 'edit-setting',
          query: {
            id: res,
            back: this.$route.name,
            type: this.$route.query.type,
            pageTitle: this.$route.query.pageTitle
          }
        })
      })
    },
    onInput(checked) {
      if (checked) {
        axios.get(`/book/MemberChild/top?child_id=${this.$route.query.id}`).then(res => {
          this.getUserData()
        })
      }
    }
  }
}
</script>
<style>
.add-child .van-cell__title.cell-school-title {
  flex: 5;
}
</style>

