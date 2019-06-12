<template>
  <div class="article-operation">
    <div class="btn-warp flex flex-align">
      <div class="flex-btn">
        <van-button class="theme-btn tuijian" round size="normal" type="primary" @click="recommend"> <i class="iconfont">&#xe668;</i> 推荐</van-button>
      </div>
      <div class="flex-btn" v-if='isBtnShow'>
        <van-button class="theme-btn shoulu" round size="normal" type="primary" @click="selectChildren"> <i class="iconfont">&#xe6ea;</i>收录</van-button>
      </div>
    </div>

    <van-popup v-model="childShow" position='bottom'  get-container='#app'>
      <van-picker show-toolbar :visible-item-count='4' :columns="children" value-key='name' @change="onChange" title='收录到宝贝' @confirm='selectChild' @cancel='childShow = false'/>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' @confirm='selectConfirm' type='share' :topicList='topicList'/>
    </van-popup>

    <van-action-sheet v-model="actionsheetShow" :actions="recommendActions" @select="onRecommendSelect" cancel-text="取消" get-container='#app' />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import topicList from './../../module/release/topicList'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'article-operation',
  props: ['item'],
  components: {
    topicList  
  },
  computed: {
    ...mapGetters(['managerState','userDataState']),
    recommendActions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {   
          let data = {
            name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? '(' + element.child_name + ')' : '(管理员)'}`,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      return array
    }, 
    isBtnShow(){
      let boole = true
      if(this.$route.query.back == 'zoom' || this.$route.query.back == 'baby-home'){
        boole = false
      }

      return boole
    }
  },
  data() {
    return {
        actionsheetShow: false,
        topicList:[],
        cateId:'',
        children:[],
        childId:'',
        show: false,
        childShow: false
    }
  },
  created () {
    this.fetchData()  
  },
  watch: {
    "$router":'fetchData'  
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData(){
      this.getUserData().then(res=>{
        if(res.user_id){
          let babyListData = {
            params:{
              sort:'old',
              user_id:res.user_id
            }
          }

          axios.get('/book/baby/getList',babyListData).then(res => {
            if(res.data.status == 1&&res.data.data.length){
              this.children = res.data.data
              this.childId = res.data.data[0].id
            }
          })
        }else{
          this.$toast('获取用户信息失败')
        }
      })

      let cateListData = {
        params:{
          portal_name:'宝贝主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList',cateListData).then(res=>{
        if(res.status == 200){
          this.topicList = res.data
          this.cateId = res.data[0].cate_id
        }
      })
    },
    onRecommendSelect(item) {
      let data = {
        params: {
          post_id: this.item.post_id
        }
      }

      if (item.type == 'banji') {
        data.params.banji_id = item.id
      }

      if (item.type == 'school') {
        data.params.school_id = item.id
      }

      axios.get('/book/SchoolArticle/copy', data).then(res => {
        if (res.data.status == 1) {
          this.$toast.success('推荐成功')
        } else {
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
    },
    onChange(picker, values){
      this.childId = values.id
    },
    selectChild(){
      this.childShow = false
      this.show = true
    },
    selectTag(tag) {
      this.cateId = tag.cate_id
    },
    selectConfirm(){
      let data = {
        child_id: this.childId || '',
        cate_id: this.cateId || ''
      }


      this.$router.push({
        name:'graphic',
        query:{
          ...this.$route.query,
          post_id: this.$route.query.id
        }
      })

      // axios.get('/book/SchoolArticle/copy',data).then(res=>{
      //   if(res.data.status == 1){
      //     let CommentData = {
      //       post_id: this.$route.query.id,
      //       contents: '收录了这篇文章'
      //     }
      //     axios.post('/book/SchoolArticleComment/edit?ajax=1',CommentData).then(res => {
      //       if(res.data.status == 1){
      //         this.$toast.success('收录成功')
      //       }
      //     })
      //   }else{
      //     this.$toast.fail('操作失败')
      //   }
      // })

      this.show = false
    },
    recommend(){
      if(this.managerState.length){
        this.actionsheetShow = true
      }else{
        let data = {
          title:'',
          message:'',
          routeName:''
        }

        switch('0'){
          case this.userDataState.school_id:
            data.title = '请加入学校',
            data.message = '加入学校，及时了解学校动态',
            data.routeName = 'edit-school'
          break
          case this.userDataState.banji_id:
            data.title = '请加入班级',
            data.message = '加入班级，及时了解班级动态',
            data.routeName = 'edit-class'
          break
        }

        this.$dialog.confirm({
          title: data.title,
          message: data.message,
          cancelButtonText:'稍后',
          confirmButtonText:'加入'
        }).then(() => {
          this.$router.push({
            name: data.routeName
          })
        }).catch(() => {
          
        })

      }   
    },
    selectChildren(){
      if(this.children.length){
        this.childShow = true
      }else{
        this.$dialog.confirm({
          title: '请添加宝贝',
          message: '添加宝贝，掌握孩子阅读数据，亲子阅读邀请你来参加',
          cancelButtonText:'稍后',
          confirmButtonText:'添加'
        }).then(() => {
          this.$router.push({
            name:'edit-child',
            query:{
              type:'add'
            }
          })
          localStorage.removeItem('childInfo')
        }).catch(() => {
          
        })
      }
    }
  }
}
</script>
<style scoped>
.article-operation{
    padding: 1.25rem /* 20/16 */ 0;
}

.btn-warp {
  padding: 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */;
}

.flex-btn{
    flex: 1;
    padding: 0 1.25rem /* 20/16 */;
}

.theme-btn{
    width: 100%;
}

.theme-btn.shoulu {
  background: linear-gradient(90deg, #ff765c, #ff23b3);
}
</style>
