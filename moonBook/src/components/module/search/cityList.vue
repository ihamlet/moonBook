<template>
    <div class="list-page">
        <div class="fixed">
            <div class="search-nav-bar">
                <form class="form-search flex flex-align" action="#">
                    <div class="close" @click="closeList">
                        <i class="iconfont">&#xe657;</i>
                    </div>
                    <input type="text" class="search-input" v-model="searchContent" :placeholder="prompt">
                    <i class="iconfont clear" v-if='searchContent.length > 0' @click="clear">&#xe683;</i>
                </form>
            </div>
        </div>

        <div class="list">
            <div class="item" v-for='item in list'>
                <van-cell v-for="(item,index) in list" :key="index" center>
                    <div class="city-name">{{item.name}}</div>
                </van-cell>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:'city-list',
    computed: {
      ...mapGetters(['userPointState'])
    },
    props: ['prompt'],
    data () {
        return {
            searchContent:'',
            list:[]
        }
    },
    watch: {
        searchContent(val){
            let products = {
                keywords: val,
                type: '190102|190103|190104|190105',
                location: this.userPointState.location,
                city: '',
                datatype:'poi'
            }

            this.getSearch(products).then(res=>{
                this.list = res.tips
            })
        }
    },
    methods: {
        ...mapActions(['getSearch']),
        closeList(){
            this.$emit('close')
        },
        clear(){
            this.searchContent=''
        }
    }
}
</script>
<style scoped>
.search-nav-bar{
    padding: .3125rem /* 5/16 */;
    border-bottom: 1px solid #F2F6FC;
    background: #fff;
}

.close,
.search-btn{
    flex: 1;
    text-align: center;
}

.close{
    color: #909399;
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

.fixed{
    position: sticky;
    top: 0;
    z-index: 1001;
    width: 100%;
}
</style>
