<template>
  <div class="readstat">
    <van-nav-bar class="theme-nav" :title="$route.meta.title" fixed left-text="返回" @click-left="onClickLeft">
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'我的'}}</span>
      </div>
    </van-nav-bar>
    <div class="head">

    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: 'readstat',
  data() {
    return {

    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
        axios.get()
    },
    onClickLeft(){
        if(this.$route.query.back){
            this.$router.push({
                name:this.$route.query.back,
                query:{
                    id: this.$route.query.id
                }
            })
        }else{
            this.$router.push({
                name:'my'
            })
        }
    }
  }
}
</script>
<style scoped>
.head {
  width: 100%;
  height: 12.5rem /* 200/16 */;
  background: linear-gradient(-135deg, #2196f3, #03a9f4);
}
</style>
