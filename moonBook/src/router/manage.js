const Manage = () => import('@/manage/Manage')

const memberRanking = () => import('@/manage/pages/teacherManage/memberRanking')

const manageSchool = () => import('@/manage/pages/teacherManage/school')
const teacherShare = () => import('@/manage/pages/share/teacherShare')

const teacherEdit = () => import('@/manage/pages/edit/teacherEdit')
const banjiEdit = () => import('@/manage/pages/edit/banjiEdit')

const banjiTree = () => import('@/manage/pages/tree/banjiTree')
const banjiList = () => import('@/manage/pages/list/banjiList')

const readData = () => import('@/manage/module/data/readData')

const List = () => import('@/manage/pages/list/List')

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
        },
        {
            path: '/manage/banjiEdit',
            name: 'banjiEdit',
            component: banjiEdit
        },
        {
            path: '/manage/readData',
            name: 'readData',
            component: readData
        },
        {
            path: '/manage/teacherShare',
            name: 'teacherShare',
            component: teacherShare
        },
        {
            path: '/manage/List',
            name: 'List',
            component: List
        }
    ]
}

export default manageRouter