<template>
  <div class="article-setting">
    <!-- <van-nav-bar v-if='type!="mould"' :title="$route.meta.title" /> -->
    <van-cell title-class='theme-color' title="#选择分类" :value="tag.cate_name" is-link arrow-direction="down" @click="show = true" />
    <van-cell v-if='tag.cate_id!="99"&&tag.cate_id!="124"' title="同步到" value-class='cell-value' :value='synchronous' center is-link @click="isResultShow = true" />
    
    <van-popup class="page-popup-layer" position="bottom" v-model="isResultShow" get-container='#app'>
      <van-checkbox-group v-model="settingResult">
        <div class="form-title">同步到</div>
        <van-cell-group>
          <van-cell v-for="(item,index) in resultList" clickable :key="index" :title="item.title" @click="toggle(index)">
            <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes" :disabled='item.name == $route.query.back'/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='closeTopic' @confirm='show = false'  @select='selectTag' :topicList='topicList' :tagIndex='tagIndex' :cateIndex='cateIndex'/>
    </van-popup>

    <!-- 仿美篇要用到 -->
    <!-- <div class="footer-bar" v-if='type!="mould"'>
      <van-button class="theme-btn" square size="normal" type="primary" :loading='loading' @click="onClickRelease">发 布</van-button>
    </div> -->
  </div>
</template>
<script>
import axios from './../../../lib/js/api'
import topicList from './../../../module/release/topicList'
import { mapState, mapGetters, mapActions } from 'vuex'
import { contains } from './../../../lib/js/util'

export default {
  name: 'article-setting',
  // props: ['type'], // 仿美篇要用到
  components: {
    topicList
  },
  computed: {
    ...mapState('articleSetting', ['result','group','tag']),
    ...mapState('beautifulArticle',['cover','title']),
    ...mapGetters('beautifulArticle',['getArticleContent','getImageList']),
    ...mapGetters(['userDataState', 'managerState']),
    synchronous() {
      let array = []
      this.resultList.forEach(element => {
        this.result.forEach(e => {
          if (e == element.name) {
            array.push(element.title)
          }
        })
      })
      return array.join(',')
    }
  },
  data() {
    return {
      show: false,
      isResultShow: false,
      selectGroup: false,
      loading:false,
      groupList: [],
      resultList: [],
      topicList: [],
      settingResult: [],
      tagIndex:0,
      cateIndex:0
    }
  },
  created() {
    this.fetchData()
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false //去掉页面数据缓存
    next()
  },
  watch: {
    "$router": 'fetchData',
    settingResult: {
      handler(val) {
        this.addResult(val)
        localStorage.setItem('result', JSON.stringify(val))
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['release']),
    ...mapActions('articleSetting', ['addResult','addGroup','addTag']),
    fetchData() {
      let array = []

      if(this.userDataState.child_id > 0){
        array.push({
          title: '宝贝主页',
          name: 'baby-home',
          to: 1
        })     
      }

      if(this.userDataState.banji_id > 0){
        array.push({
          title: '班级',
          name: 'class-home',
          to: 1
        })
      }
     
        // if(!this.userDataState.banji_id && !this.userDataState.child_id){
        //   localStorage.removeItem('result')
        // }
    
      array.push({
        title: '发现',
        name: 'apps-find',
        to: 1
      })

      this.resultList = array
      //   设置默认
      let arr = []
      array.map(e => {
        arr.push(e.name)
      })
      
      this.settingResult = arr
      this.addResult(arr)
      
      if(localStorage.getItem('result')&&!arr.includes(this.$route.query.back)){
        this.settingResult = JSON.parse(localStorage.getItem('result'))
        this.addResult(this.settingResult)
      }

      // 获取文章分类
      let data = {
        params: {
          portal_name: '宝贝主页'
        }
      }

      if (this.$route.query.back == 'class-home') {
        data.params.portal_name = '班级主页'
      }

      if (this.$route.query.back == 'apps-school') {
        data.params.portal_name = '学校主页'
      }

      axios.get('/book/schoolArticleCate/getList', data).then(res => {
        if (res.status == 200) {
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if (element.access_level == 0) {
              data.push(element)
            } else {
              this.managerState.forEach(e => {
                if ((this.$route.query.id == e.banji_id || this.$route.query.id == e.school_id) && e.item_relation != 'parent') {
                  data.push(element)
                }
              })
            }
          })
          this.topicList = data
          //从localStorage 获取 分类信息

          if(this.$route.query.cate_id || this.$route.query.tag_id){
            cateArray.forEach((element,tagIndex)=>{
              if(this.$route.query.tag_id){
                if(element.cate_id == this.$route.query.tag_id){
                  this.tagIndex = tagIndex
                  this.addTag(element)
                }
              }else{
                element.children.forEach((e,cateIndex)=>{
                  if(e.cate_id == this.$route.query.cate_id){
                    this.tagIndex = tagIndex
                    this.cateIndex = cateIndex
                    this.addTag(e)
                  }
                })
              }
            })
          }else{
            if(localStorage.getItem('tag')){
              this.addTag(JSON.parse(localStorage.getItem('tag')))
            }else{
              this.addTag(data[0])
            }
          }
        }
      })
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onChangeGroup(picker, values) {
      this.addGroup(values)
    },
    selectTag(tag) {
       this.addTag(tag)
       localStorage.setItem('tag',JSON.stringify(tag))
    },
    closeTopic(){
      this.addTag(this.topicList[this.tagIndex])
      this.show = false
    }

    // 仿美篇要用到
    // onClickRelease(){
    //   if (!this.getArticleContent.length) {
    //     if (this.$route.query.back && this.$route.name!='home') {
    //       this.$router.push({
    //         name: this.$route.query.back,
    //         query: {
    //           id:  this.$route.query.id
    //         }
    //       })
    //     }
    //   } else {
    //       let data = {
    //         details: this.getArticleContent,
    //         template_id: 0,
    //         cover: this.cover?this.cover:this.getImageList[0],
    //         title: this.title
    //       }
  
    //       if(this.$route.query.back == 'baby-home'){
    //         data.child_id = this.$route.query.id
    //       }

    //       if(this.$route.query.back == 'class-home'){
    //         data.banji_id = this.$route.query.id
    //       }
          
    //       if(this.$route.query.back == 'apps-school'){
    //         data.school_id = this.$route.query.id
    //       }

    //       this.loading = true

    //       this.release(data).then(res=>{
    //         this.loading = false
    //         switch(res){
    //           case 1:
    //             switch(true){
    //               case this.result.includes('apps-find'):
    //                 this.$router.replace('/apps-find')
    //               break
    //               case this.result.includes('baby-home'):
    //                 this.$router.replace({
    //                   name:'baby-home',
    //                   query:{
    //                     id: this.userDataState.child_id
    //                   }
    //                 })
    //               break
    //               case this.result.includes('class-home'):
    //                 this.$router.replace({
    //                   name:'class-home',
    //                   query:{
    //                     id: this.userDataState.banji_id
    //                   }
    //                 })
    //               break
    //               default:
    //                 this.$router.replace({
    //                   name:'zoom',
    //                   query:{
    //                     id: this.userDataState.user_id
    //                   }
    //                 })
    //             }
    //             this.$toast.success('发布成功')
    //           break
    //           case 0:
    //             this.$toast(res.data.info)
    //           break
    //         }
    //     })
    //   }
    // }
  }
}
</script>
<style scoped>
.group-cell{
  padding: .625rem /* 10/16 */;
}

.cell-link{
  border-radius: .625rem /* 10/16 */;
  overflow: hidden;
  box-shadow: 0 .125rem /* 2/16 */ .9375rem /* 15/16 */ rgba(0, 0, 0, .1)
}

.icon{
  margin-right: .625rem /* 10/16 */;
}

.icon .iconfont{
  font-size: 1.25rem /* 20/16 */;
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  -webkit-background-clip: text;
  color: transparent;
}

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.theme-btn{
  width: 100%;
}
</style>
