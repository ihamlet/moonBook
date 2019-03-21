<template>
  <div class="head head-background" ref="head">
    <van-nav-bar :border='false' :class="[fixedHeaderBar?'theme-nav':'']" :zIndex="100" fixed :title="fixedHeaderBar?$route.meta.title:userInfo.name"
      @click-left="onClickLeft">
      <div class="head-bar-icon" slot="left">
        <i class="iconfont">&#xe60e;</i>
      </div>
      <div class="head-bar-icon bar-right" slot="right">
        <i class="iconfont" @click="signIn">&#xe609;</i>
      </div>
    </van-nav-bar>
    <div class="user-info flex flex-justify">
      <div class="info">
        <i class="iconfont" v-if='children'>&#xe668;</i>
        <div class="avatar" v-if='userInfo.avatar'>
          <img :src="getAvatar(userInfo.avatar)" :alt="userInfo.name">
        </div>
        <avatar v-else size='medium' avatarClass='border' />
        <div class="children-info" v-if='children' @click="toBabyHome">
          <img class="children-avatar" :src="getAvatar(children.avatar)" :alt="children.name">
        </div>
        <div class="name">{{userInfo.name}}</div>
      </div>
    </div>
    <div class="card">
      <div class="borrow-card flex flex-align">
        <div class="service flex flex-align" v-if="userInfo.card_level != '0'">
          <div class="data-flow" @click="$router.push({name:'card-list'})">
            <i class="iconfont" :class="`vip-${userInfo.card_level}`">&#xe604;</i>
            <b class="card-name" v-line-clamp:20="1">{{userInfo.card_name}}</b>
          </div>
          <div class="data-flow read" @click="toBorrowList(0)">
            <span class="data-name">读过</span>
            <span class="number">
              {{userInfo.borrow_count}}
            </span>
          </div>
          <div class="data-flow reading" @click="toBorrowList(1)">
            <span class="data-name">在读</span>
            <span class="number">
              {{userInfo.borrowing_count}}
            </span>
          </div>
          <div class="data-flow collection" @click="toBorrowList(2)">
            <span class="data-name">收藏</span>
            <span class="number">
              {{userInfo.collect_count}}
            </span>
          </div>
          <div class="data-flow abrasion" @click="toBorrowList(3)">
            <span class="data-name">破损</span>
            <span class="number">
              {{userInfo.broken_count}}
            </span>
          </div>
        </div>
        <div class="no-service flex flex-align flex-justify" v-else @click="toAccept">您还没有办理借阅卡?
          <div class="theme-color">前往办卡</div>
          <i class="iconfont">&#xe61b;</i>
        </div>
      </div>
    </div>

    <van-popup v-model="punchShow" class="page-popup page-punch" position="right">
      <punch @close="closePunch" />
    </van-popup>
  </div>
</template>
<script>
import axios from "./../../lib/js/api";
import numberGrow from "./../../module/animate/numberGrow";
import punch from "./../../module/punch";
import avatar from './../avatar'

export default {
  name: "cardHead",
  components: {
    numberGrow,
    punch,
    avatar
  },
  props: ["userInfo", "children"],
  data() {
    return {
      domHeight: 0,
      scrollTop: 0,
      fixedHeaderBar: true,
      active: 0,
      punchShow: false,
      applyShow: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.getDomHeight();
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false;
      } else {
        this.fixedHeaderBar = true;
      }
    },
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2;
      }
    },
    onClickLeft() {
      this.$router.push({ name: "card-list" });
    },
    signIn() {
      this.punchShow = true;
    },
    toAccept() {
      this.$router.push({
        name:'AcceptSchoolList'
      })
    },
    onAccpetPage() {
      this.applyShow = false;
    },
    onStepActiveChange(val) {
      this.active = val;
    },
    closePunch() {
      this.punchShow = false;
    },
    toBorrowList(num) {
      this.$router.push({
        name: "borrow-list",
        query: {
          tabActive: num
        }
      });
    },
    getAvatar(img) {
      if (!img) {
        return img;
      }

      let pos = img.indexOf("http://");
      let result;
      if (pos === 0) {
        result = img.replace("http:", "https:");
      } else {
        result = img;
      }
      return result;
    },
    toBabyHome() {
      this.$router.push({
        name: 'baby-home',
        query: {
          id: this.children.id,
          back: this.$route.name
        }
      })
    }
  }
};
</script>
<style scoped>
.head {
  width: 100%;
  position: relative;
  transition: background-image 0.2s ease;
  background: linear-gradient(223deg, #9ce8dd, #a993da, #f0cb54, #6d93a3);
  background-size: 600% 600%;
  animation: bg-generator 50s ease infinite;
}

@keyframes bg-generator {
  0% {
    background-position: 0% 84%;
  }
  50% {
    background-position: 100% 17%;
  }
  100% {
    background-position: 0% 84%;
  }
}

.card {
  position: absolute;
  bottom: -3.125rem /* 50/16 */;
  padding: 0;
  width: 95%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.borrow-card,
.avatar img {
  box-shadow: 0 0.3125rem /* 5/16 */ 2.5rem /* 40/16 */ -0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.borrow-card {
  width: 100%;
  background: #fff;
  padding: 0.3125rem /* 5/16 */ 0;
  border-radius: 0.625rem /* 10/16 */;
}

.borrow-card i.iconfont {
  font-size: 1.875rem /* 30/16 */;
}

.avatar img {
  width: 4.5rem /* 72/16 */;
  height: 4.5rem /* 72/16 */;
  margin: 0 auto;
  display: block;
}

.avatar {
  margin: 0 auto;
}

.avatar img,
.children-avatar {
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid rgba(255, 255, 255, .5);
}

.children-avatar {
  position: absolute;
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  left: 65%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  z-index: 10;
}

.user-info {
  padding-top: 3.125rem /* 50/16 */;
  padding-bottom: 1.875rem /* 30/16 */;
}

.info {
  color: #fff;
  position: relative;
}

.info .iconfont {
  position: absolute;
  left: 60%;
  top: 50%;
  font-size: 1.25rem /* 20/16 */;
  z-index: 11;
  background: linear-gradient(135deg, #f44, #e60000);
  -webkit-background-clip: text;
  color: transparent;
}

.info .name {
  font-size: 1.25rem /* 20/16 */;
  text-align: center;
  margin-top: 0.625rem; /* 10/16 */
}

.info .school {
  width: 12.5rem /* 200/16 */;
  text-align: center;
  margin: 0 auto;
  font-size: 0.875rem /* 14/16 */;
}

.card-box {
  width: 6.25rem /* 100/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 0.625rem /* 10/16 */;
  color: #fff;
  text-align: center;
  line-height: 3.75rem /* 60/16 */;
}

.service,
.no-service {
  font-size: 0.875rem /* 14/16 */;
  width: 100%;
  height: 3.125rem /* 50/16 */;
}

.no-service i.iconfont {
  font-size: 1.5625rem /* 25/16 */;
  margin-left: 0.3125rem /* 5/16 */;
}

.data-flow {
  flex: 1;
  text-align: center;
  display: inline-grid;
}

.data-flow .number {
  font-size: 1.875rem /* 30/16 */;
}

.data-flow .card-name {
  font-size: x-small;
}

.theme-color {
  margin: 0 0.3125rem /* 5/16 */;
}

.page-punch {
  background: #de4313;
}
</style>
