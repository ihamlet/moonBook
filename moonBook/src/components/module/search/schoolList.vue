<template>
    <div class="list-page">
        <div class="fixed">
            <div class="search-nav-bar">
                <form class="form-search flex flex-align" action="#">
                    <div class="close" @click="closeList">
                        <i class="iconfont">&#xe683;</i>
                    </div>
                    <input type="text" class="search-input" v-model="searchContent" :placeholder="prompt">
                    <i class="iconfont clear" v-if='searchContent.length > 0' @click="clear">&#xe683;</i>
                </form>
            </div>
        </div>

        <div class="list">
            <div class="item" v-for='(item,index) in list' :key="index" @click="selectSchool(item)">
                <van-cell is-link center>
                    <div class="school-name" v-line-clamp:20="1">{{item.name}}</div>
                    <div class="school-address" v-line-clamp:20="1">
                        <span v-if='item.address.length!=0'>{{item.address}}</span>
                    </div>
                </van-cell>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:'school-list',
    computed: {
      ...mapGetters(['userPointState'])
    },
    props: ['prompt','type'],
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
                type: 141204,
                location: this.userPointState.location,
                city: this.userPointState.city,
                datatype:'poi',
                searchType:this.type
            }
            this.getSearch(products).then(res=>{
                if(res.searchType == 'joinSchool'){
                    let nweArray = []
                    res.resData.data.forEach(element => {
                        nweArray.push({
                            name: element.title,
                            address: element.addr,
                            shelf_id: element.shelf_id
                        })
                    })

                    this.list = nweArray
                }else{
                    this.list = res.tips
                }
            })
        }
    },
    methods: {
        ...mapActions(['getSearch']),
        closeList(){
            this.$emit('close', false)
        },
        clear(){
            this.searchContent=''
        },
        selectSchool(item){
            this.$emit('select',item)
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
