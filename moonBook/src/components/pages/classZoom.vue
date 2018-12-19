<template>
  <div class="class-zoom page-padding">
    <van-nav-bar title="班级风采" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft" @click-right='onClickRight'>
      <div slot="right" class="theme-color">
        <i class="iconfont">&#xe612;</i>
      </div>
    </van-nav-bar>
    <lazy-component class="module">
      <freshList :list='freshList' cid="id" avatar="avatar" routerName='baby-home' name="name"/>
    </lazy-component>
    <lazy-component class="module">
      <van-nav-bar title="班级动态" />
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="list" v-if='list.length > 0'>
          <div class="item" v-for="(item,index) in list" :key="index">
            <van-cell>
              <graphic-crad :item="item" type="classHome"/>
            </van-cell>
          </div>
        </div>
        <div class="not-content" v-else>尚无内容</div>
      </van-list>
    </lazy-component>
    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom">
      <graphic @close='releasePageShow = false' />
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex"
import freshList from './../module/findModule/freshList'
import graphicCrad from './../module/card/graphicCrad'
import graphic from './../module/release/graphic'
import qrCode from "./../module/mold/qrCode"

export default {
  name: "class-zoom",
  props: ['classInfo'],
  components: {
    freshList,
    graphicCrad,
    graphic
  },
  computed: {
    ...mapGetters(['dryingListLengthState'])
  },
  data() {
    return {
      freshList: [],
      list: [],
      listLength: "",
      releasePageShow: false,
      loading: false,
      finished: false,
      page:1,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'class-home',
        query: {
          id: this.$route.query.id
        }
      })
    },
    onClickRight() {
      this.releasePageShow = true
    },
    fetchData() {
      axios.get(`/book/baby/getList?banji_id=${this.$route.query.id}`).then(res => {
        this.freshList = res.data.data
      })

      axios.get("/api/classAticleList").then(res => {
        this.listLength = res.data.length
      })
    },
    onLoad() {
      axios.get(`/book/SchoolArticle/getList?page=${this.page}&limit=10&banji_id=${this.$route.query.id}`).then(res => {
        this.list = this.list.concat(res.data.data)
        this.loading = false
        this.page++
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    }
  }
};
</script>
<style scoped>
.class-zoom {
  padding-top: 2.8125rem /* 45/16 */;
}
</style>
