<template>
    <div class="medal">
        <div class="level">
            {{symbol}}.{{level}}
        </div>
        <img :class="gray?'gray':''" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/medal.png" />

        <div class="highlight" v-if='animate == 1'></div>
    </div>    
</template>
<script>
export default {
    name:'medal',
    props:['level','animate','gray','type'],
    computed: {
        symbol(){
          let name 
          switch (this.type) {
            case 'punch':
              name = 'Rv'
              break
            case 'read':
              name = 'Bv'
              break
          }

          return name
        }
    }
}
</script>
<style scoped>
.medal{
    width: 45px;
    overflow: hidden;
    position: relative;
    line-height: 1.5rem
}

.medal .level{
    position: absolute;
    z-index: 1;
    bottom: 6%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    text-shadow: 0 1px 3px rgba(0, 0, 0, .2);
}

.highlight {
  position: absolute;
  width: 15px;
  height: 100%;
  top: 0;
  left: -1.5rem /* 24/16 */;
  overflow: hidden;
  background: linear-gradient(to right, rgba(255,255,255,0) , #fff);
  transform:skewX(-25deg);
  animation: glint 3s infinite;
  opacity: .92;
  z-index: 1;
}

.gray{
    filter: grayscale(100%);
    filter: gray;
}

@keyframes glint {
  from {
    left: -45px
  }
  to {
    left: 45px
  }
}

</style>
