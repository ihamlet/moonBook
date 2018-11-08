<template>
    <div class="investment">
        <a :href="investmentAd.link">
            <img class="lazy" v-lazy="investmentAd.banner" alt="加盟商广告">
        </a>
    </div>
</template>
<script>
export default {
    name:'investment',
    props: ['investmentAd']
}
</script>
<style scoped>
.investment{
    padding: .625rem /* 10/16 */ 0;
}
</style>

