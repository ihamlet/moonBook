<template>
  <div class="calendar-page">
    <div id="calendar">
        <div class="month">
            <ul class="flex flex-align">
                <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month">
                    <span class="choose-year">{{ currentYear }}年</span>
                    <span class="choose-month">{{ currentMonth }}月</span>
                </li>
                <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div>
        <ul class="weekdays flex flex-align">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
        </ul>
        <ul class="days">
            <li  v-for="(dayobject,dayobjectIndex) in days" :key="dayobjectIndex">
                <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                <span v-else>
                    <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                    <span v-else>{{ dayobject.day.getDate() }}</span>
                </span>

            </li>
        </ul>
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white" :height='130'>
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="footer-bar">
      <div class="check-in">
      <van-button class="theme-btn" type="primary" size="normal" round>今日签到</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "calendar",
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      pack: false,
      banner:[
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banner/banner-1.jpg',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banner/banner-2.jpg',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banner/banner-3.jpg',
      ]
    }
  },
  created() {
    this.initData(null)
  },
  methods: {
    initData: function(cur) {
      var leftcount=0; //存放剩余数量
      var date;

      if (cur) {
          date = new Date(cur);
      } else {
          var now=new Date();
          var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1));
          d.setDate(35);
          date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;

      this.currentWeek = date.getDay(); // 1...6,0
      if (this.currentWeek == 0) {
          this.currentWeek = 7;
      }
      var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day=d;
          this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用


      }
      //其他周
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
          var d = new Date(str)
          d.setDate(d.getDate() + i)
          let dayobject = {
            day:d
          }
          this.days.push(dayobject)
      }

  },
  pickPre: function(year, month) {

      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
  },
  pickNext: function(year, month) {
      var d = new Date(this.formatDate(year , month , 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
  },
  pickYear: function(year, month) {
      alert(year + "," + month);
  },

  // 返回 类似 2016-01-02 格式的字符串
  formatDate: function(year,month,day){
      var y = year;
      var m = month;
      if(m<10) m = "0" + m;
      var d = day;
      if(d<10) d = "0" + d;
      return y+"-"+m+"-"+d
  },
  }
}
</script>
<style scoped>
#calendar {
  background: linear-gradient(to right, #ff5858, #f857a6); 
  color: #fff;
  position: relative;
  box-shadow: 0 1.25rem 1.875rem rgba(248, 87, 163, 0.26);
  z-index: 10;
  border-radius:0 0 10px 10px;
}

#calendar .drop-down {
  position: absolute;
  width: 3.75rem /* 60/16 */;
  height: 1.5rem /* 24/16 */;
  background: #ff5722;
  text-align: center;
  line-height: 1.5rem /* 24/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 10;
}

.scroll-x {
  background: transparent;
}

#calendar .month ul{
  height: 45px;
}

#calendar .month ul li.arrow {
  flex: 1;
}

#calendar .month ul li.arrow,
.year-month {
  text-align: center;
}

.year-month {
  flex: 2;
}

ul.days li,
.year-month,
.weekdays {
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
}

.weekdays li {
  flex: 1;
  text-align: center;
}

ul.days li {
  display: inline-block;
  width: 14.2857143%;
  text-align: center;
}

.other-month {
  opacity: 0.3;
}

.active {
  position: relative;
  font-weight: 700;
  color: #f857a6;
  z-index: 1;
}

.active::before {
  left: 50%;
  top: 50%;
  content: '';
  width: 1.75rem /* 28/16 */;
  height: 1.75rem /* 28/16 */;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  background: #fff;
  border-radius: 50%;
  z-index: -1;
}

/* 过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.banner{
  padding: 0 10px;
}

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
}

.check-in{
  padding: 10px 20px;
}

.theme-btn{
  width: 100%;
}

.check-in .theme-btn{
  background: linear-gradient(to right, #ff5858, #f857a6);
}
</style>
