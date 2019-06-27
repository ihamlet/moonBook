const SpecialPunch = () => import('@/components/pages/special/specialPunch')

let specialRouter = [{
    path: '/special-punch',
    name: 'specialPunch',
    component: SpecialPunch,
    meta: {
      isFooterBar: false,
      keepAlive: true
    } 
  }]

  export default specialRouter