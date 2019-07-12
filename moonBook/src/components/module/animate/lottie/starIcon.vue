<template>
    <div class="star-icon">
        <lottie :options="defaultOptions" :height="200" :width="200" @animCreated="handleAnimation"/>
    </div>    
</template>
<script>
import lottie from './lottie'
import animationData from './starLottie'
import { lottieAnimate } from './../../../lib/js/mixin'

export default {
    name:'starIcon',
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
