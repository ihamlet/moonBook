<template>
  <div class="personnel">
    <van-cell-group :border='false'>
      <van-cell-group>
        <van-cell title="学校通知" value="发布" size="large" is-link :border='false' @click="notification">
          <div class="iconfont cell-icon icon-notice jackInTheBox animated" slot="icon">&#xe672;</div>
        </van-cell>
        <van-cell title="各班待审核的人员" is-link @click="toBanjiTree">
          <van-tag round type="success" size="medium" v-if='studentCount > 0'> {{studentCount}}人 </van-tag>
        </van-cell>
      </van-cell-group>
    </van-cell-group>
    <van-pull-refresh v-model="loading" @refresh="onRefresh" :disabled='drag'>
      <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
        <draggable v-model="teacherList" @update="datadragEnd" :options="{animation:500}" :disabled="!drag" handle=".info">
          <transition-group>
            <div class="user-card flex flex-align" v-for='item in teacherList' :key='item.id'>
              <userCard :item='item' v-if='item.user_id > 0' @statusChange='setStutas' />
            </div>
          </transition-group>
        </draggable>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../components/lib/js/api'
import userCard from './user/userCard'
import draggable from 'vuedraggable'
import { mapGetters,mapMutations } from 'vuex'

export default {
  name: 'personnel',
  props: ['drag','studentCount'],
  components: {
      userCard,
      draggable
  },
  computed: {
    ...mapGetters('manage',['manageSchoolInfo'])  
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      teacherList: [],
    }
  },
  methods: {
    ...mapMutations('articleSetting',['setTag']),
    toBanjiTree() {
      this.$router.push({
        name: 'banjiTree',
        query: {
          school_id: this.manageSchoolInfo.school_id,
          year: this.classYear
        }
      })
    },
    onLoad() {

      let data = {
        params: {
          page: this.page,
          school_id: this.manageSchoolInfo.school_id
        }
      }

      return axios.get('/SchoolManage/teacher/getList', data).then(res => {
        switch (res.data.status) {
          case 1:
            if (this.page == 1) {
              this.teacherList = res.data.data
            } else {
              this.teacherList = this.teacherList.concat(res.data.data)
            }

            this.page++
            this.loading = false

            if (this.teacherList.length >= res.data.count) {
              this.finished = true
            }

            break
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
        this.finished = false
      })
    },
    datadragEnd(){
      this.teacherList.map((e,i)=>{
          e.school_index = i
          return e
      })
    },
    submitSort(){
      axios.post('/SchoolManage/Teacher/setIndex',this.teacherList).then(()=>{})
    },
    setStutas(id,type){
      this.teacherList.map(e=>{
        if(e.id == id){
          return e.is_confirm  = type == 'check'?1:0
        }
      })
      this.$emit('getCount')
    },
    notification(){      
      this.setTag({
        portal_name:"学校主页",
        cate_id: 99,
        cate_name:"学校通知"
      })

      this.$router.push({
        name:'graphic',
        query:{
          pageType:'notice',
          banji_id: '',
          school_id: this.manageSchoolInfo.school_id,
          title:'发布通知到学校'
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
