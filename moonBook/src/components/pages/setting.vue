<template>
  <div class="baby-setting">
    <van-nav-bar title="设置学校" :border='false'/>
    <van-cell-group>
      <van-cell is-link center title='学校' :label='setting.settingSchool' value='选择学校'  @click="toSelectSchool" />
      <van-cell is-link center title='班级' v-if='$route.query.registerType!="headmaster"' :label='setting.settingClass' value='选择班级'  @click="toSelectClass" />
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
          if(res.data.status == 1){
            this.school_id = res.data.data.school_id
            this.setting.settingSchool = res.data.data.school_name
            this.setting.settingClass = this.formatBanjiTitle(res.data.data.banji_name)
          }
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
    toSelectSchool() {
      this.$router.replace({
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
      this.$router.replace({
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
    },
    formatBanjiTitle(text){
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    }
  }
}
</script>
<style scoped>
</style>
