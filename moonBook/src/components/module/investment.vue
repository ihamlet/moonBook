<template>
  <div class="investment">
    <div class="light-box" v-if='isAdshow&&$route.name!="apps-school"'>
      <div class='close' @click="hideAd">
        <i class="iconfont">&#xe683;</i>
      </div>
      <a :href="investmentAd.link" v-if='$route.name != "apps-school" '>
        <img :src="investmentAd.banner" alt="加盟商广告">
      </a>
    </div>

    <div class="box">
      <van-row class="flex flex-align" gutter="10">
        <van-col span="7">
          <a class="box-link" :href="investmentAd.link">{{`${investmentAd.text?investmentAd.text:'成为书架馆长'}`}} </a>
        </van-col>
        <van-col span="10">
          <div class="content" v-if='type == "notice"&&notice.length'>
            <van-swipe :autoplay="5000" :height='60' indicator-color="#fff" vertical :show-indicators='false'>
              <van-swipe-item v-for="(item,index) in list" :key="index">
                <div class="notice theme-color" @click="toArticle(content)" v-for='(content,contentIndex) in item' :key="contentIndex" v-line-clamp:20="1">
                  {{content.details || content.title}}
                </div>
              </van-swipe-item>              
            </van-swipe>
          </div>
          <div class="content" v-else>
            <div class="notice" v-line-clamp:20="1">万册图书触手可及</div>
            <div class="notice" v-line-clamp:20="1">幼儿园/学校的新名片</div>
          </div>
        </van-col>
        <van-col span="7" class="flex flex-justify">
          <van-button class="theme-btn" round size="small" type="primary" @click="toRegister">注册/办卡</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { group } from './../lib/js/util'

export default {
  name: 'investment',
  props: ['investmentAd','type'],
  computed: {
    list(){
      return group(this.notice,2)
    }
  },
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
    toArticle(item){
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

.notice,
.content{
  width: 100%;
}

.notice{
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  font-size: .9375rem /* 15/16 */;
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
  font-size: 0.8125rem /* 13/16 */;
  height: 3.75rem /* 60/16 */;
  overflow: hidden;
}

.box {
  background: #fff;
  padding: .3125rem /* 5/16 */ .625rem /* 10/16 */;
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

.tag{
  margin-right: .3125rem /* 5/16 */;
}

.theme-btn{
  box-shadow: 0 5px 10px rgba(3, 169, 244, 0.3)
}
</style>

