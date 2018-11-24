<template>
    <div class="container">
        <div class="wave">
            <div class="raised-1"></div>
            <div class="raised-2"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'wave'
}
</script>
<style scoped>
.container {
    position: absolute;
    width: 100%;
    height:3.125rem /* 50/16 */;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    user-select: none;
}

.wave {
    position: relative;
    width: 100%;
    height: 3.125rem /* 50/16 */;
    background: transparent;
    user-select: none;
    overflow: hidden;
} 

.raised-1,
.raised-2{
    position: absolute;
    width: 100rem /* 1600/16 */;
    height: 100rem /* 1600/16 */;
    top: 2380%;
    left: 50%;
    background: rgba(255, 255, 255, .4);
    border-radius: 45%;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 6s linear infinite;
    z-index: 10;
}

.raised-2{
    border-radius: 47%;
    background: #fff;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 10s linear -5s infinite;
    z-index: 20;
}

@keyframes rotate {
    50% {
        transform: translate(-50%, -73%) rotate(180deg);
    } 100% {
        transform: translate(-50%, -70%) rotate(360deg);
    }
}
</style>
