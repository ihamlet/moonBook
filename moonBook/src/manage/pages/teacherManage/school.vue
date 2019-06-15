<template>
  <div class="manage-school page-padding">
    <van-nav-bar :title="schoolName?schoolName:'学校管理'" :border='false' @click-right="isSelectSchool = true">
        <div class="theme-color" slot="right" v-if='schoolList.length > 1'>
            切换学校
        </div>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated sticky color='#0084ff' :line-width='20' :line-height='4' :border='false'>
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
            <draggable v-model="teacherList" @update="datadragEnd" :options="{animation:500}" :disabled="!drag">
              <transition-group>
                <div class="user-card" v-for='item in teacherList' :key='item.id'>
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

    <transition enter-active-class="slideInUp animated" leave-active-class="slideOutDown animated" mode="out-in">
      <div class="footer-bar flex flex-align" v-if='drag||top2bottom'>
        <div class="theme-color" @click="onDrag">{{drag?'完成排序':'排序'}}</div>
        <van-button class="theme-btn" square type="primary">{{active == 0?'邀请成员':'创建班级'}}</van-button>
      </div>
    </transition>

    <van-popup v-model="drag" position="top" :overlay="false">
      <div class="tips-text">请拖动列表项进行排序</div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import overview from './../../module/class/overview'
import userCard from './../../module/user/userCard'
import teacherList from './../../pages/list/teacherList'
import childList from './../../module/user/childList'
import banjiList from './../list/banjiList'

import { mapGetters, mapActions,mapMutations } from 'vuex'
import { isRepeatAdminArr } from './../../../components/lib/js/util'
import { getBanjiYear,watchTouch } from './../../../components/lib/js/mixin'

import draggable from 'vuedraggable'

export default {
  name: 'manageSchool',
  mixins:[getBanjiYear,watchTouch],
  components: {
    overview,
    userCard,
    teacherList,
    childList,
    banjiList,
    draggable
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
    selectSchool(item,index){
        localStorage.setItem('schoolActive',index)
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

        this.$refs.banjiList.onRefresh()

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
    onDrag(){
      this.drag = !this.drag
    },
    datadragEnd(evt){
      // console.log(evt,this.teacherList)
      console.log('拖动后的索引 :' + evt.newIndex)      
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
}

.footer-bar .theme-btn{
  flex: 2
}

.tips-text{
  text-align: center;
  line-height: 44px;
  background: #409EFF;
  color: #fff;
}
</style>


