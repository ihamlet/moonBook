<template>
  <div class="banji-rank-page theme-background page-padding">
    <div class="first-screen">
        <div class="reg-tips flex flex-align" v-if='!userDataState.child_id > 0'>
            <span class="text">您还未注册，参与阅读请注册</span> 
            <van-button class="theme-btn" type="primary"  size="small" round @click="toRegister">注册</van-button>
        </div>
        <div class="head">
            <img class="img-concent star-head flipInY animated"
                src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/star.png" />
            <div class="time flex flex-align theme-color">
                <div class="week-name">上周</div> 
                <div class="start-week-time">{{$route.query.startWeekTime}}</div>
                <span>-</span>
                <div class="end-week-time">{{$route.query.endWeekTime}}</div>
            </div>
            </div>
            <div class="home-icon" @click="toBanjiHome">
                <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/home-icon.png" />
                <div class="school-info flex flex-align">
                    <span>{{$route.query.school_name}}</span>丨<span>{{$route.query.title}}</span>
                </div>
            </div>

        <div class="read-data">
            <ul class="flex flex-align">
                <li class="item">
                <div class="name-title flex flex-align flex-justify">
                    <i class="iconfont">&#xe693;</i> 打卡人数
                </div>
                <div class="number">
                    <i class="iconfont" v-for='(item,index) in setNumber(signStat.child_count)' :key="index">{{item}}</i>
                </div>
                </li>
                <li class="item">
                <div class="name-title flex flex-align flex-justify">
                    <i class="iconfont">&#xe68e;</i> 打卡天数
                </div>
                <div class="number">
                    <i class="iconfont" v-for='(item,index) in setNumber(signStat.count)' :key="index">{{item}}</i>
                </div>
                </li>
                <li class="item">
                <div class="name-title flex flex-align flex-justify">
                    <i class="iconfont">&#xe68f;</i> 打卡次数
                </div>
                <div class="number">
                    <i class="iconfont" v-for='(item,index) in setNumber(signStat.days)' :key="index">{{item}}</i>
                </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="container" v-if='userDataState.child_id > 0'>

      <div class="module-list-wrap">
        <div class="module-title-img">
          <img class="module-img" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/module-title.png" />
          <div class="title">打卡次数最多</div>
        </div>
        <lazy-component>
          <div class="module-list">
            <div class="card-list">
              <div class="card-item flex flex-align punch-card-item animated bounceInLeft"
                :style="{animationDelay:`${200*index}ms`}" v-for='(item,index) in punchList' :key="index">
                <div class="child-info flex flex-align">
                  <div class="avatar">
                    <img :src="item.avatar" @error="imgError" />
                  </div>
                  <div class="child-name">
                    <div class="name">{{item.name}}</div>
                    <div class="rank-num">No.{{item.rank}}</div>
                  </div>
                </div>
                <div class="sign-count">
                  {{item.sign_read_count}}次
                </div>
              </div>
            </div>
          </div>
          <img class="module-rank" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/img-1.png" />
        </lazy-component>
      </div>

      <div class="module-list-wrap">
        <div class="module-title-img">
          <img class="module-img" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/module-title.png" />
          <div class="title">本周获得小红花</div>
        </div>
        <lazy-component>
          <div class="module-list">
            <div class="card-list">
              <div class="card-module">
                <div class="card-item flex flex-align" v-for='(item,index) in punchList' :key="index">
                  <div class="child-info flex flex-align">
                    <div class="icon-flower rotateIn fadeIn animated">
                      <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/icon-flower.png" />
                    </div>
                    <div class="avatar">
                      <img :src="item.avatar" @error="imgError" />
                    </div>
                    <div class="child-name">
                      <div class="name">{{item.name}}</div>
                    </div>
                  </div>
                  <div class="sign-count">
                    {{item.sign_days}}天
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img class="module-rank-active" v-if='userDataState.teacher_banji_id == $route.query.banji_id'
            src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/img-2.png" @click="toManagePage" />
          <img class="module-rank-active" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/img-3.png"
            @click="toRankPage" />
        </lazy-component>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { numbers } from './../../lib/js/speech'
import { mapGetters,mapState,mapActions } from 'vuex'

export default {
  name: 'banjiRank',
  computed: {
    ...mapGetters(['userDataState']),
    ...mapState('openWX',['ready']),
    item(){
      let data = {
        details: `来看看${this.$route.query.school_name}-${this.$route.query.title}的上周阅读情况吧~`,
        title: '阅亮书架 | 班级阅读周总结'
      }

      return data  
    }
  },
  data() {
    return {
      numbers: numbers,
      punchList: [],
      signStat:''
    }
  },
  created() {
    this.fetachData()
  },
  updated(){   
    this.wxShare()
  },
  watch: {
    '$router': 'fetachData',
    ready(){
        this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX', ['share']),
    setNumber(num) {
     if(num){
        let arr = num.split('')

        let numberArr = arr.map(e => {
            return this.numbers[e]
        })

        return numberArr
     }
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
    },
    fetachData() {
      let data = {
        params: {
          banji_id: this.$route.query.banji_id,
          page: 1,
          limit: 10
        }
      }

      axios.get('/book/SchoolBookSign/getRank', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.punchList = res.data.data
            break
          default:
            this.$toast(res.data.msg)
        }
      })

      axios.get('/book/SchoolBanji/getSignStat',data).then(res=>{
        switch (res.data.status){
            case 1:
                this.signStat = res.data.data
                break
            default:
                this.$toast(res.data.msg)
        }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    toManagePage() {
      this.$router.push({
        name: 'banjiEdit',
        query: {
          ...this.$route.query
        }
      })
    },
    toRankPage() {
      this.$router.push({
        name: 'RankingList'
      })
    },
    toRegister(){
        this.$router.push({
            name:'edit-child',
            query:{
                type:'register',
                back: this.$route.name
            }
        })
    },
    toBanjiHome(){
        this.$router.push({
            name:'class-home',
            query:{
                id: this.$route.query.banji_id,
                ...this.$route.query
            }
        })
    }
  }
}
</script>
<style scoped>
.head {
  position: relative;
  width: 100%;
  height: 48vh;
}

.first-screen{
    min-height: 100vh;
    position: relative;
}

.img-concent {
  position: absolute;
  display: block;
  width: 86%;
  top: 0;
  left: 50%;
  margin-left: -43%;
}

.banji-rank-page {
  min-height: 100vh;
  position: inherit;
}

.read-data,
.banji-rank-page {
  width: 100%;
}

.home-icon {
  width: 70px;
  height: 70px;
  background: #fff;
  padding: 20px;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 3px 10px rgba(25, 137, 250, 0.3);
  left: 50%;
  top: 60%;
  transform: translate3d(-50%, -50%, 0);
}

.school-info {
  position: absolute;
  white-space: nowrap;
  bottom: -30px;
  left: 50%;
  color: #fff;
}

.time {
  padding: 5px 10px;
  background: #fff;
  position: absolute;
  border-radius: 28px;
  left: 50%;
  bottom: 15px;
}

.time span {
  margin: 0 5px;
}

.time .number {
  text-align: center;
}

.read-data {
  height: 100px;
  position: absolute;
  width: 100%;
  bottom: 20px;
}

.read-data ul li {
  color: #fff;
}

.read-data ul li i.iconfont {
  font-size: 24px;
  margin-right: 5px;
}

.read-data .item {
  position: relative;
}

.read-data .item:last-child::before {
  display: none;
}

.read-data .item::before {
  position: absolute;
  content: '';
  right: 0;
  height: 100px;
  width: 1px;
  background: #fff;
  opacity: 0.5;
}

.read-data .item .number {
  position: absolute;
  left: 50%;
  margin-left: -12px;
  margin-top: 10px;
}

.read-data .item .number i.iconfont {
  font-size: 43px;
  margin-right: -25px;
}

.name-title,
.read-data .item .number i.iconfont{
  text-shadow: 0 8px 16px rgba(50, 110, 170, 0.8);
}

.module-img {
  width: 220px;
  margin: 0 auto;
  display: block;
}

.module-title-img {
  position: relative;
}

.module-title-img .title {
  position: absolute;
  left: 50%;
  bottom: 5px;
  color: #fff;
  font-size: 18px;
}

.module-title-img .title,
.read-data .item .number,
.school-info,
.time {
  transform: translate3d(-50%, 0, 0);
}

.child-info,
.read-data ul li {
  flex: 1;
}

.avatar {
  margin-right: 10px;
}

.avatar,
.avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.card-item {
  padding: 8px 15px;
  background: #fff;
  margin-bottom: 10px;
}

.card-module,
.card-item {
  border-radius: 8px;
}

.punch-card-item:first-child {
  padding: 20px 15px;
  background: linear-gradient(135deg, #3f51b5, #be52d1);
  box-shadow: 0 5px 10px rgba(190, 35, 210, 0.3);
}

.punch-card-item:first-child,
.punch-card-item:first-child .name {
  color: #fff;
}

.punch-card-item:first-child .avatar {
  box-shadow: 0 3px 10px rgba(75, 25, 160, 0.5);
}

.child-name .name {
  color: #303133;
}

.rank-num {
  font-size: 14px;
}

.module-list-wrap {
  margin-top: 50px;
}

.module-rank {
  width: 90%;
  margin: 0 auto;
  display: block;
}

.reg-tips{
    position: absolute;
    background: #fff;
    justify-content: space-between;
    width: 80%;
    padding: 5px 10px;
    height: 30px;
    border-radius: 30px;
    top: 10px;
    left: 50%;
    margin-left: -42%;
}

.reg-tips .text{
    font-size: 14px;
}

.module-rank-active {
  margin: 0 auto;
  display: block;
}

.card-module {
  background: #fff;
}

.icon-flower {
  margin-right: 10px;
}

.icon-flower img {
  width: 26px;
  height: 26px;
}

.week-name{
    margin-right: 10px;
}
</style>
