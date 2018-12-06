<template>
    <div class="login">
        <van-nav-bar :title="$route.meta.title" left-text="首页" left-arrow @click-left="onClickLeft"/>
        <div class="form">
            <van-cell-group>
                <van-field v-model="userLogin.mobile" type='number' placeholder="请输入手机号" @click="fieldType('phone')">
                    <div class="icon" slot='left-icon' :class="[tpye=='phone'?'active':'']">
                        <i class="iconfont">&#xe686;</i>
                    </div>
                </van-field>
                <van-field v-model="userLogin.password" type='password' placeholder="请输入密码" @click="fieldType('password')">
                    <div class="icon" slot='left-icon' :class="[tpye=='password'?'active':'']">
                        <i class="iconfont">&#xe616;</i>
                    </div>
                </van-field>
            </van-cell-group>
            <van-button class="theme-btn" :loading='isLoading' size="large" type="primary" @click="Login"> 
                登 录
            </van-button>
        </div>
    </div>    
</template>
<script>
import { mapActions } from "vuex"

export default {
    name:'login',
    data () {
        return {
            isLoading:false,
            userLogin:{
                mobile:'',
                password:''
            },
            tpye:'',
        }
    },
    methods: {
        ...mapActions(['login']),
        fieldType(type){
            this.tpye = type
        },
        onClickLeft(){
            this.$router.push({name:'home'})
        },
        Login(){
            this.isLoading = true
            this.login(this.userLogin).then(res=>{
                this.isLoading = false
                if(res.status){
                    this.$notify({
                        message: res.info,
                        duration: 1000,
                        background: '#409EFF'
                    })
                    this.$router.push({path:this.$route.query.redirect})
                }else{
                    this.$notify(res.info)
                    this.userLogin.mobile = ''
                    this.userLogin.password = ''
                }
            }).catch(err=>{
                this.$toast.fail('服务器错误 500')
            })
        }
    }
}
</script>
<style scoped>
.form{
    padding:7.5rem /* 120/16 */ 1.25rem /* 20/16 */;
}

.theme-btn{
    margin-top: 1.25rem /* 20/16 */;
    box-shadow: 0 .625rem /* 10/16 */ 2.5rem /* 40/16 */ rgba(64, 158, 255, .5);
}

.icon{
    width: 3.25rem /* 52/16 */;
    height: 3.25rem /* 52/16 */;
    text-align: center;
    line-height: 3.25rem /* 52/16 */;
    position: absolute;
    top: 0;
    left: 0;
}

.icon.active i.iconfont{
    background: linear-gradient(90deg, #00C2AB,#3E94FF);
    -webkit-background-clip: text;
    color: transparent;
}

.icon i.iconfont{
    font-size: 1.5rem /* 24/16 */;
}
</style>
