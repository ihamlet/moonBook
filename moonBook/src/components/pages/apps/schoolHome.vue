<template>
  <div class="school-home">
    <van-nav-bar title="学校主页" left-text="首页" left-arrow @click-left="onClickLeft"/>

  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'school',
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserData().then(res => {
        if (res.child_id > 0) {
          if (res.school_id > 0) {

          } else {
            vm.$router.push({
              name: 'edit-school',
              query: {
                type: 'add',
                enter:'my',
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
    onClickLeft(){
      this.$router.push({
        name:'home'
      })
    }
  }
}
</script>
<style scoped>
</style>
