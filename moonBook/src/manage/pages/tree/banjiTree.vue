<template>
  <div class="banji-tree flex">
    <div class="tree-select">
      <ul class="scroll-y scroll-container">
        <li class="tree-item" v-for='(item,index) in banjiList' :key="index" :class="activeId == index?'select':''" @click="onNavClick(item,index)">
          <div class="banji-title" v-line-clamp:20="1">{{index == 0?item.title:formatBanjiTitle(item.title)}}</div>
          <div class="student-count">{{item.student_count}}人</div>
        </li>
      </ul>
    </div>
    <div class="tree-content scroll-y scroll-container">
      <div class="dropdown-menu">
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
      </div>
      <div class="list-wrap page-padding">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" :offset='0'>
            <div class="list-container" v-if='banjiItems.length'>
              <studentCard v-for='(item,index) in banjiItems' :key="index" :item='item' :activeId='activeId' :selectShow='selectShow' @selectShowTrue='selectChild'/>
            </div>
            <div class="no-list" v-else-if='value == -1'>
              尚无班级成员，<span class="theme-color" size="normal">邀请家长</span>
            </div>
            <div class="no-list" v-else>
              尚无{{value == 1?'已':'待'}}审核成员
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>

    <van-button class="boss-key theme-btn" type="primary" round v-if='value == 0' @click="allCheck">一键审核</van-button>
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
      activeId: 0,
      page: 1,
      loading: false,
      finished: false,
      selectShow: false,
      value: -1,
      option: [
        { text: '全部', value: -1 },
        { text: '待审核', value: 0 },
        { text: '已审核', value: 1 }
      ]  
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
    selectChild(){
      this.selectShow = true
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
    }
  }
}
</script>
<style scoped>
.tree-select {
  width: 30%;
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
  width: 78%;
  z-index: 10;
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
</style>
<style>
.tree-select .van-tree-select__nav {
  background-color: #f2f6fc;
}

.tree-select .van-tree-select__nav-item--active {
  border-color: #fff;
}
</style>

