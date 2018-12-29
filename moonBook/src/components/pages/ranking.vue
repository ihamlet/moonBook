<template>
  <div class="ranking page-padding">
    <van-nav-bar :zIndex='99' class="theme-nav" title="阅读之星榜" fixed>
    </van-nav-bar>
    <div class="container">
      <div class="header">

      </div>
      <van-tabs color='#409eff' :line-width='20' :line-height='4' swipeable animated>
        <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
          <div class="content">
            <van-tabs color='#409eff' type="card" @disabled="onTabDisabledClick" @click="onTabClick">
              <van-tab v-for="(item,itemIndex) in list.content" :disabled="item.disabled" :title="item.title" :key="itemIndex">
                <van-cell-group v-if="item.content">
                    <van-cell v-for='(content,contentIndex) in item.content.list' :key="contentIndex" size='large' center>
                        <div class="title flex flex-align" slot="title">
                            <div class="avatar">
                                <img :src="content.babyInfo.avatar" @error='imgError' :alt="content.babyInfo.name" />
                            </div>
                            <div class="info">
                                <span class="name">{{content.babyInfo.name}}</span>
                                <span class="label">{{content.banji_name}}</span>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-popup v-model="show" position="bottom">
        <van-picker :columns="times" @change="onChange"/>
    </van-popup>
  </div>
</template>
<script>
// 王伟  排行榜

const TAB_CONTENT = 1
const TAB_SELECT = 2
const SELECT_VALUE = {
  '总榜': 'all',
  '季榜': 'season',
  '上季': 'last_season',
  '月榜': 'month',
  '上月': 'last_month',
  '周榜': 'week',
  '上周': 'last_week'
}

import axios from './../lib/js/api'

export default {
  name: 'ranking',
  data() {
    return {
      topTabIdx: 0,
      secondTabIdx: 0,
      times: ['总榜', '季榜', '上季', '月榜', '上月', '周榜', '上周'],
      time: 'all',
      show: false,
      tab: [
        {
          title: "宝贝榜",
          content: [
            {
              title: '同班',
              type: TAB_CONTENT,
              content: null,
              api: {
                params: {
                  group: 'baby',
                  region: 'banji',
                }
              },
            },
            {
              title: '同园',
              type: TAB_CONTENT,
              content: null,
              api: {
                params: {
                  group: 'baby',
                  region: 'school',
                }
              },
            },
            {
              title: '同城',
              type: TAB_CONTENT,
              content: null,
              api: {
                params: {
                  group: 'baby',
                  region: 'city',
                }
              },
            },
            {
              title: '总计',
              type: TAB_SELECT,
              disabled: true,
              content: null
            }
          ]
        },
        {
          title: '班级榜',
          content: [
            {
              title: '同园',
              type: TAB_CONTENT,
              content: '',
              api: {
                params: {
                  group: 'banji',
                  region: 'school'
                }
              },
            },
            {
              title: '同城',
              type: TAB_CONTENT,
              content: '',
              api: {
                params: {
                  group: 'banji',
                  region: 'city'
                }
              },
            },
            {
              title: '总计',
              type: TAB_SELECT,
              disabled: true,
              content: '',
              api: {
                params: {
                  group: 'banji',
                  region: 'all'
                }
              }
            }]
        },
        {
          title: '校园榜',
          content: [
            {
              title: '同城',
              type: TAB_CONTENT,
              content: '',
              api: {
                params: {
                  group: 'school',
                  region: 'city'
                }
              },
            }, {
              title: '总计',
              type: TAB_SELECT,
              content: '',
              disabled: true,
              api: {
                params: {
                  group: 'school',
                  region: 'all'
                }
              }
            }]
        }]
    }
  },
  created() {
    this.getTabContent()
  },
  methods: {
    onTopTabClick(idx) {
      this.topTabIdx = idx
      this.secondTabIdx = 0
      this.getTabContent()
    },
    onTabClick(idx) {
      this.secondTabIdx = idx
      this.getTabContent()
    },
    onTabDisabledClick(idx) {
      var content = this.tab[this.topTabIdx].content[idx]
      if (content.type === TAB_SELECT) {
        console.log('总计总击')
        this.show = true
      }
    },
    getTabContent() {
      var content = this.tab[this.topTabIdx].content[this.secondTabIdx]
      var toast = this.$toast.loading({
        forbidClick: true,
        loadingType: 'spinner'
      })

      var data = {
        params: content.api.params
      }
      console.log('data', data)
      axios.get('/book/SchoolTushuBorrow/getRank', data).then(res => {
        toast.clear()
        if (res.data.status === 1) {
          content.content = res.data.data
          console.log('tabs', this.tab)
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    onChange(picker, value, index) {
      this.time = value
      var currentTopTab = this.tab[this.topTabIdx]
      var lastIdx = currentTopTab.content.length - 1
      var content = currentTopTab.content[lastIdx]
      content.title = value

      var currentContent = currentTopTab.content[this.secondTabIdx]
      currentContent.api.params.time = SELECT_VALUE[value]
      this.getTabContent()
      this.show = false
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.header {
  background: linear-gradient(180deg, #05dcfe, #5768f8);
  height: 8.75rem /* 140/16 */;
}

.content {
  padding-top: 0.625rem /* 10/16 */;
  background: #fff;
}

.school-name{
    text-align: center;
    height: 2.8125rem /* 45/16 */;
    line-height: 2.8125rem /* 45/16 */;
}

.avatar,
.avatar img{
    width: 2.625rem /* 42/16 */;
    height: 2.625rem /* 42/16 */;
}

.avatar{
    margin-right: .625rem /* 10/16 */;
}

.avatar img{
    border-radius: 50%;
}

.info .label{
    font-size: .875rem /* 14/16 */;
}

.info{
    display: grid;
}

.info .name{
    font-weight: 500;
    color: #303133;
}
</style>
