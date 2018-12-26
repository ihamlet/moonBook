<template>
  <div class="add-child">
    <van-nav-bar :title="$route.query.pageTitle" left-arrow left-text="注册" @click-left="onClickLeft" />
    <div class="teacher-form" v-if='managerType'>
      <van-radio-group>
        <div class="form-title">学校设置(必填)</div>
        <van-cell-group>
          <van-cell value='设置' :title="cellTitle[0]" :label='cellTitle[1]' title-class='cell-school-title' center is-link @click="toSetting" />
        </van-cell-group>
      </van-radio-group>
      <div class="office">
        <div class="form-title">职位设置</div>
        <van-cell-group>
          <van-field v-model="office" input-align='right' label="职位" readonly placeholder="请选择职位" @click="selectOffice"/>
        </van-cell-group>
      </div>

      <van-popup v-model="show" position="bottom" get-container='#app'>
        <van-picker :columns="jobList" @change="onChange" />
      </van-popup>

      <!-- 提交编辑 -->
      <div class="form-submit">
        <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="large" @click="submit">提交</van-button>
      </div>
    </div>
    <div class="verify" v-else>
      <div class="wait-prompt">
        <i class="iconfont">&#xe7ee;</i>
        <h3 class="prompt-text">请等待校方审核...</h3> 
        <div class="theme-color" @click="$router.push({name:'home'})">返回首页</div>
      </div>
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
    ...mapGetters(['userDataState']),
    jobList(){
      let array = []
      if(this.$route.query.registerType == 'teacher' && this.userDataState.teacher_school_typecode == '141203'){
        array = ['班主任','任课老师','行政','其它']
      }

      if(this.$route.query.registerType == 'teacher' && this.userDataState.teacher_school_typecode == '141204'){
        array = ['带班老师','信息老师','生活老师','其它']
      }
      
      if(this.$route.query.registerType == 'headmaster' && this.userDataState.teacher_school_typecode == '141203'){
        array = ['校长','副校长']
      }

      if(this.$route.query.registerType == 'headmaster' && this.userDataState.teacher_school_typecode == '141204'){
        array = ['园长','副园长']
      } 

      return array
    },
    managerType(){
      let purview
      if(this.$route.query.registerType == 'teacher' && this.userDataState.isTeacher < 2){
        purview = true
      }

      if(this.$route.query.registerType == 'headmaster' && this.userDataState.isHeaderTeacher < 2){
        purview = true
      }
      
      return purview
    },
    cellTitle(){
      let array = []

      if(this.$route.query.registerType == 'teacher'){
        array = [this.userDataState.teacher_school_name,this.userDataState.teacher_banji_name]
      }

      if(this.$route.query.registerType == 'headmaster'){
        array = [this.userDataState.header_teacher_school_name,'']
      }

      return array
    }
  },
  data() {
    return {
      office: '',
      show: false,
      submitLoading: false,
    }
  },
  methods: {
    ...mapActions(['getUserData']),
    onClickLeft() {
      this.$router.push({
        name: 'register'
      })
    },
    submit() {

    },
    toSetting() {
      this.$router.push({
        name: 'edit-setting',
        query: {
          registerType: this.$route.query.registerType,
          pageTitle: this.$route.query.pageTitle
        }
      })
    },
    selectOffice(){
      if(this.userDataState.teacher_school_typecode){
        this.show = true
      }else{
        this.$toast('您需要选择学校，才可以选择所在学校中的职位。感谢您的辛劳付出。')
      }
    },
    onChange(picker, value, index){
      this.office = value
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

.wait-prompt{
  display: grid;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 20rem /* 320/16 */;
}

.wait-prompt .iconfont{
  font-size: 3.75rem /* 60/16 */;
  background: linear-gradient(127deg, #d5f2ff,#2196F3);
  -webkit-background-clip: text;
  color: transparent;
}

.prompt-text{
  margin: 1.25rem /* 20/16 */ 0;
}
</style>
<style>
.cell-school-title.van-cell__title{
  flex:6;
}
</style>

