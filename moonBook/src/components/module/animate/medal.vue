<template>
    <div class="medal">
        <div class="level">
            Lv.{{level}}
        </div>
        <img :class="gray?'gray':''" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/medal.png" />

        <div class="highlight" v-if='animate == 1'></div>
    </div>    
</template>
<script>
export default {
    name:'medal',
    props:['level','animate','gray'],
    computed: {
        
    }
}
</script>
<style scoped>
.medal{
    width: 50px;
    overflow: hidden;
    position: relative;
    line-height: 1.5rem
}

.medal .level{
    position: absolute;
    z-index: 1;
    bottom: 10%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
}

.highlight {
  position: absolute;
  width: 15px;
  height: 100%;
  top: 0;
  left: -1.5rem /* 24/16 */;
  overflow: hidden;
  background: linear-gradient(to right, rgba(255,255,255,.3) , #fff);
  transform:skewX(-25deg);
  animation: glint 3s infinite;
  opacity: .92;
  z-index: 1;
}

@keyframes glint {
  from {
    left: -50px
  }
  to {
    left: 50px
  }
}

</style>
