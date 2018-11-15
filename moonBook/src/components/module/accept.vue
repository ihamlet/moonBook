<template>
    <div class="accept" :class="stepActive==2?'background-grey':''">
        <van-nav-bar :title="title" :left-text="active<=0?'返回':'上一步'" left-arrow @click-left="onClickLeft">
            <div class="icon-right" slot="right">
                <i class="iconfont">&#xe618;</i>
            </div>
        </van-nav-bar>
        <lazy-component>
            <van-steps :active="stepActive" active-color='#409eff'>
                <van-step>选择幼儿园</van-step>
                <van-step>每天借书需求</van-step>
                <van-step>选择会员时间</van-step>
            </van-steps>
        </lazy-component>
        <lazy-component>
            <div class="container" v-if='stepActive==0'>
                <div class="list scroll-y" ref="scrollContainer">
                    <div class="item" v-for='item in schoolList' @click="select(item)">
                        <van-cell-group>
                            <van-cell is-link class="flex flex-align">
                                <div class="school-info">
                                    <div class="school-name">
                                        {{item.schoolName.name}}
                                        <i class="iconfont" v-if='item.addChild.boolean'>&#xe601;</i>
                                    </div>
                                    <div class="school-address">
                                        {{item.schoolAddress}}
                                    </div>
                                </div>
                            </van-cell>
                        </van-cell-group>
                    </div>
                </div>
            </div>
        </lazy-component>
        <lazy-component>
        <div class="container"  v-if='stepActive==1'>
            <div class="card-list">
                <div class="card-box" v-for='(item,index) in cardInfo.card' :key="index" @click="selectCard(item,index)">
                    <div class="borrow-card flex animated" :class="[cardIndex==index?'rotate':'bounceInUp',`an-${index}`]">
                        <div class="borrow">
                            <span class="l">每天</span>
                            {{item.borrow}}
                            <span class="r">本</span>
                        </div>
                        <div class="info">
                            <div class="type">{{item.type}}</div>
                            <div class="period">租期{{item.period}}天</div>
                        </div>
                        <div class="deposit">
                            {{item.deposit}}
                        </div>
                    </div>
                </div>

                    <div class="explain">
                        <b>押金说明</b>
                        <p>阅亮书架根据同时可借阅图书的数量设置不同等级的会员押金。</p>
                        <p>请根据您的实际需要选择相应的会员押金</p>
                        <p>退出会员时，扣除部分消耗金额并将其退还</p>
                    </div>
                </div>
            </div>
        </lazy-component>
        <lazy-component>
            <div class="container"  v-if='stepActive==2'>
                <div class="select-list">
                    <div class="card-list">
                        <div class="item" :class="[intervalIndex==index?'select':'']" v-for='(item,index) in cardInfo.vipInterval' @click="selectInterval(item,index)">
                            <van-row class="flex flex-align">
                                <van-col span="6">
                                    <div class="focus col-box theme-background">
                                        {{item.month}}
                                    </div>
                                </van-col>
                                <van-col span="6">
                                    <div class="col-box date">
                                        {{index==1?'年费':'季费'}}
                                    </div>
                                </van-col>
                                <van-col span="6">
                                    <div class="col-box day">
                                        {{item.day}}天
                                    </div>
                                </van-col>
                                <van-col span="6">
                                    <div class="col-box price">
                                        {{item.price}}
                                    </div>
                                </van-col>
                            </van-row>
                        </div>

                        <div class="explain">
                            <b>会员时间说明</b>
                            <p>会员时间将决定您的会员功能能够使用多长时间</p>
                            <p>退出会员时购买会员时间的金额不会退还</p>
                        </div>
                    </div>
                </div>
            </div>
        </lazy-component>
        <van-popup v-model="show" position="bottom" class="order-popup">
            <div class="content" v-if='pushUserInfo.length!=0'>
                <div class="title">支付信息</div>
                <div class="list">
                    <div class="item">
                        会员类型:{{pushUserInfo.card.type}}
                    </div>
                    <div class="item">
                        会员时长:{{pushUserInfo.vipInterval.day==365?'年费':'季费'}}
                    </div>
                    <div class="item">
                        支付押金:{{pushUserInfo.card.deposit}}
                    </div>
                    <div class="item">
                        会员金额:{{pushUserInfo.vipInterval.price}}
                    </div>
                    <div class="item">
                        总计:{{pushUserInfo.vipInterval.price+pushUserInfo.card.deposit}}
                    </div>
                </div>

                <icon-success class="icon" v-if='iconSuccessShow'/>

                <van-button class="theme-btn" :loading='payLoading' :disabled='disabled' size="large" type="primary" @click="pay">
                    <i class="iconfont">&#xe65d;</i>
                    微信支付
                </van-button>
            </div>
        </van-popup>

        <!-- 添加孩子页面 -->
        <van-popup v-model="addChildShow" class="page-popup" position="right">
            <add-child @close='closeAddChildPage' :addChildPageTitle='addChildPageTitle'/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import iconSuccess from './animate/iconSuccess'
import addChild from './addChild'

export default {
    name:'accept',
    props: ['active'],
    model:{
        prop:'active',
        event:'stepActiveChange'
    },
    components: {
        iconSuccess,
        addChild
    },
    computed: {
        ...mapGetters(['userDataState'])
    },
    data () {
        return {
            addChildPageTitle:'添加孩子',
            addChildShow:false,
            disabled:false,
            payLoading:false,
            iconSuccessShow:false,
            show:false,
            title:'借阅卡办理',
            next:'下一步',
            stepActive:0,
            schoolList:[],
            cardInfo:{
                card:'',
                vipInterval:''
            },
            cardIndex:-1,
            intervalIndex:-1,
            pushUserInfo:{
                school:'',
                card:'',
                vipInterval:''
            }
        }
    }, 
    created () {
        this.fetchData()
    },
    watch: {
        active(val){
            this.stepActive = val
        },
        stepActive(val){
            this.$emit('stepActiveChange',val)
        },
        '$router':'fetchData'
    },
    methods: {
        fetchData(){
            axios.get('/api/schoolList').then(res=>{
                this.schoolList = res.data.schoolData.schoolList
            })
            axios.get('/api/cardInfo').then(res=>{
                this.cardInfo.card = res.data.card
                this.cardInfo.vipInterval = res.data.vipInterval
            })
        },
        onClickLeft(){
            this.stepActive<0?this.stepActive:this.stepActive--
            switch(this.stepActive){
                case -1:
                    this.$emit('close')
                break
            }
        },
        select(item){
            this.pushUserInfo.school = item
            this.stepActive = 1
        },
        selectCard(item,index){
            this.stepActive = 2
            this.cardIndex = index
            this.pushUserInfo.card = item
        },
        selectInterval(item,index){
            this.show = true
            this.intervalIndex = index
            this.pushUserInfo.vipInterval = item
        },
        pay(){
            this.disabled = true
            this.payLoading = true
            axios.put('/api/pay',{
                data:this.pushUserInfo,
            }).then(res=>{
                setTimeout(()=>{
                    this.payLoading = false
                    this.iconSuccessShow = true
                },1000)
                setTimeout(()=>{
                    this.iconSuccessShow = false
                    this.show = false
                    this.$store.dispatch('getUserData') //写入用户数据
                    this.$store.dispatch('getMsgLength')
                    if(this.pushUserInfo.school.addChild.boolean && this.userDataState.childInfo.length == 0){
                        this.addChildShow = true
                    }else{
                        this.$emit('close')
                    }
                },3000)
            })
        },
        closeAddChildPage(){
            this.$emit('close')
            this.addChildShow = false
        }
    }
}
</script>
<style scoped>
.school-name{
    color: #303133;
    font-size: 1rem /* 16/16 */;
}

.school-name i.iconfont{
    background: linear-gradient(90deg, #2AD396,#85BB1F);
    -webkit-background-clip: text;
    color: transparent;
}

.school-address{
    color: #909399;
}

.card-box{
    width: 100%;
    height: 8.125rem /* 130/16 */;
    overflow: hidden;
    position: relative;
}

.card-box:nth-child(1) .borrow-card{
    background-image: linear-gradient( -45deg, #FCCF31 10%, #F55555 100%);
}

.card-box:nth-child(2) .borrow-card{
   background-image: linear-gradient( -45deg, #F761A1 10%, #8C1BAB 100%);
}

.card-box:nth-child(3) .borrow-card{
   background-image: linear-gradient( -45deg, #43CBFF 10%, #9708CC 100%);
}

.card-box::before{
    content:'';
    position: absolute;
    width: 100%;
    height: .625rem /* 10/16 */;
    box-shadow: 0 .3125rem /* 5/16 */ 2.5rem /* 40/16 */ rgba(0,0,0,.8);
    z-index: 1;
    bottom: -.625rem /* 10/16 */;
}

.borrow-card{
    position: absolute;
    top: 2.5rem /* 40/16 */;
    width: 100%;
    height: 11.25rem /* 180/16 */;
    background: #000;
    border-radius: .625rem /* 10/16 */;
    box-shadow:0 .3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0,0,0,.3);
}

.borrow,
.info,
.deposit{
    flex: 1;
    height: 5rem /* 80/16 */;
    line-height: 5rem /* 80/16 */;
    color: #fff;
    position: relative;
}

.borrow{
    text-align: center;
    font-size: 2.5rem /* 40/16 */;
}

.info .type{
    font-size: 1.375rem /* 22/16 */;
}

.info .period{
    position: absolute;
    bottom: -1.5625rem /* 25/16 */;
    font-size: .875rem /* 14/16 */;
}

.borrow span{
    display: block;
    font-size: .875rem /* 14/16 */;
    position: absolute;
}

.borrow span.l{
    top: -.3125rem /* 5/16 */;
    left: .9375rem /* 15/16 */;
}

.borrow span.r{
    right: 1.875rem /* 30/16 */;
    bottom: -.5rem /* 8/16 */;
}

.deposit{
    text-align: center;
    font-size: 1.5rem /* 24/16 */;
    font-style: italic;
}

.deposit::before{
    content: "¥";
    font-size: .875rem /* 14/16 */;
}

.rotate{
   transform: rotate(6deg);
   box-shadow: 0 0 1.875rem /* 30/16 */ rgba(0,0,0,.3);
}

.select-list .item,
.col-box{
    height: 3.75rem /* 60/16 */;
}

.select-list .item{
    width: 100%;
    margin-bottom: 1.875rem /* 30/16 */;
    border: .0625rem /* 1/16 */ solid #fff;
    box-shadow: 0 .3125rem /* 5/16 */ 1.25rem /* 20/16 */ -.3125rem /* 5/16 */ rgba(0,0,0,.1);
    border-radius: .5rem /* 8/16 */;
    overflow: hidden;
    background: #fff;
}

.select-list .item.select{
    border-color:#F02B2B;
}

.select-list .item.select .theme-background{
    background: linear-gradient(-135deg, #FE8537,#F02B2B);
}

.background-grey{
    background: #f2f2f2;
    height: 100vh;
}

.col-box{
    line-height: 3.75rem /* 60/16 */;
    text-align: center;
}

.focus{
    font-size: 1.25rem /* 20/16 */;
    color: #fff;
    position: relative;
}

.price::before,
.focus::after{
    position: absolute;
    font-size: .8125rem /* 13/16 */;
}

.focus::after{
    content: '月';
    bottom: -.125rem /* 2/16 */;
    right: .9375rem /* 15/16 */;
}

.price{
    position: relative;
}

.price::before{
    content: '¥';
    left: .9375rem /* 15/16 */;
}

.icon{
    position: absolute;
    top: 1.875rem /* 30/16 */;
    right: 1.875rem /* 30/16 */;
}

</style>
