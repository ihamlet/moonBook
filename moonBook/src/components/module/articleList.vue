<template>
  <div class="article-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-cell-group>
        <van-cell v-for='(item,index) in listArray' :key="index" @click="toArticle(item)">
          <div class="cell-content">
            <van-row :gutter='4'>
              <van-col :span='item.photos.length > 3?"24":"16"'>
                <div class="title" :class="[item.photos.length > 3?'layout-t-b':'layout-l-r']">
                  {{item.title}}
                </div>
              </van-col>
              <van-col :span='item.photos.length > 3?"24":"8"'>
                <van-row :gutter="4" v-if='item.photos.length > 3'>
                  <van-col :span="item.photos.length == 4?'12':'8'" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
                    <div class="img-grid" :class="[photo.height/photo.width > 18/9&&type!='card'?'long':'']" v-if='photoIndex < 3'>
                      <img class="img-preview" :class="[photo.height/photo.width > 18/9?'long':'']" :src="photo.thumb" />
                      <van-tag class="photo-tag" type="danger" v-if='photo.height/photo.width > 18/9'>长图</van-tag>
                    </div>
                  </van-col>
                </van-row>
                <van-row :gutter="4" class="article-cover" v-else>
                  <van-col :span='24'>
                    <div class="img-grid">
                      <img class="img-preview" :src="item.photos[0].thumb" />
                    </div>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>

            <div class="article-data flex flex-align">
              <van-tag plain type="danger" v-if='item.is_top == 1'>置顶</van-tag>
              <div class="info flex flex-align">
                <div class="school">{{item.schoolName}}</div>
                <div class="views">{{item.views}}浏览</div>
                <div class="time-ago">{{item.timeAgo}}</div>
              </div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import slogan from './../module/slogan'
import { timeago } from './../lib/js/util'

export default {
  name: 'article-list',
  components: {
    slogan
  },
  computed: {
    listArray() {
      let array = []
      this.list.forEach(element => {
        if (element.template_id == 0 && element.photos.length > 0) {

          let datas = {
            title: element.title,
            photos: element.photos,
            schoolName: element.schoolName,
            views: element.views,
            is_top: element.is_top,
            timeAgo: timeago(element.create_time*1000),
            id: element.post_id
          }

          array.push(datas)
        }
      })

      return array
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
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
          portal_name: '首页'
        }
      }

      return axios.get('/book/SchoolArticle/getList', data).then(res => {
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
      })
    },
    toArticle(item){
      this.$router.push({
        name:'article',
        query:{
          id:item.id,
          back: this.$route.name
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

.title{
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}

.layout-t-b{
  margin-bottom: .625rem /* 10/16 */;
}

.article-data{
  margin-top: .3125rem /* 5/16 */;
}

.article-data .info{
  font-size: .8125rem /* 13/16 */;
}

.views,
.time-ago{
  margin-left: .625rem /* 10/16 */;
}

.img-grid{
  margin-top: auto;
  padding-bottom: 72%;
}
</style>
