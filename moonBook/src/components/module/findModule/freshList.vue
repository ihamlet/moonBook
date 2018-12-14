<template>
  <div class="fresh-list scroll-x">
    <div class="scroll-item" v-for="(item,index) in list" :key="index" :class="type=='classShow'&&item.teacher?'teacher':''"
      @click="toZoom(item)">
      <div class="avatar">
        <img v-if="item.avatar" @error='imgError' :src="item.avatar" :alt="item.nickname">
      </div>
      <div class="name" v-line-clamp:20="1">{{item.nickname}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fresh-list',
  props: ['list', 'type'],
  methods: {
    toZoom(item) {
      this.$router.push({
        name: 'zoom',
        query: {
          id: item.user_id
        }
      })
    },
    imgError(e){
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.fresh-list {
  padding-left: 0.625rem /* 10/16 */;
}

.avatar {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  padding: 0.1875rem /* 3/16 */;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 50%;
}

.avatar img {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
}

.scroll-item {
  padding-right: 0.625rem /* 10/16 */;
  width: 3.5rem /* 56/16 */;
  display: inline-grid;
}

.name {
  width: 3.5rem /* 56/16 */;
  font-size: 0.875rem /* 14/16 */;
  text-align: center;
  margin-top: 0.3125rem /* 5/16 */;
  white-space: normal;
}

.teacher .avatar {
  border-color: #ffc107;
  border-style: dashed;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */
    rgba(255, 193, 7, 0.2);
}

.teacher .name {
  color: #303133;
}
</style>
