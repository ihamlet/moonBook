<template>
  <div class="baby-home">
    <div class="module-card">
      <div class="add-baby flipInX animated" v-if="childrenList.length == 0" @click="toAddChild">
        <i class="iconfont hot">&#xe750;</i>
        <div class="container">
          <i class="iconfont baby-hd">&#xe603;</i>
          让孩子爱上阅读
          <div class="theme-color">添加孩子</div>
        </div>
      </div>
      <div class="list" v-else>
        <div class="module-title">我的宝贝</div>
        <div class="item module" v-for="(list,index) in childrenList" :key="index">
          <div class="card-top-bar">
            <van-nav-bar :title="`${list.name}`" right-text="编辑" :left-text="list.banji_name?formatBanjiTitle(list.banji_name):'班级'" @click-left="onClickLeft(list)"
              @click-right="onClickRight(list)" :border='false'/>
          </div>
          <div class="baby-info flex flex-align" @click="toPageBabyHome(list)">
            <div class="volume">
              阅读量
              <span class="number">{{list.sign_read_count}}</span>
            </div>
            <div class="content">
              <div class="avatar" v-if="list.avatar" :class="list.sex">
                <img :src="list.avatar" alt="宝贝头像" @error="imgError">
              </div>
              <avatar :gender="list.sex" v-else />
              <div class="age">{{list.age}}岁</div>
              <div class="school" v-if='list.school_id > 0' v-line-clamp:20="1">{{list.school_name}}</div>
            </div>
            <div class="volume">
              获赞量
              <span class="number">{{list.zan_count}}</span>
            </div>
          </div>
        </div>

        <van-button class="theme-btn" plain round type="primary" size="normal" @click="toAddChild">添加宝贝</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { newBanjiTitle } from './../../lib/js/mixin'
import avatar from "./../../module/avatar"
import { mapGetters } from 'vuex'

export default {
  name: "baby-list",
  props: ['childrenList'],
  mixins: [ newBanjiTitle ],
  components: {
    avatar
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      babyId: "",
      listenData: "",
      childId: "",
      pageTitle: "addBaby",
      schoolName:'',
      child:''
    }
  },
  methods: {
    toAddChild() {
      this.$router.push({
        name:'edit-child',
        query:{
          pageTitle:'添加宝贝',
          type:'add'
        }
      })

      localStorage.removeItem('childInfo')
    },
    onClickRight(list) {
      this.pageTitle = "editBaby"
      this.$router.push({
        name:'edit-child',
        query:{
          id: list.id,
          pageTitle:'编辑宝贝',
          type:'edit',
          back: this.$route.name
        }
      })
    },
    onClickLeft(list) {
      if(list.school_id == 0){
        this.$router.push({
          name:'edit-school',
          query:{
            ...list,
            type:'edit'
          }
        })
      }else if(list.banji_id == 0){
        this.$router.push({
          name:'edit-class',
          query:{
            ...list,
            type:'edit'
          }
        })
      }else{
        this.$router.push({
          name: "class-home",
          query: {
            id: list.banji_id,
            back: this.$route.name
          }
        })
      }
    },
    toPageBabyHome(list) {
      this.$router.push({
        name: "baby-home",
        query: {
          id: list.id,
          back: this.$route.name
        }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    // formatBanjiTitle(text) {
    //   if (text && text.indexOf('班') == -1) {
    //     return text + '班'
    //   } else {
    //     let arr = text.split('')
    //     let newArr = [...new Set(arr)]
    //     return newArr.join('')
    //   }
    // },
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

.avatar.girl{
  border-color: #ff76a4;
}

.avatar img {
  width: 4.375rem /* 70/16 */;
  height: 4.375rem /* 70/16 */;
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
  margin: .625rem /* 10/16 */ auto 0 auto;
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
