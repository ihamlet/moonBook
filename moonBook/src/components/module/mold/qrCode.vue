<template>
    <div class="qrcode-image">
        <div class="close" @click="closeQrcode">
            <i class="iconfont">&#xe683;</i>
        </div>
        <img :src="dataURL" v-if='dataURL'>
        <slot v-else>
            <div class="bg" ref="imageWrapper">
                <round/>
                <div class="flex-justify" >
                    <div class="baby-info">
                        <div class="avatar" v-if='childInfo.avatar'>
                            <img class="avatar-img" :src="childInfo.avatar" :alt="childInfo.name"/>
                        </div>
                        <avatar :gender='childInfo.gender' v-else/>
                        <div class="name">{{childInfo.name}}</div>
                        <div class="label">{{label}}</div>
                        <div class="school" v-line-clamp:20="1">{{school}}</div>
                    </div>
                    <div class="text" v-if='dataStatistics.totalReading!=0'>
                        <span>{{childInfo.name}}宝贝在阅亮书架一共阅读了图书</span>
                        <span class="book-number">{{dataStatistics.totalReading}}本</span>
                    </div>
                    <div class="code-img">
                        <img :src="qrImage" alt="二维码">
                    </div>
                    <div class="explain">
                        <span> — 长按识别二维码进入 — </span>
                        <span> © 阅亮书架 </span>
                    </div>
                </div>
            </div>
        </slot>
        <div class="popup-btn">
            <van-button class="theme-btn" :loading='isLoading' size="large" square :disabled='isDisabled' type="primary" @click="toImage">
                {{dataURL?'长按上图保存分享':'生成图片'}}
            </van-button>
        </div>
    </div>
</template>
<script>
import round from './../animate/round'
import html2canvas from 'html2canvas'
import avatar from './../../module/avatar'

export default {
    name:'qr-code',
    props: ['childInfo','qrImage','dataStatistics','label','school'],
    components: {
        round,
        avatar
    },
    data () {
        return {
            isLoading:false,
            isDisabled:false,
            dataURL:'',
        }
    },
    methods: {
        toImage(){
            this.isLoading = true
            html2canvas(this.$refs.imageWrapper,{
                allowTaint:true,
                backgroundColor: '#fff'
            }).then((canvas) => {
                let dataURL = canvas.toDataURL("image/png")
                this.dataURL = dataURL
                this.isLoading = false
                this.isDisabled = true
            })
        },
        closeQrcode(){
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.baby-info{
    display: grid;
    padding: 1.875rem /* 30/16 */ 0;
}


.avatar{
    margin: 0 auto;
}

.label,
.school{
    text-align: center;
    font-size: .8125rem /* 13/16 */;
}

.avatar{
    width: 5rem /* 80/16 */;
    height: 5rem /* 80/16 */;
    border-radius: 50%;
    box-shadow: 0 .125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, .2);
    overflow: hidden;
}

.school{
    margin:.3125rem /* 5/16 */ auto 0;
    width: 80%;
}

.name{
    margin-top: .3125rem /* 5/16 */;
    text-align: center;
    color: #303133;
}

.code-img{
    width: 100%;
    padding:1.25rem /* 20/16 */ 0;
    margin: 0 auto;
}

.code-img img{
    width: 7.5rem /* 120/16 */;
    margin: 0 auto;
    display: block;
}

.bg,
.bg .welt{
    width: 100%;
    height: 31.25rem /* 500/16 */;
}

.bg .welt{
    position: absolute;
    z-index: -10;
}

.explain{
    display: grid;
    text-align: center;
    color: #303133;
}

.explain span{
    margin-bottom: .3125rem /* 5/16 */;
}

.avatar-img{
    background: transparent;
}

.qrcode-image{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.close{
    position: absolute;
    right:.625rem /* 10/16 */;
    top: .625rem /* 10/16 */;
    z-index: 10;
}

.close i.iconfont{
    font-size: 1.5rem /* 24/16 */;
    color: #F56C6C;
}

.text{
    font-size: .875rem /* 14/16 */;
    text-align: center;
    display: grid;
}

.book-number{
    font-size: 1.75rem /* 28/16 */;
    color: #000;
}
</style>
