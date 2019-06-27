<template>
    <div class="slogan">
        {{$store.state.slogan}}
    </div>
</template>
<script>
export default {
    name:'slogan'    
}
</script>
<style scoped>
.slogan{
    width: 100%;
    height: 3rem /* 48/16 */;
    line-height: 3rem /* 48/16 */;
    text-align: center;
    color: #909399;
    font-size: .8125rem /* 13/16 */;
    background: transparent;
    margin-top: 1.25rem /* 20/16 */;
}
</style>
