<template>
  <div class="accept">
    <div>
      <van-steps active-color='#409eff'>
        <van-step>选择学校</van-step>
        <van-step>每天借书需求</van-step>
        <van-step>会员时间</van-step>
      </van-steps>
    </div>

    <router-view />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { createPayFrame } from './../../lib/js/util'
import { mapGetters, mapActions } from 'vuex'
import iconSuccess from './../../module/animate/iconSuccess'


export default {
  name: 'accept',
  props: ['active'],
  model: {
    prop: 'active',
    event: 'stepActiveChange'
  },
  components: {
    iconSuccess
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState'])
  },
  data() {
    return {
      searchListShow: false,
      isPayShow:false,
      levels: '',
      tips: '',
      fees: '',
      cardIndex: -1,
      intervalIndex: -1,
      order: {
        levelsName: '',
        levelsPrice: '',
        feesName: '',
        feesPrice: '',
        total: ''
      },
      levelId: '',
      feeId: '',

      pageTitle: 'addBaby',
      disabled: false,
      payLoading: false,
      iconSuccessShow: false,
      show: false,
      // title: '阅读卡办理',
      // next: '下一步',
      // stepActive: 0,
      pushUserInfo: {
        school: '',
        card: '',
        vipInterval: ''
      }
    }
  },
  watch: {
    active(val) {
      this.stepActive = val
    },
    stepActive(val) {
      this.$emit('stepActiveChange', val)
    }
  },
  methods: {
    onClickLeft() {
      this.stepActive < 0 ? this.stepActive : this.stepActive--
      switch (this.stepActive) {
        case -1:
          this.$emit('close')
          break
      }
    },
    // select(item) {
    //   if (item.shelf_id > 0) {
    //     this.stepActive = 1
    //     this.searchListShow = false

    //     let data = {
    //       params:{
    //         shelf_id:item.shelf_id
    //       }
    //     }

    //     axios.get('/book/MemberCard/getMemberRegPayConfig',data).then(res => {
    //       if(res.data.status == 1){
    //         this.levels = res.data.data.levels
    //         this.tips = res.data.data.tips
    //         this.fees = res.data.data.fees
    //       }
    //     })

    //   } else {
    //     this.$notify('该学校暂未有书架')
    //   }
    // },
    // selectCard(item, index) {
    //   this.stepActive = 2
    //   this.cardIndex = index
    //   this.order.levelsName = item.name
    //   this.order.levelsPrice = item.price / 100
    //   this.levelId = item.id
    // },
    selectInterval(item, index) {
      this.isPayShow = true
      this.order.feesName = item.name
      this.order.feesPrice = item.price / 100
      this.intervalIndex = index
      this.order.total = this.order.feesPrice + this.order.levelsPrice
      this.feeId = item.id
    },
    pay(res) {
      this.disabled = true
      this.payLoading = true

      Cookies.set('payLink', location.href)
      location.href = `/book/memberCard/buycard?level_id=${this.levelId}&fee_id=${this.feeId}&is_auto=1&url=${encodeURIComponent(location.href)}`
    }
  }
}
</script>
<style scoped>

</style>