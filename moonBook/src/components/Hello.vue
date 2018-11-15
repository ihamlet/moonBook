<template>
  <div class="page">
      <transition name="fade">
          <start-page @listenStartPage='onStartPage' v-if='startPageShow'/>
      </transition>
      <router-view v-if='!startPageShow' />

      <el-amap vid="amap" class="amap-demo" :center="center" :plugin="plugin" v-show='false'/>
  </div>
</template>

<script>
import axios from 'axios'
import 'animate.css'
import startPage from './module/startPage'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'Hello',
  components: {
    startPage
  },
  data () {
    const self = this
    return {
      show:false,
      startPageShow:true,
      center: [116.397477,39.908692],
      plugin:[{
          timeout:1000,
          pName: 'Geolocation',
          events: {
              init:(map)=>{
                  map.getCurrentPosition( (status, result) => {
                  if (result && result.position) {
                        self.center = [result.position.lng, result.position.lat]
                        let products = {
                          location:this.center.join()
                        }      
                        this.getUserLocation(products)
                        self.$nextTick()
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
      '$route': 'fetchData'
  },       
  methods: {
    ...mapActions(['getUserData','getMsgLength','getTabBtn','getUserLocation']),
    fetchData(){
      this.getUserData()
      this.getMsgLength()
      this.getTabBtn()
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.mainline{
  position: fixed;
  bottom: 4.375rem /* 70/16 */;
  width: 6.25rem /* 100/16 */;
  margin: 0 auto;
}
</style>
