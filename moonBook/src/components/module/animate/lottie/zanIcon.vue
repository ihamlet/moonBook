<template>
    <div class="zan-icon">
        <lottie :options="defaultOptions" :height="200" :width="200" @animCreated="handleAnimation"/>
    </div>    
</template>
<script>
import lottie from './lottie'
import animationData from './zanLottie'

export default {
    name:'zanIcon',
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
        handleAnimation: function (anim) {
            this.anim = anim
        }
    }
}
</script>
<style scoped>

</style>
