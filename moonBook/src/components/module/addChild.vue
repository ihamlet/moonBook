<template>
    <div class="add-child">
        <van-nav-bar v-if="userDataState.childInfo.length!=0" :title="pageTitle=='addBaby'?'添加宝贝':'编辑'" left-arrow left-text="返回" :right-text="pageTitle=='addBaby'?'':'删除'" @click-left="onClickLeft" @click-right="onClickRight('delete')" />
        <van-nav-bar v-else title="添加孩子" right-text="跳过" @click-right="onClickRight('jump')" />
        <div class="avatar-uploader">
            <i class="iconfont" v-if='userDataState.vipInfo' :class="`vip-${userDataState.vipInfo.card.level.name}`">&#xe776;</i>
            <van-uploader :after-read="onRead">
                <div class="prompt" v-if='!childInfo.avatar'>
                    <avatar :gender='childInfo.gender'/>
                    <div class="text">请上传头像</div>
                </div>
                <div class="avatar-preview" v-else>
                    <img :src="childInfo.avatar" alt="女孩默认头像">
                </div>
            </van-uploader>
        </div>
        <van-cell-group>
            <van-field v-model="childInfo.name" input-align='right' label="孩子姓名" placeholder="请输入孩子姓名" :error-message="errorMessage.name"/>
            <van-field v-model="childInfo.birthday" input-align='right' readonly label="孩子生日" placeholder="请选择日期" :error-message="errorMessage.birthday" @click="pickerShow = true" />
            <van-field v-model="childInfo.familyTitle" input-align='right' label="您是孩子的？" placeholder="例如：爸爸" />
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

        <!-- 截图工具 -->
        <van-popup class="cropper-popup" v-model="cropperShow" get-container='#app'>
            <vue-cropper class="theme-cropper" ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"></vue-cropper>
            <van-button class="theme-btn" round type="primary" @click="getCropData">完成</van-button>
        </van-popup>

        <!-- 日期选择器 -->
        <van-popup class="picker-popup" position="bottom" v-model="pickerShow">
            <van-datetime-picker title='日期选择' v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="pickerShow = false" @cancel='cancelPicker'/>
        </van-popup>

        <!-- 提交编辑 -->
        <div class="form-submit" v-if="pageTitle=='editBaby'">
            <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="edit">提交修改</van-button>
        </div>

        <!-- 添加宝贝 -->
        <div class="form-submit" v-else>
            <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="submit">提  交</van-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { format } from './../lib/js/util.js'
import avatar from './../module/avatar'

export default {
  name: 'add-child',
  props: ['pageTitle', 'dataId', 'listenData'],
  components: {
    VueCropper,
    avatar
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      radio: '1',
      submitLoading: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(format(new Date(), 'yyyy') - 20, 0, 0),
      maxDate: new Date(format(new Date(), 'yyyy') - 1, 0),
      currentDate: new Date(format(new Date(), 'yyyy') - 2, 0, 0),
      childInfo: {
        name: '',
        gender: 'boy',
        avatar: '',
        birthday: '',
        familyTitle: ''
      },
      errorMessage: {
        name: '',
        birthday: ''
      },
      pickerShow: false,
      cropperShow: false,
      option: {
        img: '',
        size: 1,
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
      val == '1'? (this.childInfo.gender = 'boy') : (this.childInfo.gender = 'girl')
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
    fetchData() {
      if (localStorage['childInfo'] != undefined) {
        this.childInfo = JSON.parse(localStorage['childInfo'])
      }

      if (localStorage['radio'] != undefined) {
        this.radio = localStorage['radio']
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onRead(file) {
      this.cropperShow = true
      this.option.img = file.content
    },
    getCropData() {
      this.$refs.cropper.getCropData(data => {
        this.childInfo.avatar = data
        setTimeout(() => {
          this.cropperShow = false
        }, 1000)
      })
    },
    onClickLeft() {
      this.$emit('close')
    },
    cancelPicker() {
      this.childInfo.birthday = ''
      this.pickerShow = false
    },
    submit() {
      if (
        !this.childInfo.name ||
        this.childInfo.name.match(/^[\u4e00-\u9fa5]{2,4}$/i) == null
      ) {
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
        this.submitLoading = true
        axios
          .put('/api/addChild', {
            childInfo: this.childInfo
          })
          .then(res => {
            this.$store.dispatch('getUserData')
            setTimeout(() => {
              this.$toast.success('添加成功')
              this.submitLoading = false
              this.$emit('close')
            }, 1000)
          })
      }
    },
    edit() {
      axios
        .put('/api/editChild', {
          id: this.dataId,
          childInfo: this.childInfo
        })
        .then(res => {
          this.$store.dispatch('getUserData')
          this.submitLoading = true
          setTimeout(() => {
            this.$toast.success('修改成功')
            this.submitLoading = false
            this.$emit('close')
          }, 1000)
        })
    },
    onClickRight(type) {
      if (type == 'jump') {
        this.$emit('close')
      }
      if (type == 'delete') {
        this.$dialog.alert({
            message: `<div class='text-center'>确定要删除吗？</div>`,
            confirmButtonText: '取消',
            cancelButtonText: '确认',
            showCancelButton: true
          }).then(() => {
            this.$emit('close')
          }).catch(() => {
            axios.put('/api/deleteChild', {
                id: this.dataId
              }).then(res => {
                this.$store.dispatch('getUserData')
                setTimeout(() => {
                  this.$toast.success('删除成功')
                  this.submitLoading = false
                  this.$emit('close')
                }, 1000)
              })
          })
      }
    }
  }
}
</script>
<style scoped>
</style>

