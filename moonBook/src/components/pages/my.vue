<template>
    <div class="my page-padding">
        <card-head />
        <baby-home/>
        <footer-bar :pageIndex='pageIndex'/>
    </div>
</template>
<script>
import footerBar from './../module/footerBar'
import cardHead from './../module/myModule/head'
import babyHome from './../module/myModule/babyHome'
// import slogan from './../module/slogan'

export default {
    name:'my',
    components: {
        // slogan,
        footerBar,
        cardHead,
        babyHome
    },
    data () {
        return {
            pageIndex:3
        }
    }
}
</script>
<style scoped>
.my{
    min-height: 100vh;
}

.page-padding{
    padding-bottom: 12.5rem /* 200/16 */;
}
</style>
