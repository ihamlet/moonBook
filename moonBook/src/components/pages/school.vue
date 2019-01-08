<template>
  <div class="edit-school">
    <div class="fixed">
      <van-nav-bar title="选择学校" left-arrow @click-left="close" />
      <search-bar :prompt='prompt' @show='isListShow = true' />
    </div>
    <div class="container" v-if='!isListShow'>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" is-link center @click="selectSchool(item)">
          <div class="school-name" v-line-clamp:20="1">{{item.name}}</div>
          <div class="school-address" v-line-clamp:20="1">
            <span>{{item.adname}}</span>
            <span v-if='item.address.length!=0'>{{item.address}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
    <van-popup v-model="isListShow" class="page-popup" :overlay="false">
      <school-list :prompt='prompt' @close='isListShow = false' @select='selectSchool' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import avatar from './../module/avatar'
import searchBar from './../module/search/searchBar'
import schoolList from './../module/search/schoolList'

export default {
  name: 'edit-school',
  components: {
    searchBar,
    schoolList,
    avatar
  },
  computed: {
    ...mapGetters(['userPointState']),
  },
  data() {
    return {
      isListShow: false,
      page: 0,
      loading: false,
      finished: false,
      list: [],
      prompt: '搜索学校/拼音'
    }
  },
  methods: {
    ...mapActions(['getSchoolList', 'getUserData']),
    onLoad() {
      this.page++
      let products = {
        page: this.page,
        location: this.userPointState.location
      }
      this.getSchoolList(products).then(res => {
        this.list = this.list.concat(res.pois)
        this.loading = false
        if (this.list.length >= res.count) {
          this.finished = true
        }
      })
    },
    selectSchool(item) {
      let cityname = ''
      if (item.cityname) {
        cityname = item.cityname
      } else {
        let match = item.district.match(/省(.*?)市/)
        cityname = match ? match[1] + '市' : ''
      }

      let location = item.location.split(',')

      let data = {
        params: {
          school_name: item.name,
          amap_id: item.id,
          lat: location[1],
          lng: location[0],
          cityname: cityname,
          typecode: item.typecode
        }
      }

      if (this.$route.query.registerType == 'headmaster') {
        data.params.is_master = 1
      }

      if (this.$route.query.registerType) {
        axios.get('/book/SchoolTeacher/bind', data).then(res => {
          if (this.$route.query.registerType == 'teacher') {
            this.$router.push({
              name: 'edit-class',
              query: {
                id: this.$route.query.id,
                schoolId: res.data.data.school_id,
                pageTitle: this.$route.query.pageTitle,
                registerType: this.$route.query.registerType,
                back: this.$route.query.back,
                type: this.$route.query.type
              }
            })
          } else {
            this.$router.push({
              name: 'edit-setting',
              query: {
                pageTitle: this.$route.query.pageTitle,
                registerType: this.$route.query.registerType
              }
            })
          }
        })
      } else {
        data.params.child_id = this.$route.query.id
        axios.get('/book/babySchool/bind', data).then(res => {
          if (res.data.status) {
            this.$toast.success('已加入学校')
            this.$router.push({
              name: 'edit-class',
              query: {
                id: this.$route.query.id,
                schoolId: res.data.data.school_id,
                back: this.$route.query.back,
                type: this.$route.query.type,
              }
            })
            this.getUserData()
          } else {
            this.$toast.fail('操作失败')
            this.$router.go(-1)
          }
        })
      }
    },
    close() {
      if (this.$route.query.enter) {
        this.$router.push({
          name: this.$route.query.enter
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style scoped>
.fixed {
  position: fixed;
  z-index: 1001;
  width: 100%;
}

.container {
  padding-top: 5.625rem /* 90/16 */;
}
</style>
