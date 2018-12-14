<template>
  <div class="class module-card">
    <van-cell-group>
      <van-cell :value="selectPrompt.prompt" is-link center @click="toClassHome">
        <div class="icon" slot="icon">
          <i class="iconfont">&#xe802;</i>
        </div>
        <div class="title flex flex-align" slot="title">
          <div class="avatar">
            <img :src="children.avatar" :alt="children.child_name" />
          </div>
          {{children.child_name}}
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: "class-home",
  props: ['children'],
  computed: {
    selectPrompt(){
      if(!this.children.school_id){
        return {
          prompt:'请选择学校班级',
          type:0
        }
      }else if(!this.children.class_id){
        return {
          prompt:'请选择班级',
          type:1
        }
      }else{
        return {
          prompt: this.children.class_name,
          type:2
        }
      }
    }
  },
  data() {
    return {
      showSchool: false,
      showClass: false,
      school:''
    }
  },
  methods: {
    toClassHome() {
      if(this.selectPrompt.type == 0){
        this.$router.push({
          name:'edit-school',
          query:{
            id: this.children.child_id
          }
        })
      }else if(this.selectPrompt.type == 1){
        this.$router.push({
          name:'edit-class',
          query:{
            id: this.children.child_id,
            schoolId: this.children.school_id
          }
        })
      }else if(this.selectPrompt.type == 2){
        this.$router.push({
          name: "class-home",
          query: {
            id: this.children.class_id
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.class {
  overflow: hidden;
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}

.icon i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.avatar{
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  overflow: hidden;
  border-radius: 50%;
  margin-right: .3125rem /* 5/16 */;
}
</style>
