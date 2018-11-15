<template>
    <div>
        <div>登陆</div>

        <form method="post" @submit="onSubmit">
            <van-cell-group>
                <van-field type="tel" required v-model="user.mobile" placeholder="请输入手机号码" />
            </van-cell-group>
            <van-cell-group>
                <van-field type="password" required v-model="user.password" placeholder="输入密码"></van-field>
            </van-cell-group>
            <div>
                <van-button type="primary">登陆</van-button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                user:{
                    mobile:'',
                    password:''
                }
            }
        },
        methods:{
            onSubmit(e){
                e.preventDefault();
                console.log('on submit', e);
                let toast = this.$toast.loading({
                   forbidClick:true,
                   loadingType:'spinner'
                });

                this.$axios.post('/book/login/mobileLogin', this.user).then(res=>{
                    console.log(res);
                    toast.clear();
                    if(res.data.status === 1) {
                        console.log('登陆成功');
                    } else {
                        this.$toast.fail(res.data.info);
                    }
                });

                return false;
            }
        }
    }
</script>

<style scoped>

</style>