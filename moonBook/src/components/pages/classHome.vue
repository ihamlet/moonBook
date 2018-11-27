<template>
  <div class="class-home">
    <van-nav-bar :title="$route.meta.title" class="theme-nav" fixed @click-left="onClickLeft">
        <div class="btn-left" slot='left'>
            <i class="iconfont">&#xe657;</i>
            <span class="text">个人中心</span>
        </div>
    </van-nav-bar>
    <div class="header theme-background">
      <div class="class-info">
        <div class="class-name">{{userDataState.childInfo[0].class}}</div>
        <div class="school">{{userDataState.childInfo[0].school}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "class-home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userDataState"])
  },
  methods:{
      onClickLeft(){
          this.$router.push({name:'my'})
      }
  }
};
</script>
<style scoped>
.school{
    text-align: left;
    font-size: .8125rem /* 13/16 */
}

.header{
    padding: 3.75rem /* 60/16 */ 1.25rem /* 20/16 */ 1.875rem /* 30/16 */ 1.25rem /* 20/16 */;
}

.class-name{
    font-size: 1.125rem /* 18/16 */;
}

.class-info{
    color: #fff;
}
</style>
