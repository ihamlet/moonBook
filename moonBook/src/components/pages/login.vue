<template>
    <div>
        <div>登陆</div>

        <form method="post">
            <div>
                <input type="text" name="account" v-model="user.mobile" placeholder="输入手机号码">
            </div>

            <div>
                <input type="password" name="password" v-model="user.password" placeholder="输入密码">
            </div>

            <div>
                <button>登陆</button>
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
        }
    }
</script>

<style scoped>

</style>