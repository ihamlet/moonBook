<template>
    <div class="ad-label">
        <van-button class="theme-btn" plain type="primary" size="normal">{{item.ad_label}}</van-button>
    </div>    
</template>
<script>
export default {
    name:'ad-label',
    props: ['item']
}
</script>
<style scoped>
.ad-label{
    padding:.625rem /* 10/16 */ 0;
}

.theme-btn{
    width: 100%;
}
</style>
