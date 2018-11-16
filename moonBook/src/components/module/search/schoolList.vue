<template>
    <div class="list-page">
        <div class="search-nav-bar">
            <form class="form-search flex flex-align" action="#">
                <div class="close" @click="closeList">
                    <i class="iconfont">&#xe657;</i>
                </div>
                <input type="text" class="search-input" v-model="searchContent" @input="getList" :placeholder="placeholder">

                <div class="search-btn theme-color">
                    搜索
                </div>
            </form>
        </div>
        <div class="list">
            <div class="item"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'school-list',
    data () {
        return {
            searchContent:'',
            placeholder:'请输入幼儿园名称/拼音'
        }
    },
    methods: {
        closeList(){
            this.$emit('close', false)
        }
    }
}
</script>
<style scoped>
.search-nav-bar{
    padding: .3125rem /* 5/16 */ 0;
    background: #ddd;
}

.close,
.search-btn{
    flex: 1;
    text-align: center;
}

input.search-input{
    flex: 5;
    height: 2.25rem /* 36/16 */;
    background: #fff;
    border: none;
    border-radius: .375rem /* 6/16 */;
    padding: 0 1.25rem /* 20/16 */;
    line-height: 2.25rem /* 36/16 */;
}

input.search-input::-webkit-input-placeholder{
    font-size: .75rem /* 12/16 */;
}
</style>
