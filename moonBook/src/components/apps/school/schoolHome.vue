<template>
  <div class="school-home page-padding">
    <van-nav-bar :zIndex='100' :class="fixedHeaderBar?'theme-nav':''" left-arrow @click-left="onClickLeft" :border='false' fixed>
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'首页'}}</span>
      </div>
      <div class="head-bar-title" slot="title" @click="cutover">
        {{fixedHeaderBar?$route.meta.title:schoolInfo.title}} <i class="iconfont" v-if="managerState.length > 1">&#xe608;</i>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="header-card flex flex-align theme-school-background" ref="head">
        <div class="school-info">
          <div class="school-logo" v-if='schoolInfo.logo'>
            <img :src="schoolInfo.logo" :alt="schoolInfo.title" />
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
        <notice type='school' />
      </lazy-component>
      <lazy-component class="module">
        <read-list type='school' title='流动红旗' field='name' />
      </lazy-component>
      <lazy-component>
        <van-tabs color='#409eff' :line-width='20' :line-height='4' animated swipeable>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :schoolId='$route.query.id' portal_name='学校主页'/>
            </div>
          </van-tab>
        </van-tabs>
      </lazy-component>
    </div>

    <van-actionsheet v-model="actionsheetShow" :actions="actions" @select="onSelect" cancel-text="取消" />
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
    ...mapGetters(['userDataState','managerState']),
    actions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {
          let data = {
            name: element.name,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      return array
    }
  },
  data() {
    return {
      schoolInfo: '',
      domHeight: '',
      fixedHeaderBar: true,
      actionsheetShow: false,
      appsList: [
        {
          name: '风采',
          iconClass: 'icon-fengcai',
          path:'404'
        }, {
          name: '讲故事',
          iconClass: 'icon-jianggushi',
          path:'404'
        }, {
          name: '荣誉',
          iconClass: 'icon-rongyu',
          path:'404'
        }, {
          name: '才艺',
          iconClass: 'icon-caiyi',
          path:'404'
        }],
      tab: [{
        title: '学校动态',
        content: '',
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
    handleScroll() {
      this.getDomHeight()
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.banji_id
          }
        })
      } else {
        this.$router.push({
          name: 'home'
        })
      }
    },
    cutover() {
      this.actionsheetShow = true
    },
    onSelect(item) {
      this.hackReset = false
      this.actionsheetShow = false
      if (item.type == 'banji') {
        this.$router.push({
          name: 'class-home',
          query: {
            id: item.id,
            back: this.$route.name
          }
        })
      } else if (item.type == 'school') {
        this.$router.push({
          name: 'apps-school',
          query: {
            id: item.id,
            back: this.$route.name,
            banji_id: this.$route.query.id
          }
        })
      }

      this.$nextTick(() => {
        this.hackReset = true
        this.request()
      })
    },
    manage() {
      let boolean
      this.managerState.forEach(element => {
        if (this.$route.query.id == element.id && element.item_relation != 'parent'){
          boolean = true
        }
      })
      return boolean
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
