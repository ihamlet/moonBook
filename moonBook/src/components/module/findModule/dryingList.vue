<template>
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="no-content" v-if='list.length == 0'>
          尚无内容
        </div>
        <div class="item" v-for="(item,index) in list" :key="index" @click="setItem(item)" v-else>
          <van-cell title='' is-link arrow-direction="down" @click="actionsheet(item)" />
          <van-cell>
            <div class="content">
              <graphic-card :item="item" @follow="follow" />
            </div>
          </van-cell>
        </div>
      </van-pull-refresh>
    </van-list>

    <!-- 管理员推荐操作 -->
    <van-actionsheet v-model="actionsheetShow" :actions="recommendActions" @select="onRecommendSelect" cancel-text="取消"
      getContainer='#app' />

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
    <!-- 用户文章操作 -->
    <van-actionsheet v-model="reportShow" :actions="reportActions" cancel-text="取消" @select="onReportSelect" @cancel="reportShow = false" />
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import slogan from './../slogan'
import graphicCard from './../card/graphicCard'

export default {
  name: 'drying-list',
  components: {
    slogan,
    graphicCard
  },
  props: ['sort', 'tid', 'school_id', 'type', 'portal_name', 'cid', 'banji_id'],
  computed: {
    ...mapGetters(['userToken', 'managerState']),
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
        arr.push({
          name: '编辑',
          type: 'edit',
          index: 0
        }, {
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
    recommendActions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {
          if (element.item_relation == 'teacher') {
            let data = {
              name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? '(' + element.child_name + ')' : '(管理员)'}`,
              subname: `${element.duty}-${element.desc}`,
              id: element.id,
              type: element.item_type
            }

            array.push(data)
          }
        })
      }

      return array
    },
    reportActions() {
      let arr = []
      arr.push({
        name: '不感兴趣',
        subname: '减少这类内容',
      }, {
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
          sort: this.sort,
          tid: this.tid,
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

      return axios.get('/book/SchoolArticle/getList', data).then(res => {
        if (res.data.status == 1) {
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
    },
    follow(item) {
      this.list.forEach(element => {
        if (element.user_id == item.user_id) {
          element.isSubscribe = !element.isSubscribe
        }
      })
      axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res => {
        if (res.data.status == 1) {
          this.$toast.success(res.data.msg)
        } else {
          this.$toast.fail(res.data.msg)
        }
      })
    },
    onSelect(item) {
      switch (item.index) {
        case 0:
          switch (this.templateId) {
            case '0':
              this.$router.push({
                name: 'publishing',
                query: {
                  post_id: this.postId,
                  template_id: this.templateId,
                  back: this.$route.name,
                  id: this.$route.query.id,
                  type: 'edit'
                }
              })
              break
            case '1':
              this.$router.push({
                name: 'graphic',
                query: {
                  post_id: this.postId,
                  template_id: this.templateId,
                  back: this.$route.name,
                  id: this.$route.query.id,
                  type: 'edit'
                }
              })
              break
          }
          break
        case 1:
          this.$dialog.confirm({
            title: '删除',
            message: '您确认要删除吗'
          }).then(() => {
            axios.get(`/book/SchoolArticle/del?id=${this.postId}`).then(res => {
              if (res.data.status == 1) {
                let index
                this.list.forEach((e, i) => {
                  if (e.post_id == this.postId) {
                    index = i
                  }
                })

                console.log(index)

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
          this.actionsheetShow = true
          this.show = false
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
    onRecommendSelect(item) {
      let data = {
        params: {
          post_id: this.postId
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
