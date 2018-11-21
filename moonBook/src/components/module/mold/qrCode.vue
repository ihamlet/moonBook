<template>
    <div class="qrcode-image">
        <img :src="dataURL" v-if='dataURL'>
        <slot v-else>
            <div class="bg" ref="imageWrapper">
                <round/>
                <div class="card flex-justify" >
                    <div class="baby-info">
                        <div class="avatar">
                            <img :src="childInfo.avatar" :alt="childInfo.name"/>
                        </div>
                        <div class="name">{{childInfo.name}}</div>
                    </div>
                    <div class="code-img">
                        <img :src="qrImage" alt="二维码">
                    </div>
                    <div class="explain">
                        <span> - 长按识别二维码进入 - </span>
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

export default {
    name:'qr-code',
    props: ['childInfo','qrImage'],
    components: {
        round
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
        }
    }
}
</script>
<style scoped>
.baby-info{
    display: grid;
    padding:3.125rem /* 50/16 */ 0;
}

.avatar{
    margin: 0 auto;
}

.avatar img{
    width: 6.25rem /* 100/16 */;
    height: 6.25rem /* 100/16 */;
    border-radius: 50%;
    box-shadow: 0 .125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, .2)
}

.name{
    margin-top: .3125rem /* 5/16 */;
    text-align: center;
    color: #303133;
}

.code-img{
    width: 120px;
    margin: 0 auto;
    padding: 2.5rem /* 40/16 */ 0;
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
    text-align: center;
    color: #303133;
}
</style>
