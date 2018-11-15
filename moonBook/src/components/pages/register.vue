<template>
    <div class="register" @touchstart='listTouchstart' @touchmove='listTouchmove'>
        <div :class="takeUp?'fixed':''">
            <search-school v-if='takeUp'/>
        </div>
        <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container" ref='listContainer'>
            <div class="school" v-if='active==0'>
                <div class="search-module">
                    <search-school v-if='!takeUp'/>
                </div>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell v-for="(item,index) in list" :key="index" is-link center>
                        <div class="school-name">{{item.name}}</div>
                        <div class="school-address" v-line-clamp:20="1">{{item.address.replace(/^(.+?)市/,'')}}</div>
                    </van-cell>
                </van-list>
            </div>
            <div class="identity" v-else>
                <van-cell-group>
                    <div class="form-title">您的身份？</div>
                    <van-cell title="我是家长" is-link />
                    <van-cell title="我是老师" is-link />
                    <van-cell title="我是园长" is-link />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import searchSchool from './../module/search/searchSchool'

export default {
    name:'register',
    components: {
        searchSchool
    },
    data () {
        return {
            active:0,
            num:0,
            list: [],
            loading: false,
            takeUp: false,
            finished: false,
            startX:'',
            startY:''
        }
    },
    created () {
      console.log(this.$route.query)  
    },
    methods: {
        ...mapActions(['getSchoolList']),
        onLoad() {
            this.num++
            let products = {
                city: this.$route.query.city,
                num: this.num,
                x:this.$route.query.x,
                y:this.$route.query.y
            }
            this.getSchoolList(products).then(res=>{
                this.list = this.list.concat(res.results) 
                this.loading = false
                if (this.list.length >= res.total) {
                    this.finished = true
                }
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        listTouchstart(e){
            this.startX = e.touches[0].pageX
            this.startY = e.touches[0].pageY
        },
        listTouchmove(e){
            let moveEndX = e.changedTouches[0].pageX
            let moveEndY = e.changedTouches[0].pageY
            let X = moveEndX - this.startX
            let Y = moveEndY - this.startY
            if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
                this.takeUp = false //向下
            }
            else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
                this.takeUp = true //向上
            }
        }
    }
}
</script>
<style scoped>
.container{
    padding-top: 2.875rem /* 46/16 */;
}

.register{
    padding-bottom: 5.5rem /* 88/16 */;
}

.school-name{
    font-size: 1rem /* 16/16 */;
    color: #303133;
}

.school-address{
    width: 18.75rem /* 300/16 */;
    color: #909399;
}

.fixed{
    position: fixed;
    top: 2.875rem /* 46/16 */;
    z-index: 10;
    width: 100%;
}

.search-module{
    width: 100%;
    height: 2.75rem /* 44/16 */;
}

</style>
