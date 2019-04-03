import Accept from '@/components/pages/accept/accept'
import SchoolList from '@/components/pages/accept/schoolList'
import cardLevel from '@/components/pages/accept/cardLevel'
import cardTime from '@/components/pages/accept/cardTime'

let acceptRouter = {
    path:'/accept',
    name:'accept',
    component: Accept,
    meta:{
      title:'阅读卡办理',
      isFooterBar: false
    },
    children:[{
      path:'/accept/schoolList',
      name:'AcceptSchoolList',
      component: SchoolList,
      meta:{
        active:0
      }
    },{
      path:'/accept/cardLevel',
      name:'AcceptCardLevel',
      component: cardLevel,
      meta:{
        active:1
      }
    },{
      path:'/accept/cardTime',
      name:'AcceptCardTime',
      component: cardTime,
      meta:{
        active:2
      }
    }]
  }

export default acceptRouter
