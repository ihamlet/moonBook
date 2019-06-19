<template>
  <div class="drying-list">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <div class="no-content" v-if='list.length == 0'>
            尚无内容
          </div>
          <div class="item" v-for="(item,index) in list" :key="index" @click="setItem(item)" v-else>
            <van-cell>
              <div class="content">
                <graphic-card :item="item" @follow="follow" @more='actionsheet'/>
              </div>
            </van-cell>
          </div>
      </van-list>
     </van-pull-refresh>

    <!-- 管理员推荐操作 -->
    <van-action-sheet v-model="actionsheetShow" :actions="manageActions" @select="onRecommendSelect" cancel-text="取消" get-container='#app' />

    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" get-container='#app'/>
    <!-- 用户文章操作 -->
    <van-action-sheet v-model="reportShow" :actions="reportActions" cancel-text="取消" @select="onReportSelect" @cancel="reportShow = false" get-container='#app'/>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import { manageStateList } from './../../lib/js/mixin'
import slogan from './../slogan'
import graphicCard from './../card/graphicCard'

export default {
  name: 'drying-list',
  mixins:[ manageStateList ],
  components: {
    slogan,
    graphicCard
  },
  props: ['params', 'tagId', 'school_id', 'type', 'portal_name', 'banji_id', 'cateId'],
  computed: {
    ...mapGetters(['userToken', 'managerState','userDataState']),
    manage() {
      if (this.managerState) {
        let boolean
        this.managerState.forEach(element => {
          if (element.item_relation == 'teacher') {
            boolean = true
          }
        })
        return boolean
      }
    },
    actions() {
      let arr = [{
        name: '推荐',
        type: 'recommend',
        index: 2
      }]
      if (this.item.isMe) {
        arr.push(
        {
          name: '删除',
          type: 'delete',
          index: 1
        })
      } else {
        if (this.manage) {
          arr.push({
            name: '删除',
            type: 'delete',
            index: 1
          })
        }

        arr.push({
          name: '举报',
          type: 'report',
          index: 3
        })
      }

      return arr
    },
    reportActions() {
      let arr = []
      arr.push({
          name: '垃圾内容',
          subname: '低俗，标题党等',
        }, {
          name: '拉黑',
          subname: `不再推送${this.item ? `${this.item.user.name}` : '他'}发布的内容`,
          is_block: 1
        })

      return arr
    }
  },
  data() {
    return {
      postId: '',
      templateId: '',
      show: false,
      DetailsId: 0,
      pictureShow: false,
      praiseShow: false,
      actionsheetShow: false,
      list: [],
      item: '',
      loading: false,
      finished: false,
      page: 1,
      reportShow: false
    }
  },
  methods: {
    getList() {
      let data = {
        params: {
          page: this.page,
          ...this.params,
          tag_id: this.tagId,
          route: this.type,
          cate_id: this.cid,
          banji_id: this.banji_id
        }
      }

      if (this.school_id) {
        data.params.school_id = this.school_id
      }

      if (this.portal_name) {
        data.params.portal_name = this.portal_name
      }

      if(this.cateId){
        data.params.cate_id = this.cateId
      }

      return axios.get('/book/SchoolArticle/getList', data).then(res => {
        if (res.data.status == 1) {
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
          this.list = []
          this.loading = false
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
        this.finished = false
      })
    },
    follow(item) {
      this.list.forEach(element => {
        if (element.user_id == item.user_id) {
          element.isSubscribe = !element.isSubscribe
        }
      })
      axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res => {})
    },
    onSelect(item) {
      switch (item.index) {
        case 1:
          this.$dialog.confirm({
            title: '删除',
            message: '您确认要删除吗'
          }).then(() => {
            let data ={
              params:{
                id: this.postId
              }
            }

            if(this.$route.name == 'apps-school'){
              data.params.mode = 'school'
            }

            axios.get('/book/SchoolArticle/del',data).then(res => {
              if (res.data.status == 1) {
                let index
                this.list.forEach((e, i) => {
                  if (e.post_id == this.postId) {
                    index = i
                  }
                })
                this.list.splice(index, 1)

                this.$toast.success('删除成功')
              } else {
                this.$toast(res.data.msg)
              }
            })
          }).catch(() => {
            // on cancel
          })
          this.show = false
          break
          case 2:
            if(this.managerState.length){
              this.actionsheetShow = true
              if(this.$route.name == 'apps-school'){
                this.manageActions.splice(this.manageActions.length-1,1)
              }
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

              this.show = false
          }
          break
        case 3:
          this.reportShow = true
          this.show = false
          break
      }
    },
    actionsheet(item) {
      this.show = true
      this.postId = item.post_id
      this.templateId = item.template_id
    },
    onReportSelect(item) {
      let data = {
        params: {
          post_id: this.postId,
          reason: item.name,
          is_block: item.is_block ? item.is_block : ''
        }
      }

      axios.get('/book/SchoolArticle/report', data).then(res => {
        this.$toast(res.data.msg)

        let array = this.list
        let index
        array.forEach((element, i) => {
          if (this.item.post_id == element.post_id) {
            index = i
          }
        })

        this.list.splice(index, 1)
      })

      this.reportShow = false
    },
    setItem(item) {
      this.item = item
    },
    // formatBanjiTitle(text) {
    //   if(text){
    //     if (text.indexOf('班') == -1) {
    //       return text + '班'
    //     } else {
    //       let arr = text.split('')
    //       let newArr = [...new Set(arr)]
    //       return newArr.join('')
    //     }
    //   }
    // },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    }
  }
}
</script>
<style scoped>
.item {
  margin-bottom: 0.3125rem /* 5/16 */;
  position: relative;
}

.no-content {
  width: 100%;
  height: 12.5rem /* 200/16 */;
  background: #fff;
  text-align: center;
  line-height: 12.5rem /* 200/16 */;
  color: #dce3f0;
}

.layer-head-bar {
  justify-content: space-between;
}

.layer-head-bar .theme-btn {
  margin-right: 0.9375rem /* 15/16 */;
}
</style>
