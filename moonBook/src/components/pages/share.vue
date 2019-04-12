<template>
  <div class="share">
    <div class="tips" v-if='!$route.query.show_child_join'>点击发送到家庭群或家长 邀请家长加入班级</div>
    <div class="share-cover">
      <img :src="backgroundImg[randomNum]" />
    </div>
    <div class="share-info flex flex-align">
      <div class="join-btn" @click="toClassHome">
        <div class="join-banji theme-background">
          <i class="iconfont">&#xe612;</i>
        </div>
        <div class="join-text theme-color">
          <i class="iconfont">&#xe657;</i> 
          加入班级
        </div>
      </div>

      <div class="code-number">
        <div class="title">班级邀请码</div>
        <div class="number">{{$route.query.invite_code}}</div>

        <div class="school-info">
          <div class="school-name" v-line-clamp:20="2">
            {{$route.query.school_name}}
          </div>
          <div class="banji-name">
            {{$route.query.banji_name}}
          </div>
        </div> 
      </div>
      <div class="code-img">
          <img class="qr-img" :src="codeImgURL" />
          <div class="code-description">长按识别二维码 加入班级</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import QRcode from 'qrcode'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'share',
  computed: {
    ...mapGetters(['userDataState']),
    item() {
      let data = {
        cate_name: '邀请',
        details:`老师邀请您加入${this.$route.query.school_name}(${this.$route.query.banji_name})`,
        title: `${this.userDataState.name}老师邀请您加入${this.$route.query.school_name}(${this.$route.query.banji_name})`,
      }

      return data
    }
  },
  data() {
    return {
      codeImgURL:'',
      randomNum: Math.floor(Math.random()*5),
      backgroundImg:[
        require('@/assets/banjiShare/class-share-0.png'),
        require('@/assets/banjiShare/class-share-1.png'),
        require('@/assets/banjiShare/class-share-2.png'),
        require('@/assets/banjiShare/class-share-3.png'),
        require('@/assets/banjiShare/class-share-4.png'),
      ]
    }
  },
  updated(){   
    const self = this
    self.$nextTick(() => {
      let data = {
        item: self.item,
        success() {
          self.$router.go(-1)
        }
      }
      self.share(data)
    })
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    ...mapActions('openWX', ['share']),
    fetchData(){
      this.qrcode()
    },
    qrcode() {
      let link = decodeURIComponent(this.$route.query.fullPath)
      QRcode.toDataURL(link).then(url => {
        this.codeImgURL = url
      }).catch(err => {
        console.error(err)
      })
    },
    toClassHome(){
      this.$router.push({
        name:'class-home',
        query:{
          id: this.$route.query.banji_id,
          banji_name: this.$route.query.banji_name,
          school_name: this.$route.query.school_name,
          school_id: this.$route.query.school_id
        }
      })
    }
  }
}

</script>
<style scoped>
.share-cover{
  width: 100%;
  height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;
}

.share-cover img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  bottom: 0;
}

.code-img{
  width: 120px;
}

.code-img img{
  width: 120px;
  height: 120px;
}

.code-number{
  text-align: center;
}

.share-info{
  justify-content: space-between;
  background: #fff;
  height: 200px;
  padding: 0 20px;
  position: relative;
}

.code-description{
  font-size: 15px;
  text-align: center;
}

.number{
  font-size: 30px;
  color: #000;
  font-weight: 700;
}

.code-number{
  text-align: left;
  padding: 5px;
  flex: 1;
}

.banji-name{
  font-size: 14px;
}

.school-info{
  margin-top: 15px;
}

.tips {
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  height: 1.75rem /* 28/16 */;
  line-height: 1.75rem /* 28/16 */;
  border-radius: 0.5rem /* 8/16 */;
  right: 0.625rem /* 10/16 */;
  top: 30px;
  font-size: 13px;
}

.tips::before {
  content: '';
  position: absolute;
  border-right: 0 solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 30px solid#000;
  top: -30px;
  right: 0.5rem /* 8/16 */;
  opacity: 0.7;
}

.join-btn{
  position: absolute;
  top: -23px;
  z-index: 10;
}

.join-banji{
  width: 46px;
  height: 46px;
  border-radius: 50%;
  text-align: center;
  line-height: 46px;
}

.join-banji i.iconfont{
  font-size: 24px;
  color: #fff;
}

.join-text{
  width: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 46px;
  line-height: 46px;
  background: #fff;
  padding:0 0 0 56px;
  z-index: -1;
  border-radius: 46px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding-left: 70px;
}

.join-text .iconfont{
  position: absolute;
  animation: fell 2s ease-in-out infinite;
  display: block;
}

@keyframes fell
{
  0% {left: 45px;}
  50% {left: 55px;}
  100% {left: 45px;}
}
</style>
