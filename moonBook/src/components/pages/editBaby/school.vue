<template>
  <div class="edit-school">
    <div class="fixed">
      <van-nav-bar title="选择学校" left-text="返回" left-arrow @click-left="close" />
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
import axios from './../../lib/js/api'

import { mapGetters,mapActions } from 'vuex'
import avatar from './../../module/avatar'
import searchBar from './../../module/search/searchBar'
import schoolList from './../../module/search/schoolList'

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
    ...mapActions(['getSchoolList']),
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
      console.log(item.cityname)
      let cityname = ''
      if(item.cityname){
          cityname = item.cityname
      }else{
        let match = item.district.match(/省(.*?)市/)
        cityname = match ? match[1] + '市' : ''
      }

      let location = item.location.split(',')
      axios.get(`/book/babySchool/bind?school_name=${item.name}&amap_id=${item.id}&cityname=${cityname}&lat=${location[1]}&lng=${location[0]}&child_id=${this.$route.query.id}`).then(res => {
          if(res.data.data.status){
            this.$toast.success(res.data.data.msg)
            this.$router.push({
                name:'edit-class',
                query:{
                    id: this.$route.query.id,
                    schoolId: res.data.data.school_id
                }
            })
          }else{
            this.$toast.fail(res.data.data.msg)
            this.$router.go(-1)
          }
      })
    },
    close(){
        this.$router.go(-1)
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
