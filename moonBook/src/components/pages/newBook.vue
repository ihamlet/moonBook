<template>
    <div class="new-book">
        <img class="head-bg" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/newBook.jpg" />
        <div class="list-padding">
            <van-pull-refresh v-model="loading" @refresh="onRefresh" :key="userDataState.card_id">
                <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                    <van-cell v-for="(item,index) in list" :key="index">
                    <div class="hd-bar flex flex-align" v-if='timediff(item,index)'>
                        <div class="card-school-name theme-color" @click="toSchoolHome">{{index == 0?userDataState.card_school_name:''}}</div>
                        <div class="time">{{getTimeAgo(item.create_time)}}</div>   
                    </div>
                    <bookCard :item='item' :type='list.title' />
                    </van-cell>
                </van-list>
            </van-pull-refresh>
        </div>

        <div class="footer-bar">
            <div class="btn-box">
                <van-button round class="theme-btn" type="primary" size="normal" @click="toBookShelf">去书架看看</van-button>
            </div>
        </div>
    </div>    
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters } from 'vuex'
import { format } from './../lib/js/util'
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
                    start_time: Date.parse(new Date()) - 86400*7000,
                    card_id: this.userDataState.card_id
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
                this.finished = false
            })
        },
        getTimeAgo(time){
            return format(time*1000,'yyyy-MM-dd')
        },
        timediff(item,index){
            if(index == 0){
                return true
            }

            if(index){
                let timeHistory = format(this.list[index-1].create_time * 1000,'yyyy-MM-dd')
                let time = format(item.create_time*1000,'yyyy-MM-dd')
                if(timeHistory == time){
                    return false
                }else{
                    return true
                }
            }
        },
        toBookShelf(){
            this.$router.push({
                name:'bookshelf'
            })
        },
        toSchoolHome(){
            this.$router.push({
                name:'apps-school',
                query:{
                    id: this.userDataState.card_school_id
                }
            })
        }
    }
}
</script>
<style scoped>
.new-book{
    min-height: 100vh;
    background: #ffcf1a;
}

.head-bg{
    position: fixed;
    top: 0;
}

.list-padding{
    margin-top: 30%;
}

.btn-box{
   padding: 10px 15px;
}

.footer-bar{
   position: fixed;
   bottom: 0;
}

.footer-bar,
.theme-btn{
    width: 100%;
}

.hd-bar{
    justify-content: space-between;
    height: 32px;
    line-height: 32px;
}
</style>
