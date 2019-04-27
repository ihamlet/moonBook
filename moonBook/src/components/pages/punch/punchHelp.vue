<template>
    <div class='punch-help'>
        <img src='./../../../assets/punch-help.jpg'/>
        <div class='footer-bar'>
            <div class='bar'>
                <van-button round class='theme-btn' size="normal" type="primary" @click='toBabyHome'>进入宝贝主页</van-button>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'punch-help',
    computed:{
        ...mapGetters(['userDataState'])
    },
    methods:{
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
</style>
