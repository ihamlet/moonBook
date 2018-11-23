<template>
    <div class="baby-home page-padding">
        <van-nav-bar fixed :class="[fixedHeaderBar?'theme-nav':'']" :title="fixedHeaderBar?$route.meta.title:childInfo.name" @click-left="onClickLeft" @click-right="onClickRight">
            <div class="btn-left" slot='left'>
                <i class="iconfont">&#xe657;</i>
                <span class="text">个人中心</span>
            </div>
            <div class="head-bar-icon" slot='right'>
                <i class="iconfont">&#xe60c;</i>
            </div>
        </van-nav-bar>
        <div class="header" ref='head' :class="[childInfo.gender=='boy'?'theme-background':'background']">
            <div class="baby-info flex flex-align">
                <div class="avatar" v-if='childInfo.avatar'>
                    <img class="avatar-img" :src="childInfo.avatar" :alt="childInfo.name"/>
                </div>
                <avatar :gender='childInfo.gender' v-else/>
                <div class="baby-data">
                    <div class="list flex flex-align">
                        <div class="item name">
                            {{childInfo.name}}
                        </div>
                        <div class="item detail">
                            <span class="gender">
                                <i class="iconfont" v-if="childInfo.gender=='boy'">&#xe646;</i>
                                <i class="iconfont" v-else>&#xe645;</i>
                            </span> 
                            <span class="age">{{age}}岁</span>
                        </div>
                    </div>
                    <div class="label">{{label}}</div>
                    <div class="school" v-line-clamp:20="1" v-if='userDataState.regInfo'>{{userDataState.regInfo.school}}</div>
                    <div class="school" v-line-clamp:20="1" v-if='userDataState.vipInfo&&!userDataState.regInfo'>{{userDataState.vipInfo.school.schoolName.name}}</div>
                </div>
                <div class="qr-code" @click="showQrcode=true">
                    <van-icon name="qr"/>
                </div>
            </div>
            <wave/>
        </div>
        <div class="container">
            <div class="bar flex flex-align">
                <div class="bar-item totalReading">总阅读量 {{totalReading}}</div>
                <div class="bar-item praise">赞 {{praise}}</div>
            </div>
            <lazy-component class="module">
                <reading :list='readBook' moduleTitle='宝贝读过的书'/>
            </lazy-component>
            <lazy-component class="module">
                <reading :list='lateBook' moduleTitle='宝贝最近在读的书'/>
            </lazy-component>
            <lazy-component class="module">
                <div class="module-title">晒一晒</div>
                <div class="not-content" v-if='dryingListLengthState == 0'>
                    尚无记录
                </div>
                <van-list v-model="loading" :finished="finished" @load="onLoad" v-else>
                    <div class="list">
                        <div class="item" v-for="(item,index) in list" :key="index">
                            <van-cell>
                                <graphic-crad :item='item' type='babyHome' :familyTitle='childInfo.familyTitle' :babyName='childInfo.name'/>
                            </van-cell>
                        </div> 
                    </div> 
                </van-list>
            </lazy-component>
        </div>

        <slogan v-if='finished||dryingListLengthState == 0'/>
        
        <van-popup v-model="showQrcode" class="card-popup">
            <qr-code :qrImage='qrImage' :totalReading='totalReading' :label='label' @close="showQrcode = false" :childInfo='childInfo'/>
        </van-popup>

        <van-popup v-model="showSetting" class="page-popup" position="right">
            <baby-setting @close="showSetting = false"/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import QRCode from 'qrcode'
import { format } from './../lib/js/util.js'
import wave from './../module/animate/anWave'
import qrCode from './../module/mold/qrCode'
import avatar from './../module/avatar'
import reading from './../module/reading'
import graphicCrad from './../module/card/graphicCrad'
import babySetting from './../module/setting/babySetting'
import slogan from './../module/slogan'

export default {
    name:'baby-home',
    components: {
        wave,
        qrCode,
        reading,
        avatar,
        graphicCrad,
        babySetting,
        slogan
    },
    computed: {
        ...mapGetters(['userDataState','dryingListLengthState']),
        age(){
            if(this.childInfo){
                let year = format(new Date(),'yyyy') - this.childInfo.birthday.split('-')[0]
                return year
            }else{
                return 0
            }
        },
        label(){
            return this.totalReading > 50 ? '阅读小明星':'阅读新秀'
        }
    },
    data () {
        return {
            fixedHeaderBar:true,
            domHeight:'',
            childInfo:'',
            qrImage:'',
            showQrcode:false,
            praise: 0,
            totalReading: 0,
            lateBook:[],
            readBook:[],
            list:[],
            loading: false,
            finished: false,
            showSetting: false
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.put('/api/ChildInfo',{
            id: to.query.id
        }).then(res => {
            next(vm => {
                vm.qrcode()
                if(res.data.child){
                    vm.lateBook = res.data.child.lateBook
                    vm.readBook = res.data.child.readBook
                    vm.totalReading = res.data.child.totalReading.number
                    vm.praise = res.data.child.praise.number
                    vm.childInfo = res.data.child.data
                }else{
                    vm.$dialog.alert({
                        message:`<div class='text-center'>请添加宝贝，帮助孩子更好的养成阅读习惯</div>`,
                        showConfirmButton:true,
                        showCancelButton:true,
                        confirmButtonText:'添加宝贝',
                        cancelButtonText:'稍后添加'
                    }).then(() => {
                        vm.$router.push({name:'register'})
                    }).catch(() => {
                        vm.$router.go(-1)
                    })
                }
            })
        })
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        qrcode(){
            QRCode.toDataURL(window.location.href)
            .then(url => {
                this.qrImage = url
            })
            .catch(err => {
                console.error(err)
            })
        },
        handleScroll(){
            this.getDomHeight()  
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = scrollTop
            if( this.domHeight < this.scrollTop){
               this.fixedHeaderBar = false
            }else{
               this.fixedHeaderBar = true
            }
        },
        getDomHeight(){
            if(this.$refs.head){
                this.domHeight = this.$refs.head.offsetHeight/2
            }
        },
        onLoad() {
            axios.get('/api/userData').then(res=>{
                setTimeout(() => {
                    let array = res.data.userData.dryingList
                    let length = this.dryingListLengthState < 10 ? 1 : 5
                    for (let i = 0; i < length; i++) {
                        this.list.push( array[this.list.length] )
                    }
                    this.loading = false
                    if (this.list.length >= this.dryingListLengthState) {
                        this.finished = true;
                    }
                },500)
            })
        },
        onClickRight(){
            this.showSetting = true
        }
    }
}
</script>
<style scoped>
.header{
    width: 100%;
    height: 11.25rem /* 180/16 */;
    position: relative;
}

.background{
    background: linear-gradient(-135deg, #FF765C,#FF23B3);
}

.baby-info .avatar{
    margin-right: .625rem /* 10/16 */;
    width: 3.75rem /* 60/16 */;
    height: 3.75rem /* 60/16 */;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 .3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, .2);
    border: .1875rem /* 3/16 */ solid #fff;
}

.baby-info{
    padding: 3.5rem /* 56/16 */ 1.25rem /* 20/16 */;
}

.list{
    color: #fff;
}

.list .item{
    margin-right: .625rem /* 10/16 */;
}

.detail,
.school{
    font-size: .875rem /* 14/16 */;
}

.school{
    width: 10rem /* 160/16 */;
    text-align: left;
    margin-top: .3125rem /* 5/16 */;
    color: #fff;
}

.qr-code{
    position: absolute;
    right: 1.25rem /* 20/16 */;
}

.qr-code i.van-icon{
    font-size: 1.5rem /* 24/16 */;
    color: #fff;
}

.follow .theme-btn{
    border-color: #fff;
    color: #fff;
}

.bar{
    height: 2.875rem /* 46/16 */;
    line-height: 2.875rem /* 46/16 */;
    background: #fff;
    position: relative;
}

.bar::before{
    content: '';
    position: absolute;
    width: .0625rem /* 1/16 */;
    height: 1.25rem /* 20/16 */;
    background: #DCDFE6;
    left: 50%;
    top: 50%;
    transform: translate3d(0, -50%, 0);
}

.bar-item{
    flex: 1;
    text-align: center;
}

.label{
    font-size: .8125rem /* 13/16 */;
    color: #fff;
}
</style>
