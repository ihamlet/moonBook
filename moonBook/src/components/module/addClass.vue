<template>
    <div class="add-class">
        <van-nav-bar class="theme-nav" fixed :zIndex='99' :title="userDataState.regInfo.school" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <div class="baby-info flex flex-justify">
                <div class="avatar">
                    <img :src="userDataState.childInfo[0].data.avatar" :alt="userDataState.childInfo[0].data.name">
                </div>
                <div class="name">{{userDataState.childInfo[0].data.name}}（{{age[0]}}岁）</div>
            </div>
            <div class="title">请选择所在班级</div>
            <div class="list" v-for='list in classList'>
                <div class="class-title">{{list.title}}</div>
                <van-row>
                    <van-col span="8" v-for='item in list.class'>
                        <div class="">{{item.name}}</div>
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
                console.log(res)
                this.classList = res.data.classData.classList
            })
        },
        onClickLeft(){
            this.$emit('close')
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

.theme-nav{
    position: sticky;
}
</style>
