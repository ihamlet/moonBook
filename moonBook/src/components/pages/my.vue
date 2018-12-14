<template>
  <div class="my page-padding">
    <card-head :userInfo='userInfo' />
    <lazy-component class="gutter gap-top">
      <class-home v-if='children' :children="children[0]" />
    </lazy-component>
    <lazy-component class="gutter gap" v-if='zoomCard'>
      <zone-card :zoomCard='zoomCard' :userInfo='userInfo'/>
    </lazy-component>
    <lazy-component class="gutter gap">
      <baby-home :childrenList='children'/>
    </lazy-component>
    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'

import cardHead from './../module/myModule/head'
import classHome from './../module/myModule/classHome'
import zoneCard from './../module/myModule/zoneCard'
import babyHome from './../module/myModule/babyHome'
import slogan from './../module/slogan'

export default {
  name: 'my',
  components: {
    slogan,
    cardHead,
    zoneCard,
    babyHome,
    classHome
  },
  data() {
    return {
      children: '',
      userInfo: '',
      zoomCard: '',
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('/book/family/getChildrenByUser?sort=old').then(res => {
        this.children = res.data.data
      })

      axios.get('/book/memberUser/getInfo').then(res => {
        this.userInfo = res.data
        axios.get(`/book/SchoolArticle/getList?page=1&sort=new&user_id=${res.data.id}`).then(res => {
          this.zoomCard = res.data.data[0]
        })
      })
    }
  }
}
</script>
<style scoped>
.gutter {
  padding: 0 0.625rem /* 10/16 */;
}

.gap-top {
  margin-top: 3.75rem /* 60/16 */;
}

.gap {
  margin-top: 0.625rem /* 10/16 */;
}
</style>
