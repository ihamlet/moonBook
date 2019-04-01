<template>
  <div class="article-item">
    <van-cell>
      <van-row gutter="10">
        <van-col span="6">
          <div class="img-grid" @click="change">
            <div class="photo" v-if='item.photos'>
              <img :src="item.photos.thumb" alt="" srcset="">
            </div>
          </div>
        </van-col>
        <van-col span="16">
          <div class="text-box" @click="toPublishing">
            <div class="text-content" v-if='item.text' v-html="item.text" v-line-clamp:20="3"></div>
            <div class="add-text" v-else>
              <div class="description">点击添加文字</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-cell>
  </div>
</template>
<script>
import Publishing from './../Publishing'
// import { mapActions } from 'vuex'
 
export default {
  name: 'article-item',
  props: ['item','index'],
  components: {
    Publishing
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    // ...mapActions('beautifulArticle',['delete']),
    toPublishing() {
      this.$router.push({
        name: 'publishing',
        query: {
          index: this.index,
          onClickType:'revise',
          back: this.$route.query.back,
          id: this.$route.query.id
        }
      })
    },
    change(){
      let index = this.item.type == 'video'?2:0
      this.$emit('onChange',index)
    },
    onRead(file) {
      let data = {
        file:file,
        upLoadType:'image',
        onClickType:'revise',
        index:this.index
      }
      this.$emit('onRead',data)
    },
    doUpload(e){
      let data = {
        file:e.target.files[0],
        type:e.target.dataset.type,
        upLoadType:'video',
        onClickType:'revise',
        index:this.index
      }
      this.$emit('doUpload',data)
    }
  }
}
</script>
<style scoped>
.article-item {
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
}

.img-grid {
  background: #f2f2f2;
  margin-top: 0;
}

.photo img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.add-text {
  width: 100%;
  font-size: 1rem /* 16/16 */;
  color: #c0c4cc;
}
</style>
