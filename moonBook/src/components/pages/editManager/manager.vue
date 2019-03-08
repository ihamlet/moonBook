<template>
  <div class="add-child">
    <van-nav-bar :title="$route.query.pageTitle" left-arrow left-text="注册" @click-left="onClickLeft" />
    <div class="verify" v-if='managerData.is_confirm!=-1'>
      {{status}}
    </div>
    <div class="teacher-form">
      <van-radio-group>
        <div class="form-title">学校设置</div>
        <van-cell-group>
          <van-cell value='设置' :title="managerData.school_name" :label='managerData.banji_name' title-class='cell-school-title'
            center is-link @click="toSetting(managerData)" />
        </van-cell-group>
      </van-radio-group>
      <div class="office" v-if='jobList'>
        <div class="form-title">职位设置</div>
        <van-cell-group>
          <van-field v-model="office" input-align='right' label="职位" readonly placeholder="请选择职位" @click="selectOffice" />
        </van-cell-group>
      </div>

      <van-popup v-model="show" position="bottom" get-container='#app'>
        <van-picker :columns="jobList" @change="onChange" />
      </van-popup>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapGetters } from 'vuex'
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
    ...mapGetters(['userDataState', 'userPointState']),
    jobList() {
      let array = []
      if (this.$route.query.registerType == 'teacher' && this.managerData.typecode == '141203') {
        array = ['班主任', '任课老师', '行政', '其它']
      }

      if (this.$route.query.registerType == 'teacher' && this.managerData.typecode == '141204') {
        array = ['带班老师', '信息老师', '生活老师', '其它']
      }

      if (this.$route.query.registerType == 'headmaster' && this.managerData.typecode == '141203') {
        array = ['校长', '副校长', '其它']
      }

      if (this.$route.query.registerType == 'headmaster' && this.managerData.typecode == '141204') {
        array = ['园长', '副园长', '其它']
      }

      return array
    },
    status(){
      let msg = ''

      if(this.managerData){
        if(this.managerData.is_confirm == 0){
          msg = '您的表单需要审核，请等待审核通过...'
        }else if(this.managerData.is_confirm == 1){
          msg = '表单审核通过'
        }else if(this.managerData.is_confirm == 2){
          msg = '表单审核，被拒绝!'
        }
      }

      return msg
    }
  },
  data() {
    return {
      office: '',
      show: false,
      submitLoading: false,
      managerData: {
        typecode:'141204',
        school_name:'',
        banji_name:'',
        is_confirm: -1
      },
      schoolInfo: ''
    }
  },
  created() {
    this.fetchData()
    this.office = this.managerData.duty
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {

      let data

      if (this.$route.query.registerType == 'headmaster') {
        data = {
          params: {
            is_master: 1
          }
        }
      }

      axios.get('/book/SchoolTeacher/getMine', data).then(res => {
        if(res.data.status){
          this.managerData = res.data.data
          this.schoolInfo = res.data.school
          this.office = res.data.data.duty
        }
      })
    },
    onClickLeft() {
      this.$router.push({
        name: 'register'
      })
    },
    toSetting(managerData) {
      if (managerData.is_confirm == 1) {
        this.$dialog.alert({
          message: '您的注册表单已经通过审核，修改将会重新提交表单进行审核，您确定要修改吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(() => {
          this.$router.push({
            name: 'edit-setting',
            query: {
              registerType: this.$route.query.registerType,
              pageTitle: this.$route.query.pageTitle
            }
          })
        }).catch(() => {
          // on cancel
        })
      } else {
        this.$router.push({
          name: 'edit-setting',
          query: {
            registerType: this.$route.query.registerType,
            pageTitle: this.$route.query.pageTitle
          }
        })
      }
    },
    selectOffice() {
      if (this.managerData.school_id > 0) {
        this.show = true
      } else {
        this.$toast('您需要选择学校，才可以选择所在学校中的职位。感谢您的辛劳付出。')
      }
    },
    onChange(picker, value, index) {
      let data = {
        params: {
          school_name: this.managerData.school_name,
          cityname: this.schoolInfo.cityname,
          lat: this.schoolInfo.lat,
          lng: this.schoolInfo.lng,
          amap_id: this.schoolInfo.amap_id,
          typecode: this.managerData.typecode
        }
      }

      if (this.$route.query.registerType == 'headmaster') {
        data.params.is_master = 1
      }

      data.params.duty = value

      if (this.managerData.is_confirm == 1) {
        this.$dialog.alert({
          message: '您的注册表单已经通过审核，修改将会重新提交表单进行审核，您确定要修改吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(() => {
          this.office = value
          axios.get('/book/SchoolTeacher/bind', data).then(res => {
            if (res.data.status == 1) {
              this.$toast.success('操作成功')
            } else {
              this.$toast.fail('操作失败')
            }
          })
        }).catch(() => {
          this.show = false
        })
      } else {
        this.office = value
        axios.get('/book/SchoolTeacher/bind', data).then(res => {
          if (res.data.status == 1) {
            this.$toast.success('操作成功')
          } else {
            this.$toast.fail('操作失败')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.avatar-uploader .box {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  text-align: center;
}

.avatar-uploader .box .icon.van-icon {
  font-size: 1.625rem /* 26/16 */;
  line-height: 6.25rem /* 100/16 */;
  color: #9e9e9e;
}

.wait-prompt {
  display: grid;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 20rem /* 320/16 */;
}

.wait-prompt .iconfont {
  font-size: 3.75rem /* 60/16 */;
  background: linear-gradient(127deg, #d5f2ff, #2196f3);
  -webkit-background-clip: text;
  color: transparent;
}

.prompt-text {
  margin: 1.25rem /* 20/16 */ 0;
}

.verify {
  text-align: center;
  height: 7.5rem /* 120/16 */;
  line-height: 7.5rem /* 120/16 */;
  font-size: 0.875rem /* 14/16 */;
  color: #909399;
}
</style>
<style>
.cell-school-title.van-cell__title {
  flex: 6;
}
</style>

