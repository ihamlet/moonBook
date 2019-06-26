<template>
  <div class="article-setting">
    <van-cell :value="classify" :is-link='$route.query.pageType!="notice"' arrow-direction="down" @click="selectTagShow">
      <div class="classify-title" slot="title">
        <i class="iconfont">&#xe67c;</i> 分类
      </div>
    </van-cell>
    <van-cell v-if='((tag.cate_id!=99&&tag.cate_id!=124) || $route.query.tags)&&$route.query.pageType!="notice"' title="同步到" value-class='cell-value' :value='synchronous' center is-link @click="isResultShow = true" />
    <van-switch-cell v-model="checked" title="微信公众号消息" title-style='flex:2' value-class='switch-cell-value' :active-value='1' :inactive-value='0' active-color='#67C23A' inactive-color='#f2f6fc' label='通知会通过阅亮书架公众号提醒家长' v-else @change='$emit("onChangeSwitch",checked)'/>

    <van-popup class="page-popup-layer" position="bottom" v-model="isResultShow" get-container='#app'>
      <van-checkbox-group v-model="settingResult">
        <div class="form-title">同步到</div>
        <van-cell-group>
          <van-cell :border='false' v-for="(item,index) in resultList" clickable :key="index" :title="item.title"
            @click="toggle(index)">
            <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <div class="cate-item" v-if='isCateShow'>
        <van-cell-group v-for='(item,index) in schoolCateList' :key="index">
          <van-cell :title="item.name" size="large">
            <i class="iconfont icon-topic" slot="icon">&#xe67c;</i>
          </van-cell>
          <van-cell is-link v-for='(cate,cateIndex) in item.cateList' :title='cate.cate_name' :key="cateIndex" @click='selectCate(cate)'>
            <i class="iconfont icon-topic-mini" slot="icon">&#xe6d7;</i>
          </van-cell>
        </van-cell-group>
      </div>
      <topic-list v-else @close='closeTopic' @confirm='show = false' @select='selectTag' :topicList='topicList'
        :tagIndex='tagIndex' :cateIndex='cateIndex' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../lib/js/api'
import topicList from './../../../module/release/topicList'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { contains } from './../../../lib/js/util'

export default {
  name: 'article-setting',
  props: {
    isWxMsg:{
      type:Number,
      default: 1
    }
  },
  components: {
    topicList
  },
  computed: {
    ...mapState('articleSetting', ['result', 'group', 'tag']),
    ...mapGetters(['userDataState', 'managerState']),
    synchronous() {
      let array = []
      this.resultList.forEach(element => {
        this.result.forEach(e => {
          if (e == element.name) {
            array.push(element.title)
          }
        })
      })
      return array.join(',')
    },
    classify() {
      let tags

      if (this.$route.query.tags && this.$route.query.tags != '宝贝主页') {
        tags = this.$route.query.tags
      } else {
        tags = this.tag.cate_name
      }

      return tags
    }
  },
  data() {
    return {
      show: false,
      isResultShow: false,
      selectGroup: false,
      loading: false,
      groupList: [],
      resultList: [],
      topicList: [],
      settingResult: [],
      tagIndex: 0,
      cateIndex: 0,
      cateName: '',
      banjiCateList: [],
      babyCateList: [],
      routerPath: ['apps-school', 'class-home', 'baby-home', 'apps-find'],
      schoolCateList: [{
        name: '宝贝主页',
        cateList: []
      }, {
        name: '班级主页',
        cateList: []
      }, {
        name: '学校主页',
        cateList: []
      }],
      isCateShow: false,
      checked: 1,
    }
  },
  created() {
    this.fetchData()
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false //去掉页面数据缓存
    next()
  },
  watch: {
    "$router": 'fetchData',
    settingResult: {
      handler(val) {
        this.addResult(val)
        localStorage.setItem('result', JSON.stringify(val))
      },
      deep: true
    },
    isWxMsg(val){
      this.checked = val
    },
    managerState() {
      localStorage.removeItem('tag')
    }
  },
  methods: {
    ...mapActions(['release']),
    ...mapActions('articleSetting', ['addResult']),
    ...mapMutations('articleSetting',['setTag']),
    async fetchData() {
      let array = []

      array.push({
        title: '发现',
        name: 'apps-find',
        to: 1
      })

      if (this.userDataState.child_id > 0 && this.$route.query.cate_id != 116) {
        array.push({
          title: '宝贝主页',
          name: 'baby-home',
          to: 1
        })
      }

      if (this.userDataState.banji_id > 0 || this.userDataState.teacher_school_id > 0) {
        array.push({
          title: `${this.userDataState.teacher_banji_id == this.$route.query.id || this.userDataState.teacher_school_id == this.$route.query.id || this.$route.query.cate_id == 116 ? '管理的' : '宝贝的'}班级`,
          name: 'class-home',
          to: 1
        })
      }

      this.resultList = array
      // 设置默认
      let arr = []
      array.map(e => {
        arr.push(e.name)
      })

      this.settingResult = arr
      this.addResult(arr)

      if (localStorage.getItem('result') && !arr.includes(this.$route.query.back)) {
        this.settingResult = JSON.parse(localStorage.getItem('result'))
        this.addResult(this.settingResult)
      }

      if (!this.routerPath.includes(this.$route.query.back)) {
        this.isCateShow = true
        await this.getCateList('宝贝主页')
        await this.getCateList('班级主页')
        await this.getCateList('学校主页')
      } else {
        let data = {
          params: {
            portal_name: '宝贝主页'
          }
        }

        if (this.$route.query.back == 'class-home') {
          data.params.portal_name = '班级主页'
        }

        if (this.$route.query.back == 'apps-school') {
          data.params.portal_name = '学校主页'
        }

        axios.get('/book/schoolArticleCate/getList', data).then(res => {
          if (res.status == 200) {

            let cateArray = res.data
            let data = []
            cateArray.forEach(element => {
              if (element.access_level == 0) {
                data.push(element)
              } else if (this.userDataState.teacher_school_id == this.$route.query.id || this.userDataState.teacher_banji_id == this.$route.query.id) {
                data.push(element)
              }
            })
            this.topicList = data

            if (this.$route.query.cate_id || this.$route.query.tag_id) {
              cateArray.forEach((element, tagIndex) => {
                if (this.$route.query.tag_id) {
                  if (element.cate_id == this.$route.query.tag_id) {
                    this.tagIndex = tagIndex
                    this.cateName = element.cate_name
                    this.setTag(element)
                  }
                } else {
                  element.children.forEach((e, cateIndex) => {
                    if (e.cate_id == this.$route.query.cate_id) {
                      this.tagIndex = tagIndex
                      this.cateIndex = cateIndex
                      this.cateName = e.cate_name
                      this.setTag(e)
                    }
                  })
                }
              })
            } else {
              if (localStorage.getItem('tag')) {
                this.setTag(JSON.parse(localStorage.getItem('tag')))
              } else {
                this.setTag(data[0])
              }
            }
          }
        })
      }
    },
    async getCateList(portalName) {
      return axios.get('/book/schoolArticleCate/getList', {
        params: {
          portal_name: portalName
        }
      }).then(res => {
        // return res
        this.schoolCateList.map(e => {
          if (e.name == portalName) {
            e.cateList = res.data
          }
        })
      })
    },
    toggle(index) {
      this.addResult(this.settingResult)
      this.$refs.checkboxes[index].toggle()
    },
    selectTag(tag) {
      this.setTag(tag)
      localStorage.setItem('tag', JSON.stringify(tag))
    },
    closeTopic() {
      this.setTag(this.topicList[this.tagIndex])
      this.show = false
    },
    selectCate(cate){
      this.show = false
      this.setTag(cate)
    },
    selectTagShow(){
      if(this.$route.query.pageType != 'notice'){
        this.show = true
      }
    }
  }
}
</script>
<style scoped>
.group-cell {
  padding: 0.625rem /* 10/16 */;
}

.cell-link {
  border-radius: 0.625rem /* 10/16 */;
  overflow: hidden;
  box-shadow: 0 0.125rem /* 2/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}

.icon .iconfont {
  font-size: 1.25rem /* 20/16 */;
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  -webkit-background-clip: text;
  color: transparent;
}

.footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.theme-btn {
  width: 100%;
}

.cate-item {
  max-height: 60vh;
}

.icon-topic {
  font-size: 20px;
  background: linear-gradient(127deg, #45caff, #1471fb);
  -webkit-background-clip: text;
  color: transparent;
}

.icon-topic-mini {
  color: #45caff;
}

.icon-topic,
.icon-topic-mini {
  margin-right: 5px;
}

.classify-title .iconfont{
  background: linear-gradient(127deg, #00C2AB,#3E94FF);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
<style>
.theme-checkbox.van-checkbox {
  float: right;
}
</style>

