<template>
    <div class="home page-padding">
        <div class="head-bar flex flex-align" :class="[themeBarSearch?'theme-background':'default-head-bar-background']">
            <div class="left-btn" @click="toCityList">
                {{userCityState}}
            </div>
            <div class="search-bar"> <i class="iconfont">&#xe65c;</i> {{searchText}}</div>
            <div class="right-btn" @click="release">
                <i class="iconfont" :class="[isReleaseShow?'rotate-45':'rotate']">&#xe612;</i>
                <span>发布</span>
            </div>

            <div class="release-popup" v-if='isReleaseShow'>
                <release :isReleaseShow="isReleaseShow" @close='closeRelease' @open='releasePage' @param='releaseParam'/>
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

        <div class="apply" v-if='!$store.state.userData.vipInfo'>
            <van-button class="theme-btn" :class="[btnPulse?'rubberBand animated second':'']" round size="normal" type="primary" @click="toAccept"> 
                <i class="iconfont">&#xe619;</i>  
                办理借阅卡
            </van-button>
        </div>

        <!-- 发布 -->
        <van-popup v-model="releasePageShow" class="page-popup" position="bottom" :overlay="false">
            <graphic v-if="Param=='graphic'" @close='closeReleasePage'/>
        </van-popup>

        <!-- 借阅卡办理页面 -->
        <van-popup v-model="applyShow" class="page-popup" position="bottom" :overlay="false">
            <accept @close='onAccpetPage' v-model='active'/>
        </van-popup>

        <!-- 城市列表 -->
        <van-popup v-model="cityListShow" class="page-popup" position="right" :overlay="false">
            <city-list @close='onCityListPage'/>
        </van-popup>

        <footer-bar :pageIndex='pageIndex'/>
    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

import axios from 'axios'

import appsList from './../module/apps'
import investmentAd from './../module/investment'
import newsList from './../module/news'
import videoList from './../module/video'
import courseList from './../module/course'

import accept from './../module/accept'

import release from './../module/mold/release'
import graphic from './../module/release/graphic'

import cityList from './../module/cityList'

import footerBar from './../module/footerBar'

export default {
    name:'home',
    components: {
        appsList,
        investmentAd,
        newsList,
        videoList,
        courseList,
        cityList,
        accept,
        release,
        graphic,
        footerBar
    },
    computed: {
        ...mapGetters(['userCityState'])
    },
    data () {
        return {
            // 发布
            Param:'',
            isReleaseShow:false,
            releasePageShow:false,
            cityListShow:false,
            active:0,
            applyShow:false,
            pageIndex:0,
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
            videoList:''
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
        fetchData(){
            setInterval(()=>{
                this.btnPulse = true
            },3000)

            axios.get('/api/home').then(res=>{
                this.banner = res.data.homeData.banner
                this.appsList = res.data.homeData.apps
                this.investmentAd = res.data.homeData.investmentAd
                this.newsList = res.data.homeData.newsList
                this.videoList = res.data.homeData.videoList
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
        weChatShare(){
            console.log('调用微信分享接口')
        },
        release(){
            this.isReleaseShow = !this.isReleaseShow
        },
        closeRelease(){
            this.isReleaseShow = false
        },
        releasePage(){
            this.releasePageShow = true
        },
        releaseParam(val){
            this.Param = val
        },
        closeReleasePage(){
            this.releasePageShow = false
        },
        toAccept(){
            this.applyShow = true
            this.active = 0
        },
        onAccpetPage(){
            this.applyShow = false
        },
        toCityList(){
            this.cityListShow = true
        },
        onCityListPage(){
            this.cityListShow = false
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
