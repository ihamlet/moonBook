<template>
  <div class="class module-card">
    <van-cell-group>
      <van-cell :value="children.class_id==0?'选择班级':`进入${children.child_name}班级`" is-link center
        @click="toClassHome">
        <div class="icon" slot="icon">
          <i class="iconfont">&#xe802;</i>
        </div>
        <div class="title flex flex-align" slot="title">
          <div class="avatar">
            <img :src="children.avatar" :alt="children.name" />
          </div>
          {{children.class_name}}班
        </div>
      </van-cell>
    </van-cell-group>

    <!-- 选择班级 -->
    <van-popup v-model="show" class="page-popup" position="right">
      <add-class :school="children.school_name" :babyId="children.child_id" @close="show = false" />
    </van-popup>
  </div>
</template>
<script>
import addClass from "./../addClass"

export default {
  name: "class-home",
  props: ['children'],
  components: {
    addClass
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toClassHome() {
      if(children.class_id>0){
        this.$router.push({
          name: "class-home",
          query: {
            id: this.children.child_id
          }
        })
      }else{
        this.show = true
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
