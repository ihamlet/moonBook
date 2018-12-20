<template>
  <div class="add-family">
    <van-nav-bar class="theme-nav-bar" :border='false' title="邀请" fixed left-text="我的" left-arrow @click-left="onClickLeft" />
    <div class="pictorial"></div>
    <div class="btn">
      <van-button class="theme-btn" round :loading='isLoading' type="primary" size="large" @click="addFamily">加入家庭</van-button>
    </div>
    <div class="copyright">阅亮书架</div>

    <van-popup v-model="show" class="share-word" position="top">
      <img class="share-img" src="./../../../assets/img/shareWord.png">
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'add-family',
  data() {
    return {
      show: true,
      isLoading: false,
      childInfo: ''
    }
  },
  methods: {
    addFamily() {
      this.isLoading = true
      axios.get(`/book/babyParent/join?child_id=${this.$route.query.id}`).then(res => {
          if(res.status == 1){
              this.$toast(res.data.msg)
              this.$router.push({
                name:'my'
              })
          }else{
            this.$toast(res.data.msg)
            this.$router.push({
                name:'my'
            })  
          }
 
      })
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
}

.pictorial {
  height: 28.75rem /* 460/16 */;
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
<style>
.add-family .theme-nav-bar.van-nav-bar{
    background: transparent
}

.add-family .theme-nav-bar.van-nav-bar .van-icon,
.add-family .theme-nav-bar.van-nav-bar .van-nav-bar__text,
.add-family .theme-nav-bar.van-nav-bar .van-nav-bar__title{
    color:#fff;
}
</style>
