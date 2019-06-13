<template>
  <div class="read-guide">
    <div class="banner">
      <i class="iconfont">&#xe62d;</i>
      <div class="bg-black flex flex-justify">
        <van-button plain round class="theme-plain" type="primary" @click="toBookShelf">前往书架</van-button>
      </div>
    </div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="tab">
        <van-tabs color='#0084ff' :line-width='20' :line-height='4' swipeable animated @change="onChangeTab">
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">

                <div class="article" v-if='list.article'>
                  <div class="content">
                    <div class="article-title">{{list.articleTitle}}</div>
                    <media :item='list.article'/>
                    <!-- <van-button class="theme-btn" type="primary" plain hairline size='normal'>阅读全文</van-button> -->
                  </div>
                </div>
    
              <!-- <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad"  v-if='index == tabIndex'>
                  <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                      <bookCard :item='item' type='guide'/>
                  </van-cell>
              </van-list> -->
          </van-tab>
        </van-tabs>
      </div>
    </van-pull-refresh>
    <div class="slogan">
      {{$store.state.slogan}}
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import bookCard from './../../module/card/bookCard'
import media from './../../module/mold/media'

export default {
  name: 'read-guide',
  components: {
    bookCard,
    media
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
  created () {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData(){
      this.onRefresh()
    },
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
                      this.tab[this.tabIndex].article = res.data.data.post
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
              this.tab[this.tabIndex].content = []
            break
        }
      })
    },
    toBookShelf() {
      this.$router.push({
        name: 'bookshelf'
      })
    },
    onRefresh(){
        this.page = 1
        this.onLoad().then(res =>{
            this.loading = false
            this.finished = false
        })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.tab[this.tabIndex].content = []
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
.container{
 background: #fff; 
 padding:20px;
 border-radius: .625rem /* 10/16 */;
}

.article-title{
  font-size: 20px;
  position: relative;
  font-weight: 700;
  text-align: center;
  height: 46px;
  line-height: 46px;
  padding-top: 20px;
  color: #303133;
}

.theme-btn{
  width: 100%;
}

.content{
  font-size: 1.125rem /* 18/16 */;
  padding-bottom: 1.25rem /* 20/16 */;
}

.banner{
  width: 100%;
  height: 300px;
  background-image: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/guide.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
}

.bg-black{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
}

.tab{
  margin-top: 140px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  min-height: 200px;
}

.theme-plain{
  margin-top: 50px;
}

.slogan{
  text-align: center;
  height: 100px;
  line-height: 100px;
}

.banner .iconfont{
  font-size: 60px;
  position: absolute;
  color: #F44336;
  top: -10px;
}
</style>
<style>
.content blockquote{
  background: #F2F6FC;
  padding: 10px;
  color: #909399;
  margin-bottom: 30px;
  text-align: justify;
}

strong{
  margin-bottom: 20px;
}
</style>
