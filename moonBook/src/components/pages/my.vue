<template>
  <div class="my page-padding">
    <card-head :userInfo='userDataState' :msg='MsgLengthState' />
    <lazy-component class="gutter gap-top">
      <apps :appsList='appsList' v-if='userDataState.isTeacher == 1 || userDataState.isHeaderTeacher == 1'/>
    </lazy-component>
    <lazy-component class="gutter gap">
      <class-home v-if='children.length!=0' :children="children[0]" />
    </lazy-component>
    <lazy-component class="gutter gap" v-if='zoomCard'>
      <zone-card :zoomCard='zoomCard' :userInfo='userDataState' />
    </lazy-component>
    <lazy-component class="gutter gap">
      <baby-home :childrenList='children' />
    </lazy-component>
    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import cardHead from './../module/myModule/head'
import classHome from './../module/myModule/classHome'
import zoneCard from './../module/myModule/zoneCard'
import babyHome from './../module/myModule/babyHome'
import apps from './../module/myModule/apps'
import slogan from './../module/slogan'

export default {
  name: 'my',
  components: {
    slogan,
    cardHead,
    zoneCard,
    babyHome,
    classHome,
    apps
  },
  computed: {
    ...mapGetters(['userDataState','MsgLengthState'])
  },
  data() {
    return {
      children: '',
      zoomCard: '',
      appsList: [{
        name: '代借还',
        iconClass: 'icon-huanshu'
      }, {
        name: '定位码',
        iconClass: 'icon-saomadingwei'
      }, {
        name: '数据',
        iconClass: 'icon-shuju'
      }, {
        name: '权限管理',
        iconClass: 'icon-quanxian'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {
      this.getUserData().then(res => {
        axios.get(`/book/baby/getList?sort=old&user_id=${res.id}`).then(res => {
          this.children = res.data.data
        })
        axios.get(`/book/SchoolArticle/getList?page=1&sort=new&user_id=${res.id}`).then(res => {
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
