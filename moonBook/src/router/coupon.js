const AdList = () => import('@/components/pages/coupon/adList')
const coupon = () => import('@/components/pages/coupon/couponList')

let couponRouter = [{
    path:'/accept',
    name:'accept',
    component: AdList
},{
    path:'/coupon',
    name:'coupon',
    component: coupon
}]

export default couponRouter