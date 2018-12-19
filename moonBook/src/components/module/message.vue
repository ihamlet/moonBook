<template>
  <div class="message">
    <van-tabs color='#409eff' :line-width='20' sticky @change='onChange'>
      <van-tab v-for="(list,index) in tab" :key="index" :disabled="index==1&&tabDisabled">
        <div class="tab-title" slot="title">
          {{list.title}}
          <div class="unread badge" v-if="index==0">
            {{MsgLengthState}}
          </div>
        </div>
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="list">
              <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
                <van-swipe-cell :right-width="index==0?78:0">
                  <van-cell-group>
                    <van-cell>
                      <div class="flex flex-align">
                        <div class="icon" :class="[item.msg_type.name=='bookshelf'?'moon-book':'system']">
                          <i class="iconfont moon-book" v-if="item.msg_type.name=='bookshelf'">&#xe605;</i>
                          <i class="iconfont system" v-else>&#xe600;</i>
                        </div>
                        <div class="msg-content">
                          <div class="type flex flex-align">
                            <div class="name">{{item.msg_type.name=='bookshelf'?'阅亮书架':'系统消息'}}</div>
                            <div class="date">
                              {{item.create_date}}
                            </div>
                          </div>
                          <div class="text" v-line-clamp:20="2"><span class="title">【{{item.title}}】</span>{{item.details}}</div>
                        </div>
                      </div>
                    </van-cell>
                  </van-cell-group>
                  <div slot="right" class="slot" :style="{width:'78px'}">
                    <span class="topping" @click="topping(item)">置顶</span>
                  </div>
                </van-swipe-cell>
              </div>
            </div>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import axios from './../lib/js/api'

export default {
  name: 'message',
  computed: {
    ...mapGetters(['MsgLengthState'])
  },
  data() {
    return {
      tabDisabled: true,
      tab: [{
        title: '未读消息',
        content: []
      }, {
        title: '已读消息',
        content: []
      }],
      page: 1,
      loading: false,
      finished: false,
      tabIndex:0,
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
        console.log(res)
      })
    },
    onLoad(){
      if(this.tabIndex == 0){
        this.getMsgList()
      }
      if(this.tabIndex == 1){

      }
    },
    getMsgList(){
      let products = {
        page: this.page
      }
      return this.getMsg(products).then(res => {
        this.tab[this.tabIndex].content = res
        this.page++ 
        this.loading = false
        if (this.tab[this.tabIndex].content.length >= this.MsgLengthState) {
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
    onChange(index,title){
      this.tabIndex = index
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

.list .slot {
  text-align: center;
  height: 5.625rem /* 90/16 */;
  line-height: 5.625rem /* 90/16 */;
  color: #fff;
}

.title{
  font-size: .875rem /* 14/16 */;
  color: #409EFF;
}
</style>
