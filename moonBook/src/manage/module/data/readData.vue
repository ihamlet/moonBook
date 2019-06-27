<template>
  <div class="read-data">
    <van-nav-bar :title="$route.query.title" :border='false'/>
    <div class="container">
        <van-tabs type="card" color='#0084ff' v-model="active" sticky animated swipeable @change='onChangeTab'>
            <van-tab :title="list.name" v-for='(list,index) in tab' :key="index">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
                        <div class="list" v-if='list.length'>

                        </div>
                        <div class="no-list">
                            尚无数据
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'readData',
  computed: {
    ...mapGetters(['userPointState']),
    tab(){
       return [{
            name:'图书借阅',
            api:'/book/SchoolTushuBorrow/getRank',
            params:{
                region: 'banji',
                group: 'baby'
            }
        },{
            name:'阅读打卡',
            api:'/book/SchoolBookSign/getRank',
            params:{
                sort: 'read_sign',
                time: 'all',
                city_name: this.userPointState.city
            }
        }]
    }
  },
  data() {
    return {
      active: 0,
      page: 1,
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    onLoad(){
        let tabActive = this.tab[this.active]

        let data = {
            params:{
                page: this.page,
                banji_id: this.$route.query.banji_id,
                school_id: this.$route.query.school_id,
                ...tabActive.params
            }
        }

        return axios.get(tabActive.api,data).then(res=>{
            // console.log(res)
            switch(res.data.status){
                case 1:
                    if(this.page == 1){
                        this.list = res.data.data
                    }else{
                        this.list = this.list.concat(res.data.data)
                    }

                    this.page++
                    this.loading = false

                    if(this.list.length >= res.data.count){
                        this.finished = true
                    }
                    break
                default:
                    this.$toast(res.data.msg)
            }
        })
    },
    onRefresh() {
        this.page = 1
        this.onLoad().then(()=>{
            this.loading = false
            this.finished = false
        })
    },
    onChangeTab(index){
        this.active = index
        this.onRefresh()
    }
  }
}
</script>
<style scoped>
.container{
    padding-top: 10px;
    background: #fff;
}

.list{
    margin-top: 10px;
}
</style>
