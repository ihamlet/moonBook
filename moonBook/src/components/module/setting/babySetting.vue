<template>
    <div class="baby-setting">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />

        <van-cell-group>
            <div class="form-title">修改校园信息</div>
            <van-field v-model="babyClass" input-align='right' readonly center label="修改班级" placeholder="请选择班级" />
            <van-field v-model="babySchool" input-align='right' readonly center label="修改学校" :placeholder="school" @click="showSchoolList = true" />
        </van-cell-group>

        <van-cell-group class="theme-switch">
            <div class="form-title">基本设置</div>
            <van-switch-cell v-model="setting.current" title="设为当前宝贝" />
            <van-switch-cell v-model="setting.public" title="公开宝贝主页" />
            <van-switch-cell v-model="setting.synchronous" title="同步发布内容" />
        </van-cell-group>

        <van-popup v-model="showSchoolList" class="page-popup" position="bottom">
            <van-nav-bar class="sticky" title="选择学校" left-text="返回" left-arrow @click-left="showSchoolList = false" />
            <add-school :prompt='prompt' pageType='popup' @select='selectSchool'/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import addSchool from './../addSchool'

export default {
  name: 'baby-setting',
  components: {
    addSchool
  },
  computed: {
    ...mapGetters(['userDataState']),
    school() {
      if (this.childInfo.regInfo) {
        return this.childInfo.regInfo.school
      } else if (this.userDataState.vipInfo) {
        return this.userDataState.vipInfo.school
      } else {
        return '请选择学校'
      }
    }
  },
  data() {
    return {
      showSchoolList: false,
      prompt: '搜索学校名称/拼音',
      babyClass: '',
      babySchool: '',
      childInfo: '',
      setting: {
        current: false,
        public: false,
        synchronous: false
      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      axios.put('/api/ChildInfo', {
        id: this.$route.query.id
      }).then(res => {
        this.child = res.data.child
        this.setting = res.data.child.setting
      })
    },
    onClickLeft() {
      this.$emit('close')
    },
    selectSchool(school) {
      this.showSchoolList = false
      this.babySchool = school.name
    }
  }
}
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0;
}
</style>
