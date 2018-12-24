<template>
    <div class="home page-padding">
        <div class="head-bar flex flex-align" :class="[themeBarSearch?'theme-background':'default-head-bar-background']">
            <div class="left-btn" v-line-clamp:20="1" @click="cityListShow=true">
                <span v-if='userPointState'>{{userPointState.city}}</span>
                <span v-else>定位中</span>
            </div>
            <div class="search-bar"> <i class="iconfont">&#xe65c;</i> {{searchText}}</div>
            <div class="right-btn" @click="releasePageShow = true">
                <i class="iconfont">&#xe612;</i>
                <span>发布</span>
            </div>
        </div>
        <div class="container">
            <div class="swipe-content" ref='swipe'>
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for='(list,index) in banner' :key="index">
                        <a :href="list.link">
                            <img class="banner" :src="list.image" :alt="`banner-1125x549-${index+1}`">
                        </a>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <lazy-component class="card">
                <div class="apps-module module">
                    <apps-list :appsList='appsList'/>
                </div>
            </lazy-component>
            <lazy-component class="card">
                <investment-ad :investmentAd='investmentAd' :isAdshow='isAdshow'/>
            </lazy-component>
            <lazy-component class="module">
                <news-list :newsList='newsList'/>
            </lazy-component>
            <lazy-component class="module">
                <video-list :videoList='videoList'/>
            </lazy-component>
            <lazy-component class="module">
                <course-list/> 
            </lazy-component>
        </div>

        <div class="apply" v-if='userDataState.isVip == 0'>
            <van-button class="theme-btn" :class="[btnPulse?'rubberBand animated second':'']" round size="normal" type="primary" @click="toAccept"> 
                <i class="iconfont">&#xe619;</i>  
                办理借阅卡
            </van-button>
        </div>

        <!-- 发布 -->
        <van-popup v-model="releasePageShow" class="page-popup" position="bottom" get-container='#app'>
            <graphic @close='releasePageShow = false'/>
        </van-popup>

        <!-- 借阅卡办理页面 -->
        <van-popup v-model="applyShow" class="page-popup" position="bottom" get-container='#app'>
            <accept @close='applyShow = false' v-model='active'/>
        </van-popup>

        <!-- 城市列表 -->
        <van-popup v-model="cityListShow" class="page-popup" position="right" get-container='#app'>
            <city @close='cityListShow = false' @show='searchShow=true'/>
        </van-popup>

        <!-- 城市列表搜索 -->
        <van-popup v-model="searchShow" class="page-popup" get-container='#app'>
            <city-list :prompt='prompt' @close="searchShow = false, cityListShow=false"/>
        </van-popup>
    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import axios from './../lib/js/api'

import appsList from './../module/apps'
import investmentAd from './../module/investment'
import newsList from './../module/news'
import videoList from './../module/video'
import courseList from './../module/course'

import accept from './../module/accept'

import graphic from './../module/release/graphic'

import city from './../module/city'
import cityList from './../module/search/cityList'

export default {
    name:'home',
    components: {
        appsList,
        investmentAd,
        newsList,
        videoList,
        courseList,
        city,
        cityList,
        accept,
        graphic
    },
    computed: {
        ...mapGetters(['userPointState','userDataState'])
    },
    data () {
        return {
            // 发布
            Param:'',
            cityListShow:false,
            releasePageShow:false,
            searchShow:false,
            prompt:'搜索城市名/拼音',
            active:0,
            applyShow:false,
            btnPulse:false,
            themeBarSearch:false,
            isAdshow: true,
            scrollTop:'',
            domHeight:'',
            searchText:'搜索图书/幼儿园/文章',
            banner:'',
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
            },3000)

            axios.get('/book/index/home_v2').then(res=>{
                this.banner = res.data.homeData.banner
                // this.appsList = res.data.homeData.apps
                this.investmentAd = res.data.homeData.investmentAd
                this.newsList = res.data.homeData.newsList
                this.videoList = res.data.homeData.videoList
            })

            axios.get('/book/memberUser/getInfo').then(res => {
                this.isVip = res.data.isVip
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
            this.applyShow = true
            this.active = 0
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
</style>
