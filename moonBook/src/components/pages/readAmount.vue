<template>
  <div class="read-amount">
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div class="amount-list flex flex-align">
      <div class="amount-item" v-for="(item,index) in amountList" :key="index">
        <div class="amount-type">{{item.type}}</div>
        <div class="amount-num">{{item.num}}</div>
      </div>
    </div>
    <div class="total">所在书架未读的书：{{shelf_tushu_kinds-read_kinds}}/{{shelf_tushu_kinds}}</div>
    <van-tabs color="#409eff" :line-width="20" :line-height="4" sticky swipeable animated :offsetTop="45">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-for="(item,itemIndex) in list.content" v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" :key="itemIndex">
            <van-cell v-for="(content,contentIndex) in item.content" :key="contentIndex" :title="content"/>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: "readAmount",
  data() {
    return {
      page:1,
      loading:false,
      finished: false,
      read_kinds:'',
      shelf_tushu_kinds:'',
      amountList: [
        {
          type: "读过",
          num: "0",
          key: 'reading_count'
        },
        {
          type: "在读",
          num: "0",
          key: 'read_count'
        },
        {
          type: "收藏",
          num: "0",
          key: 'collect_num'
        },
        {
          type: "磨损",
          num: "0",
          key:'broken_num'
        },
        {
          type: "未读",
          num: "0"
        }
      ],
      tab: [
        {
          title: "全部",
          content: [
            {
              cover: "#",
              bookname: "三字经",
              number: "307"
            }
          ]
        },
        {
          title: "绘本",
          content: ""
        },
        {
          title: "科普",
          content: ""
        },
        {
          title: "3D",
          content: [
            {
              cover: "#",
              bookname: "三字经",
              number: "307"
            },
            {
              cover: "#",
              bookname: "三字经",
              number: "307"
            },
            {
              cover: "#",
              bookname: "三字经",
              number: "307"
            }
          ]
        }
      ]
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods:{
      fetchData(){
          axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
            if(res.data.status == 1){
              this.read_kinds = res.data.data.read_kinds
              this.shelf_tushu_kinds = res.data.data.shelf_tushu_kinds
              console.log(res)
              let array = this.amountList
              array.forEach(element => {
                
              })
            }
          })
      },
      onClickLeft(){
          if(this.$route.query.back){
              this.$router.push({
                  name:this.$route.query.back,
                  query:{
                      id: this.$route.query.id
                  }
              })
          }else{
              this.$router.push({
                  name:'my'
              })
          }
      },
      onRefresh(){

      },
      onLoad(){

      }
  }
}
</script>
<style scoped>
.amount-item {
  flex: 1;
  text-align: center;
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.amount-type {
  margin-bottom: 0.3125rem /* 5/16 */;
}

.total {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  padding: 0 1.25rem /* 20/16 */;
  font-size: 0.875rem /* 14/16 */;
}
</style>
