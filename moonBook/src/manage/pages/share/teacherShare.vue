<template>
    <div class="teacher-share">
        <div class="bg-header">
            <!-- <div class="invitation">
                <div class="content">
                    <h4 class="title">邀请函</h4>
                </div>
            </div> -->

            <div class="invitation animated" :class="randomNum == 2?'top slideInDown':'bottom slideInUp'">
                <van-notice-bar :text="`${manageSchoolInfo.username}邀请您加入${manageSchoolInfo.school_name}`"  background='transparent' color='#303133'/>
            </div>

            <img :src="backgroundImg[randomNum]" />
        </div>
        <div class="container">
            <div class="footer-btn flex flex-column">
                <van-button class='btn' type="primary" round>微信分享</van-button>
                <van-button class="btn theme-btn" type="primary" round @click="toTeacherEdit">成员录入</van-button>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'teacher-share',
    computed: {
      ...mapGetters('manage',['manageSchoolInfo'])  
    },
    data() {
        return {
            randomNum: Math.floor(Math.random()*3),
            backgroundImg:[
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-1.png',
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-2.png',
                'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/teachershare-3.png'
            ],
        }
    },
    methods: {
        toTeacherEdit(){
            this.$router.push({
                name:'teacherEdit',
                query:{
                   ...this.manageSchoolInfo,
                   username:'',
                   mobile:'',
                   duty:'',
                   id:'',
                   is_confirm:0,
                   is_head:0,
                   is_master:0,
                   is_school_head:0,
                   user_id:'',
                   type:'share',
                   title: '录入成员'
                }
            })
        }
    }
}
</script>
<style scoped>
.bg-header{
    width: 100%;
    height: 65vh;
    overflow: hidden;
    position: relative;
}

/* .invitation{
    width: 80%;
    height: 60vh;
    position: absolute;
    z-index: 2;
    background: rgba(255,255,255,.8);
    left: 50%;
    top: 50%;
    margin-left: -40%;
    margin-top: -25vh
} */

.invitation{
    position: absolute;
    z-index: 10;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.8);
    width: 80%;
    text-align: center;
    border-radius: 40px;
    left: 50%;
    margin-left: -40%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.bottom{
    bottom: 15px;
}

.top{
    top: 15px;
}

.bg-header img{
    position: absolute;
    object-fit: cover;
    top: 50%;
    transform: translate3d(0, -50%, 0);
}

.container{
    width: 100%;
    height: 35vh;
    background: #fff;
}

.footer-btn{
    padding: 20px;
}

.btn{
    margin-bottom: 20px;
}

.content{
    padding: 15px;
}

.content .title{
    text-align: center;
}
</style>
