<template>
    <div class="city-list" @scroll.passive="onScroll($event)">
        <div class="bar flex felx-align fixed">
            <i class="iconfont" @click="$emit('close')">&#xe657;</i>
            <div class="search" @click="$emit('show')">
                <search-bar :prompt='prompt'/>
            </div>
        </div>
        <div class="new-city" ref='domHeight'>
            <div class="current-city">
                <div class="district">
                    <van-cell-group>
                        <van-cell :title="`当前城市:${userPointState.city}`" is-link :arrow-direction="isSilde?'up':'down'" value="切换区县" @click="silde"/>
                    </van-cell-group>
                    <div class="list" v-show='isSilde'>
                        <div class="item scroll-x">
                            <div class="district-name scroll-item" @click="selectCity(item.name)" v-for='item in cityCounty'>
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-title">定位/最近访问</div>
                <ul class="recent flex wrap">
                    <li class="city-name" @click="selectCity(city)" v-line-clamp:20="1" v-for='city in cityHistory'>
                        {{city}}
                    </li>
                </ul>
            </div>

            <div class="hot-city">
                <div class="form-title">热门城市</div>
                <ul class="flex wrap">
                    <li class="city-name" @click="selectCity(city)" v-for='city in hotCity'>
                        {{city}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <div class="node-letter" v-if='domHeight < scrollTop'>{{nodeLetter}}</div>
            <div class="item" ref='domItem' v-for='(item,index) in cityData' :key='index'>
                <div class="letter">{{item.code}}</div>
                <div class="city" @click="selectCity(city)" v-for='(city,itemIndex) in item.cityList' :key='itemIndex'>
                    {{city}}
                </div>
            </div>
            <div class="letter-list" :class="{shade:addClass}">
                <div class="index-letter" @touchstart='touchStart($event)' @touchmove="touchMove($event)" @touchend='touchEnd'>
                    <div class="item theme-color" @click="gotoIndex(i)" v-for='(item,i) in cityData' :key="i">
                        <b class="index-txt">{{item.code}}</b>
                        <i class="bubble" :class="{show:i == bubbleIsShow}">{{item.code}}</i>
                    </div>
                </div>  
            </div>
        </div> 
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import searchBar from './search/searchBar'
import cityArray from './../lib/js/city.js'

export default {
    name:'city',
    components: {
        searchBar,
    },
    computed: {
        ...mapGetters(['userPointState'])
    },
    data () {
        return {
            prompt:'请输入城市/拼音',
            isSilde:false,
            scrollTop:'',
            cityData:cityArray,
            bubbleIsShow:null,
            nodeLetter:'A',
            addClass:false,
            hotCity:[],
            domHeight:'',
            cityHistory:[],
            cityCounty:[]
        }
    },
    created () {   
        this.cityHistory.unshift(this.userPointState.city)

        if(localStorage.getItem('cityHistory')){
            let array = this.cityHistory.concat(localStorage.getItem('cityHistory').split(','))
            this.cityHistory = [...new Set(array)]
        }    

        this.fetchData()
    },
    watch: {
      '$router':'fetchData'
    },
    methods: {
        ...mapActions(['getCityDistrict']),
        fetchData(){
            axios.get('/api/hotCity').then(res=>{
                this.hotCity = res.data.hotCity
            })
        },
        onScroll(e){
            this.scrollTop = e.target.scrollTop
            this.domHeight = this.$refs.domHeight.offsetHeight
            this.$refs.domItem.forEach((event,i)=>{
                if(e.target.scrollTop >= event.offsetTop){
                    this.nodeLetter = this.cityData[i].code
                }
            })
        },
        gotoIndex(i){
            this.$refs.domItem[i].scrollIntoView()
            this.bubbleIsShow = i
        },
        touchStart(event){
            event.preventDefault()
            this.addClass = true
        },
        touchMove(event){
            event.preventDefault()
            let dom = document.elementFromPoint(event.touches[0].clientX,event.touches[0].clientY);
            if(dom){
                dom.click()
            }
        },
        touchEnd(){
            this.addClass = false
            this.bubbleIsShow = null
        },
        selectCity(city){
            this.cityHistory.push(city)
            let products = {
                city:city
            }
            this.getCityDistrict(products)
            this.cityHistory = [...new Set(this.cityHistory)]
            localStorage.setItem('cityHistory', this.cityHistory)
            this.$emit('close')
        },
        silde(){
            if(this.userPointState){
                let products = {
                    city:this.userPointState.city
                }
                this.getCityDistrict(products).then(res=>{
                    if(res.districts){
                        this.cityCounty = res.districts[0].districts
                    }
                })
            }
            this.isSilde = !this.isSilde
        }
    }
}
</script>
<style scoped>
.fixed{
    position: sticky;
    top: 0;
    z-index: 1001;
    width: 100%;
}

.city-list{
    position: static;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

.bar{
    width: 100%;
    background: #ddd;
    line-height: 2.75rem /* 44/16 */;
}

.bar i.iconfont{
    flex: 1;
    text-align: center;
}

.bar .search{
    flex: 9;
}

.node-letter,
.letter{
    padding-left: .625rem /* 10/16 */;
    height: 1.25rem /* 20/16 */;
    background: #E4E7ED;
}

.node-letter{
    position: sticky;
    top: 2.75rem /* 44/16 */;
}

.city{
    height: 2.875rem /* 46/16 */;
    padding-left: .625rem /* 10/16 */;
    line-height: 2.875rem /* 46/16 */;
    border-bottom: .0625rem /* 1/16 */ solid #EBEEF5;
}

.page-popup{
    position: sticky;
}

.letter-list{
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1009;
    width: 1.5rem /* 24/16 */;
    height: 100vh;
}

.index-letter{
    font-size: .75rem /* 12/16 */;
    -webkit-touch-callout: none;
    user-select: none;
    top: 50%;
    right: 0;
    position: absolute;
    transform: translate3d(0, -50%, 0);
    text-align: center;
    width: 1.25rem /* 20/16 */;
}

.letter-list.shade{
    width: 100%;
}

.letter-list.shade .index-letter{
    width: 100%;
}

.index-letter .item{
    display: block;
    height: 1.5rem /* 24/16 */;
    line-height: 1.5rem /* 24/16 */;
    position: relative;
}

b.index-txt{
    width: 1.5rem /* 24/16 */;
    height: 1.5rem /* 24/16 */;
    display: block;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
}

i.bubble{
    position: absolute;
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    text-align: center;
    line-height: 3.125rem /* 50/16 */;
    right: 3.75rem /* 60/16 */;
    top: 50%;
    margin-top: -1.5625rem /* 25/16 */;
    display: block;
    background: #333;
    color: #fff;
    border-radius: 50%;
    display: none;
    font-size: 1.5rem /* 24/16 */;
    font-style: normal;
    font-weight: 200;
}

i.bubble::before{
    content: '';
    width: 0;
    height: 0;
    border-top: 1.25rem /* 20/16 */ solid transparent;
    border-left: 1.25rem /* 20/16 */ solid #333;
    border-bottom: 1.25rem /* 20/16 */ solid transparent;
    position: absolute;
    left: 2.25rem /* 36/16 */;
    top: 50%;
    margin-top: -1.25rem /* 20/16 */;
}

i.bubble.show{
    display: block;
}

.hot-city{
    padding-bottom: .625rem /* 10/16 */;
}

.district{
    background: #fff;
}

.district .list{
    padding-right: 1.5rem /* 24/16 */;
}

.district .item{
    padding-top: .625rem /* 10/16 */;
}

.district-name,
.city-name{
    font-size: .8125rem /* 13/16 */;
}


.district-name{
    padding: .3125rem /* 5/16 */ .625rem /* 10/16 */;
    margin-left: .625rem /* 10/16 */;
    margin-bottom: .625rem /* 10/16 */;
    border: .0625rem /* 1/16 */ solid #ededed;
    white-space: nowrap;
}

.city-name{
    width: 3.75rem /* 60/16 */;
    text-align: center;
    background: #fff;
    height: 2rem /* 32/16 */;
    line-height: 2rem /* 32/16 */;
    margin-left: .625rem /* 10/16 */;
    margin-bottom: .625rem /* 10/16 */;
    padding: 0 1.5625rem /* 25/16 */;
}

.current-city .city-name,
.hot-city ul li.city-name{
    border-radius: .125rem /* 2/16 */;
}

.new-city{
    background: #f2f2f2;   
}

ul.recent li:first-child{
    position: relative;
}

ul.recent li:first-child::before{
    content: '\e648';
    position: absolute;
    /* iconfont */
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    left: .625rem /* 10/16 */;
    color: #409eff;
}
</style>
