import FlyersStudent from '@/components/pages/flyers/Student'
import FlyersTeacher from '@/components/pages/flyers/Teacher'

let flyersRouter = [
    {
    path:'/flyers/student',
    name:'flyersStudent',
    component: FlyersStudent,
    meta: {
        isFooterBar: false
    }
  },{
    path:'/flyers/teacher',
    name:'flyersTeacher',
    component: FlyersTeacher,
    meta: {
        isFooterBar: false
    }
  }
]

export default flyersRouter