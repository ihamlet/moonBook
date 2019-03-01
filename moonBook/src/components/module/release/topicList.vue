<template>
  <div class="topic-list">
    <van-picker show-toolbar title='选择分类' :columns="column" value-key='cate_name' @change="onCateChange" @cancel='$emit("close")' @confirm='onConfirm'/>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  props: ['type'],
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
    onCateChange(picker, cate, cid) {
      picker.setColumnValues(1, cate[0].children)
      this.$emit('select',cate[cid])
    },
    onConfirm(){
      this.type == 'edit'?this.$emit("close"):this.$emit('confirm')
    }
  }
}
</script>
<style scoped>
</style>
