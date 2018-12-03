<template>
  <div class="week-list">
    <div class="module-title">班级榜</div>
      <van-tabs color="#409EFF" :offsetTop="46" sticky :lineWidth='20' @click="onClickTabs"> 
        <van-tab v-for='(tab,tabIndex) in tabArray' :key='tabIndex' :title='tab.title'>
          <!-- 周榜月榜选项卡 -->
          <div class="tab-card">
            <van-tabs color="#409EFF" type="card" @change="tabChange">
                <van-tab :title="list.title" v-for="(list,index) in tabs" :key="index">
                  <van-cell-group v-for="(item,itemIndex) in list.content" :key="itemIndex">
                    <van-cell :value="`${item.num}本`" center is-link :arrow-direction="item.id == selectId?'up':'down'" @click="select(item)">
                      <div class="flex flex-align" slot="title">
                        <div class="ranking">
                          <svg-ranking :ranking="item.rank" />
                        </div>
                        <div class="avatar" v-if='item.avatar'>
                          <img :src="item.avatar" :alt="item.name">
                        </div>
                        <avatar :gender='item.gender' v-else/>
                        <van-tag class="my-baby-tag" round v-if="item.isMyBaby" type="danger">我的孩子</van-tag>
                        <div class="name">
                          <span v-line-clamp:20="1">{{item.name}}</span>
                          <span class="topic" v-if="index==1">{{item.num>50?'阅读之星':'阅读新秀'}}</span>
                        </div>
                      </div>
                    </van-cell>
                    <div class="reading-mould" v-if="item.id == selectId">
                      <reading :list="item.lateBook" type="rank" :babyId="item.id" :moduleTitle="`${item.name}最近在读`" />
                    </div>
                  </van-cell-group>
                </van-tab>
              </van-tabs>
              <div class="punch" v-if='tabIndex == 0'>
                  <van-button class="theme-btn" round size="normal" type="primary" @click="punch"> 
                      <i class="iconfont">&#xe60a;</i>  
                      阅读打卡
                  </van-button>
              </div>
            </div>
        </van-tab>
      </van-tabs>
  </div>
</template>
<script>
  import axios from "axios"
  import { rankArray,arrayKeyTop } from "./../../lib/js/util"
  import svgRanking from "./../animate/svg/ranking"
  import reading from "./../reading"
  import avatar from './../avatar'
  export default {
    name: "week-list",
    components: {
      svgRanking,
      reading,
      avatar
    },
    data() {
      return {
        tabArray:[{
          title:'阅读榜'
        },{
          title:'借书榜'
        }],
        tabs: [{
            title: "周榜",
            content: ""
          },
          {
            title: "总榜",
            content: ""
          }
        ],
        childId: "",
        selectId: ""
      };
    },
    created() {
      this.fetchData()
    },
    watch: {
      $router: "fetchData"
    },
    methods: {
      fetchData() {
        axios
          .put("/api/ChildInfo", {
            id: this.$route.query.id
          })
          .then(res => {
            if (res.data.child) {
              let weekList = res.data.child.class.weekList.week
              let totalList = res.data.child.class.weekList.total
              this.childId = res.data.child.id
              this.selectId = res.data.child.id
              let babyWeekData = {
                id: res.data.child.id,
                avatar: res.data.child.data.avatar,
                name: res.data.child.data.name,
                gender: res.data.child.data.gender,
                num: res.data.child.dataStatistics.readings,
                lateBook: res.data.child.lateBook,
                isMyBaby: true
              };
              weekList.push(babyWeekData);
              let babyTotal = {
                id: res.data.child.id,
                avatar: res.data.child.data.avatar,
                name: res.data.child.data.name,
                gender: res.data.child.data.gender,
                num: res.data.child.dataStatistics.totalReading,
                lateBook: res.data.child.lateBook,
                isMyBaby: true
              };
              totalList.push(babyTotal);
              let weekRankArray = rankArray(weekList, "num")
              let totalRankArray = rankArray(totalList, "num")
              this.tabs[0].content = arrayKeyTop(weekRankArray, "isMyBaby")
              this.tabs[1].content = arrayKeyTop(totalRankArray, "isMyBaby")
            }
          })
      },
      select(item) {
        this.selectId = item.id
      },
      tabChange() {
        this.selectId = this.childId
      },
      onClickTabs(index, title){
        console.log(index,title)
      },
      punch(){
        console.log('扫描图书二维码')
      }
    }
  }

</script>
<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .week-list {
    overflow: hidden;
    padding-bottom: 1.875rem /* 30/16 */;
  }

  .list {
    padding: 0.3125rem/* 5/16 */ 0.625rem/* 10/16 */;
  }

  .avatar {
    width: 3.125rem/* 50/16 */;
    height: 3.125rem/* 50/16 */;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.625rem/* 10/16 */;
  }

  .name {
    font-size: 1.125rem/* 18/16 */;
    display: grid;
  }

  .my-baby-tag {
    position: absolute;
    left: 3.75rem /* 60/16 */;
    bottom: 0.3125rem/* 5/16 */;
  }

  .topic {
    font-size: 0.8125rem/* 13/16 */;
    color: #909399;
  }

  .tab-card{
    margin-top: .625rem /* 10/16 */;
  }

  .tab-sticky.van-tabs .van-tabs__wrap{
    z-index: 100;
  }


</style>
