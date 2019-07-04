<template>
  <div class="accept">
    <div v-if='$route.query.type != "page"'>
      <van-steps :active="$route.meta.active" active-icon="success" active-color="#0084ff">
        <van-step>选择学校</van-step>
        <van-step>每天借书需求</van-step>
        <van-step>会员时间</van-step>
      </van-steps>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
// import axios from './../../lib/js/api'
// import { createPayFrame } from './../../lib/js/util'
import { mapGetters } from 'vuex'
// import iconSuccess from './../../module/animate/iconSuccess'

export default {
  name: 'accept',
  // components: {
  //   iconSuccess
  // },
  beforeRouteLeave(to, from, next) {
    if(to.name == 'register'){
      next({path:`/baby-home?id=${this.userDataState.child_id}`})
    }else{
      next()
    }
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState'])
  }
}
</script>
<style scoped>

</style>