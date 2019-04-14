<template>
  <div class="read-guide">
    <van-nav-bar :title="$route.meta.title" right-text="书架" @click-right="onClickRight" :border='false'/>
    <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <div class="article">
          <div class="container">
            <div class="article-title">{{list.articleTitle}}</div>
            <div class="content" v-html='list.article'></div>
            <van-button class="theme-btn" type="primary" plain hairline size='normal'>阅读全文</van-button>
          </div>
        </div>
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
        content: [],
        article:'',
        articleTitle:''
      }, {
        title: '中班',
        content: [],
        article:'',
        articleTitle:''
      }, {
        title: '大班',
        content: [],
        article:'',
        articleTitle:''
      }],
      tabIndex: 0
    }
  },
  updated () {
    this.$nextTick(()=>{
      let imgs = document.getElementsByTagName('img')
      for(let i = 0 ; i < imgs.length ; i ++){
        if(imgs[i].src.indexOf(location.origin) == -1){
          imgs[i].src = imgs[i].src.replace('http:', 'https:')
        }
      }
    })
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
              let articleData = {
                params:{
                  ajax:1,
                  fr:'official',
                  title:`${this.tab[this.tabIndex].title}推荐书单导读`
                }
              }

              axios.get('/book/SchoolArticle/detail',articleData).then(res=>{
                  switch(res.data.status){
                    case 1:
                      this.tab[this.tabIndex].article = res.data.data.post.details
                      this.tab[this.tabIndex].articleTitle = res.data.data.post.title
                    break
                  }
              })

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
            break
            case 0:
              this.page = 1
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
.article{
  padding: .625rem /* 10/16 */;
}

.container{
 background: #fff; 
 padding: .625rem /* 10/16 */;
 border-radius: .625rem /* 10/16 */;
}

.article-title{
  margin-bottom: .625rem /* 10/16 */;
  font-size: 1.25rem /* 20/16 */;
  position: relative;
  font-weight: 700;
}

.article-title::before{
  content: '';
  width: .25rem /* 4/16 */;
  height: .9375rem /* 15/16 */;
  background: #0084ff;
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.theme-btn{
  width: 100%;
}

.content{
  font-size: 1.125rem /* 18/16 */;
  padding-bottom: 1.25rem /* 20/16 */;
}
</style>
