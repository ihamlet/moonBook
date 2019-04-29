<template>
  <div class="page-padding">
    <van-tabs v-model="active" animated sticky color='#0084ff' :line-width='20' :line-height='4'>
      <van-tab title="班级概况">
        <overview />
      </van-tab>
      <van-tab title="人员管理">
        <div class="banji-overview flex flex-align">
           <div class="people">学生24人/家长36人</div>  
           <div class="theme-color">+ 邀请</div>
        </div>
        <teacherList/>
        <childList/>
      </van-tab>
      <van-tab title="人员审核">
         <userCard />
      </van-tab>
      <van-tab title="通知管理">
        1111
      </van-tab>
      <van-tab title="办卡数据">
        11
      </van-tab>
    </van-tabs>
    <div class='slogan'>
        {{$store.state.slogan}}
    </div>
  </div>
</template>
<script>
import overview from './../../module/class/overview'
import userCard from './../../module/user/userCard'
import teacherList from './../../module/teacher/teacherList'
import childList from './../../module/user/childList'

export default {
  name: 'classSetting',
  components: {
    overview,
    userCard,
    teacherList,
    childList
  },
  data() {
    return {
      title: '班级管理',
      active: 0
    }
  }
}
</script>

<style scoped>
.banji-overview {
  height: 45px;
  line-height: 45px;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 13px;
}
</style>


