<template>
  <div class="banji-edit page-padding">
    <van-nav-bar :title="$route.query.pageTitle" :border='false' fixed :zIndex='99'>
      <van-button class="theme-btn" round type="primary" size="small" slot='right' @click="sumbit" :loading='isBtnLoading'
        loading-text='提交中...'> {{$route.query.pageType == 'add'&&form.banji_id > 0?'创建':'提交'}} </van-button>
    </van-nav-bar>
    <div class="container">
      <van-cell-group>
        <van-field label="班级名称" size='large' required v-model="form.title" placeholder="请输入班级名称" input-align='right' :border='false'/>
        <van-field label="班级类型" size='large' required readonly v-model="form.grade_name" placeholder="请选择班级类型"
          input-align='right' @click="onClickPickerShow('type')" :border='false'/>
        <van-field label="班级邀请码" size='large' required v-model="form.invite_code" placeholder="请输入四位数字班级邀请码"
          input-align='right' :border='false'/>
        <van-field label="班级年份" size='large' required readonly v-model="form.year" placeholder="请选择班级年份" input-align='right'
          @click="onClickPickerShow('year')" :border='false'/>
      </van-cell-group>

      <div class="no-list" v-if='!form.banji_id'>
        请在创建班级成功后添加老师和学生
      </div>
      <van-pull-refresh v-model="loading" @refresh="onRefresh" v-else>
        <div class="list">
          <van-collapse v-model="activeNames" :border='false'>
            <van-collapse-item class="collapse-item" name="teacher" :border='false'>
              <div class="collapse-title flex flex-align" slot='title'>老师</div>
              <van-cell title="班级通知" value="发布" size="large" is-link @click="notification">
                <div class="iconfont cell-icon icon-notice jackInTheBox animated" slot="icon">&#xe672;</div>
              </van-cell>
              <van-cell title='阅读数据' value="查看" size="large" is-link :border='false' @click="toReadData" v-if='form.banji_id > 0'>
                <div class="iconfont cell-icon icon-data jackInTheBox animated" slot="icon">&#xe61d;</div>
              </van-cell>
              <div class="teacher-list" v-if='teacherList.length'>
                <van-cell v-if='teacherList.length'>
                  <div class="list-cell flex flex-align">
                    <div class="invite-code">
                      添加老师
                    </div>
                    <div class="btn-list flex flex-align">
                      <div class="add theme-color" @click="toList('teacher')">添加</div>
                      <div class="share theme-color" @click="toShare('teacher')">邀请</div>
                    </div>
                  </div>
                </van-cell>
                <van-swipe-cell :right-width="80" v-for='(item,index) in teacherList' :key="index">
                  <userCard :item='item' v-if='item.user_id > 0' type='list' />
                  <div class="swipe-cell-right" slot="right" @click="outTeacher(item)">
                    <span class="out-text">请出老师</span>
                  </div>
                </van-swipe-cell>
              </div>
              <div class="not-content" v-else>
                您可以：<span class="theme-color" @click="toList('teacher')">添加老师</span>或是<span class="theme-color" @click="toShare('teacher')">邀请老师</span>
              </div>
            </van-collapse-item>
            <van-collapse-item class="collapse-item" name="student" :border='false'>
              <div class="collapse-title flex flex-align" slot='title'>学生 <van-tag class="tag" round type="success"
                  size="medium" v-if='count > 0'>{{count}}人</van-tag>
              </div>
              <div class="student-list">
                <van-cell v-if='studentList.length'>
                  <div class="list-cell flex flex-align">
                    <div class="invite-code">
                      邀请码 {{form.invite_code}}
                    </div>
                    <div class="btn-list flex flex-align">
                      <div class="add theme-color" @click="toList('students')">添加</div>
                      <div class="share theme-color" @click="toShare('students')">邀请</div>
                    </div>
                  </div>
                </van-cell>

                <form action="/" v-if='count > 0'>
                  <van-search v-model="value" placeholder="请输入姓名或手机号" shape='round' @search="onSearch">
                    <div class="label theme-color" slot="label" @click="selectLabel">
                      {{searchLabel}}
                    </div>
                  </van-search>
                </form>

                <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                  <div class="list-container" v-if='studentList.length'>
                    <studentCard v-for='(item,index) in studentList' :key="index" :item='item' />
                  </div>
                  <div class="no-list" v-else>
                    您可以：<span class="theme-color" @click="toList('students')">添加学生</span>或是<span class="theme-color" @click="toShare('students')">邀请学生</span>
                  </div>
                </van-list>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-pull-refresh>
    </div>
   
    <van-popup v-model="show" position="bottom">
      <van-picker :title="pickerTitle" :columns="columns" @change="onChange" show-toolbar @cancel="onPickerCancel" @confirm="show = false" :visible-item-count='visibleCount' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import studentCard from './../../module/user/studentCard'
import userCard from './../../module/user/userCard'
import { mapGetters,mapMutations } from 'vuex'
import { newBanjiTitle, getBanjiYear } from './../../../components/lib/js/mixin'

export default {
  name: 'banjiEdit',
  mixins: [newBanjiTitle, getBanjiYear],
  components: {
    studentCard,
    userCard
  },
  computed: {
    ...mapGetters('manage', ['manageSchoolInfo']),
    banjiYearArr() {
      let arr = [this.classYear + 1, this.classYear, this.classYear - 1]
      return arr
    }
  },
  data() {
    return {
      form: {
        ...this.$route.query
      },
      studentList: [],
      teacherList: [],
      activeNames: [],
      loading: false,
      finished: false,
      checkCount: 0,
      count: 0,
      banjiTypeArr: ['大班', '中班', '小班'],
      show: false,
      isBtnLoading: false,
      columns: [],
      pickerType: 'type',
      pickerTitle: '班级类型',
      inviteCode: '',
      value:'',
      visibleCount:3,
      searchLabel:'全部',
      page:1,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData',
    value(){
      this.onSearch()
    }
  },
  methods: {
    ...mapMutations('articleSetting',['setTag']),
    fetchData() {
      this.getTeacherList()
      this.getStudentList()
    },
    getTeacherList() {

      // console.log(111)

      if (this.form.banji_id > 0) {

        this.activeNames.push('teacher')
        axios.get('/SchoolManage/teacher/getList', {
          params: {
            school_id: this.$route.query.school_id,
            banji_id: this.form.banji_id
          }
        }).then(res => {
          switch (res.data.status) {
            case 1:
              this.teacherList = res.data.data
              break
            default:
              this.$toast(res.data.msg)
          }
        })
      }
    },
    getStudentList() {
      if (this.form.banji_id > 0) {

        this.activeNames.push('student')
        axios.get('/SchoolManage/students/getList', {
          params: {
            school_id: this.$route.query.school_id,
            banji_id: this.form.banji_id,
            is_banji_confirm: 0
          }
        }).then(res => {
          switch (res.data.status) {
            case 1:
              this.checkCount = res.data.count
              break
            default:
              this.$toast(res.data.msg)
          }
        })

      }
    },
    onLoad() {
      let data = {
        params: {
          school_id: this.form.school_id,
          banji_id: this.form.banji_id,
          keyword: this.value,
          page: this.page,
          sort: 'confirm'
        }
      }


      switch(this.searchLabel){
        case '已审核':
          data.params.is_banji_confirm = 1
          break
        case '未审核':
          data.params.is_banji_confirm = 0
          break
        case '已办卡':
          data.params.is_card = 1
          break
        case '未办卡':
          data.params.is_card = 0
          break
      }

      return axios.get('/SchoolManage/students/getList', data).then(res => {
        switch (res.data.status) {
          case 1:

            if (this.page == 1) {
              this.studentList = res.data.data
            } else {
              this.studentList = this.studentList.concat(res.data.data)
            }

            this.count = res.data.count

            this.page++
            this.loading = false

            if (this.studentList.length >= res.data.count) {
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
    onChange(picker, value) {
      switch (this.pickerType) {
        case 'type':
          this.form.grade_name = value
          break
        case 'year':
          this.form.year = value
          break
        case 'filter':
          this.searchLabel = value
          this.onSearch()
          break
      }
    },
    onPickerCancel() {
      this.form.grade_name = this.$route.query.grade_name
      this.show = false
    },
    onClickPickerShow(type) {
      this.show = true
      this.pickerType = type
      switch (type) {
        case 'type':
          this.columns = this.banjiTypeArr
          this.pickerTitle = '班级类型'
          break
        case 'year':
          this.columns = this.banjiYearArr
          this.pickerTitle = '班级年份'
          break
      }
    },
    sumbit() {
      let regInvite = /^\d{4}$/
      let regBanjiName = /^([\u2E80-\u9FFF]|[a-zA-Z0-9]){1,10}$/

      if (!this.form.title) {
        this.$toast('请输入班级名称')
      } else if (!this.form.invite_code) {
        this.$toast('请输入四位数字班级邀请码')
      } else if (!regBanjiName.test(this.form.title)) {
        this.$toast('班级名字输入有误(中文、英文、数字且不能包含标点符号和特殊符号)')
      } else if (!this.form.grade_name) {
        this.$toast('请选择班级类型')
      } else if (!regInvite.test(this.form.invite_code)) {
        this.$toast('班级邀请码输入不正确(4位数字)')
      } else {
        this.isBtnLoading = true
        axios.post('/SchoolManage/banji/edit', {
          ...this.form,
          title: this.formatBanjiTitle(this.form.title)
        }).then(res => {
          this.isBtnLoading = false
          switch (res.data.status) {
            case 1:
              this.$toast.success(res.data.msg)
              if (this.$route.query.pageType == 'add') {
                this.form.banji_id = res.data.data.banji_id
                this.form.invite_code = res.data.data.invite_code
                this.getTeacherList(res.data.data.banji_id)
                this.getStudentList(res.data.data.banji_id)
                this.onRefresh()
              } else {
                this.$router.go(-1)
              }
              break
            default:
              this.$toast(res.data.msg)
          }
        })
      }
    },
    toShare(type) {
      switch (type) {
        case 'students':
          this.$router.push({
            name: 'share',
            query: {
              school_id: this.$route.query.school_id,
              school_name: this.$route.query.school_name,
              banji_id: this.form.banji_id,
              banji_name: this.form.title,
              invite_code: this.form.invite_code,
              grade_name: this.form.grade_name,
              year: this.form.year,
              user_id: 0
            }
          })
          break
        case 'teacher':
          this.$router.push({
            name: 'teacherShare',
            query: {
              ...this.form
            }
          })
          break
      }
    },
    toList(type) {
      this.$router.push({
        name: 'List',
        query: {
          ...this.$route.query,
          ...this.form,
          pageType: type
        }
      })
    },
    outTeacher(item) {
      this.$dialog.confirm({
        message: '您确定要请出该老师吗?'
      }).then(() => {
        axios.post('/SchoolManage/teacher/edit', {
          ...item,
          banji_id: 0,
          banji_name: ''
        }).then(res => {
          switch (res.data.status) {
            case 1:
              this.$toast.success(res.data.msg)
              this.getTeacherList()
              break
            default:
              this.$toast(res.data.msg)
          }
        })
      }).catch(() => {

      })
    },
    selectLabel(){
      this.show = true
      this.visibleCount = 5
      this.columns = ['全部','已审核','未审核','已办卡','未办卡']
      this.pickerTitle = '筛选'
      this.pickerType = 'filter'
    },
    onSearch(){
      this.page = 1
      this.studentList = []
      this.onLoad()
    },
    notification(){
      this.setTag({
        portal_name:"班级主页",
        cate_id: 124,
        cate_name:"班级通知"
      })

      this.$router.push({
        name:'graphic',
        query:{
          pageType:'notice',
          banji_name: this.form.title,
          banji_id: this.form.banji_id,
          school_id: this.manageSchoolInfo.school_id,
          title:`发布通知到${this.formatBanjiTitle(this.form.title)}`
        }
      })
    },
    toReadData(){
      this.$router.push({
        name:'readData',
        query:{
          title: '阅读数据',
          banji_id: this.form.banji_id,
          school_id: this.manageSchoolInfo.school_id || this.$route.query.school_id,
          banji_name: this.form.title
        }
      })
    }
  }
}
</script>
<style scoped>
.list {
  margin-top: 2px;
}

.container {
  padding-top: 45px;
}

.tag {
  margin-left: 5px;
}

.list-cell {
  justify-content: space-between;
}

.share {
  margin-left: 20px;
}

.invite-code {
  color: #909399;
}

.swipe-cell-right {
  width: 80px;
  height: 100%;
  background: #f44;
  text-align: center;
  position: relative;
}

.out-text {
  position: absolute;
  color: #fff;
  font-size: 15px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  white-space: nowrap;
}
</style>
