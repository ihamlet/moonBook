<template>
  <div class="page">
    <el-amap vid="amap" class="amap-demo" :center="center" :plugin="plugin" v-show='false' />
    <transition name="fade">
      <start-page @listenStartPage='onStartPage' v-if='startPageShow' />
    </transition>
    <div class="root-dom" v-if='!startPageShow'>
      <router-view />
      <footer-bar />
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
    const self = this
    return {
      show:false,
      startPageShow:true,
      center: '114.085947,22.547',
      plugin:[{
          timeout:1000,
          pName: 'Geolocation',
          events: {
              init:(map)=>{
                  map.getCurrentPosition( (status, result) => {
                  if (result && result.position) {
                        self.center = `${result.position.lng},${result.position.lat}`
                        self.$nextTick()
                      }
                  })
              }
          }
      }]
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
      center(val){
          let products = {
            location:val
          }
          this.getUserLocation(products)
      },
      '$route': 'fetchData'
  },       
  methods: {
    ...mapActions(['getUserData','getMsgLength','getUserLocation']),
    fetchData(){
      this.getUserData()
      this.getMsgLength()
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
