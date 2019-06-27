<template>
  <div class="write-off page-padding">
    <van-nav-bar title="请出示二维码" />
    <div class="content">
      <div class="card-head">
        <div class="head">
          <div class="title">{{details.title}}</div>
          <div class="name">{{details.shop_name}}</div>
        </div>
        <div class="info">
          <van-swipe :autoplay="3000" :show-indicators='false'>
            <van-swipe-item v-for='(item,itemIndex) in addrList' :key="itemIndex">
              <div class="shop-info">
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
      <div class="code">
        <img :src="codeImgURL" />
        <div class="write">商家扫码核销</div>
      </div>
      <div class="rule flex flex-column">
        <van-nav-bar title="领奖规则" :border='false'/>
        <div class="cell process">
          <ul>
            <li v-for='(item,index) in process' :key="index">
              <van-tag type="success" plain>{{item}}</van-tag>
            </li>
          </ul>
        </div>

        <div class="cell theway">
          <b>领奖方式</b>你所选择的奖品需要到领奖地点核销，并由商家发放奖品。你所领取的兑换券在首页-我的-钱包-卡券中，核销过程请出示兑换券，由商家扫码进行核销。
        </div>
        <div class="cell statement">
          <b>声明</b>本活动奖品有第三方商家提供，阅亮书架平台不对奖品质保负责。
        </div>
      </div>
    </div>
    <div class="slogan">
      {{$store.state.slogan}}
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import QRcode from 'qrcode'

export default {
  name: 'write-off',
  data() {
    return {
      details: this.$route.query,
      codeImgURL: '',
      process: ['领奖时间', '领奖地点', '出示兑换券', '商家核销', '领取奖品']
    }
  },
  computed: {
    addrList() {
      if (!this.details || !this.details.addr) {
        return []
      }
      let arr = []
      arr = this.details.addr.split(/\n/)
      let newArr = []
      arr.forEach((element, i) => {
        if (element.trim().length) {
          newArr.push(element)
        }
      })
      let result = []
      for (let i = 0, len = newArr.length; i < len; i += 3) {
        result.push(newArr.slice(i, i + 3))
      }
      return result
    }
  },
  created() {
    this.qrcode()
  },
  methods: {
    qrcode() {
      let link = `${location.origin}/book/shangjia/coupon_check?download_id=${this.$route.query.download_id}`
      QRcode.toDataURL(link).then(url => {
        this.codeImgURL = url
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
<style scoped>
.content {
  padding: 10px 20px;
  overflow: hidden;
}

.card-head {
  padding: 10px;
  background: linear-gradient(90deg, #ff765c, #ff23b3);
  position: relative;
}

.card-head::before,
.card-head::after{
  content:'';
  bottom: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  background: #f2f6fc;
}

.card-head::before{
  left: -15px;
}

.card-head::after{
  right: -15px;
}

.card-head,
.title,
.time,
.address {
  color: #fff;
}

.title {
  height: 46px;
  line-height: 46px;
  font-size: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}

.name{
  height: 36px;
  line-height: 36px;
}

.head {
  text-align: center;
  margin-bottom: 20px;
}

.code {
  width: 100%;
  overflow: hidden;
  background: #fff;
}

.code img {
  padding:20px 0 0;
  display: block;
  margin: 0 auto;
}

b {
  margin-right: 10px;
}

.info {
  width: 100%;
  margin-bottom: 20px;
}

b {
  margin-right: 5px;
}

.process ul li {
  float: left;
  margin-top: 5px;
  margin-right: 5px;
}

.shop-info {
  color: #fff;
}

.rule {
  background: #fff;
  padding:0 20px 20px;
  border-top:3px dashed #F2F6FC;
}

.write {
  text-align: center;
  height: 46px;
  line-height: 46px;
}

.cell {
  margin-bottom: 10px;
}

.statement {
  color: #c0c4cc;
  font-size: 13px;
}

.theway{
  text-align: justify;
}
</style>
