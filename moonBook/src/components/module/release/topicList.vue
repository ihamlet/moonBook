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
        values: this.tagIndex == 0?this.topicList[0].children:[],
        className: 'column2',
        defaultIndex: this.cateIndex
      }]
      
      return column
    }
  },
  data() {
    return {
      topicIndex: 0
    }
  },
  created () {
    this.onCateChange()
  },
  methods: {
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
