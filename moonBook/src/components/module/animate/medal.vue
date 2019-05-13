<template>
    <div class="medal">
        <div class="level">
            Lv.{{level}}
        </div>
        <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/medal.png" />
    </div>    
</template>
<script>
export default {
    name:'medal',
    props:['level'],
    computed: {
        
    }
}
</script>
<style scoped>
.medal{
    width: 50px;
    overflow: hidden;
    position: relative;
    line-height: 1.5rem
}

.medal .level{
    position: absolute;
    z-index: 1;
    bottom: 10%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
}

</style>
