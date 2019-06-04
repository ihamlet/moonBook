<template>
  <div class="notice swing animated" v-if='notice.length!=0'>
    <van-nav-bar :border='false' :key="$route.query.id">
      <div class="left-bar-title" slot='left'>
        <i class="iconfont">&#xe802;</i>
        班级通知
      </div>
      <div class="icon-title" slot='title'>
        <div class="thumbtack theme-background"></div>
      </div>
    </van-nav-bar>
    <van-cell>
      <graphicCard :item='notice[0]' :moreBtn='false' type='notice' title='信息老师' />
      <readList :list='readList' v-if='readList.length'/>
    </van-cell>

    <!-- 通知弹窗 -->

    <van-dialog v-model="!notice[0].is_read" :title="title" confirmButtonText='查看通知' getContainer='#app' @confirm='onConfirm'>
      <van-cell>
        <graphicCard :item='notice[0]' :moreBtn='false' :isSocialShow='false' type='notice' title='信息老师'/>
      </van-cell>
    </van-dialog>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import graphicCard from './../card/graphicCard'
import readList from './../card/readList'
import { mapGetters } from 'vuex'

export default {
  name: 'notice',
  props: ['type','studentCount'],
  components: {
    graphicCard,
    readList
  },
  computed: {
    ...mapGetters(['userDataState']),
  },
  data() {
    return {
      count: 0,
      notice: '',
      title:'班级通知',
      readList:[]
    }
  },
  watch: {
    '$router': 'fetchData',
    notice(){
      if(this.$route.name == 'class-home' && this.userDataState.teacher_banji_id != this.$route.query.id){
        this.show = true
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          cate: '通知',
        }
      }

      if (this.type == 'banji') {
        data.params.banji_id = this.$route.query.id,
          data.params.portal_name = '班级主页'
      }

      if (this.type == 'school') {
        data.params.school_id = this.$route.query.id,
          data.params.portal_name = '学校主页'
      }

      axios.get('/book/SchoolArticle/getList', data).then(res => {
        switch(res.data.status){
          case 1:
            this.count = res.data.count
            this.notice = res.data.data

            let reads = {
              params:{
                post_id: this.notice[0].post_id || 0,
                page: 1,
                limit: this.studentCount
              }
            }

            axios.get('/book/SchoolArticle/getReaders',reads).then(res=>{
              switch(res.data.status){
                case 1:
                  this.readList = res.data.data
                  break
              }
            })
            break
        }
      })
    },
    onConfirm(){
      let arr = this.notice[0].from_page.split(',')

      this.$router.push({
        name:'article',
        query:{
          id: this.notice[0].post_id,
          back: this.$route.name,
          back_id: this.$route.query.id,
          school_name: arr[1],
          school_id: arr[0]
        }
      })
    }
  }
}
</script>
<style scoped>
.icon {
  margin-right: 0.9375rem /* 15/16 */;
}

.icon .iconfont {
  font-size: 1.625rem /* 26/16 */;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.left-bar-title .iconfont{
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.thumbtack{
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 5px auto;
  box-shadow: 0 2px 4px rgba(0, 132, 255, 0.3)
}
</style>
