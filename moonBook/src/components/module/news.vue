<template>
    <div class="news">
        <van-cell-group>
        <div class="list">
            <div class="item" v-for='(item,index) in newsList' :key="index" @click="toArticle(item)">
                
                    <van-cell>
                        <van-row gutter="10">
                            <van-col span="10">
                                <div class="cover">
                                    <img class="lazy" v-lazy='item.cover' :alt="item.title" />
                                </div>
                            </van-col>
                            <van-col span="14">
                                <div v-line-clamp:20="2" class="title">{{item.title}}</div>
                                <div class="info">
                                    <div class="flex flex-align">
                                        <div v-line-clamp:20="1" class="name">发布:{{item.name}}</div>
                                        <div v-line-clamp:20="1"  class="school" v-if='item.school_id!="0"'>{{item.school}}</div>
                                    </div>
                                    <div class="foot-bar-left">
                                        <div class="time">{{getTimeAgo(item.create_time)}}</div>
                                    </div>
                                    <div class="foot-bar-right watch">
                                        <i class="iconfont">&#xe610;</i>
                                        {{item.watch>1000?'999+':item.watch}}
                                    </div>
                                </div> 
                            </van-col>
                        </van-row>
                    </van-cell>
               
            </div>
        </div>
         </van-cell-group>
    </div>    
</template>
<script>
import { timeago } from './../lib/js/util'

export default {
    name:'news',
    props: ['newsList'],
    methods: {
        toArticle(article){
            this.$router.push({
                name:'article',
                query:{
                    id: article.id,
                    back: this.$route.name
                }
            })
        },
        getTimeAgo(time){
            return timeago(time*1000)
        }
    }
}
</script>
<style scoped>
.name{
    flex: 2
}

.school{
    flex: 3;
}

.type{
    color: #C0C4CC;
}

.news-item{
    position: relative;
    width: 100%;
    overflow: hidden;
}

.watch{
    position: absolute;
    right: .625rem /* 10/16 */;
}
</style>

