<template>
    <div class="baby-setting">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-cell-group>
            <div class="form-title">修改校园信息</div>
            <van-field input-align='right' readonly center label="修改学校" v-model="setting.babySchool" placeholder="请选择学校" @click="showSchoolList = true" icon="question" @click-icon="$toast('设置孩子学校，将可以同步同班信息！')"/>
            <van-field input-align='right' readonly center label="修改班级" v-model="setting.babyClass" placeholder="请选择班级" :disabled='isSelectClass' @click="showClassList = true" icon="question" @click-icon="$toast('您需要选择学校后才可选择班级')"/>
        </van-cell-group>

        <van-cell-group class="theme-switch">
            <div class="form-title">基本设置</div>
            <van-switch-cell v-model="setting.current" title="设为当前宝贝" />
            <van-switch-cell v-model="setting.public" title="公开宝贝主页" />
        </van-cell-group>

        <van-popup v-model="showSchoolList" class="page-popup" position="bottom">
            <add-school :prompt='prompt' pageType='popup' @select='selectSchool' @close="showSchoolList = false"/>
        </van-popup>

        <van-popup v-model="showClassList" class="page-popup" position="bottom">
          <add-class @close='showClassList = false' :babyId='$route.query.id' type='select' @select='selectClass' />
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import addSchool from './../addSchool'
import addClass from './../addClass'

export default {
  name: 'baby-setting',
  components: {
    addSchool,
    addClass
  },
  data() {
    return {
      showSchoolList: false,
      showClassList: false,
      isSelectClass: true,
      prompt: '搜索学校名称/拼音',
      child:'',
      setting: {
        current: false,
        public: false,
        babyClass: '',
        babySchool: '',
      },
      interactive:{

      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    setting:{
      handler(val){
        axios.put('/api/childSetting',{
            id: this.$route.query.id,
            setting:val
        }).then(res=>{
          this.setting.babySchool = res.data.child.school
          this.$emit('setting',res.data.child)
        })
        
        if(val.babySchool){
          this.isSelectClass = false
        }
      },
      deep: true
    },
    $route: 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {
      axios.put('/api/ChildInfo', {
        id: this.$route.query.id
      }).then(res => {
        this.child = res.data.child
        this.setting.babySchool = res.data.child.school
        if(res.data.child.class){
          this.setting.babyClass = res.data.child.class.name
        }
        this.setting.current = res.data.child.setting.current
        this.setting.public = res.data.child.setting.public
      })
    },
    onClickLeft() {
      this.$emit('close')
    },
    selectClass(Class){
      this.showClassList = false
      this.setting.babyClass = Class.name
    },
    selectSchool(school) {
      this.showSchoolList = false
      this.setting.babySchool = school.name
    }
  }
}
</script>
<style scoped>

</style>
