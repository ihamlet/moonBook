<template>
    <div class="baby-setting">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-cell-group>
            <div class="form-title">宝贝信息</div>
            <van-field v-model="setting.school" input-align='right' readonly center label="修改学校" :placeholder="school" />
        </van-cell-group>

        <van-cell-group class="theme-switch">
            <div class="form-title">基本设置</div>
            <van-switch-cell v-model="setting.current" title="设为当前宝贝" />
            <van-switch-cell v-model="setting.public" title="公开宝贝主页" />
            <van-switch-cell v-model="setting.synchronous" title="同步发布内容" />
        </van-cell-group>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'baby-setting',
    components: {
        ...mapGetters(['userDataState']),
        school(){
            if(this.userDataState.regInfo){
                return this.userDataState.regInfo.school
            }else if(this.userDataState.vipInfo){
                return this.userDataState.vipInfo.school.schoolName.name
            }else{
                return '请选择学校'
            }
        }
    },
    data () {
        return {
            setting:{
                school:'',
                current: true,
                public: true,
                synchronous: true
            }
        }
    },
    methods: {
        onClickLeft(){
            this.$emit('close')
        }
    }   
}
</script>
<style scoped>
</style>
