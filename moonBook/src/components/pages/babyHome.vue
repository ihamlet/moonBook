<template>
    <div class="baby-home">
        <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft"/>
        <div class="header">
            <div class="baby-info">

            </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcode'

export default {
    name:'baby-home',
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
    
}
</style>
