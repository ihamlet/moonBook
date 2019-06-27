<template>
    <div class="start-page">
        <div class="timer" @click="closePage">{{newTime}}跳过</div>
        <h2 class="title fadeIn animated second">阅亮书架</h2>
        <div class="moon fadeIn animated first">
            <i class="iconfont satellite swaying_1">&#xe60f;</i>
            <img class="launch-images" src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/moon.png" alt="theme-moon" />
            <i class="iconfont book swaying_2">&#xe63d;</i>
        </div>
        <div class="slogan fadeIn animated third">{{$store.state.slogan}}</div>
        <div class="copyright">© {{timeYear}} 阅亮书架</div>
    </div>    
</template>
<script>
export default {
    name:'start-page',
    data () {
        return {
            timeYear: new Date().getFullYear(),
            newTime: 6
        }
    },
    created () {
        this.CountDown() 
    },
    methods: {
        CountDown(){
            let timer = setInterval(()=>{
                this.newTime--
                if(this.newTime == 0){
                    this.$emit('listenStartPage')
                    clearInterval(timer)
                }
            },1000)
        },
        closePage(){
            this.$emit('listenStartPage')
        }
    }
}
</script>
<style scoped>
.start-page{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2019;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;
}

.title{
    font-size: 1.75rem /* 28/16 */;
    font-weight: 700;
    height: 9.375rem /* 150/16 */;
    line-height: 9.375rem /* 150/16 */;
    text-align: center;
    color: #303133;
}

.moon{
    width: 18.75rem /* 300/16 */;
    height: 18.75rem /* 300/16 */;
    margin: 0 auto;
    position: relative;
}

.moon i.iconfont.satellite,
.moon i.iconfont.book{
    position: absolute;
}

.moon i.iconfont.satellite{
    font-size: 1.75rem /* 28/16 */;
    background: linear-gradient(90deg, #00C2AB,#3E94FF);
    -webkit-background-clip: text;
    color: transparent;
}

.moon i.iconfont.book{
    font-size: 2.875rem /* 46/16 */;
    background: linear-gradient(90deg, #FF765C,#FF23B3);
    -webkit-background-clip: text;
    color: transparent;
    right: 1.25rem /* 20/16 */;
    bottom: 1.25rem /* 20/16 */;
}

.slogan{
    text-align: center;
    width: 100%;
    margin-top: 1.25rem /* 20/16 */;
    font-size: 1.125rem /* 18/16 */;
}

.copyright{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 3.125rem /* 50/16 */;
    line-height: 3.125rem /* 50/16 */;
    text-align: center;
    font-size: .75rem /* 12/16 */;
    color: #909399;
}

.timer{
    position: fixed;
    right: .625rem /* 10/16 */;
    top: .625rem /* 10/16 */;
    background: #303133;
    height: 1.875rem /* 30/16 */;
    line-height: 1.875rem /* 30/16 */;
    width: 5rem /* 80/16 */;
    text-align: center;
    border-radius: 1.875rem /* 30/16 */;
    color: #C0C4CC;
    font-size: .875rem /* 14/16 */;
    z-index: 999;
}

.swaying_1{
    animation: Swaying1 2s linear infinite;
}

.swaying_2{
    animation: Swaying2 3s linear infinite;
}

@keyframes Swaying1{
    0% {top: -.3125rem /* 5/16 */;}
    50%  {top: 0}
    100% {top: -.3125rem /* 5/16 */;}
}

@keyframes Swaying2{
    0% {bottom: -.125rem /* 2/16 */;}
    50%  {bottom: 1.25rem /* 20/16 */}
    100% {bottom:  -.125rem /* 2/16 */;}
}
</style>
