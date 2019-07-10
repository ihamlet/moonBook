<template>
    <div class="flower-icon">
        <lottie :options="defaultOptions" :height="80" :width="80" @animCreated="handleAnimation"/>
    </div>    
</template>
<script>
import lottie from './lottie'
import animationData from './flowerLottie'

export default {
    name:'flowerIcon',
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
    },
    methods: {
        handleAnimation(anim){
            this.anim = anim
        }
    }
}
</script>
<style scoped>

</style>
