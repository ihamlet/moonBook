<template>
  <div class="school-home">
    <van-nav-bar class="theme-nav" title="学校主页" left-arrow @click-left="onClickLeft" :border='false' :zIndex='99' fixed>
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">首页</span>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="header-card flex flex-align theme-background">
        <div class="school-info">
          <div class="school-logo" v-if='schoolInfo.logo'>
            <img :src="schoolInfo.logo" :alt="schoolInfo.title">
          </div>
          <div class="school-name">{{schoolInfo.title}}</div>
        </div>
        <div class="arc"></div>
      </div>
      <lazy-component class="module">
        <div class="apps">
          <apps :appsList='appsList' type='classHome' />
        </div>
      </lazy-component>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import apps from './../../module/myModule/apps'

export default {
  name: 'school',
  components: {
    apps
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      schoolInfo: '',
      appsList: [{
        name: '讲故事',
        iconClass: 'icon-jianggushi'
      }, {
        name: '每日国学',
        iconClass: 'icon-guoxue'
      }, {
        name: '交流',
        iconClass: 'icon-jiaoliu'
      }]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserData().then(res => {
        if (res.child_id > 0) {
          if (res.school_id > 0) {
            axios.get(`/book/school/getInfo?school_id=${res.school_id}`).then(res => {
              vm.schoolInfo = res.data.data
            })
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
      })
    })
  },
  methods: {
    ...mapActions(['getUserData']),
    onClickLeft() {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
<style scoped>
.header-card {
  padding: 2.8125rem /* 45/16 */ 0.9375rem /* 15/16 */ .625rem /* 10/16 */ 0.9375rem /* 15/16 */;
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
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.school-info{
  z-index: 2;
  display: grid;
  margin: 0 auto;
}

.school-name {
  font-weight: 500;
  margin-top: .625rem /* 10/16 */;
}

.school-type {
  font-size: 0.8125rem /* 13/16 */;
}
</style>
