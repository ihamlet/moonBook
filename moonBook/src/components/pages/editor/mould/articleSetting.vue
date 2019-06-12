<template>
  <div class="article-setting">
    <van-cell title-class='theme-color' title="#选择分类" :value="classify" is-link arrow-direction="down" @click="show = true" />
    <van-cell v-if='(tag.cate_id!=99&&tag.cate_id!=124) || $route.query.tags' title="同步到" value-class='cell-value'
      :value='synchronous' center is-link @click="isResultShow = true" />

    <van-popup class="page-popup-layer" position="bottom" v-model="isResultShow" get-container='#app'>
      <van-checkbox-group v-model="settingResult">
        <div class="form-title">同步到</div>
        <van-cell-group>
          <van-cell :border='false' v-for="(item,index) in resultList" clickable :key="index" :title="item.title" @click="toggle(index)">
            <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='closeTopic' @confirm='show = false' @select='selectTag' :topicList='topicList' :tagIndex='tagIndex'
        :cateIndex='cateIndex' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../lib/js/api'
import topicList from './../../../module/release/topicList'
import { mapState, mapGetters, mapActions } from 'vuex'
import { contains } from './../../../lib/js/util'

export default {
  name: 'article-setting',
  // props: ['type'], // 仿美篇要用到
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
      cateName: ''
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
    managerState() {
      localStorage.removeItem('tag')
    }
  },
  methods: {
    ...mapActions(['release']),
    ...mapActions('articleSetting', ['addResult', 'addGroup', 'addTag']),
    fetchData() {
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

      // 获取文章分类
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
                  this.cateName = e.cate_name
                  this.addTag(element)
                }
              } else {
                element.children.forEach((e, cateIndex) => {
                  if (e.cate_id == this.$route.query.cate_id) {
                    this.tagIndex = tagIndex
                    this.cateIndex = cateIndex
                    this.cateName = e.cate_name
                    this.addTag(e)
                  }
                })
              }
            })
          } else {
            if (localStorage.getItem('tag')) {
              this.addTag(JSON.parse(localStorage.getItem('tag')))
            } else {
              this.addTag(data[0])
            }
          }
        }
      })
    },
    toggle(index) {
      this.addResult(this.settingResult)
      this.$refs.checkboxes[index].toggle()
    },
    onChangeGroup(picker, values) {
      this.addGroup(values)
    },
    selectTag(tag) {
      this.addTag(tag)
      localStorage.setItem('tag', JSON.stringify(tag))
    },
    closeTopic() {
      this.addTag(this.topicList[this.tagIndex])
      this.show = false
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
</style>
<style>
.theme-checkbox.van-checkbox{
  float: right;
}
</style>

