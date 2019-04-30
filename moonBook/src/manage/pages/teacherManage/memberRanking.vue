<template>
  <div class="brand-page">
    <van-tabs class="tab-content" v-model="active" background="inherit" :line-width='20' :line-height='4' color="#fff" title-active-color="#fff" title-inactive-color="#fff" @click="onClickTab">
      <van-tab v-for='(list,index) in tabs' :key="index" :title='list.title'>
        <div class="tabs-wrap">
          <van-tabs v-if='index == active' class="child-tab" type="card" color="#2cadc2" swipeable animated title-active-color="#fff" title-inactive-color="#2cadc2" @change='onChangeTab'>
            <van-tab v-for='(item,itemIndex) in newTab[index]' :key="itemIndex" :title='item.title'>
              <div class="list-content">
                <div class="title-name" v-if='itemIndex == 0 || itemIndex == 1 || itemIndex == 2'  v-line-clamp:20="1">{{item.name}}</div>
                <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                  <div class="child-ranking-list"  v-for="(child,childIndex) in rankList" :key="childIndex">
                    <div class="top-ranking">
                      <div class="top-1">
                      <div class="avatar">
                        <img :src="child.avatar" />
                      </div>
                      <div class="top-2"></div>
                      <div class="top-3"></div>
                    </div>
                  </div>
                  </div>
                  <van-cell>
                    <div class="icon" slot="icon">
                      <svg-ranking :ranking="childIndex+1" />
                    </div>
                    <div class="child-info flex flex-align">
                      <div class="info flex flex-align">
                        <div class="avatar">
                          <img :src='child.avatar' v-if='child.avatar' @error="imgError"/>
                          <avatar v-else size='x-small'/>
                        </div>
                        <div class="info">
                          <div class="name">{{child.name}}</div>
                          <div class="banji" v-if='itemIndex == 1'>{{formatBanjiTitle(child.banji_name)}}</div>
                          <div class="school" v-if='itemIndex == 2'>{{child.school_name}}</div>
                        </div>
                      </div>
                      <div class="num">
                        {{child.sign_days}}
                      </div>
                    </div>
                  </van-cell>
                </van-list>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../../../../src/components/lib/js/api'
import svgRanking from './../../../components/module/animate/svg/ranking'
import avatar from './../../../components/module/avatar'
import { mapGetters } from 'vuex'

export default {
  name: 'memberRanking',
  components: {
    svgRanking,
    avatar
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
        title: '总计'
      }]

      return this.tabs.map((e) => {
        return e.content = array
      })
    }
  },
  data() {
    return {
      active: 0,
      tabsActive: 0,
      tabs: [{
        title: '天数',
        sort: 'read_sign'
      }, {
        title: '本数',
        sort: 'sign_read_count'
      }],
      page: 1,
      loading: false,
      finished: false,
      rankList:[]
    }
  },
  methods: {
    onLoad() {

      let paramsData = this.newTab[this.active][this.tabsActive].params
      let data = {
        params:{
          sort: this.tabs[this.active].sort,
          ...paramsData
        }
      }

      return axios.get('/book/SchoolStudents/get_students', data).then(res => {
        switch (res.data.status) {
          case 1: 
            this.rankList = res.data.data
            this.loading = false
            this.page++
            if (this.rankList.length >= res.data.count) {
              this.finished = true
            }
            break
          case 0:

            break
        }
      })
    },
    onClickTab(index){
      this.active = index
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
    formatBanjiTitle(text){
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
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
  padding: 5px 15px;
}

.child-info{
  justify-content: space-between;
}

.num{
  font-size: 24px;
}

.title-name{
  text-align: center;
  height: 46px;
  line-height: 46px;
  color: #fff;
}
</style>
<style>
.brand-page .van-hairline--top-bottom::after {
  display: none;
}
</style>



