<template>
    <div id="calendar">
        <div class="month">
            <ul class="flex flex-align">
                <li class="arrow left" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-year">{{ currentYear }}年</span>
                    <span class="choose-month">{{ currentMonth }}月</span>
                </li>
                <li class="arrow right" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div>
        <ul class="weekdays flex flex-align">
            <li>周一</li>
            <li>周二</li>
            <li>周三</li>
            <li>周四</li>
            <li>周五</li>
            <li>周六</li>
            <li>周日</li>
        </ul>
        <ul class="days flex flex-wrap">
            <li v-for="(dayobject,index) in dataWorks" :class="[dayobject.work ? 'works':'',workDaysIndex==index?'past-work':'',dayobject.day.getMonth()+1 != currentMonth?'other':'']" @click="getWorks(dayobject,index)">
                <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                <span v-else>
                    <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                    <span v-else>{{ dayobject.day.getDate() }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
import { format } from './../../lib/util.js'

export default {
    name:'calendar',
    data () {
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            workDaysIndex:-1,
            getDaysWork:'',
        }
    },
    created () {
        this.initData(null)
    },
    methods: {
        initData(cur){
            let leftcount=0
            let date
            if (cur) {
                date = new Date(cur)
            } else {
                let now=new Date()
                let d = new Date(this.formatDate(now.getFullYear() , now.getMonth() , 1))
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
            let str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay)
            this.days.length = 0

            for (let i = this.currentWeek - 1;i >= 0; i--) {
                let d = new Date(str)
                d.setDate(d.getDate() - i)
                let dayobject={} 
                dayobject.day=d
                this.days.push(dayobject)
            }

            for (let i = 1; i <= 35 - this.currentWeek; i++) {
                let d = new Date(str)
                d.setDate(d.getDate() + i)
                let dayobject={}
                dayobject.day=d
                this.days.push(dayobject)
            }

        },
        pickPre(year, month) {
            let d = new Date(this.formatDate(year , month , 1))
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1))
        },
        pickNext(year, month) {
            let d = new Date(this.formatDate(year , month , 1))
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1))
        },
        pickYear(year, month) {
            // alert(year + "," + month)
        },
        formatDate(year,month,day){
            let y = year
            let m = month
            if(m<10) m = "0" + m
            let d = day
            if(d<10) d = "0" + d
            return y+"-"+m+"-"+d
        },
        getWorks(dayobject,index){
            this.getDaysWork = this.dataWorks[index]
            this.workDaysIndex = index
        }
    }
}
</script>
<style scoped>
#calendar .weekdays li {
    flex: 1;
    text-align: center;
}

#calendar .days li {
    width: 14.2857143%;
    text-align: center;
    height: 3rem /* 48/16 */;
    line-height: 3rem /* 48/16 */;
}
#calendar .days li span.other-month{
    color: #c0c4cc;
}

.month {
    position: relative;
    height: 3rem /* 48/16 */;
    line-height: 3rem /* 48/16 */;
}

.month .arrow {
    position: absolute;
    width: 3rem /* 48/16 */;
    height: 3rem /* 48/16 */;
    text-align: center;
    line-height: 3rem /* 48/16 */;
    color: #c0c4cc;
}

.month .arrow.left {
    left: 0;
}

.month .arrow.right {
    right: 0;
}

.month .year-month {
    width: 100%;
    text-align: center;
}

.weekdays {
    height: 3rem /* 48/16 */;
}

.days .works.past-work,
.active {
    position: relative;
    color: #fff;
}

.days .works.past-work::before,
.active::before {
    position: absolute;
    width: 2.125rem /* 34/16 */;
    height: 2.125rem /* 34/16 */;
    border-radius: 50%;
    content: '';
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: -1;
}

.days .works.past-work::before {
    box-shadow: 0 .125rem /* 2/16 */ .375rem /* 6/16 */ red;
}

.days .works {
    position: relative;
}

.days .works.other::before{
    display: none;
}

.days .works::before {
    position: absolute;
    width: 0.5rem /* 8/16 */;
    height: 0.5rem /* 8/16 */;
    border-radius: 50%;
    content: '';
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, 1rem /* 16/16 */, 0);
    background: red;
}

.days-work {
    padding: 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
}

.days-work .avater {
    width: 3.5rem /* 56/16 */;
    height: 3.5rem /* 56/16 */;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
}

.days-work .theme-btn-plain {
    margin: 0.75rem /* 12/16 */ 0;
}

.work-name {
    color: #303133;
}

.work-execution {
    color: #909399;
    font-size: 0.9375rem /* 15/16 */;
    position: absolute;
    bottom: 1.25rem /* 20/16 */;
}

.work-explanation {
    height: 2.25rem /* 36/16 */;
    padding: 0 0.625rem /* 10/16 */;
    font-size: 0.875rem /* 14/16 */;
    color: #303133;
}

.work-explanation .point {
    position: relative;
    padding-left: 1.875rem /* 30/16 */;
}

.work-explanation .point::before {
    position: absolute;
    content: '';
    width: 0.5rem /* 8/16 */;
    height: 0.5rem /* 8/16 */;
    border-radius: 50%;
    left: 0.9375rem /* 15/16 */;
    top: 50%;
    transform: translate3d(0, -50%, 0);
}

.work-explanation .point.past::before {
    background: red;
}

.card-days-work {
    padding-top: 1.25rem /* 20/16 */;
    position: relative;
}

.card-days-work::before {
    position: absolute;
    content: '';
    width: 18.75rem /* 300/16 */;
    height: 0.0625rem /* 1/16 */;
    background: #dcdfe6;
    top: 10%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
}

.days-btn{
    padding: 0 1.875rem /* 30/16 */;
}
</style>
