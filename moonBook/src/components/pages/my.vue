<template>
  <div class="my page-padding">
    <card-head :userInfo='userDataState' :msg='MsgLengthState' />
    <lazy-component class="gutter gap-top">
      <apps :appsList='appsList' v-if='isTeacher == 1 || isHeaderTeacher == 1' />
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
    ...mapGetters(['userDataState', 'MsgLengthState'])
  },
  data() {
    return {
      children: '',
      zoomCard: '',
      isTeacher: 0,
      isHeaderTeacher: 0,
      appsList: [{
        name: '代借还',
        iconClass: 'icon-huanshu',
        routeLink:'/book/ManageBorrow/borrow',
      }, {
        name: '定位码',
        iconClass: 'icon-saomadingwei',
        routeLink:'/book/ManageShelf/location'
      }, {
        name: '数据',
        iconClass: 'icon-shuju',
        routeLink:'/book/SchoolMemberCard'
      }, {
        name: '权限管理',
        iconClass: 'icon-quanxian',
        routeLink:'/book/schoolManage'
      }, {
        name: '捐书',
        iconClass: 'icon-shujia',
        routeLink: '/book/TushuDonation/entry'
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
      axios.get('/book/SchoolTeacher/getMine').then(res => {
        this.isTeacher = res.data.data.is_confirm
      })

      axios.get('/book/SchoolTeacher/getMine?is_master=1').then(res => {
        this.isHeaderTeacher = res.data.data.is_confirm
      })

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
