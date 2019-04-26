<template>
    <van-cell class="article-card" :border='false' is-link center @click="toDetails">
        <div class="flex flex-align">
            <div class="article-cover">
                <img v-if='item.cover' :src="item.cover">
                <van-tag color="#7232dd" mark class="tag">{{item.type}}</van-tag>
            </div>
            <div class="details">
                <div class="title" v-line-clamp:20="1">{{item.title}}</div>
                <div class="content" v-line-clamp:20="1"> 
                    {{details}}
                </div>
            </div>
        </div>   
    </van-cell>
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
    width: 60px;
    height: 60px;
    background: #fff;
    margin-right: 10px;
    position: relative;
}

.article-cover img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tag{
    position: absolute;
    left: 0;
    bottom: 0;
}

.article-card{
    background: #f8f8f8;
}

.details{
    flex: 1;
}

.content{
    color: #909399;
}
</style>
