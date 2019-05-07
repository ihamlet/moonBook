<template>
  <div class="ranking-page page-padding">
    <van-nav-bar :zIndex='2018' :class="fixedHeaderBar?'theme-nav':''" title="阅读之星榜" fixed :border='false'  @click-right="onClickRight">
        <div class="child-avatar" slot="right">
          <van-button round class="theme-btn more-btn" size="small" type="primary">更多榜单</van-button>
        </div>
    </van-nav-bar>
    <div class="container">
      <div class="header" ref='head'>
        <div class="my-info" v-if='tab[topTabIdx].content[secondTabIdx]'>
          <card type='myInfo' :rankingData='tab[topTabIdx].content[secondTabIdx].content.myInfo' />
        </div>
      </div>
      <van-tabs  color='#0084ff' :line-width='20' :line-height='4'  @change="onTopTabClick"  sticky swipeable animated>
        <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
          <div class="content" v-if='topTabIdx == index'>
            <van-tabs color='#0084ff' type="card" @disabled="onTabDisabledClick" @click="onTabClick">
              <van-tab v-for="(item,itemIndex) in list.content" :disabled="item.disabled" :title="item.title" :key="itemIndex">
                <van-cell-group v-if="item.content">
                  <van-cell v-for='(content,contentIndex) in item.content.list' :key="contentIndex" value-class='cell-value' title-class='cell-title' :value='`${content.read_count}本`' size='large' center @click="toPage(content)">
                    <div class="icon" slot="icon">
                      <svg-ranking :ranking="content.rank" />
                    </div>
                    <div class="title flex flex-align" slot="title">
                      <div class="avatar" :class="content.rank < 4?'rank':''" v-if='content.babyInfo.avatar'>
                        <img :src="content.babyInfo.avatar" @error='imgError' v-http2https/>
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

    <slogan />

    <van-popup v-model="show" position="bottom">
      <van-picker :columns="times" @change="onChange" />
    </van-popup>
  </div>
</template>
<script>
import svgRanking from './../module/animate/svg/ranking'
import card from './../module/ranking/card'
import slogan from './../module/slogan'
import { mapActions,mapGetters } from 'vuex'


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
  components: {
    svgRanking,
    card,
    slogan
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      topTabIdx: 0,
      secondTabIdx: 0,
      times: ['总榜', '季榜', '上季', '月榜', '上月', '周榜', '上周'],
      time: 'all',
      show: false,
      fixedHeaderBar: true,
      domHeight: "",
      tab: [
        {
          title: "宝贝榜",
          content: [
            {
              title: '同班',
              type: TAB_CONTENT,
              content: '',
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
              content: '',
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
              content: '',
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
              content: ''
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions(['getUserData']),
    onTopTabClick(idx) {
      this.topTabIdx = idx
      this.secondTabIdx = 0
      this.getTabContent()
    },
    onTabClick(idx) {
      this.secondTabIdx = idx
      this.getTabContent()
    },
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    },
    handleScroll() {
      this.getDomHeight()
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    onTabDisabledClick(idx) {
      let content = this.tab[this.topTabIdx].content[idx]
      if (content.type === TAB_SELECT) {
        this.show = true
      }
    },
    getTabContent() {
      let content = this.tab[this.topTabIdx].content[this.secondTabIdx]
      let toast = this.$toast.loading({
        forbidClick: true,
        loadingType: 'spinner'
      })

      let data = {
        params: {
          group: content.api.params.group,
          time: content.api.params.time,
          region: content.api.params.region
        }
      }


        data.params.banji_id = this.userDataState.banji_id
        data.params.child_id = this.userDataState.child_id
        axios.get('/book/SchoolTushuBorrow/getRank', data).then(res => {
          toast.clear()
          if (res.data.status === 1) {
            content.content = res.data.data
          } else {
            this.$toast(res.data.msg)
          }
        })
   
    },
    onChange(picker, value, index) {
      this.time = value
      let currentTopTab = this.tab[this.topTabIdx]
      let lastIdx = currentTopTab.content.length - 1
      let content = currentTopTab.content[lastIdx]
      content.title = value

      let currentContent = currentTopTab.content[this.secondTabIdx]
      currentContent.api.params.time = SELECT_VALUE[value]
      this.getTabContent()
      this.show = false
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    onClickRight() {
      this.$router.push({
        name:'RankingList'
      })
    },
    toPage(content) {
      if (this.topTabIdx == 0) {
        this.$router.push({
          name: 'baby-home',
          query: {
            id: content.child_id,
            back: this.$route.name
          }
        })
      }

      if (this.topTabIdx == 1) {
        this.$router.push({
          name: 'class-home',
          query: {
            id: content.banji_id,
            back: this.$route.name
          }
        })
      }

      if (this.topTabIdx == 2) {
        this.$router.push({
          name: 'apps-school',
          query: {
            id: content.school_id,
            back: this.$route.name
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.header {
  background: linear-gradient(0deg, #05dcfe, #5768f8);
  height: 8.75rem /* 140/16 */;
}

.content {
  padding-top: 0.625rem /* 10/16 */;
  background: #fff;
}

.school-name {
  text-align: center;
  height: 2.8125rem /* 45/16 */;
  line-height: 2.8125rem /* 45/16 */;
}

.avatar img {
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
}

.avatar img {
  border: 0.125rem /* 2/16 */ solid #fff;
}

.avatar {
  margin-right: 0.625rem /* 10/16 */;
  border: 0.125rem /* 2/16 */ solid #0084ff;
  border-radius: 50%;
  overflow: hidden;
}

.avatar.rank {
  border-color: #ffc107;
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(255, 193, 7, 0.2);
}

.avatar img {
  border-radius: 50%;
}

.info .label {
  font-size: 0.875rem /* 14/16 */;
}

.info {
  display: grid;
}

.info .name {
  font-weight: 500;
  color: #303133;
}

.theme-btn.more-btn{
  background: linear-gradient(135deg, #FFC107, #FF9800);
}
</style>
<style>
.ranking-page .van-cell__value.cell-value {
  color: #303133;
  font-size: 1rem /* 16/16 */;
  font-weight: 500;
}

.ranking-page .van-cell__title.cell-title {
  flex: 3;
}
</style>

