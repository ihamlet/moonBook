<template>
  <div class="baby-home">
    <div class="module-card">
      <div class="add-baby flipInX animated" v-if="userDataState.childInfo == false" @click="toAddChild">
        <i class="iconfont hot">&#xe750;</i>
        <div class="container">
          <i class="iconfont baby-hd">&#xe603;</i>
          让孩子爱上阅读
          <div class="theme-color">添加孩子</div>
        </div>
      </div>
      <div class="list" v-else>
        <div class="module-title">宝贝阅读档案</div>
        <div class="item module" v-for="(list,index) in userDataState.childInfo" :key="index">
          <div class="card-top-bar">
            <van-nav-bar :title="`${list.data.name}`" right-text="编辑" :left-text="list.school?'班级':''" @click-left="onClickLeft(list)"
              @click-right="onClickRight(list)" />
          </div>
          <div class="baby-info flex flex-align" @click="toPageBabyHome(list)">
            <div class="volume">
              周阅读量
              <span class="number">{{list.dataStatistics.readings}}</span>
            </div>
            <div class="content">
              <div class="avatar" v-if="list.data.avatar">
                <img :src="list.data.avatar" alt="宝贝头像">
              </div>
              <avatar :gender="list.data.gende" v-else />
              <div class="age">{{age[index]}}岁</div>
              <div class="school" v-line-clamp:20="1">{{list.school}}</div>
            </div>
            <div class="volume">
              总获赞量
              <span class="number">{{list.dataStatistics.praise}}</span>
            </div>
          </div>
        </div>

        <van-button class="theme-btn" plain round type="primary" @click="toAddChild">添加宝贝</van-button>
      </div>
    </div>

    <!-- 添加孩子页面 -->
    <van-popup v-model="addChildShow" class="page-popup" position="right">
      <add-child @close="addChildShow = false" :dataId="dataId" :listenData="listenData" :pageTitle="pageTitle" />
    </van-popup>

    <!-- 添加班级页面 -->
    <van-popup v-model="addClassShow" class="page-popup" position="right">
      <add-class :school="schoolState" :babyId="babyId" @close="addClassShow = false" />
    </van-popup>
  </div>
</template>
<script>
import axios from "axios"
import { mapGetters } from "vuex"
import { format } from "./../../lib/js/util.js"
import addChild from "./../addChild"
import addClass from "./../addClass"
import numberGrow from "./../../module/animate/numberGrow"
import avatar from "./../../module/avatar"

export default {
  name: "baby-home",
  components: {
    numberGrow,
    addChild,
    addClass,
    avatar
  },
  computed: {
    ...mapGetters(["userDataState", "schoolState"]),
    age() {
      let data = []
      this.userDataState.childInfo.forEach(e => {
        let year = format(new Date(), "yyyy") - e.data.birthday.split("-")[0]
        data.push(year)
      })
      return data
    }
  },
  data() {
    return {
      babyId: "",
      listenData: "",
      dataId: "",
      addChildShow: false,
      addClassShow: false,
      pageTitle: "addBaby"
    }
  },
  methods: {
    toAddChild() {
      this.pageTitle = "addBaby"
      this.addChildShow = true
    },
    onClickRight(list) {
      this.addChildShow = true
      this.pageTitle = "editBaby"
      this.dataId = list.id

      axios
        .put("/api/ChildInfo", {
          id: list.id
        })
        .then(res => {
          this.listenData = res.data.child.data
        })
    },
    onClickLeft(list) {
      if (list.class) {
        this.$router.push({
          name: "class-home",
          query: {
            id: list.id
          }
        })
      } else {
        this.babyId = list.id
        this.addClassShow = true
      }
    },
    toPageBabyHome(list) {
      this.$router.push({
        name: "baby-home",
        query: {
          id: list.id
        }
      })
    }
  }
}
</script>
<style scoped>
.card-top-bar {
  width: 100%;
}

.add-baby {
  width: 100%;
  padding: 1.25rem /* 20/16 */ 0;
  display: inline-grid;
  text-align: center;
  font-size: 0.875rem /* 14/16 */;
}

.add-baby .theme-color {
  margin-top: 0.5rem /* 8/16 */;
  font-size: 1rem /* 16/16 */;
}

.volume {
  display: inline-grid;
  width: 6.25rem /* 100/16 */;
  text-align: center;
}

.volume .number {
  height: 2.875rem /* 46/16 */;
  line-height: 2.875rem /* 46/16 */;
  font-size: 1.875rem /* 30/16 */;
  color: #303133;
}

.baby-info {
  padding: 0.625rem /* 10/16 */ 0;
}

.add-baby i.iconfont.baby-hd {
  font-size: 3.75rem /* 60/16 */;
  display: block;
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  text-align: center;
  line-height: 5rem /* 80/16 */;
  color: #000;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 0.625rem /* 10/16 */;
  background-image: linear-gradient(135deg, #fdeb71 10%, #f8d800 100%);
  animation: shadow 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.add-baby {
  position: relative;
}

i.iconfont.hot {
  position: absolute;
  font-size: 2.5rem /* 40/16 */;
  top: -0.3125rem /* 5/16 */;
  left: -0.3125rem /* 5/16 */;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.avatar {
  width: 4.375rem /* 70/16 */;
  height: 4.375rem /* 70/16 */;
  margin-right: 0.625rem /* 10/16 */;
  border-radius: 50%;
  border: 0.25rem /* 4/16 */ solid #f8d800;
}

.avatar img {
  border-radius: 50%;
}

.baby-info .content {
  text-align: center;
}

.baby-info .content,
.baby-info .content .avatar {
  margin: auto;
}

.age {
  margin: 0.625rem /* 10/16 */ 0;
}

.school {
  font-size: 0.8125rem /* 13/16 */;
  width: 11.25rem /* 180/16 */;
  text-align: center;
}

.name {
  color: #303133;
}

.list {
  padding-bottom: 1.25rem /* 20/16 */;
}

.list .module {
  border-bottom: 1px solid #ebeef5;
}

.list .theme-btn {
  margin: 0 auto;
  display: block;
}

@keyframes shadow {
  0% {
    box-shadow: 0 0.125rem /* 2/16 */ 1.875rem /* 30/16 */ #f8d800;
  }

  50% {
    box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ #f8d800;
  }

  100% {
    box-shadow: 0 0.125rem /* 2/16 */ 1.875rem /* 30/16 */ #f8d800;
  }
}
</style>
