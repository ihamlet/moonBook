<template>
    <div class="new-book">
        <img class="head-bg" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/newBook.jpg" />
        <div class="list-padding">
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="index">
                <div class="create-time theme-color" v-if='timediff(item,index)'>
                    {{getTimeAgo(item.create_time)}}
                </div>
                <bookCard :item='item' :type='list.title' />
                </van-cell>
            </van-list>
            </van-pull-refresh>
        </div>
    </div>    
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters } from 'vuex'
import { timeago } from './../lib/js/util'
import bookCard from './../module/card/bookCard'

export default {
    name:'new-book',
    components:{
        bookCard
    },
    data() {
        return {
            loading: false,
            finished: false,
            page:1,
            list:[]
        }
    },
    computed: {
      ...mapGetters(['userDataState'])  
    },
    methods: {
        onLoad(){
            let data = {
                params:{
                    sort: 'new',
                    start_time: Date.parse(new Date()) - 86400*7000
                }
            }

           return axios.get('/book/SchoolShelfBook/getList',data).then(res=>{
                switch (res.data.status) {
                case 1:
                    if (this.page == 1) {
                        this.list = res.data.data
                    } else {
                        this.list = this.list.concat(res.data.data)
                    }
                    this.loading = false
                    this.page++
                    if (this.list.length >= res.data.count) {
                        this.finished = true
                    }
                    break
                case 0:
                    this.page = 1
                    this.loading = false
                    this.finished = true
                    this.list = []
                    break
                }
            })
        },
        onRefresh(){
            this.page = 1
            this.onLoad().then(() => {
                this.loading = false
            })
        },
        getTimeAgo(time){
            return timeago(time*1000)
        },
        timediff(item,index){
            if(index == 0){
                return true
            }

            if(index){
                let timeHistory = timeago(this.list[index-1].create_time * 1000)
                let time = timeago(item.create_time*1000)
                if(timeHistory == time){
                return false
                }else{
                return true
                }
            }
        }
    }
}
</script>
<style scoped>
.head-bg{
    position: fixed;
    top: 0;
}

.list-padding{
    margin-top: 30%;
}
</style>
