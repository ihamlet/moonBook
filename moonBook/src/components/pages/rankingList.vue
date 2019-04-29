<template>
  <div class="ranking-list">
    <van-nav-bar title="榜单" />
    <div class="list">
        <div class="item flex flex-align" v-for='(item,index) in list' :key="index" @click="toRankingPage(item)">
          <div class="cell-info">
            <i class="iconfont">{{item.icon}}</i>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ranking-list',
  computed: {
    ...mapGetters(['userDataState'])  
  },
  data() {
    return {
      list: [{
        name: '阅读之星榜',
        routeName: 'ranking',
        icon:'\ue666'
      }, {
        name: '打卡榜',
        routeName: 'memberRanking',
        icon:'\ue6c5'
      }]
    }
  },
  methods: {
    toRankingPage(item){
        this.$router.push({
            name: item.routeName,
            query:{
                id: this.userDataState.child_id
            }
        })
    }
  },
}
</script>
<style scoped>
.item:nth-child(1){
    background: linear-gradient(140deg, #62d1eb,#1177ee); 
}

.item:nth-child(2){
    background: linear-gradient(140deg, #49e5b4,#2cadc2);
}

.list{
    padding: 20px;
}

.item{
    margin-bottom: 10px;
    height: 80px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}

.item i.iconfont{
    font-size: 70px;
    background: linear-gradient(140deg,rgba(255,255,255.3),#fff);
    -webkit-background-clip: text;
    color: transparent;
    opacity: 0.8;
    transform:rotate(45deg);
    position: absolute;
    left: -5px;
    bottom: -5px;
}

.name{
    font-size: 24px;
    color: #fff;
    position: absolute;
    left: 80px;
}
</style>
