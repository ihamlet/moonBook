<template>
  <div class="investment">
    <div class="light-box" v-if='isAdshow'>
      <div class='close' @click="hideAd">
        <i class="iconfont">&#xe683;</i>
      </div>
      <a :href="investmentAd.link">
        <img class="lazy" v-lazy="investmentAd.banner" alt="加盟商广告">
      </a>
    </div>

    <div class="box">
      <van-row class="flex flex-align">
        <van-col span="8">
          <a class="box-link" :href="investmentAd.link">{{`${investmentAd.text?investmentAd.text:'成为书架馆长'}`}} </a>
        </van-col>
        <van-col span="10">
          <div class="content" v-if='type == "notice"&&notice.length'>
             <span class="notice" v-for='(item,index) in notice' :key="index" @click="toArticle(item)">
               {{item.details}}
             </span>
          </div>
          <div class="content" v-else>
            <span>万册图书触手可及</span>
            <span>幼儿园/学校的新名片</span>
          </div>
        </van-col>
        <van-col span="6" class="flex flex-justify">
          <van-button class="theme-btn" size="small" type="primary" plain @click="toRegister">注册</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: 'investment',
  props: ['investmentAd','type'],
  data() {
    return {
      isAdshow: true,
      count:0,
      notice: []
    }
  },
  created() {
    if (localStorage.getItem("ad")) {
      this.isAdshow = JSON.parse(localStorage.getItem("ad"))
    }
    this.fetchData()
  },
  watch: {
    isAdshow(val) {
      localStorage.setItem('ad', val)
    },
    '$router':'fetchData'
  },
  methods: {
    hideAd() {
      this.isAdshow = false
    },
    toRegister() {
      this.$router.push({ name: 'register' })
    },
    toArticle(item,point){
      this.$router.push({
        name:'article',
        query:{
          id: item.post_id,
          type: item.template_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    },
    fetchData(){
      //需要对应学校的通知 已传school_id portal_name

      let data = {
        params: {
          portal_name: '学校主页',
          cate: '通知',
          school_id: this.$route.query.id || ''
        }
      }

      axios.get('/book/SchoolArticle/getList', data).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.count = res.data.count
          this.notice = res.data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.investment {
  position: relative;
}

.light-box a {
  display: block;
  width: 100%;
  height: 8.125rem /* 130/16 */;
  padding: 0.625rem /* 10/16 */ 0;
}

.close {
  position: absolute;
  z-index: 2;
  top: 1.5625rem /* 25/16 */;
  left: 0.625rem /* 10/16 */;
}

.close i.iconfont {
  font-size: 1.625rem /* 26/16 */;
}

.content {
  display: inline-grid;
  font-size: 0.8125rem /* 13/16 */;
  margin-left: 0.625rem /* 10/16 */;
}

.content span{
  font-size: .9375rem /* 15/16 */;
}

.content span:first-child{
  margin-bottom: .3125rem /* 5/16 */;
}

.box {
  background: #fff;
  margin-bottom: 0.625rem /* 10/16 */;
  border-radius: 0.5rem /* 8/16 */;
}

.box-link {
  height: 3.75rem /* 60/16 */;
  display: block;
  text-align: center;
  line-height: 3.75rem /* 60/16 */;
  font-weight: 700;
  font-style: oblique;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}
</style>

