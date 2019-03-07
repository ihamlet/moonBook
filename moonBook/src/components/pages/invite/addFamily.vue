<template>
  <div class="add-family">
    <van-nav-bar :border='false' title="邀请" fixed :left-text="$route.query.back?'返回':'首页'" left-arrow @click-left="onClickLeft" />
    <div class="pictorial"></div>
    <div class="btn">
      <van-button class="theme-btn" round :loading='isLoading' :plain='!is_mine' type="primary" size="large" @click="addFamily">{{is_mine?'分享到家庭群':'加 入'}}</van-button>
    </div>
    <div class="copyright">阅亮书架</div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axios from './../../lib/js/api'

export default {
  name: 'add-family',
  data() {
    return {
      isLoading: false,
      is_mine: ''
    }
  },
  created () {
    this.fetchData()
    console.log(this.is_mine)
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData(){
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res=>{
        if(res.data.status = 1){
          console.log(res.data.data.is_mine)
          this.is_mine = res.data.data.is_mine
        }
      })
    },
    addFamily() {
      if(this.is_mine){
        this.share()
      }else{
    
        axios.get(`/book/babyParent/join?child_id=${this.$route.query.id}`).then(res => {
          this.isLoading = true
          if(res.status == 1){
            this.$toast(res.data.msg)
            this.toRouter()
            this.isLoading = false
          }else{
            this.$toast(res.data.msg)
            this.toRouter()
            this.isLoading = false
          }
        })
      }
    },
    toRouter(){
      if(this.$route.query.back){
        this.$router.push({
          name:this.$route.query.back,
          query:{
            id: this.$route.query.id,
          }
        })
      }else{
        this.$router.push({
            name:'home'
        })  
      }
    },
    share(){
      Cookies.set('shareLink', location.href)
      location.href = `/book/weixin/share?back_url=${encodeURIComponent(location.href)}&id=${this.$route.query.id}&type=文章`
      this.hide()
    },
    onClickLeft(){
      this.$router.push({
          name:'my'
      })
    }
  }
}
</script>
<style scoped>
.btn {
  padding:1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
  position: relative;
  z-index: 999;
}

.pictorial {
  padding-bottom: 125%;
  width: 100%;
  background-image: url('./../../../assets/img/invite-family.gif');
  background-size: cover;
  background-position: bottom;
}

.copyright {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
  color: #909399;
  font-size: 0.8125rem /* 13/16 */;
}

.share-word {
  background: transparent;
}

.share-img {
  width: 18.75rem /* 300/16 */;
  float: right;
}
</style>
