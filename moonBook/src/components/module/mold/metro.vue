<template>
    <div class="metro">
        <van-row gutter="5">
            <van-col span="10">
                <div class="metro-l">
                    <div class="grid-metro">
                        <div class="info">
                            <div class="title">书架</div>
                            <div class="sub">阅亮书架</div>
                            <van-button class="theme-button" type="info" round size="mini">立即查看</van-button>
                        </div>
                        <img class="bg-img book-shelf" src="./../../../assets/img/book-shelf.png"/>
                        <div class="circle"></div>
                    </div>
                </div>
            </van-col>
            <van-col span="14">
                <div class="metro-r">
                    <div class="grid-metro">
                        <div class="info">
                            <div class="title">每日任务:4/5</div>
                            <div class="sub">好的习惯贵在坚持</div>
                            <van-button class="theme-button" type="info" round size="mini">立即查看</van-button>
                        </div>
                    </div>
                    <img class="bg-img book-task" src="./../../../assets/img/task.png"/>
                    <div class="circle"></div>
                </div>
            </van-col>
        </van-row>
    </div>    
</template>
<script>
export default {
    name:'metro',
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>
.grid-metro,
.metro-l,
.metro-r{
    width: 100%;
    height: 6.25rem /* 100/16 */;
    overflow: hidden;
}

.metro-l,
.metro-r{
   position: relative;
   overflow: hidden;
   background: linear-gradient(127deg, #d3f1ff, #ebf6ff);
   border-radius: .5rem /* 8/16 */;
}

.bg-img,
.info{
    position: absolute;
}

.bg-img.book-shelf{
    left: 50%;
    bottom: -.625rem /* 10/16 */;
}

.bg-img.book-task{
    right: -12%;
}

.bg-img.book-shelf,
.bg-img.book-task{
    z-index: 2;
}

.metro-r .info,
.metro-l .info{
    left: 5%;
    top: 5%;
    z-index: 3;
}

.info .title{
    color: #2ca7f1;
    font-weight: 700;
}

.sub{
    font-size: 13px;
}

.metro-r{
    background: linear-gradient(-45deg, #d3f1ff, #ebf6ff);
}

.book-task{
    height: 7.5rem /* 120/16 */;
    top: 0;
}

.theme-button{
    margin-top: .625rem /* 10/16 */;
}

.circle{
    width: 7.5rem /* 120/16 */;
    height: 7.5rem /* 120/16 */;
    border-radius: 50%;
    background: rgba(255,255,255,.7);
    position: absolute;
    bottom:-2.1875rem /* 35/16 */;
    right: -1.875rem /* 30/16 */;
    z-index: 1;
}
</style>
