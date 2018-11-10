<template>
    <div class="graphic-card">
        <div class="user-card flex flex-align">
            <div class="avatar">
                <img :src="item.avatar" :alt="item.name">
            </div>
            <div class="info">
                <div class="name">
                    {{item.name}} 
                    <i class="iconfont vip-masonry" v-if="item.isVip==1&&item.vipType.borrow==7">&#xe611;</i>
                    <i class="iconfont vip-gold" v-if="item.isVip==1&&item.vipType.borrow==5">&#xe611;</i>
                    <i class="iconfont vip-ordinary" v-if="item.isVip==1&&item.vipType.borrow==3">&#xe611;</i>     
                </div>
                <div class="school" v-if='item.school.schoolName'>
                    {{item.school.schoolName.name}}
                </div>
            </div>
            <div class="date">
                <span>{{item.date}}</span>
                <span>{{item.time}}</span>
            </div>
        </div>
         <div class="text" v-line-clamp:20="2">
            {{item.text}}
        </div>
        <div class="media" :class="item.media.imgList?'img':''" v-if='item.media.imgList'>
            <van-row gutter="5">
                <van-col :span="8" v-for='(photo,photoIndex) in item.media.imgList' :key="photoIndex">
                    <div class="img-grid" @click="mediaLamp(item,photoIndex)" v-lazy:background-image='photo.img'>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="media" :class="item.media.videoCover?'video-cover':''" v-if='item.media.videoCover'>
            <div class="video-cover">
                <div class="play">
                    <i class="iconfont">&#xe602;</i>
                </div>
                <img :src="item.media.videoCover" alt="视频封面">
            </div>
        </div>
        <div class="social flex flex-align">
            <div class="share">
                <i class="iconfont">&#xe6eb;</i>
                {{item.social.share.number>1000?'999+':item.social.share.number}}
            </div>
            <div class="message">
                <i class="iconfont">&#xe731;</i>
                {{item.social.message.number>1000?'999+':item.social.message.number}}
            </div>
            <div class="praise flex flex-align flex-justify" @click="addPraise(item)">
                <i class="iconfont" v-if='!item.getPraise'>&#xe644;</i>
                <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
                {{item.social.praise.number>1000?'999+':item.social.praise.number}}
            </div>
        </div>

        <van-popup v-model="pictureShow" class="picture-box-popup" :overlay='false'>
            <picture-box @listenPictureBox='listenPictureBoxClose' v-model='imgIndex' :item='item'/>
        </van-popup>
    </div>
</template>
<script>
import pictureBox from './../mold/pictureBox'
import axios from 'axios'

export default {
    name:'graphic-crad',
    props: ['item'],
    components: {
        pictureBox  
    },
    data () {
        return {
            imgIndex:0,
            pictureShow: false
        }
    },
    methods: {
        addPraise(item){
            item.getPraise = !item.getPraise

            axios.post('/api/addPraise',{
                id:item.id,
                getPraise:item.getPraise
            }).then(res=>{
                item.social.praise.number = res.data.praise
            })
        },
        mediaLamp(item,photoIndex){
            this.pictureShow = true
            this.imgIndex = photoIndex
            this.item = item
        },
        listenPictureBoxClose(){
            this.pictureShow = false
        }
    }
}
</script>
<style scoped>
.text{
    margin: .9375rem /* 15/16 */ .3125rem /* 5/16 */;
    text-align: justify;
}

.video-cover{
    width: 12.5rem /* 200/16 */;
    height: 18.75rem /* 300/16 */;
    position: relative;
}

.video-cover .play{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 3.5rem /* 56/16 */;
    height: 3.5rem /* 56/16 */;
    text-align: center;
    line-height: 3.5rem /* 56/16 */;
}

.video-cover .play i.iconfont{
    color: #fff;
    font-size: 3.5rem /* 56/16 */;
}

.social{
    margin-top: .625rem /* 10/16 */;
    height: 2.25rem /* 36/16 */;
    border-top: .0625rem /* 1/16 */ solid #E4E7ED;
}

.media{
    margin-bottom: .625rem /* 10/16 */;
}

.info i.iconfont{
    font-size: 1.25rem /* 20/16 */;
}

.avatar{
    margin-right: .625rem /* 10/16 */;
}

.name{
    font-size: 1rem /* 16/16 */;
    color: #303133
}

.avatar img{
    width: 3.5rem /* 56/16 */;
    height: 3.5rem /* 56/16 */;
    border-radius: 50%;
}

.date{
    position: absolute;
    top: 0;
    right: 0;
    font-size: .75rem /* 12/16 */;
    color: #C0C4CC;
}
</style>

