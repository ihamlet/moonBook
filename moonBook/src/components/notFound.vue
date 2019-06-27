<template>
  <div class="error-404">
    <div class="content flex flex-column">
      <h1 class="title">暂时未开放，敬请期待！</h1>
      <img src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/404.png" alt="404" />
      <div class="error-text">正在抓紧施工...</div>
      <van-button class="btn" round type="danger" @click="backHome">返回</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'not-found',
  methods: {
    backHome() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
<style scoped>
.error-404 {
  width: 100%;
  height: 100vh;
  background: #fff;
}

h1 {
  height: 6.25rem /* 100/16 */;
  line-height: 6.25rem /* 100/16 */;
  text-align: center;
}

.content {
  width: 18.75rem /* 300/16 */;
  margin: 0 auto;
  padding: 3.125rem /* 50/16 */ 0;
}

.error-text {
  text-align: center;
  margin-top: 1.25rem /* 20/16 */;
}

.btn {
  margin-top: 1.875rem /* 30/16 */;
}
</style>
