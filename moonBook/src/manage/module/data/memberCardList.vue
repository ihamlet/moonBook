<template>
  <div class="user-card-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <div class="list" v-if='list.length'>
          <div class="card-item" v-for='(item,index) in list' :key="index">
            <card :item='item' />
          </div>
        </div>
        <div class="no-list" v-else>
            尚无数据
          </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { mapGetters } from 'vuex'
import card from './card'

export default {
  name: 'userCardList',
  components:{
    card
  },
  computed: {
      ...mapGetters('manage',['manageSchoolInfo'])
  },
  data() {
    return {
        list:[],
        page:1,
        loading: false,
        finished: false,
        value:0,
        option: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ]
    }
  },
  watch: {
    manageSchoolInfo(){
      this.onRefresh()
    }
  },
  methods: {
      onLoad(){
          let data = {
            params:{
                school_id: this.manageSchoolInfo.school_id,
                page: this.page
            }
          }

          return axios.get('/SchoolManage/memberCard/getList',data).then(res=>{
              switch(res.data.status){
                case 1:
                    if(this.page == 1){
                        this.list = res.data.data
                    }else{
                        this.list = this.list.concat(res.data.data)
                    }

                    this.page++
                    this.loading = false

                    if (this.list.length >= res.data.count) {
                        this.finished = true
                    }
                    
                    break
                default:
                    this.$toast(res.data.msg)
              }
          })
      },
      onRefresh(){
        this.page = 1
        this.onLoad().then(()=>{
          this.loading = false
          this.finished = false
        })
      }
  }
}
</script>
<style scoped>
.user-card-list{
  position: relative;
}
</style>
