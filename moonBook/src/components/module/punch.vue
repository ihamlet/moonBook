<template>
    <div class="punch">
        <van-nav-bar class="theme-nav" fixed title="打卡" @click-left="onClickLeft">
            <div class="head-bar-text" slot='left'>
                <i class="iconfont">&#xe657;</i>
                个人中心
            </div>
        </van-nav-bar>
        <lazy-component class="gap-top">
            <calendar />
        </lazy-component>
        <div class="calendar-module">
            <div class="punch">
                <van-row>
                    <van-col span="8">span: 8</van-col>
                    <van-col span="8">阅读打卡</van-col>
                    <van-col span="8">span: 8</van-col>
                </van-row>
            </div>
        </div>
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

.gap-top{
    padding-top:48px;
    background: linear-gradient( 135deg, #FF9800 10%, #FF5722 100%)
}

.calendar-module{
    padding: 0 1.25rem /* 20/16 */;
}

.punch{
    width: 100%;
    height: 6.25rem /* 100/16 */;
    background: #fff;
}
</style>
