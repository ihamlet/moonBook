<template>
  <div class="list page-padding">
    <van-nav-bar :title="`添加到${$route.query.title}`" fixed :border='false'/>
    <div class="search" v-if='top2bottom'>
      <form action="/">
        <van-search placeholder="请输入姓名/手机号查找" v-model="value" shape='round' show-action @search="onSearch">
          <div class="theme-color" slot="action" @click="onSearch">搜索</div>
          <div class="theme-color" slot="label" @click="show = true">
            {{label}}
          </div>
        </van-search>
      </form>
    </div>
    <div class="container" :style="{paddingTop:top2bottom?'95px':'45px'}">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <div class="list" v-if='list.length'>
            <userCard v-if='$route.query.pageType == "teacher"&&item.user_id > 0' v-for='(item,index) in list' :item='item' :key="index" :isBtnShow='false' type='list' @selectTeacher="addTeacher"/>
            <studentCard v-if='$route.query.pageType == "students"' v-for='(item,index) in list' :key="index" :selectShow='true' :item='item' :isBtnShow='false' @electChild='selectSwitch' />
          </div>
          <div class="no-list" v-else>
            尚无成员
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />

    <transition enter-active-class="bounceInUp animated" leave-active-class="bounceOutDown animated" mode="out-in">
      <van-button round class="theme-btn boss-key" type="primary" v-if='selectChilds.length' @click="changeShift">选择添加</van-button>
    </transition>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import studentCard from './../../module/user/studentCard'
import userCard from './../../module/user/userCard'
import { selection,watchTouch } from './../../../components/lib/js/mixin'

export default {
  name: 'student-list',
  mixins: [selection,watchTouch],
  components: {
    studentCard,
    userCard
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      selectBtnLoading: false,
      list: [],
      value: '',
      show: false,
      actions: [
        { name: '全部' },
        { name: '已审核' },
        { name: '待审核' }
      ],
      label: '全部'
    }
  },
  watch: {
    value() {
      this.list = []
      this.onSearch()
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          page: this.page,
          keyword: this.value,
          sort: 'banji_id'
        }
      }
      
      switch(this.$route.query.pageType){
        case 'teacher':
          switch (this.label) {
            case '已审核':
              data.params.is_confirm = 1
              break
            case '待审核':
              data.params.is_confirm = 0
              break
          }
          break
        case 'students':
          switch (this.label) {
            case '已审核':
              data.params.is_banji_confirm = 1
              break
            case '待审核':
              data.params.is_banji_confirm = 0
              break
          }
          break
      }


      return axios.get(`/SchoolManage/${this.$route.query.pageType}/getList`, data).then(res => {
        switch (res.data.status) {
          case 1:
            if (this.page == 1) {
              this.list = res.data.data
            } else {
              this.list = this.list.concat(res.data.data)
            }

            this.page++
            this.loading = false

            if (this.list.length >= res.data.count) {
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
    onSearch() {
      this.onRefresh()
    },
    onSelect(item) {
      this.show = false
      this.label = item.name
      this.onRefresh()
    },
    changeShift() {
      let arr = []
      let names = []

      this.selectChilds.forEach(e => {
        arr.push(e.id)
        names.push(e.name)
      })

      let msg = {
        loading: `添加中...`,
        confirm: `您确定要将${names}添加到${this.$route.query.title}吗?`
      }

      let data = {
        params: {
          id: arr,
          banji_id: this.$route.query.banji_id
        }
      }

      this.$dialog.confirm({
        message: msg.confirm
      }).then(() => {
        this.selectBtnLoading = true

        let toast = this.$toast.loading({
          forbidClick: true,
          message: msg.loading
        })

        axios.get('/SchoolManage/students/transmit', data).then(res => {
          this.selectBtnLoading = false
          toast.clear()
          this.$toast(`添加了${arr.length}条记录`)
          this.onRefresh()
          this.$router.go(-1)
        })
      }).catch(() => {

      })
    },
    addTeacher(item){
      this.$dialog.confirm({
          message: `您确定要添加${item.username}做为${this.$route.query.title}的班级老师吗?`
      }).then(() => {
          this.loading = true
          axios.post('/SchoolManage/teacher/edit',{
            ...item,
            banji_id: this.$route.query.banji_id,
            banji_name: this.$route.query.title
          }).then(res=>{
              this.loading = false
              switch(res.data.status){
                  case 1:
                      this.$toast.success(res.data.msg)
                      this.$router.go(-1)
                      break
                  default:
                      this.$toast(res.data.msg)
              }
          })
      }).catch(() => {
          // on cancel
      })
    }
  }
}
</script>
<style scoped>
.search {
  position: fixed;
  top: 45px;
  width: 100%;
  z-index: 99;
}
</style>
