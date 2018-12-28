<template>
  <div class="school-home page-padding">
    <van-nav-bar class="theme-nav" title="学校主页" left-arrow @click-left="onClickLeft" :border='false' :zIndex='99' fixed>
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.backPageName?$route.query.backPageName:'首页'}}</span>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="header-card flex flex-align theme-school-background">
        <div class="school-info">
          <div class="school-logo" v-if='schoolInfo.logo'>
            <img :src="schoolInfo.logo" :alt="schoolInfo.title">
          </div>
          <div class="school-name" v-line-clamp:20="1">{{schoolInfo.title}}</div>
        </div>
        <div class="arc"></div>
      </div>
      <lazy-component class="module">
        <div class="apps">
          <apps :appsList='appsList' type='schoolHome' />
        </div>
      </lazy-component>
      <lazy-component class="module">
          <notice type='school'/>
      </lazy-component>
      <lazy-component class="module">
        <read-list type='school' title='流动红旗' field='logo' />
      </lazy-component>
      <lazy-component>
        <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky animated swipeable>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :schoolId='$route.query.id' />
            </div>
          </van-tab>
        </van-tabs>
      </lazy-component>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import apps from './../../module/myModule/apps'
import readList from './../../module/classModule/readList'
import dryingList from './../../module/findModule/dryingList'
import notice from './../../module/classModule/notice'

export default {
  name: 'school',
  components: {
    apps,
    readList,
    notice,
    dryingList
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      schoolInfo: '',
      appsList: [
        {
          name: '简介',
          iconClass: 'icon-jianjie'
        }, {
          name: '每日餐谱',
          iconClass: 'icon-canpu'
        }, {
          name: '讲故事',
          iconClass: 'icon-jianggushi'
        }, {
          name: '书架',
          iconClass: 'icon-shujia'
        }],
      tab: [{
        title: '全部',
        content: '',
      }, {
        title: '风采',
        content: '',
      }, {
        title: '动态',
        content: ''
      }]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserData().then(res => {
        if (res.isHeaderTeacher == 1) {
          vm.request()
        } else {
          if (res.child_id > 0) {
            if (res.school_id > 0) {
              vm.request()
            } else {
              vm.$router.push({
                name: 'edit-school',
                query: {
                  type: 'add',
                  enter: 'my',
                  id: res.child_id,
                }
              })
            }
          } else {
            vm.$router.push({
              name: 'edit-child',
              query: {
                type: 'add',
                pageTitle: '添加宝贝'
              }
            })
          }
        }
      })
    })
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions(['getUserData']),
    request() {
      axios.get(`/book/school/getInfo?school_id=${this.$route.query.id}`).then(res => {
        this.schoolInfo = res.data.data
      })
    },
    onClickLeft() {
      if(this.$route.query.back){
        this.$router.push({
          name: this.$route.query.back
        }) 
      }else{
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
<style scoped>
.header-card {
  padding: 2.8125rem /* 45/16 */ 0.9375rem /* 15/16 */ 0.625rem /* 10/16 */
    0.9375rem /* 15/16 */;
  height: 6.25rem /* 100/16 */;
  position: relative;
  overflow: hidden;
}

.header-card .arc {
  position: absolute;
  width: 62.5rem /* 1000/16 */;
  height: 62.5rem /* 1000/16 */;
  background: #fff;
  border-radius: 62.5rem /* 1000/16 */;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, 0, 0);
}

.school-logo,
.school-logo img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  overflow: hidden;
  border-radius: 50%;
}

.school-logo {
  border: 0.25rem /* 4/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */
    rgba(255, 87, 34, 0.2);
  margin: 0 auto;
}

.school-info {
  z-index: 2;
  display: grid;
  margin: 0 auto;
  width: 13.75rem /* 220/16 */;
  text-align: center;
}

.school-name {
  font-weight: 500;
  margin-top: 0.625rem /* 10/16 */;
}

.school-type {
  font-size: 0.8125rem /* 13/16 */;
}

.theme-school-background {
  background: linear-gradient(135deg, #f44336, #ff5722);
}
</style>
