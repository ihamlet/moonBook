<template>
    <div class="home page-padding">
        <div class="head-bar flex flex-align" :class="[themeBarSearch?'theme-background':'default-head-bar-background']">
            <div class="left-btn" v-line-clamp:20="1" @click="toCity">
                <span v-if='userPointState'>{{userPointState.city}}</span>
                <span v-else>定位中</span>
            </div>
            <div class="search-bar" @click="toSearch"> <i class="iconfont">&#xe65c;</i> {{searchText}}</div>
            <div class="right-btn">
                <span class="notice-badge">
                    <i class="iconfont" @click="toNotice">{{MsgLengthState>0?'&#xe623;':'&#xe798;'}}</i>
                    <b class="read-dot" v-if='MsgLengthState > 0'></b>
                </span>
                <!-- <i class="iconfont">{{msg>0?'&#xe623;':'&#xe798;'}}</i> -->
                <!-- <span>发布</span> -->
            </div>
        </div>
        <div class="container">
            <div class="swipe-content" ref='swipe'>
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for='(list,index) in banner' :key="index">
                        <a :href="list.link">
                            <img class="banner" :src="list.image" :alt="list.title">
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="card">
                <div class="apps-module module">
                    <apps-list :appsList='appsList'/>
                </div>
            </div>
            <div class="card-top">
                <investment-ad :investmentAd='investmentAd' :isAdshow='isAdshow'/>
            </div>
            <div class="module">
                <news-list :newsList='newsList'/>
            </div>
            <div class="module">
                <video-list title='视频精选' type='home'/>
            </div>
            <div>
                <article-list/>
            </div>
        </div>

        <div class="apply" v-if='userDataState.card_level == "0"'>
            <van-button class="theme-btn" :class="[btnPulse?'rubberBand animated second':'']" round size="normal" type="primary" @click="toAccept"> 
                <i class="iconfont">&#xe619;</i>  
                办理借阅卡
            </van-button>
        </div>

        
        <!-- 礼品弹窗 -->
        <!-- <van-popup v-model="show" position="top" class="gift-popup">
            <div class='card-line'></div>
            <div class="gift-card">
                <div class="round"></div>
            </div>
        </van-popup> -->

    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import axios from './../lib/js/api'

import appsList from './../module/apps'
import investmentAd from './../module/investment'
import newsList from './../module/news'
import videoList from './../module/video'
import articleList from './../module/articleList'

import tips from './../module/release/tips'

export default {
    name:'home',
    components: {
        appsList,
        investmentAd,
        newsList,
        videoList,
        articleList,
        tips
    },
    computed: {
        ...mapGetters(['userPointState','userDataState','MsgLengthState'])
    },
    data () {
        return {
            percentVal:0,
            tipsShow:false,
            cityListShow:false,
            searchShow:false,
            prompt:'搜索城市名/拼音',
            active:0,
            applyShow:false,
            btnPulse:false,
            themeBarSearch:false,
            isAdshow: true,
            show: false,
            scrollTop:'',
            domHeight:'',
            searchText:'搜索图书/幼儿园/文章',
            banner:[],
            appsList:'',
            investmentAd:'',
            newsList:'',
            videoList:'',
        }
    },
    created () {
        this.getDomHeight()
        this.fetchData()
    }, 
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)   
    },
    watch: {
      '$router':'fetchData'
    },
    methods: {
        ...mapActions(['getCityDistrict']),
        fetchData(){
            setInterval(()=>{
                this.btnPulse = true
                this.show = true
            },3000)

            axios.get('/book/index/home_v2').then(res=>{
                this.banner = res.data.homeData.banner                
                this.investmentAd = res.data.homeData.investmentAd
                this.newsList = this.formatNews(res.data.homeData.newsList)
                this.videoList = res.data.homeData.videoList
            }).then(()=>{
                axios.get('/book/memberUser/getInfo').then(res => {
                    this.isVip = res.data.isVip
                })
            })            
        },
        handleScroll(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = scrollTop
            if(this.scrollTop > this.domHeight){
                this.themeBarSearch = true
            }else{
                this.themeBarSearch = false
            }
        },
        getDomHeight(){
            this.$nextTick(()=>{
                let domHeight = this.$refs.swipe.offsetHeight
                this.domHeight = domHeight
            })
        },
        onStepActiveChange(val){
            this.active = val
        },
        toAccept(){
            this.$router.push({
                name:'AcceptSchoolList'
            })
        },
        toTips(){
           this.tipsShow = !this.tipsShow
           localStorage.setItem('grapicData', '')
        },
        toNotice(){
            this.$router.push({
                name:'notice'
            })
        },
        toCity(){
            this.$router.push({
                name:'city'
            })
        },
        toSearch(){
            this.$router.push({
                name:'search'
            })
        },
        formatNews(news){
            news.forEach((item,key)=>{
                item.watch = item.views
            })
            return news
        }
    }
}
</script>
<style scoped>
.apps-module{
    border-radius: .625rem /* 10/16 */;
    margin-top: -.625rem /* 10/16 */;
    position: relative;
    box-shadow: 0 .125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, .1)
}

span.notice-badge{
  position: relative;
}

b.read-dot{
  position: absolute;
  width: .625rem /* 10/16 */;
  height: .625rem /* 10/16 */;
  background: #f44;
  border-radius: .625rem /* 10/16 */;
  bottom: .9375rem /* 15/16 */;
  right: 0;
}

.gift-popup{
    width: 65%;
    height: 45vh;
    top: 20%;
    border-radius: 4px;
    overflow-y: inherit;
}

.round{
    width: 6px;
    height: 6px;
    background: #000;
    border-radius: 50%;
    margin: 5px auto;
}

.card-line{
    width: 2px;
    height: 30vh;
    position: absolute;
    background: #fff;
    top: -50%;
    left: 50%;
    margin-left: -1px;
    z-index: -1;
}
</style>
<style>
.home .tips-popup.van-popup{
  transform:none;
  background-color: transparent;
  top: 3.75rem /* 60/16 */;
  right: .3125rem /* 5/16 */;
  left: auto;
  overflow-y: initial; 
}
</style>
