<template>
  <van-row gutter="20">
    <van-col span="7">
      <div class="book-cover">
        <img :src="thumb(item.book_photo)" @error="imgError"/>
        <div class="is-read" v-if='item.is_read > 0'>
          <i class="iconfont">&#xe66f;</i>
        </div>
      </div>
    </van-col>
    <van-col span="11">
      <div class="book-info"  @click="toBookDetails">
        <div class="title" v-line-clamp:20="2">{{item.book_title}}</div>
        <div class="attach">
          <div class="pos-title" v-if='item.pos_name'>书位：{{item.pos_name}}</div>
        </div>
        <div class="borrow" v-if='type=="guide"'>
          借阅：{{item.book_borrow_count}} 次
        </div>
      </div>
    </van-col>
    <van-col span="6">
      <div class="button">
        <div class="flex flex-align">
          <div class="like" @click="addCollect">
            <i class="iconfont" v-if='item.is_collect'>&#xe668;</i>
            <i class="iconfont" v-else>&#xe669;</i>
          </div>
          <div class="listening" @click="listening">
            <i class="iconfont">&#xe617;</i>
          </div>
        </div>
        <div class="abrasion" v-if='type == "在读"'>
          <van-button plain class="theme-btn" size="small" type="primary" round @click="toBorrow">磨损</van-button>
        </div>
      </div>
    </van-col>

    <van-popup v-model="likeIconPopup" get-container='#app' class="like-popup" :overlay='false' :style='{background:"transparent"}' :duration='0'>
      <likeIcon ref='likeIcon'/>
    </van-popup>

  </van-row>
</template>
<script>
import axios from "./../../lib/js/api"
import likeIcon from './../animate/lottie/likeIcon'

export default {
  name: 'bookCard',
  props: ['item','type','isCollect'],
  components:{
    likeIcon
  },
  data () {
    return {
      itemCollect: false,
      likeIconPopup: false
    }
  },
  watch: {
    isCollect(val){
      this.itemCollect = val == 1?true:false
    }
  },
  methods: {
    thumb(img) {
      if(img){
        let hostMatch = img.match(/https?:\/\/(.+?)\//)
        if (hostMatch) {
          return `/book/api/remotePic?url=${img}`
        } else {
          return img
        }
      }
    },
    listening() {
      let p = /（.+?）/
      let pureTitle = this.item.book_title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}`
      let isRead = localStorage.getItem('bookRead_' + this.item.book_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(() => {
          localStorage.setItem('bookRead_' + this.item.book_id, true)
          location.href = url
        })
      } else {
        location.href = url
      }
    },
    toBookDetails() {
      this.$router.push({
        name: 'book-details',
        query: {
          id: this.item.book_id
        }
      })
    },
    addCollect() {
      let data = {
          params:{
            target_id: this.item.book_id,
            type_id: 5
          }
      }

      axios.get('/book/member/add_favorite',data).then(res => {
        if (res.data.status == 1) {
          this.itemCollect = !this.itemCollect
          this.$emit('like', this.item)

          if(this.itemCollect){
            this.likeIconPopup = true
            if(this.$refs.likeIcon){
              this.$refs.likeIcon.play()
            }
            setTimeout(()=>{
              this.$refs.likeIcon.stop()
              this.likeIconPopup = false
            },1500)
          }else{
            this.$toast(res.data.msg)
          }
        }
      })
    },
    toBorrow(){
      if(this.item.borrow_id){
        location.href = `/book/MemberBookBroken/add/borrow_id/${this.item.borrow_id}?back_url=${encodeURIComponent(location.href)}`
      }
    },
    imgError(e) {
      e.target.src = 'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg'
    }
  }
}
</script>
<style scoped>
.book_title {
  margin-bottom: 0.3125rem /* 5/16 */;
  font-weight: 500;
}

.attach,
.borrow{
  color: #606266;
}

.book-cover{
  position: relative;
}

.book-cover img {
  margin: 0 auto;
  display: block;
}

.title {
  margin-bottom: 0.625rem /* 10/16 */;
  font-weight: 500;
}

.button{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
}

.like{
  margin-right: 1.25rem /* 20/16 */;
}

.listening i.iconfont,
.like .iconfont{
  font-size: 1.625rem /* 26/16 */;
  color: #f02b2b;
}

.abrasion .theme-btn{
  width: 100%;
  margin-top: .625rem /* 10/16 */;
}

.book-cover img{
  min-height: 6.25rem /* 100/16 */;
  background: #fff;
}

.is-read{
  position: absolute;
  left: -5px;
  top: 10px;
  text-align: center;
}

.is-read::after{
  content: '';
  position: absolute;
  top: -10px;
  left: 6px;
  width: 28px;
  height: 33px;
  background: #fff;
  z-index: 1;
}

.is-read .iconfont{
  font-size: 2.5rem /* 40/16 */;
  color: #8BC34A;
  z-index: 3;
  position: relative;
}
</style>
