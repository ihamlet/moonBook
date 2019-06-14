<template>
  <div class="banji-list">
    <van-nav-bar title="班级列表" :border='false'/>
    <div class="list-container">
        <van-tabs v-model="active" swipeable animated sticky color='#0084ff' :line-width='20' :line-height='4' @change='onChangeTab'>
            <van-tab :title="list.year" v-for='(list,index) in tab' :key="index">
                <van-pull-refresh v-model="loading" @refresh="onRefresh">
                    <div class="list" v-if='banjiList.length'>
                        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                            <classItem v-for='(item,itemIndex) in banjiList' :key="itemIndex" :item='item' />
                        </van-list>
                    </div>
                    <div class="no-list" v-else>
                        尚无班级
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

export default {
  name: 'banji-list',
  components: {
    classItem
  },
  computed: {
    tab(){
        let arr = [{
            year: `${this.year+1}年`
        },{
            year: `${this.year}年`
        },{
            year: `${this.year-1}年`
        }]

        return arr
    }
  },
  data() {
    return {
      active: 1,
      banjiList: [],
      page: 1,
      loading: false,
      finished: false,
      year: Number(this.$route.query.year)
    }
  },
  created () {
    this.onRefresh()  
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          school_id: this.$route.query.school_id,
          year: this.tab[this.active].year,
          page: this.page
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
    },
    onChangeTab(index){
        this.active = index
        this.onRefresh()
    }
  }
}
</script>
<style scoped>
</style>
