<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <footer-bar v-if='$route.meta.isFooterBar' :userTabBtn='userTabBtn' />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import footerBar from './../components/module/footerBar'

export default {
  name: 'apps-router-view',
  components: {
    footerBar,
  },
  computed: {
    ...mapGetters(['userDataState']),
    userTabBtn() {
      let array = [
        {
          iconClass: 'icon-faxian',
          name: '发现',
          path: '/apps-find'
        },
        {
          iconClass: 'icon-banji',
          name: '班级',
          path: 'class-home',
          id: this.userDataState.banji_id,
        },
        {
          iconClass: 'icon-release',
          name: '发布',
          path: ''
        },
        {
          iconClass: 'icon-crown',
          name: '宝贝',
          path: 'baby-home',
          id: this.userDataState.child_id
        },
        {
          iconClass: 'icon-people',
          name: '我的',
          path: 'my'
        }
      ]
      return array
    }
  }
}
</script>
<style scoped>
</style>
