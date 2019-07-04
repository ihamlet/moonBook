<template>
  <div class="read-data">
    <van-nav-bar :title="$route.query.banji_name" :border='false'/>
    <div class="container">
        <van-tabs type="card" color='#0084ff' v-model="active" sticky animated swipeable @change='onChangeTab'>
            <van-tab :title="item.name" v-for='(item,index) in tab' :key="index">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                        <div class="list" v-if='list.length'>
                            <van-cell v-for='(list,listIndex) in list' :key="listIndex">
                                <div class="flex flex-align">
                                    <div slot="icon" class="ranking">
                                        <svgRanking :ranking='list.rank'/>
                                    </div>
                                    <div class="cell-data flex flex-align">
                                        <div class="baby-info flex flex-align" @click="toBabyHome(list)">
                                            <div class="avatar">
                                                <img :src="list.avatar"  @error="imgError"/>
                                            </div>
                                            <div class="name">
                                                {{list.name}}
                                            </div>
                                        </div>
                                        <div class="count">
                                            <span class="count-num">{{list.count}}</span> 
                                            <span class="sign-days">{{list.sign_days}}</span>    
                                        </div>
                                    </div>
                                </div>
                            </van-cell>
                        </div>
                        <div class="no-list" v-else>
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
import svgRanking from './../../../components/module/animate/svg/ranking'
import { mapGetters } from 'vuex'

export default {
  name: 'readData',
  components: {
    svgRanking,
  },
  computed: {
    ...mapGetters(['userPointState']),
    tab(){
       return [{
            name:'图书借阅',
            api:'/book/SchoolTushuBorrow/getRank',
            params:{
                region: 'banji',
                group: 'baby'
            },
            getList(data){
                return data.list
            },
            getItem(data){
                return {
                    avatar: data.babyInfo.avatar,
                    name: data.babyInfo.name,
                    rank: data.rank,
                    count: `${data.read_count}本`,
                    id: data.child_id
                }
            }
        },{
            name:'阅读打卡',
            api:'/book/SchoolBookSign/getRank',
            params:{
                sort: 'read_sign',
                time: 'all',
                city_name: this.userPointState.city
            },
            getList(data){
                return data
            },
            getItem(data){
                return {
                    avatar: data.avatar,
                    name: data.name,
                    rank: data.rank,
                    count: `${data.sign_read_count}本`,
                    sign_days: `${data.sign_days}天`,
                    id: data.child_id
                }
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
            switch(res.data.status){
                case 1:{
                    let arr = tabActive.getList(res.data.data)

                    let listArray = arr.map(e=>{
                        return tabActive.getItem(e)
                    })

                    if(this.page == 1){
                        this.list = listArray
                    }else{
                        this.list = this.list.concat(listArray)
                    }

                    this.page++
                    this.loading = false

                    if(this.list.length >= res.data.count){
                        this.finished = true
                    }
                    break
                }
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
    },
    toBabyHome(list){
      this.$router.push({
          name:'baby-home',
          query:{
            id: list.id
          }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.title{
    text-align: center;
    height: 46px;
    line-height: 46px;
}

.container{
    padding-top: 10px;
}

.list{
    margin-top: 10px;
}

.avatar,
.avatar img{
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 10px;
}

.name{
    font-size: 15px;
}

.cell-data{
    justify-content: space-between;
    flex: 1;
}

.count{
    font-size: 16px;
}

.sign-days{
    margin-left: 15px;
}

.no-list{
    margin-top: 10px;
}
</style>
