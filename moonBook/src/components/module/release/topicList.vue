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

      let data = {
        params:{
          portal_name:'宝贝主页'
        }
      }

      if(this.$route.query.back == 'class-home'){
        data.params.portal_name = '班级主页'
      }    

      if(this.$route.query.back == 'apps-school'){
        data.params.portal_name = '学校主页'
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          let array = res.data
          let data = []
          array.forEach(element => {
            if(element.access_level == 0){
              data.push(element)
            }else{
              this.managerState.forEach(e =>{
                if((this.$route.query.id == e.banji_id||this.$route.query.id == e.school_id)&& e.item_relation != 'parent'){
                  data.push(element)
                }
              })
            }
          })
          this.topicList = data
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
