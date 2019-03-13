<template>
  <div class="card-list-container page-padding">
    <van-nav-bar class="card-list-nav-bar" :zIndex='99' fixed :border='false' :title="$route.meta.title" left-text="个人中心" left-arrow @click-left="onClickLeft" />
    <div class="list">
      <div class="content" v-if='cardList&&cardList.length'>

        <div class="item" v-for='(item,index) in cardList' :key="index">
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
                  <div class="user flex flex-align" v-for='(user,userIndex) in item.users' :key="userIndex">
                    <div class="avatar">
                      <img :src="user.face" :alt="user.nickname" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-content" v-else>
        <div class="theme-color" @click="applyShow = true">请办理借阅卡</div>
      </div>
    </div>
    <div class="form-submit">
      <van-button class="theme-btn" square size="large" type="primary" @click="toAccept">办理借阅卡</van-button>
    </div>

    <div class="slogn">
      <slogan />
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
    onClickLeft() {
      this.$router.push({ name: 'my' })
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
  /* background:url('./../../assets/img/giftly.png'); */
  padding-top: 2.8125rem /* 45/16 */;
  min-height: 100vh;
}

.list {
  padding: 0 0.625rem /* 10/16 */;
}

.card-box {
  width: 100%;
  height: 7.5rem /* 120/16 */;
  border-radius: 0.625rem /* 10/16 */ 0.625rem /* 10/16 */ 0 0;
  margin-top: 1.25rem /* 20/16 */;
  position: relative;
  border-bottom: .125rem /* 2/16 */ solid rgba(0,0,0,.1);
}

.card-box::after{
  position: absolute;
  content: '';
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0), rgba(255,255,255,0.1));
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
  height: .125rem /* 2/16 */;
  border-bottom:.125rem /* 2/16 */ dashed rgba(189, 178, 170); 
  bottom: -.5rem /* 8/16 */;
}

.card-type-1 {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */
    rgba(255, 117, 140, 0.2);
}

.card-type-2 {
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(255, 88, 88, 0.2);
}

.card-type-3 {
  background-image: linear-gradient(
    -225deg,
    #2cd8d5 0%,
    #c5c1ff 56%,
    #ffbac3 100%
  );
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */
    rgba(197, 193, 255, 0.2);
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
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.3125rem /* 5/16 */;
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
