<template>
    <div class="share">
        <div class="tips">分享成就</div>

        <div class="wrap">
            <div class="child-info">
                <div class="avatar">
                    <img :src="$route.query.avatar" @error="imgError" />
                </div>
                <div class="name">{{$route.query.name}}</div>
                <div class="label">在阅亮书架获得的成就</div>
            </div>
            <div class="medal-box fadeIn animated">
                <IconMedal :level='$route.query.level'/>
            </div>
            <div class="ribbon rollIn animated">
                <div class="ribbon-content">{{$route.query.medalName}}</div>
                <div class="ribbon-left"></div>
                <div class="ribbon-right"></div>
            </div>

            <div class="text">坚持{{text[1]}}{{$route.query.number}}达成</div>

            <div class="logo">
                <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png" />
            </div>
        </div> 
        <div class="round-bg">
            <round/>
        </div>
    </div>
</template>
<script>
import IconMedal from './../../module/animate/medal'
import round from './../../module/animate/round'
import { mapActions,mapState } from 'vuex'

export default {
    name:'share',
    components: {
      IconMedal,
      round 
    },
    computed: {
        ...mapState('openWX',['ready']),
        item() {
            let data = {
                details:'阅亮书架，与家人一起参与宝贝阅读，记录成长',
                title: `${this.$route.query.name}获得${this.$route.query.number}${this.text[0]}成就“${this.$route.query.medalName}”`,
                imgUrl: location.origin + this.$route.query.avatar
            }

            return data
        },
        text(){
            let text = []
            switch(this.$route.query.type){
                case 'punch':
                    text = ['天打卡','阅读打卡']
                break
                case 'read':
                    text = ['本阅读','借阅']
                break
            }

            return text
        }
    },
    updated() {
        this.wxShare()
    },
    watch: {
        ready(){
            this.wxShare()
        }
    },
    methods: {
        ...mapActions('openWX', ['share']),
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        },
        wxShare(){            
            const self = this 
            let data = {
                item: self.item,
                success() {
                    self.$router.go(-1)
                }
            }
            self.share(data)
        }
    }
}
</script>
<style scoped>
.share{
    position: relative;
    background: #fff;
    overflow: hidden;
}

.wrap{
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 2;
}

.medal-box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) scale(3.2);
}

.child-info{
    text-align: center;
    padding: 5% 0 2%;
}

.child-info .avatar,
.child-info .avatar img{
    width: 65px;
    height: 65px;
    border-radius: 50%
}

.child-info .avatar{
    margin: 0 auto;
    box-shadow: 0 2px 10px rgba(255, 152, 0, 0.3)
}

.wrap{
    position: relative;
}

.name{
    height: 36px;
    line-height: 36px;
}

.label{
    font-size: 13px;
}

.round-bg{
    opacity: .4;
}

.ribbon{
    position: absolute;
    z-index: 10;
    width: 140px;
    text-align: center;
    left: 50%;
    bottom: 50%;
    margin-left: -70px;
}

.ribbon-content{
    background: linear-gradient(160deg, #FF9800, #F44336);
    color: #fff;
    height: 38px;
    line-height: 38px;
    font-weight: 700;
    border-radius: 2px;
}

.ribbon-left,
.ribbon-right{
    width: 38px;
    height: 38px;
    position: absolute;
    background: rgba(255, 87, 34, 0.9);
    top: 20%;
    z-index: -1;
    opacity: 0.7;
}

.ribbon-left::before,
.ribbon-right::before{
    content: '';
    width:0;
    height:0;
    border-top: 19px solid transparent;
    border-bottom: 19px solid transparent;
    position: absolute;
}

.ribbon-left::before{
    left: 0;
    border-left: 12px solid #fff;
}

.ribbon-right::before{
    right: 0;
    border-right: 12px solid #fff;
}

.ribbon-left{
    left: -20px;
}

.ribbon-right{
    right: -20px;
}

.label{
    color: #909399;
}

.logo{
    position: absolute;
    width: 120px;
    bottom: 20px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
}

.tips {
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  height: 20px;
  line-height: 20px;
  border-radius: 0.5rem /* 8/16 */;
  right: 0.625rem /* 10/16 */;
  top: 20px;
}

.tips::before {
  content: '';
  position: absolute;
  border-right: 0 solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 20px solid#000;
  top: -20px;
  right: 0.5rem /* 8/16 */;
  opacity: 0.7;
}

.text{
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    position: absolute;
}
</style>
