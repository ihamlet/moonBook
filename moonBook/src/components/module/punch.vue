<template>
    <div class="punch-module">
        <van-nav-bar class="theme-nav" fixed title="阅读日历" @click-left="onClickLeft">
            <div class="head-bar-text" slot='left'>
                <van-icon name="arrow-left" />
                个人中心
            </div>
        </van-nav-bar>
        <lazy-component class="gap-top">
            <calendar />
        </lazy-component>
        <lazy-component>
            <div class="calendar-module">
                <div class="punch-module">
                    <van-row class="flex flex-align" gutter='10'>
                        <van-col span="8">
                            <div class="push-illustrated">
                                <img src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/punch.png" alt="打卡">
                            </div>
                        </van-col>
                        <van-col span="8">
                            <div class="text">
                                今天还未签到
                            </div>
                            <div class="link">
                                查看今日日签
                            </div>
                        </van-col>
                        <van-col span="8" class="flex flex-justify">
                            <van-button round class="theme-btn" type='primary' size='normal'>
                                今日签到
                            </van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </lazy-component>
    </div>
</template>

<script>
import calendar from './../module/mold/calendar'
export default {
    name:'punch',
    components: {
        calendar
    },
    data () {
        return {
            
        }
    },
    methods: {
        onClickLeft(){
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.theme-nav.van-nav-bar{
    background: transparent;
    color: #fff;
}

.theme-nav .head-bar-text{
    color: #fff;
}

.theme-nav.van-nav-bar::after{
    display: none;
}

.theme-btn.van-button--primary{
    background-image: linear-gradient( 135deg, #FEC163 10%, #DE4313 100%);
}

.gap-top{
    padding-top:48px;
    background: linear-gradient( 135deg, #FF9800 10%, #FF5722 100%)
}

.calendar-module{
    padding: 0 .625rem /* 10/16 */;
}

.punch-module{
    width: 100%;
    height: 6.25rem /* 100/16 */;
    background: #fff;
}

.push-illustrated{
    display: table-cell;
    vertical-align: middle;
    height: 6.25rem /* 100/16 */;
    padding-left: .625rem /* 10/16 */;
}

.push-illustrated img{
    width: 100%;
}

.punch-module .text{
    color: #000;
    font-weight: 700;
}

.link{
    font-size: .75rem /* 12/16 */;
}

</style>
