<template>
    <div class="zoom page-padding">
        <van-nav-bar :title="fixedHeaderBar?$route.meta.title:userDataState.userInfo.name" fixed left-text="个人中心" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <div slot="right" class="theme-color">
                <i class="iconfont">&#xe612;</i>
            </div>
        </van-nav-bar>
        <div class="container">
            <lazy-component class="module">
                <div class="user-card flex flex-align" ref='userCrad'>
                    <div class="info">
                        <div class="avatar">
                            <img :src="userDataState.userInfo.avatar" :alt="userDataState.userInfo.name" />
                        </div>
                        <div class="name">
                            {{userDataState.userInfo.name}}
                        </div>
                    </div>
                    <div class="social flex flex-align">
                        <div class="data-box">
                            <div class="number">{{ release }}</div>
                            <div class="text">发布</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ userDataState.social.fans }}</div>
                            <div class="text">粉丝</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ userDataState.social.follow }}</div>
                            <div class="text">关注</div>
                        </div>
                        <div class="data-box">
                            <div class="number">{{ praise }}</div>
                            <div class="text">获赞</div>
                        </div>
                    </div>
                </div>
                <van-cell-group v-if='userDataState.regInfo'>
                    <van-cell title="孩子所在学校" :value='userDataState.regInfo.school' is-link/>
                </van-cell-group>
                <van-cell-group v-if='userDataState.vipInfo&&!userDataState.regInfo'>
                    <van-cell title="孩子所在学校" :value='userDataState.vipInfo.school.schoolName.name' is-link/>
                </van-cell-group>
            </lazy-component>

            <lazy-component>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <div class="list">
                        <div class="item" v-for="(item,index) in list" :key="index">
                            <van-cell>
                                <graphic-crad :item='item'/>
                            </van-cell>
                        </div> 
                    </div> 
                </van-list>
            </lazy-component>
        </div>
    
        <slogan v-if='finished'/>
        <!-- 发布 -->
        <van-popup v-model="releasePageShow" class="page-popup" position="bottom" :overlay="false">
            <graphic @close='releasePageShow = false'/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { sum } from './../lib/js/util.js'
import { mapGetters } from 'vuex'
import graphic from './../module/release/graphic'
import graphicCrad from './../module/list/graphicCrad'
import slogan from './../module/slogan'

export default {
    name:'zoom',
    components: {
        graphic,
        graphicCrad,
        slogan
    },
    computed: {
        ...mapGetters(['userDataState']),
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
            releasePageShow:false,
            // ----
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
            this.releasePageShow = true
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
    position: relative;
}
</style>
