<template>
    <div class="city-list" @scroll.passive="onScroll($event)">
        <div class="bar flex felx-align fixed">
            <i class="iconfont" @click="close">&#xe657;</i>
            <div class="search" @click="show">
                <search-bar :prompt='prompt'/>
            </div>
        </div>

        <div class="list">
            <div class="node-letter" v-if='scrollTop!=0'>{{nodeLetter}}</div>
            <div class="item" ref='domItem' v-for='item in cityData'>
                <div class="letter">{{item.code}}</div>
                <div class="city" v-for='city in item.cityList'>
                    {{city}}
                </div>
            </div>
            <div class="letter-list" :class="{shade:addClass}">
                <div class="index-letter" @touchstart='touchStart($event)' @touchmove="touchMove($event)" @touchend='touchEnd'>
                    <a class="item theme-color" @click="gotoIndex(i)" v-for='(item,i) in cityData'>
                        <b class="index-txt">{{item.code}}</b>
                        <i class="bubble" :class="{show:i == bubbleIsShow}">{{item.code}}</i>
                    </a>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import searchBar from './search/searchBar'
import cityArray from './../lib/js/city.js'

export default {
    name:'city',
    components: {
        searchBar,
    },
    data () {
        return {
            prompt:'请输入城市',
            scrollTop:'',
            cityData:cityArray,
            bubbleIsShow:null,
            nodeLetter:'A',
            addClass:false,
        }
    },
    methods: {
        close(){
            this.$emit('close')
        },
        show(){
            this.$emit('show')
        },
        onScroll(e){
            this.scrollTop = e.target.scrollTop
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
    overflow-x: hidden;
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
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1009;
    width: 1.5rem /* 24/16 */;
    height: 100vh;
    justify-content: center;
    -webkit-box-pack: center;
}

.index-letter{
    font-size: .75rem /* 12/16 */;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-touch-callout: none;
    font-weight: 700;
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
</style>
