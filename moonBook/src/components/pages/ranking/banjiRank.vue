<template>
    <div class="banji-rank-page theme-background">
        <div class="head">
            <img class="img-concent star-head flipInY animated" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/star.png" />
            <div class="time flex flex-align theme-color">
                <div class="start-week-time">{{$route.query.startWeekTime}}</div>
                <span>-</span>
                <div class="end-week-time">{{$route.query.endWeekTime}}</div>
            </div>
        </div>
        <div class="home-icon">
            <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/rank/home-icon.png" />
            <div class="school-info flex flex-align">
                <span>{{$route.query.school_name}}</span>丨<span>{{$route.query.banji_name}}</span>
            </div>
        </div>

        <div class="read-data">
            <ul class="flex flex-align">
                <li class="item">
                    <div class="name flex flex-align flex-justify">
                        <i class="iconfont">&#xe693;</i> 打卡人数
                    </div>
                    <div class="number">
                       <i class="iconfont" v-for='(item,index) in setNumber(12)' :key="index">{{item}}</i>
                    </div>
                </li>
                <li class="item">
                    <div class="name flex flex-align flex-justify">
                        <i class="iconfont">&#xe68e;</i> 打卡天数
                    </div>
                    <div class="number">
                        <i class="iconfont" v-for='(item,index) in setNumber(42)' :key="index">{{item}}</i>
                    </div>
                </li>
                <li class="item">
                    <div class="name flex flex-align flex-justify">
                        <i class="iconfont">&#xe68f;</i> 打卡次数
                    </div>
                    <div class="number">
                        <i class="iconfont" v-for='(item,index) in setNumber(123)' :key="index">{{item}}</i>
                    </div>
                </li>
            </ul>
        </div>

        <div class="module">

        </div>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import { numbers } from './../../lib/js/speech'

export default {
    name:'banjiRank',
    computed: {
        
    },
    data() {
        return {
           numbers: numbers 
        }
    },
    methods: {
        setNumber(num){
            let arr = num.toString().split('')

            let numberArr = arr.map(e=>{
                return this.numbers[e]
            })

            return numberArr
        }
    },
}
</script>
<style scoped>
.head{
    position: relative;
}

.img-concent{
    margin:  0 auto;
    display: block;
    max-width: 240px;
}

.banji-rank-page{
    width: 100%;
    min-height: 100vh;
    text-shadow: 0 1px 1px rgba(255,255,255,.3)
}

.home-icon{
    width: 70px;
    height: 70px;
    background: #fff;
    padding: 20px;
    border-radius: 50%;
    margin: 20px auto;
    position: relative;
    box-shadow: 0 3px 10px rgba(25, 137, 250, 0.3);
}

.school-info{
    position: absolute;
    white-space: nowrap;
    bottom: -30px;
    left: 50%;
    color: #fff;
}

.time{
    padding: 5px 10px;
    background: #fff;
    position: absolute;
    border-radius: 28px;
    left: 50%;
    bottom: 5px;
}

.read-data .item .number,
.school-info,
.time{
    transform: translate3d(-50%, 0, 0);
}

.time span{
    margin:0 5px;
}

.time .number{
    text-align: center;
}

.read-data{
    width: 100%;
    margin-top: 100px;
}

.read-data ul li{
    flex: 1;
    color: #fff;
}

.read-data ul li i.iconfont{
    font-size: 24px;
    margin-right: 5px;
}

.read-data .item{
    position: relative;
}

.read-data .item:last-child::before{
    display: none;
}

.read-data .item::before{
    position: absolute;
    content: '';
    right: 0;
    height: 100px;
    width: 1px;
    background: #fff;
    opacity: .5;
}

.read-data .item .number{
    position: absolute;
    left: 50%;
    margin-left: -12px;
    margin-top: 10px;
}

.read-data .item .number i.iconfont{
    font-size: 50px;
    margin-right: -25px;
    text-shadow: 0 2px 16px rgba(25, 137, 250, 0.3)
}
</style>
