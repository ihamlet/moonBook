<template>
    <div class="search">
        <div class="search-bar" @click="isListShow">
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
            placeholder:'请输入幼儿园名称/拼音'
        }
    },
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
