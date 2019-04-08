import AdList from '@/components/pages/coupon/adList'
import coupon from '@/components/pages/coupon/couponList'

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