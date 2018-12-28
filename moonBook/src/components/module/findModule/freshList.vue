<template>
  <div class="fresh-list">
    <div class="content scroll-x" v-if='list.length > 0'>
      <div class="scroll-item" v-for="(item,index) in list" :key="index" @click="toZoom(item)">
        <div class="avatar">
          <img v-if="item[avatar]" @error='imgError' :src="item[avatar]" :alt="item[name]">
        </div>
        <div class="name" v-line-clamp:20="2">
          {{item[name]}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fresh-list',
  props: ['list', 'type', 'avatar', 'name', 'cid', 'routerName'],
  methods: {
    toZoom(item) {
      this.$router.push({
        name: this.routerName,
        query: {
          id: item[this.cid]
        }

      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.content {
  padding-left: 0.625rem /* 10/16 */;
}

.avatar {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  padding: 0.1875rem /* 3/16 */;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 50%;
  margin: 0 auto;
}

.avatar img {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
}

.scroll-item {
  width: 3.75rem /* 60/16 */;
  padding-right: 0.625rem /* 10/16 */;
  display: inline-grid;
}

.name {
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
  font-size: 0.75rem /* 12/16 */;
  font-weight: 500;
}
</style>
