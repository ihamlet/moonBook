<template>
    <div class="add-class page-padding">
        <van-nav-bar class="bar-fixed" fixed :title="type=='select'?'选择班级':school" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <div class="baby-info flex flex-justify">
                <div class="avatar" v-if='userDataState.childInfo[0].data.avatar'>
                    <img :src="userDataState.childInfo[0].data.avatar" :alt="userDataState.childInfo[0].data.name">
                </div>
                 <avatar v-else/>
                <div class="name">{{userDataState.childInfo[0].data.name}}（{{age[0]}}岁）</div>
                <round class="bg-round"/>
            </div>
            <div class="title">请选择所在班级</div>
            <div class="list" v-for='(list,index) in classList' :key="index">
                <van-cell-group>
                    <van-cell>
                        <div class="class-title">{{list.title}}</div>
                        <van-row>
                            <van-col span="8" v-for='(item,itemIndex) in list.class' :key='itemIndex'>
                                <div class="select" @click="select(item,itemIndex)">
                                    <div class="class-name">{{item.name}}</div>
                                    <div class="people">
                                        {{item.people.number}}人
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import { format } from './../lib/js/util.js'
import avatar from './avatar'
import round from './animate/round'

export default {
    name:'add-class',
    props:['type','school','babyId'],
    components: {
        avatar,
        round
    },
    computed: {
        ...mapGetters(['userDataState']),
        age(){
            let data = []
            this.userDataState.childInfo.forEach(e=>{
                let year = format(new Date(),'yyyy') - e.data.birthday.split('-')[0]
                data.push(year)
            })
            return data
        }  
    },
    data () {
        return {
            classList:''
        }
    },
    created () {
        this.fetchData()  
    },
    watch: {
        '$router':'fetchData'
    },
    methods: {
         ...mapActions(['getUserData']),
        fetchData(){
            axios.get('/api/classData').then(res=>{
                this.classList = res.data.classData.classList
            })
        },
        onClickLeft(){
            this.$emit('close')
        },
        select(item,itemIndex){
            this.$emit('close')
            this.$emit('select',item)
            axios.put('/api/addClass',{
                data:{
                    id:this.babyId,
                    className: item.name,
                    people: item.people,
                    sort: item.sort,
                    weekList: item.weekList
                }
            }).then(res=>{
                this.getUserData() //写入数据vuex
            })
        }
    }
}
</script>
<style scoped>
.title{
    text-align: center;
    height: 5rem /* 80/16 */;
    line-height: 5rem /* 80/16 */;
    box-shadow: 0 0 1.25rem /* 20/16 */ rgba(0, 0, 0, .3);
    background: #fff;
}

.class-title{
    width: 100%;
    height: 2rem /* 32/16 */;
    line-height: 2rem /* 32/16 */;
    text-align: center;
    margin-bottom: .625rem /* 10/16 */;
}

.baby-info{
    display: grid;
    padding: .625rem /* 10/16 */ 0 1.875rem /* 30/16 */ 0;
    position: relative;
}

.baby-info .avatar{
    width: 5rem /* 80/16 */;
    height: 5rem /* 80/16 */;
    margin: 1.25rem /* 20/16 */ auto 0 auto;
    border-radius: 50%;
    border: .1875rem /* 3/16 */ solid #fff;
    box-shadow: 0 .3125rem /* 5/16 */ .625rem /* 10/16 */ rgba(0, 0, 0, .2);
}

.avatar img{
    border-radius: 50%;
}

.name{
    text-align: center;
    margin-top: .625rem /* 10/16 */;
    color: #000;
}

.age{
    text-align: center;
}

.select{
    width: 6.875rem /* 110/16 */;
    padding: .3125rem /* 5/16 */ 0;
    margin: 0 auto;
    text-align: center;
    border: .0625rem /* 1/16 */ solid #DCDFE6;
    border-radius: .5rem /* 8/16 */;
    margin-bottom: .625rem /* 10/16 */;
    display: grid;
    overflow: hidden;
    background: #fff;
}

.select .people{
    font-size: .8125rem /* 13/16 */;
    height: 1.5rem /* 24/16 */;
    line-height: 1.5rem /* 24/16 */;
    color: #909399;
}

.bg-round{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}
</style>
