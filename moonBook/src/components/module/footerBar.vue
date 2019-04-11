<template>
  <div class="footer-bar flex flex-align">
    <van-tabbar :zIndex='100' v-model="active" fixed>
      <van-tabbar-item v-for='(item,index) in userTabBtn' :key="index" :to='goPage(item)' @click="onClick(index)">
        <i class="iconfont" :class="[props.active?`${item.iconClass}fill bounceIn animated`: item.iconClass]" slot='icon' slot-scope="props"></i>
        <span>{{item.name}}</span>
      </van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="show" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' :lock-scroll='false'>
      <tips :isShow='show' position='bottom' @close='closeTips'/>
    </van-popup>
  </div>
</template>
<script>
import tips from './../module/release/tips'
import { mapMutations,mapState,mapGetters } from 'vuex'

export default {
  name: 'footer-bar',
  props: ['userTabBtn'],
  components: {
    tips
  },
  computed: {
    ...mapState(['releaseSwitch']),
    ...mapGetters(['managerState']),
    show:{
      get(){
        return this.releaseSwitch
      },
      set(val){}
    },
    managerBanji(){
      let array = []
      if(this.managerState){
        this.managerState.forEach(element => {
            if(element.item_relation == 'teacher' && element.item_type == 'banji'){
              array.push(element)
            }
        })
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
    $route(to, from, next) {
      this.active = to.meta.tabActive
    }
  },
  methods: {
    ...mapMutations(['setReleaseSwitch']),
    ...mapMutations('openWX',['clearImg']),
    goPage(item) {
      let path = ''
      if (item.id) {
        if(item.path == 'class-home'){
          if(this.managerBanji.length){
            path = `${item.path}?id=${this.managerBanji[0].id}`
          }else{
            path = `${item.path}?id=${item.id}&school_id=${item.school_id}&banji_name=${item.banji_name}&school_name=${item.school_name}`
          }
        }else{
          path = `${item.path}?id=${item.id}`
        }
      } else {
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
    closeTips(){
      this.setReleaseSwitch(false)
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
