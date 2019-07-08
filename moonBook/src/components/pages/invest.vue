<template>
  <div class="invest">
    <van-nav-bar title="充值" :border='false'/>
    <van-cell size="large" title='我的积分'>
        <div class="icon-img" slot='icon'>
            <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/jinbi.png"/>
        </div>
        <div class="value">
            2000
        </div>
    </van-cell>
    <div class="price-container">
        <van-row gutter="10">
            <van-col span="8" v-for='(item,index) in priceList' :key="index">
                <div class="box" :class="active == index?'active':''" @click="onClickActive(item,index)">
                    <div class="amount">
                        <span class="par">{{item.price}}</span><span>元</span>
                    </div>
                    <div class="coin">
                        金币 {{item.coin}}
                    </div>
                </div>
            </van-col>
        </van-row>
    </div>

    <div class="footer-bar">
        <div class="pay">
            <van-button class="theme-btn theme-pay" round type="primary">充 值</van-button>
        </div>
    </div>
  </div>
</template>
<script>
import { priceList } from './../lib/js/gift'
import qs from 'qs'

export default {
  name: 'invest',
  data() {
    return {
        priceList,
        active: 4
    }
  },
  methods: {
      onClickActive(item,index){
        this.active = index
      }
  }
}
</script>
<style scoped>
.invest{
    min-height: 100vh;
    background: #fff;
}

.price-container{
    padding: 10px;
}

.icon-img{
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.box{
    text-align: center;
    padding: 10px 0;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid #E4E7ED;
    background: #fff;
    transition: all .18s ease-out;
}

.theme-btn.theme-pay,
.active{
    background: linear-gradient(135deg,#FFEB3B, #FFC107);
    border-color: transparent;
    box-shadow: 0 5px 10px -5px rgba(255, 190, 7, .8);
}

.par{
    margin-right: 5px;
}

.coin{
    font-size: 13px;
    color: #909399;
}

.par,
.value{
    font-size: 24px;
    font-weight: 700;
}

.footer-bar{
    position: fixed;
    bottom: 0;
}

.pay{
    padding: 50px 15px;
}

.footer-bar,
.theme-btn.theme-pay{
    width: 100%;
}

.amount,
.value,
.theme-btn.theme-pay{
    color: #795548;
}
</style>
