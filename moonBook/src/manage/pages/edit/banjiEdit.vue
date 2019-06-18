<template>
  <div class="banji-edit">
    <van-nav-bar :title="$route.query.pageTitle" :border='false'/>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-cell-group>
            <van-field label="班级名称" size='large' required v-model="form.title" placeholder="请输入班级名称" input-align='right'/>
            <van-field label="班级类型" size='large' required readonly v-model="form.grade_name" placeholder="请选择班级类型" is-link input-align='right'/>
            <van-field label="班级邀请码" size='large' required v-model="form.invite_code" placeholder="请输入班级邀请码" input-align='right'/>
        </van-cell-group>
        <div class="list">
            <van-collapse v-model="activeNames" :border='false'>
                <van-collapse-item name="teacher" :border='false'>
                    <div slot="title">老师</div>
                    <div class="teacher-list">
                        
                    </div>
                </van-collapse-item>
                <van-collapse-item title="学生" name="student" :border='false'>
                    <div slot="title">学生 <van-tag round type="danger" size="medium">{{$route.query.student_count}}人</van-tag></div>
                    <div class="student-list">
                        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" :offset='0'>
                            <div class="list-container" v-if='studentList.length'>
                                <studentCard v-for='(item,index) in studentList' :key="index" :item='item'/>
                            </div>
                        </van-list>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import studentCard from './../../module/user/studentCard'

export default {
  name: 'banjiEdit',
  components: {
    studentCard  
  },
  data() {
    return {
      form: {
        ...this.$route.query
      },
      studentList:[],
      teacherList:[],
      activeNames: ['teacher','student'],
      loading: false,
      finished: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
        axios.get('/SchoolManage/teacher/getList',{
            params:{
                banji_id: this.$route.query.banji_id
            }
        }).then(res=>{
            switch (res.data.status) {
              case 1:
                this.teacherList = res.data.data        
                break
              default:
                this.$toast(res.data.msg)
            }
        })
    },
    onLoad(){
      let data = {
        params: {
          school_id: this.$route.query.school_id,
          banji_id: this.$route.query.banji_id,
          page: this.page
        }
      }

     return axios.get('/SchoolManage/students/getList', data).then(res => {
        switch (res.data.status) {
          case 1:

            if(this.page == 1){
              this.studentList = res.data.data
            }else{
              this.studentList = this.studentList.concat(res.data.data)
            }

            this.page++
            this.loading = false

            if(this.studentList.length >= res.data.count){
              this.finished = true
            }
           
            break
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    onRefresh(){
      this.page = 1
      
      this.onLoad().then(()=>{
        this.loading = false
        this.finished = false
      })
    }
  }
}
</script>
<style scoped>
.list{
    margin-top: 10px;
}
</style>
