<template>
  <div class="card-list-container">
    <van-nav-bar :title="$route.meta.title" left-text="个人中心" left-arrow @click-left="onClickLeft" />
    <div class="list">
        <div class="item" v-for='(item,index) in cardList' :key="index">
            {{item}}
        </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: 'card-list',
  data() {
    return {
        cardList:''
    }
  },
  created () {
    this.fetchData()  
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData(){
        axios.get('/book/memberCard/getList').then(res=>{
            console.log(res)
            this.cardList = res.data.data
        })
    },
    onClickLeft() {
      this.$router.push({ name: 'my' })
    }
  }
}
</script>
<style scoped>
</style>
