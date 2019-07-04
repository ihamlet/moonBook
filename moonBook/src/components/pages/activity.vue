<template>
  <div class="activity page-padding">
    <van-nav-bar :title="$route.meta.title" :left-text="$route.query.back?'返回':'发现'" left-arrow @click-left="onClickLeft"/>
    <div class="container">
      <activity-list :tid='$route.query.tid'/>
    </div>
  </div>
</template>
<script>
import activityList from './../module/activity/activityList'

export default {
  name: 'activity',
  components: {
    activityList,
  },
  methods: {
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'apps-find'
        })
      }
    }
  }
}
</script>
<style scoped>
.img-preview {
  position: absolute;
}

.baby-class .icon {
  margin-right: 0.625rem /* 10/16 */;
}

.baby-class .icon i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
