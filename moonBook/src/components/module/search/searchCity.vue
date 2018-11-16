<template>
    <div class="search">
        <div class="search-bar">
            <i class="iconfont">&#xe65c;</i>
            {{placeholder}}
        </div>
    </div>    
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name:'search',
    data () {
        return {
            placeholder:'请搜索城市'
        }
    },
    methods: {

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
