<template>
  <div class="advertising-details">
    <div class="ad-container">
      <img src="https://moonbook.oss-cn-beijing.aliyuncs.com/advertising-1" />
    </div>

    <van-popup v-model="show" position='bottom' :overlay="false" :lock-scroll='false'>
      <van-nav-bar title="卡券领取" right-text="更多奖品" @click-right="toAdList" :border='false'/>
      <div class="prize-card flex flex-column">
        <div class="prize-content">
          <div class="name">乐贝机器人活动中心</div>
          <div class="title">
            乐高课程卡4课时，价值240元
          </div>
        </div>
        <div class="prize-bar">
          <van-button round size="normal" class="theme-btn" type="primary" @click="receive">领兑换券</van-button>
        </div>
        <div class="prompt-text">领券后商家客服或许会与您联系</div>
      </div>
    </van-popup>

    <van-popup v-model="detailsCard" class="popup-details">
      <van-nav-bar title="恭喜领取成功" :border='false' @click-right='onClickRight'>
          <div class="close-btn" slot="right">
              <i class="iconfont">&#xe683;</i>
          </div>
      </van-nav-bar>
      <div class="container">
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
                <div class="time theme-color"><b>领奖时间</b>2019/03/12-2019/04/12</div>
                <div class="address theme-color"><b>领奖地点</b>黄石港区黄石大道786号微美大厦2楼天婴母婴店</div>
            </div>
            <div class="cell theway">
                <b>领奖方式</b>你所选择的奖品需要到领奖地点核销，并又商家发放奖品。你所领取的兑换券在首页-我的-钱包-卡券中，核销过程请出示兑换券，由商家扫码进行核销。
            </div>
        </div>
      </div>
      <div class="draw-btn">
          <van-button round size="normal" class="theme-btn" type="primary" @click="toPopupList">查看兑换券</van-button>
      </div>

        <div class="cell statement">
            <b>声明</b>本活动奖品有第三方商家提供，阅亮书架平台不对奖品质保负责。
        </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'advertisingDetails',
  data() {
    return {
      show: false,
      detailsCard: true,
      process:['领奖时间','领奖地点','出示兑换券','商家核销','领取奖品']
    }
  },
  created() {
    setTimeout(() => {
      this.show = false
    }, 1000)
  },
  methods: {
    onClickRight() {
        this.detailsCard = false,
        this.show = true
    },
    receive(){
        this.detailsCard = true,
        this.show = false
    },
    toAdList(){

    },
    toPopupList(){
        console.log('卡券列表','popupList')
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
  padding: 10px;
}

.theme-btn {
  width: 100%;
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
  bottom: 50%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.prize-content {
  position: relative;
}

.advertising-details {
  padding-bottom: 200px;
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

.card-head{
    background-image: url('./../../../assets/img/coupon.png');
    height: 64px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0;
}

.card-title{
    text-align: center;
    font-weight: 700;
    color: #303133;
    margin: 10px 0;
}

.details{
    padding: 0 15px;
}

.theway,
.statement{
    text-align: justify;
}

.statement{
    font-size: 12px;
    color: #c0c4cc;
    padding: 0 15px;
}

b{
    margin-right: 5px;
}

.process ul li{
    float: left;
    margin-top: 5px;
    margin-right: 5px;
}

.close-btn .iconfont{
    font-size: 20px;
    color: #F56C6C;
}

.cell{
    margin-bottom: 10px;
}

.draw-btn{
    padding: 0 15px;
    margin-bottom: 10px;
}
</style>
