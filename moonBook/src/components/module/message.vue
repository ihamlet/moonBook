<template>
  <div class="message">
    <van-tabs color='#409eff' :line-width='20' sticky @change='onChange'>
      <van-tab v-for="(list,index) in tab" :key="index">
        <div class="tab-title" slot="title">
          {{list.title}}
          <div class="unread badge" v-if="index==0 && MsgLengthState > 0">
            {{MsgLengthState}}
          </div>
        </div>
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="list" v-if="list.content.length > 0">
              <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex" @click="toMsgDetails(item)">
                <van-swipe-cell :right-width="index==0?78:0">
                  <van-cell-group>
                    <van-cell>
                      <div class="flex flex-align">
                        <div class="icon" :class="[item.msg_type=='bookshelf'?'moon-book':'system']">
                          <i class="iconfont moon-book" v-if="item.msg_type=='bookshelf'">&#xe605;</i>
                          <i class="iconfont system" v-else>&#xe600;</i>
                        </div>
                        <div class="msg-content">
                          <div class="type flex flex-align">
                            <div class="name">{{item.msg_type=='bookshelf'?'阅亮书架':'系统消息'}}</div>
                            <div class="date">
                              {{item.create_date_friendly}}
                            </div>
                          </div>
                          <div class="text" v-line-clamp:20="1"><span class="title">【{{item.title}}】</span>{{item.intro}}</div>
                        </div>
                      </div>
                    </van-cell>
                  </van-cell-group>
                  <div slot="right" class="slot" :style="{width:'78px'}">
                    <span class="topping" @click="topping(item)" :class="item.is_top == 1?'cancel':''">{{item.is_top ==
                      1?'取消置顶':'置顶'}}</span>
                  </div>
                </van-swipe-cell>
              </div>
            </div>
            <div class="no-content" v-else>暂无{{list.title}}</div>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show" class="page-popup" position="right">
      <msg-details :details='details' @close='show = false' />
    </van-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import axios from './../lib/js/api'
import msgDetails from './../module/msgDetails'

export default {
  name: 'message',
  components: {
    msgDetails
  },
  computed: {
    ...mapGetters(['MsgLengthState'])
  },
  data() {
    return {
      tab: [{
        title: '未读消息',
        isRead: 0,
        content: []
      }, {
        title: '已读消息',
        isRead: 1,
        content: []
      }],
      page: 1,
      loading: false,
      finished: false,
      tabIndex: 0,
      show: false,
      details: ''
    }
  },
  watch: {
    tab: {
      handler(val) {
        if (val[1].content.length > 0) {
          this.tabDisabled = false
        }
      },
      deep: true
    },
  },
  methods: {
    ...mapActions(['getMsg']),
    topping(item) {
      axios.get(`/book/MemberMsg/top?msg_id=${item.msg_id}`).then(res => {
        this.isLoading = false
        this.page = 1
        this.onLoad()
      })
    },
    toMsgDetails(item) {
      axios.get(`/book/MemberMsg/getInfo?msg_id=${item.msg_id}`).then(res => {
        this.details = res.data.data
        this.isLoading = false
        this.page = 1
        this.onLoad()
        this.getMsg()
      })
      this.show = true
    },
    onLoad() {
      this.getMsgList()
    },
    getMsgList() {
      return axios.get(`/book/MemberMsg/getList?page=${this.page}&is_read=${this.tab[this.tabIndex].isRead}&sort=top`).then(res => {
        let array = res.data.data
        this.loading = false
        if (this.page == 1) {
          this.tab[this.tabIndex].content = array
        } else {
          this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(array)
        }
        this.page++
        if (this.tab[this.tabIndex].content.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.getMsgList().then(res => {
        this.loading = false
      })
    },
    onChange(index, title) {
      this.tabIndex = index
      this.page = 1
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
.type {
  font-size: 1rem /* 16/16 */;
  color: #303133;
  position: relative;
  justify-content: space-between;
}

.text {
  color: #606266;
  text-align: justify;
}

.icon {
  flex: 1;
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  line-height: 3.125rem /* 50/16 */;
  text-align: center;
  margin-right: 0.9375rem /* 15/16 */;
  color: #fff;
  border-radius: 0.375rem /* 6/16 */;
  opacity: 0.8;
}

.icon.moon-book {
  background: #ffc107;
}

.icon.system {
  background: #03a9f4;
}

.msg-content {
  flex: 6;
}

.icon i.iconfont {
  font-size: 1.75rem /* 28/16 */;
}

.tab-title {
  position: relative;
}

.tab-title .unread {
  position: absolute;
  right: 2.5rem /* 40/16 */;
  top: 0.3125rem /* 5/16 */;
}

.date {
  color: #c0c4cc;
  font-size: 0.75rem /* 12/16 */;
  line-height: normal;
}

.topping {
  background: #03a9f4;
  display: block;
}

.topping.cancel {
  background: #f56c6c;
}

.list .slot {
  text-align: center;
  height: 4.375rem /* 70/16 */;
  line-height: 4.375rem /* 70/16 */;
  color: #fff;
}

.title {
  font-size: 0.875rem /* 14/16 */;
  color: #409eff;
}

.no-content {
  width: 100%;
  height: 18.75rem /* 300/16 */;
  line-height: 18.75rem /* 300/16 */;
  text-align: center;
  background: #fff;
  color: #c0c4cc;
}
</style>
