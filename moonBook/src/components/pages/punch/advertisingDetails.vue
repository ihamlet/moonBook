<template>
    <div class="advertising-details">
        <div class="ad-container">

        </div>
        <div class="footer-bar flex flex-align">
            <div class="">
                
            </div>
            <div class="">
                <van-button class="theme-btn" type="primary">领兑换券</van-button>
            </div>
            <div class="theme-color">
                更多奖品
            </div>
        </div>

        <van-popup v-model="show">内容</van-popup>
    </div>    
</template>
<script>
export default {
    name:'advertisingDetails',
    data () {
        return {
            show:false
        }
    }
}
</script>
<style scoped>

</style>
