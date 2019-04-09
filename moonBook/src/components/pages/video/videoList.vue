<template>
    <div class="video-list">
        <van-swipe @change="onChange" :show-indicators='false' :loop="false">
            <van-swipe-item v-for='(item,index) in videoList' :key="index">
                <video style="object-fit:fill" width="100%" height="100%" webkit-playsinline="true" x5-playsinline="" x5-video-player-fullscreen="" playsinline preload="auto"
                           :poster="item.cover" :src="item.url" :playOrPause="playOrPause" x-webkit-airplay="true"
                           x5-video-orientation="portrait" @click="pauseVideo" @ended="onPlayerEnded($event)"
                           loop="loop"></video>
            </van-swipe-item>
        </van-swipe>
    
        <div class="icon-play" v-show="iconPlayShow" @click="playvideo">
            <i class="iconfont">&#xe639;</i>
        </div>
    </div>
</template>
<script>
export default {
    name:'video-list',
    data () {
        let u = navigator.userAgent
        return {
            // videoObject: {
            //     container: '#video',
            //     variable: 'player',
            //     loaded: 'loadedHandler',
            //     loop: false,
            //     config: '',
            //     debug: true,
            //     drag: 'start',
            //     seek: 0,
            //     video: []
            // }

            current: 0,
            isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //安卓终端
            isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            isVideoShow: true,
            playOrPause:true,
            iconPlayShow: true,
            video:null,
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
    methods: {
        onChange(index){
            let video = document.querySelectorAll('video')[this.current]
            video.play()
            this.playOrPause = false
            if(this.isIOS){
                this.isVideoShow = false
                this.pauseVideo()
            }else{
                this.isVideoShow = true
                this.iconPlayShow = true
            }
            this.current = index
        },
        playvideo(event) {
            let video = document.querySelectorAll('video')[this.current]
            console.log("playvideo：" + this.current)
            this.isVideoShow = false
            this.iconPlayShow = false
            video.play()
            window.onresize = function () {
                video.style.width = window.innerWidth + "px"
                video.style.height = window.innerHeight + "px"
            }

        },    
        pauseVideo(){
            let video = document.querySelectorAll('video')[this.current]
            if (this.playOrPause) {
                video.pause()
                this.iconPlayShow = true
            } else {
                video.play()
                this.iconPlayShow = false
            }
            this.playOrPause = !this.playOrPause
        },
        onPlayerEnded(player) { //视频结束
            this.isVideoShow = true
            this.current += this.current
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
</style>
