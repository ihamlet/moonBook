<template>
  <div class="search-page">
    <form action="/">
        <van-search class="search" placeholder="搜索图书/幼儿园/文章" shape="round" v-model="value" @search="onSearch" @cancel="onCancel">
            <div class="search-label" slot="label">{{tab[listIndex].name}}</div>
        </van-search>
    </form>
    <div class="search-type" v-if='value.length > 0'>
        <van-cell is-link v-for='(item,index) in tab' :key="index" @click="setListIndex(index)">
            <div class="cell flex flex-align">
                <div class="title">
                    <div class="name">{{item.name}}</div>
                </div>
                <div class="value" v-line-clamp:20="1">
                    有<span class="count">{{item.count}}</span>条与"{{value}}"相关的{{item.name}}数据
                </div>
            </div>
        </van-cell>
    </div>
    <div class="list" :class="value.length == 0?'top':''" v-if='tab[listIndex].count > 0' :key="listIndex">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <div class="item" v-for="(item,index) in list" :key="index">
                <van-cell :key="index" v-if='listIndex == 0'>
                    <bookCard :item='item' :isCollect="item.is_collect" @like='likeBook'/>
                </van-cell>
                <van-cell :key="index" v-if="listIndex == 1" @click="toSchool(item)">
                    <schoolCard :item='item' :searchType='item.school_id > 0? "wmSearchSchool":"amapSearchSchool"'/>
                </van-cell>
                <van-cell v-if="listIndex == 2" :key="index">
                    <graphicCard :item='item'/>
                </van-cell>
            </div>
        </van-list>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import bookCard from './../card/bookCard'
import schoolCard from './../search/schoolCard'
import graphicCard from './../card/graphicCard'
import { mapGetters,mapActions } from 'vuex'

import { likeBook } from './../../lib/js/mixin'

export default {
  name: 'search-page',
  mixins:[likeBook],
  components: {
    bookCard,
    schoolCard,
    graphicCard
  },
  computed: {
    ...mapGetters(['userDataState','userPointState'])
  },
  data() {
    return {
      value: '',
      tab:[{
        type:'book',
        name:'图书',
        count:0
      },{
        type:'school',
        name:'学校',
        count:0
      },{
        type:'article',
        name:'文章',
        count:0
      }],
      list:[],
      listIndex:0,
      loading: false,
      finished: false,
      page:1
    }
  },
  watch: {
    value(val){
        if(val.length == 0){
            this.onCancel()
        }else{
            this.onSearch()
        }
    }  
  },
  methods: {
    ...mapActions(['getSearch']),
    setListIndex(index){
        this.list = []
        this.listIndex = index
        switch(this.listIndex){
            case 0:
                this.getBookList()
                break
            case 1:
                this.getSchoolList()
                break
            case 2:
                this.getArticleList()
                break
        }
    },
    getBookList() {
        let data = {
            params:{
                keyword: this.value,
                page: this.page
            }
        }

        axios.get('/book/SchoolShelfBook/getList',data).then(res=>{
            switch(res.data.status){
                case 1:
                    if(this.listIndex == 0){
                        this.list = this.list.concat(res.data.data) 
                        this.page++
                        this.loading = false  
                        if(this.list.length >= res.data.count){
                            this.finished = true
                        }
                    }
                    
                    this.tab[0].count = res.data.count
                break
                case 0:
                    this.page = 1
                    this.list = []
                    this.loading = false
                    this.finished = true
                break
            }
        })
    },
    getSchoolList(){
        let arr = this.userPointState.location.split(",")
        let data = {
          keywords: this.value,
          city: this.userPointState.city,
          lng: arr[0],
          lat: arr[1],
          type: '141203|141204'
        }
  
        this.getSearch(data).then(res=>{
          if(res.count > 0){
            if(this.listIndex == 1){
                this.list = this.list.concat(res.resData)
                
                this.page++
                this.loading = false 

                if(this.list.length >= res.count){
                    this.finished = true
                }
            }

            this.tab[1].count = res.count
          }else{
            this.page = 1
            this.list = []
            this.loading = false
            this.finished = true
          }
        })
    },
    getArticleList(){
        let data = {
            params:{
                keyword: this.value,
                page: this.page,
                tid: 9
            }
        }

        axios.get('/book/SchoolArticle/getList',data).then(res=>{
            switch(res.data.status){
                case 1:
                    if(this.listIndex == 2){
                        this.list = this.list.concat(res.data.data)
                        this.page++
                        this.loading = false  
                        if(this.list.length >= res.data.count){
                            this.finished = true
                        }
                    }

                    this.tab[2].count = res.data.data.length
                break
                case 0:
                    this.page = 1
                    this.list = []
                    this.loading = false
                    this.finished = true
                break
            }
        })
    },
    onLoad(){
        this.getBookList()
        this.getSchoolList()
        this.getArticleList()
    },
    onSearch() {
        this.page = 1
        this.list = []
        this.onLoad()
    },
    onCancel() {
        this.page = 1
        this.list = []
    },
    toSchool(item){
        this.$router.replace({
            name:'apps-school',
            query:{
                id: item.school_id
            }
        })
    }
  }
}
</script>
<style scoped>
.search{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
}

.list.top,
.search-type{
    padding-top: 54px;
}

.cell{
    justify-content: space-between
}

.value{
    color: #C0C4CC;
    font-size: 13px;
    max-width: 200px;
}

.count{
    color: #F56C6C;
}
</style>