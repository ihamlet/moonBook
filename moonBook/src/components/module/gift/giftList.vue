<template>
    <div class="gift-list">
        <div class="header-bar">
            <div class="head-title">
                礼物
            </div>
            <div class="close" @click="$emit('close')">
                <i class="iconfont">&#xe651;</i>
            </div>
        </div>
        <div class="gift-container">
            <van-swipe indicator-color="#FFEB3B">
                <van-swipe-item v-for='(item,index) in list' :key="index">
                    <div class="swipe-container">
                        <van-row>
                            <van-col span="8" v-for='(gift,giftIndex) in item' :key="giftIndex">
                                <div class="gift-box flipInY animated" :style="{animationDelay:`${30*giftIndex}ms`}"  @click="sendGift(gift)">
                                    <div class="gift-img">
                                        <img :src="gift.icon" />
                                    </div>
                                    <div class="gift-name">
                                        {{gift.name}}
                                    </div>
                                    <div class="amount">
                                        {{gift.amount > 0?`${gift.amount}金币`:'免费'}} 
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <div class="footer-bar flex">
                <div class="bar-wrap flex flex-align">
                    <img src='https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/jinbi.png' class="coin-icon"/>
                    <span class="coin">{{coin}}</span>
                </div>
                <div class="recharge flex flex-align" @click="$emit('toInvest')">
                    充值 <i class="iconfont">&#xe72a;</i>
                </div>
            </div>
        </div>
        <transition :enter-active-class="`animated ${setAnIn}`" :leave-active-class="`animated ${setAnOut}`">
            <img :src="giftImg" class="gift-dynamic" v-if='giftImg'/>
        </transition>
    </div>    
</template>
<script>
import axios from './../../lib/js/api'
import { group,getRandomArrayElements } from './../../lib/js/util'
import { giftList } from './../../lib/js/gift'

export default {
    name:'giftList',
    computed: {
        list(){
            return group(this.giftList,9)
        }
    },
    data() {
        return {
           giftList,
           coin: '2000',
           giftImg:'',
           timer: null,
           anIn:['rollIn','bounceIn','flip','lightSpeedIn','zoomInDown'],
           anOut:['rollOut','bounceOutDown','zommOutDown','fadeOutDown','flipOutY'],
           setAnIn:'',
           setAnOut:''
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)   
        this.timer = null
    },
    methods: {
        sendGift(item){
            this.giftImg = item.icon
            // this.$emit('close')
            this.setAnIn = getRandomArrayElements(this.anIn,1)
            this.setAnOut = getRandomArrayElements(this.anOut,1)

            this.timer = setTimeout(()=>{
                this.giftImg = ''
            },2000)
        }
        // toInvest(){
            
        //     this.$router.push({
        //         name:'Invest'
        //     })
        // }
    }
}
</script>
<style scoped>
.header-bar{
    width: 100%;
    height: 46px;
    line-height: 46px;
    color: #fff;
    background: #000;
}

.close{
    position: absolute;
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    right: 0;
    top: 0;
}

.close i.iconfont{
    font-size: 14px;
}

.head-title{
    text-align: center;
}

.gift-container{
    width: 100%;
    overflow: hidden;
}

.gift-img img{
    width: 55px;
    height: 55px;
    margin: 0 auto;
    display: block;
}

.gift-name{
    font-size: 13px;
    text-align: center;
    color: #C0C4CC;
}

.gift-box{
    padding: 10px 0;    
    border-right: 0.5px solid rgba(0, 0, 0, .8);
    border-bottom: 0.5px solid rgba(0, 0, 0, .8);
    margin-right: -.5px;
    margin-top: -.5px;
}

.gift-box:active{
    background: rgba(0, 0, 0, .8);
}

.footer-bar{
    width: 100%;
    height: 46px;
    line-height: 46px;
    bottom: 0px;
    color: #fff;
    z-index: 2018;
    justify-content: space-between;
}

.gift-container,
.footer-bar{
    background: rgba(0, 0, 0, .5);
    -webkit-backdrop-filter: saturate(180%) blur(1.25rem);
}

.bar-wrap{
    padding: 0 15px;
}

img.coin-icon{
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.coin{
    font-weight: 700;
    font-size: 18px;
}

.recharge{
    margin-right: 15px;
    color: #FFEB3B;
}

.recharge i.iconfont{
    margin-left: 5px;
}

.amount,
.recharge i.iconfont{
    font-size: 12px;
}

.amount{
    text-align: center;
    margin-top: 10px;
}

.swipe-container{
    padding-bottom: 30px
}

.gift-dynamic{
    position: fixed;
    top: 50%;
    right: 50%;
    width: 100px;
    height: 100px;
    margin-top: -50px;
    margin-right: -50px;
}
</style>
