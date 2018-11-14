<template>
    <div class="register">
        <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container">
            <van-steps active-color='#409eff' :active="active">
                <van-step>选择幼儿园</van-step>
                <van-step>选择身份</van-step>
            </van-steps>

            <div class="school" v-if='active==0'>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell v-for="(item,index) in list" :key="index" is-link center>
                        <div class="school-name">{{item.name}}</div>
                        <div class="school-address" v-line-clamp:20="1">{{item.address.replace(/^(.+?)市/,'')}}</div>
                    </van-cell>
                </van-list>
            </div>
            <div class="identity" v-else>
                <van-cell-group>
                    <div class="form-title">您的身份？</div>
                    <van-cell title="我是家长" is-link />
                    <van-cell title="我是老师" is-link />
                    <van-cell title="我是园长" is-link />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name:'register',
    computed: {
       ...mapGetters(['shcoolListState'])
    },
    data () {
        return {
            active:0,
            num:0,
            list: [],
            loading: false,
            finished: false
        }
    },
    methods: {
        ...mapActions(['getSchoolList']),
        onLoad() {
            this.num++
            let products = {
                city: this.$route.query.city,
                num: this.num
            }
            this.getSchoolList(products).then(()=>{
                this.list = this.list.concat(this.shcoolListState.results) 
                this.loading = false
                if (this.list.length >= this.shcoolListState.total) {
                    this.finished = true
                }
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.container{
    padding-top: 2.875rem /* 46/16 */;
}

.register{
    padding-bottom: 5.5rem /* 88/16 */;
}

.school-name{
    font-size: 1rem /* 16/16 */;
    color: #303133;
}

.school-address{
    width: 18.75rem /* 300/16 */;
    color: #909399;
}
</style>
