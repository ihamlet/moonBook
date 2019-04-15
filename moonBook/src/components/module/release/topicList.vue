<template>
  <div class="topic-list">
    <van-picker ref='picker' show-toolbar title='选择分类' :columns="column" value-key='cate_name' @change="onCateChange" @cancel='close'  @confirm='$emit("confirm")'/>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  props: ['type','topicList','tagIndex','cateIndex'],
  computed: {
    ...mapGetters(['managerState']),
    column(){
      let column = [{
        values: this.topicList,
        className: 'column1',
        defaultIndex: this.tagIndex
      },
      {
        values: this.topicList[this.tagIndex]?this.topicList[this.tagIndex].children:[],
        className: 'column2',
        defaultIndex: this.cateIndex
      }]
      
      return column
    }
  },
  methods: {
    onCateChange(picker, cate, cid) {
      picker.setColumnValues(1, cate[0].children)
      this.$emit('select',cate[cid])
    },
    close(){
      this.$refs.picker.setColumnValues(1,this.column[1].values)
      this.$refs.picker.setColumnIndex(0,0)
      this.$refs.picker.setColumnIndex(1,0)
      this.$emit("close")
    }
  }
}
</script>
<style scoped>
</style>
