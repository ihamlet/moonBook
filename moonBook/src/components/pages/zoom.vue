<template>
    <div class="zoom-home page-padding">
        <van-nav-bar :title="title" fixed left-text="个人中心"  left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <div slot="right" class="theme-color">
                <i class="iconfont" :class="[isReleaseShow?'rotate-45':'rotate']">&#xe612;</i>
                <span>发布</span>

                <div class="release-popup" v-if='isReleaseShow'>
                    <release :isReleaseShow="isReleaseShow" @close='closeRelease' @open='releasePage' @param='releaseParam'/>
                </div>
            </div>
        </van-nav-bar>
        <div class="container">
            <lazy-component class="module">
                <div class="user-card flex flex-align" ref='userCrad'>
                    <div class="info">
                        <div class="avatar">
                            <img :src="userData.userInfo.avatar" :alt="userData.userInfo.name" />
                        </div>
                        <div class="name">
                            {{userData.userInfo.name}}
                        </div>
                    </div>

                    <div class="social flex flex-align">
                        <div class="data-box">
                            <div class="number">{{ release }}</div>
                            <div class="text">发布</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ userData.social.fans }}</div>
                            <div class="text">粉丝</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ userData.social.follow }}</div>
                            <div class="text">关注</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ praise }}</div>
                            <div class="text">获赞</div>
                        </div>
                    </div>
                </div>
            </lazy-component>

            <van-cell-group v-if='userData.vipInfo'>
                <van-cell title="幼儿园" :value='userData.vipInfo.school.schoolName.name' is-link/>
            </van-cell-group>

            <lazy-component>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <div class="list">
                        <div class="item" v-for="(item,index) in list" :key="index">
                            <van-cell>
                                <graphic-crad :item='item' v-if='item'/>
                            </van-cell>
                        </div> 
                    </div>
                </van-list>
            </lazy-component>
        </div>
        
        <!-- 发布 -->
        <van-popup v-model="releasePageShow" class="page-popup" position="bottom" :overlay="false">
            <graphic v-if="Param=='graphic'" @close='closeReleasePage'/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { sum } from './../lib/js/util.js'

import release from './../module/mold/release'
import graphic from './../module/release/graphic'
import graphicCrad from './../module/list/graphicCrad'

export default {
    name:'zoom',
    components: {
        release,
        graphic,
        graphicCrad
    },
    computed: {
        userData(){
            return this.$store.getters.userDataState
        },
        praise(){
            return sum(this.$store.getters.userPraiseState)
        },
        release(){
            return this.$store.getters.dryingListLengthState
        }
    },
    data () {
        return {
            // 发布
            Param:'',
            isReleaseShow:false,
            releasePageShow:false,
            // ----
            title:'个人空间',
            list: [],
            domHeight:0,
            scrollTop:0,
            fixedHeaderBar: true,
            loading: false,
            finished: false,
            Param:''
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.isReleaseShow = !this.isReleaseShow
        },
        handleScroll(){
            this.getDomHeight()  
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scrollTop = scrollTop
            
            if( this.domHeight < this.scrollTop){
               this.fixedHeaderBar = false
            }else{
               this.fixedHeaderBar = true
            }
        },
        getDomHeight(){
            if(this.$refs.userCrad){
                this.domHeight = this.$refs.userCrad.offsetHeight/2
            }
        },
        onLoad() {
            axios.get('/api/userData').then(res=>{
                setTimeout(() => {
                    let array = res.data.userData.dryingList
                    let length = this.release < 10 ? 1 : 5
                    for (let i = 0; i < length; i++) {
                        this.list.push( array[this.list.length] )
                    }
                    this.loading = false
                    if (this.list.length >= this.release) {
                        this.finished = true;
                    }
                },500)
            })
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
        }
    }
}
</script>
<style scoped>
.container{
    margin-top: 2.875rem /* 46/16 */;
}

.zoom-home{
    position: relative;
}

.info{
    display: inline-grid;
    text-align: center;
}

.avatar img{
    width: 3.75rem /* 60/16 */;
    height: 3.75rem /* 60/16 */;
    border-radius: 50%;
}

.info{
    padding: .625rem /* 10/16 */ 0;
    flex: 1;
}

.social{
    flex: 3;
    padding: 0 .625rem /* 10/16 */;
}

.name{
    color: #303133;
    margin-top: .3125rem /* 5/16 */;
}

.data-box{
    display: inline-grid;
    flex: 1;
}

.data-box .number{
    font-size: 1.5rem /* 24/16 */;
    color: #303133;
}

.release-popup{
    line-height: normal;
}

.item{
    margin-bottom: .3125rem /* 5/16 */;
}
</style>
