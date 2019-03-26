<template>
  <div class="read-guide">
    <van-nav-bar :title="$route.meta.title" right-text="书架" @click-right="onClickRight" />
    <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if='index == tabIndex'>
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                    <bookCard :item='item' type='guide'/>
                </van-cell>
            </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import bookCard from './../../module/card/bookCard'

export default {
  name: 'read-guide',
  components: {
    bookCard  
  },
  data() {
    return {
      loading:false,
      finished:false,
      page: 1,
      tab: [{
        title: '小班',
        article: '',
        content: []
      }, {
        title: '中班',
        article: '',
        content: []
      }, {
        title: '大班',
        article: '',
        content: []
      }],
      tabIndex: 0,
      article:''
    }
  },
  methods: {
    onLoad() {
      //获取图书列表
      let bookList = {
          params:{
            page: this.page,
            sort: 'random',
            keyword: this.tab[this.tabIndex].title
          }
      }
      return axios.get('/book/SchoolShelfBook/getList', bookList).then(res => {
        switch(res.data.status){
            case 1:
              if(this.page == 1){
                this.tab[this.tabIndex].content = res.data.data
              }else{
                this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
              }
      
              this.loading = false
              this.page++
              if (this.tab[this.tabIndex].content.length >= res.data.count) {
                  this.finished = true
              }

              let articleData = {
                params:{
                  ajax:1,
                  fr:'official',
                  title:`${this.tab[this.tabIndex].title}进阶指导`
                }
              }

              axios.get('/book/SchoolArticle/detail',articleData).then(res=>{
                  switch(res.data.status){
                    case 1:
                      console.log(res)
                    break
                  }
              })

            break
            case 0:
              this.loading = false
              this.finished = true
            break
        }
      })
    },
    onClickRight() {
      this.$router.push({
        name: 'bookshelf'
      })
    },
    onRefresh(){
        this.page = 1
        this.onLoad().then(res =>{
            this.loading = false
        })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
</style>
