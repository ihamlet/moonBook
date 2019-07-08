<template>
    <div class="metro">
        <van-row gutter="5">
            <van-col span="10">
                <div class="metro-l">
                    <div class="grid-metro" @click="toBookShelf">
                        <div class="info">
                            <div class="title">推荐书单</div>
                            <div class="sub">书架</div>
                            <van-button class="theme-button" type="info" round size="small">前往书架</van-button>
                        </div>
                        <img class="bg-img book-shelf" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/book-shelf.png"/>
                        <div class="circle"></div>
                    </div>
                </div>
            </van-col>
            <van-col span="14">
                <div class="metro-r">
                    <div class="grid-metro" @click="toTask">
                        <div class="info">
                            <div class="title">每日任务:{{childInfo.today_missions}}/4</div>
                            <div class="sub">好的习惯贵在坚持</div>
                            <van-button class="theme-button" type="info" round size="small">完成任务</van-button>
                        </div>
                    </div>
                    <img class="bg-img book-task" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task.png"/>
                    <div class="circle"></div>
                </div>
            </van-col>
        </van-row>
    </div>    
</template>
<script>
export default {
    name:'metro',
    props: ['childInfo'],
    methods: {
        toBookShelf(){
            this.$router.push({
                name:'read-guide'
            })
        },
        toTask(){
            this.$router.push({
                name:'task',
                query:{
                    id: this.$route.query.id,
                    tid: 16
                }
            })
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
   background: linear-gradient(127deg, #d6f2ff, #3ba7ff);
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

.book-task{
    height: 7.5rem /* 120/16 */;
    top: 0;
}

.theme-button{
    margin-top: .625rem /* 10/16 */;
    box-shadow: 0 2px 6px rgb(33, 150, 243,.5);
}

.circle{
    width: 7.5rem /* 120/16 */;
    height: 7.5rem /* 120/16 */;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    bottom:-2.1875rem /* 35/16 */;
    right: -1.875rem /* 30/16 */;
    z-index: 1;
    box-shadow: 0 2px 10px rgba(0,0,0,.1);
}
</style>
