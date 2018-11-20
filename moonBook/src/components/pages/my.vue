<template>
    <div class="my page-padding">
        <card-head />
        <lazy-component class="gutter gap-top">
           <zone-card v-if='dryingListLengthState > 0'/> 
        </lazy-component>
        <lazy-component class="gutter gap">
            <baby-home/>
        </lazy-component>
        <slogan/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import cardHead from './../module/myModule/head'
import zoneCard from './../module/myModule/zoneCard'
import babyHome from './../module/myModule/babyHome'
import slogan from './../module/slogan'

export default {
    name:'my',
    components: {
        slogan,
        cardHead,
        zoneCard,
        babyHome
    },
    computed: {
        ...mapGetters(['dryingListLengthState'])
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
