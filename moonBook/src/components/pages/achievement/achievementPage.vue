<template>
    <div class="achievement-page">
        <div class="wrap">
            <div class="user-card flex flex-align">
                <div class="flex flex-align">
                    <div class="active">
                        <img :src="$route.query.avatar" @error="imgError"/>
                    </div>
                    <div class="child-info">
                        <div class="child-name">{{$route.query.name}}</div> 
                        <div class="text">成就 {{punchArr.length + readArr.length}}/16</div>
                    </div>
                </div>
                <div class="child-medal flex flex-align">
                    <div class="medal-box">
                        <div class="day">{{level.number}}{{level.type == 'punch'?'天':'本'}}</div>
                        <div class="name">{{level.name}}</div>
                    </div>

                    <IconMedal class="bounceIn animated" :level='level.level'/>
                </div>
            </div>
             
            <div class="gutter" v-for='(item,index) in type' :key="index">
                <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
                    <medalCard :type='item.name' v-if='item.isShow'/>
                </transition>
                <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp"  v-if='index == 0'>
                    <div class="overlay" v-if='!isShow'></div>
                </transition>
            </div>
             
            <div class="text-down" @click="slide">{{isShow?'收起':'展开'}}</div>
            <div class="footer-bar">
                <van-button class="theme-plain" round plain type="primary" size="normal" @click="toShare">炫耀一下</van-button>
            </div>

            <div class="slogan">
                {{$store.state.slogan}}
            </div>
        </div>
      <round class="bg-round"/>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import round from './../../module/animate/round'
import medalCard from './medal/medalCard'
import IconMedal from './../../module/animate/medal'
import { punchLevel, readLevel } from './../../lib/js/speech'

export default {
    name:'achievement',
    components:{
        round,
        IconMedal,
        medalCard
    },
    computed: {
        level(){
            let obj 
            switch (this.type[0].name) {
                case 'punch':
                  obj = punchLevel(this.$route.query.sign_days).pop()
                break
                case 'read':
                  obj = readLevel(this.$route.query.read_count).pop()
                break
            }
            
            return obj
        },
        punchArr(){
            let arr = []
            let punchArr = punchLevel(this.$route.query.sign_days)

            punchArr.forEach(element => {
                if(element.level > 0){
                    arr.push(element)
                }
            })

            return arr
        },
        readArr(){
            let arr = []
            let readArr = readLevel(this.$route.query.read_count)

            readArr.forEach(element =>{
                if(element.level > 0){
                    arr.push(element)
                }
            })

            return arr
        },
        type(){
            let type = []
            if( this.punchArr.length > this.readArr.length ){
                type.push({
                    name:'punch'
                },{
                    name:'read'
                })
            } else {
                type.push({
                    name:'read'
                },{
                    name:'punch'
                })
            }

            type[0].isShow = true
            type[1].isShow = false

            return type
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        slide(){
            this.isShow = !this.isShow
            this.type[1].isShow = !this.type[1].isShow
        },
        toShare(){
            this.$router.push({
                name:'achievement-share',
                query:{
                    id: this.$route.query.id,
                    avatar: this.$route.query.avatar,
                    name: this.$route.query.name,
                    post_id: this.$route.query.post_id,
                    medalName: this.level.name,
                    level: this.level.level,
                    number: this.level.number,
                    type: this.level.type
                }
            })
        },
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        }
    }
}
</script>
<style scoped>
.achievement-page{
    min-height: 100vh;
    background: linear-gradient(45deg, #5B86E5, #36D1DC);
    position: relative;
    overflow: hidden;
}

.wrap{
    position: relative;
    z-index: 2;
}

.child-name{
    font-size: 18px;
    font-weight: 700;
}

.child-name,
.text{
    color: #fff;
}

.user-card{
    padding:30px 10px 10px;
    justify-content: space-between
}

.user-card .active img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, .5);
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1)
}

.user-card .active{
    margin-right: 10px;
}

.user-card .name{
    color: #fff;
}

.bg-round{
    opacity: 0.2;
}

.gutter{
    padding: 10px;
    position: relative;
    overflow: hidden;
}

.overlay{
    position: absolute;
    width: 90%;
    height: 100px;
    bottom: 0;
    left: 50%;
    margin-left: -45%;
    background: rgba(255,255,255,.5);
    border-radius: 0 0 10px 10px;
    z-index: -1;
}

.medal-box{
    text-align: right;
    color: #fff;
    margin-right: 20px;
    font-style: italic;
}

.medal-box .name{
    font-size: 14px;
}

.medal-box .day{
    font-size: 24px;
}

.text-down{
    text-align: center;
    color: #fff;
    height: 46px;
    line-height: 46px;
}

.footer-bar{
    padding: 20px;
}

.theme-plain{
    width: 100%;
}
</style>
