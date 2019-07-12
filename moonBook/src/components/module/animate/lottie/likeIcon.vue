<template>
    <div class="like-icon">
        <lottie :options="defaultOptions" :height="200" :width="200" @animCreated="handleAnimation"/>
    </div>    
</template>
<script>
import lottie from './lottie'
import animationData from './likeLottie'
import { lottieAnimate } from './../../../lib/js/mixin'

export default {
    name:'likeIcon',
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
