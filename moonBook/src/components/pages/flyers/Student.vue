<template>
    <div class="container">
        <div class="tips">点击分享到"家长群"、"班级群"</div>
        <img class="poster" :src="posterImg" />
        <div class="footer-bar">
            <div class="btn-box">
                <van-button round class="theme-btn animated rubberBand" type="primary" size="large" @click="toBabyHome">进入"宝贝主页"参与活动</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import wx from "weixin-js-sdk"

export default {
    name:'flyersStudent',
    computed: {
        ...mapGetters(['userDataState']),
        item(){
            let data = {
                cate_name:'阅读活动',
                details:`${this.userDataState.name}邀您一起参与阅读打卡活动`,
                title: '【家长篇】起点阅读，阅读月活动开始啦！'
            }

            return data
        }
    },
    data () {
        return {
            posterImg: 'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/flyers/flyers-student.png',
            userInfo:''
        }
    },
    mounted (){
        wx.ready(()=>{
            let self = this //this指向到vue实例
            this.$nextTick(()=>{
                let data = {
                    item: self.item,
                    success(){
                        
                    }
                }
                this.share(data)
            })
        })
    },
    created () {
        this.fetchData()
    },
    watch: {
      '$router':'fetchData'  
    },
    methods: {
        ...mapActions('openWX',['share']),
        ...mapActions(['getUserData']),
        fetchData(){
            this.getUserData().then(res => {
                this.userInfo = res
            })
        },
        toBabyHome(){
            this.$router.push({
                name:'baby-home',
                query:{
                    id: this.userDataState.child_id
                }
            })
        }
    }
}
</script>
<style scoped>
.footer-bar{
    position: fixed;
    bottom: 0;
    width: 100%;
}

.btn-box{
    padding: 20px 10px;
}

.theme-btn{
    width: 100%;
}

.poster{
    width: 100%;
}

.tips{
  position: fixed;
  z-index: 10;
  background: rgba(0, 0,0, .7);
  color: #fff;
  padding: 5px;
  height: 1.75rem /* 28/16 */;
  line-height: 1.75rem /* 28/16 */;
  border-radius: .5rem /* 8/16 */;
  right: .625rem /* 10/16 */;
  top: 20px;
  font-size: 13px;
}

.tips::before{
  content: '';
  position: absolute;
  border-right:0 solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 20px solid#000;
  top: -20px;
  right: .5rem /* 8/16 */;
  opacity: .7;
}
</style>
