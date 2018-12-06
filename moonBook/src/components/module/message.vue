<template>
  <div class="message">
    <van-tabs color='#409eff' :line-width='20' sticky>
      <van-tab v-for="(list,index) in tab" :key="index" :disabled="index==1&&tabDisabled">
        <div class="tab-title" slot="title">
          {{list.title}}
          <div class="unread badge" v-if="index==0">
            {{list.content.length}}
          </div>
        </div>

        <div class="list">
          <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
            <van-swipe-cell :right-width="index==0?150:0">
              <van-cell-group>
                <van-cell>
                  <div class="flex flex-align">
                    <div class="icon" :class="[item.content.type=='moonBook'?'moon-book':'system']">
                      <i class="iconfont moon-book" v-if="item.content.type=='moonBook'">&#xe605;</i>
                      <i class="iconfont system" v-else>&#xe600;</i>
                    </div>
                    <div class="msg-content">
                      <div class="type">
                        <div class="name">{{item.content.type=='moonBook'?'阅亮书架':'系统消息'}}</div>
                        <div class="date">
                          <span>{{item.date}}</span>
                          <span>{{item.time}}</span>
                        </div>
                      </div>
                      <div class="text" v-line-clamp:20="1">{{item.content.text}}</div>
                    </div>
                  </div>
                </van-cell>
              </van-cell-group>
              <div slot="right" class="slot flex" :style="{width:150+'px'}">
                <span class="add-read" @click="addRead(item)">标记已读</span>
                <span class="topping" @click="topping(item)">置顶</span>
              </div>
            </van-swipe-cell>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <slogan />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import slogan from "./../module/slogan";
import axios from "@/fetch/api";

export default {
  name: 'message',
  props: ['readList'],
  components: {
    slogan
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
      }]
    }
  },
  created() {
    this.fetchData()
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
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getMsgLength']),
    fetchData() {
      axios.get('/api/messageList').then(res => {
        this.tab[0].content = res.data.messageData.messageList
      })
      axios.get('/api/readList').then(res => {
        this.tab[1].content = res.data
      })
    },
    addRead(item) {
      axios.put('/api/addRead', {
        id: item.id
      }).then(res => {
        this.getMsgLength()
        this.tab[0].content = res.data.messageData.messageList
        this.tab[1].content = res.data.readList
      })
    },
    topping(item) {
      axios.put('/api/topping', {
        id: item.id
      }).then(res => {
        this.tab[0].content = res.data.messageData.messageList
      })
    }
  }
}
</script>
<style scoped>
.type {
  font-size: 1rem /* 16/16 */;
  color: #303133;
  position: relative;
}

.text {
  color: #606266;
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
  position: absolute;
  top: 0;
  right: 0;
  color: #c0c4cc;
  font-size: 0.75rem /* 12/16 */;
  line-height: normal;
}

.add-read,
.topping {
  width: 50%;
}

.list .slot {
  text-align: center;
  height: 4.375rem /* 70/16 */;
  line-height: 4.375rem /* 70/16 */;
  color: #fff;
}

.add-read {
  background: #c0c4cc;
}

.topping {
  background: #03a9f4;
}
</style>
