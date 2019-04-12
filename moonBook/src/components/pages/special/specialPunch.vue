<template>
  <div class="special-punch">
    <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab">
      <van-tab v-for="(list,index) in tab" :key="index" :title='list.title'>
        <van-pull-refresh v-model="loading" @refresh="onRefresh"  v-if='index == tabIndex'>
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                <div class="list" v-if='list.content.length'>
                    <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
                        <van-cell>
                            <graphicCard :item='item'/>
                        </van-cell>
                    </div>
                </div>
                <div class="no-list" v-else>
                    尚无数据
                </div>
            </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import { format } from './../../lib/js/util'
import graphicCard from './../../module/card/graphicCard'

export default {
  name: 'special-punch',
  components: {
    graphicCard  
  },
  computed: {
    ...mapGetters(['userDataState']),
    classYear() {
      let date = new Date()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let time

      if (month < 9) {
        time = year - 1
      } else {
        time = year
      }

      return time
    },
    tab() {
      let array = []

      array.push({
        title:'推荐',
        level: 1,
        content: []
      },{
        title:'全校',
        content: []
      })

      this.banjiList.forEach(element => {
        let data = {
          title: this.formatBanjiTitle(element.title),
          banji_id: element.banji_id,
          content: []
        }

        array.push(data)
      })

      return array
    }
  },
  data() {
    return {
      banjiList: [],
      list: [],
      tabIndex: 0,
      loading: false,
      finished: false,
      page:1
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          school_id: this.userDataState.school_id,
          year: this.classYear,
          sort: 'post_num'
        }
      }
      axios.get('/book/school_banji/getlist', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.banjiList = res.data.data
            break
        }
      })
    },
    onLoad(){
        let data = {
            params:{
                banji_id:this.tab[this.tabIndex].banji_id,
                sort:'new',
                level: this.tab[this.tabIndex].level,
                page: this.page
            }
        }       

        return axios.get('/book/SchoolArticle/getList',data).then(res=>{
            switch(res.data.status){
                case 1:
                    if (this.page == 1) {
                        this.tab[this.tabIndex].content = res.data.data
                    } else {
                        this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
                    }
                    this.page++
                    this.loading = false
                    if (this.tab[this.tabIndex].content >= res.data.count) {
                        this.finished = true
                    }
                break
                case 0:
                    this.tab[this.tabIndex].content = []
                    this.loading = false
                    this.finished = true
                break
            }
        })    
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
</style>
