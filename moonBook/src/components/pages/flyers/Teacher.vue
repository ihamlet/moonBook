<template>
    <div class="container">
        <div class="tips">点击分享到"家长群"、"班级群"</div>
        <img class="poster" :src="posterImg" />
        <div class="footer-bar">
            <div class="footer-btn flex flex-align">
                <div class="btn-box registered">
                    <van-button round class="theme-btn animated rubberBand" type="primary" size="large" @click="toRegistered">注册成为老师</van-button>
                </div>
                <div class="btn-box share">
                    <van-button round class="theme-btn animated rubberBand" type="primary" size="large" @click="share">分享到'家长群'、'班级群'</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import wx from "weixin-js-sdk"

export default {
    name:'flyersTeacher',
    computed: {
        ...mapGetters(['userDataState']),
        item(){
            let data = {
                cate_name:'阅读活动',
                details:`${this.userDataState.name}邀您一起参与"起点阅读月活动"`,
                title: '起点阅读，阅读月活动开始啦！'
            }

            return data
        }
    },
    data () {
        return {
            posterImg: require('@/assets/flyers/flyer-teacher.png')
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
    methods: {
        ...mapActions('openWX',['share']),
        toRegistered(){
            this.$router.push({
                name:'edit-manager',
                query:{
                    pageTitle: '老师注册',
                    registerType:'teacher',
                    type:'add'
                }
            })
        },
        share(){
            this.$router.push({
                name:'flyersStudent'
            })
        }
    }
}
</script>
<style scoped>
.footer-bar{
    position: fixed;
    bottom: 0
}

.footer-bar,
.footer-btn{
    width: 100%;
}

.btn-box{
    padding: 10px;
}

.theme-btn{
    width: 100%;
}

.registered{
    flex: 1;
}

.share{
    flex: 2;
}

.share .theme-btn{
    background: linear-gradient(90deg, #ff765c, #ff23b3);
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
