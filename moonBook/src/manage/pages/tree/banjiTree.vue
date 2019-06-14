<template>
  <div class="banji-tree flex">
      <div class="dropdown-menu">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
      </div>

    <div class="tree-select">
      <ul class="scroll-y scroll-container">
        <li class="tree-item" v-for='(item,index) in banjiList' :key="index" :class="activeId == index?'select':''" @click="onNavClick(item,index)">
          <div class="banji-title" v-line-clamp:20="1">{{index == 0?item.title:formatBanjiTitle(item.title)}}</div>
          <div class="student-count">{{item.student_count == 0?'尚无成员':`${item.student_count}人`}}</div>
        </li>
      </ul>
    </div>
    <div class="tree-content scroll-y scroll-container">
      <div class="list-wrap page-padding">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" :offset='0'>
            <div class="list-container" v-if='banjiItems.length'>
              <studentCard v-for='(item,index) in banjiItems' :key="index" :item='item' :activeId='activeId' :selectShow='selectShow' @selectShowTrue='selectShow = true' @electChild='selectSwitch'/>
            </div>
            <div class="no-list" v-else-if='value == -1&&currentBanji.invite_code'>
              尚无班级成员 <span class="theme-color" size="normal" @click="invite">邀请家长</span>
            </div>
            <div class="no-list" v-else>
              尚无{{value == 1?'已':'待'}}审核成员
              <b class="invite-code" v-if='activeId != 0&&currentBanji.invite_code' @click="invite">班级邀请码:{{currentBanji.invite_code}}</b>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>


      <transition enter-active-class="fadeInUp animated" leave-active-class="fadeOutDown animated" mode="out-in">
        <div class="footer-bar flex flex-align" v-if='selectShow'>
          <div class="cancel theme-color" @click="selectShow = false">取消</div>
          <van-button square class="switch-class btn" type="primary" @click="toBanjiList('transmit')">换班</van-button>
          <van-button square class="promotion-class theme-btn btn" type="primary" @click="toBanjiList('transmitAll')" v-if='activeId!=0'>升班</van-button>
        </div>
      </transition>
    </div>

    <van-button class="boss-key theme-btn" type="primary" round v-if='value == 0&&banjiItems.length' @click="allCheck">一键审核</van-button>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import studentCard from './../../module/user/studentCard'
import { mapGetters } from 'vuex'

export default {
  name: 'banjiTree',
  components:{
    studentCard
  },
  computed: {
    ...mapGetters('manage',['manageSchoolInfo'])
  },
  data() {
    return {
      banjiList: [],
      banjiItems: [],
      currentBanji:'',
      allStudent:0,
      activeId: Number(this.$route.query.activeId) || 0,
      page: 1,
      loading: false,
      finished: false,
      selectShow: false,
      value: -1,
      option: [
        { text: '全部', value: -1 },
        { text: '待审核', value: 0 },
        { text: '已审核', value: 1 }
      ],
      selectChilds:[]  
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.request()
    })
  },
  watch: {
    value(){
      this.onRefresh()
    }
  },
  methods: {
    request() {
      let data = {
        params: {
          ...this.$route.query,
          is_all: 1
        }
      }

      axios.get('/SchoolManage/banji/getList', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.banjiList = res.data.data

            axios.get('/SchoolManage/students/getList').then(res => {
              this.banjiList.unshift({
                title:'全部',
                student_count: res.data.count
              })
            })

            break
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    onLoad(){
      let data = {
        params: {
          school_id: this.$route.query.school_id,
          banji_id: this.currentBanji.banji_id,
          page: this.page,
          is_banji_confirm: this.value
        }
      }

     return axios.get('/SchoolManage/students/getList', data).then(res => {
        switch (res.data.status) {
          case 1:

            if(this.page == 1){
              this.banjiItems = res.data.data
            }else{
              this.banjiItems = this.banjiItems.concat(res.data.data)
            }

            this.page++
            this.loading = false

            if(this.banjiItems.length >= res.data.count){
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
    onNavClick(item,index){
      this.activeId = index
      this.currentBanji = item
      this.selectShow = false
      this.onRefresh()
    },
    allCheck(){
      let data = {
        params:{
          is_all: 1
        }
      }

      if(this.currentBanji){
        data.params.banji_id = this.currentBanji.banji_id
      }

      axios.get('/SchoolManage/students/check',data).then(res=>{
        switch(res.data.status){
          case 1:
            this.onRefresh()
            break
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    invite(){
      this.$router.push({
        name:'share',
        query:{
          banji_id: this.currentBanji.banji_id,
          banji_name: this.currentBanji.banji_name,
          invite_code: this.currentBanji.invite_code,
          school_id: this.currentBanji.school_id,
          school_name: this.currentBanji.school_name,
          user_id: this.currentBanji.user_id
        }
      })
    },
    selectSwitch(operating,item){
      if(operating){
        this.selectChilds.push(item)
      }else{
        this.selectChilds.splice(this.selectChilds.length-1, 1)
      }
    },
    toBanjiList(type){

      if(type == 'transmitAll'){
        this.selectShow = false
      }

      let arr = []
    
      this.selectChilds.forEach(e=>{
        arr.push(e.id)
      })

      this.$router.push({
        name:'banjiList',
        query:{
          ...this.$route.query,
          ...this.currentBanji,
          type: 'select',
          set: type,
          id: arr.join(','),
          activeId: this.activeId
        }
      })
    }
  }
}
</script>
<style scoped>
.tree-select {
  width: 30%;
  position: relative;
  z-index: 1;
}

.tree-content {
  width: 70%;
  background: #fff;
}

.banji-tree {
  justify-content: space-between;
}

.tree-item {
  font-size: 13px;
  text-align: center;
  padding: 7px 0;
  border-bottom: 1px solid #ebedf0;
}

.tree-item:last-child{
  border-bottom: none;
}

.tree-item.select {
  background: #fff;
}

.tree-item.select .banji-title {
  font-weight: 700;
}

.student-count {
  font-size: 12px;
  margin-top: 2px;
  color: #909399;
}

.scroll-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.dropdown-menu{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
}

.footer-bar,
.dropdown-menu{
  width: 77%;
}

.list-wrap{
  padding-top: 50px;
}

.boss-key{
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate3d(-50%,0,0)
}

.child{
  font-size: 12px;
}

.no-list{
  position: relative;
}

.invite-code{
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  color: #67C23A;
}

.footer-bar{
  position: fixed;
  bottom: 0;
  background: rgba(255, 255, 255, .8);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.cancel,
.btn{
  flex: 1;
}

.cancel{
  text-align: center;
}
</style>
<style>
.tree-select .van-tree-select__nav {
  background-color: #f2f6fc;
}

.tree-select .van-tree-select__nav-item--active {
  border-color: #fff;
}
</style>

