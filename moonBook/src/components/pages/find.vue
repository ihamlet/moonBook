<template>
  <div class="find">
    <van-nav-bar :title="$route.meta.title" />
    <lazy-component class="module">
      <fresh-list :list='freshList' />
    </lazy-component>
    <lazy-component>
      <div class="container">
        <van-tabs color='#409eff' :line-width='20' sticky swipeable animated>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :sort='list.sort' />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </lazy-component>
  </div>
</template>
<script>
<<<<<<< HEAD
=======
import axios from './../lib/js/api'
>>>>>>> master
import freshList from './../module/findModule/freshList'
import dryingList from './../module/findModule/dryingList'
import axios from '@/fetch/api'

export default {
<<<<<<< HEAD
    name:'find',
    components: {
        freshList,
        dryingList
    },  
    data () {
        return {
            freshList:[],
            tab:[{
                title:'关注'
            },{
                title:'推荐'
            },{
                title:'最新'
            }]
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData'  
    },
    methods: {
        fetchData(){
            const url = '/book/MemberFollow/index';
            const params = {
                params:{
                    order:'article'
                }                
            };
            axios.get(url, params).then(res=>{
                this.freshList = res.data
            })
        }
=======
  name: 'find',
  components: {
    freshList,
    dryingList
  },
  data() {
    return {
      freshList: [],
      tab: [{
        title: '最新',
        sort: 'new',
      }, {
        title: '推荐',
        sort: 'tuijian',
      }]
>>>>>>> master
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
      axios.get('/book/SchoolArticle/recommendUsers').then(res => {
        this.freshList = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>

