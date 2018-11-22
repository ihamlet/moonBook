<template>
    <div class="baby-home">
        <van-nav-bar fixed class="theme-nav" :title="$route.meta.title" @click-left="onClickLeft" @click-right="onClickRight">
            <div class="btn-left" slot='left'>
                <i class="iconfont">&#xe657;</i>
                <span class="text">返回</span>
            </div>
            <div class="btn-right" slot='right'>
                <van-icon name="setting"/>
            </div>
        </van-nav-bar>
        <div class="header" :class="[childInfo.gender=='boy'?'theme-background':'background']">
            <div class="baby-info flex flex-align">
                <div class="avatar">
                    <img class="lazy" v-lazy="childInfo.avatar" :alt="childInfo.name" />
                </div>
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
            <div class="reading">
                <van-cell title="正在读的书"/>
                <div class="book-list scroll-x">
                    <div class="book-item scroll-item" v-for='(item,index) in readingList' :key="index">
                        <div class="book-cover">
                            <img :src="item.cover" :alt="item.name" />
                        </div>
                        <div class="book-name" v-line-clamp:20="2">
                            {{item.name}}
                        </div>
                        <div class="book-detail">
                            <div class="book-author" v-line-clamp:20="1">作者:{{item.author}}</div>
                            <div class="book-borrow">
                               <span>{{item.borrow}}</span>人借过
                            </div>
                            <div class="book-label">
                                <div class="label-item" v-for='(sortItem,sortIndex) in item.sort' :key="sortIndex">
                                    {{sortItem}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <van-popup v-model="showQrcode" class="card-popup">
            <qr-code :qrImage='qrImage' :totalReading='totalReading' :label='label' @close="showQrcode = false" :childInfo='childInfo'/>
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

export default {
    name:'baby-home',
    components: {
        wave,
        qrCode
    },
    computed: {
        ...mapGetters(['userDataState']),
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
            childInfo:'',
            qrImage:'',
            showQrcode:false,
            praise: 0,
            totalReading: 0,
            readingList:[],
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.put('/api/ChildInfo',{
            id: to.query.id
        }).then(res => {
            next(vm => {
                vm.qrcode()
                if(res.data.child){
                    vm.readingList = res.data.child.recentlyReading.bookList
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
        onClickRight(){
            
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
}

.baby-info .avatar img{
    width: 3.75rem /* 60/16 */;
    height: 3.75rem /* 60/16 */;
    border-radius: 50%;
    border: .1875rem /* 3/16 */ solid #fff;
    box-shadow: 0 .3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, .2);
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

.scroll-item{
    display: inline-grid
}

.book-list{
    padding-left: .625rem /* 10/16 */;
}

.book-cover{
    width: 9.375rem /* 150/16 */;
    height: 9.375rem /* 150/16 */;
}

.book-item{
    padding-right: .625rem /* 10/16 */;
}

.book-name{
    font-size: .875rem /* 14/16 */;
    color: #303133;
    width: 8.125rem /* 130/16 */;
    height: 2.5rem /* 40/16 */;
    margin: .3125rem /* 5/16 */ 0
}

.book-label{
    height: 4.0625rem /* 65/16 */;
}

.book-label .label-item{
    font-size: .75rem /* 12/16 */;
    border: .0625rem /* 1/16 */ solid #DCDFE6;
    padding: .125rem /* 2/16 */ .3125rem /* 5/16 */;
    margin-right: .3125rem /* 5/16 */;
    margin-top: .3125rem /* 5/16 */;
    float: left;
    border-radius: .25rem /* 4/16 */;
}

.book-borrow span{
    color: #F56C6C;
}

.book-detail{
    display: grid;
    font-size: .8125rem /* 13/16 */;
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
