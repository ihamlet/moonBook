<template>
    <div class="search">
        <div class="search-bar" @click="isListShow">
            <i class="iconfont">&#xe65c;</i>
            {{prompt}}
        </div>
    </div>    
</template>
<script>
export default {
    name:'search',
    props: ['prompt'],
    methods: {
        isListShow(){
            this.$emit('show', true)
        }
    }
}
</script>
<style scoped>
.search{
    padding: .3125rem /* 5/16 */ .625rem /* 10/16 */;
    background: #ddd;
}

.search .search-bar{
    text-align: left;
}
</style>
