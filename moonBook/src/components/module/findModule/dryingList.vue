<template>
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="item" v-for="(item,index) in list" :key="index">
          <van-cell>
            <div class="content">
              <graphic-crad :item="item" @follow="follow"/>
            </div>
          </van-cell>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import slogan from './../slogan'
import graphicCrad from './../card/graphicCrad'

export default {
  name: 'drying-list',
  components: {
    slogan,
    graphicCrad
  },
  props: ['sort','tid','schoolId','type'],
  computed: {
    ...mapGetters(['userToken'])
  },
  data() {
    return {
      DetailsId: 0,
      pictureShow: false,
      praiseShow: false,
      list: [],
      item: '',
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    getList() {
      let data = {
        params:{
          page:this.page,
          sort:this.sort,
          tid: this.tid,
          route: this.type
        }    
      }

      if(this.schoolId){
        data.params.school_id = this.schoolId
      }

      return axios.get('/book/SchoolArticle/getList',data).then(res => {
        if(this.page == 1){
          this.list = res.data.data
        }else{
          this.list = this.list.concat(res.data.data)
        }
        
        this.loading = false
        this.page++
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    onLoad() {
      this.getList()
    },
    onRefresh() {
      this.page = 1
      this.getList().then(res => {
        this.loading = false
      })
    },
    follow(item){
      this.list.forEach(element => {
        if(element.user_id == item.user_id){
          element.isSubscribe = !element.isSubscribe
        }
      })
      axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res=>{
        if(res.data.status == 1){
          this.$toast.success(res.data.msg)
        }else{
          this.$toast.fail(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.item {
  margin-bottom: 0.3125rem /* 5/16 */;
  position: relative;
}
</style>
