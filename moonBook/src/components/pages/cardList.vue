<template>
  <div class="card-list-container">
    <van-nav-bar class="card-list-nav-bar" :zIndex='99' fixed :border='false' :title="$route.meta.title"
      :key='$route.query.id' />
    <div class="list">
      <div class="content" v-if='cardList&&cardList.length'>
        <div class="item fadeInDown animated" v-for='(item,index) in cardList' :key="index"
          :style="{animationDelay:`${200*index}ms`}" @click="selectCard(item,index)">
          <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <div class="card-operation" v-if='index == itemActive'>
              <ul class="set-card flex flex-align">
                <li v-for='(item,index) in arr' :key="index" :style="{background:item.color}"
                  @click="cardOpation(item)">
                  <div class="btn">{{item.opationName}}</div>
                </li>
              </ul>
            </div>
          </transition>
          <div class="card-box" :class="`card-type-${item.level_info.level}`">
            <div class="card-info flex flex-align">
              <div class="card-name">{{item.level_info.name}}</div>
              <div class="card-id">{{item.card_id}}</div>
            </div>
            <div class="card-content">
              <div class="borrow-info flex flex-align">
                <div class="borrow-count">可借{{item.level_info.borrow_count}}本</div>
                <div class="borrow-day">{{item.level_info.borrow_day}}天内还书</div>
              </div>
              <div class="user-info flex flex-align">
                <div class="school" v-line-clamp:20="1">
                  {{item.shelf_title}}
                </div>
                <div class="users-list flex flex-align">
                  <div class="user flex flex-align">
                    <div class="avatar" v-for='(user,userIndex) in item.users' :key="userIndex">
                      <img :src="user.face" :alt="user.nickname" v-http2https />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slogan">
          <slogan />
        </div>
      </div>
      <div class="no-content" v-else>
        <div class="theme-color" @click="toAccept">请办理借阅卡</div>
      </div>
    </div>
    <div class="form-submit">
      <van-button class="theme-btn" square size="large" type="primary" @click="toAccept">办理借阅卡</van-button>
    </div>

    <van-popup v-model="show" position='bottom' get-container='#app'>
      <van-nav-bar :title="opationName" :border='false'/>
      <div class="card-up-level" v-if='opationName == "升级"'>
        <div class="head">
          <div class="school-name">{{newItem.shelf_title}}</div>
          <div class="card-name">{{newItem.name}}</div>
        </div>
        <div class="up-level-cell" v-for="(item,index) in upLevelCardList" :key="index">
          <div class="item-level-cell" :class="levelActive == index?'active':''" @click="selectItemLevel(item,index)">
            <div class="item-card flex flex-align" :class="item.disable?'opacity':''">
              <div class="flex flex-align">
                <vipLevel :level='item.level' animate='0' />
                <div class="card-title">{{item.name}}</div>
              </div>
              <div class="card-price">{{!item.disable?(item.price - newItem.level_info.price)/100:item.price/100}}</div>
            </div>
          </div>
        </div>

        <div class="btn-cell">
          <van-button round size="normal" class="theme-btn theme-pay" type="primary" loading-text="升级中...">升级卡
          </van-button>
        </div>
      </div>

      <div class="card-add-durations" v-if='opationName == "续费"'>
        <div class="durations-list">
          <div class="head">
            <van-cell :title='`${getData(newItem.end_time*1000)}到期`' :value='`剩余${endTime}天`' :title-style='{flex:2}' />
          </div>
          <div class="item-durations-cell" v-for='(item,index) in addDurations' :key="index"
            :class="durationsActive == index?'active':''" @click="selectItemDurations(item,index)">
            <div class="item-durations flex flex-align">
              <div class="durations-name">{{item.name}}</div>
              <div class="durations-price">{{item.price/100}}</div>
            </div>

            <i class="iconfont selected-icon" v-if='durationsActive == index'>&#xe696;</i>
          </div>

          <div class="btn-cell">
            <van-button round size="normal" class="theme-btn" type="primary" loading-text="续费中...">续费</van-button>
          </div>
        </div>
      </div>

      <div class="card-report-loss" v-if='opationName == "挂失"'>
        <van-field size='large' label='班级' input-align='right' v-model="banji" placeholder="请选择班级" is-link/>
        <van-field size='large' label='手机号' input-align='right' v-model="phone" placeholder="注册时的手机号" />
        <van-field size='large' label='孩子姓名' input-align='right' v-model="childName" placeholder="请输入孩子姓名" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import slogan from './../module/slogan'
import vipLevel from './../module/animate/svg/vipLevel'
import { format } from './../lib/js/util'

export default {
  name: 'card-list',
  components: {
    vipLevel,
    slogan
  },
  computed: {
    endTime() {
      let newTime = Date.parse(new Date()) / 1000
      let day = parseInt((this.newItem.end_time - newTime) / (60 * 60 * 24))
      return day
    }
  },
  data() {
    return {
      cardList: [],
      applyShow: false,
      show: false,
      active: 0,
      itemActive: -1,
      opationName: '',
      newItem: '',
      arr: [{
        opationName: '升级',
        color: 'rgba(33,150,243,.95)'
      }, {
        opationName: '续费',
        color: 'rgba(76,175,80,.95)'
      }, {
        opationName: '绑副卡',
        color: 'rgba(233,30,99,.95)'
      }, {
        opationName: '挂失',
        color: 'rgba(255,152,0,.95)'
      }, {
        opationName: '退卡',
        color: 'rgba(158,158,158,.95)'
      }],
      upLevelCardList: [],
      addDurations: [],
      levelActive: 0,
      durationsActive: 0,
      banji:'',
      childName:''
    }
  },
  beforeRouteLeave(to, from, next) {
    if(this.show){
      this.show = false
      next(false)
    }else{
      next()
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('/book/memberCard/getList').then(res => {
        if (res.data.status == 1) {
          let data = []
          let array = res.data.data
          array.forEach(element => {
            if (element.level_id > 0) {
              data.push(element)
            }
          })

          this.cardList = data
        }
      })
    },
    getData(date) {
      return format(date, 'yyyy年MM月dd日')
    },
    toAccept() {
      this.$router.push({
        name: 'AcceptSchoolList'
      })
    },
    applyClose() {
      this.applyShow = false
      this.fetchData()
    },
    selectCard(item, index) {
      this.itemActive = this.itemActive == index ? -1 : index
      this.newItem = item
    },
    cardOpation(item) {
      this.show = true
      this.opationName = item.opationName

      switch (item.opationName) {
        case '升级':
        case '续费': {
          axios.get('/book/MemberCard/getMemberRegPayConfig', {            params: {
              shelf_id: this.newItem.shelf_id
            }          }).then(res => {
            if (res.data.status == 1) {
              this.upLevelCardList = res.data.data.deposites.map(e => {
                let obj
                if (e.price > this.newItem.level_info.price) {
                  return e
                } else {
                  return {
                    ...e,
                    disable: true
                  }
                }
              })

              this.addDurations = res.data.data.durations
            }
          })
          break
        }
      }
    },
    selectItemLevel(item, index) {
      if (!item.disable) {
        this.levelActive = index
      }
    },
    selectItemDurations(item, index) {
      this.durationsActive = index
    }
  }
}
</script>
<style scoped>
.card-list-container {
  min-height: 100vh;
  background: #fff;
}

.list {
  padding: 45px 15px 45px;
}

.item {
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 10px -5px rgba(0, 0, 0, 0.1);
}

.card-box {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  position: relative;
}

.card-box,
.card-box::before {
  border-radius: 10px 10px 0 0;
}

.card-box::after {
  position: absolute;
  content: '';
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 80%,
    rgba(255, 255, 255, 0.3) 95%,
    rgba(255, 255, 255, 0.2) 100%
  );
  transform: skewX(-25deg);
  left: 3.125rem /* 50/16 */;
  z-index: 1;
  width: 50%;
  height: 100%;
  top: 0;
}

.card-box::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 120px;
  background: rgba(0, 0, 0, 0.4);
}

.card-type-1 {
  background: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/card/card-huapopo.png');
}

.card-type-2 {
  background: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/card/card-shitoutang.png');
}

.card-type-3 {
  background: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/card/card-xiaowangzi.png');
}

.card-info,
.user-info {
  justify-content: space-between;
}

.card-info {
  padding: 0.625rem /* 10/16 */;
  color: #fff;
  position: relative;
}

.card-name,
.card-id {
  font-weight: 500;
  font-size: 1.25rem /* 20/16 */;
}
.card-id {
  text-shadow: 0 0.0625rem /* 1/16 */ 0.3125rem /* 5/16 */ rgba(0, 0, 0, 0.3);
}
.school {
  color: #fff;
}

.borrow-info {
  color: #fff;
  font-size: 0.9375rem /* 15/16 */;
}

.borrow-count {
  margin-right: 0.625rem /* 10/16 */;
}

.avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 0.3125rem /* 5/16 */;
  border: 2px solid #fff;
  margin-right: -10px;
}

.name {
  font-size: 0.8125rem /* 13/16 */;
  color: #fff;
}

.card-content {
  padding: 0 0.625rem /* 10/16 */;
  opacity: 0.95;
  margin-top: 10px;
}
.users-list .user {
  margin-left: -10px;
  margin-right: 10px;
}

.card-loading {
  margin: 6.25rem /* 100/16 */ auto;
}

.form-submit {
  z-index: 10;
}

.theme-color {
  height: 12.5rem /* 200/16 */;
  line-height: 12.5rem /* 200/16 */;
  text-align: center;
}

.card-operation {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 46px;
  bottom: 0;
}

.card-operation,
ul.set-card li {
  height: 46px;
  line-height: 46px;
}

ul.set-card li {
  flex: 1;
  color: #fff;
  text-align: center;
  font-weight: 700;
}

.item-durations,
.item-card {
  padding: 10px 15px;
  justify-content: space-between;
}

.item-card.opacity {
  opacity: 0.5;
}

.item-level-cell {
  width: 100%;
}

.item-durations-cell,
.item-level-cell {
  border: 1px solid transparent;
}

.item-level-cell.active {
  border-radius: 8px;
  box-shadow: 0 5px 15px -5px rgba(0, 132, 255, 0.3);
}

.item-durations-cell.active {
  border-color: #0084ff;
  border-radius: 8px;
  color: #0084ff;
  font-weight: 700;
  position: relative;
  overflow: hidden;
}

.durations-list,
.card-up-level {
  padding: 20px 10px;
}

.popup-title,
.school-name,
.card-name {
  text-align: center;
}

.head {
  padding-bottom: 20px;
}

.popup-title {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
}

.card-name {
  position: relative;
}

.level-icon {
  position: absolute;
  right: 50%;
  top: -10px;
  margin-right: -60px;
}

.school-name {
  margin: 10px 0;
  font-size: 13px;
  color: #909399;
}

.theme-btn {
  width: 100%;
}

.btn-cell {
  margin-top: 30px;
  padding: 0 10px;
}

.item-level-cell.active,
.theme-btn.theme-pay {
  background: linear-gradient(135deg, #ffeb3b, #ffc107);
  border-color: transparent;
  box-shadow: 0 5px 10px -5px rgba(255, 190, 7, 0.8);
  color: #795548;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
}

.selected-icon {
  position: absolute;
  bottom: -2px;
  right: -2px;
  font-size: 24px;
}
</style>
