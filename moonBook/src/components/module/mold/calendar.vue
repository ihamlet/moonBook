<template>
    <div class="calendar">
        <div class="container" :class="[pack?'pack':'open']">
            <div class="month">
                <ul class="flex flex-align">
                    <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                    <li class="year-month" @click="pickYear(currentYear,currentMonth)">
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

            <transition name="slide-fade" mode="out-in">
                <ul class="days" v-if='pack' key="month">
                    <li v-for="dayobject in days">
                        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                        <span v-else>
                            <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                            <span v-else>{{ dayobject.day.getDate() }}</span>
                        </span>
                    </li>
                </ul>
                <ul class="days" v-else key="week">
                    <li v-for="dayobject in days" v-if='WeekStartDate.getDate()+1 <= dayobject.day.getDate() && WeekEndDate.getDate()+1 >= dayobject.day.getDate() '>
                        <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                        <span v-else>{{dayobject.day.getDate()}}</span>
                    </li>
                </ul>
            </transition>
        </div>
        <div class="drop-down" @click="slide">
            <i class="iconfont" :class="[pack?'rotate':'']">&#xe608;</i>
        </div>
    </div>
</template>
<script>
import {format, getWeekStartDate, getWeekEndDate} from './../../lib/js/util.js'

export default {
    name:'calendar',
    data () {
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            pack: false,
            WeekStartDate: getWeekStartDate(),
            WeekEndDate: getWeekEndDate()
        }
    },
    created(){ 
        this.initData(null)
    },
    methods: {
        initData(cur){
            var leftcount = 0
            var date
            if (cur) {
                date = new Date(cur)
            } else {
                var now=new Date()
                var d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1))
                d.setDate(35)
                date = new Date(this.formatDate(d.getFullYear(),d.getMonth() + 1,1))
            }
            this.currentDay = date.getDate()
            this.currentYear = date.getFullYear()
            this.currentMonth = date.getMonth() + 1

            this.currentWeek = date.getDay()
            if (this.currentWeek == 0) {
                this.currentWeek = 7
            }
            var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay)
            this.days.length = 0
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str)
                d.setDate(d.getDate() - i)
                var dayobject={}
                dayobject.day=d
                this.days.push(dayobject)
            }
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str)
                d.setDate(d.getDate() + i)
                var dayobject={}
                dayobject.day=d
                this.days.push(dayobject)
            }
        },
        pickPre(year, month) {
            var d = new Date(this.formatDate(year , month , 1))
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1))
            this.pack = true
        },
        pickNext(year, month) {
            var d = new Date(this.formatDate(year , month , 1))
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1))
            this.pack = true
        },
        pickYear(year, month) {
            // alert(year + "," + month)
        },
        formatDate(year,month,day){
            var y = year
            var m = month
            if(m<10) m = "0" + m
            var d = day
            if(d<10) d = "0" + d
            return y+"-"+m+"-"+d
        },
        slide(){
            this.pack = !this.pack
            this.initData()
        }
    }
}
</script>
<style scoped>
.calendar{
    background: transparent;
    color: #fff;
    position: relative;
    box-shadow: 0 1.875rem /* 30/16 */ 2.5rem /* 40/16 */ -.625rem /* 10/16 */ rgba(0, 0, 0, .3)
}

.calendar .drop-down{
    position: absolute;
    width: 3.75rem /* 60/16 */;
    height: 1.5rem /* 24/16 */;
    background: #FF5722;
    text-align: center;
    line-height: 1.5rem /* 24/16 */;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 10;
}

.scroll-x{
    background: transparent;
}

.calendar .month ul li.arrow{
    flex: 1;
}

.calendar .month ul li.arrow,
.year-month{
    text-align: center;
}

.year-month{
    flex: 2;
}

ul.days li,
.year-month,
.weekdays{
    height: 2.25rem /* 36/16 */;
    line-height: 2.25rem /* 36/16 */;
}

.weekdays li{
    flex: 1;
    text-align: center;
}

ul.days li{
    display: inline-block;
    width: 14.2857143%;
    text-align: center;
}

.other-month{
    opacity: .3;
}

.active{
    position: relative;
    font-weight: 700;
    color: #DE4313;
    z-index: 1;
}

.active::before{
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
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
