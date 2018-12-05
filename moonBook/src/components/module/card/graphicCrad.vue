<template>
  <div class="graphic-card">
    <div class="container">
      <div class="user-card flex flex-align">
        <div class="avatar">
          <img :src="item.user.avatar" :alt="item.user.name">
        </div>
        <div class="info">
            <div class="name flex flex-align">
              <span v-if="type=='babyHome'">{{babyName}}{{familyTitle?`的${familyTitle}`:`的家长`}}</span>
              <span v-else>{{item.user.name}}</span>
              <div class="memberships" v-if='item.card_level&&item.card_level.type == 1'>
                <i class="iconfont vip-masonry" v-if="item.card_level.level == 3">&#xe611;</i>
                <i class="iconfont vip-gold" v-if="item.card_level.level == 2">&#xe611;</i>
                <i class="iconfont vip-ordinary" v-if="item.card_level.level == 1">&#xe611;</i>
              </div>
            <div class="class-name">{{className}}</div>
          </div>
          <div class="school">{{item.schoolName}}</div>
        </div>
        <div class="date">
          <span>{{item.date}}</span>
          <span>{{item.time}}</span>
        </div>
      </div>
      <div class="text" v-line-clamp:20="2" v-html="item.details" @click="articleShow = true"></div>
      <!-- 媒体图片  -->
      <div class="media img"  v-if='item.hasvideo!=1&&item.hasaudio!=1'>
        <van-row gutter="5">
          <van-col :span="8" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
            <div class="img-grid" v-lazy:background-image="photo.thumb" @click="mediaLamp(item,photoIndex)"></div>
          </van-col>
        </van-row>
      </div>
      <!-- 媒体视频 -->
      <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
        <div class="video-cover">
          <div class="play">
            <i class="iconfont">&#xe602;</i>
          </div>
          <img :src="item.cover" alt="视频封面">
        </div>
      </div>
      <!-- 媒体音频 -->
      <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>

      </div>

      <div class="social flex flex-align">
        <div class="share">
          <i class="iconfont">&#xe6eb;</i> {{item.share_num>1000?'999+':item.share_num}}
        </div>
        <div class="message">
          <i class="iconfont">&#xe731;</i> {{item.reply_num>1000?'999+':item.reply_num}}
        </div>
        <div class="praise flex flex-align flex-justify" @click="addPraise(item)">
          <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
          <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
          {{item.zan_num>1000?'999+':item.zan_num}}
        </div>
      </div>
    </div>

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>

    <van-popup v-model="articleShow" class="page-popup" position="right" get-container='#app'>
      <details-article  @close="articleShow = false" :item="item"/>
    </van-popup>
  </div>
</template>
<script>
  import axios from "axios"
  import pictureBox from "./../mold/pictureBox"
  import detailsArticle from './../mold/details/article'

  export default {
    name: "graphic-crad",
    props: ["item", "type", "babyName","className","familyTitle"],
    components: {
      pictureBox,
      detailsArticle
    },
    data() {
      return {
        imgIndex: 0,
        pictureShow: false,
        articleShow: false
      }
    },
    methods: {
      addPraise(item) {
        item.isZan = !item.isZan
        axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
          item.zan_num = res.data.data.like
        })
      },
      mediaLamp(item, photoIndex) {
        this.pictureShow = true
        this.imgIndex = photoIndex
        this.item = item
      }
    }
  }
</script>
<style scoped>
.text {
	margin: 0.9375rem/* 15/16 */ 0.3125rem/* 5/16 */;
	text-align: justify;
}

.video-cover {
	position: relative;
	width: 100%;
}

.video-cover .play {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 3.5rem/* 56/16 */;
	height: 3.5rem/* 56/16 */;
	text-align: center;
	line-height: 3.5rem/* 56/16 */;
	transform: translate3d(-50%, -50%, 0);
}

.video-cover .play i.iconfont {
	color: #fff;
	font-size: 3.5rem/* 56/16 */;
}

.social {
	margin-top: 0.625rem
      /* 10/16 */;
	height: 2.25rem
      /* 36/16 */;
	border-top: 0.0625rem
      /* 1/16 */
      solid #e4e7ed;
}

.media {
	margin-bottom: 0.625rem
      /* 10/16 */;
}

.info i.iconfont {
	font-size: 1.25rem
      /* 20/16 */;
}

.avatar {
	margin-right: 0.625rem
      /* 10/16 */;
}

.name {
	color: #303133;
	font-size: 1rem
      /* 16/16 */;
}

.memberships{
  margin-left: .625rem /* 10/16 */;
}

.avatar img {
	width: 3.75rem /* 60/16 */;
	height: 3.75rem /* 60/16 */;
	border-radius: 50%;
}

.date {
	position: absolute;
	top: 0;
	right: 0;
	color: #c0c4cc;
	font-size: 0.75rem
      /* 12/16 */;
}

.school{
  text-align: left;
}

.class-name{
  margin-left: .625rem /* 10/16 */;
}
</style>
