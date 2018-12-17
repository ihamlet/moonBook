<template>
    <div class="baby-setting">
        <van-nav-bar title="设置" :left-text="childName" left-arrow @click-left="onClickLeft" />

        <van-cell-group>
            <div class="form-title">修改校园信息</div>
            <van-field input-align='right' readonly center label="修改学校" v-model="setting.babySchool" placeholder="请选择学校" @click="toSelectSchool" icon="question" @click-icon="$toast('设置孩子学校，将可以同步同班信息！')"/>
            <van-field input-align='right' readonly center label="修改班级" v-model="setting.babyClass" placeholder="请选择班级"  @click="toSelectClass" icon="question" @click-icon="$toast('您需要选择学校后才可选择班级')"/>
        </van-cell-group>

        <van-cell-group class="theme-switch">
            <div class="form-title">基本设置</div>
            <van-switch-cell v-model="setting.current" @input="onInput" title="设为当前宝贝" />
        </van-cell-group>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions,mapGetters } from 'vuex'

export default {
  name: 'baby-setting',
  computed: {
    ...mapGetters(['userDataState'])  
  },
  data() {
    return {
      setting: {
        current: false,
        babyClass: '',
        babySchool: '',
      },
      childName:''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData(){
        axios.get(`/book/family/getChildByUser?child_id=${this.$route.query.id}`).then(res => {
            console.log(res)
            this.childName = res.data.data.name
            this.setting.babyClass = res.data.data.banji_name
            this.setting.babySchool = res.data.data.school_name

            console.log(res.data.data.is_current_child)

            if(res.data.data.is_current_child == 1){
                this.setting.current = true
            }
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    toSelectSchool(){
        this.$router.push({
            name:'edit-school',
            query:{
                id: this.userDataState.child_id
            }
        })
    },
    toSelectClass() {
        this.$router.push({
            name:'edit-class',
            query:{
                id: this.userDataState.child_id,
                schoolId: this.userDataState.school_id
            }
        })
    },
    onInput(checked){
        if(checked){
            axios.get(`/book/MemberChild/top?child_id=${this.$route.query.id}`).then(res=>{
                this.getUserData()
            })
        }
    }
  }
}
</script>
<style scoped>

</style>
