<template>
    <div class="search">
        <div class="search-bar">
            <i class="iconfont">&#xe65c;</i>
            {{searchText}}
        </div>
    </div>    
</template>
<script>
export default {
    name:'search',
    data () {
        return {
            searchText:'搜索学校'
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
