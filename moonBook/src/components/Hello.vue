<template>
  <div class="page">
      <transition name="fade">
          <start-page @listenStartPage='onStartPage' v-if='startPageShow'/>
      </transition>
      <router-view v-if='!startPageShow' />
  </div>
</template>

<script>
import axios from 'axios'
import 'animate.css'
import startPage from './module/startPage'

export default {
  name: 'Hello',
  components: {
    startPage
  },
  data () {
    return {
      show:false,
      startPageShow:true 
    }
  },
  created () {
    this.fetchData()
    if(localStorage.getItem("access")){
      this.startPageShow = !localStorage.getItem("access")
    }
    localStorage.setItem('access',true)
  },
  watch: {
      '$route': 'fetchData'
  },       
  methods: {
    fetchData(){
      this.$store.dispatch('getUserData')
      this.$store.dispatch('getMsgLength')
      this.$store.dispatch('getTabBtn')
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
