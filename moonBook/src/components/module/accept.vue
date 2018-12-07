<template>
    <div class="accept" :class="stepActive==2?'background-grey':''">
        <van-nav-bar :title="title" :left-text="stepActive!=0?'上一步':'返回'" left-arrow @click-left="onClickLeft">
            <div class="icon-right" slot="right">
                <i class="iconfont">&#xe618;</i>
            </div>
        </van-nav-bar>
        <search-bar v-if='stepActive==0' prompt='搜索学校名称' @show='searchListShow = true'/>
        <lazy-component>
            <van-steps :active="stepActive" active-color='#409eff'>
                <van-step>选择学校</van-step>
                <van-step>每天借书需求</van-step>
                <van-step>会员时间</van-step>
            </van-steps>
        </lazy-component>
        <lazy-component>
            <div class="container" v-if='stepActive==0'>
                <div class="list scroll-y" ref="scrollContainer">
                    <van-list v-model="loading" :finished="finished" :finishedText="$store.state.slogan" @load="onLoad">
                        <van-cell v-for="(item,index) in list" :key="index" is-link class="flex flex-align" @click="select(item)">
                          <div class="item">
                            <div class="school-info">
                                <div class="school-name">
                                    {{item.title}}
                                </div>
                                <div class="school-address"  v-line-clamp:20="1">
                                    {{item.addr}}
                                </div>
                            </div>
                          </div>
                        </van-cell>
                    </van-list>
                </div>
            </div>
        </lazy-component>
        <lazy-component>
        <div class="container"  v-if='stepActive==1'>
            <div class="card-list">
                <div class="card-box" v-for='(item,index) in levels' :key="index" @click="selectCard(item,index)">
                    <div class="borrow-card flex animated" :class="[cardIndex==index?'rotate':'bounceInUp',`an-${index}`]">
                        <div class="borrow">
                            <span class="l">每天</span>
                            {{item.borrow_count}}
                            <span class="r">本</span>
                        </div>
                        <div class="info">
                            <div class="type">{{item.name}}</div>
                            <div class="period">租期{{item.borrow_day}}天</div>
                        </div>
                        <div class="deposit">
                            {{item.price/100}}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </lazy-component>
        <lazy-component>
            <div class="container"  v-if='stepActive==2'>
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
                                        {{item.price/100}}
                                    </div>
                                </van-col>
                            </van-row>
                        </div>

                        <div class="explain">
                            <b>会员说明</b>
                            <p>{{tips.borrow_tip}}{{tips.member_tip}}{{tips.notice}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </lazy-component>
        <van-popup v-model="show" position="bottom" class="order-popup">
            <div class="content">
                <div class="title">支付信息</div>
                <div class="list">
                    <div class="item">
                        会员类型:{{order.levelsName}}
                    </div>
                    <div class="item">
                        会员时长:{{pushUserInfo.vipInterval.day==365?'年费':'季费'}}
                    </div>
                    <div class="item">
                        支付押金:{{order.levelsPrice}}
                    </div>
                    <div class="item">
                        会员金额:{{order.feesPrice}}
                    </div>
                    <div class="item">
                        总计:{{order.total}}
                    </div>
                </div>

                <icon-success class="icon" v-if='iconSuccessShow'/>

                <van-button class="theme-btn" :loading='payLoading' :disabled='disabled' size="large" type="primary" @click="pay">
                    <span v-if='!userDataState.vipInfo'>
                        <i class="iconfont">&#xe65d;</i>
                        微信支付
                    </span>
                    <span v-else>
                        下一步
                    </span>
                </van-button>
            </div>
        </van-popup>

        <!-- 添加孩子页面 -->
        <van-popup v-model="addChildShow" class="page-popup" position="right">
            <add-child @close='closeAddChildPage' :pageTitle='pageTitle'/>
        </van-popup>

        <!-- 搜索列表 -->
        <van-popup v-model="searchListShow"  class="page-popup">
          <search-list prompt='搜索学校名称' type='joinSchool' @close='searchListShow = false' @select='select'/>
        </van-popup>
    </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import iconSuccess from './animate/iconSuccess'
import addChild from './addChild'
import searchBar from './search/searchBar'
import searchList from './search/schoolList'

export default {
  name: 'accept',
  props: ['active'],
  model: {
    prop: 'active',
    event: 'stepActiveChange'
  },
  components: {
    iconSuccess,
    addChild,
    searchBar,
    searchList
  },
  computed: {
    ...mapGetters(['userDataState','userPointState']),
    lng(){
       return this.userPointState.location.split(',')[0]
    },
    lat(){
      return this.userPointState.location.split(',')[1]
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      searchListShow:false,
      levels:'',
      tips:'',
      fees:'',
      cardIndex: -1,
      intervalIndex: -1,
      order:{
        levelsName:'',
        levelsPrice:'',
        feesName:'',
        feesPrice:'',
        total:''
      },

      pageTitle: 'addBaby',
      addChildShow: false,
      disabled: false,
      payLoading: false,
      iconSuccessShow: false,
      show: false,
      title: '借阅卡办理',
      next: '下一步',
      stepActive: 0,
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
    ...mapActions(['getUserData', 'getMsgLength']),
    onLoad(){
      let data = {
        lat:this.lat,
        lng:this.lng,
        page:this.page
      }

      axios.get(`/book/school/index?ajax=1&lat=${data.lat}&lng=${data.lng}&page=${data.page}`).then(res => {
          this.page++
          this.list = this.list.concat(res.data.data)
          this.loading = false
          if(this.list.length >= res.data.count){
            this.finished = true
          }
      })
    },
    onClickLeft() {
      this.stepActive < 0 ? this.stepActive : this.stepActive--
      switch (this.stepActive) {
        case -1:
          this.$emit('close')
          break
      }
    },
    select(item) {
        if(item.shelf_id > 0){
          this.stepActive = 1
          this.searchListShow = false

          axios.get(`/book/MemberCard/getMemberRegPayConfig?shelf_id=${item.shelf_id}`).then(res=>{
            console.log(res)
            this.levels = res.data.data.levels
            this.tips = res.data.data.tips
            this.fees = res.data.data.fees
          })

        }else{
          this.$notify('该学校暂未有书架')
        }
    },
    selectCard(item, index) {
      this.stepActive = 2
      this.cardIndex = index
      this.order.levelsName = item.name
      this.order.levelsPrice = item.price/100
    },
    selectInterval(item, index) {
      this.show = true
      this.order.feesName = item.name
      this.order.feesPrice = item.price/100
      this.intervalIndex = index
      this.order.total = this.order.feesPrice + this.order.levelsPrice
    },
    pay() {
      this.disabled = true
      this.payLoading = true
      axios.put('/api/pay', {
          data: this.pushUserInfo
        }).then(res => {
          this.getUserData() //写入用户数据
          setTimeout(() => {
            this.payLoading = false
            this.iconSuccessShow = true
          }, 1000)
          setTimeout(() => {
            this.stepActive = 2
            this.iconSuccessShow = false
            this.getMsgLength()
            if ( this.pushUserInfo.school.addChild.boolean && this.userDataState.childInfo.length == 0 ) {
              this.addChildShow = true
            } else {
              this.$emit('close')
            }
            this.show = false
          }, 3000)
        }).catch(err => {
          this.stepActive = 0
        })
    },
    closeAddChildPage() {
      this.$emit('close')
      this.addChildShow = false
    }
  }
}
</script>
<style scoped>
.school-name {
  color: #303133;
  font-size: 1rem /* 16/16 */;
}

.school-name i.iconfont {
  background: linear-gradient(90deg, #2ad396, #85bb1f);
  -webkit-background-clip: text;
  color: transparent;
}

.school-address {
  color: #909399;
}

.card-box {
  width: 100%;
  height: 8.125rem /* 130/16 */;
  overflow: hidden;
  position: relative;
}

.card-box:nth-child(1) .borrow-card {
  background-image: linear-gradient(-45deg, #fccf31 10%, #f55555 100%);
}

.card-box:nth-child(2) .borrow-card {
  background-image: linear-gradient(-45deg, #f761a1 10%, #8c1bab 100%);
}

.card-box:nth-child(3) .borrow-card {
  background-image: linear-gradient(-45deg, #43cbff 10%, #9708cc 100%);
}

.card-box::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 2.5rem /* 40/16 */ rgba(0, 0, 0, 0.8);
  z-index: 1;
  bottom: -0.625rem /* 10/16 */;
}

.borrow-card {
  position: absolute;
  top: 2.5rem /* 40/16 */;
  width: 100%;
  height: 11.25rem /* 180/16 */;
  background: #fff;
  border-radius: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.3);
}

.borrow,
.info,
.deposit {
  flex: 1;
  height: 5rem /* 80/16 */;
  line-height: 5rem /* 80/16 */;
  color: #fff;
  position: relative;
}

.borrow {
  text-align: center;
  font-size: 2.5rem /* 40/16 */;
}

.info .type {
  font-size: 1.375rem /* 22/16 */;
}

.info .period {
  position: absolute;
  bottom: -1.5625rem /* 25/16 */;
  font-size: 0.875rem /* 14/16 */;
}

.borrow span {
  display: block;
  font-size: 0.875rem /* 14/16 */;
  position: absolute;
}

.borrow span.l {
  top: -0.3125rem /* 5/16 */;
  left: 0.9375rem /* 15/16 */;
}

.borrow span.r {
  right: 1.875rem /* 30/16 */;
  bottom: -0.5rem /* 8/16 */;
}

.deposit {
  text-align: center;
  font-size: 1.5rem /* 24/16 */;
  font-style: italic;
}

.deposit::before {
  content: '¥';
  font-size: 0.875rem /* 14/16 */;
}

.rotate {
  transform: rotate(6deg);
  box-shadow: 0 0 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.3);
}

.select-list .item,
.col-box {
  height: 3.75rem /* 60/16 */;
}

.select-list .item {
  width: 100%;
  margin-bottom: 1.875rem /* 30/16 */;
  border: 0.0625rem /* 1/16 */ solid #fff;
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

.background-grey {
  background: #f2f2f2;
  height: 100vh;
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
  right: 0.9375rem /* 15/16 */;
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
</style>
