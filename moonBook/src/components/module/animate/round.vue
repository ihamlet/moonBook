<template>
    <div class="welt">
        <div class="round" :class="`round-${index}`" :style="{width:list.w,height:list.w}" v-for='(list,index) in round' :key="index"></div>
    </div>
</template>
<script>
export default {
    name:'round',
    data () {
        return {
            round:[{
                w:'300px'
            },{
                w:'100px'
            },{
                w:'50px'
            },{
                w:'200px'
            },{
                w:'60px'
            }]
        }
    }
}
</script>
<style scoped>
.round-0{
    left: -4rem;
    top: -11rem;
    background-image: linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%);
    box-shadow:0 .3125rem /* 5/16 */ 1.5625rem /* 25/16 */ #F8D800;
    animation: Swaying1 8s linear infinite;
}

.round-1{
    right: -2rem;
    bottom: 0;
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
    box-shadow:0 0 1.25rem /* 20/16 */ #0396FF;
    animation: Swaying2 8s linear infinite;
}

.round-2{
    left: -1rem;
    bottom: 40px;
    background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);
    box-shadow:0 .3125rem /* 5/16 */ 1.25rem /* 20/16 */ #EA5455;
    animation: Swaying2 8s linear infinite;
}

.round-3{
    right: 11%;
    top: 43%;
    background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
    box-shadow:0 0 .3125rem /* 5/16 */ #7367F0;
    animation: Swaying1 8s linear infinite;
}

.round-4{
    right: -5%;
    top: 10%;
    background-image: linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%);
    box-shadow:0 0 1.25rem /* 20/16 */ #32CCBC;
    animation: Swaying1 8s linear infinite;
    
}

.round{
    position: absolute;
    border-radius: 50%;
}

@keyframes Swaying1{
    0% {transform: translate3d(5%, 5%, 0)}
    50%  {transform: translate3d( 0, 0, 0)}
    100% {transform: translate3d(5%, 5%, 0)}
}

@keyframes Swaying2{
    0% {transform: translate3d(-10%, -10%, 0)}
    50%  {transform: translate3d( 0, 0, 0)}
    100% {transform: translate3d(-10%, -10%, 0)}
}
</style>
