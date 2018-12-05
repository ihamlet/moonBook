<template>
    <div class="my page-padding">
        <card-head />
        <lazy-component class="gutter gap-top">
           <class-home v-if='schoolState'/>
        </lazy-component>
        <lazy-component class="gutter gap" v-if='dryingListLengthState > 0'>
            <zone-card/> 
        </lazy-component>
        <lazy-component class="gutter gap">
            <baby-home/>
        </lazy-component>
        <slogan/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from './../lib/js/api'

import cardHead from './../module/myModule/head'
import classHome from './../module/myModule/classHome'
import zoneCard from './../module/myModule/zoneCard'
import babyHome from './../module/myModule/babyHome'
import slogan from './../module/slogan'

export default {
    name:'my',
    components: {
        slogan,
        cardHead,
        zoneCard,
        babyHome,
        classHome
    },
    computed: {
        ...mapGetters(['dryingListLengthState','schoolState'])
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
