<template>
  <div class="beautiful-article">
    <van-nav-bar title="编辑" left-text="取消" @click-left="onClickLeft" fixed>
      <div class="head-bar-btn theme-color" slot="right">
        <van-button :loading='percent != 0' class="theme-btn" type="primary" size="small" @click="release" round>发布</van-button>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="edit-thumb theme-background">
        <div class="add-thumb"><i class="iconfont">&#xe607;</i>更换文章封面</div>
      </div>
      <van-field class="edit-title" v-model="title" placeholder="点击输入文章标题" />
        <div class="classify">
            <van-cell title-class='theme-color' title="#选择分类" :value="cateName" is-link arrow-direction="down" @click="show = true" />
        </div>
    </div>
    <div class="article-list">
      <articleCard />
    </div>
    <div class="reprint">转载外部文章 ></div>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' type='edit' :topicList='topicList'/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import articleCard from './../editor/mould/articleCard'
import topicList from './../../module/release/topicList'

export default {
  name: 'beautiful-article',
  components: {
    articleCard,
    topicList
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
  created () {
    this.fetchData()
  },
  watch: {
    "$router":"fetchData"  
  },
  methods: {
    fetchData(){
      let data = {
        params:{
          portal_name:'宝贝主页'
        }
      }

      if(this.$route.query.back == 'class-home'){
        data.params.portal_name = '班级主页'
      }    

      if(this.$route.query.back == 'apps-school'){
        data.params.portal_name = '学校主页'
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if(element.access_level == 0){
              data.push(element)
            }else{
              this.managerState.forEach(e =>{
                if((this.$route.query.id == e.banji_id||this.$route.query.id == e.school_id)&& e.item_relation != 'parent'){
                  data.push(element)
                }
              })
            }
          })
          this.topicList = data
          this.cateId = data[0].cate_id
          this.cateName = data[0].cate_name
        }
      })
    },
    onClickLeft() {

    },
    release() {

    },
    selectTag(tag) {
      this.cateName = tag.cate_name
      this.cateId = tag.cate_id
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

.edit-thumb {
  width: 100%;
  height: 12.5rem /* 200/16 */;
}

.edit-title {
  font-size: 1.25rem /* 20/16 */;
}

.edit-thumb {
  position: relative;
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
</style>
