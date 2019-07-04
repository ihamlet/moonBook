<template>
    <div class="video-warp">
        <van-swipe vertical :width='windownWidth' :height='windownHeight' @change="onChange" :show-indicators='false'>
            <div class="top-mask"></div>
            <van-swipe-item class="swipe-item" v-for='(item,index) in videoList' :key="index">
                <div class="video-position">
                    <div class="player" @click="playVideo" v-if='item.isCoverShow'>
                        <i class="iconfont">&#xe639;</i>
                    </div>
                    <img class="cover" :src="item.cover" v-if='item.isCoverShow'/>
                    <video id="video"
                        v-show='!item.isCoverShow'
                        :src="item.src"
                        :poster='item.cover'
                        preload='auto'
                        x-webkit-airplay='true'
                        airplay='allow'
                        webkit-playsinline='true'
                        playsinline='true'
                        x5-playsinline
                        t7-video-player-type="inline"
                        loop
                        ref='video'
                    />

                    <div class="video-control">
                        <ul>
                            <li class="zan">
                                <i class="iconfont">&#xe6e3;</i>
                                <span class="zan-num">赞</span>
                            </li>
                            <li class="share">
                                <i class="iconfont">&#xe6ea;</i>
                                <span class="text">分享</span> 
                            </li>
                        </ul>
                    </div>

                    <div class="comment">
                        
                    </div>
                </div>
            </van-swipe-item>
            <div class="bottom-mask"></div>
        </van-swipe>
    </div>
</template>
<script>
export default {
    name:'video-page',
    data() {
        return {
            current:0,
            windownWidth: window.screen.availWidth,
            windownHeight: window.screen.availHeight,
            videoList:[{
                cover:'/attachs/video/2019/05/115cd625a1d64e0.jpg',
                isCoverShow: true,
                src:'https://wmlife.oss-cn-shanghai.aliyuncs.com/attach/155753821063557923099596__2C3AEA1C-2C95-49DD-A587-75A3E902205F.MOV'
            },{
                cover:'/attachs/video/2019/04/245cbfbb2b878c7.jpg',
                isCoverShow: true,
                src:'https://wmlife.oss-cn-shanghai.aliyuncs.com/attach/155606916372257776194540__405AD6F5-470A-4EFF-BEFA-0812E6EE69B6.MOV'
            }]
        }
    },
    methods: {
        onChange(index){
            this.current = index
            this.videoList[index].isCoverShow = true
        },
        playVideo(){
            this.videoList[this.current].isCoverShow = false
            this.$refs.video[this.current].play()
        }
    }
}
</script>
<style lang="less" scoped>
.video-position{
    position: absolute;
    width: 100%;
}

.video-warp{
    width: 100%; 
    height: 100vh; 
    overflow: hidden; 
    display: block;
    background: #000;
    .loading{
        position: absolute;
        z-index: 10;
        top: 10px;
        right: 10px;
    }
    .cover{
        height: 100vh;
        object-fit: cover;
    }
    #video{
        width: 100%;
        height: 100vh;
    }
    .player{
        position: absolute;
        z-index: 999;
        background: transparent;
        i.iconfont{
            font-size: 50px;
            color: #fff;
            text-shadow: 0 3px 12px rgba(0, 0, 0, .2);
            opacity: .9;
        }
    }
    .video-control{
        position: absolute;
        z-index: 10;
        color: #fff;
        right: 15px;
        bottom: 25%;
        ul{
            li{
                display: grid;
                text-align: center;
                margin-bottom: 20px;
                i.iconfont{
                    font-size: 34px;
                    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
                }
            }
        }
    }
}
</style>

