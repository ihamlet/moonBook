<template>
    <div class="search">
        <div class="search-bar" @click="isListShow">
            <i class="iconfont">&#xe65c;</i>
            {{placeholder}}
        </div>

        <div class="list-page" v-if='show'>
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
    </div>    
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name:'search',
    data () {
        return {
            show:false,
            searchContent:'',
            placeholder:'请输入幼儿园名称/拼音'
        }
    },
    methods: {
        isListShow(){
            this.show = true
        },
        closeList(){
            this.show = false
        },
        getList(){
            
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

.list-page{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background: #fff;
}

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
}

input.search-input::-webkit-input-placeholder{
    font-size: .75rem /* 12/16 */;
}

</style>
