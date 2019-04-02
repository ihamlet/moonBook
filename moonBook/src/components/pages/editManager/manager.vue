<template>
  <div class="add-child">
    <van-nav-bar :title="$route.query.pageTitle" :border='false'/>

    <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>注册申请</van-step>
      <van-step>等待审核</van-step>
      <van-step>通过</van-step>
    </van-steps>

    <div class="teacher-form" v-if='active == 0'>
      <van-radio-group>
        <div class="form-title">学校设置</div>
        <van-cell-group>
          <van-cell value='设置' :title="managerData.school_name" :label='formatBanjiTitle(managerData.banji_name)' title-class='cell-school-title'
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

    <div class="verify" v-if='active == 1'>
      <van-cell-group>
        <van-cell title="提交时间" :value="getTime(managerData.update_time)"/>
        <van-cell title="学校" :label="managerData.school_name" is-link center @click="toSchool"/>
        <van-cell v-if='managerData.banji_name' title="班级" :label="formatBanjiTitle(managerData.banji_name)" is-link center @click="toBanji"/>
        <van-cell title="职务" :value="managerData.duty"/>
      </van-cell-group>
    </div>

    <div class="manage" v-if='active == 2'>
      <apps :appsList='appsList'/>
    </div>

    <div class="footer-bar">
      <van-button class="theme-btn" square type="primary" size="large" :loading='loading'  @click="setStep">{{btnText}}</van-button> 
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapGetters } from 'vuex'
import { format } from './../../lib/js/util'
import apps from './../../module/myModule/apps'

export default {
  name: 'teacher',
  components: {
    apps
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState']),
    jobList() {
      let array = []

      if (this.$route.query.registerType == 'teacher') {
        array = ['带班老师', '信息老师', '生活老师', '班主任', '任课老师', '其他']
      }

      if (this.$route.query.registerType == 'headmaster') {
        array = ['校长', '副校长']
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
      }]
    }
  },
  created() {
    this.fetchData()
    this.office = this.managerData.duty
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
          this.btnText = '修改申请'
        break
      }
    }
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

          switch(res.data.data.is_confirm){
            case '0':
              this.active = 1 //正在审核
            break
            case '1': //审核通过
              this.active = 2
            break
            case '2': //审核被拒绝
              this.active = 1
            break
          }

          this.schoolInfo = res.data.school
          this.office = res.data.data.duty
        }
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
          this.$router.replace({
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
      if (this.managerData.is_confirm == 1) {
        this.$dialog.alert({
          message: '您的注册表单已经通过审核，修改将会重新提交表单进行审核，您确定要修改吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true
        }).then(() => {
          this.office = value

        }).catch(() => {
          this.show = false
        })
      } else {
        this.office = value
      }
    },
    setStep(){
      switch(this.active){
        case 0:
          this.loading = true
          let data = {
            params: {
              school_id: this.managerData.school_id,
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

          data.params.duty = this.office
          
          axios.get('/book/SchoolTeacher/bind', data).then(res => {
            this.loading = false
            if (res.data.status == 1) {
              this.active = 1
              this.fetchData()
            }
          })
        break
        case 1:
          this.active = 0
        break
        case 2:
          this.active = 0
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
    formatBanjiTitle(text){
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
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

