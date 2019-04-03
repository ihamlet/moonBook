import Editor from '@/components/Editor'
import Publishing from '@/components/pages/editor/Publishing'
import Graphic from '@/components/pages/editor/Graphic'
import BeautifulArticle from '@/components/pages/editor/BeautifulArticle'
import changeCover from '@/components/pages/editor/mould/changeCover'
import articleSetting from '@/components/pages/editor/mould/articleSetting'

let editorRouter = {
  path: '/editor',
  name: 'editor',
  component: Editor,
  children:[{
    path: '/editor/publishing',
    name: 'publishing',
    component: Publishing,
    meta: {
      title: '发布长文',
      type:'long'
    }
  },
  {
    path: '/editor/beautifulArticle',
    name: 'beautifulArticle',
    component: BeautifulArticle,
    meta: {
      title: '编辑',
      type:'beautifulArticle'
    },
  },
  {
    path: '/editor/changeCover',
    name:'changeCover',
    component: changeCover,
    meta: {
      title: '设置封面'
    }
  },
  {
    path: '/editor/graphic',
    name: 'graphic',
    component: Graphic,
    meta: {
      title: '发布',
      type:'webo'
    }
  },{
    path:'/editor/articleSetting',
    name:'articleSetting',
    component: articleSetting,
    meta: {
      title: '发布设置'
    }
  }]
}

export default editorRouter
