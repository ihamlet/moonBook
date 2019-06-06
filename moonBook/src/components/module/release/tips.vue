<template>
  <div class="tips flex" :class="[position == 'top'?'flex-column top':'flex-align bottom']">
    <div class="tips-list" :class="[position == 'bottom'?'flex-align flex':'',isShow?'pulse animated':'']">
      <div class="btn" :class="[position == 'top'?'flex-align flex':'']" v-for='(list,index) in relaseList' :key="index" @click="toRelease(index)">
        <div class="iconfont" :class="list.icon"></div>
        <div class="name">{{list.name}}</div>
      </div>
    </div>
    <div class="close-btn" @click="$emit('close')" v-if='position != "top"' :class="[isShow?'rotateIn animated':'']">
      <i class="iconfont">&#xe647;</i>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'tips',
  props: ['position','isShow','cate','bookId','iconLength'],
  computed: {
    ...mapGetters(['userDataState']),
    relaseList(){
      let arr = this.relase
      if(this.iconLength != 2){
        if((this.userDataState.teacher_banji_id > 0 || this.userDataState.teacher_school_id > 0) && this.userDataState.child_id > 0){
          arr = this.relase.concat({
            name:'课堂阅读',
            icon: 'icon-ketang',
          },{
            name:'阅读打卡',
            icon: 'icon-daqia1',
          })
        }else if(this.userDataState.teacher_banji_id > 0 || this.userDataState.teacher_school_id > 0){
          arr = this.relase.concat({
            name:'课堂阅读',
            icon: 'icon-ketang',
          })
        }
      }

      return arr
    }
  },
  data() {
    return {
      percent: 0,
      photoLength: 0,
      ossSign: '',
      grapicData: {
        text: '',
        photos: []
      },
      relase: [{
        name: '发图文',
        type: 'image',
        icon: 'icon-weibo'
      }, {
        name: '拍小视频',
        type: 'shootVideo',
        icon: 'icon-paishipin'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    grapicData: {
      handler(val) {
        localStorage.setItem('grapicData', JSON.stringify(val))
      },
      deep: true
    },
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX',['scanQRcode']),
    fetchData() {
      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })
    },
    toRelease(index) {
      localStorage.removeItem('grapicData')
      switch (index) {
        case 0:
          this.releaseWebo()
          break
        case 1:
          this.releaseVideo()
          break
        case 2:
          this.ketangRelease()
          break
        case 3:
          this.punch()
          break
      }
    },
    releaseWebo(){
      this.$router.push({
        name: 'graphic',
        query: {
          back: this.$route.query.back || this.$route.name,
          tag_id: this.cate?'':this.$route.query.tag_id,
          cate_id: this.$route.query.cate_id?this.$route.query.cate_id:this.cate?this.cate.cate_id:'',
          book_id: this.bookId,
          ...this.$route.query
        }
      })
    },
    releaseVideo(){
      this.$router.push({
        name: 'graphic',
        query: {
          back: this.$route.query.back || this.$route.name,
          tag_id: this.cate?'':this.$route.query.tag_id,
          cate_id: this.$route.query.cate_id?this.$route.query.cate_id:this.cate?this.cate.cate_id:'',
          book_id: this.bookId,
          upVideo:1,
          ...this.$route.query
        }
      })
    },
    ketangRelease(){
      this.$router.push({
        name: 'graphic',
        query: {
          back: this.$route.query.back || this.$route.name,
          cate_id: 116,
          home_type: 'banji',
          upVideo: 1
        }
      })
    },
    punch() {
      this.scanQRcode({id:this.userDataState.child_id}).then(res=>{
        switch(res.data.status){
          case 1:
            this.$router.push({
              name:'punch-back',
              query:{
                id: this.$route.query.id,
                child_id: this.userDataState.child_id,
                back: this.$route.name,
                cate_id: 133,
                tags:'阅读打卡',
                ...res.data.data.stat_data
              }
            })
          break
          default:
            this.$toast(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.tips.top {
  width: 6.25rem /* 100/16 */;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */;
  border-radius: 0.5rem /* 8/16 */;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  position: relative;
}

.tips.top::before {
  content: '';
  right: 0.625rem /* 10/16 */;
  width: 0;
  height: 0;
  border-width: 0 0.625rem /* 10/16 */ 0.75rem /* 12/16 */;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.8); /*透明 透明  灰*/
  position: absolute;
  top: -0.75rem /* 12/16 */;
}

.tips.top .btn {
  height: 2.25rem /* 36/16 */;
  border-bottom: 0.0625rem /* 1/16 */ solid rgba(255, 255, 255, 0.3);
}

.tips.top .btn:last-child {
  border-bottom: none;
}

.tips.top .btn .iconfont {
  margin-right: 0.9375rem /* 15/16 */;
  font-size: 1.375rem /* 22/16 */;
}

.tips.top .btn .name {
  font-size: 0.8125rem /* 13/16 */;
}

.tips.bottom {
  width: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0), #fff);
  padding: 1.25rem /* 20/16 */ 0 3.75rem /* 60/16 */ 0;
  position: absolute;
  bottom: 0;
}

.tips.bottom .tips-list {
  width: 260px;
  margin: 0 auto;
  padding: .9375rem /* 15/16 */;
  background: #fff;
  border-radius: .625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.1);
}

.tips.bottom .btn {
  flex: 1;
  text-align: center;
}

.tips.bottom .btn .iconfont {
  font-size: 2.125rem /* 34/16 */;
}

.tips.bottom .btn .name {
  font-size: 0.75rem /* 12/16 */;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  bottom: 0.9375rem /* 15/16 */;
  left: 50%;
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  text-align: center;
  line-height: 2rem /* 32/16 */;
  background: #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
  margin-left: -1rem /* 16/16 */;
}
</style>
