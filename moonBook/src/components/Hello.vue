<template>
  <div class="page">
    <transition name="fade">
      <start-page @listenStartPage='onStartPage' v-if='startPageShow' />
    </transition>
    <div class="root-dom" v-if='!startPageShow'>
      <router-view />
      <footer-bar v-if='$route.meta.isFooterBar'/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'animate.css'
import startPage from './module/startPage'
import { mapActions } from 'vuex'
import footerBar from './../components/module/footerBar'

export default {
  name: 'Hello',
  components: {
    startPage,
    footerBar
  },
  data () {
    return {
      show:false,
      startPageShow:true,
    }
  },
  created () {
    console.log('%c我们招新啦！369774533@qq.com','font-size:25px;color:#409eff;')
    this.fetchData()
    if(localStorage.getItem('access')){
      this.startPageShow = !localStorage.getItem('access')
    }
    localStorage.setItem('access',true)
  },
  watch: {
      '$route': 'fetchData'
  },       
  methods: {
    ...mapActions(['getUserData','getMsg']),
    fetchData(){
      this.getUserData()
      this.getMsg()
    },
    onStartPage(){
      this.startPageShow = false
    },
    borrow(){
      this.show = true
    }
  }
}
</script>

<style scoped>
.root-dom{
  user-select: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.mainline {
    position: fixed;
    bottom: 4.375rem /* 70/16 */;
    width: 6.25rem /* 100/16 */;
    margin: 0 auto;
}
</style>
