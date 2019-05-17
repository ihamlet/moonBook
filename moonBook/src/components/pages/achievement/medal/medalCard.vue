<template>
    <div class="module-card">
        <div class="module-title">{{title}}</div>
        <van-row>
            <van-col span="6" v-for='(item,index) in medalList' :key="index">
                <div class="medal-item">
                    <div class="icon flex flex-justify flipInX animated" :style="{animationDelay:`${200*index}ms`}">
                        <IconMedal :animate='level >= index+1?1:0' :gray='level >= index+1?false:true' :level="index+1" :type='type'/>
                    </div>
                    <div class="name" :class="level >= index+1?'active':''">{{item.name}}</div>
                    <div class="number">{{item.number}}{{type == 'punch'?'天':'本'}}</div>
                </div>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import IconMedal from './../../../module/animate/medal'
import { punchLevel, medalPunch, readLevel, medalRead } from './../../../lib/js/speech'

export default {
    name:'medal-card',
    props:['type'],
    components:{
        IconMedal
    },
    computed: {
        level(){
            let num

            switch (this.type) {
                case 'punch':
                    num = punchLevel(this.$route.query.sign_days).pop().level
                break
                case 'read':
                    num = readLevel(this.$route.query.read_count).pop().level
                break
            }

            return num
        },
        medalList(){
            let arr = []
            switch (this.type) {
                case 'punch':
                    arr = medalPunch
                break
                case 'read':
                   arr = medalRead
                break
            }

            return arr
        },
        title(){
            let title
            switch(this.type){
                case 'punch':
                    title = '阅读成就'
                break
                case 'read':
                    title = '借阅成就'
                break
            }

            return title
        }
    }
}
</script>
<style scoped>
.icon{
    margin: 5px auto;
}

.name{
    text-align: center;
}

.text{
    font-size: 14px;
}

.number{
    color: #909399;
    text-align: center;
}

.module-card{
    padding: 0 15px 10px;
    line-height: 1.5;
    font-size: 14px;
}

.active.name{
    color: #000;
}

.medal-item{
    padding: 10px 0;
}
</style>
