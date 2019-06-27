<template>
  <div class="card">
    <div class="content flex flex-align" v-if='rankingData'>
      <div class="icon" slot="icon">
        <svg-ranking :ranking="rankingData.rank" />
      </div>
      <div class="title flex flex-align" slot="title">
        <div class="avatar" v-if='rankingData.info.avatar'>
          <img :src="rankingData.info.avatar" @error='imgError' v-http2https/>
        </div>
        <div class="info">
          <span class="name">{{rankingData.info.name}}</span>
          <span class="label" v-line-clamp:20="1">{{rankingData.title}}</span>
        </div>
        <div class="read">{{rankingData.info.read_count}}本</div>

        <i class="iconfont">&#xed8f;</i>
      </div>
    </div>
  </div>
</template>
<script>
import svgRanking from './../animate/svg/ranking'

export default {
  name: 'my-card',
  props: ['rankingData'],
  components: {
    svgRanking
  },
  methods: {
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.card {
  padding: 60px 15px 0;
}

.content {
  padding: 0.625rem /* 10/16 */;
  background: #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(86, 104, 248, 0.3);
  border-radius: 0.625rem /* 10/16 */ 0 .625rem /* 10/16 */ .625rem /* 10/16 */;
}

.avatar,
.avatar img {
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
}

.avatar {
  margin-right: 0.625rem /* 10/16 */;
}

.avatar img {
  border-radius: 50%;
  display: block;
}

.info .label {
  font-size: 0.875rem /* 14/16 */;
}

.info {
  flex: 3;
}

.read {
  flex: 2;
  text-align: right;
  font-size: 1rem /* 16/16 */;
  font-weight: 500;
}

.info .name {
  font-weight: 500;
  color: #303133;
}

.icon {
  flex: 1;
}

.title {
  flex: 5;
  position: relative;
}

.iconfont {
  position: absolute;
  right: 28%;
  top: -0.9375rem /* 15/16 */;
  font-size: 1.875rem /* 30/16 */;
  background: linear-gradient(127deg, #ff2a00, #ff00af);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 .125rem /* 2/16 */ .625rem /* 10/16 */ rgba(255, 0, 127, 0.3);
}
</style>
