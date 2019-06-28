<template>
  <div class="read-week">
    <van-cell>
      <div class="cell-read-week flex flex-align">
        <div class="title-left flex flex-align">
          <img class="icon-medal" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/medal.png" slot="icon" />
          <div class="title">
            周阅读总结
          </div>
        </div>
        <div class="time-right">
          {{startWeekTime}} - {{endWeekTime}}
        </div>
      </div>
      <van-pull-refresh v-model="loading" @refresh="onRefresh" :disabled='!listHeight'>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list theme-background" :class="listHeight?'overflow':''">
                <div class="child-cell flex flex-align" v-for='(item,index) in list' :key="index">
                    <div class="flex flex-align">
                        <div class="avatar">
                            <img :src="item.avatar" @error="imgError"/> 
                        </div>
                        <div class="name">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="num">
                        {{item.sign_read_count}} 次
                    </div>
                </div>
            </div>
        </van-list>
      </van-pull-refresh>
      <div class="more theme-color" @click="listHeight = !listHeight">
        {{listHeight?'收起':'展开'}}
      </div>
    </van-cell>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { getTime } from './../../lib/js/util'
import { mapGetters } from 'vuex'

export default {
  name: 'readWeek',
  computed: {
    ...mapGetters(['userPointState'])
  },
  data() {
    return {
      startWeekTime: getTime(7),
      endWeekTime: getTime(1),
      list: [],
      page: 1,
      loading: false,
      finished: false,
      listHeight: false
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          sort: 'read_sign',
          time: 'last_week',
          city_name: this.userPointState.city,
          banji_id: this.$route.query.id,
          page: this.page
        }
      }

     return axios.get('/book/SchoolBookSign/getRank', data).then(res => {
        switch(res.data.status){
            case 1:
                if(this.page == 1){
                    this.list = res.data.data
                }else{
                    this.list = this.list.concat(res.data.data)
                }

                this.page++
                this.loading = false

                if(this.list.length >= res.data.count){
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
        this.onLoad().then(()=>{
            this.loading = false
            this.finished = false
        })
    },
    imgError(e){
        e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.icon-medal {
  width: 26px;
}

.title {
  margin-left: 5px;
}

.list {
  height: 47px;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 132, 255, 0.3);
}

.list.overflow{
    height: auto;
    overflow: hidden;
}

.more {
  text-align: center;
  height: 36px;
  line-height: 36px;
}

.child-cell,
.cell-read-week {
  justify-content: space-between;
}

.avatar,
.avatar img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
}

.avatar{
    box-shadow: 0 2px 10px rgba(22, 110, 171, .6);
}

.child-cell{
    padding: 5px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, .4)
}

.num,
.name{
    color: #fff;
}

.name{
    font-size: 16px;
}
</style>
