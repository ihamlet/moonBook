<template>
  <div class="container">
    <div class="task-list">
      <div class="task-head flex flex-align">
        <div class="head-title">
          <div class="title">完成任务</div>
          <div class="sub">赢得奖励</div>
        </div>
        <div class="level">
            <img :src="level[childInfo.mission_level]" />
        </div>
      </div>
      <div class="list">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
                <div class="card-list">
                    <div class="task-card flex flex-align fadeInUp animated" v-for="(item,index) in list" :key="index" :class="`an-${index}`" @click="toGraphic(item)">
                        <div class="cover">
                            <img :src="item.cover"/>
                        </div>
                        <div class="task-title">{{item.title}}</div>
                        <div class="icon-arrow" v-if='!item.today_finished'>
                            <van-icon name="arrow" color='#fff'/>
                        </div>
                        <div class="done" v-else>
                          <i class="iconfont">&#xe676;</i>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'task-list',
  data() {
    return {
        list:[],
        loading: false,
        finished: false,
        page:1,
        childInfo:'',
        level:[
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/0.png',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/1.png',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/2.png',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/3.png',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/4.png',
            'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/task/5.png',
        ]
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
            params:{
                child_id:this.$route.query.id
            }
        }

        axios.get('/book/baby/getInfo',data).then(res=>{
            if(res.data.status == 1){
                this.childInfo = res.data.data
            }
        })
    },
    onLoad() {
      let data = {
        params:{
          tid: this.$route.query.tid,
          sort:'old'
        }
      }

     return axios.get('/book/SchoolArticle/getList',data).then(res => {
       switch(res.data.status){
         case 1:
          if (this.page == 1) {
            this.list = res.data.data
          } else {
            this.list = this.list.concat(res.data.data)
          }

          this.list.forEach((element,i) => {
            
          })

          this.loading = false
          this.page++

          if (this.list.length >= res.data.count) {
            this.finished = true
          }
         break
       }
      })
    },
    onRefresh(){
        this.page = 1
        this.onLoad().then(()=>{
            this.loading = false
            this.finished = false
        })
    },
    toGraphic(item){
      if(!item.today_finished){
          this.$router.push({
            name: 'graphic',
            query:{
              id: this.$route.query.id,
              back: 'baby-home',
              cate_id: 150,
              tags: '宝贝主页'
            }
          })

          let commentData = {
            post_id: item.post_id,
            contents: item.title,
          }

          axios.post('/book/SchoolArticleComment/edit?ajax=1', commentData).then(res => {})
      }else{
        this.$toast('今天已经完成了该任务')
      }
    }
  }
}
</script>
<style scoped>
.task-head{
    padding: .625rem /* 10/16 */ 1.25rem /* 20/16 */;
    background: #fff;
    justify-content: space-between;
}

.title{
    font-size: 1.75rem /* 28/16 */;
    margin-bottom: .3125rem /* 5/16 */;
}

.level{
    width: 7.5rem /* 120/16 */;
}

.task-card{
    background: #000;
    width: 100%;
    height: 80px;
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
}

.cover{
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    position: relative;
    margin: 0 1.25rem /* 20/16 */;
    box-shadow: 0 5px 20px rgba(0,0,0,.1)
}

.task-title{
    flex: 5;
}

.cover img{
    position: absolute;
    width: 2.5rem /* 40/16 */;
    height: 2.5rem /* 40/16 */;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    object-fit: cover;
}

.card-list{
    background: #fff;
    overflow: hidden;
}

.icon-arrow{
    flex: 1;
}

.task-card{
    margin-bottom: .9375rem /* 15/16 */;
    position: relative;
}

.task-card:nth-child(1){
    background: #36D1DC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: 0 2px 10px rgba(54, 209, 220, 0.2);
}

.task-card:nth-child(2){
    background: #cb2d3e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,#cb2d3e, #ef473a);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #cb2d3e, #ef473a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: 0 2px 10px rgba(239, 71, 58, 0.2);
}

.task-card:nth-child(3){
    background: #FDC830;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #F37335, #FDC830);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #F37335, #FDC830); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: 0 2px 10px rgba(253, 200, 48, 0.2);
}


.task-card:nth-child(4){
    background: #11998e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right,#11998e, #38ef7d );  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #11998e,#38ef7d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-shadow: 0 2px 10px rgba(56, 239, 125, 0.2);
}

.done i.iconfont{
    font-size: 50px;
}

.done{
    position: absolute;
    width: 50px;
    height: 50px;
    right: -5px;
}
</style>
