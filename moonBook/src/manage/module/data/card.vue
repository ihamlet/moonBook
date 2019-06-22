<template>
    <van-cell>
        <div class="card-cell flex flex-align">
            <div class="user-info flex" @click="toZoom">
                <div class="avatar">
                    <img :src="item.avatar" @error="imgError" v-http2https/>
                </div>
                <div class="card-info">
                   <div class="name" v-line-clamp:20="1">{{item.realname}}</div>
                   <div class="time">
                        <van-tag plain type="success" round>{{item.name}}</van-tag>
                        <div class="card-create-time">购卡时间：{{formatTime(item.create_time)}}</div>
                        <div class="card-end-time">到期时间：{{formatTime(item.end_time)}}</div>
                   </div>
                </div>
            </div>
            <div class="mobile">
                <a :href="`tel:${item.mobile}`">
                    <i class="iconfont">&#xe67b;</i>
                </a>
            </div>
        </div> 
    </van-cell>
</template>
<script>
import { format } from './../../../components/lib/js/util'

export default {
    name:'card',
    props:{
        item:{
            type:Object,
            default(){
                return {
                    create_time: "",
                    end_time: "",
                    realname: "",
                    mobile:'',
                    avatar:'',
                    name:'',
                    user_id: 0
                }
            }
        }
    },
    methods: {
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        },
        formatTime(time){
            return format(time*1000,'yyyy-MM-dd')
        },
        toZoom(){
            this.$router.push({
                name:'zoom',
                query:{
                    id: this.item.user_id
                }
            })
        }
    }
}
</script>
<style scoped>
.avatar,
.avatar img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info,
.card-info{
    flex: 1;
}

.iconfont{
    font-size: 24px;
    color: #07c160;
    opacity: .6;
    text-shadow: 0 2px 6px rgba(7, 193, 96, 0.2)
}

.name{
    font-size: 16px;
}

.time{
    color: #606266
}
</style>
