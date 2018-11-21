<template>
    <div class="baby-home">
        <van-nav-bar fixed class="theme-nav" :title="$route.meta.title" @click-left="onClickLeft">
            <div class="btn-left" slot='left'>
                <i class="iconfont">&#xe657;</i>
                <span class="text">返回</span>
            </div>
            <div class="btn-right" slot='right'>
                <van-icon name="qr"/>
            </div>
        </van-nav-bar>
        <div class="header" :class="[childInfo.gender=='boy'?'theme-background':'background']">
            <div class="baby-info flex flex-align">
                <div class="avatar">
                    <img :src="childInfo.avatar" :alt="childInfo.name" />
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
                    <div class="school" v-line-clamp:20="1" v-if='userDataState.regInfo'>{{userDataState.regInfo.school}}</div>
                    <div class="school" v-line-clamp:20="1" v-if='userDataState.vipInfo&&!userDataState.regInfo'>{{userDataState.vipInfo.school.schoolName.name}}</div>
                </div>
                <div class="follow">
                    <van-button class="theme-btn" size="small" type="primary" plain @click="toRegister">加关注</van-button>
                </div>
            </div>
            <wave/>
        </div>
        <div class="container">

        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import QRCode from 'qrcode'
import { format } from './../lib/js/util.js'
import wave from './../module/animate/anWave'

export default {
    name:'baby-home',
    components: {
        wave  
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
        }
    },
    data () {
        return {
            childInfo:''
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData'  
    },
    methods: {
        fetchData(){
            this.qrcode()
            axios.put('/api/ChildInfo',{
                id:this.$route.query.id
            }).then(res=>{
                this.childInfo = res.data.child.data
            }).catch(err=>{
                console.log(err)
                this.$dialog.alert({
                    message:`<div class='text-center'>请添加宝贝，帮助孩子更好的养成阅读习惯</div>`,
                    showConfirmButton:true,
                    showCancelButton:true,
                    confirmButtonText:'添加宝贝',
                    cancelButtonText:'稍后添加'
                }).then(() => {
                    this.$router.push({name:'register'})
                }).catch(() => {
                    this.$router.go(-1)
                })
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        qrcode () {
            QRCode.toDataURL(window.location.href)
            .then(url => {
                console.log(url)
            })
            .catch(err => {
                console.error(err)
            })
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

.name{
    font-size: 1.125rem /* 18/16 */;
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

.follow{
    position: absolute;
    right: 1.25rem /* 20/16 */;
}

.follow .theme-btn{
    border-color: #fff;
    color: #fff;
}
</style>
