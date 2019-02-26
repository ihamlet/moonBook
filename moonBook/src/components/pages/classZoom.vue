<template>
  <div class="class-zoom" :class="[type!='template'?'page-padding':'no-padding']">
    <van-nav-bar v-if='type!="template"' title="班级风采" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft"/>
    <lazy-component class="module" v-if="type != 'template'">
      <freshList :list='freshList' cid="id" avatar="avatar" routerName='baby-home' name="name" type='template' />
    </lazy-component>
    <lazy-component>
      <van-nav-bar title="班级动态" :right-text="`${manage()?'管理班级':''}`"  @click-right="toManger"/>
      <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
        <div class="list" v-if='list.length > 0'>
          <div class="item" v-for="(item,index) in list" :key="index">
            <van-cell title="" is-link arrow-direction="down" v-if='manage()' @click="operation(item)" />
            <van-cell>
              <graphic-card :item="item" type="classHome" />
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

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import freshList from './../module/findModule/freshList'
import graphicCard from './../module/card/graphicCard'
import qrCode from "./../module/mold/qrCode"
import { mapGetters } from 'vuex'

export default {
  name: "class-zoom",
  props: ['type', 'banji_id'],
  components: {
    freshList,
    graphicCard
  },
  computed:{
    ...mapGetters(['managerState'])
  },
  data() {
    return {
      show: false,
      freshList: [],
      list: [],
      cardItem: '',
      listLength: "",
      releasePageShow: false,
      loading: false,
      finished: false,
      page: 1,
      actions: [{
        name: '置顶',
        type: 'top',
        index: 0
      }, {
        name: '推荐',
        type: 'recommend',
        index: 1
      },  {
        name: '删除',
        type: 'delete',
        index: 2
      }]
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
      this.$router.go(-1)
    },
    fetchData() {
      axios.get(`/book/baby/getList?banji_id=${this.$route.query.id}`).then(res => {
        this.freshList = res.data.data
      })
    },
    onLoad() {
      let data = {
        params: {
          page: this.page,
          sort: 'top',
          banji_id: this.$route.query.id,
          portal_name: '班级主页'
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
    operation(item) {
      this.show = true
      this.cardItem = item
    },
    onSelect(item) {
      switch (item.index) {
        case 0:
          axios.get(`/book/SchoolArticle/top?id=${this.cardItem.post_id}`).then(res => {
            if(res.data.status == 1){
              this.show = false
              this.page = 1
              this.onLoad()
              this.$toast.success('置顶成功')
            }else{
              this.$toast.fail('置顶失败')
            }
          })
          break
        case 1:

          break
        case 2:
          axios.get(`/book/SchoolArticle/del?id=${this.cardItem.post_id}`).then(res => {
            if(res.data.status == 1){
              this.show = false
              this.page = 1
              this.onLoad()
              this.$toast.success('删除成功')
            }else{
              this.$toast.fail('删除失败')
            }
          })
          break
      }
    },
    manage() {
      if(this.managerState){
        let boolean
        this.managerState.forEach(element => {
          if (this.$route.query.id == element.id && element.item_relation != 'parent'){
            boolean = true
          }
        })
        return boolean
      }
    },
    toManger(){
      console.log('管理页面')
    }
  }
};
</script>
<style scoped>
.class-zoom {
  padding-top: 2.8125rem /* 45/16 */;
}

.class-zoom.no-padding {
  padding-top: 0;
}

.item {
  margin-bottom: 0.625rem /* 10/16 */;
}
</style>
