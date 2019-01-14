<template>
    <div class="activity" @click="toFind">
        <van-cell title="亲子活动" is-link>
            <div class="icon" slot="icon">
                <i class="iconfont">&#xed8f;</i>
            </div>
        </van-cell>
        <div class="activity-card">
            <img src="./../../../assets/img/activity-cover.png" />
        </div>
    </div>    
</template>
<script>
export default {
    name:'activity',
    data () {
        return {
            
        }
    },
    methods: {
        toFind(){
            this.$router.push({
                name:'apps-find',
                query:{
                    tid: 5,
                    pageTitle:'亲子任务'
                }
            })
        }
    }
}
</script>
<style scoped>
.activity-card{
    padding: .625rem /* 10/16 */;
}

.activity-card img{
    border-radius: .625rem /* 10/16 */;
    overflow: hidden;
}

.icon {
    margin-right: .9375rem /* 15/16 */;
}

.icon .iconfont{
    font-size: 1.625rem /* 26/16 */;
    background: linear-gradient(127deg, #FF5722,#E91E63);
    -webkit-background-clip: text;
    color: transparent;
}
</style>
