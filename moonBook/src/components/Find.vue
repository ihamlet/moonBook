<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'apps-router-view'
}
</script>
<style scoped>
</style>
