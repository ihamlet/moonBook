<template>
  <div class="card-list-container">
    <van-nav-bar class="card-list-nav-bar" :zIndex='99' fixed :border='false' :title="$route.meta.title" :key='$route.query.id'/>
    <div class="list">
      <div class="content" v-if='cardList&&cardList.length'>
        <div class="item fadeInDown animated" v-for='(item,index) in cardList' :key="index" :style="{animationDelay:`${200*index}ms`}">
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
                      <img :src="user.face" :alt="user.nickname" v-http2https/>
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
        <div class="theme-color" @click="applyShow = true">请办理借阅卡</div>
      </div>
    </div>
    <div class="form-submit">
      <van-button class="theme-btn" square size="large" type="primary" @click="toAccept">办理借阅卡</van-button>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import vipLevel from './../module/animate/svg/vipLevel'
import slogan from './../module/slogan'


export default {
  name: 'card-list',
  components: {
    vipLevel,
    slogan
  },
  data() {
    return {
      cardList: [],
      applyShow: false,
      active: 0,
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
        if(res.data.status == 1){
          let data = []
          let array = res.data.data
          array.forEach(element => {
            if(element.level_id > 0){
              data.push(element)
            }
          })

          this.cardList = data
        }
      })
    },
    toAccept() {
      this.$router.push({
        name:'AcceptSchoolList'
      })
    },
    applyClose() {
      this.applyShow = false
      this.fetchData()
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
  padding:45px 15px 45px;
}

.card-box {
  width: 100%;
  height: 7.5rem /* 120/16 */;
  margin-top: 1.25rem /* 20/16 */;
  box-shadow: 0 2px 15px rgba(0,0,0,.1);
  position: relative;
}

.card-box,
.card-box::before{
  border-radius: 10px 10px 0 0;
}

.card-box::after{
  position: absolute;
  content: '';
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255,255,255,.3) 80%,rgba(255,255,255,.3) 95%,rgba(255, 255, 255, .2) 100%);
  transform:skewX(-25deg);
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
  background: rgba(0, 0, 0, 0.2);
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
.user-info {
  margin-top: 0.625rem /* 10/16 */;
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

.borrow-count{
  margin-right: .625rem /* 10/16 */;
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
  padding: 0 .625rem /* 10/16 */;
  opacity: .95;
}
.users-list .user {
  margin-left: -10px;
  margin-right: 10px;
}

.card-loading{
  margin: 6.25rem /* 100/16 */ auto;
}

.form-submit{
  z-index: 10;
}

.theme-color{
  height: 12.5rem /* 200/16 */;
  line-height: 12.5rem /* 200/16 */;
  text-align: center;
}
</style>
