<template>
  <div class="edit-class page-padding">
    <van-nav-bar :border='false' fixed :title="$route.query.registerType=='teacher'?schoolName:childInfo.school_name" left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="baby-info flex flex-justify" v-if='$route.query.registerType!="teacher"'>
        <div class="avatar flex" v-if='childInfo'>
          <img :src="childInfo.avatar" :alt="childInfo.name">
        </div>
        <avatar v-else />
        <div class="name">{{childInfo.name}}（{{childInfo.age}}岁）</div>
        <round class="bg-round" />
      </div>
      <div class="title">请选择班级</div>
      <div class="list">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <div v-for="(item,index) in list" size='large' :key="index" is-link @click='select(item)'>
            <div class="year" v-if='isYearShow(item,index)'>{{item.year}}</div>
            <van-cell is-link>
              <div class="banji-cell flex flex-align">
                <div class="banji-name">
                  {{formatBanjiTitle(item.title)}}
                </div>
                <div class="add-value">
                  {{item.student_count}}人已加入
                </div>
              </div>
            </van-cell>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import avatar from './../module/avatar'
import round from './../module/animate/round'

export default {
  name: 'edit-class',
  components: {
    avatar,
    round
  },
  computed: {
    ...mapGetters(["userDataState"])
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      childInfo: '',
      schoolName: ''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {
      if (this.$route.query.registerType) {
        axios.get('/book/SchoolTeacher/getMine').then(res => {
          if(res.data.status == 1){
            this.schoolName = res.data.data.school_name
          }
        })
      } else {
        axios.get(`/book/family/getChildByUser?child_id=${this.$route.query.id}`).then(res => {
          if (res.data.status == 1) {
            this.childInfo = res.data.data
          }
        })
      }
    },
    onClickLeft() {
      if(this.$route.query.back && this.userDataState.banji_id != '0'){
        this.$router.push({
          name: this.$route.query.back,
          query:{
            id: this.$route.query.id,
            school_id: this.$route.query.school_id,
            pageTitle: this.$route.query.pageTitle,
            type: this.$route.query.type
          }
        })
      }else{
        this.$router.push({
          name:'my'
        })
      }
    },
    select(item, itemIndex) {
      if (this.$route.query.registerType == 'teacher') {
        axios.get(`/book/SchoolTeacher/bind_banji?banji_name=${item.title}`).then(res => {
          if(res.data.status == 1){
            this.$router.push({
              name: 'edit-setting',
              query: {
                registerType: 'teacher',
                pageTitle: this.$route.query.pageTitle
              }
            })
          }
        })
      } else {
        axios.get(`/book/babyBanji/bind?banji_name=${item.title}&child_id=${this.$route.query.id}`).then(res => {
          if (res.data.status == 1) {
            if (this.$route.query.back) {
              this.$router.push({
                name: 'edit-child',
                query: {
                  id: this.$route.query.id,
                  type: this.$route.query.type
                }
              })
            } else {
              this.$toast.success(res.data.msg)
              this.$router.push({
                name: 'class-home',
                query: {
                  id: res.data.data.banji_id
                }
              })
              this.getUserData()
            }
          } else {
            this.$toast.fail('加入失败')
            this.$router.push({
              name: 'my'
            })
          }
        })
      }
    },
    onLoad() {
      let data = {
        params: {
          page: this.page,
          limit: 20,
          school_id: this.$route.query.school_id
        }
      }
      axios.get(`/book/SchoolBanji/getList`, data).then(res => {
        if(res.data.status) {
          this.page++
          this.list = this.list.concat(res.data.data)
          this.loading = false
          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        }
      })
    },
    formatBanjiTitle(text){
      if(text&&text.indexOf('班') == -1){
        return text + '班'
      }else{
        return text 
      }
    },
    isYearShow(item,index){
      let yearHistory
      if( index > 0){
        yearHistory = this.list[index-1].year
      }

      if(item.year == yearHistory){
        return false
      }else{
        return true
      }
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  height: 3.75rem /* 60/16 */;
  line-height: 5rem /* 80/16 */;
  background: #fff;
}

.container {
  padding-top: 2.8125rem /* 45/16 */;
}

.class-title {
  width: 100%;
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  text-align: center;
  margin-bottom: 0.625rem /* 10/16 */;
}

.baby-info {
  display: grid;
  padding: 0.625rem /* 10/16 */ 0 1.875rem /* 30/16 */ 0;
  position: relative;
}

.baby-info .avatar img{
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 1.25rem /* 20/16 */ auto 0 auto;
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.avatar img {
  border-radius: 50%;
}

.name {
  text-align: center;
  margin-top: 0.625rem /* 10/16 */;
  color: #000;
}

.age {
  text-align: center;
}

.select {
  width: 6.875rem /* 110/16 */;
  padding: 0.3125rem /* 5/16 */ 0;
  margin: 0 auto;
  text-align: center;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 0.5rem /* 8/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
  display: grid;
  overflow: hidden;
  background: #fff;
}

.select .people {
  font-size: 0.8125rem /* 13/16 */;
  height: 1.5rem /* 24/16 */;
  line-height: 1.5rem /* 24/16 */;
  color: #909399;
}

.bg-round {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.banji-cell{
  justify-content: space-between;
}

.year{
  text-align: center;
  background: #fff;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
}
</style>
