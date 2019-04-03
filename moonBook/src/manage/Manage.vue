<template>
  <div class="page">
    <div class="root-dom">
      <div class="refresh">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'apps-router-view',
  computed: {
     ...mapGetters(['userDataState'])
  }
}
</script>
<style scoped>
</style>
