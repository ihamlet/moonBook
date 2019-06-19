<template>
  <div class="class-zoom page-padding">
     <van-nav-bar :title="$route.query.name?'':'班级动态'" :border='false' :key='$route.query.id'/>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
          <div class="list" v-if='list.length > 0'>
            <div class="item" v-for="(item,index) in list" :key="index">
              <van-cell>
                <graphic-card :item="item" type="classHome" @more='operation'/>
              </van-cell>
            </div>
          </div>
          <div class="not-content" v-else>尚无内容</div>
        </van-list>
      </van-pull-refresh>
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" get-container='#app'/>
    <!-- 管理员推荐操作 -->
    <van-action-sheet v-model="actionsheetShow" :actions="manageActions" @select="onRecommendSelect" cancel-text="取消" get-container='#app'/>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import graphicCard from './../module/card/graphicCard'
import { mapGetters } from 'vuex'
import { manageStateList } from './../lib/js/mixin'

export default {
  name: "class-zoom",
  mixins: [manageStateList],
  props: ['banji_id'],
  components: {
    graphicCard
  },
  computed:{
    ...mapGetters(['managerState']),
    manage() {
      if(this.managerState){
        let boolean = false
        this.managerState.forEach(element => {
          if (this.$route.query.id == element.id && element.item_relation != 'parent'){
            boolean = true
          }
        })
        
        return boolean
      }
    }
  },
  data() {
    return {
      show: false,
      freshList: [],
      list: [],
      cardItem: '',
      listLength: "",
      releasePageShow: false,
      loading: false,
      finished: false,
      actionsheetShow:false,
      page: 1,
      actions: [{
        name: '置顶',
        type: 'top',
        index: 0
      }, {
        name: '推荐',
        type: 'recommend',
        index: 1
      },  {
        name: '删除',
        type: 'delete',
        index: 2
      }]
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          page: this.page,
          sort: 'top',
          banji_id: this.$route.query.id,
          portal_name: '班级主页'
        }
      }
  
      return axios.get('/book/SchoolArticle/getList', data).then(res => {
        switch(res.data.status){
          case 1:
            if (this.page == 1) {
              this.list = res.data.data
            } else {
              this.list = this.list.concat(res.data.data)
            }
            this.page++
            this.loading = false
            if (this.list.length >= res.data.count) {
              this.finished = true
            }
          break
          case 0:
            this.loading = false
            this.finished = true
          break
        }
      })
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(res=>{
        this.loading = false
        this.finished = false
      })
    },
    operation(item) {
      this.show = true
      this.cardItem = item
    },
    onSelect(item) {
      switch (item.index) {
        case 0:
          axios.get(`/book/SchoolArticle/top?post_id=${this.cardItem.post_id}`).then(res => {
            if(res.data.status == 1){
              this.onRefresh()
              this.$toast.success('置顶成功')
            }else{
              this.$toast.fail('置顶失败')
            }
          })

          this.show = false
          break
        case 1:
          this.actionsheetShow = true
          this.show = false
          break
        case 2:
          let data = {
            params:{
              id:this.cardItem.post_id,
              mode:'banji'
            }
          }

          axios.get('/book/SchoolArticle/del',data).then(res => {
            if(res.data.status == 1){
                let index
                this.list.forEach((e,i)=>{
                  if(e.post_id == this.postId){
                    index = i
                  }
                })
                
                this.list.splice(index,1)
              this.$toast.success('删除成功')
            }else{
              this.$toast.fail('删除失败')
            }
          })

          this.show = false
          break
      }
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        let arr = text.split('')
        let newArr = [...new Set(arr)]
        return newArr.join('')
      }
    }
  }
};
</script>
<style scoped>
</style>
