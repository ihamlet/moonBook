<template>
  <!-- <div class="topic-list">
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
    </div> -->

    <van-picker show-toolbar title='选择分类' :columns="column" value-key='cate_name' @change="onCateChange"/>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  computed: {
    ...mapGetters(['managerState']),
    column(){
      let column = [{
          values: this.topicList,
          className: 'column1'
        },
        {
          values:[],
          className: 'column2',
          defaultIndex: 1
        }]
    return column
    }
  },
  data() {
    return {
      topicList: '',
      topicIndex: 0
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
    },
    makeColumn(list) {
      var column = [
        {
          values: [],
          className: 'column1'
        },
        {
          values:[],
          className: 'column2',
          defaultIndex: 0
        }
      ];
      list.forEach((item)=>{
        column[0].values.push(item);       
      })

       if(list[0].children) {
          column[1].values = list[0].children
        }
      console.log('column', column)
      return column
    },
    onCateChange(picker, cate) {
      picker.setColumnValues(1, cate[0].children)
    }

  }
}
</script>
<style scoped>
</style>
