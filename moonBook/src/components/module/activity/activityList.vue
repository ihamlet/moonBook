<template>
  <div class="activity-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" @click="toArticle(item)">
            <div class="flex-column">
                <div class="activity-cover">
                    <img class="cover-img" :src="item.cover"/>
                    <van-tag class="tag" type="success" size="medium">活动</van-tag>
                </div>
                <div class="activity-info">
                    <div class="title">{{item.title}}</div>
                    <div class="details" v-line-clamp:20="3">{{item.details}}</div>
                </div>
            </div>
        </van-cell>
        </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'activityList',
  props: ['tid'],
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      let data = {
        params:{
          tid: this.$route.query.tid
        }
      }

     return axios.get('/book/SchoolArticle/getList',data).then(res => {
        if (res.data.status == 1) {
          if (this.page == 1) {
            this.list = res.data.data
          } else {
            this.list = this.list.concat(res.data.data)
          }

          this.loading = false
          this.page++

          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        }
      })
    },
    onRefresh(){
        this.page = 1
        this.onLoad().then(()=>{
            this.loading = false
            this.finished = false
        })
    },
    toArticle(item,point){
      this.$router.push({
        name:'article',
        query:{
          id: item.post_id,
          type: item.template_id,
          back: this.$route.name,
          back_id: this.$route.query.id,
          tid: this.tid
        }
      })
    }
  }
}
</script>
<style scoped>
.activity-cover{
    height: 10rem /* 160/16 */;
    border-radius: 0.625rem /* 10/16 */;
    overflow: hidden;
    position: relative;
}

.activity-cover img {
  object-fit: cover;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.icon {
  margin-right: 0.9375rem /* 15/16 */;
}

.icon .iconfont {
  font-size: 1.625rem /* 26/16 */;
  background: linear-gradient(127deg, #ff5722, #e91e63);
  -webkit-background-clip: text;
  color: transparent;
}

.title{
    font-weight: 700;
    font-size: 1.125rem /* 18/16 */;
    margin-top: .625rem /* 10/16 */;
}

.details{
    margin: .625rem /* 10/16 */ 0;
    font-size: 1rem /* 16/16 */;
    line-height: 1.8;
}

.tag{
    position: absolute;
    left: .625rem /* 10/16 */;
    bottom: .625rem /* 10/16 */;
}
</style>
