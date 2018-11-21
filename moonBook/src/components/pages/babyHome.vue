<template>
    <div class="baby-home">
        <van-nav-bar fixed class="theme-nav" :title="$route.meta.title" @click-left="onClickLeft">
            <div class="btn-left" slot='left'>
                <i class="iconfont">&#xe657;</i>
                <span class="text">返回</span>
            </div>
        </van-nav-bar>
        <div class="header theme-background">
            <div class="baby-info">
                <wave/>
            </div>
        </div>
        <div class="container">

        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'
import wave from './../module/animate/anWave'

export default {
    name:'baby-home',
    components: {
        wave  
    },
    data () {
        return {
            
        }
    },
    created () {
        this.qrcode() 
    },
    methods: {
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
</style>
