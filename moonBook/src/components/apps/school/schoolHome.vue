<template>
  <div class="school-home page-padding">
    <van-nav-bar :zIndex='100' :class="fixedHeaderBar?'theme-nav':''" fixed :border='false'>
      <div class="head-bar-title" slot="title" @click="actionsheetShow = true">
        {{fixedHeaderBar?$route.meta.title:schoolInfo.title}} <i class="iconfont">&#xe608;</i>
      </div>
      <div class="head-bar-text" slot='right' v-if='manage'  @click="toManage">
        <span class="text">管理学校</span>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="header-card flex flex-align theme-school-background" ref="head">
        <div class="school-info">
          <div class="school-logo">
            <img :src="schoolInfo.logo" :alt="schoolInfo.title" @error='imgError'/>
          </div>
          <div class="school-name" v-line-clamp:20="1">{{schoolInfo.title}}</div>
          <div class="run-type">{{schoolInfo.run_type}}</div>
        </div>
        <div class="arc"></div>
      </div>
        <div class="apps">
          <apps :appsList='appsList' type='schoolHome' />
        </div>
      <div class="module card-top">
        <investmentAd :investmentAd='investment' type='notice'/>
      </div>
      <div class="module">
        <read-list type='school' title='阅读榜' field='name' />
      </div>
      <div>
        <van-tabs color='#409eff' :line-width='20' :line-height='4' animated swipeable>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :school_id='$route.query.id' portal_name='学校主页' :key="$route.query.id"/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <van-actionsheet v-model="actionsheetShow" :actions="actions" @select="onSelect" cancel-text="取消" />
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import apps from './../../module/myModule/apps'
import readList from './../../module/classModule/readList'
import dryingList from './../../module/findModule/dryingList'
import investmentAd from './../../module/investment'

export default {
  name: 'school',
  components: {
    apps,
    readList,
    dryingList,
    investmentAd
  },
  computed: {
    ...mapGetters(['userDataState', 'managerState']),
    actions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {
          let data = {
            name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? '(' + element.child_name + ')' : '(管理员)'}`,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      array.push({
        name:'学校地图',
        subname:'周边学校',
        type:'toMap'
      })

      return array
    },
    manage() {
      if (this.managerState) {
        let boolean
        this.managerState.forEach(element => {
          if (this.$route.query.id == element.id && element.item_relation != 'parent') {
            boolean = true
          }
        })
        return boolean
      }
    }
  },
  data() {
    return {
      schoolInfo: '',
      domHeight: '',
      fixedHeaderBar: true,
      actionsheetShow: false,
      appsList: [ {
        name: '阅读',
        iconClass: 'icon-yuedu',
        path: 'apps-find',
      }, {
        name: '讲故事',
        iconClass: 'icon-jianggushi',
        path: '404',
      }, {
        name: '荣誉',
        iconClass: 'icon-rongyu',
        path: 'apps-find',
      }, {
        name: '才艺',
        iconClass: 'icon-caiyi',
        path: 'apps-find',
      }],
      tab: [{
        title: '学校动态',
        content: '',
      }],
      investment:{
        link:'#',
        text:'每日餐谱',
        banner: ''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.request()
    })
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions(['getUserData']),
    request() {
      if(this.$route.query.type != 'preview'){
        this.getUserData().then(res => {
          if(res.id!= null){
            if(res.child_id == '0'){
                this.$dialog.confirm({
                  title: '添加宝贝',
                  message: '请添加您的宝贝，掌握孩子阅读数据',
                  confirmButtonText:'添加',
                  cancelButtonText:'稍后',
                  showCancelButton: true
                }).then(() => {
                  this.$router.push({
                    name: 'edit-child',
                    query: {
                      type: 'add',
                      pageTitle: '添加宝贝'
                    }
                  })
                  localStorage.removeItem('childInfo')
                }).catch(() => {
                  this.backRouter()
                })
            }else if(res.school_id == '0'){
              this.$dialog.confirm({
                title: '加入学校',
                message: '请加入学校，掌握学校动态',
                confirmButtonText:'添加',
                cancelButtonText:'稍后',
                showCancelButton: true
              }).then(() => {
                this.$router.push({
                  name: 'edit-school',
                  query: {
                    type: 'add',
                    enter: 'my-home',
                    id: res.child_id
                  }
                })
              }).catch(() => {
                this.backRouter()
              })
            }else{
              this.getSchoolInfo()
            }
          }else{
            this.$toast.fail('获取信息失败')
            this.$router.push({
              name:'home'
            })
          }
        })
      }else{
        this.getSchoolInfo()
      }
    },
    getSchoolInfo(){
      let data = {
        params:{
          school_id:this.$route.query.id
        }
      }

      if(this.$route.query.id && this.$route.query.id!=''){
        axios.get('/book/school/get_info', data).then(res => {
          if (res.data.status == 1) {
            this.schoolInfo = res.data.data
          }
        })

        this.getCate() 
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
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    },
    onSelect(item) {
      this.actionsheetShow = false

      switch(item.type){
        case 'banji':
          this.$router.push({
            name: 'class-home',
            query: {
              id: item.id,
              back: this.$route.name
            }
          })
        break
        case 'school':
          this.$router.replace({
            name: 'apps-school',
            query: {
              id: item.id,
              back: this.$route.name,
              banji_id: this.$route.query.id
            }
          })
        break
        case 'toMap':
          this.$router.push({
            name: 'school-map',
            query:{
              type:'preview'
            }
          })
        break
      }

      this.request()
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    backRouter(){
      if(this.$route.name == 'apps-school'){
        this.$router.replace({
          name:'AcceptSchoolList',
          query:{
            type:'page'
          }
        })
      }else{
        this.$router.go(-1)
      }
    },
    getCate(){
      let data = {
        params:{
          portal_name:'学校主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if(element.access_level == 0){
              data.push(element)
            }else{
              this.managerState.forEach(e =>{
                if((this.$route.query.id == e.banji_id||this.$route.query.id == e.school_id)&& e.item_relation != 'parent'){
                  data.push(element)
                }
              })
            }
          })
          
          this.appsList.forEach(e=>{
            let params
            data.forEach(element => {
              if(e.name == element.cate_name){
                params = {
                  cid: element.cate_id,
                  pageTitle: element.cate_name,
                  school_id: this.$route.query.id,
                  id: this.$route.query.id,
                  back: this.$route.name
                }
              }
            })
            e.params = params
          })
        }
      })
    },
    toManage(){
      location.href = '/SchoolManage'
    }
  }
}
</script>
<style scoped>
.header-card {
  padding: 30px 0.9375rem /* 15/16 */ 0.625rem /* 10/16 */ 0.9375rem /* 15/16 */;
  height: 9.375rem /* 150/16 */;
  position: relative;
  overflow: hidden;
}

.header-card .arc {
  position: absolute;
  width: 62.5rem /* 1000/16 */;
  height: 62.5rem /* 1000/16 */;
  background: #f2f6fc;
  border-radius: 62.5rem /* 1000/16 */;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, 0, 0);
}

.school-logo,
.school-logo img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  overflow: hidden;
  border-radius: 50%;
  background: #fff;
}

.school-logo {
  border: 0.25rem /* 4/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */
    rgba(255, 87, 34, 0.2);
  margin: 0 auto;
}

.school-info {
  z-index: 2;
  display: grid;
  margin: 0 auto;
  width: 13.75rem /* 220/16 */;
  text-align: center;
}

.school-name {
  font-weight: 500;
  margin-top: 0.625rem /* 10/16 */;
}

.school-type {
  font-size: 0.8125rem /* 13/16 */;
}

.theme-school-background {
  background: linear-gradient(#FF9800, #F44336);
}

.run-type{
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  font-size: .8125rem /* 13/16 */;
}

.apps{
  position: relative;
}
</style>
