<template>
    <div class="advertising-details">
        <div class="ad-container">

        </div>
        <div class="footer-bar">

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
