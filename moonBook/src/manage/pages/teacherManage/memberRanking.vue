<template>
  <div class="brand-page">
    <van-nav-bar :zIndex='999' :class="fixedHeaderBar?'theme-nav':''" title="打卡榜" fixed :border='false'  @click-right="onClickRight" :key="$route.query.id">
        <div class="child-avatar" slot="right">
          <van-button round class="theme-btn more-btn" size="small" type="primary">更多榜单</van-button>
        </div>
    </van-nav-bar>

    <div class="my-child" ref='domHeight'>
      <div class="my-child-card flex flex-align" v-if="$route.query.id > 0">
        <div class="my-child-info flex flex-align">
          <div class="my-child-hd flex flex-align">
            <div class="my-child-icon">
              <svg-ranking :ranking="childInfo.rank" />
            </div>
            <div class="avatar" @click="toBabyHome(childInfo)">
              <img :src="childInfo.avatar" @error="imgError"/>
            </div>
            <div class="info">
              <div class="name">{{childInfo.name}}</div>
              <div class="school flex flex-align">
                <div class="theme-color" v-line-clamp:20="1" @click="toSchoolHome">{{childInfo.school_name}}</div>
              </div>
            </div>
          </div>
          <div class="num">
            {{active == 0?childInfo.sign_days:childInfo.sign_read_count}}
            <span class="unit">{{active==0?'天':'次'}}</span>
          </div>
        </div>
      </div>
    </div>
    <van-tabs class="tab-content" v-model="active" background="inherit" :line-width='20' :line-height='4' color="#fff" title-active-color="#fff" title-inactive-color="#fff" @click="onClickTab">
      <van-tab v-for='(list,index) in tabs' :key="index" :title='list.title'>
        <div class="tabs-wrap">
          <van-tabs class="child-tab" type="card" color="#2cadc2" swipeable animated title-active-color="#fff" title-inactive-color="#2cadc2" @change='onChangeTab' @disabled="show = true">
            <van-tab v-for='(item,itemIndex) in newTab[index]' :key="itemIndex" :title='item.title' :disabled='item.disabled'>
              <div class="list-content">
                <div class="title-name" v-line-clamp:20="1">{{itemIndex == 3?'全平台':item.name}}</div>
                <van-list class="ranking-list" :class="itemIndex == 3?'ranking-total':''" v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                  <div class="child-ranking-list"  v-for="(child,childIndex) in rankList" :key="childIndex">
                    <div class="rank-top" v-if='childIndex < 3' :class="[`top-${childIndex}`,`an-${childIndex*2}`,'fadeIn animated']" @click="toBabyHome(child)">
                      <div class="icon">
                        <svg-ranking :ranking="childIndex+1" />
                      </div>
                      <div class="avatar">
                        <img :src="child.avatar" @error="imgError"/>
                      </div>
                      <div class="name" v-line-clamp:20="1">{{child.name}}</div>
                      <div class="num">
                        {{index == 0?child.sign_days:child.sign_read_count}}
                        <span class="unit">{{index==0?'天':'次'}}</span>
                      </div>
                    </div>
                    <van-cell v-if='childIndex > 3' @click="toBabyHome(child)">
                      <div class="child-info flex flex-align">
                        <div class="rank-number">
                            <svg-ranking :ranking="childIndex"/>
                        </div>
                        <div class="data-info flex flex-align">
                          <div class="child-data flex flex-align">
                            <div class="avatar">
                              <img :src='child.avatar' @error="imgError"/>
                            </div>
                            <div class="info">
                              <div class="name" v-line-clamp:20="1">{{child.name}}</div>
                              <div class="banji" v-if='itemIndex == 1'>{{formatBanjiTitle(child.banji_name)}}</div>
                              <div class="school" v-line-clamp:20="1" v-if='itemIndex == 2'>{{child.school_name}}</div>
                            </div>
                          </div>
                          <div class="num">
                            {{index == 0?child.sign_days:child.sign_read_count}}
                            <span class="unit">{{index==0?'天':'次'}}</span>
                          </div>
                        </div>
                      </div>
                    </van-cell>
                  </div>
                </van-list>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show" position="bottom" get-container="#app">
      <van-picker :columns="columns" @change="onChange" />
    </van-popup>

  </div>
</template>
<script>
import axios from './../../../../src/components/lib/js/api'
import svgRanking from './../../../components/module/animate/svg/ranking'
import { mapGetters } from 'vuex'
import { watchScroll,newBanjiTitle } from './../../../components/lib/js/mixin'

export default {
  name: 'memberRanking',
  mixins:[ watchScroll,newBanjiTitle ],
  components: {
    svgRanking,
  },
  computed: {
    ...mapGetters(['userDataState']),
    newTab() {
      let array = [{
        title: '同班',
        name: this.formatBanjiTitle(this.userDataState.banji_name),
        params:{
          banji_id: this.userDataState.banji_id
        }
      }, {
        title: '同园',
        name: this.userDataState.school_name,
        params:{
          school_id: this.userDataState.school_id
        }
      }, {
        title: '同城',
        name: this.userDataState.city_name,
        params:{
          city_name: this.userDataState.city_name
        }
      }, {
        title: this.tabTitleSelect,
        disabled: true
      }]

      return this.tabs.map(e => {
        return e.content = array
      })
    },
    columns(){
      return this.times.map(e => {
        return e.split(',')[0]
      })
    }
  },
  data() {
    return {
      active: 0,
      times: ['总计,all', '本月,month', '上月,last_month', '本周,week', '上周,last_week'],
      tabsActive: 0,
      tabs: [{
        title: '天数',
        sort: 'read_sign'
      }, {
        title: '次数',
        sort: 'sign_read_count'
      }],
      page: 1,
      loading: false,
      finished: false,
      rankList:[],
      childInfo:'',
      show: false,
      time:'all',
      tabTitleSelect:'总计',
      // fixedHeaderBar: true,
      // domHeight:0
    }
  },
  // created () {
  //   this.fetchData()
  // },
  // watch: {
  //   '$router':'fetchData'
  // },
  methods: {
    // fetchData(){
    //   let data = {
    //     params:{
    //       child_id: this.$route.query.id
    //     }
    //   }

    //   axios.get('/book/baby/getInfo',data).then(res => {
    //     switch(res.data.status){
    //       case 1:
    //         this.childInfo = res.data.data
    //       break
    //     }
    //   })
    // },
    onLoad() {
      // /book/SchoolStudents/get_students 学生列表接口

      let paramsData = this.newTab[this.active][this.tabsActive].params
      let data = {
        params:{
          child_id: this.$route.query.id,
          sort: this.tabs[this.active].sort,
          time: this.time, 
          ...paramsData
        }
      }

      return axios.get('/book/SchoolBookSign/getRank', data).then(res => {
        switch (res.data.status) {
          case 1: {
            this.rankList = res.data.data
            this.childInfo = res.data.my_child
            this.loading = false

            let count = res.data.count > 20 ? 20 : res.data.count 

            if ( this.rankList.length >= count ) {
              this.finished = true
            }
            break
          }
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    onClickTab(index){
      this.active = index
      this.tabsActive = 0
      this.onLoad().then(()=>{
        this.loading = false
      })
    },  
    onChangeTab(index){
      this.tabsActive = index
      this.onLoad().then(()=>{
        this.loading = false
      })
    },
    toBabyHome(child){
      this.$router.push({
        name:'baby-home',
        query:{
          id: child.child_id
        }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    onChange(picker, value, index){
      this.tabTitleSelect = value
      this.time = this.times[index].split(',')[1]
      this.onLoad().then(()=>{
        this.loading = false
      })
    },
    toSchoolHome(){
      this.$router.push({
        name:'apps-school',
        query:{
          id: this.childInfo.school_id
        }
      })
    },
    onClickRight() {
      this.$router.replace({
        name:'RankingList'
      })
    }
  }
}
</script>

<style scoped>
.pf-box {
  position: absolute;
  z-index: 90;
  left: 10px;
  right: 10px;
  top: 70%;
}

.tab-box {
  margin-top: 10px;
  padding: 10px 15px;
}

.brand-page {
  background: linear-gradient(140deg, #49e5b4, #2cadc2);
  min-height: 100vh;
}

.tabs-wrap {
  margin-top: 10px;
}

.avatar{
  margin-right: 10px;
}

.name{
  font-size: 16px;
  color: #303133;
}

.avatar img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.list-content{
  padding: 0 15px;
  position: relative;
}

.data-info{
  flex: 2;
  justify-content: space-between;
}

.child-data{
  flex: 2
}

.num{
  font-size: 24px;
  text-align: center;
}

.title-name{
  text-align: center;
  height: 50px;
  line-height: 30px;
  color: #fff;
}

.rank-top{
  background: #fff;
  padding-top: 20px;
  padding-bottom: 10px;
}

.rank-top .avatar{
  margin-right: 0;
}

.rank-top .avatar img{
  display: block;
  margin: 0 auto;
}

.rank-top .num{
  background: linear-gradient(90deg, #FE8537,#F02B2B);
  -webkit-background-clip: text;
  color: transparent;
}

.child-ranking-list{
  overflow: hidden;
}

.top-0{
  left: 50%;
  width: 30%;
  position: relative;
  z-index: 5;
  transform: translate3d(-50%, -10px, 0) scale(1.15);
  box-shadow: 0 2px 10px rgba(44, 174, 194, 0.4);
}

.top-0,
.top-1,
.top-2{
  position: absolute;
  top: 55px;
  border-radius: 4px 4px 0 0;
}

.top-1,
.top-2{
  width: 30%;
}

.top-2{
  transform: scale(0.96);
}

.top-1{
  left: 15px;
  transform: scale(0.98);
}

.top-2{
  right: 15px;
}

.rank-top .name{
  text-align: center;
  margin: 8px 0;
  font-weight: 700;
  color: #303133;
}

.icon{
  position: absolute;
  top: -10px;
  left: 20px;
}

.ranking-list{
  padding-top: 140px;
}

.unit{
  font-size: 13px;
}

.school{
  text-align: left;
  font-size: 14px;
}

.my-child{
  padding: 50px 15px 0;
  overflow: hidden;
}

.my-child-card{
  width: 100%;
  border-radius: 8px 0 8px 8px;
  background: #fff;
}

.my-child-info{
  width: 100%;
  padding: 10px;
  justify-content: space-between
}

.info,
.my-child-info .num,
.school-name{
  flex: 1;
}

.my-child-info .info{
  flex: 2
}

.my-child-hd{
  flex: 3
}
</style>
<style>
.brand-page .van-hairline--top-bottom::after {
  display: none;
}
</style>



