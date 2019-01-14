<template>
  <div class="egg page-padding">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"/>
    <lazy-component class="module">
      <activity />
    </lazy-component>
    <div class="baby-class" v-if='childInfo.is_mine'>
      <lazy-component class="module">
        <class-show :banji_name='childInfo.banji_name' :banji_id='childInfo.banji_id' />
      </lazy-component>
      <van-cell-group>
        <van-cell :title="childInfo.banji_name" is-link center @click="toClassHome(childInfo)">
          <div class="icon" slot="icon">
            <i class="iconfont">&#xe802;</i>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <lazy-component class="module">
      <reading :list="lateBook" moduleTitle="宝贝最近在读的书" />
    </lazy-component>
  </div>
</template>
<script>
import axios from './../lib/js/api'

import activity from './../module/activity/activity'
import reading from "./../module/reading"
import classShow from './../../components/module/classModule/classShow'

export default {
  name: 'egg',
  components: {
    activity,
    reading,
    classShow
  },
  data() {
    return {
      childInfo: '',
      lateBook: []
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
        this.childInfo = res.data.data
      })

      axios.get(`/book/ShelfBook/getList?page=1&limit=20&mode=teacher&banji_id=${this.$route.query.banji_id}`).then(res => {
        this.lateBook = res.data.data
      })
    },
    onClickLeft(){
        if(this.$route.query.back){
            this.$router.push({
                name: this.$route.query.back,
                query:{
                    id: this.$route.query.id
                }
            })
        }else{
            this.$router.push({
                name:'class-home',
                query:{
                    id: this.$route.query.id
                }
            })
        }
    }
  }
}
</script>
<style scoped>
.img-preview {
  position: absolute;
}

.baby-class .icon {
  margin-right: 0.625rem /* 10/16 */;
}

.baby-class .icon i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
