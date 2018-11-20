<template>
    <div class="footer-bar flex flex-align">
        <van-tabbar v-model="active" fixed>
            <van-tabbar-item v-for='(item,index) in userTabBtn' :key="index" :to='item.path' :info="index==2&&MsgLengthState>0?MsgLengthState:''">
                <i class="iconfont" :class="[props.active?`${item.iconClass}fill bounceIn animated`: item.iconClass]" slot='icon' slot-scope="props"></i>
                <span>{{item.name}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:'footer-bar',
    computed: {
        ...mapGetters(['MsgLengthState','userTabBtn'])
    },
    data () {
        return {
            active: 0
        }
    },
    created () {
        this.active = this.$route.meta.tabActive
    },
    watch: {
        '$route' (to, from) {
            this.active = to.meta.tabActive
        }
    }
}
</script>
<style scoped>
.footer-bar .van-tabbar{
    background: rgba(255, 255, 255, 0.9);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
}

.footer-bar .van-info{
    top: 0;
}

.footer-bar i.iconfont{
    font-size: 1.3125rem /* 21/16 */;
}

.footer-bar .van-tabbar-item.van-tabbar-item--active .van-tabbar-item__icon i.iconfont,
.footer-bar .van-tabbar-item.van-tabbar-item--active .van-tabbar-item__text{
    background: linear-gradient(135deg, #00BCD4, #409eff);
    -webkit-background-clip: text;
    color: transparent;
    display: block;
}

/* 首页 */
.icon-home:before { content: "\e6b8"; }
.icon-homefill:before { content: "\e6bb"; }

/* 消息 */
.icon-communityfill:before { content: "\e740"; }
.icon-community:before { content: "\e741"; }

/* 个人中心 */
.icon-peoplefill:before { content: "\e735"; }
.icon-people:before { content: "\e736"; }

/* 宝贝主页 */
.icon-crownfill:before { content: "\e776"; }
.icon-crown:before { content: "\e777"; }

/* 发现 */
.icon-faxian:before { content: "\e692"; }
.icon-faxianfill:before { content: "\e621"; }

/* 书架 */
.icon-tushuguan:before {content:"\e6a2"}
.icon-tushuguanfill:before {content:"\e619"}
</style>
