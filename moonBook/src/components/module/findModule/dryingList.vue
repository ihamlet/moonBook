<template>
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="item" v-for="(item,index) in list" :key="index">
          <van-cell>
            <div class="content">
              <graphic-crad :item="item" />
            </div>
          </van-cell>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import slogan from './../slogan'
import graphicCrad from './../card/graphicCrad'

export default {
  name: 'drying-list',
  components: {
    slogan,
    graphicCrad
  },
  props: ['sort'],
  computed: {
    ...mapGetters(['userToken'])
  },
  data() {
    return {
      DetailsId: 0,
      pictureShow: false,
      praiseShow: false,
      list: [],
      item: '',
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    getList() {
      return axios
        .get(
          `/book/SchoolArticle/getList?page=${this.page}&token=${
          this.userToken
          }&sort=${this.sort}`
        )
        .then(res => {
          this.page++
          let datas = []
          res.data.data.forEach(element => {
            datas.push(element)
          })

          this.list = this.list.concat(datas)
          this.loading = false

          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        })
    },
    onLoad() {
      this.getList()
    },
    onRefresh() {
      this.page = 1
      this.getList().then(res => {
        this.loading = false
      })
    }
  }
}
</script>
<style scoped>
.item {
  margin-bottom: 0.3125rem /* 5/16 */;
}
</style>
