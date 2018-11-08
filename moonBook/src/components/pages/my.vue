<template>
    <div class="my page-padding">
        <card-head />
        <lazy-component class="gutter gap-top">
           <zone/> 
        </lazy-component>
        <lazy-component class="gutter gap">
            <baby-home/>
        </lazy-component>
        <slogan/>
        <footer-bar :pageIndex='pageIndex'/>
    </div>
</template>
<script>
import footerBar from './../module/footerBar'
import cardHead from './../module/myModule/head'
import zone from './../module/myModule/zone'
import babyHome from './../module/myModule/babyHome'
import slogan from './../module/slogan'

export default {
    name:'my',
    components: {
        slogan,
        footerBar,
        zone,
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
.gutter{
    padding: 0 .625rem /* 10/16 */;
}

.gap-top{
    margin-top: 3.75rem /* 60/16 */;
}

.gap{
    margin-top: .625rem /* 10/16 */;
}
</style>
