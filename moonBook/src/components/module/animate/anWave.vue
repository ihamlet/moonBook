<template>
  <div class="container">
    <div class="wave1"></div>
    <div class="wave2"></div>
  </div>
</template>
<script>
export default {
  name: 'wave'
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 1.875rem /* 30/16 */;
  position: relative;
  overflow: hidden;
}

.wave1,
.wave2{
  height: 1.875rem /* 30/16 */;
  position: absolute;
  width: 1601PX;
  z-index: 12;
  left: 0;
  bottom: -.0625rem /* 1/16 */;
  background: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/wave1.png') 0 0 repeat-x;
}

.wave1{
  animation: wave-animation 8.7s infinite linear;
}

.wave2{
  animation: wave-animation 5.2s infinite linear;
  opacity: 0.5;
}

@keyframes wave-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1601PX 0;
  }
}
</style>
