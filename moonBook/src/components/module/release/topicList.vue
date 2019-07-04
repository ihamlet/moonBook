<template>
  <div class="topic-list">
    <van-picker ref='picker' show-toolbar :title='title' :columns="column" value-key='cate_name' @change="onCateChange" @cancel='close'  @confirm='$emit("confirm")'/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  props: ['type','topicList','tagIndex','cateIndex','cateName'],
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
    },
    title(){
      let title = '宝贝主页的分类'
      
      switch(this.$route.query.back){
        case 'class-home':
          title = '班级主页的分类'
        break
        case 'apps-school':
          title = '学校主页的分类'
        break
      }

      return title

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
