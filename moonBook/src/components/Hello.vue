<template>
  <div class="page">
      <transition name="fade">
          <start-page @listenStartPage='onStartPage' v-if='startPageShow'/>
      </transition>
      <router-view v-if='!startPageShow' />

      <div class="apply" v-if='!startPageShow&&$store.state.isPay' @click="borrow">
        <van-button class="theme-borrowing-btn" round type="primary">
          <i class="iconfont">&#xe619;</i>
          图书借阅
        </van-button>
      </div>

      <van-popup v-model="show" class="borrow-popup" position="bottom">
        <div class="flex">
          <div class="box">
            <div class="btn borrow an-0 animated" :class="[show?'bounceInUp':'bounceOutDown']">
                借
            </div>
          </div>
          <div class="box">
            <div class="btn also an-1 animated" :class="[show?'bounceInUp':'bounceOutDown']">
                还
            </div>
          </div>
        </div>
      </van-popup>
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

.borrow-popup{
  height: 11.25rem /* 180/16 */;
}

.box{
  flex: 1
}

.box .btn{
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 3.125rem /* 50/16 */ auto;
  text-align: center;
  line-height: 5rem /* 80/16 */;
  font-size: 2.25rem /* 36/16 */;
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 .625rem /* 10/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, .2)
}

.box .btn.borrow{
    background-image: linear-gradient( 135deg, #8BC34A 10%, #4CAF50 100%);
}

.box .btn.also{
      background-image: linear-gradient( 135deg, #FFC107 10%, #FF9800 100%);
}
</style>
