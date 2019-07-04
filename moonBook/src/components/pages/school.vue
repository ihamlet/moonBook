<template>
  <div class="edit-school">
    <div class="fixed">
      <form action="/">
        <van-search placeholder="请输入学校名称" v-model="keyword" show-action shape="round" @search="onSearch">
          <div class="theme-color" slot="action" @click="onSearch">
            搜索
          </div>
        </van-search>
      </form>
    </div>
    <div class="container" v-if='!isListShow'>

      <van-cell-group>
        <van-cell>
          <div class="flex flex-align type-select">
            <div class="school-type">学校类型</div>
            <div class="select-type flex flex-align">
              <div class="select-btn" v-for='(item,index) in shcoolType' :key="index" @click="selectSchoolType(item,index)">
                <van-button size="small" class="theme-btn" type="primary" :plain='schoolTypeIndex==index?false:true' round>{{item.name}}</van-button>
              </div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>

      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" is-link center @click="selectSchool(item)">
          <schoolCard :item='item' :searchType='item.school_id > 0 ? "wmSearchSchool":"amapSearchSchool"'/>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import schoolCard from './../module/search/schoolCard'

export default {
  name: 'edit-school',
  components: {
    schoolCard
  },
  computed: {
    ...mapGetters(['userPointState']),
  },
  data() {
    return {
      isListShow: false,
      page: 1,
      loading: false,
      finished: false,
      list: [],
      keyword: '',
      schoolName: '',
      show: false,
      schoolTypeIndex: 0,
      type:'幼儿园',
      shcoolType: [{
        name: '幼儿园',
        index: 0,
      }, {
        name: '小学',
        index: 1
      }],
      tab: [{
        title: '小学',
        content: ''
      }, {
        title: '幼儿园',
        content: ''
      }]
    }
  },
  watch: {
    keyword(val) {
      this.page = 1
      this.list = []
      this.onSearch(val)
    }
  },
  methods: {
    ...mapActions(['getSchoolList', 'getUserData', 'getSearch']),
    onLoad() {
      let arr = this.userPointState.location.split(",")
      let products = {
        page: this.page,
        location: this.userPointState.location,
        lng: arr[0],
        lat: arr[1],
        school_type: this.type
      }

      this.getSchoolList(products).then(res => {
        if (res.data.length) {
          this.list = this.list.concat(res.data)
          this.loading = false
          this.page++
          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        } else {
          this.page = 1
          this.loading = false
          this.finished = true
        }
      })
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        let data = {
          title: this.schoolName,
          school_type: this.schoolType,
          city: this.userPointState.city
        }

        axios.post('/book/school/edit_school', data).then(res => {
          switch (res.data.status) {
            case 1:{
              let bindData = {
                params: {
                  child_id: this.$route.query.id,
                  school_id: res.data.data.school_id
                }
              }

              if (this.$route.query.registerType == 'headmaster') {
                bindData.params.is_master = 1
              }

              if (this.$route.query.registerType) {
                this.thearchJoin(bindData)
              } else {
                this.babyJoin(bindData)
              }
              done()
              break
            }
            case 0:
              this.$toast(res.data.msg)
              done()
              break

          }
        })
      } else {
        done()
      }
    },
    selectSchool(item) {
      let data
      if (item.school_id > 0) {
        data = {
           ...this.$route.query,
          school_id: item.school_id,
          school_name: item.title,
          cityname: this.userPointState.city,
          lat: item.lat,
          lng: item.lng,
          amap_id: item.amap_id,
          typecode: item.typecode
        }
      } else {
        let cityname = ''
        if (item.cityname) {
          cityname = item.cityname
        } else {
          let match = item.district.match(/省(.*?)市/)
          cityname = match ? match[1] + '市' : ''
        }
        
        data = {
           ...this.$route.query,
          school_name: item.name,
          amap_id: item.id,
          lat: item.lat,
          lng: item.lng,
          cityname: cityname || '',
          typecode: item.typecode
        }
      }

      if (this.$route.query.registerType == 'headmaster') {
        data.is_master = 1,
        this.$router.replace({
          name:'edit-manager',
          query: data
        })
      }else{ 
       this.$router.replace({
          name:'edit-class',
          query: data
        })
      }
    },
    thearchJoin(data) {
      axios.get('/book/SchoolTeacher/bind', data).then(res => {
        if (this.$route.query.registerType == 'teacher') {
          this.$router.replace({
            name: 'edit-class',
            query: {
              id: this.$route.query.id,
              school_id: res.data.data.school_id,
              pageTitle: this.$route.query.pageTitle,
              registerType: this.$route.query.registerType,
              back: this.$route.query.back,
              type: this.$route.query.type
            }
          })
        } else {
          this.$router.replace({
            name: 'edit-manager',
            query: {
              pageTitle: this.$route.query.pageTitle,
              registerType: this.$route.query.registerType,
              type: this.$route.query.type,
              back: this.$route.name
            }
          })
        }
      })
    },
    babyJoin(data) {
      axios.get('/book/babySchool/bind', data).then(res => {
        if (res.data.status) {
          this.$toast.success('加入学校成功')
          this.$router.push({
            name: 'edit-class',
            query: {
              id: this.$route.query.id,
              school_id: res.data.data.school_id,
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
    },
    selectSchoolType(item, index) {
      this.type = item.name
      this.schoolTypeIndex = index
      this.page = 1
      this.list = []
      this.onLoad()
    },
    onSearch(keyword) {
      if (keyword) {
        let arr = this.userPointState.location.split(",")

        let data = {
          keywords: keyword,
          location: this.userPointState.location,
          city: this.userPointState.city,
          type: this.schoolTypeIndex == 0?141204:141203,
          datatype: 'poi',
          lng: arr[0],
          lat: arr[1]
        }

        this.getSearch(data).then(res => {
          if (res.resData) {
            this.page = 1
            this.list = res.resData
          } else {
            this.page = 1
            this.onLoad()
          }
        })
      } else {
        this.page = 1
        this.onLoad()
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
  padding-top: 54px;
}

.edit-school {
  padding-bottom: 7.5rem /* 120/16 */;
}
</style>
