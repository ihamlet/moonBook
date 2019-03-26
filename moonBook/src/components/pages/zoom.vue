<template>
  <div class="zoom page-padding">
    <van-nav-bar :zIndex="99" :title="fixedHeaderBar?$route.meta.title:`${userInfo.name}的空间`" fixed left-text="返回"
      left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="module">
        <div class="user-card flex flex-align" ref="userCrad">
          <div class="info">
            <div class="avatar">
              <img :src="getAvatar(userInfo.avatar)" :alt="userInfo.name" @error="imgError">
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
                <div class="number">{{ userInfo.collect_count }}</div>
                <div class="text">关注</div>
              </div>
              <div class="data-box">
                <div class="number">{{ userInfo.zan_count }}</div>
                <div class="text">获赞</div>
              </div>
            </div>
            <van-button v-if='userDataState.user_id != userInfo.user_id' :plain="userInfo.subscribe_num == '1'" class="theme-btn"
              type="primary" size="large" @click="follow(userInfo)">{{userInfo.subscribe_num == '0'?'加关注':'已关注'}}</van-button>
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
                <graphic-card :item="item" @more='actionsheet'/>
              </van-cell>
            </div>
          </div>
        </van-list>
      </div>
    </div>

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
  </div>
</template>
<script>
import axios from "./../lib/js/api";
import { sum } from "./../lib/js/util.js";
import graphicCard from "./../module/card/graphicCard";
import reading from "./../module/reading";
import { mapGetters,mapActions } from "vuex";

export default {
  name: "zoom",
  components: {
    graphicCard,
    reading
  },
  computed: {
    ...mapGetters(['userDataState'])
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
      //   {
      //   name: '编辑',
      //   type: "edit",
      //   index: 0
      // },
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
            this.lateBook = res.data.data
          })
        })
      }
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.back_id
          }
        });
      } else {
        this.$router.push({
          name: "apps-find"
        });
      }
    },
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

        axios.get('/book/SchoolArticle/getList',data).then(res => {
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
          // case 0:
          //     switch (this.templateId){
          //       case '0':
          //         this.$router.push({
          //           name:'publishing',
          //           query:{
          //             post_id: this.postId,
          //             template_id: this.templateId,
          //             back: this.$route.name,
          //             id: this.$route.query.id,
          //             type: 'edit'
          //           }
          //         })
          //       break
          //       case '1':
          //         this.$router.push({
          //           name:'graphic',
          //           query:{
          //             post_id: this.postId,
          //             template_id: this.templateId,
          //             back: this.$route.name,
          //             id: this.$route.query.id,
          //             type: 'edit'
          //           }
          //         })
          //       break
          //     }
          // break
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
    imgError(e) {
      e.target.src =
        "https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0";
    },
    follow(userInfo) {
      userInfo.subscribe_num == '1' ? userInfo.subscribe_num = '0' : userInfo.subscribe_num = '1'
      axios.get(`/book/MemberFollow/subscribe?user_id=${userInfo.user_id}`).then(res => {
        this.$toast.success(res.data.msg)
      })
    },
  }
};
</script>
<style scoped>
.container {
  margin-top: 2.875rem /* 46/16 */;
}

.info {
  display: inline-grid;
  text-align: center;
}

.avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
}

.info {
  padding: 0.625rem /* 10/16 */ 0;
  flex: 1;
}

.social {
  flex: 3;
  padding: 0 0.625rem /* 10/16 */;
}

.name {
  color: #303133;
  margin-top: 0.3125rem /* 5/16 */;
  padding: 0 .3125rem /* 5/16 */;
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
  padding: 0.625rem /* 10/16 */ 0;
}
</style>
