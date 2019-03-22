<template>
  <div class="article-tips">
    <div class="add">
      <div class="insert">
        <i class="iconfont">&#xe728;</i>
      </div>
    </div>

    <transition leave-active-class="bounceOut" enter-active-class="bounceIn" class='case'>
      <div class="list flex flex-align" v-show='isTipsShow'>
        <div class="icon-item" v-for='(item,itemIndex) in tipsList' :key="itemIndex" @click="select(item)">
          <div class="iconfont" :class="item.icon"></div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </transition>

    <div class="media-input" v-show="false">
      <van-uploader ref='selectPhoto' :after-read="onRead" />
      <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'article-tips',
  props: ['type', 'index', 'show'],
  computed: {
    ...mapGetters('beautifulArticle', ['getArticleList']),
    isTipsShow(){
        let b = false
        if(this.getArticleList.length){
          if(this.index == this.getArticleList.length){
            b = true
          }
        }else{
          b = true
        }
        
        return b
    }
  },
  data() {
    return {
      tipsList: [{
        type: 'images',
        icon: 'icon-tupian',
        name: '图片',
        index: 0
      }, {
        type: 'text',
        icon: 'icon-wenzi',
        name: '文字',
        index: 1
      }, {
        type: 'video',
        icon: 'icon-shipin',
        name: '视频',
        index: 2
      }],
      data: {
        text: '',
        photos: []
      }
    }
  },
  updated () {

  },
  methods: {
    select(item) {
      switch (item.index) {
        case 0:
          this.$refs.selectPhoto.$refs.input.click()
          break
        case 1:
          this.$router.push({
            name: 'publishing',
            query: {
              index: this.index,
              back: this.$route.query.name,
              back_name: this.$route.query.back_name,
              id: this.$route.query.id
            }
          })
          break
        case 2:
          this.$refs.selectFileVideo.click()
          break
      }
    },
    onRead(file) {
      let data = {
        file: file,
        upLoadType: 'image',
        index: this.index
      }

      this.$emit('onRead', data)
    },
    doUpload(e) {
      let data = {
        file: e.target.files[0],
        type: e.target.dataset.type,
        upLoadType: 'video',
        index: this.index
      }

      this.$emit('doUpload', data)
    }
  }
}
</script>
<style scoped>
.icon-tupian::before {
  content: '\e643';
}

.icon-shipin::before {
  content: '\e611';
}

.icon-wenzi::before {
  content: '\e642';
}

.add {
  height: 2.5rem /* 40/16 */;
  line-height: 2.5rem /* 40/16 */;
  width: 100%;
  text-align: center;
  position: relative;
}

.add .iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #c0c4cc;
}

.list {
  position: absolute;
  width: 11.25rem /* 180/16 */;
  height: 3.625rem /* 58/16 */;
  left: 50%;
  z-index: 10;
  background: #fff;
  margin-left: -5.625rem /* 90/16 */;
  border-radius: 0.5rem /* 8/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.2);
}

.list::before {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 12px;
  border-color: transparent transparent #fff transparent;
  width: 0px;
  height: 0px;
  left: 50%;
  top: -1.25rem /* 20/16 */;
  transform: translate3d(-50%, 0, 0);
  z-index: 9;
}

.list .icon-item {
  flex: 1;
  text-align: center;
}

.list .icon-item .iconfont {
  font-size: 1.5rem /* 24/16 */;
}

.list .icon-item span {
  font-size: 0.875rem /* 14/16 */;
}
</style>

