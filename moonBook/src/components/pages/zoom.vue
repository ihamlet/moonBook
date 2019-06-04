<template>
  <div class="zoom page-padding">
    <van-nav-bar :class="fixedHeaderBar?'theme-nav':''" :key="$route.query.id" :zIndex="99" :title="fixedHeaderBar?$route.meta.title:`${userInfo.name?userInfo.name:''}的空间`" fixed :border='false'/>
    <div class="zoom-head">
      <div class="bg-black"></div>
    </div>
    <div class="page-container">
      <van-pull-refresh v-model="loading" @refresh="onRefresh" :key="$route.query.id">
        <div class="container">
          <div class="module">
            <div class="user-card flex flex-align" ref="userCrad">
              <div class="info flex flex-align">
                <div class="avatar">
                  <img :src="userInfo.avatar" v-http2https @error="imgError"/>
                </div>
                <div class="name" v-line-clamp:20="1">{{userInfo.name}}</div>
              </div>
              <div class="social">
                <div class="flex flex-align">
                  <div class="data-box">
                    <div class="number">{{ userInfo.post_num }}</div>
                    <div class="text">发布</div>
                  </div>
                  <div class="data-box">
                    <div class="number">{{ userInfo.fans_count }}</div>
                    <div class="text">粉丝</div>
                  </div>
                  <div class="data-box">
                    <div class="number">{{ userInfo.subscribe_num }}</div>
                    <div class="text">关注</div>
                  </div>
                  <div class="data-box">
                    <div class="number">{{ userInfo.zan_count }}</div>
                    <div class="text">获赞</div>
                  </div>
                </div>
                <div class="subscribe">
                  <!-- :plain="userInfo.is_subscribe?true:false" -->
                  <van-button v-if='userDataState.user_id != userInfo.user_id' class="theme-btn" type="primary" round @click="follow(userInfo)" >
                    {{userInfo.is_subscribe?'已关注':'关注ta'}}
                  </van-button>
                </div>
              </div>
            </div>
          </div>

          <div class="module">
            <reading :list="lateBook" moduleTitle="宝贝最近在读" />
          </div>

          <div>
            <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
              <div class="list">
                <div class="no-list" v-if="list.length == 0">暂无内容</div>
                <div class="item" v-for="(item,index) in list" :key="index">
                  <van-cell>
                    <graphic-card :item="item" @more='actionsheet' type='zoom' :moreBtn='manage'/>
                  </van-cell>
                </div>
              </div>
            </van-list>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" get-container='#app'/>
  </div>
</template>
<script>
import axios from "./../lib/js/api"
import { sum, arrayUnique } from "./../lib/js/util.js"
import graphicCard from "./../module/card/graphicCard"
import reading from "./../module/reading"
import { mapGetters,mapActions } from "vuex"

export default {
  name: "zoom",
  components: {
    graphicCard,
    reading
  },
  computed: {
    ...mapGetters(['userDataState','managerState']),
    manage() {
      let boolean = false
      if (this.managerState) {
        this.managerState.forEach(element => {
          if (element.item_relation == 'teacher') {
            boolean = true
          }
        })
      }else if(this.userInfo.id == this.$route.query.id){
        boolean = true
      }
      return boolean
    }
  },
  data() {
    return {
      releasePageShow: false,
      lateBook: [],
      // ----
      list: [],
      domHeight: 0,
      scrollTop: 0,
      fixedHeaderBar: true,
      loading: false,
      finished: false,
      userInfo: "",
      childInfo: "",
      page: 1,
      show: false,
      actions: [
       {
          name: "删除",
          type: "delete",
          index: 1
        }
      ],
      postId: '',
      templateId:''
    }
  },
  created() {
    this.fetaData();
  },
  watch: {
    $router: "fetaData"
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions(['getUserData']),
    fetaData() {
        if(this.$route.query.id){
        let data = {
          params:{
            user_id:this.$route.query.id
          }
        }

        axios.get('/book/memberUser/getInfo', data).then(res => {
          this.userInfo = res.data

          let babyBorrowData = {
            params:{
              page:1,
              limit:20,
              child_id: res.data.child_id
            }
          }

          axios.get('/book/BabyBorrow/getList',babyBorrowData).then(res=>{
            this.lateBook = arrayUnique(res.data.data,'book_id')
          })
        })
      }
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(()=>{
        this.loading = false
      })
    },
    handleScroll() {
      this.getDomHeight();
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    getDomHeight() {
      if (this.$refs.userCrad) {
        this.domHeight = this.$refs.userCrad.offsetHeight / 2;
      }
    },
    onLoad() {
      if(this.$route.query.id){
        let data = {
          params:{
            page:this.page,
            sort:'post',
            user_id:this.$route.query.id
          }
        }

       return axios.get('/book/SchoolArticle/getList',data).then(res => {
          if(res.data.status == 1){
            this.page++
            this.list = this.list.concat(res.data.data)
            this.loading = false
            if (this.list.length >= res.data.count) {
              this.finished = true
            }
          }else{
            this.loading = false
            this.finished = true
            this.list = []
          }
        })
      }
    },
    actionsheet(item) {
      this.show = true
      this.postId = item.post_id
      this.templateId = item.template_id
    },
    onSelect(item) {
        switch(item.index){
          case 1:
            this.$dialog.confirm({
              title: '删除',
              message: '您确认要删除吗'
            }).then(() => {
              let data = {
                params:{
                  id:this.postId
                }
              }

              axios.get('/book/SchoolArticle/del',data).then(res => {
                if (res.data.status == 1) {
                  let index
                  this.list.forEach((element,i) => {
                    if(this.postId == element.post_id){
                      index = i
                    }
                  })

                  this.list.splice(index,1)
                  this.$toast.success('删除成功')
                }
              })
            }).catch(() => {
              // on cancel
            })
            this.show = false
          break
        }
    },
    imgError(e) {
      e.target.src = "https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0";
    },
    follow(userInfo) {
      userInfo.is_subscribe = !userInfo.is_subscribe
      let data = {
        params:{
          user_id:userInfo.user_id
        }
      }

      axios.get('/book/MemberFollow/subscribe',data).then(res => {
        switch(res.data.status){
          case 1:
            if(userInfo.is_subscribe){
              userInfo.fans_count++
              this.$toast.success({
                className: 'shoucang-icon toast-icon'
              })
            }else{
              userInfo.fans_count--
            }
          break
        }
      })
    }
  }
};
</script>
<style scoped>
.container{
  background: #f2f6fc;
  margin-top: 130px;
}

.zoom-head{
  height: 200px;
}

.avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
  background: #f2f6fc;
}

.social {
  flex: 1;
  padding:15px 0 10px;
}

.name {
  color: #303133;
  margin-left: 10px;
  margin-top: 30px;
  font-size: 18px;
  font-weight: 700;
  max-width: 120px;
}

.data-box {
  display: inline-grid;
  flex: 1;
}

.data-box .number {
  font-size: 1.5rem /* 24/16 */;
  color: #303133;
}

.release-popup {
  line-height: normal;
}

.item {
  position: relative;
  overflow: hidden;
  background: #fff;
}

.title .avatar {
  margin-right: 0.3125rem /* 5/16 */;
}

.title .avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
}

.theme-btn.van-button--large {
  height: 2.25rem /* 36/16 */;
  line-height: 2.125rem /* 34/16 */;
  margin-top: 0.625rem /* 10/16 */;
}

.user-card {
  padding-top: 40px;
  position: relative;
}

.user-card::before{
  content: '';
  position: absolute;
  top: -60px;
  border-style: solid;
  border-width: 0px 0px 60px 800px;
  border-color: transparent transparent #fff transparent;
  width: 0px;
  height: 0px;
}

.user-card .info{
  position: absolute;
  left: 13px;
  top: -30px;
  text-align: center;
  flex: 1;
}

.subscribe{
  position: absolute;
  right: 15px;
  top: -10px;
}

.subscribe .theme-btn{
  background: linear-gradient(135deg, #FFC107, #FF9800);
  box-shadow: 0 2px 10px rgba(255, 152, 0, .3);
}

.theme-btn{
  width: 100%;
}

.zoom-head{
  width: 100%;
  height: 300px;
  background: url('https://assets-moonbook.oss-cn-beijing.aliyuncs.com/read-amount.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
}

.bg-black{
  background: rgba(0, 0, 0, .3);
  width: 100%;
  height: 100%;
}
</style>
