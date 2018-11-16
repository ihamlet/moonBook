<template>
    <div class="list-page">
        <div class="search-nav-bar">
            <form class="form-search flex flex-align" action="#">
                <div class="close" @click="closeList">
                    <i class="iconfont">&#xe657;</i>
                </div>
                <input type="text" class="search-input" v-model="searchContent" @input="getList" :placeholder="placeholder">

                <div class="search-btn">
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
        },
        getList(){

        }
    }
}
</script>
<style scoped>
.search-nav-bar{
    padding: .3125rem /* 5/16 */;
    border-bottom: 1px solid #F2F6FC;
}

.close,
.search-btn{
    flex: 1;
    text-align: center;
}

.close{
    color: #909399;
}

.search-btn{
    background: #409EFF;
    color: #fff;
    border: .0625rem /* 1/16 */ solid #409EFF;
    border-radius:.375rem /* 6/16 */;
}

.search-btn,
input.search-input{
    height: 2.25rem /* 36/16 */;
    line-height: 2.25rem /* 36/16 */;
}

input.search-input{
    flex: 5;
    background: #fff;
    border: none;
    border-radius: .375rem /* 6/16 */;
    padding-left: 1.25rem /* 20/16 */;
    padding-right: .3125rem /* 5/16 */;
    border: 1px solid #E4E7ED;
    margin-right: .3125rem /* 5/16 */;
}
</style>
