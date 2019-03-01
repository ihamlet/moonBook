<template>
  <div class="page">
    <router-view />
  </div>
</template>
<script>
import axios from './lib/js/api'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'apps-router-view',
  computed: {
    ...mapGetters(['userDataState']),
  }
}
</script>
<style scoped>
</style>
