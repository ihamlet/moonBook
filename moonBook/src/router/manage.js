// import Manage from '@/manage/Manage'
// import classcreate from '@/manage/pages/teacherManage/classcreate'
// import classList from '@/manage/pages/teacherManage/classList'
// import classSetting from '@/manage/pages/teacherManage/classSetting'
// import memberRanking from '@/manage/pages/teacherManage/memberRanking'

const Manage = () => import('@/manage/Manage')
const classcreate = () => import('@/manage/pages/teacherManage/classcreate')
const classList = () => import('@/manage/pages/teacherManage/classList')
const classSetting = () => import('@/manage/pages/teacherManage/classSetting')
const memberRanking = () => import('@/manage/pages/teacherManage/memberRanking')

let manageRouter = {
    path: '/manage',
    name: 'manage',
    component: Manage,
    children: [
        {
            path: '/manage/classcreate',
            name: 'classcreate',
            component: classcreate
        },
        {
            path: '/manage/classList',
            name: 'classList',
            component: classList
        },
        {
            path: '/manage/classSetting',
            name: 'classSetting',
            component: classSetting
        },{
            path: '/manage/memberRanking',
            name: 'memberRanking',
            component: memberRanking
        }
    ]
}

export default manageRouter