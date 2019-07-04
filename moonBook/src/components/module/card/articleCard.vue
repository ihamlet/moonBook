<template>
    <div class="book-card">
        <div class="grade-card" v-if='cardStyle=="article"'>
            <div class="type-book flipInX animated"  v-if='item.type == "book"'  @click="toReadStat">
                <div class="content">
                    <div class="book-sign">
                        <div class="book-name" v-line-clamp:20="1">本次打卡 {{item.tushu_id == 0?'':`《${item.title}》`}}</div>
                        <div class="flex flex-align">
                            <div class="item-data" v-if='item.sign_days'>
                                <div class="sign-title">打卡天数</div>
                                <div class="number">{{item.sign_days}}</div>
                            </div>
                            <div class="item-data" v-if='item.sign_read_count'>
                                <div class="sign-title">打卡本数</div>
                                <div class="number">{{item.sign_read_count}}</div>
                            </div>
                            
                            <van-button plain size="small" round class="theme-plain" type="primary">查看成绩</van-button>
                        </div>
                    </div>
                    <i class="iconfont">&#xe66d;</i>
                </div>
                <div class="bg"></div>
                <Round/>
            </div>
            <div class="article-share" v-else-if='flag' @click="toDetails">
                <media type='card' :item='article' :key="detailsId" :stopClick='true' :isDetailsShow='textShow'/>
                <div class="info-bar flex flex-align" v-if='article'>
                    <div class="date">{{getTimeAgo(article.create_time)}}</div>
                    <div class="author">来自:{{username}}</div>
                </div>
            </div>
        </div>
        <div class="cell" v-else>
            <div class="share-cell flex flex-align">
                <div class="details flex flex-align">
                    <div class="info" @click="toDetails" v-if='detailsId&&detailsId > 0'>
                        <div class="theme-color" v-line-clamp:20="1">{{item.post_id?item.title:`《${item.title}》`}} </div>
                    </div>
                    <div class='punches theme-color' @click="toReadStat" v-if='item.type == "book"'>
                        {{item.sign_read_count > 0?`累计${item.sign_read_count}本`:''}}
                    </div>
                    <div class="include" v-else>
                        收录
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import { timeago } from './../../lib/js/util'
import { checkHtml } from './../../lib/js/util'
import { mapGetters } from 'vuex'
import media from './../mold/media'
import Round from './../../module/animate/round'

export default {
    name:'article-card',
    props: ['item','detailsId','type','childId','cardStyle'],
    components: {
      Round,
      media
    },
    computed: {
        ...mapGetters(['userDataState']),
        details(){
            return checkHtml(this.item.details)?this.item.details.replace(/<[^>]+>/g,""):this.item.details
        }
    },
    data () {
        return {
            article:{},
            username:'',
            flag: false,
            textShow: true
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData'
    },
    methods: {
        fetchData(){
            if(this.type == "post"){
                let articleDetailData = {
                    params:{
                        ajax:1,
                        id: this.detailsId
                    }
                }

                axios.get('/book/SchoolArticle/detail',articleDetailData).then(res => {
                    if(res.data.status == 1){
                        this.flag = true
                        this.article = res.data.data.post
                        res.data.data.post.template_id == 1? this.textShow = true : this.textShow = false
                        this.username = res.data.data.post.user.username
                    }
                })
            }
        },
        toDetails(){
            let routerName = this.item.type == 'book'?'book-details':'article'
            this.$emit('toDetails',{routeName:routerName,detailsId:this.detailsId})
        },
        toReadStat(){
            this.$router.push({
                name:'readStat',
                query:{
                   id: this.childId
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

.info,
.title{
    font-size: 14px;
}

.info{
   flex: 3;
   padding-left: 10px;
}

.details{
    flex: 5;
}

.article-share,
.cell{
    background: #F2F6FC;
}

.article-share{
    padding:10px 15px;
    border-radius: 8px;
}

.info,
.cell{
    height: 32px;
    line-height: 32px;
}

.punches{
    padding-right: 10px;
    flex: 1;
    text-align: right;
    font-size: 13px;
}

.share-cell{
    justify-content: space-between;
}

.type-book{
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    height: 100px;
    width: 100%;
}

.bg{
    background: linear-gradient(135deg,rgba(0, 142, 255, 0.8), rgba(33, 150, 243, 0.2));
    z-index: 1;
}

.content{
    color: #fff;
    z-index: 2;
    position: relative;
}

.content,
.bg{
    height: 100%;
    width: 100%;
}

.content,
.bg{
   position: absolute;
}

.book-sign{
    padding:0 20px;
    height: 100%;
}

.content i.iconfont{
    position: absolute;
    right: 5%;
    bottom: 40px;
    font-size: 100px;
    z-index: 1;
    opacity: .2;
    transform:rotate(30deg)
}

.item-data{
    text-align: center;
    margin-right: 10px;
}

.book-name{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
}

.number{
    font-size: 24px;
}

.theme-plain{
    position: absolute;
    right: 20px;
    top: 50%
}

.sign-title{
    margin-bottom: 5px;
}

.include{
    padding-right: 10px;
    color: #C0C4CC;
}

.info-bar{
    justify-content: space-between;
    color: #C0C4CC;
}
</style>
<style>
.video-wrapper{
    position: relative;
}

.video-play_btn{
    width: 50px;
    height: 50px;
    position: absolute;
    background: #000;
    display: block;
}
</style>
