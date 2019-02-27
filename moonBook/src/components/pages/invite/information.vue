<template>
  <div class="information">
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="information-list">
        <div class="get-praise">我收到的赞</div>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <van-cell v-for="(item,index) in list" :key="index">
                <div class="flex flex-algin">
                    <div class="avatar"></div>
                    <div class="content">
                        <div class="member">刘二龙，杜晓等6人赞同你发布的</div>
                        <div class="article-title">少儿阅读需要知道那些技巧</div>
                    </div>
                </div>
            </van-cell>
            <van-cell v-for="(item,index) in list" :key="index">
                <div class="flex flex-algin">
                    <div class="avatar"></div>
                    <div class="content">
                        <div class="member">刘二龙，杜晓等6人赞同你发布的</div>
                        <div class="article-title">少儿阅读需要知道那些技巧</div>
                    </div>
                </div>
            </van-cell>
            <van-cell v-for="(item,index) in list" :key="index">
                <div class="flex flex-algin">
                    <div class="avatar"></div>
                    <div class="content">
                        <div class="member">刘二龙，杜晓等6人赞同你发布的</div>
                        <div class="article-title">少儿阅读需要知道那些技巧</div>
                    </div>
                </div>
            </van-cell>            
          </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: "information",
  data() {
    return {
      page:1,
      loading:false,
      finished: false,
      list:[]
    }
  },
  methods:{
      onClickLeft(){
          if(this.$route.query.back){
              this.$router.push({
                  name:this.$route.query.back,
                  query:{
                      id: this.$route.query.id
                  }
              })
          }else{
              this.$router.push({
                  name:'my'
              })
          }
      },
      onRefresh(){
          this.page = 1
          this.loading = false
          this.finished = false
      },
      onLoad(){
          this.loading = false
          this.finished = true
          let data = {
              params:{
                page: this.page,
                child_id: this.$route.query.id
              }
          }

          axios.get('/book/SchoolArticleZan/getList',data).then(res=>{
              console.log(res)
          })
          
      }
  }
}
</script>
<style scoped>
.avatar{
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    border-radius: 50%;
    overflow: hidden;

    background: #ddd;
    margin-right: .625rem /* 10/16 */;
}

.amount-item {
  flex: 1;
  text-align: center;
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.amount-type {
  margin-bottom: 0.3125rem /* 5/16 */;
}

.total {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  padding: 0 1.25rem /* 20/16 */;
  font-size: 0.875rem /* 14/16 */;
}

.get-praise{
    height: 1.875rem /* 30/16 */;
    padding: 0 1.25rem /* 20/16 */;
    line-height: 1.875rem /* 30/16 */;
    background: #fff;
    box-shadow: 0 .125rem /* 2/16 */ .625rem /* 10/16 */ rgba(0, 0, 0, .1)
}
</style>
