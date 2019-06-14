// import Manage from '@/manage/Manage'
// import classcreate from '@/manage/pages/teacherManage/classcreate'
// import classList from '@/manage/pages/teacherManage/classList'
// import classSetting from '@/manage/pages/teacherManage/classSetting'
// import memberRanking from '@/manage/pages/teacherManage/memberRanking'

const Manage = () => import('@/manage/Manage')
// const classcreate = () => import('@/manage/pages/teacherManage/classcreate')
// const classList = () => import('@/manage/pages/teacherManage/classList')
// const classSetting = () => import('@/manage/pages/teacherManage/classSetting')

const memberRanking = () => import('@/manage/pages/teacherManage/memberRanking')

const manageSchool = () => import('@/manage/pages/teacherManage/school')
const teacherEdit = () => import('@/manage/pages/edit/teacherEdit')
const banjiTree = () => import('@/manage/pages/tree/banjiTree')
const banjiList = () => import('@/manage/pages/list/banjiList')

let manageRouter = {
    path: '/manage',
    name: 'manage',
    component: Manage,
    children: [
        {
            path: '/manage/teacherEdit',
            name: 'teacherEdit',
            component: teacherEdit
        },
        {
            path: '/manage/memberRanking',
            name: 'memberRanking',
            component: memberRanking
        },
        {
            path: '/manage/school',
            name: 'manageSchool',
            component: manageSchool
        },
        {
            path: '/manage/banjiTree',
            name: 'banjiTree',
            component: banjiTree
        },
        {
            path: '/manage/banjiList',
            name: 'banjiList',
            component: banjiList
        }
    ]
}

export default manageRouter