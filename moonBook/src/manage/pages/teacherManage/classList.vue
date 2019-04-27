<template>
    <div class="padd-top">
        <van-tabs v-model="active" background="inherit" animated>
                <van-tab title="班级列表">
                    <classCard :list="classlist" />
                    <div class='fixed-bar'>
                        <div class="but-box">
                        <van-button size="normal" round type="info" @click="toclass">+创建班级</van-button>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="学校列表">
                    <schoolCard :list="schoollist" />
                    <div class='fixed-bar'>
                        <div class="but-box">
                        <van-button size="normal" round type="info">+创建学校</van-button>
                        </div>
                    </div>
                </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import classCard from './../../module/class/classCard'
import schoolCard from './../../module/class/schoolCard'
export default {
    name:'classList',
    components: {
        classCard,
        schoolCard
    },
    data(){
        return{
           title:'班级学校',
           active:0,
           classlist:[{
               picimg:'https://pro.modao.cc/uploads3/images/2344/23441330/raw_1533193306.jpeg',
               classname:'钢琴培训一班',
               teachername:'江一帆',
               number:'1128',
               school:'音卓钢琴培训',
               urls:'/teacherManage/classHome',
           },{
               picimg:'https://pro.modao.cc/uploads3/images/2589/25890339/v2_pgbb1k.jpg',
               classname:'钢琴培训二班',
               teachername:'江一帆',
               number:'2028',
               school:'音卓钢琴培训',
           },{
               picimg:'https://pro.modao.cc/uploads4/images/3057/30571969/v2_pmstp7.jpg',
               classname:'钢琴培训三班',
               teachername:'江一帆',
               number:'728',
               school:'音卓钢琴培训',
           },{
               picimg:'https://pro.modao.cc/uploads3/images/2981/29818948/v2_pl3i88.jpg',
               teachername:'江一帆',
               number:'328',
               school:'音卓钢琴培训',
           }],
           schoollist:[{
               picimg:'https://pro.modao.cc/uploads3/images/2344/23441330/raw_1533193306.jpeg',
               teachername:'江一帆',
               number:'1128',
               school:'音卓钢琴培训',
           },{
               picimg:'https://pro.modao.cc/uploads3/images/2589/25890339/v2_pgbb1k.jpg',
               teachername:'江一帆',
               number:'2028',
               school:'音卓钢琴培训',
           },{
               picimg:'https://pro.modao.cc/uploads4/images/3057/30571969/v2_pmstp7.jpg',
               teachername:'江一帆',
               number:'728',
               school:'音卓钢琴培训',
           },{
               picimg:'https://pro.modao.cc/uploads3/images/2981/29818948/v2_pl3i88.jpg',
               teachername:'江一帆',
               number:'328',
               school:'音卓钢琴培训',
           }]
        }
    },
    methods:{
        toclass(){
           this.$router.push({ path: '/teacherManage/classcreate', })
        }
    }
}
</script>

<style scoped>
.but-box{
    width: 100px;
    margin: 0px auto;
    padding-bottom: 20px;
}
</style>


