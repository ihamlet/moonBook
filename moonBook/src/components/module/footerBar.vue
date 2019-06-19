<template>
  <div class="footer-bar flex flex-align">
    <van-tabbar :zIndex='100' v-model="active" fixed :safe-area-inset-bottom='true'>
      <van-tabbar-item v-for='(item,index) in userTabBtn' :key="index" :to='goPage(item)' @click="onClick(index)">
        <i class="iconfont" :class="[props.active?`${item.iconClass}fill bounceIn animated`: item.iconClass]" slot='icon' slot-scope="props"></i>
        <span>{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="show" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' :lock-scroll='false'>
      <tips :isShow='show' position='bottom' @close='setReleaseSwitch(false)'/>
    </van-popup>
  </div>
</template>
<script>
import tips from './../module/release/tips'
import { mapMutations,mapState,mapGetters } from 'vuex'
import { buildQuery } from './../lib/js/util'
import qs from 'qs'

export default {
  name: 'footer-bar',
  props: ['userTabBtn'],
  components: {
    tips
  },
  computed: {
    ...mapState(['releaseSwitch']),
    ...mapState('articleSetting',['tag']),
    ...mapGetters(['userDataState']),
    show:{
      get(){
        return this.releaseSwitch
      },
      set(val){
        this.setReleaseSwitch(val)
      }
    }
  },
  data() {
    return {
      active: 0
    }
  },
  created() {
    this.active = this.$route.meta.tabActive
  },
  watch: {
    $route(to, from, next) {
      this.active = to.meta.tabActive
    }
  },
  methods: {
    ...mapMutations(['setReleaseSwitch']),
    ...mapMutations('openWX',['clearImg']),
    goPage(item) {
      let path
      if(item.id){
        let routeData
        if(item.path == 'class-home'){
          if(this.userDataState.teacher_banji_id > 0){
            routeData = {
              id: item.id,
              cate_id: 116,
              // tags: `${this.userDataState.teacher_banji_name?`${this.userDataState.teacher_banji_name}班`:'班级主页'}`,
              home_type:'banji'
            }
            path = `${item.path}?${qs.stringify(routeData)}`
          }else{
            routeData  = {
              id:item.id,
              // tags:`${this.userDataState.banji_name}班`,
              home_type:'banji'
            }

            path = `${item.path}?${qs.stringify(routeData)}`
          }
        }else if(item.path == 'baby-home'){

          routeData  = {
            id:item.id,
            tags:'宝贝主页',
            home_type:'baby'
          }

          path = `${item.path}?${qs.stringify(routeData)}`
        }
      }else{
        path = item.path
      }

      return path
    },
    onClick(index) {
      if (index == 2) {
        this.setReleaseSwitch(true)
        this.clearImg()
      }
      this.active = this.$route.meta.tabActive
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        let arr = text.split('')
        let newArr = [...new Set(arr)]
        return newArr.join('')
      }
    }
  }
}
</script>
<style scoped>
.footer-bar {
  width: 100%;
  z-index: 999;
}

.footer-bar .van-tabbar {
  background: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
}

.footer-bar .van-info {
  top: 0;
}

.footer-bar i.iconfont {
  font-size: 1.3125rem /* 21/16 */;
}

.footer-bar
  .van-tabbar-item.van-tabbar-item--active
  .van-tabbar-item__icon
  i.iconfont,
.footer-bar .van-tabbar-item.van-tabbar-item--active .van-tabbar-item__text {
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  -webkit-background-clip: text;
  color: transparent;
  display: block;
}

/* 首页 */
.icon-home:before {
  content: '\e6b8';
}
.icon-homefill:before {
  content: '\e6bb';
}

/* 消息 */
.icon-communityfill:before {
  content: '\e740';
}
.icon-community:before {
  content: '\e741';
}

/* 个人中心 */
.icon-peoplefill:before {
  content: '\e735';
}
.icon-people:before {
  content: '\e736';
}

/* 宝贝主页 */
.icon-crownfill:before {
  content: '\e776';
}
.icon-crown:before {
  content: '\e777';
}

/* 发现 */
.icon-faxian:before {
  content: '\e692';
}
.icon-faxianfill:before {
  content: '\e621';
}

.icon-school::before {
  content: '\e68c';
}

.icon-schoolfill::before {
  content: '\e63a';
}

/* 书架 */
.icon-tushuguan:before {
  content: '\e6a2';
}
.icon-tushuguanfill:before {
  content: '\e619';
}

/* 班级 */
.icon-banji::before {
  content: '\e746';
}
.icon-banjifill:before {
  content: '\e745';
}

/* 发布 */
.icon-release::before {
  content: '\e727';
}
.icon-releasefill::before {
  content: '\e728';
}
</style>