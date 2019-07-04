<template>
  <div class="my page-padding">
    <card-head :userInfo='userDataState' :children='children[0]' :couponCount='couponCount'/>
    <div class="gutter gap">
      <apps :appsList='appsList' v-if='isTeacher == 1 || isHeaderTeacher == 1' />
    </div>
    <div class="gutter gap">
      <class-home v-if='children.length!=0' :children="children[0]" />
    </div>
    <div class="gutter gap" v-if='zoomCard'>
      <zone-card :zoomCard='zoomCard' :userInfo='userDataState' />
    </div>
    <div class="gutter gap">
      <baby-list :childrenList='children' />
    </div>
    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters } from 'vuex'
import cardHead from './../module/myModule/head'
import classHome from './../module/myModule/classHome'
import zoneCard from './../module/myModule/zoneCard'
import babyList from './../module/myModule/babyList'
import apps from './../module/myModule/apps'
import slogan from './../module/slogan'

export default {
  name: 'my',
  components: {
    slogan,
    cardHead,
    zoneCard,
    babyList,
    classHome,
    apps
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      couponCount:0,
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
        routeLink:'/SchoolManage/MemberCard'
      }, {
        name: '权限管理',
        iconClass: 'icon-quanxian',
        routeLink:'/SchoolManage'
      }, {
        name: '捐书',
        iconClass: 'icon-shujia',
        routeLink: '/book/member/entry_donation'
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
    fetchData() {
      axios.get('/book/SchoolTeacher/getMine').then(res => {
        if(res.data.status == 1){
          this.isTeacher = res.data.data.is_confirm
        }
      })

      axios.get('/book/SchoolTeacher/getMine?is_master=1').then(res => {
        if(res.data.status == 1){
          this.isHeaderTeacher = res.data.data.is_confirm
        }
      })

      if(this.userDataState.id != null){
        let babyListData = {
          params:{
            sort:'old',
            user_id:this.userDataState.id
          }
        }
        axios.get('/book/baby/getList',babyListData).then(res => {
          this.children = res.data.data
        })

        let getArticlrList = {
          params:{
            page:1,
            sort:'new',
            user_id:this.userDataState.id
          }
        }

        axios.get('/book/SchoolArticle/getList',getArticlrList).then(res => {
          this.zoomCard = res.data.data[0]
        })
      }else{
        this.$toast.fail('获取数据失败')
      }
    
      axios.get('/book/member/get_coupon_downloads').then(res=>{
        this.couponCount = res.data.count
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
