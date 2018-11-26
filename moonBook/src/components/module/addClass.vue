<template>
    <div class="add-class page-padding">
        <van-nav-bar class="bar-fixed" fixed :zIndex='99' :title="userDataState.regInfo.school" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <div class="baby-info flex flex-justify">
                <div class="avatar">
                    <img :src="userDataState.childInfo[0].data.avatar" :alt="userDataState.childInfo[0].data.name">
                </div>
                <div class="name">{{userDataState.childInfo[0].data.name}}（{{age[0]}}岁）</div>
            </div>
            <div class="title">请选择所在班级</div>
            <div class="list" v-for='(list,index) in classList' :key="index">
                <div class="class-title">{{list.title}}</div>
                <van-row>
                    <van-col span="8" v-for='(item,itemIndex) in list.class' :key='itemIndex'>
                        <div class="select" @click="select(item)">{{item.name}}</div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { format } from './../lib/js/util.js'

export default {
    name:'add-class',
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
        fetchData(){
            axios.get('/api/classData').then(res=>{
                this.classList = res.data.classData.classList
            })
        },
        onClickLeft(){
            this.$emit('close')
        },
        select(item){
            this.$emit('select',item)
        }
    }
}
</script>
<style scoped>
.title{
    text-align: center;
    height: 5rem /* 80/16 */;
    line-height: 5rem /* 80/16 */;
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
}

.baby-info .avatar{
    width: 6.25rem /* 100/16 */;
    height: 6.25rem /* 100/16 */;
    margin-top: 1.25rem /* 20/16 */;
    margin: 1.25rem /* 20/16 */ auto 0 auto;
}

.avatar img{
    border-radius: 50%;
}

.name{
    text-align: center;
    margin-top: .625rem /* 10/16 */;
}

.age{
    text-align: center;
}

.bar-fixed{
    position: sticky;
}

.select{
    width:6.25rem /* 100/16 */;
    margin: 0 auto;
    text-align: center;
    height: 2.875rem /* 46/16 */;
    line-height: 2.875rem /* 46/16 */;
    border: .0625rem /* 1/16 */ solid #DCDFE6;
    border-radius: .5rem /* 8/16 */;
    margin-bottom: .625rem /* 10/16 */;
}
</style>
