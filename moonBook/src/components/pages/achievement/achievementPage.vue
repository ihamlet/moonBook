<template>
    <div class="achievement-page">
        <div class="wrap">
            <div class="user-card flex flex-align">
                <div class="flex flex-align">
                    <div class="active">
                        <img :src="$route.query.avatar" />
                    </div>
                    <div class="child-info">
                        <div class="name">{{$route.query.name}}</div> 
                        <div class="">成就：01/16</div>
                    </div>
                </div>
            </div>
            <div class="gutter">
                <div class="module-card">
                    <div class="module-title">打卡成就</div>
                    <van-row>
                        <van-col span="6" v-for='(item,index) in medalList' :key="index">
                            <div class="medal-item">
                                <div class="icon flex flex-justify flipInX animated" :style="{animationDelay:`${200*index}ms`}">
                                    <IconMedal :animate='level >= index+1?1:0' :gray='level >= index+1?false:true' :level="index+1"/>
                                </div>
                                <div class="name" :class="level >= index+1?'active':''">{{item.name}}</div>
                                <div class="number">{{item.day}}天</div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
      <round class="bg-round"/>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import { medalLevel, medal } from './../../lib/js/speech'
import round from './../../module/animate/round'
import IconMedal from './../../module/animate/medal'

export default {
    name:'achievement',
    components:{
        IconMedal,
        round
    },
    computed: {
        level(){
            let num = medalLevel(this.$route.query.sign_days).pop().level
            return num
        },

    },
    data() {
        return {
            medalList: medal
        }
    },
    // created() {
    //     this.fetchData()
    // },
    // watch: {
    //   '$router':'fetchData'  
    // },
    // methods: {
    //     fetchData(){

    //     }
    // }
}
</script>
<style scoped>
.achievement-page{
    min-height: 100vh;
    background: linear-gradient(45deg, #5B86E5, #36D1DC);
    position: relative;
    overflow: hidden;
}

.wrap{
    position: relative;
    z-index: 2;
}

.icon{
    margin: 5px auto;
}

.name{
    text-align: center;
}

.number{
    color: #909399;
    text-align: center;
}

.module-card{
    padding: 0 15px 10px;
    line-height: 1.5;
    font-size: 14px;
}

.gutter{
    padding: 10px;
}

.active.name{
    color: #000;
}

.user-card{
    padding:30px 10px 10px;
    justify-content: space-between
}

.user-card .active img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, .5);
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1)
}

.user-card .active{
    margin-right: 10px;
}

.user-card .name{
    color: #fff;
}

.bg-round{
    opacity: 0.2;
}

.medal-item{
    padding: 10px 0;
}
</style>
