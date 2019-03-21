<template>
  <div class="add-family">
    <van-nav-bar :border='false' title="邀请" fixed :left-text="$route.query.back?'返回':'首页'" left-arrow @click-left="onClickLeft" />
    <div class="pictorial"></div>
    <div class="btn">
      <van-button class="theme-btn" round :loading='isLoading' :plain='!is_mine' type="primary" size="large" @click="addFamily">{{is_mine?'分享到给家人或朋友圈':'加 入'}}</van-button>
    </div>
    <div class="copyright">阅亮书架</div>

    <van-popup v-model="shareShow" get-container='#app' class="share-popup">
      <div class="share-img">
        <img src="./../../../assets/img/shareWord.png"/>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import axios from './../../lib/js/api'
import { mapActions } from 'vuex'

export default {
  name: 'add-family',
  data() {
    return {
      isLoading: false,
      shareShow:false,
      is_mine: '',
      item:{
        template_id: '1',
        cate_name:'分享',
        details:'邀您打造宝贝主页'
      }
    }
  },
  created () {
    this.fetchData()
  },
  updated () {
    this.$nextTick(()=>{
      let data = {
        item: this.item,
        success(){
          console.log('微信分享')
        }
      }

      this.share(data)
    })
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    ...mapActions('openWX',['share']),
    fetchData(){
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res=>{
        if(res.data.status = 1){
          this.is_mine = res.data.data.is_mine
        }
      })
    },
    addFamily() {
      if(this.is_mine){
        this.shareShow = true
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
  width: 100%;
  padding-bottom: 120%;
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
</style>
