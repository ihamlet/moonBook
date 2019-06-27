<template>
  <div class="container">
    <div class="select-list">
      <div class="card-list">
        <div class="item" :class="[intervalIndex==index?'select':'']" v-for='(item,index) in fees' :key="index" @click="selectInterval(item,index)">
          <van-row class="flex flex-align">
            <van-col span="6">
              <div class="focus col-box theme-background">
                {{item.months}}
              </div>
            </van-col>
            <van-col span="6">
              <div class="col-box date">
                {{item.name}}
              </div>
            </van-col>
            <van-col span="6">
              <div class="col-box day">
                {{item.duration}}天
              </div>
            </van-col>
            <van-col span="6">
              <div class="col-box price">
                {{item.origin_price/100}}
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="explain">
          <b>说明</b>
          <p>{{tips}}</p>
        </div>
      </div>
    </div>

    <van-popup v-model="isPayShow" position="bottom" class="order-popup" get-container='#app' :close-on-click-overlay='false'
      @click-overlay='isPayShow = false'>
      <div class="content">
        <div class="pay-info flex flex-align">
          <div class="title">支付信息</div>
          <div class="school-name" v-line-clamp:20="1">{{schoolName}}</div>
        </div>
        <van-cell-group>
          <van-cell title="会员类型" :value="`${selectFees.name} ${leves.name}`" />
          <van-cell title="支付押金" :value="`￥${leves.price/100}`" />
          <van-cell title="会员金额">
              <span>￥{{selectFees.origin_price/100}}</span>
              <span class="red" v-if="selectFees.gold_cut_price"> -￥{{selectFees.gold_cut_price}}</span> 
          </van-cell>
          <van-cell value-class='wm-coin' v-if="selectFees.gold_cut_price">
            <div>已使用微美币抵扣<span class="red">{{selectFees.cut_off}}%</span>的会员费</div>
            <div class="red">扣除{{selectFees.gold}}微美币,剩余{{selectFees.gold_remain}}微美币</div>
          </van-cell>
          <van-cell title="小计" size="large" :value="`￥${leves.price/100 + selectFees.price/100 - (selectFees.gold_cut_price||0)}`" />

          <van-button square class="theme-btn" :loading='payLoading' size="large" type="primary" @click="pay">
            支 付
          </van-button>
        </van-cell-group>
      </div>
    </van-popup>

  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'cardTime',
  data() {
    return {
      fees: [],
      tips: '',
      feeId: '',
      intervalIndex: 0,
      isPayShow: false,
      leves: '',
      schoolName: '',
      selectFees: '',
      payLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": "fetchData"
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          shelf_id: this.$route.query.id
        }
      }

      axios.get('/book/MemberCard/getMemberRegPayConfig', data).then(res => {
        if (res.data.status == 1) {
          this.schoolName = res.data.data.title

          this.tips = res.data.data.borrow_tip
          this.fees = res.data.data.durations

          let array = res.data.data.deposites
          array.forEach(element => {
            if (element.id == this.$route.query.leveId) {
              this.leves = element
            }
          })

        }
      })
    },
    selectInterval(item, index) {
      this.selectFees = item
      this.isPayShow = true
      this.intervalIndex = index
      this.feeId = item.id
    },
    pay() {
      this.payLoading = true
      location.href = `/book/memberCard/buycard?level_id=${this.$route.query.leveId}&fee_id=${this.feeId}&is_auto=1&url=${encodeURIComponent(location.href)}`
    }
  }
}
</script>
<style scoped>
.select-list .item,
.col-box {
  height: 3.75rem /* 60/16 */;
}

.select-list .item {
  width: 100%;
  margin-bottom: 1.875rem /* 30/16 */;
  border: 0.0625rem /* 1/16 */ solid #ebeef5;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ -0.3125rem /* 5/16 */ rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem /* 8/16 */;
  overflow: hidden;
  background: #fff;
}

.select-list .item.select {
  border-color: #f02b2b;
}

.select-list .item.select .theme-background {
  background: linear-gradient(-135deg, #fe8537, #f02b2b);
}

.col-box {
  line-height: 3.75rem /* 60/16 */;
  text-align: center;
}

.focus {
  font-size: 1.25rem /* 20/16 */;
  color: #fff;
  position: relative;
}

.price::before,
.focus::after {
  position: absolute;
  font-size: 0.8125rem /* 13/16 */;
}

.focus::after {
  content: '月';
  bottom: -0.125rem /* 2/16 */;
  right: 15;
}

.price {
  position: relative;
}

.price::before {
  content: '¥';
  left: 0.9375rem /* 15/16 */;
}

.icon {
  position: absolute;
  top: 1.875rem /* 30/16 */;
  right: 1.875rem /* 30/16 */;
}

.order-popup {
  padding: 1.875rem /* 30/16 */ 0;
}

.order-popup .content {
  margin: 0 auto;
  position: relative;
  padding-bottom: 5rem /* 80/16 */;
}

.order-popup .content::before {
  content: '';
  position: absolute;
  width: 4rem /* 64/16 */;
  height: 0.375rem /* 6/16 */;
  left: 0.9375rem /* 15/16 */;
  top: -1.875rem /* 30/16 */;
}

.order-popup .content .list {
  padding: 0.9375rem /* 15/16 */ 0;
}

.order-popup .content .list .item {
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
}

.title {
  margin-left: 0.9375rem /* 15/16 */;
  font-weight: 700;
}

.school-name {
  margin-right: 0.9375rem /* 15/16 */;
  width: 12.5rem /* 200/16 */;
  text-align: right;
}

.pay-info {
  justify-content: space-between;
  margin-bottom: 1.25rem /* 20/16 */;
}

.theme-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.red {
  color: red;
}

.wm-coin{
  text-align: right;
  color: #909399;
}
</style>


