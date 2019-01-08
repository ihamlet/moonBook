<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh" v-if='hackReset'>
        <router-view />
      </div>
      <footer-bar v-if='$route.meta.isFooterBar' @release="isGraphicShow = true" :userTabBtn='userTabBtn' />
    </div>

    <van-popup v-model="isGraphicShow" class="page-popup" position="bottom" get-container='#app'>
      <graphic @close='isGraphicShow = false' @refresh='refresh' />
    </van-popup>
  </div>
</template>
<script>
import axios from './lib/js/api'
import 'animate.css'
import graphic from './module/release/graphic'
import { mapActions, mapGetters } from 'vuex'
import footerBar from './../components/module/footerBar'

export default {
  name: 'apps-router-view',
  components: {
    footerBar,
    graphic
  },
  computed: {
    ...mapGetters(['userDataState']),
    userTabBtn() {
      let array = [
        {
          iconClass: 'icon-school',
          name: '学校',
          path: '/apps-school',
          id: this.userDataState.school_id,
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
  methods: {
    refresh(){
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    }
  }
}
</script>
<style scoped>
</style>
