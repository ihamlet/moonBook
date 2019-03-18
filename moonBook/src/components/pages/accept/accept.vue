<template>
  <div class="accept">
    <div>
      <van-steps active-color='#409eff' :active="$route.meta.active">
        <van-step>选择学校</van-step>
        <van-step>每天借书需求</van-step>
        <van-step>会员时间</van-step>
      </van-steps>
    </div>

    <router-view />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { createPayFrame } from './../../lib/js/util'
import { mapGetters, mapActions } from 'vuex'
import iconSuccess from './../../module/animate/iconSuccess'


export default {
  name: 'accept',
  components: {
    iconSuccess
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState'])
  }
}
</script>
<style scoped>

</style>