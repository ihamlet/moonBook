<template>
  <div class="apps module-card flex flex-align" :class="type">
    <div class="icon" v-for='(list,index) in appsList' :key="index" @click="toPage(list)">
      <div class="iconfont" :class="[list.iconClass]"></div>
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
  background: linear-gradient(145deg, #ffeb3b, #ff5722);
  -webkit-background-clip: text;
  color: transparent;
}

.classHome.apps .icon .iconfont {
  background: linear-gradient(145deg, #51ebff, #2196f3);
  -webkit-background-clip: text;
  color: transparent;
}

.apps .icon .name {
  font-size: small;
}
</style>
