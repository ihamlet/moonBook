<template>
  <div class="add-child">
    <van-nav-bar :title="pageTitle" :border='false' :right-text="active==2?'重新注册':''" @click-right="renewReg"/>

    <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>注册申请</van-step>
      <van-step>等待审核</van-step>
      <van-step>通过</van-step>
    </van-steps>

    <div class="teacher-form" v-if='active == 0'>
      <van-radio-group>
        <div class="form-title">学校设置</div>
        <van-cell-group>
          <van-cell value='设置' :title="managerData.school_name" size='large' :label='formatBanjiTitle(managerData.banji_name)' title-class='cell-school-title' center is-link @click="toSetting(managerData)" />
        </van-cell-group>
      </van-radio-group>
      <div class="office" v-if='jobList'>
        <div class="form-title">职位设置</div>
        <van-cell-group>
          <van-field v-model="office" input-align='right' label="职位" readonly placeholder="班主任" @click="selectOffice" />
        </van-cell-group>
      </div>

      <van-popup v-model="show" position="bottom" get-container='#app'>
        <van-picker ref='officePicker' :columns="jobList" @change="onChange" title="选择职位" @cancel="onClose" @confirm="onConfirm" show-toolbar :visible-item-count='3'/>
        <van-field size='large' label="填写职位" v-model="writeOffice" placeholder="职位信息" input-align='right'/>
      </van-popup>
    </div>

    <div class="verify" v-if='active == 1'>
      <van-cell-group>
        <van-cell title="提交时间" :value="getTime(managerData.update_time)"/>
        <van-cell title="学校" :label="managerData.school_name" center/>
        <van-cell v-if='managerData.banji_name' title="班级" :label="formatBanjiTitle(managerData.banji_name)"/>
        <van-cell title="职务" :value="managerData.duty"/>
      </van-cell-group>
    </div>

    <div class="manage" v-if='active == 2'>
      <apps :appsList='appsList'/>
    </div>

    <div class="footer-bar">
      <van-button class="theme-btn" square type="primary" size="large" :loading='loading' @click="setStep">{{btnText}}</van-button> 
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import { format } from './../../lib/js/util'
import { newBanjiTitle } from './../../lib/js/mixin'
import apps from './../../module/myModule/apps'

export default {
  name: 'teacher',
  mixins: [ newBanjiTitle ],
  components: {
    apps
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState']),
    jobList() {
      let array = []

      if (this.$route.query.registerType == 'teacher') {
        array = ['班主任', '带班老师', '生活老师']
      }

      if (this.$route.query.registerType == 'headmaster') {
        array = ['校长','副校长']
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
    },
    pageTitle(){
      let title
      this.$route.query.registerType == 'teacher'?title = '老师注册':title = '校长注册'
      return title   
    }
  },
  data() {
    return {
      office: '',
      writeOffice: '',
      show: false,
      submitLoading: false,
      managerData: {
        typecode:'141204',
        school_name:'',
        banji_name:'',
        is_confirm: -1
      },
      schoolInfo: '',
      school:'',
      active: 0,
      btnText:'下一步',
      loading: false,
      appsList: [{
        name: '代借还',
        iconClass: 'icon-huanshu',
        routeLink:'/book/ManageBorrow/borrow',
      }, {
        name: '定位码',
        iconClass: 'icon-saomadingwei',
        routeLink:'/book/ManageShelf/location'
      }, {
        name: '数据',
        iconClass: 'icon-shuju',
        routeLink:'/SchoolManage/MemberCard'
      }, {
        name: '权限管理',
        iconClass: 'icon-quanxian',
        routeLink:'/SchoolManage'
      }, {
        name: '捐书',
        iconClass: 'icon-shujia',
        routeLink: '/book/member/entry_donation'
      }],
      renew: true
    }
  },
  created() {
    this.fetchData()
    this.office = this.managerData.duty
  },
  beforeRouteEnter:(to, from, next) => {
    next(vm =>{
      vm.backRouter(from.name)
    })
  },
  watch: {
    '$router': 'fetchData',
    active(val){
      switch(val){
        case 0:
          this.btnText = '下一步'
        break
        case 1:
          this.btnText = '修改申请'
        break
        case 2:
          this.btnText = this.$route.query.registerType == 'teacher'?'前往班级':'前往学校'
        break
      }
    }
  },
  methods: {
    backRouter(routeName){
      if(routeName == 'edit-class' || routeName == 'edit-school'){
        this.renew = false
      }
    },
    fetchData() {

      this.managerData.school_name = this.$route.query.school_name 
      this.managerData.banji_name = this.$route.query.banji_name
      this.managerData.school_id = this.$route.query.school_id
      this.managerData.banji_id = this.$route.query.banji_id 

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
          if(this.renew){
            switch(res.data.data.is_confirm){
              case '0': //正在审核
                this.active = 1
                this.managerData = {
                  ...res.data.data,
                  ...this.$route.query
                }
              break
              case '1': //审核通过
                this.active = 2
              break
              case '2': //审核被拒绝
                this.active = 0
              break
            }
          }else{
            this.active = 0
          }

          // this.office = res.data.data.duty
          // this.managerData.duty = res.data.data.duty
          // this.managerData.update_time = res.data.data.update_time
        }
      })
    },
    toSetting() {
        this.$router.push({
          name: 'edit-setting',
          query: {
            ...this.$route.query,
            school_name: this.managerData.school_name,
            school_id: this.managerData.school_id,
            banji_name: this.formatBanjiTitle(this.managerData.banji_name),
            banji_id: this.managerData.banji_id
          }
        })
    },
    selectOffice() {
      this.writeOffice = ''
      this.show = true
    },
    onChange(picker, value) {
      this.office = value
    },
    setStep(){
      switch(this.active){
        case 0:{
          this.loading = true
          let data = {
            params: {
              ...this.managerData,
              ...this.$route.query
            }
          }

          if (this.$route.query.registerType == 'headmaster') {
            data.params.is_master = 1
          }

          data.params.duty = this.office
          
          axios.get('/book/SchoolTeacher/bind', data).then(res => {
            if (res.data.status == 1) {
              this.loading = false
              this.active = 1
              this.renew = true
              this.fetchData()
            }
          })
          break
        }
        case 1:
          this.active = 0
        break
        case 2:
          switch(this.$route.query.registerType){
            case 'teacher':
              this.$router.push({
                name:'class-home',
                query:{
                  id: this.userDataState.teacher_banji_id
                }
              })
            break
            case 'headmaster':
              this.$router.push({
                name:'apps-school',
                query:{
                  id: this.userDataState.teacher_school_id
                }
              })
            break
          }
        break
      }
    },
    toSchool(){
      this.$router.push({
        name:'apps-school',
        query:{
          id: this.managerData.school_id,
          type:'preview'
        }
      })
    },
    toBanji(){
      this.$router.push({
        name:'class-home',
        query:{
          id: this.managerData.banji_id,
          type:'preview'
        }
      })
    },
    getTime(time){
      return format(time*1000,'yyyy-MM-dd')
    },
    // formatBanjiTitle(text){
    //   if (text && text.indexOf('班') == -1) {
    //     return text + '班'
    //   } else {
    //     let arr = text.split('')
    //     let newArr = [...new Set(arr)]
    //     return newArr.join('')
    //   }
    // },
    onClose(){
      this.$refs.officePicker.setColumnValue(0,0)
      this.show = false
    },
    onConfirm(){
      if(this.writeOffice){
        this.office = this.writeOffice
      }
      this.show = false
    },
    renewReg(){
      this.$dialog.alert({
        message: '您的注册表单已经通过审核，重新注册表单将会重新提交，您确定要重新注册吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true
      }).then(() => {
        this.active = 0
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>
<style scoped>
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

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
}

.manage{
  padding: 30px 10px;
}
</style>
<style>
.cell-school-title.van-cell__title {
  flex: 6;
}
</style>

