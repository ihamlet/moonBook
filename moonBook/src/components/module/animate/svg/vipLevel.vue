<template>
  <div class="vip-level">
    <i class="iconfont" :class="[level == 1?'icon-1':'']" v-if='level == 1'>&#xe6bf;</i>
    <i class="iconfont" :class="[level == 2?'icon-2':'']" v-if='level == 2'>&#xe6c0;</i>
    <i class="iconfont" :class="[level == 3?'icon-3':'']" v-if='level == 3'>&#xe6c1;</i>
    <i class="iconfont" :class="[level == 4?'icon-4':'']" v-if='level == 4'>&#xe6c9;</i>
    <div class="highlight" v-if='animate == 1'></div>
  </div>
</template>
<script>
export default {
  name: 'vip-level',
  props: ['level','animate']
}
</script>
<style scoped>
.iconfont.icon-3 {
  background-image: linear-gradient(135deg, #5efce8 10%, #736efe 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.iconfont.icon-2 {
  background-image: linear-gradient(135deg, #ffe985 10%, #fa742b 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.iconfont.icon-1 {
  background-image: linear-gradient(135deg, #fff5c3 10%, #9452a5 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.vip-level {
  position: relative;
  width: 1.5rem /* 24/16 */;
  height: 1.5rem /* 24/16 */;
  overflow: hidden;
}

.highlight {
  position: absolute;
  width: .5rem /* 8/16 */;
  height: 100%;
  top: 0;
  left: -1.5rem /* 24/16 */;
  overflow: hidden;
  background: #fff;
  transform:skewX(-25deg);
  animation: glint 3s infinite;
  opacity: .92;
  z-index: 1;
}

@keyframes glint {
  from {
    left: -1.5rem; /* 24/16 */
  }
  to {
    left: 1.5rem; /* 24/16 */
  }
}

.iconfont {
  font-size: 1.5rem /* 24/16 */;
  line-height: initial;
  display: block;
}
</style>
