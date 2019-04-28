<template>
    <div class='punch-help page-padding'>
        <div class="tips">点击发送给朋友或分享到朋友圈</div>
        <img :src='imgPoster'/>
        <div class='footer-bar'>
            <div class='bar'>
                <van-button round class='theme-btn' size="normal" type="primary" @click='toBabyHome'>{{$route.query.type == "read"?'进入宝贝主页':'打造宝贝主页'}}</van-button>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapActions,mapGetters,mapState } from 'vuex'

export default {
    name:'punch-help',
    computed:{
        ...mapGetters(['userDataState']),
        ...mapState('openWX',['ready']),
        imgPoster(){
            let img
            
            if(this.$route.query.type == "read"){
                img = 'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-help.jpg'
            }else{
                img = 'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/babyHome-help.jpg' 
            }

            return img
        },
        item(){
            let data

            if(this.$route.query.type == "read"){
                data = {
                    details:'邀请您一起参与阅读打卡',
                    title: '阅读打卡'
                }
            }else{
                data = {
                    details:'一心为孩子,关心成长，记录成长。全家一起，建立孩子的成长记录，您今天记录的是孩子一生的财富，关注孩子的教育和成长。',
                    title: '使用阅亮书架打造宝贝主页'
                }
            }

            return data
        }
    },
    created () {
        this.fetchData()
    },
    updated(){
        this.wxShare()
    },
    watch: {
        '$router':'fetchData',
        ready(){
            this.wxShare()
        }
    },
    methods: {
        ...mapActions('openWX',['share']),
        fetchData(){
            this.wxShare()
        },
        wxShare(){
            const self = this 
            let data = {
                item: self.item,
                success(){
                    self.$router.push({
                        name:'baby-home',
                        query:{
                            id: self.userDataState.child_id,
                            tags:'宝贝主页',
                            home_type:'baby'
                        }
                    })
                }
            }
            self.share(data)
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
    width: 100%;
    bottom: 0;
}

.bar{
    padding:15px;
}

.theme-btn{
    width: 50%;
    display: block;
    margin: 0 auto
}

.punch-help{
    background: #fff;
    padding-top: 60px;
}

.theme-btn{
    box-shadow: 0 2px 10px  rgba(0, 132, 255, 0.5)
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
