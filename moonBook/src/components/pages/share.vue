<template>
  <div class="share">
    <div class="tips" v-if='pathData.user_id == userDataState.user_id || pathData.user_id == 0'>点击发送到家庭群或家长 邀请家长加入班级</div>
    <div class="share-cover">
      <div class="present">
        <span class="animated fadeInUp" :style="{animationDelay:`${200*index}ms`}" v-for='(item,index) in tips' :key="index">{{item}}</span>
      </div>

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
        <div class="number">{{pathData.invite_code}}</div>

        <div class="school-info">
          <div class="school-name" v-line-clamp:20="2">
            {{pathData.school_name}}
          </div>
          <div class="banji-name">
            {{pathData.banji_name}}
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
import { mapGetters,mapActions,mapState } from 'vuex'
import qs from 'qs'

export default {
  name: 'share',
  computed: {
    ...mapState('openWX',['ready']),
    ...mapGetters(['userDataState','userPointState']),
    item() {
      let data = {
        cate_name: '邀请',
        details:`老师邀请您加入${this.$route.query.school_name}(${this.$route.query.banji_name})`,
        title: `${this.userDataState.name}老师邀请您加入${this.$route.query.school_name}(${this.$route.query.banji_name})`,
        imgUrl: this.backgroundImg[this.randomNum]
      }

      return data
    }
  },
  beforeRouteLeave(to, from, next) {
    if(to.name == 'banjiEdit' && to.query.pageType == 'add' ){
      let data = {
        ...from.query,
        pageType: 'edit',
        pageTitle:'设置班级',
        title: from.query.banji_name
      }
      next({path:`/manage/banjiEdit?${qs.stringify(data)}`})
    }else{
      next()
    }
  },
  data() {
    return {
      codeImgURL:'',
      randomNum: Math.floor(Math.random()*5),
      backgroundImg:[
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-0.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-1.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-2.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-3.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-4.png',
      ],
      pathData: this.$route.query,
      tips:['接收班级通知','了解班级动态']
    }
  },
  updated(){   
    this.wxShare()
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData',
    ready(){
      this.wxShare()
    }
  },
  methods: {
    ...mapActions(['getUserData']),
    ...mapActions('openWX', ['share']),
    fetchData(){
      this.acceptClass()
    },
    wxShare(){
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
    async qrcode() {

      let data = {
        id: this.$route.query.banji_id,
        banji_name: this.$route.query.banji_name,
        banji_id: this.$route.query.banji_id,
        school_id: this.$route.query.school_id,
        school_name: this.$route.query.school_name
      }

      let link = `${location.origin}/#/class-home?${qs.stringify(data)}`
      return QRcode.toDataURL(link).then(url => {
        return url
      }).catch(err => {
        this.$toast(err)
      })
    },
    async acceptClass(){
        await this.qrcode().then(res=>{
                this.codeImgURL = res
              })
        if(this.pathData.user_id != this.userDataState.user_id && this.pathData.user_id != 0 && this.userDataState.banji_id != this.pathData.banji_id){
          await this.joinSchool(this.userDataState.child_id)
          await this.joinBanji(this.userDataState.child_id) 
          await this.getUserData()
        }
    },
    toClassHome(){
        this.$router.push({
          name:'class-home',
          query:{
            id: this.pathData.banji_id
          }
        })
    },
    async joinSchool(childId) {
      let location = this.userPointState.location.split(',')
      let data = {
          params: {
            child_id: childId,
            school_id: this.pathData.school_id,
            school_name: this.pathData.school_name,
            cityname: this.userPointState.city,
            lat: location[1],
            lng: location[0],
            amap_id: '',
            typecode: ''
          }
        }
        return axios.get('/book/babySchool/bind', data).then(() => {})
    }, 
    async joinBanji(childId){
      let data = {
        params:{
          banji_id: this.pathData.banji_id,
          invite_code: this.pathData.invite_code,
          child_id: childId
        }
      }

      return axios.get('/book/baby/join_banji', data).then(() => { })
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

.present{
  position: absolute;
  z-index: 10;
  bottom: 25px;
  display: grid;
  margin-left: 50px;
  opacity: .8;
}

.present span{
  display: block;
  height: 26px;
  padding: 5px 15px;
  background: #fff;
  margin-bottom: 5px;
  border-radius: 26px;
  line-height: 26px;
}

@keyframes fell
{
  0% {left: 45px;}
  50% {left: 55px;}
  100% {left: 45px;}
}
</style>
