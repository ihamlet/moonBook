<template>
  <div class="apps module-card flex flex-align" :class="type">
    <div class="icon" v-for='(list,index) in appsList' :key="index" @click="toPage(list)">
      <div class="iconfont" :class="[list.iconClass,index == 0&&$route.name =='apps-school'?'rotate':'']"></div>
      <div class="name">{{list.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'apps',
  props: ['appsList', 'type'],
  methods: {
    toPage(list) {
      if (list.routeLink) {
          window.location = list.routeLink
      } else if(list.params){
        this.$router.push({
          name: list.path,
          query: list.params
        })
      }
    }
  }
}
</script>
<style scoped>
.icon-huanshu::before {
  content: '\e697';
}
.icon-saomadingwei::before {
  content: '\e678';
}
.icon-shuju::before {
  content: '\e61d';
}
.icon-quanxian::before {
  content: '\e698';
}
.icon-tongxunlu::before {
  content: '\e7ab';
}
.icon-guoxue::before {
  content: '\e61a';
}
.icon-jianggushi::before {
  content: '\e638';
}
.icon-tongxunlu::before {
  content: '\e6d3';
}
.icon-liuyanbo::before {
  content: '\e61c';
}
.icon-jiaoliu::before {
  content: '\e6af';
}
.icon-jianjie::before {
  content: '\eb0d';
}
.icon-shujia::before {
  content: '\e649';
}
.icon-canpu::before {
  content: '\e729';
}
.icon-paihangbang::before {
  content: '\e61d';
}

.icon-fengcai::before {
  content: '\e62f';
}
.icon-yuedu::before {
  content: '\e62e';
}
.icon-caiyi::before {
  content: '\e650';
}
.icon-rongyu::before {
  content: '\e63b';
}
.icon-jiangbei::before {
  content: '\e66d';
}

.icon-fengche::before{
  content: '\e670'
}
.icon-tiaosepan::before{
  content: '\e674'
}

.apps {
  padding: 0.625rem /* 10/16 */ 0;
  background: #fff;
  margin-top: 0;
}

.apps .icon {
  flex: 1;
  text-align: center;
}

.apps .icon .iconfont {
  font-size: 1.75rem /* 28/16 */;
  background: linear-gradient(72deg, #FF9800, #FFC107);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(255, 193, 7, 0.3);
}

.apps .icon .iconfont.icon-fengche{
  background: linear-gradient(72deg, #FFEB3B, #FFC107);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(255, 193, 7, 0.3);
}

.apps .icon .iconfont.icon-jiangbei{
  background: linear-gradient(72deg, #FF5722, #F44336);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(244, 67, 54, 0.3);
}

.apps .icon .iconfont.icon-yuedu{
  background: linear-gradient(72deg, #03A9F4, #2196F3);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(33, 150, 243, 0.3);
}

.apps .icon .iconfont.icon-tiaosepan{
  background: linear-gradient(72deg, #00BCD4, #009688);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 150, 136, 0.3);
}

.classHome.apps .icon .iconfont {
  background: linear-gradient(145deg, #51ebff, #2196f3);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(33, 150, 243, 0.3);
}

.apps .icon .name {
  font-size: small;
  margin-top: 5px;
}

.rotate {
  animation: rotate 2.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
