<template>
  <div class="page">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import axios from './lib/js/api'

export default {
  name: 'apps-router-view',
}
</script>
<style scoped>
</style>
