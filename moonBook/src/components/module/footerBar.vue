<template>
    <div class="footer-bar flex flex-align">
        <div class="bar-btn" :class="[pageIndex==index?'active':'']" v-for='(item,index) in barBtn' :key="index" @click="toPage(item)">
            <i class="iconfont" :class="[pageIndex==index?`${item.iconClass}fill bounceIn animated`: item.iconClass]"></i>
            <span class="name">{{item.name}}</span>
        </div>
        <div class="msg badge">{{MsgLengthState>100?'99+':MsgLengthState}}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:'footer-bar',
    props: ['pageIndex'],
    computed: {
        ...mapGetters(['MsgLengthState'])
    },
    data () {
        return {
            barBtn:[{
                iconClass:'icon-home',
                name:'首页',
                path:'home',
            },{
                iconClass:'icon-faxian',
                name:'发现',
                path:'find'
            },{
                iconClass:'icon-community',
                name:'消息',
                path:'notice'
            },{
                iconClass:'icon-people',
                name:'个人中心',
                path:'my'
            }]
        }
    },
    methods: {
        toPage(item){
            this.$router.push({name:item.path})
        }
    }
}
</script>
<style scoped>
.footer-bar{
    width: 100%;
    height: 3rem /* 48/16 */;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
    bottom: 0;
    user-select: none;
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
}

.bar-btn{
    flex: 1;
    text-align: center;
}

.bar-btn i.iconfont{
    font-size: 1.5rem /* 24/16 */;
}

.bar-btn .name{
    display: block;
    font-size: x-small;
}

.bar-btn.active i.iconfont,
.bar-btn.active .name{
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
.msg{
    position: absolute;
    z-index: 10;
    top:0;
    right: 30%;
}
</style>
