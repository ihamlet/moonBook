<template>
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="item" v-for="(item,index) in list" :key="index">
          <van-cell v-if='item.isMe' title='' is-link arrow-direction="down" @click="actionsheet(item)"/>
          <van-cell>
            <div class="content">
              <graphic-card :item="item" @follow="follow"/>
            </div>
          </van-cell>
        </div>
      </van-pull-refresh>
    </van-list>

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import slogan from './../slogan'
import graphicCard from './../card/graphicCard'

export default {
  name: 'drying-list',
  components: {
    slogan,
    graphicCard
  },
  props: ['sort','tid','schoolId','type','portal_name'],
  computed: {
    ...mapGetters(['userToken'])
  },
  data() {
    return {
      postId:'',
      show:false,
      DetailsId: 0,
      pictureShow: false,
      praiseShow: false,
      list: [],
      item: '',
      loading: false,
      finished: false,
      page: 1,
      actions: [{
        name: '删除',
        type: 'delete',
        index: 0
      }]
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

      if(this.portal_name){
        data.params.portal_name = this.portal_name
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
    },
    onSelect(item) {
      switch(item.index){
        case 0:
          axios.get(`/book/SchoolArticle/del?id=${this.postId}`).then(res=>{
            if(res.data.status == 1){
              this.page = 1
              this.onLoad()
              this.$toast.success('删除成功')
              this.show = false
            }else{
              this.$toast.fail('删除失败')
            }
          })
        break
      }
    },
    actionsheet(item){
        this.show = true
        this.postId = item.post_id
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
