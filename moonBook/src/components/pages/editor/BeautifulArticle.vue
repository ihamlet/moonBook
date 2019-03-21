<template>
  <div class="beautiful-article">
    <van-nav-bar title="编辑" left-text="取消" @click-left="onClickLeft" fixed :zIndex='10'>  
      <!-- <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='getPercentNum != 0' class="theme-btn" type="primary" size="small" round @click="onClickRelease">发布</van-button>
      </div> -->
    </van-nav-bar>
    <div class="container">
      <div class="edit-thumb theme-background" @click="toChangeCover">
        <img v-if='getImageList.length' :src='cover?cover:getImageList[0]'>
        <div class="add-thumb"><i class="iconfont">&#xe607;</i>更换封面</div>
      </div>
      <van-field class="edit-title" v-model="title" placeholder="点击输入文章标题" />
    </div>
    <div class="article-list">
      <articleCard :PercentNum='getPercentNum'/>
    </div>

    <div class="flex flex-align footer-bar">
       <div class="preview theme-color" @click="preview">{{getPercentNum != 0?'生成中...':'预览'}}</div>
       <van-button class="theme-btn" :loading='getPercentNum != 0' square type="primary" size="normal" @click="next">下一步</van-button>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import articleCard from './../editor/mould/articleCard'
import topicList from './../../module/release/topicList'
import { mapState,mapGetters,mapActions } from 'vuex'

export default {
  name: 'beautiful-article',
  components: {
    articleCard,
    topicList
  },
  computed: {
    ...mapState('beautifulArticle',['cover']),
    ...mapGetters('beautifulArticle',['getPercentNum','getImageList','getTitle']),
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      percent: 0,
      title: '',
      show: false,
      cateName:'',
      cateId:'',
      topicList:[]
    }
  },
  watch: {
    title(val){
      this.addTitle(val)
    }
  },
  methods: {
    ...mapActions('beautifulArticle',['addTitle']),
    preview(){
      if(this.getPercentNum == 0){
        this.$router.push({
          name:'article',
          query:{
            type:'preview',
            back: this.$route.name,
            back_id: this.$route.query.id,
            back_name: this.$route.query.back
          }
        })
      }
    },
    onClickLeft(){
      if(this.$route.query.back){
        this.$router.push({
          name: this.$route.query.back,
          query:{
            id: this.$route.query.id
          }
        })
      }else{
        this.$router.push({
          name:'apps-find'
        })
      }
    },
    next() {

      switch(0){
        case this.getTitle.length:
          this.$toast('请输入文章标题')
        break
        case this.getImageList.length:
          this.$toast('请填写文章段落')
        break
        default:
        this.$router.push({
          name:'articleSetting',
          query:{
            id: this.$route.query.id,
            back: this.$route.query.back
          }
        })
      }

      // if(this.getTitle.length&&this.getImageList.length){
      //   this.$router.push({
      //     name:'articleSetting',
      //     query:{
      //       id: this.$route.query.id,
      //       back: this.$route.query.back
      //     }
      //   })
      // }else{
      //   this.$toast('请输入文章标题')
      // }

    },
    selectTag(tag) {
      this.cateName = tag.cate_name
      this.cateId = tag.cate_id
    },
    toChangeCover(){
      this.$router.push({
        name:'changeCover',
        query:{
          type:'revise'
        }
      })
    }
  }
}
</script>
<style scoped>
.add {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.add i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #909399;
}

.edit-title {
  font-size: 1.25rem /* 20/16 */;
}

.edit-thumb {
  position: relative;
  width: 100%;
  height: 9.375rem /* 150/16 */;
  overflow: hidden;
}

.edit-thumb img{
  position: absolute;
  left:50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-thumb,
i.iconfont {
  font-size: 0.8125rem /* 13/16 */;
}

.add-thumb i.iconfont {
  margin-right: 0.3125rem /* 5/16 */;
}

.add-thumb {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 1.25rem /* 20/16 */;
  right: 0;
  color: #fff;
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
  border-radius: 0.625rem /* 10/16 */ 0 0 0.625rem; /* 10/16 */
}

.reprint {
  font-size: 0.875rem /* 14/16 */;
  position: absolute;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
  text-align: center;
  width: 100%;
  bottom: 0;
}

.article-list {
  position: relative;
}

.add {
  margin-top: 0.625rem /* 10/16 */;
}

.beautiful-article{
  padding-bottom: 12.5rem /* 200/16 */;
  overflow: hidden;
}

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.preview{
  flex: 1;
  text-align: center;
  background: #fff;
  height: 2.75rem;
  line-height: 2.75rem;
}

.theme-btn{
  flex: 2
}
</style>
