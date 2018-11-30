<template>
  <div class="class-zoom">
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft"/>
  </div>
</template>
<script>
export default {
  name: "class-zoom",
  data() {
    return {

    }
  },
  methods: {
      onClickLeft(){
          this.$emit('close')
      }
  }
};
</script>
<style scoped>
</style>
