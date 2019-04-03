<template>
  <div class="edit-school">
    <div class="fixed">
      <van-search placeholder="请输入学校名称" v-model="keyword" show-action shape="round" @search="onSearch">
          <div class="theme-color" slot="action" @click="onSearch">
            搜索
          </div>
      </van-search>
    </div>
    <div class="container" v-if='!isListShow'>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" is-link center @click="selectSchool(item)">
          <schoolCard :item='item' :searchType='searchType'/>
        </van-cell>
      </van-list>
    </div>

    <div class="add-school">
      <div class="fx-box flex flex-align">
        <div class="theme-color">没有你所在的学校？</div>
        <van-button class="theme-btn" type="primary" size='small' @click="show = true">添加学校</van-button>
      </div>
    </div>

    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose">
      <div class="dialog-title">添加学校</div>
      <van-cell-group>
        <van-field v-model="schoolName" label="学校名称" placeholder="请输入学校名称" input-align='right' />
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
    </van-dialog>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import avatar from './../module/avatar'
import schoolCard from './../module/search/schoolCard'

export default {
  name: 'edit-school',
  components: {
    schoolCard,
    avatar
  },
  computed: {
    ...mapGetters(['userPointState', 'userPointState']),
  },
  data() {
    return {
      isListShow: false,
      page: 1,
      loading: false,
      finished: false,
      list: [],
      keyword:'',
      searchType:'wmSearchSchool',
      schoolName: '',
      show: false,
      schoolTypeIndex: 0,
      schoolType: '小学',
      shcoolType: [{
        name: '小学',
        index: 0,
      }, {
        name: '幼儿园',
        index: 1
      }]
    }
  },
  watch: {
    keyword(val){
      this.page = 1
      this.list = []
      this.onSearch(val)
    }
  },
  methods: {
    ...mapActions(['getSchoolList', 'getUserData','getSearch']),
    onLoad() {
      let arr = this.userPointState.location.split(",")
      let products = {
        page: this.page,
        location: this.userPointState.location,
        lng: arr[0],
        lat: arr[1]
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
          city:this.userPointState.city
        }

        axios.post('/book/school/edit_school', data).then(res => {
          switch (res.data.status) {
            case 1:
                let bindData = {
                  params:{
                    child_id:this.$route.query.id,
                    school_id:res.data.data.school_id
                  }
                }

              if (this.$route.query.registerType == 'headmaster') {
                bindData.params.is_master = 1
              }

              if(this.$route.query.registerType){
                this.thearchJoin(bindData)
              }else{
                this.babyJoin(bindData)
              }
              done()
              break
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
      if (item.school_id > '0') {
        data = {
          params: {
            school_id: item.school_id,
            school_name: item.title,
            cityname: this.userPointState.city,
            lat: item.lat,
            lng: item.lng,
            amap_id: item.amap_id,
            typecode: item.typecode
          }
        }
      } else {
        let cityname = ''
        if (item.cityname) {
          cityname = item.cityname
        } else {
          let match = item.district.match(/省(.*?)市/)
          cityname = match ? match[1] + '市' : ''
        }

        let location = item.location.split(',')

        data = {
          params: {
            school_name: item.name,
            amap_id: item.id,
            lat: location[1],
            lng: location[0],
            cityname: cityname || '',
            typecode: item.typecode
          }
        }
      }

      if (this.$route.query.registerType == 'headmaster') {
        data.params.is_master = 1
      }

      if (this.$route.query.registerType) {
        this.thearchJoin(data)
      } else {
        data.params.child_id = this.$route.query.id
        this.babyJoin(data)
      }
    },
    thearchJoin(data){
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
                type: this.$route.query.type
              }
            })
          }
        })
    },
    babyJoin(data){
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
      this.schoolType = item.name
      this.schoolTypeIndex = index
    },
    onSearch(keyword){
      if(keyword){
        let arr = this.userPointState.location.split(",")

        let data = {
          keywords: keyword,
          location: this.userPointState.location,
          city: this.userPointState.city,
          type: '141204|141203',
          datatype:'poi',
          lng: arr[0],
          lat: arr[1]
        }
  
        this.getSearch(data).then(res=>{
          if(res.resData.length){
            this.searchType = res.searchType
            this.list = res.resData
          }else{
            this.page = 1
            this.onLoad()
          }
        })
      }else{
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
