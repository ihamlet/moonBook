<template>
    <div class="photo-stack">
        <div class="before"></div>
        <div class="after"></div>
    </div>
</template>
<script>
export default {
    name:'photo-stack'
}
</script>
<style scoped>
.photo-stack{
    width: 100%;
    height: 100%;
    position: relative;
}

.photo-stack .after,
.photo-stack .before{
    position: absolute;
    content: '';
    transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
    width: 100%;
    height: 100%;
    border-radius: .375rem /* 6/16 */;
    background: #F2F6FC;
}

.photo-stack .after{
    transform: rotateZ(10deg);
    right: .3125rem /* 5/16 */;
    transition-delay: 0.05s;
    box-shadow: 0 .25rem /* 4/16 */ .625rem /* 10/16 */ rgba(0, 0, 0, .4)
}

.photo-stack .before{
    transform: rotateZ(-7deg);
    transition-delay: 0.1s;
    right: -.1875rem /* 3/16 */;
    box-shadow: 0 .25rem /* 4/16 */ .9375rem /* 15/16 */ rgba(0, 0, 0, .2)
}
</style>

