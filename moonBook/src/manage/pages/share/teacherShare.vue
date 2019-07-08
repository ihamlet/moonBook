<template>
    <div class="teacher-share">
        <div class="bg-header">
            <div class="player-icon">
                <i class="iconfont turn" v-if='playing' @click="pause">&#xe679;</i>
                <i class="iconfont" v-else @click="play">&#xe67a;</i>
            </div>

            <div class="invitation animated slideInDown">
                <van-notice-bar  background='transparent' color='#303133' :scrollable='false'>
                    邀请您加入{{manageSchoolInfo.school_name}}
                </van-notice-bar>
            </div>

            <div class="invitation-card slideInUp animated">
                <h4 class="title">邀请函</h4>
                <b>尊敬的老师：</b>

                <div class="content" v-html='invitationHTML'></div>

                <div class="loan">
                    <p class="name">阅亮书架</p>
                    <p class="date-time">{{newData}}</p>
                </div>
            </div>

            <img :src="backgroundImg[randomNum]" />
        </div>
        <div class="container">
            <div class="footer-btn flex flex-column">
                <van-button class='btn' type="primary" round @click="shareShow = true">微信分享</van-button>
                <van-button class="btn theme-btn" type="primary" round @click="toTeacherEdit">成员录入</van-button>
            </div>

            <div class="slogan">{{$store.state.slogan}}</div>
        </div>

        <audio :src="bgMusic" @ended='onEnded' autoplay="autoplay" hidden="true" controls="controls" ref='audio'></audio>

        <van-popup v-model="shareShow" get-container='#app' class="share-popup">
            <div class="share-img">
                <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/shareWord.png" />
            </div>
        </van-popup>

    </div>    
</template>
<script>
import { invitation } from './../../../components/lib/js/speech'
import { format } from './../../../components/lib/js/util'
import { mapState, mapGetters, mapActions } from 'vuex'
import qs from 'qs'

export default {
    name:'teacher-share',
    computed: {
      ...mapGetters(['userDataState']),
      ...mapGetters('manage',['manageSchoolInfo']),
      ...mapState('openWX',['ready']),
      item(){
        let data = {
            cate_name: '邀请',
            details:`邀请您加入${this.manageSchoolInfo.school_name}`,
            title: `${this.userDataState.name}邀请您加入${this.manageSchoolInfo.school_name}`,
            imgUrl: this.backgroundImg[this.randomNum]
        }

        return data  
      }
    },
    beforeRouteLeave(to, from, next) {
        if(to.name == 'banjiEdit' && to.query.pageType == 'add' ){
            let data = {
                ...from.query,
                pageType: 'edit',
                pageTitle:'设置班级'
            }
            next({path:`/manage/banjiEdit?${qs.stringify(data)}`})
        }else{
            next()
        }
    },
    data() {
        return {
            randomNum: Math.floor(Math.random()*3),
            backgroundImg:[
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-1.png',
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-2.png',
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-3.png'
            ],
            bgMusic:'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/music/Thomas%20Greenberg%20-%20Dream%20for%20Today.mp3',
            playing: true,
            newData: format((new Date()).getTime(),'yyyy年MM月'),
            invitationHTML: invitation,
            shareShow: false
        }
    },
    created () {
      this.wxShare()  
    },
    watch: {
        ready(){
            this.wxShare()
            this.play()
        }
    },
    methods: {
        ...mapActions('openWX',['share']),
        wxShare(){
            let data = {
                item: this.item,
                success(){
                    // console.log('微信分享')
                }
            }
            this.share(data)
        },
        toTeacherEdit(){
            this.$router.push({
                name:'teacherEdit',
                query:{
                   ...this.manageSchoolInfo,
                   username:'',
                   mobile:'',
                   duty:'',
                   id:'',
                   is_confirm:0,
                   is_head:0,
                   is_master:0,
                   is_school_head:0,
                   user_id: 0,
                   type:'add',
                   title: '录入成员'
                }
            })
        },
        play(){
            this.$refs.audio.play()
            this.playing = true
        },
        pause(){
            this.$refs.audio.pause()
            this.playing = false
        },
        onEnded(){
            this.play()
        }
    }
}
</script>
<style scoped>
.bg-header{
    width: 100%;
    height: 65vh;
    overflow: hidden;
    position: relative;
}

.invitation{
    position: absolute;
    z-index: 10;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.8);
    width: 70%;
    text-align: center;
    border-radius: 40px;
    left: 50%;
    top: 10px;
    margin-left: -35%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.bg-header img{
    position: absolute;
    object-fit: cover;
    top: 50%;
    transform: translate3d(0, -50%, 0);
}

.container{
    width: 100%;
    height: 35vh;
    background: #fff;
    overflow: hidden;
}

.footer-btn{
    padding: 20px;
}

.btn{
    margin-bottom: 20px;
}

.content{
    padding: 15px;
}

.content .title{
    text-align: center;
}

.player-icon{
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 10;
    color: rgba(0, 0, 0, 0.5);
}

.player-icon i.iconfont{
    font-size: 30px;
}

.invitation-card{
    position: absolute;
    z-index: 11;
    background: rgba(0, 0, 0, 0.5);
    width: 90%;
    bottom: 0;
    left: 50%;
    margin-left: -45%;
    text-align: justify;
    font-size: 14px;
    border-radius: 15px 15px 0 0;
    padding: 15px 0;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
}

.invitation-card,
.invitation-card .title{
    color: #EBEEF5;
}

.invitation-card .title{
    text-align: center;
}

.invitation-card b{
    display: block;
    margin-left: 15px;
}

.invitation-card .content{
    text-indent:30px;
}

.loan{
    text-align: right;
    margin-right: 15px;
}

.turn{
  animation:5s linear infinite CDturn;
  display: block;
}

.slogan{
    position: fixed;
    bottom: 0;
    width: 100%;
}

@keyframes CDturn{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
}
</style>
