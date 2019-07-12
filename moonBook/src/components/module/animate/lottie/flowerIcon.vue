<template>
    <div class="flower-icon">
        <lottie :options="defaultOptions" :height="80" :width="80" @animCreated="handleAnimation"/>
    </div>    
</template>
<script>
import lottie from './lottie'
import animationData from './flowerLottie'
import { lottieAnimate } from './../../../lib/js/mixin'

export default {
    name:'flowerIcon',
    mixins: [ lottieAnimate ],
    components:{
        lottie
    },
    data () {
        return {
            defaultOptions: {
                animationData:animationData
            },
            animationSpeed:1,
            anim:''
        }
    }
}
</script>
<style scoped>

</style>
