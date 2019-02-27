<template>
  <div class="topic-list">
    <van-nav-bar title="选择分类" right-text='关闭' @click-right='close' />
    <div class="list">
      <van-cell-group>
        <div class="item" v-for='(item,index) in topicList' :key="index">
          <van-cell is-link @click="select(item)">
            <div class="cell-title" slot='title'>
             <div class="cate-name theme-color">
                #{{item.cate_name}}
              </div>
              <div class="explain" v-if='item.access_level == 1'>
                发布通知到管理的{{$route.query.back == 'class-home'?'班级':'学校'}}
              </div>
            </div>
          </van-cell>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  computed: {
    ...mapGetters(['managerState'])
  },
  data() {
    return {
      topicList: ''
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
      axios.get('/book/schoolArticleCate/getList').then(res => {
        if(res.status == 200){
          let array = res.data
          let datas = []
          array.forEach(element => {
            if(element.portal_name == '宝贝主页'&&this.$route.query.back){
              datas.push(element)
            }

            if(element.portal_name == '班级主页'&&this.$route.query.back == 'class-home'){
              if(element.access_level == 0){
                datas.push(element)
              }else{
                this.managerState.forEach(e=>{
                  if(this.$route.query.id == e.banji_id && e.item_relation != 'parent'){
                    datas.push(element)
                  }
                })
              }
            }

            if(element.portal_name == '学校主页'&&this.$route.query.back == 'apps-school'){
              if(element.access_level == 0){
                datas.push(element)
              }else{
                this.managerState.forEach(e=>{
                  if(this.$route.query.id == e.school_id && e.item_relation != 'parent'){
                    datas.push(element)
                  }
                })
              }
            }

          })
        
          this.topicList = datas
        }
      })
    },
    select(item){
      this.$emit('select',item)
      this.$emit('close')
    },
    close(){
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
</style>
