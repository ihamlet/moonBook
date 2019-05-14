<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.query.tag_id"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.query.tag_id"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'apps-router-view',
  beforeRouteLeave(to, from, next) {
    if (to.name == "home") {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  }
}
</script>
<style scoped>
</style>
