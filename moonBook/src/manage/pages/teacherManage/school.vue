<template>
  <div class="manage-school">
    <van-nav-bar :title="schoolName?schoolName:'学校管理'" :border='false' @click-right="isSelectSchool = true">
        <div class="theme-color" slot="right" v-if='schoolList.length > 1'>
            切换学校
        </div>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated sticky color='#0084ff' :line-width='20' :line-height='4'>
      <van-tab>
        <div class="tab-title" slot="title">
          人员审核 <van-tag round class="tag-danger" type="danger" v-if='count > 0'>{{count}}</van-tag>
        </div>
        <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
          <userCard v-for='(item,index) in teacherList' :key="index" :item='item' :isMaster='isMaster' :isHead='isHead' :isSchoolHead='isSchoolHead' @statusChange='getCount(schoolId)'/>
        </van-list>
      </van-tab>
      <van-tab title="人员管理">
        <div class="banji-overview flex flex-align">
          <div class="people">学生24人/家长36人</div>
          <div class="theme-color">+ 邀请</div>
        </div>
        <teacherList />
        <childList />
      </van-tab>
      <van-tab title="内容审核">
        1111
      </van-tab>
      <van-tab title="班级管理">
        11
      </van-tab>
    </van-tabs>
    <van-popup class="select-school-list" v-model="isSelectSchool" get-container='#app'>
        <van-nav-bar title="切换学校" @click-right="isSelectSchool = false">
            <van-icon class="close-icon" name="close" slot="right"/>
        </van-nav-bar>
        <van-cell title-class='select-school-title' :value="item.duty" center size="large" v-for='(item,index) in schoolList' :key="index" is-link @click="selectSchool(item,index)">
            <div class="school-name" v-line-clamp:20="1" slot="title">
            {{item.school_name}}
            </div>
        </van-cell>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import overview from './../../module/class/overview'
import userCard from './../../module/user/userCard'
import teacherList from './../../module/teacher/teacherList'
import childList from './../../module/user/childList'

import { mapGetters, mapActions,mapMutations } from 'vuex'

export default {
  name: 'manageSchool',
  components: {
    overview,
    userCard,
    teacherList,
    childList
  },
  computed: {
    ...mapGetters('manage',['manageSchoolInfo'])
  },
  data() {
    return {
      active: 0,
      teacherList: [],
      schoolList: [],
      isSelectSchool: false,
      schoolName:'',
      count:0,
      loading: false,
      finished: false,
      page:1,
      schoolId:0,
      isMaster:0,
      isHead:0,
      isSchoolHead:0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.request()
    })
  },
  watch: {
    schoolId(val){
      this.getCount(val)
    }
  },
  methods: {
    ...mapActions('manage',['getSchoolList']),
    ...mapMutations('manage',['setManageSchool']),
    request() {
      this.getSchoolList().then(res=>{
        this.schoolList = res

        let index = localStorage.getItem('schoolActive')?localStorage.getItem('schoolActive'):0

        this.school_id = res[index].school_id
        this.isMaster = Number(res[index].is_master)
        this.isSchoolHead = res[index].is_school_head
        this.isHead = res[index].is_head

        this.getCount(res[index].school_id)
      })
    },
    selectSchool(item,index){
        localStorage.setItem('schoolActive',index)
        this.setManageSchool(item)

        this.isMaster = Number(item.is_master)
        this.isHead = item.is_head
        this.isSchoolHead = item.is_school_head
        
        this.page = 1
        this.schoolId = item.school_id

        this.onLoad().then(()=>{
            this.loading = false
        })

        this.isSelectSchool = false
    },
    onLoad(){
        return axios.get('/SchoolManage/teacher/getList',{params:{
            school_id: this.manageSchoolInfo.school_id,
            page: this.page
        }}).then(res => {
            switch (res.data.status) {
              case 1:
                this.teacherList = res.data.data
                this.schoolName = res.data.data[0].school_name
                
                this.page++
                this.loading = false

                if(this.teacherList.length >= res.data.count){
                  this.finished = true
                }

                break
              default:
                this.$toast(res.data.msg)
            }
        })
    },
    getCount(schoolId){
        let data = {
            params:{
                school_id: schoolId,
                is_confirm: 0
            }
        }

        axios.get('/SchoolManage/teacher/getList',data).then(res => {
            switch (res.data.status) {
            case 1:
              this.count = res.data.count
              break
            default:
              this.$toast(res.data.msg)
            }
        })
    }
  }
}
</script>

<style scoped>
.banji-overview {
  height: 45px;
  line-height: 45px;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 13px;
}

.select-school-list {
  width: 80%;
  border-radius: 8px;
  padding-bottom: 10px;
}

.close-icon{
  font-size: 20px;
  color: #C0C4CC;
}

.tab-title{
  position: relative;
}

.tag-danger{
  position: absolute;
  z-index: 1;
  top: 5px;
  right: -5px;
}
</style>


