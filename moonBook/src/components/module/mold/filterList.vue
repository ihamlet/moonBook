<template>
  <!-- 学校列表弹出层(列表筛选) -->
  <div class="w-popup-box">

    <div class="w-popup-list">
      <div class="w-tit-box flex flex-align"><span></span>{{filterList[0].title}}</div>
      <van-row gutter="10">
        <van-col span="8" v-for="(item,itemIndex) in filterList[0].arr" :key="itemIndex">
          <div class="a-button" v-line-clamp:20="1" :class="[itemIndex == selectIndex.selectAgeIndex?'selection':'']" @click="selectAge(item,itemIndex)">{{item}}</div>
        </van-col>
      </van-row>
    </div>

    <div class="w-popup-list">
      <div class="w-tit-box flex flex-align"><span></span>{{filterList[1].title}}</div>
      <van-row gutter="10">
        <van-col span="8" v-for="(item,itemIndex) in filterList[1].arr" :key="itemIndex">
          <div class="a-button" v-line-clamp:20="1" :class="[itemIndex == selectIndex.selectClassifyIndex?'selection':'']" @click="selectClassify(item,itemIndex)">{{item}}</div>
        </van-col>
      </van-row>
    </div>

    <div class="w-popup-list">
      <div class="w-tit-box flex flex-align"><span></span>{{filterList[2].title}}</div>
      <van-row gutter="10">
        <van-col span="8" v-for="(item,itemIndex) in filterList[2].arr" :key="itemIndex">
          <div class="a-button" v-line-clamp:20="1" :class="[itemIndex == selectIndex.selectFloorIndex?'selection':'']" @click="selectFloor(item,itemIndex)">{{item}}</div>
        </van-col>
      </van-row>
    </div>

    <van-goods-action>
      <van-goods-action-big-btn class="theme-action-btn-l" text="重置" @click="onClickBtnLeft" />
      <van-goods-action-big-btn class="theme-action-btn-r" primary text="确定" @click="onClickBtnRight" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: 'filterPopup',
  props: ['filterList'],
  data () {
    return {
      selectIndex:{
        selectAgeIndex:-1,
        selectClassifyIndex:-1,
        selectFloorIndex:-1,
      }
    }
  },
  watch: {
    selectIndex:{
      handler(val){
        let age = this.filterList[0].arr[val.selectAgeIndex]
        let classify = this.filterList[1].arr[val.selectClassifyIndex]
        let floor = val.selectFloorIndex+1

        let tag = [age,classify].join(',')

        let params = {
          tag:tag,
          floor:floor
        }

        this.$emit('onSelect',params)
      },  
      deep:true
    }
  },
  methods: {
    onClickBtnLeft(){
      this.selectIndex.selectAgeIndex = -1
      this.selectIndex.selectClassifyIndex = -1
      this.selectIndex.selectFloorIndex = -1
    },
    onClickBtnRight(){
      this.$emit('close')
    },
    selectAge(item,itemIndex){
      this.selectIndex.selectAgeIndex = itemIndex
    },
    selectClassify(item,itemIndex){
      this.selectIndex.selectClassifyIndex = itemIndex
    },
    selectFloor(item,itemIndex){
      this.selectIndex.selectFloorIndex = itemIndex
    }
  }
}
</script>

<style scoped>
.w-popup-box {
  padding-top: 1.25rem /* 20/16 */;
}
.w-popup-list {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 30px;
}
.w-tit-box {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem /* 16/16 */;
  color: #303133;
  font-weight: 700;
  margin-bottom: 1.25rem /* 20/16 */;
}
.w-tit-box span {
  display: block;
  background: #0084ff;
  width: 3px;
  height: 15px;
  margin-right: 5px;
}
.list-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.b-button,
.a-button {
  height: 2.25rem /* 36/16 */;
  text-align: center;
  line-height: 2.25rem /* 36/16 */;
}

.b-button {
  border: 1px solid #0084ff;
  color: #0084ff;
  font-size: 15px;
  border-radius: 6px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.a-button {
  background: #f0f0f0;
  font-size: .875rem /* 14/16 */;
  border-radius: 6px;
  margin-bottom: .625rem /* 10/16 */;
  border: .0625rem /* 1/16 */ solid #f0f0f0
}

.a-button.selection{
  border-color: #0084ff;
  background: #fff;
}
</style>
<style>
.theme-action-btn-l.van-button--warning{
  background:#fff;
  color: #303133;
  border-color: #fff;
}
.theme-action-btn-r.van-button--danger{
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  border-color: transparent;
}
</style>



