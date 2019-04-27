<template>
    <div class="cell">
        <div class="share-cell flex flex-align">
            <div class="details flex flex-align" @click="toDetails">
                <div class="article-cover" v-if='item.cover'>
                    <img :src="item.cover">
                    <van-tag color="#7232dd" mark class="tag">{{item.type}}</van-tag>
                </div>
                <div class="info">
                    <div class="title" v-line-clamp:20="1">{{item.title}}</div>
                    <div class="content" v-line-clamp:20="1"> 
                        {{details}}
                    </div>
                </div>
            </div>
            <!-- <div class="punches theme-color" v-if='item.type=="图书"'>
                累计30本
            </div> -->
        </div>
    </div>
</template>
<script>
import { checkHtml,formatTime } from './../../lib/js/util'

export default {
    name:'article-card',
    props: ['item','detailsId'],
    computed: {
        details(){
            return checkHtml(this.item.details)?this.item.details.replace(/<[^>]+>/g,""):this.item.details
        }
    },
    methods: {
        toDetails(){
            let routerName = this.item.type == '图书'?'book-details':'article'
            this.$emit('toDetails',{routeName:routerName,detailsId:this.detailsId})
        }
    }
}
</script>
<style scoped>
.article-cover{
    width: 45px;
    height: 45px;
    background: #fff;
    position: relative;
}

.article-cover img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #fff;
}

.tag{
    position: absolute;
    left: 0;
    bottom: 0;
}

.article-card{
    background: #f8f8f8;
}

.content{
    color: #909399;
    font-size: 12px;
}

.title{
    font-size: 14px;
}

.info{
   flex: 1;
   padding-left: 10px;
}

.details{
    flex: 3;
}

.cell{
    background: #F2F6FC;
}

.punches{
    padding-right: 10px;
    margin-left: 10px;
    font-size: 12px;
    flex: 1;
    text-align: right;
}

.share-cell{
    justify-content: space-between;
}
</style>
