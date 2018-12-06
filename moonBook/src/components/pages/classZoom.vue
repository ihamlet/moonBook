<template>
  <div class="class-zoom page-padding">
    <van-nav-bar title="班级风采" fixed left-text="返回" left-arrow @click-left="onClickLeft" @click-right='onClickRight'>
      <div slot="right" class="theme-color">
        <i class="iconfont">&#xe612;</i>
      </div>
    </van-nav-bar>
    <lazy-component class="module">
      <fresh-list :list='freshList' type='classShow' />
    </lazy-component>
    <lazy-component class="module">
      <div class="module-title">班级风采</div>
      <div class="not-content" v-if="!listLength">尚无记录</div>
      <van-list v-model="loading" :finished="finished" @load="onLoad" v-else>
        <div class="list">
          <div class="item" v-for="(item,index) in list" :key="index">
            <van-cell>
              <graphic-crad :item="item" type="classHome" :className='$route.query.className' />
            </van-cell>
          </div>
        </div>
      </van-list>
    </lazy-component>
    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom">
      <graphic @close='releasePageShow = false'/>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from "vuex"
import freshList from './../module/findModule/freshList'
import graphicCrad from './../module/card/graphicCrad'
import graphic from './../module/release/graphic'

export default {
  name: "class-zoom",
  props: ['classInfo'],
  components: {
    freshList,
    graphicCrad,
    graphic
  },
  computed: {
    ...mapGetters(['dryingListLengthState'])
  },
  data() {
    return {
      freshList:[],
      list: [],
      listLength: "",
      releasePageShow:false,
      loading: false,
      finished: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: { 
    '$router':'fetchData'
  },
  methods: {
      onClickLeft(){
          this.$router.push({
            name:'class-home',
            query:{
              id: this.$route.query.id
            }
          })
      },
      onClickRight(){
        this.releasePageShow = true
      },
      fetchData(){
        axios.get('/api/classMemberData').then(res=>{
          this.freshList = res.data.classMemberData.memberList
        })

        axios.get("/api/classAticleList").then(res => {
          this.listLength = res.data.length
        })
      },
      onLoad() {
        axios.get("/api/classAticleList").then(res => {
          setTimeout(() => {
            let array = res.data.classAticleList
            let length = this.dryingListLengthState < 10 ? 1 : 5
            for (let i = 0; i < length; i++) {
              this.list.push(array[this.list.length])
            }
            this.loading = false
            if (this.list.length >= res.data.length) {
              this.finished = true
            }
          }, 500)
        })
      }
  }
};
</script>
<style scoped>
.class-zoom{
  padding-top: 2.8125rem /* 45/16 */;
}
</style>
