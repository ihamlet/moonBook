<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh">
        <router-view />
      </div>
      <footer-bar v-if='$route.meta.isFooterBar' :userTabBtn='userTabBtn' />
    </div>
  </div>
</template>
<script>
import axios from './lib/js/api'
import { mapActions, mapGetters } from 'vuex'
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
  },
  data() {
    return {
      hackReset: true,
      isGraphicShow:false,
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
     ...mapActions(['getUserData','getMsg','getUserLocation','getManager']),
    fetchData(){
      let products = {
        page: 1,
        isRead: 0
      }
      this.getUserData()
      this.getManager()
      this.getMsg(products)
    }
  }
}
</script>
<style scoped>
</style>
