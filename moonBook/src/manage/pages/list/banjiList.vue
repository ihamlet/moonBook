<template>
  <div class="banji-list">
    <van-nav-bar :title="$route.query.school_name?$route.query.school_name:'班级列表'" :border='false' v-if='!moduleType' />
    <div class="list-container">
      <van-tabs v-model="active" :swipeable='moduleType!="tab"' animated :sticky='moduleType!="tab"' color='#0084ff'
        :line-width='20' :line-height='4' @change='onRefresh'>
        <van-tab :title="list.year" v-for='(list,index) in tab' :key="index">
          <van-pull-refresh v-model="loading" @refresh="onRefresh" :disabled="drag">
            <div class="list" v-if='banjiList.length'>
              <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                <draggable v-model="banjiList" @update="datadragEnd" :options="{animation:500}" :disabled="!drag" handle=".title">
                  <transition-group>
                    <van-swipe-cell :right-width="60" class="banji-card" v-for='(item,index) in banjiList' :key='`${index}-${item.banji_id}`' :on-close="onClose" @click="setItem(item)">
                      <van-button class="swipe-cell" square slot="right" type="danger" size="normal" text="删除" />
                      <classItem :item='item' :moduleType='moduleType' />
                    </van-swipe-cell>
                  </transition-group>
                </draggable>
              </van-list>
            </div>
            <div class="no-list" v-else>
              尚无班级 <span class="theme-color" v-if='moduleType' @click="addBanji">创建班级</span>
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import classItem from './../../module/class/classItem'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import { newBanjiTitle } from './../../../components/lib/js/mixin'

export default {
  name: 'banji-list',
  mixins: [newBanjiTitle],
  components: {
    classItem,
    draggable
  },
  props: {
    moduleType: {
      type: String,
      default: ''
    },
    classYear: {
      type: Number,
      default: 2019
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('manage', ['manageSchoolInfo']),
    tab() {
      let arr = []

      switch (this.moduleType) {
        case 'tab':
          arr = [{
            year: `${this.classYear + 1}年`,
            numYear: this.classYear + 1
          }, {
            year: `${this.classYear}年`,
            numYear: this.classYear
          }]
          break
        default:
          arr = [{
            year: `${this.year + 1}年`,
            numYear: this.year + 1
          }, {
            year: `${this.year}年`,
            numYear: this.year
          }]
      }

      return arr
    }
  },
  data() {
    return {
      active: Number(localStorage.getItem('banjiTabActive')) || 1,
      banjiList: [],
      page: 1,
      loading: false,
      finished: false,
      year: Number(this.$route.query.year),
      item:''
    }
  },
  created() {
    this.onRefresh()
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          school_id: this.manageSchoolInfo.school_id,
          year: this.tab[this.active].numYear,
          page: this.page,
          is_delete: 0
        }
      }

      return axios.get('/SchoolManage/banji/getList', data).then(res => {
        switch (res.data.status) {
          case 1:
            if (this.page == 1) {
              this.banjiList = res.data.data
            } else {
              this.banjiList = this.banjiList.concat(res.data.data)
            }

            this.page++
            this.loading = false

            if (this.banjiList.length >= res.data.count) {
              this.finished = true
            }

            break
          default:
            this.$toast(res.data.msg)
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
        this.finished = false
      })
      localStorage.setItem('banjiTabActive', this.active)
      this.$emit('onRefresh', this.tab[this.active].numYear)
    },
    setItem(item){
      this.item = item
    },
    datadragEnd(evt) {

      let obj = this.banjiList[evt.newIndex]
      obj.orderby = evt.newIndex


      axios.post('/SchoolManage/banji/edit', obj).then(() => { })
    },
    addBanji() {
      this.$router.push({
        name: 'banjiEdit',
        query: {
          school_id: this.manageSchoolInfo.school_id,
          school_name: this.manageSchoolInfo.school_name,
          year: this.tab[this.active].numYear,
          grade_name: '小班',
          pageTitle: '创建班级',
          pageType: 'add'
        }
      })
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog.confirm({
            message: `确定要删除${this.formatBanjiTitle(this.item.title)}(${this.item.grade_name})吗?`
          }).then(() => {
            axios.post('/SchoolManage/banji/edit',{
              ...this.item,
              is_delete: 1
            }).then(() => {
              this.onRefresh()
              instance.close()
            })
          })
          break
      }
    }
  }
}
</script>
<style scoped>
.swipe-cell{
  height: 100%;
}
</style>
