<template>
  <div class="punch-share">
    <div class="img-poster">
        <img :src="imgArrRandom[0]" />
        <div class="content">
            <div class="day">{{$route.query.day}}</div>
            <div class="saying">{{sayingText[0]}}</div>
        </div>
    </div>
    <div class="share-content" v-if='childInfo'>
        <div class="share-data">
            <van-cell center is-link @click="toBabyHome">
                <div class="flex flex-align">
                    <div class="avatar">
                        <img :src="childInfo.avatar" @error="imgError"/>
                    </div>
                    <div class="share-info">
                        <div class="name">{{childInfo.name}}</div>
                        <div class="book-name theme-color">今天读了《{{$route.query.book_name}}》</div>
                    </div> 
                </div>
            </van-cell>
            <van-cell>
                <div class="share-list">
                    <ul class="flex flex-align">
                        <li v-for="(item,index) in list" :key="index">
                            <div class="title">{{item.title}}</div>
                            <div class="num theme-color">{{item.num}}</div>
                        </li>
                    </ul>
                </div>
            </van-cell>
        </div>
        <div class="footer flex flex-align">
            <div class="footer-left">
                <div class="share-slogan">
                    提高语言能力
                    <br/>
                    从坚持阅读开始
                </div>
                <div class="logo">
                    <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png" />
                </div>
            </div>
            <div class="footer-right">
                <div class="code-logo">
                    <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/code.png" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapState, mapActions } from 'vuex'
import { saying } from './../../lib/js/speech'

export default {
  name: 'punch-share',
  computed: {
    ...mapState('openWX',['ready']),
    list(){
        let arr = [{
            title:'累计打卡',
            num: `${this.childInfo.sign_read_count}本`
        },{
            title:'坚持打卡',
            num: `${this.childInfo.sign_days}天`
        },{
            title:'学习力超过',
            num: '86%'
        },{
            title:'带动阅读',
            num: `${this.childInfo.fluent_count}人`
        }]
        return arr
    },
    item(){
      let data = {
        cate_name:'阅读打卡',
        details:'提高语言能力从坚持阅读开始',
        title: '来阅亮书架一起参与阅读打卡吧',
        imgUrl: location.origin + this.childInfo.avatar,
      }

      return data
    },
    sayingText(){
        saying.sort(()=>{
            return Math.random()-0.5
        })

        return saying
    },
    imgArrRandom(){
        this.imgArr.sort(()=>{
            return Math.random()-0.5
        })
        return this.imgArr
    }
  },
  data() {
    return {
        childInfo:'',
        imgArr:[
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-share.jpg',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-share-1.jpg',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-share-2.jpg'
        ]
    }
  },
  created () {
    this.fetchData()
  },
  updated(){
    this.wxShare()
  },
  watch: {
    '$router':'fetchData',
    ready(){
        this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX',['share']),
    wxShare(){
      const self = this
      let data = {
        item: self.item,
        success() {
            self.$router.go(-1)
        }
      }
      self.share(data)
    },
    fetchData(){
        let data = {
            params: {
                child_id: this.$route.query.child_id
            }
        }
        axios.get('/book/baby/getInfo', data).then(res => {
            switch (res.data.status) {
            case 1:
                this.childInfo = res.data.data
                break
            }
        })
    },
    toBabyHome(){
        this.$router.replace({
            name:'baby-home',
            query:{
                id: this.childInfo.id
            }
        })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.img-poster{
    width: 100%;
    height: 50vh;
    overflow: hidden;
    position: relative;
}

.img-poster img{
    position: absolute;
    width: 100%;
    bottom: 0;
}

.share-content{
    width: 100%;
    height: 50vh;
}

.share-data{
    width: 95%;
    background: #fff;
    margin: -15px auto 0;
    position: relative;
    z-index: 1;
    border-radius: 8px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, .1);
    overflow: hidden;
}

.content{
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, .3);
    color: #fff;
    padding: 10px 0 30px;
}

.content .day{
    margin-bottom: 10px;
}

.avatar img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.share-list ul li {
    flex: 1;
}

.title{
    font-size: 13px;
    font-weight: 700;
    text-align: center;
}

.num{
    text-align: center;
    font-size: 20px;
}

.footer{
    justify-content: space-between;
    padding: 20px;
}

.footer-left{
    flex: 3;
}

.footer-right{
    flex: 1;
}

.logo{
    width: 120px;
}

.share-slogan{
    margin-bottom: 10px;
}
</style>
