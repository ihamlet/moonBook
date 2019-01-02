<template>
  <div class="card">
    <div class="content flex flex-align" v-if='rankingData'>
        <div class="icon" slot="icon">
          <svg-ranking :ranking="rankingData.rank" />
        </div>
        <div class="title flex flex-align" slot="title">
          <div class="avatar" v-if='rankingData.info.avatar'>
            <img :src="rankingData.info.avatar" @error='imgError' :alt="rankingData.info.name" />
          </div>
          <div class="info">
            <span class="name">{{rankingData.info.name}}</span>
            <span class="label" v-line-clamp:20="1">{{rankingData.title}}</span>
          </div>
          <div class="read">{{rankingData.info.read_count}}本</div>
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
  padding: 3.125rem /* 50/16 */ 1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */;
}

.content{
  padding: .625rem /* 10/16 */;
  background: #fff;
  box-shadow: 0 .3125rem /* 5/16 */ .625rem /* 10/16 */ rgba(0, 0, 0, .1)
}

.avatar,
.avatar img {
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
}

.avatar {
  margin-right: 0.625rem /* 10/16 */;
  flex: 1;
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

.read{
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

.title{
  flex: 5;
}
</style>
