<template>
  <div class="page-padding">
    <van-tabs v-model="active" animated sticky color='#0084ff' :line-width='20' :line-height='4'>
      <van-tab title="班级概况">
        <div class="cont-box">
          <div class="bp-box">
            <div class="left-box padd-botoom">
              <div class="bt-text">昨日内容发布数</div>
              <div class="number-text">32</div>
              <div class="bj-text">较前日<span><i class="el-icon-top red"></i>13</span></div>
            </div>
            <div class="right-box padd-botoom">
              <div class="bt-text">昨日内容分享数</div>
              <div class="number-text">157</div>
              <div class="bj-text">较前日<span><i class="el-icon-bottom green"></i>11</span></div>
            </div>
          </div>
          <div class="bp-box1">
            <div class="left-box padd-top">
              <div class="bt-text">昨日新增成员数</div>
              <div class="number-text">0</div>
              <div class="bj-text">较前日<span>--</span></div>
            </div>
            <div class="right-box padd-top">
              <div class="bt-text">昨日主页浏览数</div>
              <div class="number-text">257</div>
              <div class="bj-text">较前日<span><i class="el-icon-top red"></i>17</span></div>
            </div>
          </div>
        </div>
        <div class="cont-box-two padd-botoom">
          <div class="title-box">
            <div class="title-top">数据趋势</div>
            <div class="right-text">
              <van-icon size="18px" name="calender-o" />最近7天</div>
          </div>
          <div id="myChart" class="echarts-box"></div>
        </div>
        <div class="cont-box-two">
          <div class="title-box">
            <div class="title-top">每日数据</div>
          </div>
          <el-table :data="tableData" :stripe="true" :default-sort="{prop: 'date', order: 'descending'}" :border="false">
            <el-table-column prop="date" fixed="left" sortable label="日期" width="100"></el-table-column>
            <el-table-column prop="article" align="center" sortable label="文章数" width="90"></el-table-column>
            <el-table-column prop="video" align="center" sortable label="视频数" width="90"></el-table-column>
            <el-table-column prop="share" align="center" sortable label="分享数" width="90"></el-table-column>
            <el-table-column prop="Student" align="center" sortable label="学员数" width="90"></el-table-column>
          </el-table>
        </div>
        <div class="cont-box-two">
          <div class="title-box">
            <div class="title-top">成员排名</div>
            <router-link to="/teacherManage/memberRanking">
              <div class="right-text">查看全部></div>
            </router-link>
          </div>
          <el-table :data="member" :stripe="true" :default-sort="{prop: 'name', order: 'descending'}" :border="false">
            <el-table-column fixed="left" label="姓名" width="150">
              <template slot-scope="scope">
                <div class="row-box">
                  <div class="row-pic"><img :src="scope.row.aimg"></div>
                  <div>{{ scope.row.name }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="article" align="center" sortable label="文章数" width="90"></el-table-column>
            <el-table-column prop="video" align="center" sortable label="视频数" width="90"></el-table-column>
            <el-table-column prop="share" align="center" sortable label="分享数" width="90"></el-table-column>
            <el-table-column prop="Student" align="center" sortable label="学员数" width="90"></el-table-column>
          </el-table>
        </div>
      </van-tab>
      <van-tab title="人员管理">
        1111
      </van-tab>
      <van-tab title="人员通讯">
        11
      </van-tab>
      <van-tab title="内容管理">
        1111
      </van-tab>
      <van-tab title="通知管理">
        11
      </van-tab>
      <van-tab title="主题设置">
        1111
      </van-tab>
    </van-tabs>
    <div class='slogan'>
        {{$store.state.slogan}}
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'classSetting',
  data() {
    return {
      title: '班级管理',
      active: 0,
      option: {
        legend: {
          data: ['文章数', '视频数', '分享数', '学员数'],
          bottom: 0,
        },
        color: ["#3399FF", "#FF9500", "#F94950", "#B949F9"],
        grid: {
          left: '4%',
          right: '4%',
          bottom: '10%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',   // 还有其他的type，可以去官网喵两眼哦
          data: ['4.1', '4.2', '4.3', '4.5', '4.6', '4.7', '4.8'],   // x轴数据
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          },
        },
        yAxis: {
          type: 'value',
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        dataZoom: [
          {
            type: "slider",
            realtime: true, //拖动滚动条时是否动态的更新图表数据
            height: 25, //滚动条高度
            start: 40, //滚动条开始位置（共100等份）
            end: 65 //结束位置（共100等份）
          }
        ],
        label: {},
        tooltip: {
          trigger: 'axis'   // axis   item   none三个值
        },
        series: [
          {
            name: '文章数',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          },
          {
            name: '视频数',
            data: [620, 711, 823, 934, 1445, 1456, 1178],
            type: 'line'
          },
          {
            name: '分享数',
            data: [612, 920, 1140, 1160, 1190, 1234, 1321],
            type: 'line'
          },
          {
            name: '学员数',
            data: [234, 320, 453, 567, 789, 999, 1200],
            type: 'line'
          }
        ]
      },
      tableData: [{
        date: '2019/03/30',
        article: 11,
        video: 18,
        share: 24,
        Student: 43
      }, {
        date: '2019/03/31',
        article: 5,
        video: 6,
        share: 12,
        Student: 24
      }, {
        date: '2019/04/01',
        article: 15,
        video: 8,
        share: 4,
        Student: 35
      }, {
        date: '2019/04/02',
        article: 6,
        video: 7,
        share: 11,
        Student: 45
      }, {
        date: '2019/04/03',
        article: 10,
        video: 28,
        share: 24,
        Student: 35
      }, {
        date: '2019/04/04',
        article: 11,
        video: 18,
        share: 21,
        Student: 45
      }, {
        date: '2019/04/05',
        article: 1,
        video: 12,
        share: 14,
        Student: 53
      }],
      member: [{
        name: '江一帆(老师)',
        aimg: 'https://pro.modao.cc/uploads4/images/3028/30287609/v2_plrw1u.jpg',
        article: 11,
        video: 18,
        share: 24,
        Student: 43
      }, {
        name: '白小纯',
        aimg: 'https://pro.modao.cc/uploads4/images/3024/30247574/v2_plq3j9.jpg',
        article: 5,
        video: 6,
        share: 12,
        Student: 24
      }, {
        name: '莫淳',
        aimg: 'https://pro.modao.cc/uploads4/images/3024/30248218/v2_plq3vp.jpg',
        article: 15,
        video: 8,
        share: 4,
        Student: 35
      }, {
        name: '王艾达',
        aimg: 'https://pro.modao.cc/uploads4/images/3025/30254100/v2_plq73u.jpg',
        article: 6,
        video: 7,
        share: 11,
        Student: 45
      }, {
        name: '南风',
        aimg: 'https://pro.modao.cc/uploads4/images/3030/30302282/v2_pls4qx.jpg',
        article: 10,
        video: 28,
        share: 24,
        Student: 35
      }]
    }
  },
  mounted() {
    this.$nextTick(() => { 
        this.drawLine() 
    })
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.cont-box {
  background: #fff;
  padding: 20px;
}
.cont-box-two {
  background: #fff;
}

.cont-box-two,
.cont-box{
    margin-bottom: 5px;
}

.bp-box {
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.bp-box1 {
  display: flex;
  justify-content: space-between;
}
.left-box {
  width: 50%;
  border-right: 1px solid #f7f7f7;
}
.bt-text {
  font-size: 16px;
  color: #999;
  padding-bottom: 15px;
}
.number-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  padding-bottom: 15px;
}
.bj-text {
  font-size: 14px;
  color: #999;
}
.bj-text span {
  margin-left: 15px;
}
.bj-text .red {
  color: #fc242c;
  font-size: 16px;
  font-weight: bold;
}
.bj-text .green {
  color: #3acf76;
  font-size: 16px;
  font-weight: bold;
}
.right-box {
  width: 49%;
  text-align: right;
}
.padd-top {
  padding-top: 20px;
}
.padd-botoom {
  padding-bottom: 20px;
}
#chart_example {
  width: 50%;
  height: 500px;
  border: 1px solid red;
  margin: 0 auto;
}
.title-box {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.title-top {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.right-text {
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
}
.echarts-box {
  width: 100%;
  height: 350px;
}
.row-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.row-pic {
  margin-right: 5px;
}
.row-pic img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>


