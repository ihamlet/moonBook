<template>
  <div class="manage-school page-padding">
    <van-nav-bar :title="schoolName?schoolName:'学校管理'" :border='false' @click-right="isSelectSchool = true">
        <div class="theme-color" slot="right" v-if='schoolList.length > 1'>
            切换学校
        </div>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated sticky color='#0084ff' :line-width='20' :line-height='4' :border='false' @change="onTabChange">
      <van-tab>
        <div class="tab-title" slot="title">
          人员管理 <van-tag round class="tag-danger" type="danger" v-if='count > 0' size="medium">{{count}}</van-tag>
        </div>
        <van-cell-group :border='false'>
          <van-cell title="各班待审核的人员" is-link @click="toBanjiTree">
            <van-tag round type="danger" size="medium" v-if='studentCount > 0'> {{studentCount}}人 </van-tag>
          </van-cell>
        </van-cell-group>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" :disabled='drag'>
          <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
            <draggable v-model="teacherList" @update="datadragEnd" :options="{animation:500}" :disabled="!drag" handle=".info">
              <transition-group>
                <div class="user-card flex flex-align" v-for='item in teacherList' :key='item.id' v-if='item.user_id > 0'>
                  <userCard :item='item' :isMaster='isMaster' :isHead='isHead' :isSchoolHead='isSchoolHead' @statusChange='setStutas'/>
                </div>
              </transition-group>
            </draggable>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="班级管理">
        <banjiList moduleType='tab' :classYear='classYear' :drag='drag'  ref='banjiList'/>
      </van-tab>
    </van-tabs>

    <van-action-sheet v-model="isSelectSchool" :actions="schoolActions" cancel-text="取消" @select="onSelect" @cancel="isSelectSchool = false" />

    <transition enter-active-class="slideInUp animated" leave-active-class="slideOutDown animated" mode="out-in">
      <div class="footer-bar flex flex-align" v-if='drag||top2bottom'>
        <div class="theme-color" @click="drag = !drag" v-if='isSchoolHead||isHead||isMaster'>{{drag?'完成排序':'排序'}}</div>
        <van-button class="theme-btn" square type="primary" @click="share">{{btnText}}</van-button>
      </div>
    </transition>

    <van-popup v-model="drag" position="top" :overlay="false" :lock-scroll='false' get-container='#app'>
      <div class="tips-text">请按住列表项左侧头像或是名称进行拖动排序</div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import overview from './../../module/class/overview'
import userCard from './../../module/user/userCard'
import banjiList from './../list/banjiList'

import { mapGetters, mapActions,mapMutations } from 'vuex'
import { isRepeatAdminArr } from './../../../components/lib/js/util'
import { getBanjiYear,watchTouch,manageSchoolList } from './../../../components/lib/js/mixin'

import draggable from 'vuedraggable'

export default {
  name: 'manageSchool',
  mixins:[getBanjiYear, watchTouch, manageSchoolList],
  components: {
    overview,
    userCard,
    banjiList,
    draggable
  },
  computed: {
    ...mapGetters('manage',['manageSchoolInfo']),
    btnText(){
      let text

      switch(this.active){
        case 0:
          text = '邀请老师'
          break
        case 1:
          text = '创建班级'
          break
      }


      return text
    }
  },
  data() {
    return {
      active: localStorage.getItem('manageTab') || 0,
      teacherList: [],
      schoolList: [],
      isSelectSchool: false,
      schoolName:'',
      count:0,
      studentCount:0,
      loading: false,
      finished: false,
      page:1,
      schoolId:0,
      isMaster:0,
      isHead:0,
      isSchoolHead:0,
      drag: false
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

        this.schoolName = res[index].school_name
        this.school_id = res[index].school_id
        this.isMaster = Number(res[index].is_master)
        this.isSchoolHead = res[index].is_school_head
        this.isHead = res[index].is_head

        this.getCount(res[index].school_id)

      })
    },
    onSelect(item){
        localStorage.setItem('schoolActive',item.index)

        this.setManageSchool(item)

        this.schoolName = item.school_name
        this.isMaster = Number(item.is_master)
        this.isHead = item.is_head
        this.isSchoolHead = item.is_school_head
       
        this.page = 1
        this.schoolId = item.school_id

        this.onLoad().then(()=>{
          this.loading = false
        })

        if(this.$refs.banjiList){
          this.$refs.banjiList.onRefresh()
        }

        this.isSelectSchool = false
    },
    onLoad(){

        let data = {
          params:{
            page: this.page
          }
        }

        if(this.manageSchoolInfo){
          data.params.school_id = this.manageSchoolInfo.school_id
        }

        return axios.get('/SchoolManage/teacher/getList',data).then(res => {
            switch (res.data.status) {
              case 1:
                if(this.page == 1){
                  this.teacherList = res.data.data
                }else{
                  this.teacherList = this.teacherList.concat(res.data.data)  
                }
                                
                this.page++
                this.loading = false

                if(arr >= res.data.count){
                  this.finished = true
                }

                break
              default:
                this.$toast(res.data.msg)
            }
        })
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(()=>{
        this.loading = false
        this.finished = false
      })
    },
    onTabChange(index){
      localStorage.setItem('manageTab',index)
    },
    getCount(schoolId){
        let data = {
            params:{
                school_id: schoolId,
                is_confirm: 0,
                is_banji_confirm: 0
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

        axios.get('/SchoolManage/students/getList',data).then(res =>{
            switch (res.data.status) {
              case 1:
                this.studentCount = res.data.count
                break
              default:
                this.$toast(res.data.msg)
            }
        })
    },
    toBanjiTree(){
      this.$router.push({
        name:'banjiTree',
        query:{
          school_id: this.manageSchoolInfo.school_id,
          year: this.classYear
        }
      })
    },
    setStutas(id,type){

      this.teacherList.map(e=>{
        if(e.id == id){
          return e.is_confirm  = type == 'check'?1:0
        }
      })

      this.getCount()
      
    },
    datadragEnd(evt){
      let arr = this.teacherList.map((e,i)=>{
          e.school_index = i
          return e
      })

      axios.post('/SchoolManage/Teacher/setIndex',arr).then(res=>{})

    },
    share(){
      switch(this.btnText){
        case '邀请老师':
          this.$router.push({
            name:'teacherShare'
          })
          break
      }
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

.tab-title{
  position: relative;
}

.tag-danger{
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 50%;
  margin-right: -50px;
}

.add-banji-btn{
  position: fixed;
  z-index: 999;
  left: 50%;
  bottom: 50px;
}

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}

.footer-bar .theme-color{
  flex: 1;
  text-align: center;
  font-size: 13px;
}

.footer-bar .theme-btn{
  flex: 2
}

.tips-text{
  text-align: center;
  line-height: 44px;
  background: #409EFF;
  color: #fff;
  font-size: 13px;
}

.handle{
  background: #fff;
  position: absolute;
}

.user-card{
  background: #fff;
}
</style>


