<template>
  <div class="class-zoom" :class="[type!='template'?'page-padding':'no-padding']">
    <van-nav-bar v-if='type!="template"' :title="$route.query.name?$route.query.name:'班级风采'" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="module" v-if="type != 'template'">
      <freshList :list='freshList' cid="id" avatar="avatar" routerName='baby-home' name="name" type='template' />
    </div>
    <div>
      <van-nav-bar :title="$route.query.name?'':'班级动态'"/>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
          <div class="list" v-if='list.length > 0'>
            <div class="item" v-for="(item,index) in list" :key="index">
              <van-cell>
                <graphic-card :item="item" type="classHome" @more='operation'/>
              </van-cell>
            </div>
          </div>
          <div class="not-content" v-else>尚无内容</div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom">
      <graphic @close='releasePageShow = false' />
    </van-popup>

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
    <!-- 管理员推荐操作 -->
    <van-actionsheet v-model="actionsheetShow" :actions="recommendActions" @select="onRecommendSelect" cancel-text="取消" />
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
    ...mapGetters(['managerState']),
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
    recommendActions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {  
          let data = {
            name: `${element.item_type == 'school'?element.name:this.formatBanjiTitle(element.name)}${element.child_name?'('+element.child_name+')':'(管理员)'}`,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      return array
    }
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
      actionsheetShow:false,
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
        if(res.data.status == 1){
          this.freshList = res.data.data
        }
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
        if(res.data.status == 1){
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
        }else{
          this.loading = false
          this.finished = true
        }
      })
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(res=>{
        this.loading = false
      })
    },
    operation(item) {
      this.show = true
      this.cardItem = item
    },
    onSelect(item) {
      switch (item.index) {
        case 0:
          axios.get(`/book/SchoolArticle/top?post_id=${this.cardItem.post_id}`).then(res => {
            if(res.data.status == 1){
              this.onRefresh()
              this.$toast.success('置顶成功')
            }else{
              this.$toast.fail('置顶失败')
            }
          })

          this.show = false
          break
        case 1:
          this.actionsheetShow = true
          this.show = false
          break
        case 2:
          axios.get(`/book/SchoolArticle/del?id=${this.cardItem.post_id}`).then(res => {
            if(res.data.status == 1){
                let index
                this.list.forEach((e,i)=>{
                  if(e.post_id == this.postId){
                    index = i
                  }
                })
                
                this.list.splice(index,1)
              this.$toast.success('删除成功')
            }else{
              this.$toast.fail('删除失败')
            }
          })

          this.show = false
          break
      }
    },
    toManger(){
      console.log('管理页面')
    },
    onRecommendSelect(){
      let data = {
        params:{
          post_id: this.postId
        }
      }

      if(item.type == 'banji'){
        data.params.banji_id = item.id
      }

      if(item.type == 'school'){
        data.params.school_id = item.id
      }

      axios.get('/book/SchoolArticle/copy',data).then(res=>{
        if(res.data.status == 1){
          this.$toast.success('推荐成功')
        }else{
          this.$toast.fail('操作失败')
        }
      })

      this.actionsheetShow = false
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
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
  margin-bottom: .3125rem /* 5/16 */;
}
</style>
