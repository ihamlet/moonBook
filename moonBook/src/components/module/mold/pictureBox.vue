<template>
    <div class="picture-box">
        <div class="header-bar flex flex-align flex-justify" v-show='isFold'>
            <div class="avatar">
                <img :src="item.avatar" :alt="item.name">
            </div>
            <div class="name">
                {{item.name}}
                <i class="iconfont vip-masonry" v-if="item.isVip==1&&item.vipType.borrow==7">&#xe611;</i>
                <i class="iconfont vip-gold" v-if="item.isVip==1&&item.vipType.borrow==5">&#xe611;</i>
                <i class="iconfont vip-ordinary" v-if="item.isVip==1&&item.vipType.borrow==3">&#xe611;</i>     
            </div>
        </div>
        <van-swipe :initial-swipe='imgIndex' :loop='false' @change='onChange'>
            <van-swipe-item v-for='(list,index) in item.media.imgList' :key='index' class="flex flex-align">
                <div class="scroll-view" @click="closePopup">
                    <img class="img lazy" v-lazy="list.img"/>
                </div>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
                {{ imgIndex + 1 }}/{{item.media.imgList.length}}
            </div>
        </van-swipe>
        <div class="picture-info">
            <div class="content">
                <div class="text" v-if='item.text!=""&&isFold'>{{item.text}}</div>
                <div class="social flex flex-align">
                    <div class="fold" @click="fold">
                         <i class="iconfont" :class="[isFold?'rotate':'']">&#xe6c4;</i>  
                         {{isFold?'收起':'展开'}}
                    </div>
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
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'pictureBox',
    props: ['imgIndex','item'],
    model:{
        prop:'imgIndex',
        event:'changeIndex'
    },
    data () {
        return {
            isFold:false
        }
    },
    methods: {
        onChange(index){
            this.$emit('changeIndex',index)
        },
        closePopup(){
            this.$emit('close')
        },
        fold(){
            this.isFold = !this.isFold
        },
        addPraise(item){
            item.getPraise = !item.getPraise
            axios.post('/api/addPraise',{
                id:item.id,
                getPraise:item.getPraise
            }).then(res=>{
                item.social.praise.number = res.data.praise
            })
        }
    }
}
</script>
<style scoped>
.picture-box .van-swipe{
    width: 100%;
    height: 100vh;
}

.picture-box .van-swipe .van-swipe-item{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    height: 100%;
}

.picture-box .van-swipe .van-swipe-item img{
   width: 100%;
   min-height: 1.875rem /* 30/16 */;
   height: auto;
}

.scroll-view{
    width: 100%;
}

.scroll-img{
    position: absolute;
    top: 0;
    left: 0;
}

.picture-info,
.header-bar{
    position: fixed;
    width: 100%;
    background: rgba(0,0,0,.4);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    z-index: 10;
    color:#fff;
}

.picture-info{
    bottom: 0;
}

.header-bar{
    top: 0;
    height: 3rem /* 48/16 */;
}

.picture-info .content{
    padding: 1.25rem /* 20/16 */;
}

.picture-info .content .text{
    margin-bottom: 1.875rem /* 30/16 */;
}

.fold{
    font-size: .875rem /* 14/16 */;
}

.fold,
.picture-info .content .social .social-item{
    flex: 1;
    text-align: center;
}

.social{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .625rem /* 10/16 */;
}

.custom-indicator{
    position: absolute;
    height: 3rem /* 48/16 */;
    width: 3.125rem /* 50/16 */;
    text-align: center;
    line-height: 3rem /* 48/16 */;
    left: 0;
    top: 0;
    color: #fff;
    z-index: 11;
}

.avatar{
    margin-right: .625rem /* 10/16 */;
}

.avatar img{
    width: 2.125rem /* 34/16 */;
    height: 2.125rem /* 34/16 */;
    border-radius: 50%;
}
</style>
