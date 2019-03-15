<template>
  <div class="dialog">
    <freshList avatar='avatar' name='parent_name' cid='parent_id' :list='freshList'/>
    <div class="container">

    </div>
    <div class="release">
      <div class="release-warp flex">
        <div class="avatar">
          <img :src="userDataState.avatar" />
        </div>
        <div class="field">
          <van-field v-model="message" type="textarea" placeholder="请输入留言" rows="1" autosize />
        </div>
      </div>
      <div class="btn-box flex flex-align">
        <div class="length">{{message.length}}</div>
        <div class="flex flex-align btn-item">
          <div class="btn">
            <div class="picture">
              <i class="iconfont">&#xe643;</i>
            </div>
          </div>
          <van-button round class="theme-btn" type="primary" size="small">发布</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import freshList from './../../module/findModule/freshList'

export default {
  name: 'dialog-box',
  computed: {
    ...mapGetters(['userDataState'])
  },
  components: {
    freshList
  },
  data() {
    return {
      message: '',
      freshList:[]
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    "$router":'fetchData'
  },
  methods: {
    fetchData(){
       let ParentListData = {
         params:{
          child_id: this.$route.query.id
         }
       }
       axios.get('/book/babyParent/getList', ParentListData).then(res => {
        //  console.log(res.data.status = 1){}
         switch(res.data.status){
           case 1:
              this.freshList = res.data.data
           break
           case 0:

           break
         }
       })
    },
    onClickLeft() {

    }
  }
}
</script>
<style scoped>
.release {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}

.release-warp{
  width: 100%;
}

.input-box p {
  color: #909399;
}

.sumbit {
  position: absolute;
  bottom: 0.625rem /* 10/16 */;
  right: 0;
  width: 4.375rem /* 70/16 */;
}

.avatar {
  margin-top: .4375rem /* 7/16 */;
  margin-left: .625rem /* 10/16 */;
}

.field{
  flex: 7;
}

.avatar,
.avatar img {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  border-radius: 50%;
}

.btn-box{
  padding: .3125rem /* 5/16 */ .625rem /* 10/16 */;
  justify-content: space-between;
}

.btn-item{
  justify-content: flex-end;
}

.picture{
  margin-right: 1.25rem /* 20/16 */;
}
</style>
