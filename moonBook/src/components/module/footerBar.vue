<template>
  <div class="footer-bar flex flex-align">
    <van-tabbar :zIndex='100' v-model="active" fixed>
      <van-tabbar-item v-for='(item,index) in userTabBtn' :key="index" :to='goPage(item)' @click="onClick(index)">
        <i class="iconfont" :class="[props.active?`${item.iconClass}fill bounceIn animated`: item.iconClass]" slot='icon' slot-scope="props"></i>
        <span>{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="show" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' @click-overlay='show = false' :lock-scroll='false'>
      <tips :isShow='show' position='bottom' @close='show = false'/>
    </van-popup>
  </div>
</template>
<script>
import tips from './../module/release/tips'
import { mapGetters } from 'vuex';

export default {
  name: 'footer-bar',
  props: ['userTabBtn'],
  components: {
    tips
  },
  data() {
    return {
      active: 0,
      show: false
    }
  },
  created() {
    this.active = this.$route.meta.tabActive
  },
  watch: {
    $route(to, from) {
      this.active = to.meta.tabActive
      this.show = false
    }
  },
  methods: {
    goPage(item) {
      let path = ''
      if (item.id) {
        path = `${item.path}?id=${item.id}`
      } else {
        path = item.path
      }

      return path
    },
    onClick(index) {
      if (index == 2) {
        this.show = !this.show
      }
      this.active = this.$route.meta.tabActive
    }
  }
}
</script>
<style scoped>
.footer-bar {
  width: 100%;
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
<style>
.footer-bar .tips-popup.van-popup{
  transform: none;
  background-color: transparent;
  bottom: 0;
  left: 0;
  overflow-y: initial;
  width: 100%;
}
</style>
