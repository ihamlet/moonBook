<template>
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="item" v-for="(item,index) in list" :key="index">
          <div class="card-top-bg" v-if='item.isMe'></div>
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
  props: ['sort','tid'],
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
          tid: this.tid
        }    
      }

      return axios.get('/book/SchoolArticle/getList',data).then(res => {
        this.list = this.list.concat(res.data.data)
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

.card-top-bg{
  background: url('./../../../assets/img/card-top-bg.png');
  background-size: cover;
  background-position: bottom;
  width: 10rem /* 160/16 */;
  height: 4.375rem /* 70/16 */;
  right: 0;
  top: 0;
  position: absolute;
  z-index: 1;
}
</style>
