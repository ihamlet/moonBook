<template>
  <div class="class-zoom" :class="[type!='template'?'page-padding':'no-padding']">
    <van-nav-bar v-if='type!="template"' title="班级风采" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft" @click-right='onClickRight'>
      <div slot="right" class="theme-color">
        <i class="iconfont">&#xe612;</i>
      </div>
    </van-nav-bar>
    <lazy-component class="module">
      <freshList :list='freshList' cid="id" avatar="avatar" routerName='baby-home' name="name" type='template'/>
    </lazy-component>
    <lazy-component>
      <van-nav-bar title="班级动态" />
      <van-list v-model="loading" :finished="finished" @load="onLoad"  :finished-text="$store.state.slogan">
        <div class="list" v-if='list.length > 0'>
          <div class="item" v-for="(item,index) in list" :key="index">
            <van-cell title="" is-link arrow-direction="down"  v-if='manage(item)' @click="operation(item)"/>
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

     <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import freshList from './../module/findModule/freshList'
import graphicCrad from './../module/card/graphicCrad'
import graphic from './../module/release/graphic'
import qrCode from "./../module/mold/qrCode"

export default {
  name: "class-zoom",
  props: ['type','banji_id'],
  components: {
    freshList,
    graphicCrad,
    graphic
  },
  data() {
    return {
      show:false,
      managerList:[],
      freshList: [],
      list: [],
      cardItem:'',
      listLength: "",
      releasePageShow: false,
      loading: false,
      finished: false,
      page:1,
      actions: [{
        name: '置顶',
        type: 'top'
      },{
        name: '推荐',
        type: 'recommend'
      },{
        name: '屏蔽',
        type: 'shield'
      },{
        name: '删除',
        type: 'delete'  
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
    onClickRight() {
      this.releasePageShow = true
    },
    fetchData() {
      axios.get('/book/MemberBanji/getList').then(res=>{
        this.managerList = res.data.data
      })

      axios.get(`/book/baby/getList?banji_id=${this.$route.query.id}`).then(res => {
        this.freshList = res.data.data
      })
    },
    onLoad() {
      return axios.get(`/book/SchoolArticle/getList?page=${this.page}&limit=10&banji_id=${this.$route.query.id}&sort=top`).then(res => {
        if(this.page == 1){
          this.list = res.data.data
        }else{
          this.list = this.list.concat(res.data.data)
        }
      
        this.loading = false
        this.page++
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    operation(item){
      this.show = true
      this.cardItem = item
    },
    onSelect(item){
      // if (item.type == 'delete') {
      // //   axios.get(`/book/SchoolArticle/del?id=${this.postId}`).then(res=>{
      // //     let key 
      // //     this.list.forEach((element,i) => {
      // //       if(element.post_id == this.postId){
      // //         key = i
      // //       }
      // //     })
      // //     this.list.splice(key,1)
      // //   })
      // //   this.show = false

      // //   this.$toast.success('删除成功')
      // }

      if(item.type == 'delete'){
        axios.get(`/book/SchoolArticle/del?id=${this.cardItem.post_id}`).then(res=>{
           this.show = false
           this.$toast.success('删除成功')
           this.page = 1
           this.onLoad()
        })
      }
    },
    manage(item){
      let boolean = false
      this.managerList.forEach(element => {
        if(element.id == item.class_id || element.id == item.school_id){
          boolean = true
        }
      })
      return boolean
    }
  }
};
</script>
<style scoped>
.class-zoom {
  padding-top: 2.8125rem /* 45/16 */;
}

.class-zoom.no-padding{
  padding-top: 0;
}

.item{
  margin-bottom: .625rem /* 10/16 */;
}
</style>
