<template>
  <div class="article-operation">
    <div class="btn-warp flex flex-align">
      <div class="flex-btn">
        <van-button class="tuijian" plain round size="normal" type="default" @click="recommend"
          icon="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/tj.png"> 推荐</van-button>
      </div>
      <div class="flex-btn" v-if='isBtnShow'>
        <van-button class="shoulu" plain round size="normal" type="default" @click="selectChildren"
          icon="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/fx.png">收录</van-button>
      </div>
      <div class="flex-btn">
        <van-button class="shoulu" plain round size="normal" type="default" @click="giftShow = true"
          icon="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/jinbi.png">打赏</van-button>
      </div>

    </div>

    <van-popup v-model="childShow" position='bottom' get-container='#app'>
      <van-picker show-toolbar :visible-item-count='4' :columns="children" value-key='name' @change="onChange"
        title='收录到宝贝' @confirm='selectChild' @cancel='childShow = false' />
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' @confirm='selectConfirm' type='share'
        :topicList='topicList' />
    </van-popup>

    <van-popup position="bottom" v-model="giftShow" get-container='#app' class="gift-wrap-popup" :lock-scroll='false' :overlay='false'>
      <giftList ref='giftList' @close='giftShow = false' @toInvest='toInvest'/>
    </van-popup>

    <van-action-sheet v-model="actionsheetShow" :actions="manageActions" @select="onRecommendSelect" cancel-text="取消"
      get-container='#app' />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import topicList from './../../module/release/topicList'
import giftList from './../../module/gift/giftList'
import { mapGetters } from 'vuex'
import { manageStateList } from './../../lib/js/mixin'

export default {
  name: 'article-operation',
  mixins: [manageStateList],
  props: ['item'],
  components: {
    topicList,
    giftList
  },
  computed: {
    ...mapGetters(['managerState', 'userDataState']),
    isBtnShow() {
      let boole = true
      if (this.$route.query.back == 'zoom' || this.$route.query.back == 'baby-home') {
        boole = false
      }

      return boole
    }
  },
  data() {
    return {
      actionsheetShow: false,
      topicList: [],
      cateId: '',
      children: [],
      childId: '',
      show: false,
      childShow: false,
      giftShow: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
      if (this.userDataState.user_id) {
        let babyListData = {
          params: {
            sort: 'old',
            user_id: this.userDataState.user_id
          }
        }

        axios.get('/book/baby/getList', babyListData).then(res => {
          if (res.data.status == 1 && res.data.data.length) {
            this.children = res.data.data
            this.childId = res.data.data[0].id
          }
        })
      } else {
        this.$toast('获取用户信息失败')
      }

      let cateListData = {
        params: {
          portal_name: '宝贝主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList', cateListData).then(res => {
        if (res.status == 200) {
          this.topicList = res.data
          this.cateId = res.data[0].cate_id
        }
      })
    },
    onChange(picker, values) {
      this.childId = values.id
    },
    selectChild() {
      this.childShow = false
      this.show = true
    },
    selectTag(tag) {
      this.cateId = tag.cate_id
    },
    selectConfirm() {
      this.$router.push({
        name: 'graphic',
        query: {
          ...this.$route.query,
          post_id: this.$route.query.id
        }
      })

      this.show = false
    },
    recommend() {
      if (this.managerState.length) {
        this.actionsheetShow = true
      } else {
        let data = {
          title: '',
          message: '',
          routeName: '',
          query: ''
        }

        switch ('0') {
          case this.userDataState.school_id:
            data.title = '请加入学校',
              data.message = '加入学校，及时了解学校动态',
              data.routeName = 'edit-school'
            data.query = {
              type: 'register'
            }
            break
          case this.userDataState.banji_id:
            data.title = '请加入班级',
              data.message = '加入班级，及时了解班级动态',
              data.routeName = 'edit-class'
            data.query = {
              school_name: this.userDataState.school_name,
              school_id: this.userDataState.school_id,
              name: this.userDataState.child_name,
              type: 'register'
            }
            break
        }

        this.$dialog.confirm({
          title: data.title,
          message: data.message,
          cancelButtonText: '稍后',
          confirmButtonText: '加入'
        }).then(() => {
          this.$router.push({
            name: data.routeName,
            query: data.query
          })
        }).catch(() => {

        })

      }
    },
    selectChildren() {
      if (this.children.length) {
        this.childShow = true
      } else {
        this.$dialog.confirm({
          title: '请添加宝贝',
          message: '添加宝贝，掌握孩子阅读数据，亲子阅读邀请你来参加',
          cancelButtonText: '稍后',
          confirmButtonText: '添加'
        }).then(() => {
          this.$router.push({
            name: 'edit-child',
            query: {
              type: 'add'
            }
          })
          localStorage.removeItem('childInfo')
        }).catch(() => {

        })
      }
    },
    toInvest(){
      this.giftShow = false

      this.$router.push({
          name:'Invest'
      })
    }
  }
}
</script>
<style scoped>
.article-operation {
  padding: 1.25rem /* 20/16 */ 0;
}

.btn-warp {
  padding: 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */;
}

.flex-btn {
  flex: 1;
  padding: 0 5px;
}

.shoulu,
.tuijian {
  width: 100%;
}

.gift-wrap-popup {
  background: rgba(0, 0, 0, 0.7);
}
</style>
