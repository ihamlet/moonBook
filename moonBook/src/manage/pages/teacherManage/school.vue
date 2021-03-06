<template>
  <div class="manage-school page-padding">
    <van-nav-bar :title="manageSchoolInfo?manageSchoolInfo.school_name:'学校管理'" :border='false' @click-right="isSelectSchool = true">
        <div class="theme-color" slot="right" v-if='schoolList.length > 1'>
            切换学校
        </div>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable animated sticky color='#0084ff' :line-width='20' :line-height='4' :border='false' @change="onTabChange">
      <van-tab title="办卡数据">
          <dataCard ref='dataCard' :active='active'/>
      </van-tab>
      <van-tab>
        <div class="tab-title" slot="title">
          学校管理 <van-tag round class="tag-danger" type="danger" v-if='count > 0' size="medium">{{count}}</van-tag>
        </div>
        <personnel :drag='drag' :studentCount='studentCount' @getCount='getCount' ref='personnel'/>
      </van-tab>
      <van-tab title="班级管理">
        <banjiList moduleType='tab' :classYear='classYear' :drag='drag' ref='banjiList' @onRefresh='setBanjiYear'/>
      </van-tab>
    </van-tabs>

    <van-action-sheet v-model="isSelectSchool" :actions="schoolActions" cancel-text="取消" @select="onSelect" @cancel="isSelectSchool = false" />

    <transition enter-active-class="slideInUp animated" leave-active-class="slideOutDown animated" mode="out-in">
      <div class="footer-bar flex flex-align" v-if='(drag||top2bottom) && active > 0 && btnText.isFooterBtnShow'>
        <div class="theme-color" @click="onClickDrag" v-if='manageSchoolInfo.role_id == 1'>{{drag?'完成排序':'排序'}}</div>
        <van-button class="theme-btn" square type="primary" @click="add">{{btnText.text}}</van-button>
      </div>
    </transition>

    <van-popup v-model="drag" position="top" :overlay="false" :lock-scroll='false' get-container='#app'>
      <div class="tips-text">请按住列表项左侧头像或是名称进行拖动排序</div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
// import overview from './../../module/class/overview'
import personnel from './../../module/personnel'
import dataCard from './../../module/data/dataCard'
import banjiList from './../list/banjiList'
import qs from 'qs'

import { mapState, mapGetters, mapActions,mapMutations } from 'vuex'
import { getBanjiYear,watchTouch,manageSchoolList,verification } from './../../../components/lib/js/mixin'

export default {
  name: 'manageSchool',
  mixins:[getBanjiYear, watchTouch, manageSchoolList, verification],
  components: {
    // overview,
    banjiList,
    personnel,
    dataCard
  },
  computed: {
    ...mapGetters('manage',['manageSchoolInfo']),
    ...mapState('manage',['schoolList']),
    btnText(){
      let manage = {
        text:'邀请老师',
        isFooterBtnShow: true
      }

      switch(this.active){
        case 1:
          manage.text = '邀请老师'
          break
        case 2:
          manage.text = '创建班级'
          manage.isFooterBtnShow = this.verification('修改班级')
          break
      }

      return manage
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
    if(to.name == 'apps-school' && to.query.back == 'apps-school' ){
      let data = {
        id: from.query.sid
      }
      next({path:`/apps-school?${qs.stringify(data)}`})
    }else{
      next()
    }
  },
  data() {
    return {
      active: Number(localStorage.getItem('manageTab')) || 1,
      isSelectSchool: false,
      count:0,
      studentCount:0,
      schoolId:0,
      drag: false,
      banjiYear:''
    }
  },
  watch: {
    schoolId(val){
      this.getCount(val)
    }
  },
  created() {
    this.getCount(this.manageSchoolInfo.school_id)
  },
  methods: {
    ...mapActions('manage',['getSchoolList']),
    ...mapMutations('manage',['setManageSchool']),
    async onSelect(item){
        localStorage.setItem('schoolActive',item.index)

        const toast = this.$toast.loading({
          forbidClick: true, 
          loadingType: 'spinner'
        })

        await this.setManageSchool(item)

        this.schoolName = item.school_name
        this.schoolId = item.school_id

        if(this.$refs.personnel){
          this.$refs.personnel.onRefresh()
        }

        if(this.$refs.dataCard){
          this.$refs.dataCard.fetchData()
          this.$refs.dataCard.clear()
        }

        if(this.$refs.banjiList){
          this.$refs.banjiList.onRefresh()
        }

        toast.clear()
        this.isSelectSchool = false
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
    setBanjiYear(year){
      this.banjiYear = year
    },
    add(){
      switch(this.btnText.text){
        case '邀请老师':
          this.$router.push({
            name:'teacherShare'
          })
          break
        case '创建班级':
          this.$router.push({
            name:'banjiEdit',
            query:{
              school_id: this.manageSchoolInfo.school_id,
              school_name: this.manageSchoolInfo.school_name,
              year:  this.banjiYear || this.classYear,
              title:'',
              grade_name: '小班',
              pageTitle:'创建班级',
              pageType:'add'
            }
          })
          break
      }
    },
    onClickDrag(){
      this.drag = !this.drag
      if(!this.drag&&this.$refs.personnel){
        this.$refs.personnel.submitSort()
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


