<template>
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-cell-group>
          <div class="item" v-for='(item,index) in list' :key="index" @click="toArticle(item)">
            <van-cell v-if='item.template_id == "0"'>
              <div class="cell-content">
                <van-row :gutter='5'>
                  <van-col :span='item.photos.length > 3?"24":"14"'>
                    <div class="title" v-line-clamp:20="3" :class="[item.photos.length > 3?'layout-t-b':'layout-l-r']">
                      {{item.title}}
                    </div>
                  </van-col>
                  <van-col :span='item.photos.length > 3?"24":"10"'>
                    <van-row :gutter="5" v-if='item.photos.length > 3'>
                      <van-col :span="item.photos.length < 3?'12':'8'" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
                        <div class="img-grid" v-if='photoIndex < 3'>
                          <img class="img-preview" :src="photo.thumb" />
                        </div>
                      </van-col>
                    </van-row>
                    <van-row :gutter="5" class="article-cover" v-else>
                      <van-col :span='24'>
                        <div class="img-grid">
                          <img class="img-preview" :src="item.cover"  v-http2https/>
                        </div>
                      </van-col>
                    </van-row>
                  </van-col>
                </van-row>
                <div class="article-data flex flex-align">
                  <van-tag plain type="danger" v-if='item.is_top == 1'>置顶</van-tag>
                  <div class="info flex flex-align">
                    <div class="school" v-if='item.schoolName' v-line-clamp:20="1">{{item.schoolName}}</div>
                    <div class="views">{{item.views}}浏览</div>
                    <div class="time-ago">{{item.timeAgo}}</div>
                  </div>
                </div>
              </div>
            </van-cell>
          </div>
      </van-cell-group>
    </van-list>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import slogan from './../module/slogan'
import graphicCard from './../module/card/graphicCard'
import { timeago, randomNum, arrayUnique } from './../lib/js/util'

export default {
  name: 'article-list',
  components: {
    slogan,
    graphicCard
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: randomNum(1,30)
    }
  },
  methods: {
    onLoad() {
      this.getList()
    },
    getList() {
      let data = {
        params: {
          page: this.page,
          sort: 'top',
          portal_name: '首页',
          load_mode: 'random'
        }
      }

      return axios.get('/book/SchoolArticle/getList', data).then(res => {
        if(res.data.status == 1){

          let list = arrayUnique(res.data.data,'title')

          if (this.page == 1) {
            this.list = list
          } else {
            this.list = this.list.concat(list)
          }

          this.loading = false
          this.page++

          if (this.list.length >= 200) {
            this.finished = true
          }
        }
      })
    },
    toArticle(item) {
      this.$router.push({
        name:'article',
        query:{
          id:item.post_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    }
  }
}
</script>
<style scoped>
.course-item {
  position: relative;
}

.participate {
  width: 6.875rem /* 110/16 */;
  height: 1.25rem /* 20/16 */;
  border: 0.0625rem /* 1/16 */ solid #e6a23c;
  color: #e6a23c;
  display: block;
  text-align: center;
  line-height: 1.25rem /* 20/16 */;
}

.title {
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}

.layout-t-b {
  margin-bottom: 0.625rem /* 10/16 */;
}

.article-data {
  margin-top: 0.3125rem /* 5/16 */;
}

.article-data .info {
  font-size: 0.8125rem /* 13/16 */;
}

.school,
.views {
  margin-right: 0.625rem /* 10/16 */;
}

.school{
  max-width: 150px;
}

.img-grid {
  margin-top: auto;
  padding-bottom: 70%;
}
</style>
