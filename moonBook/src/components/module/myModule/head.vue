<template>
    <div class="head">
        <van-nav-bar class="theme-nav" :title="$route.meta.title" @click-right="onClickRight">
            <div class="card-package" slot='right'>
                <i class="iconfont">&#xe66a;</i>
            </div>
        </van-nav-bar>
        <div class="user-info flex flex-justify" v-if='userData.userInfo'>
            <div class="info">
                <div class="avatar">
                    <img :src="userData.userInfo.avatar" :alt="userData.userInfo.name">
                </div>
                
                <div class="name">{{userData.userInfo.name}}</div>
                <div class="school" v-if='userData.vipInfo'>{{userData.vipInfo.school.schoolName.name}}</div>
            </div>
        </div>
        <div class="card">
            <div class="borrow-card flex flex-align">
                <div class="service flex flex-align" v-if='userData.vipInfo'>
                    <div class="data-flow">
                        <i class="iconfont" :class="`vip-${userData.vipInfo.card.level.name}`">&#xe604;</i>
                        <b class="card-name">
                            {{userData.vipInfo.card.type}}
                        </b>
                    </div>
                    <div class="data-flow read">
                        <span class="data-name">读过</span>
                        <span class="number">
                            <number-grow :value='userData.readInfo.read.number' :time='.2'/>
                        </span>
                    </div>
                    <div class="data-flow reading">
                        <span class="data-name">在读</span>
                        <span class="number">
                             <number-grow :value='userData.readInfo.reading.number' :time='.2'/>
                        </span>
                    </div>
                    <div class="data-flow collection">
                        <span class="data-name">收藏</span>
                        <span class="number">
                             <number-grow :value='userData.readInfo.collection.number' :time='.2'/>
                        </span>
                    </div>
                    <div class="data-flow abrasion">
                        <span class="data-name">磨损</span>
                        <span class="number">
                             <number-grow :value='userData.readInfo.abrasion.number' :time='.2'/>
                        </span>
                    </div>
                </div>
                <div class="no-service flex flex-align flex-justify" v-else @click="toAccept">
                    您还没有办理借阅卡? 
                    <div class="theme-color">前往办卡</div> 
                    <i class="iconfont">&#xe61b;</i>  
                </div>
            </div>
        </div>

        <!-- 借阅卡办理页面 -->
        <van-popup v-model="applyShow" class="page-popup" position="bottom" :overlay="false">
            <accept @close='onAccpetPage' v-model='active'/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import numberGrow from './../../module/animate/numberGrow'
import accept from './../accept'

import { mapMutations } from 'vuex'

export default {
    name:'cardHead',
    components: {
        numberGrow,
        accept
    },
    computed: {
        userData(){
            return this.$store.getters.userDataState
        }
    },
    data () {
        return {
            active:0,
            applyShow:false
        }
    }, 
    methods: {
        fetchData(){
            axios.get('/api/userData').then(res=>{
                this.userData = res.data.userData
            })
        },
        onClickRight(){
            console.log(111)
        },
        toAccept(){
            this.applyShow = true
            this.active = 0
        },
        onAccpetPage(){
            this.applyShow = false
        },
        onStepActiveChange(val){
            this.active = val
        }
    }
}
</script>
<style scoped>
.head{
   width: 100%;
   background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
   position: relative;
}

.theme-nav.van-nav-bar{
    background: transparent;
    color: #fff;
}

.theme-nav.van-nav-bar::after{
    display: none;
}

.card{
    position: absolute;
    bottom: -3.125rem /* 50/16 */;
    padding: 0;
    width: 95%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
}

.borrow-card,
.avatar img{
    box-shadow: 0 .3125rem /* 5/16 */ 2.5rem /* 40/16 */ -.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.borrow-card{
    width: 100%;
    background: #fff;
    padding: .3125rem /* 5/16 */ 0;
    border-radius: .625rem /* 10/16 */;
}

.borrow-card i.iconfont{
    font-size: 1.875rem /* 30/16 */;
}

.avatar{
    width: 4.5rem /* 72/16 */;
    margin: 0 auto;
}

.avatar img{
    width: 4.5rem /* 72/16 */;
    height: 4.5rem /* 72/16 */;
    border-radius: 50%;
    border: .1875rem /* 3/16 */ solid #fff;
}

.user-info{
    padding-top: .9375rem /* 15/16 */;
    padding-bottom: 1.875rem /* 30/16 */;
}

.info{
    color: #fff;
}

.info .name{
    font-size: 1.25rem /* 20/16 */;
    text-align: center;
    margin-top: .625rem /* 10/16 */
}

.info .school{
    font-size: .875rem /* 14/16 */;
}

.card-box{
    width: 6.25rem /* 100/16 */;
    height: 3.75rem /* 60/16 */;
    border-radius: .625rem /* 10/16 */;
    color: #fff;
    text-align: center;
    line-height: 3.75rem /* 60/16 */;
}

.service,
.no-service{
    font-size: .875rem /* 14/16 */;
    width: 100%;
    height: 3.125rem /* 50/16 */;
}

.no-service i.iconfont{
    font-size: 1.5625rem /* 25/16 */;
    margin-left: .3125rem /* 5/16 */;
}

.data-flow{
    flex: 1;
    text-align: center;
    display: inline-grid;
}

.data-flow .number{
    font-size: 1.875rem /* 30/16 */;
}

.data-flow .card-name{
    font-size: x-small;
}

.card-package i.iconfont{
    font-size: 1.25rem /* 20/16 */;
}

.theme-color{
    margin: 0 .3125rem /* 5/16 */;
}
</style>
