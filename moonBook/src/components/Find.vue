<template>
  <div class="page">
       <router-view/>
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
