<template>
  <div class="class-home page-padding">
    <van-nav-bar :title="fixedHeaderBar?$route.meta.title:`${classInfo.title}班`" :zIndex='100' :class="[fixedHeaderBar?'theme-nav':'']"
      fixed @click-left="onClickLeft" @click-right="show = true">
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">个人中心</span>
      </div>
      <div class="btn-right-qrcode" slot='right'>
        <i class="iconfont">&#xe7a3;</i>
      </div>
    </van-nav-bar>
    <div class="header theme-background flex flex-align" ref='head'>
      <div class="class-avatar">
        <img :src="classInfo.logo" alt="班级头像" />
      </div>
      <div class="class-info">
        <div class="class-name">{{classInfo.title}}班</div>
        <div class="class-people">{{classInfo.grade_name}}班（{{classInfo.student_count}}人）</div>
        <div class="school" v-line-clamp:20="1">{{classInfo.school_name}}</div>
      </div>
    </div>
    <div class="container">
      <lazy-component class="module">
        <class-show :className='classInfo.title' />
      </lazy-component>
      <lazy-component class="module">
        <reading :list="lateBook" moduleTitle="老师推荐的书"/>
      </lazy-component>
      <lazy-component class="module">
        <week-list />
      </lazy-component>
    </div>

    <van-popup v-model="show" class="plate-card">
      <qr-code :classInfo="classInfo" :qrImage="qrImage" type='classHome' @close='show = false' />
    </van-popup>
    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import QRCode from 'qrcode'
import weekList from './../module/classModule/weekList'
import classShow from './../module/classModule/classShow'
import reading from './../module/reading'
import qrCode from './../module/mold/qrCode'
import slogan from './../module/slogan'

export default {
  name: "class-home",
  components: {
    classShow,
    weekList,
    slogan,
    reading,
    qrCode
  },
  data() {
    return {
      show: false,
      fixedHeaderBar: true,
      qrImage: '',
      classInfo: '',
      lateBook:'',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.qrcode()
      axios.get(`/book/SchoolBanji/getInfo?banji_id=${to.query.id}`).then(res=>{
          vm.classInfo = res.data.data
      })
      axios.get(`/book/ShelfBook/getList?page=1&limit=20&mode=teacher&banji_id=${to.query.id}`).then(res=>{
          vm.lateBook = res.data.data
      })
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: 'my' })
    },
    qrcode() {
      QRCode.toDataURL(window.location.href).then(url => {
        this.qrImage = url
      }).catch(err => {
          console.error(err)
      })
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
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    }
  }
};
</script>
<style scoped>
.school {
  text-align: left;
  margin-top: 0.3125rem /* 5/16 */;
}

.school,
.class-people {
  font-size: 0.8125rem /* 13/16 */;
}

.header {
  padding: 1.25rem /* 20/16 */;
  background: url('https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/header-bg.jpg');
  background-size: cover;
  background-position: 68%;
  height: 9.375rem /* 150/16 */;
}

.class-name {
  font-size: 1.125rem /* 18/16 */;
}

.class-info {
  color: #fff;
  width: 9.375rem /* 150/16 */;
}

.class-avatar {
  width: 4.25rem /* 68/16 */;
  height: 4.25rem /* 68/16 */;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.3);
  margin-right: 0.625rem /* 10/16 */;
}

.btn-right-qrcode {
  position: fixed;
  right: 0;
  top: -0.4375rem /* 7/16 */;
}

.btn-right-qrcode i.iconfont {
  font-size: 1.875rem /* 30/16 */;
}

.plate-card {
  width: 18.75rem /* 300/16 */;
  overflow: hidden;
}
</style>
