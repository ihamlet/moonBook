<template>
  <div class="baby-setting">
    <van-nav-bar title="设置学校" :border='false'/>
    <van-cell-group>
      <van-cell is-link center title='学校' size='large' :label='setting.settingSchool' value='选择学校'  @click="toSelectSchool" />
      <van-cell is-link center title='班级' size='large' v-if='$route.query.registerType!="headmaster"' :label='setting.settingClass' value='选择班级'  @click="toSelectClass" />
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
      this.setting.settingClass = this.$route.query.banji_name
      this.setting.settingSchool = this.$route.query.school_name
    },
    toSelectSchool() {
      this.$router.replace({
        name: 'edit-school',
        query: {
          back: this.$route.name,
          ...this.$route.query
        }
      })     
    },
    toSelectClass() {
      if(this.$route.query.school_id > 0){
        this.$router.replace({
          name: 'edit-class',
          query: {
            back: this.$route.name,
            ...this.$route.query
          }
        })
      }else{
        this.$toast.fail('请选择学校')
      }
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
