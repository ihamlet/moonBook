<template>
  <div class="card-list">
    <div class="title">{{schoolName}}</div>
    <div class="card-box" v-for='(item,index) in levels' :key="index" @click="selectCard(item,index)">
      <div class="borrow-card flex animated" :class="[cardIndex==index?'rotate':'bounceInUp',`an-${index}`]">
        <div class="borrow flex flex-align flex-justify">
          <span class="l">每天</span>
          {{item.borrow_count}}
          <span class="r">本</span>
        </div>
        <div class="info">
          <div class="type">{{item.name}}</div>
          <div class="period">租期{{item.borrow_day}}天</div>
        </div>
        <div class="deposit flex flex-align flex-justify">
          {{item.price/100}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
    name:'card-list',
    data () {
        return {
            cardIndex: -1,
            levels:[],
            schoolName:''
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$rotuer':'fetchData'
    },
    methods: {
        fetchData(){
            let data = {
                params: {
                    shelf_id: this.$route.query.id
                }
            }

            axios.get('/book/MemberCard/getMemberRegPayConfig', data).then(res => {
                if (res.data.status == 1) {
                    this.schoolName = res.data.data.title
                    this.levels = res.data.data.deposites
                }
            })
        },
        selectCard(item, index) {
            this.cardIndex = index
            this.$router.push({
                name:'AcceptCardTime',
                query:{
                    id: this.$route.query.id,
                    leveId: item.id
                }
            })
        }
    }
}
</script>
<style scoped>
.card-box {
  width: 100%;
  height: 8.125rem /* 130/16 */;
  overflow: hidden;
  position: relative;
}

.card-box:nth-child(1) .borrow-card {
  background-image: linear-gradient(to top, #209cff 0%, #68e0cf 100%);
}

.card-box:nth-child(2) .borrow-card {
background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}

.card-box:nth-child(3) .borrow-card {
  background-image: linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%);
}

.card-box:nth-child(4) .borrow-card {
  background-image: linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);
}

.card-box::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 2.5rem /* 40/16 */ rgba(0, 0, 0, 0.8);
  z-index: 1;
  bottom: -0.625rem /* 10/16 */;
}

.borrow {
  text-align: center;
  font-size: 2.5rem /* 40/16 */;
}

.info .type {
  font-size: 1.375rem /* 22/16 */;
}

.borrow span {
  display: block;
  font-size: 0.875rem /* 14/16 */;
}

.borrow span.l{
  margin-right: .3125rem /* 5/16 */;
}

.borrow span.r{
  margin-left: .3125rem /* 5/16 */;
}

.borrow-card {
  position: absolute;
  top: 2.5rem /* 40/16 */;
  width: 100%;
  height: 11.25rem /* 180/16 */;
  background: #fff;
  border-radius: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.3);
}

.borrow,
.info,
.deposit {
  flex: 1;
  color: #fff;
  position: relative;
  height: 3.125rem /* 50/16 */;
  margin-top: 1.25rem /* 20/16 */;
}

.deposit {
  text-align: center;
  font-size: 1.5rem /* 24/16 */;
  font-style: italic;
}

.deposit::before {
  content: '¥';
  font-size: 0.875rem /* 14/16 */;
  margin-right: 5px
}

.rotate {
  transform: rotate(6deg);
  box-shadow: 0 0 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.3);
}

.title{
    font-weight: 700;
    text-align: center;
    color: #606266;
}

.type,
.period{
  text-align: right;
}
</style>
