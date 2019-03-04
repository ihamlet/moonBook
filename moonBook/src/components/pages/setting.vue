<template>
  <div class="baby-setting">
    <van-nav-bar title="设置学校" :left-text="$route.query.registerType ?'注册':childName" left-arrow @click-left="onClickLeft" />

    <van-cell-group>
      <div class="form-title">学校设置</div>
      <van-field input-align='right' readonly center label="选择学校" v-model="setting.settingSchool" placeholder="请选择学校"
        @click="toSelectSchool" />
      <van-field input-align='right' v-if='$route.query.registerType!="headmaster"' readonly center label="选择班级"
        v-model="setting.settingClass" placeholder="请选择班级" @click="toSelectClass" />
    </van-cell-group>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'baby-setting',
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      child_id: '',
      school_id: '',
      setting: {
        settingClass: '',
        settingSchool: '',
      },
      childName: ''
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
      if (this.$route.query.registerType) {
        let data

        if (this.$route.query.registerType == 'headmaster') {
          data = {
            params: {
              is_master: 1
            }
          }
        }

        axios.get('/book/SchoolTeacher/getMine', data).then(res => {
          this.setting.settingSchool = res.data.data.school_name
          this.setting.settingClass = res.data.data.banji_name
        })
      } else {
        axios.get(`/book/family/getChildByUser?child_id=${this.$route.query.id}`).then(res => {
          if (res.data.status == 1) {
            this.child_id = res.data.data.id
            this.school_id = res.data.data.school_id
            this.childName = res.data.data.name
            this.setting.settingClass = res.data.data.banji_name
            this.setting.settingSchool = res.data.data.school_name
          }
        })
      }
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: 'edit-child',
          query: {
            id: this.$route.query.id,
            type: this.$route.query.type
          }
        })
      } else {
        if (this.$route.query.registerType) {
          this.$router.push({
            name: 'edit-manager',
            query: {
              pageTitle: this.$route.query.pageTitle,
              registerType: this.$route.query.registerType
            }
          })
        }else{
          this.$router.push({
            name:'my'
          })
        }
      }
    },
    toSelectSchool() {
      this.$router.push({
        name: 'edit-school',
        query: {
          id: this.child_id,
          back: this.$route.name,
          type: this.$route.query.type,
          pageTitle: this.$route.query.pageTitle,
          registerType: this.$route.query.registerType
        }
      })
    },
    toSelectClass() {
      this.$router.push({
        name: 'edit-class',
        query: {
          id: this.child_id,
          school_id: this.school_id,
          back: this.$route.name,
          type: this.$route.query.type,
          pageTitle: this.$route.query.pageTitle,
          registerType: this.$route.query.registerType
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
