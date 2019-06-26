<template>
    <div class="data-card">
        <van-cell-group>
            <van-cell>
                <div class="data-bar">
                    <ul class="flex flex-align">
                        <li>
                            <div class="data-item">
                                <span class="num">{{schoolInfo.student_count}}</span>
                                <span>学生数</span>
                            </div>
                        </li>
                        <li>
                            <div class="data-item">
                                <span class="num">{{schoolInfo.parent_count}}</span>
                                <span>家长数</span>
                            </div>
                        </li>
                        <li>
                            <div class="data-item">
                                <span class="num">{{schoolInfo.card_count}}</span>
                                <span>办卡数</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </van-cell>
        </van-cell-group>
        <van-collapse v-model="activeArr">
            <van-collapse-item title="会员类型统计" name="1" :disabled='dataCount.mCount == 0' :value='dataCount.mCount == 0?"尚无数据":""'>
                <div id='memberType' class="echarts"></div>
            </van-collapse-item>
            <van-collapse-item title="会费类型统计" name="2" :disabled='dataCount.dCount == 0' :value='dataCount.dCount == 0?"尚无数据":""'>
                <div id='dueType' class="echarts"></div>
            </van-collapse-item>
        </van-collapse>

        <memberCardList ref='memberCardList'/>
    </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import memberCardList from './memberCardList'
import { mapGetters } from 'vuex'
import { echartOption } from './../../../components/lib/js/mixin'
import echarts from 'echarts'

export default {
    name:'data-card',
    mixins: [echartOption],
    components:{
        memberCardList
    },
    computed: {
        ...mapGetters('manage',['manageSchoolInfo'])
    },
    data() {
        return {
            dataCount:{
                mCount: 0,
                dCount: 0,
            },
            schoolInfo:'',
            activeArr:['1','2']
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData',
        dataCount:{
            handler(val){
                if(val.mCount == 0 || val.dCount == 0){
                    this.activeArr = []
                }
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.pieChart()
            this.activeArr = []
            this.$refs.memberCardList.onRefresh()
        })
    },
    methods: {
        fetchData(){
            this.getSchoolInfo()
            this.getMemberCard()
            this.getRegOrder()
        },
        getSchoolInfo(){
            axios.get('/SchoolManage/School/getInfo',{
                params: {
                    school_id:this.manageSchoolInfo.school_id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.schoolInfo = res.data.data
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })
        },
        getMemberCard(){
            axios.get('/SchoolManage/MemberCard/getStat',{
                params:{
                    school_id:this.manageSchoolInfo.school_id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.memberTypeOption.series[0].data = res.data.data.map(element => {
                            return {
                                value: element.count,
                                name: `${element.name}(${element.count})`
                            }
                        })

                        this.dataCount.mCount = res.data.data.length
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
                    school_id:this.manageSchoolInfo.school_id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.dueTypeOption.series[0].data = res.data.data.map(element => {
                            return {
                                value: element.count,
                                name: element.name == null?`其它(${element.count})`:`${element.name}(${element.count})`
                            }
                        })

                        this.dataCount.dCount = res.data.data.length
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

.data-bar{
    background: #fff;
}

.data-bar ul li{
    flex: 1;
}

.data-item{
    display: grid;
    text-align: center;
}

.num{
    font-size: 20px;
    font-weight: 700;
}
</style>
