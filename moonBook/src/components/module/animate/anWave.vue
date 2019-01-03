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
}

.wave1,
.wave2{
  height: 1.875rem /* 30/16 */;
  position: absolute;
  width: 100%;
  z-index: 12;
  left: 0;
  bottom: 0;
  background: url('./../../../assets/img/wave1.png');
}

.wave1{
  animation: wave-animation 8.7s infinite linear;
}

.wave2{
  animation: wave-animation 5.2s infinite linear;
  opacity: 0.5;
}

@keyframes wave-animation {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100rem /* 1600/16 */ 0;
  }
}
</style>
