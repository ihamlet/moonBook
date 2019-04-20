<template>
  <div class="popup-list">
    <van-nav-bar :title="$route.meta.title" />
    <div class="list">
      <div class="popup-card flex flex-align">
        <div class="card">
          <div class="title">阅读月领奖券</div>
          <div class="name" v-line-clamp:20="1">
            乐高课程卡4课时，价值240元
          </div>
          <div class="time">2019/03/12-2019/04/12</div>
        </div>
        <div class="status flex flex-justify" v-if='isUse' @click="onUseClick">
          <div class="make">
            立即<br />使用
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup-list',
  data() {
    return {
      isUse: true
    }
  },
  methods: {
    onUseClick() {
      console.log('卡券核销', 'writeOff')
      this.$router.push({
        name: 'writeOff'
      })
    }
  }
}
</script>
<style scoped>
.list {
  padding: 15px;
}

.popup-card {
  background: #fff;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.popup-card::before,
.popup-card::after {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  content: '';
  right: 80px;
  background: #f2f6fc;
}

.popup-card::before {
  top: -13px;
}

.popup-card::after {
  bottom: -13px;
}

.card {
  flex: 1;
  padding: 10px;
}

.status {
  width: 90px;
  text-align: center;
}

.title {
  font-size: 20px;
  margin-bottom: 5px;
}

.name,
.time {
  color: #909399;
}

.time {
  font-size: 14px;
}

.name {
  background: linear-gradient(90deg, #00c2ab, #3e94ff);
  -webkit-background-clip: text;
  color: transparent;
}

.make {
  font-size: 18px;
}

.status {
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  height: 90px;
  color: #fff;
  align-items: center;
}
</style>
