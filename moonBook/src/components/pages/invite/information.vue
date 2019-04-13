<template>
  <div class="information">
    <van-nav-bar :title="$route.meta.title" :zIndex='2021'/>
    <div class="information-list">
      <div class="get-praise"> <span> 宝贝收到的赞 </span> </div>
      <div class="list">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <div class="content" v-if='count > 0'>
              <van-cell v-for="(item,index) in list" :key="index">
                <div class="flex flex-algin">
                  <div class="avatar">
                      <img :src="item.sender_avatar" @error='imgError' />
                  </div>
                  <div class="content">
                    <div class="intro title">{{item.intro}}</div>
                    <div class="create-date">{{item.create_date_friendly}}</div>
                    <div class="details">{{item.details}}</div>
                  </div>
                </div>
              </van-cell>
            </div>
            <div class="no-content" v-else>
              没有收到赞，加油集赞吧　:-)
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'


export default {
  name: "information",
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      list: [],
      count: 0
    }
  },
  methods: {
    onRefresh() {
      this.page = 1
      this.onLoad().then(res => {
        this.loading = false
      })
    },
    onLoad() {
      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id,
          type: 'zan'
        }
      }

      return axios.get('/book/MemberMsg/getList', data).then(res => {
        if (res.data.status == 1) {
          this.count = res.data.count

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
        }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.avatar{
  flex: 1;
}

.avatar img{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
}

.content{
  flex: 5;
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

.get-praise {
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  background: #fff;
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 2020;
  position: relative;
}

.get-praise span{
  margin-left: 1.25rem /* 20/16 */;
}

.no-content {
  height: 18.75rem /* 300/16 */;
  line-height: 18.75rem /* 300/16 */;
  text-align: center;
  background: #fff;
  color: #c0c4cc;
}

.intro{
    font-weight: 700;
}

.create-date{
    color:#C0C4CC;
}
</style>
