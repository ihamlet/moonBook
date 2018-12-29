<template>
  <div class="footer-bar flex flex-align">
    <van-tabbar :zIndex='100' v-model="active" fixed>
      <van-tabbar-item v-for='(item,index) in userTabBtn' :key="index" :to='goPage(item.path)' @click="onClick(index)">
        <i class="iconfont" :class="[props.active?`${item.iconClass}fill bounceIn animated`: item.iconClass]" slot='icon'
          slot-scope="props"></i>
        <span>{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'footer-bar',
  computed: {
    ...mapGetters(['userDataState']),
    userTabBtn() {
      let array = []

      if (this.$route.name == 'baby-home') {
        array = [
          {
            iconClass: 'icon-banji',
            name: '班级',
            path: 'class-home'
          },
          {
            iconClass: 'icon-release',
            name: '发布',
            path: ''
          },
          {
            iconClass: 'icon-crown',
            name: '宝贝',
            path: 'baby-home'
          }
        ]
      } else {
        array = [
          {
            iconClass: 'icon-home',
            name: '首页',
            path: '/'
          },
          {
            iconClass: 'icon-faxian',
            name: '发现',
            path: 'find'
          },
          {
            iconClass: 'icon-release',
            name: '发布',
            path: ''
          },
          {
            iconClass: 'icon-banji',
            name: '班级',
            path: 'class-home'
          },
          {
            iconClass: 'icon-people',
            name: '我的',
            path: 'my'
          }
        ]
      }

      return array
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
    $route(to, from) {
      this.active = to.meta.tabActive
    }
  },
  methods: {
    goPage(router) {
      if (router == 'class-home') {
        return `${router}?id=${this.userDataState.banji_id}`
      } else if (router == 'baby-home') {
        return `${router}?id=${this.userDataState.id}`
      } else {
        return router
      }
    },
    onClick(index) {
      if (this.$route.name == 'baby-home') {
        if (index == 1) {
          this.$emit('release')
        }
      } else {
        if (index == 2) {
          this.$emit('release')
        }
      }

      this.active = this.$route.meta.tabActive
    }
  }
}
</script>
<style scoped>
.footer-bar {
  width: 100%;
  overflow: hidden;
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

.footer-bar .van-tabbar-item.van-tabbar-item--active .van-tabbar-item__icon i.iconfont,
.footer-bar .van-tabbar-item.van-tabbar-item--active .van-tabbar-item__text {
  background: linear-gradient(135deg, #00bcd4, #409eff);
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
