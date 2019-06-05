// import FlyersStudent from '@/components/pages/flyers/Student'
// import FlyersTeacher from '@/components/pages/flyers/Teacher'

const FlyersStudent = () => import('@/components/pages/flyers/Student')
const FlyersTeacher = () => import('@/components/pages/flyers/Teacher')

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