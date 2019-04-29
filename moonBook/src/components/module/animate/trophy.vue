<template>
    <div class="trophy-box">
        <div class="poset flex flex-justify">
            <img class="day bounceIn animated an-2" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/animate/21tian.png"/>
            <img class="trophy jackInTheBox animated an-0" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/animate/jiangbei%20.png"/>
            <img class="flower zoomIn animated an-4" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/animate/caihua.png"/>
        </div>
    </div>    
</template>
<script>
export default {
    name:'Trophy'
}
</script>
<style scoped>
.poset{
    position: relative;
}

.day,
.trophy,
.flower{
    position: absolute;
}

.day{
    width: 240px;
    z-index: 3;
    margin-top: 40px;
}

.trophy{
    z-index: 2;
    width: 184px;
}

.flower{
    z-index: 1;
}
</style>
