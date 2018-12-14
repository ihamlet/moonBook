<template>
  <div class="edit-class page-padding">
    <van-nav-bar :border='false' class="bar-fixed" fixed :title="childInfo.school_name" left-text="返回" left-arrow
      @click-left="onClickLeft" />
    <div class="container">
      <div class="baby-info flex flex-justify">
        <div class="avatar" v-if='childInfo'>
          <img :src="childInfo.avatar" :alt="childInfo.name">
        </div>
        <avatar v-else />
        <div class="name">{{childInfo.name}}（{{childInfo.age}}岁）</div>
        <round class="bg-round" />
      </div>
      <div class="title">请选择班级</div>
      <div class="list">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-cell v-for="(item,index) in list" size='large' :key="index" is-link :title="item.title" @click='select(item)'/>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import avatar from './../../module/avatar'
import round from './../../module/animate/round'

export default {
  name: 'edit-class',
  components: {
    avatar,
    round
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      childInfo: ''
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
      axios.get(`/book/family/getChildByUser?child_id=${this.$route.query.id}`).then(res => {
        this.childInfo = res.data.data
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    select(item, itemIndex) {
        console.log(item)
        axios.get(`/book/babyBanji/bind?banji_name=${item.title}&child_id=${this.$route.query.id}`).then(res=>{
            if(res.data.status){
                this.$toast.success(res.data.msg)
                this.$router.push({
                    name:'class-home',
                    query:{
                        id: res.data.banji_id
                    }
                })
            }else{
                this.$toast.fail('加入失败')
                this.$router.push({
                    name:'my'
                })
            }
        })
    },
    onLoad(){
        axios.get(`/book/SchoolBanji/getList?page=${this.page}&limit=20&school_id=${this.$route.query.schoolId}`).then(res=>{
            this.page++
            this.list = this.list.concat(res.data.data)
            this.loading = false
            if (this.list.length >= res.data.count) {
                this.finished = true
            }
        })
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  height: 5rem /* 80/16 */;
  line-height: 5rem /* 80/16 */;
  background: #fff;
}

.class-title {
  width: 100%;
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  text-align: center;
  margin-bottom: 0.625rem /* 10/16 */;
}

.baby-info {
  display: grid;
  padding: 0.625rem /* 10/16 */ 0 1.875rem /* 30/16 */ 0;
  position: relative;
}

.baby-info .avatar {
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 1.25rem /* 20/16 */ auto 0 auto;
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.avatar img {
  border-radius: 50%;
}

.name {
  text-align: center;
  margin-top: 0.625rem /* 10/16 */;
  color: #000;
}

.age {
  text-align: center;
}

.select {
  width: 6.875rem /* 110/16 */;
  padding: 0.3125rem /* 5/16 */ 0;
  margin: 0 auto;
  text-align: center;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 0.5rem /* 8/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
  display: grid;
  overflow: hidden;
  background: #fff;
}

.select .people {
  font-size: 0.8125rem /* 13/16 */;
  height: 1.5rem /* 24/16 */;
  line-height: 1.5rem /* 24/16 */;
  color: #909399;
}

.bg-round {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}
</style>
