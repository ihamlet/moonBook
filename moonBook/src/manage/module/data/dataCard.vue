<template>
    <div class="data-card">

        <van-panel title="会员类型统计">
            <div id='memberType' class="echarts"></div>
        </van-panel>
        <van-panel title="会费类型统计">
            <div id='dueType' class="echarts"></div>
        </van-panel>
    </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { mapGetters } from 'vuex'
import { echartOption } from './../../../components/lib/js/mixin'
import echarts from 'echarts'

export default {
    name:'data-card',
    mixins: [echartOption],
    computed: {
        ...mapGetters('manage',['manageSchoolInfo'])
    },
    data() {
        return {
            
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData'
    },
    methods: {
        fetchData(){
            this.getMemberCard()
            this.getRegOrder()
        },
        getMemberCard(){
            axios.get('/SchoolManage/MemberCard/getStat',{
                params:{
                    school_id: this.manageSchoolInfo.school_id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.memberTypeOption.series[0].data = res.data.data.map(element => {
                            return {
                                value: element.count,
                                name: element.name
                            }
                        })

                        this.memberTypeChart.setOption(this.memberTypeOption)
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })
        },
        getRegOrder(){
            axios.get('/SchoolManage/TushuMemberRegOrder/getStat',{
                params:{
                    school_id: this.manageSchoolInfo.school_id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.dueTypeOption.series[0].data = res.data.data.map(element => {
                            return {
                                value: element.count,
                                name: element.name == null?'其它':element.name
                            }
                        })

                        this.dueTypeChart.setOption(this.dueTypeOption)
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })
        },
        pieChart() {
            this.memberTypeChart = echarts.init(document.getElementById('memberType'))
            this.dueTypeChart = echarts.init(document.getElementById('dueType'))
        }
    }
}
</script>
<style scoped>
.echarts{
    width: 100%;
    height: 40vh;
    background: #fff;
}
</style>
