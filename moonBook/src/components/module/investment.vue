<template>
    <div class="investment">
        <div class="light-box" v-if='isAdshow'>
            <div class='close' @click="hideAd">
                <i class="iconfont">&#xe683;</i>
            </div>
            <a :href="investmentAd.link">
                <img class="lazy" v-lazy="investmentAd.banner" alt="加盟商广告">
            </a>
        </div>

        <div class="box">
            <van-row class="flex flex-align">
                <van-col span="8">       
                    <a class="box-link" :href="investmentAd.link">成为书架馆长</a>
                </van-col>
                <van-col span="10">
                    <div class="content">
                        <span>万册图书触手可及</span>
                        <span>幼儿园的新名片</span>
                    </div>
                </van-col>
                <van-col span="6" class="flex flex-justify">
                    <van-button class="theme-btn" size="small" type="primary" plain @click="toRegister">注册</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:'investment',
    props: ['investmentAd'],
    computed: {
        ...mapGetters(['userCity'])
    },
    data () {
        return {
            isAdshow: true
        }
    },
    created () {
        if(localStorage.getItem("ad")){
            this.isAdshow = JSON.parse(localStorage.getItem("ad"))
        }
    },
    watch: {
        isAdshow(val){
            localStorage.setItem('ad',val)
        }
    },
    methods: {
        hideAd(){
            this.isAdshow = false
        },
        toRegister(){
            this.$router.push({name:'register',query:{
                city: this.userCity
            }})
        }
    }
}
</script>
<style scoped>
.investment{
    position: relative;
}

.light-box a{
    display: block;
    width: 100%;
    height: 8.125rem /* 130/16 */;
    padding: .625rem /* 10/16 */ 0;
}

.close{
    position: absolute;
    z-index: 2;
    top: 1.5625rem /* 25/16 */;
    left: .625rem /* 10/16 */;
    color: #000;
}

.close i.iconfont{
    font-size: 1.625rem /* 26/16 */;
}

.content{
    display: inline-grid;
    font-size: .8125rem /* 13/16 */;
    margin-left: .625rem /* 10/16 */;
}

.box{
    background: #fff;
    margin-bottom: .625rem /* 10/16 */;
    border-radius: .5rem /* 8/16 */;
}

.box-link{
    height: 3.75rem /* 60/16 */;
    display: block;
    text-align: center;
    line-height: 3.75rem /* 60/16 */;
    font-weight: 700;
    font-style: oblique;
    background: linear-gradient(90deg, #FE8537,#F02B2B);
    -webkit-background-clip: text;
    color: transparent;
}

</style>

