<template>
    <div class="video-list">
        <van-swipe @change="onChange" :show-indicators='false'>
            <van-swipe-item v-for='(item,index) in videoList' :key="index">
                <div class="video-box">
                    <div class="video-container" :class="`video-${index}`"></div>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
// import './../../../../static/ckplayer/ckplayer/ckplayer'

export default {
    name:'video-list',
    computed: {
        // player() {
        //     let obj = this.videoObject
        //     obj.poster = this.videoList[this.current].cover
        //     obj.video = this.videoList[this.current].url
        //     obj.container = `video-${this.current}`
        //     return new ckplayer(obj)
        // }  
    },
    data () {
        return {
            videoObject: {
                variable: 'player',
                loaded: 'loadedHandler',
                loop: false,
                config: '',
                debug: true,
                drag: 'start',
                seek: 0,
                video: []
            },
            current: 0,
            videoList:[{
                url:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/1',
                cover:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/1?x-oss-process=video/snapshot,t_10000,m_fast'
            },{
                url:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/3',
                cover:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/3?x-oss-process=video/snapshot,t_10000,m_fast'
            },{
                url:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/4',
                cover:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/4?x-oss-process=video/snapshot,t_10000,m_fast'
            },{
                url:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/5',
                cover:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/5?x-oss-process=video/snapshot,t_10000,m_fast'
            },{
                url:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/6',
                cover:'https://activity-video.oss-cn-shanghai.aliyuncs.com/video/6?x-oss-process=video/snapshot,t_10000,m_fast'
            }]
        }
    },
    mounted(){
      this.$nextTick(()=>{
          this.player.videoPlay()
      })  
    },
    methods: {
        onChange(index){
            this.current = index
            this.player.playOrPause()
        }
    }
}
</script>
<style scoped>
.video-list{
    position: relative;
}

.icon-play{
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 99;
    left: 50%;
    bottom: 50%;
    background: rgba(0,0,0,.7);
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    transform: translate3d(-50%, -50%, 0);
}

.icon-play .iconfont{
    color: #fff;
    font-size: 30px;
}

.video-box,
.video-container{
    height: 100vh;
}
</style>
