<template>
  <div class="page">
    <el-amap vid="amap" class="amap-demo" :center="center" :plugin="plugin" v-show='false' />
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
import { mapActions,mapGetters } from 'vuex'
import footerBar from './../components/module/footerBar'

export default {
  name: 'Hello',
  components: {
    startPage,
    footerBar
  },
  computed: {
    ...mapGetters(['userDataState']),
    center(){
      if(this.location){
        return this.location
      }else{
        return `${this.userDataState.lng},${this.userDataState.lat}`
      }
    }
  },
  data () {
    const self = this
    return {
      show:false,
      startPageShow:true,
      location: '',
      plugin:[{
          timeout:1000,
          pName: 'Geolocation',
          events: {
              init:(map)=>{
                  map.getCurrentPosition( (status, result) => {
                  if (result && result.position) {
                        self.location = `${result.position.lng},${result.position.lat}`
                      }
                  })
              }
          }
      }]
    }
  },
  created () {
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
    ...mapActions(['getUserData','getMsg','getUserLocation']),
    fetchData(){
      let products = {
        page: 1,
        isRead: 0
      }
      this.getUserData()
      this.getMsg(products)
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
