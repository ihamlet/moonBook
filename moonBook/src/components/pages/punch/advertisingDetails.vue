<template>
  <div :class="show?'advertising-details':''">
    <div class="ad-container" v-html='details.intro'></div>
    <div class="footer-bar">
      <div class="bar">
        <van-button round class="theme-btn" type="primary" @click="show = true" size="large"> 
          <i class="iconfont">&#xe68b;</i>  
          领取卡券
        </van-button>
      </div>
    </div>

    <van-popup v-model="show" position='bottom' :overlay="false" :lock-scroll='false'>
      <van-nav-bar title="卡券领取" right-text="更多奖品" left-text="收起" @click-left="show = false" @click-right="toProgress" :border='false'/>
      <div class="prize-card flex flex-column">
        <div class="prize-content">
          <div class="name">{{details.shop_name}}</div>
          <div class="title" v-if='details.price > 0'>
            {{details.title}},价值{{details.price/100}}元
          </div>
        </div>
        <div class="prize-bar">
          <van-button round size="normal" :loading="picking" class="theme-btn" type="primary" @click="receive">领兑换券</van-button>
        </div>
        <div class="prompt-text">领券后商家客服或许会与您联系</div>
      </div>
    </van-popup>

    <van-popup v-model="detailsCard" class="popup-details" >
      <van-nav-bar :title="successful?'恭喜领取成功':'领取失败'" :border='false' @click-right='onClickRight'>
        <div class="close-btn" slot="right">
          <i class="iconfont">&#xe683;</i>
        </div>
      </van-nav-bar>
      <div class="container" v-if='successful'>
        <div class="card-head"></div>
        <div class="card-title">领取规则</div>
        <div class="details flex flex-column">
          <div class="cell process">
            <ul>
              <li v-for='(item,index) in process' :key="index">
                <van-tag type="success" plain>{{item}}</van-tag>
              </li>
            </ul>
          </div>
          <div class="cell info">
            <div class="time theme-color"><b>领奖时间</b>2019/03/12-{{details.expire_date}}</div>
            <div class="address theme-color">
              <van-swipe :autoplay="3000" :show-indicators='false'>
                <van-swipe-item v-for='(item,itemIndex) in addrList' :key="itemIndex">
                  <div class="shop-info" >
                    <b>领奖地点</b>
                    <span class="shop-name">
                      {{item[0]}}
                    </span>
                    <span class="shop-addr">
                      {{item[1]}}
                    </span>
                    <span class="shop-tell">
                      {{item[2]}}
                    </span>
                  </div>
                </van-swipe-item>
              </van-swipe>
            </div>
          </div>
          <div class="cell theway">
            <b>领奖方式</b>你所选择的奖品需要到领奖地点核销，并由商家发放奖品。你所领取的兑换券在首页-我的-钱包-卡券中，核销过程请出示兑换券，由商家扫码进行核销。
          </div>
        </div>

        <div class="draw-btn">
          <van-button round size="normal" class="theme-btn" type="primary" @click="toPopupList">查看兑换券</van-button>
        </div>

        <div class="cell statement">
          <b>声明</b>本活动奖品有第三方商家提供，阅亮书架平台不对奖品质保负责。
        </div>
      </div>
      <div class="container" v-else>
        <div class="content">
          <div class="hint">{{msg}}</div>
          <div class="point">继续加油，坚持下去</div>
        </div>
        <div class="draw-btn">
          <van-button round size="normal" class="theme-btn" type="primary" @click="toProgress">查看我的打卡进度</van-button>
        </div> 
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from '@/components/lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'advertisingDetails',
  data() {
    return {
      show: false,
      detailsCard: false,
      process: ['领奖时间', '领奖地点', '出示兑换券', '商家核销', '领取奖品'],
      picking: false,
      successful: false,
      coupon_id: this.$route.query.coupon_id || 0,
      details:'',
      msg:''
    }
  },
  computed: {
    ...mapGetters(['userDataState']),
    addrList(){
      let arr = []
      arr = this.details.addr.split(/\n/)
      let newArr = []
      arr.forEach((element,i) => {
        if(element.trim().length){
          newArr.push(element)
        }
      })
      let result = []
      for(let i=0,len=newArr.length; i<len; i+=3){
          result.push(newArr.slice(i,i+3))
      }
      return result  
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData(){
      let data = {
        params: {
          coupon_id: this.$route.query.coupon_id
        }
      }

      axios.get('/book/member/get_coupon',data).then(res=>{
        switch(res.data.status){
          case 1:
            this.show = true
            this.details = res.data.data
          break
        }
      })
    },
    onClickRight() {
      this.detailsCard = false
      this.show = true
    },
    receive() {
      this.picking = true
      let data = {
        params:{
          coupon_id:this.coupon_id
        }
      }

      if(this.userDataState.child_id > 0){
        return axios('/book/member/pick_coupon',data).then(res => {
          this.picking = false
          this.detailsCard = true
          this.msg = res.data.msg
          switch(res.data.status){
            case 1:
              this.successful = true
            break
          }
        })
      }else{
        this.$dialog.alert({
          title: '请添加宝贝',
          message: '请添加宝贝参与阅读打卡',
          confirmButtonText:'添加',
          cancelButtonText:'稍后',
          showCancelButton: true
        }).then(() => {
          this.$router.push({
            name: 'edit-child',
            query: {
              type: 'add',
              pageTitle: '添加宝贝'
            }
          })

          localStorage.removeItem('childInfo')
        }).catch(() => {
          this.$router.go(-1)
        })
      }
    },
    toPopupList() {
      this.$router.push({
        name: 'popupList'
      })
    },
    toProgress() {
      this.$router.replace({
        name:'punchSpeed'
      })
    }
  }
}
</script>
<style scoped>
.prize-card {
  width: 100%;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2);
}

.btn {
  width: 100px;
  text-align: center;
}

.prize-bar {
  padding: 10px 20px;
}

.theme-btn {
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 132, 255, 0.3)
}

.title {
  text-align: center;
  padding: 15px 0;
  font-weight: 700;
  border-bottom: 2px dashed #ebeef5;
}

.prize-content::before {
  right: -10px;
}

.prize-content::after {
  left: -10px;
}

.prize-content::before,
.prize-content::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  bottom: -20%;
  transform: translate3d(0, -50%, 0);
}

.prize-content {
  position: relative;
}

.advertising-details {
  padding-bottom: 220px;
}

.prompt-text {
  font-size: 13px;
  color: #c0c4cc;
  text-align: center;
  padding-bottom: 10px;
}

.name {
  text-align: center;
  height: 36px;
  line-height: 36px;
  background: linear-gradient(90deg, #00c2ab, #3e94ff);
  -webkit-background-clip: text;
  color: transparent;
}

.popup-details {
  width: 85%;
  overflow: hidden;
  border-radius: 20px;
}

.card-head {
  background-image: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/coupon.png');
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0;
}

.card-title {
  text-align: center;
  font-weight: 700;
  color: #303133;
  margin: 10px 0;
}

.details {
  padding: 0 15px;
}

.theway,
.statement {
  text-align: justify;
}

.statement {
  font-size: 12px;
  color: #c0c4cc;
  padding: 0 15px;
}

b {
  margin-right: 5px;
}

.process ul li {
  float: left;
  margin-top: 5px;
  margin-right: 5px;
}

.close-btn .iconfont {
  font-size: 20px;
  color: #f56c6c;
}

.cell {
  margin-bottom: 10px;
}

.theway{
  font-size: 13px;
}

.draw-btn {
  padding: 0 15px;
  margin-bottom: 10px;
}

.big-body {
  min-height: 250px;
  text-align: center;
}
.pick-msg-title {
  font-size: 20px;
  margin-top: 40px;
}

.pick-msg-tip {
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 40px;
}

.progress-btn {
  background: #e73071 linear-gradient(135deg, #eb6f9c, #e73071);
  border: none;
}

.tool {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
}

.hint,
.point{
  text-align: center;
}

.hint{
  width: 80%;
  margin: 0 auto;
}

.point{
  background: linear-gradient(90deg, #00C2AB,#3E94FF);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 20px;
  margin-top: 10px;
}

.content{
  padding: 30px 0 50px;
}

.footer-bar{
  position: fixed;
  width: 100%;
  bottom: 0;
}

.bar{
  padding: 10px;
}
</style>