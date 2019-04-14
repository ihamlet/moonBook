<template>
  <div class="apps">
    <div class="app-list flex">
      <div class="app-item" v-for='(item,index) in appList' :key="index" @click="toPath(item)">
        <div class="icon iconfont" :class="[item.iconClass,item.iconClass == 'icon-find'?'jackInTheBox animated':'']"></div>
        <div class="app-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'apps',
  computed: {
    ...mapGetters(['userDataState']),
    appList() {
      let array = []
      array = [{
        iconClass: 'icon-school',
        name: '学校主页',
        pathName: 'apps-school',
        params: {
          id:  this.userDataState.school_id > 0?this.userDataState.school_id:this.userDataState.teacher_school_id,
        },        
        href: false
      }, {
        iconClass: 'icon-story',
        name: '听故事',
        pathName: '404',
        params: '',
        href: '/book/story/jlf'
      }, {
        iconClass: 'icon-yuer',
        name: '育儿专栏',
        pathName: 'apps-find',
        params: {
          tag_id: 37,
          pageTitle: '育儿专栏'
        },
        href: false
      }, {
        iconClass: 'icon-find',
        name: '发现',
        pathName: 'apps-find',
        params: '',
        href: false
      }, {
        iconClass: 'icon-jiaoyu',
        name: '教育',
        pathName: 'apps-find',
        params: {
          tag_id: 134,
          pageTitle: '教育'
        },
        href: false
      }]

      return array
    }
  },
  methods: {
    toPath(item) {
      if(item.href) {
        location.href = item.href
      } else {
        this.$router.push({
          name: item.pathName,
          query: item.params,

        })
      }      
    }
  }
}
</script>
<style scoped>
.icon-school::before {
  content: '\e636';
    background: linear-gradient(127deg, #cddc39, #00BCD4);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(0, 188, 212, 0.3);
}

.icon-story::before {
  content: '\e7ad';
  background: linear-gradient(127deg, #ff9800, #e91e63);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(233, 30, 99, 0.3);
}

.icon-find::before{
  content: '\e64b';
  background: linear-gradient(127deg, #ffeb3b, #ff9800);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(255, 152, 0, 0.3);
}

.icon-zoom::before {
  content: '\e64d';
  background: linear-gradient(127deg, #cddc39, #4caf50);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(76, 175, 80, 0.3);
}

.icon-yuer::before{
  content: '\e603';
    background: linear-gradient(127deg, #03a9f4, #673ab7);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */
    rgba(103, 58, 183, 0.3);
}

.icon-jiaoyu::before {
  content: '\e63f';
  background: linear-gradient(127deg, #cddc39, #4caf50);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(76, 175, 80, 0.3);
}

.app-item {
  flex: 1;
  text-align: center;
}

.icon.iconfont {
  font-size: 2rem /* 32/16 */;
}

.app-list {
  padding: 0.625rem /* 10/16 */;
}

.app-name {
  font-size: 0.8125rem /* 13/16 */;
  text-align: center;
  color: #303133;
}
</style>
