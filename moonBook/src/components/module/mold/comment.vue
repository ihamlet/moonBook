<template>
  <div class="comment">
    <div class="footer-bar">
      <div class="bar-padding flex flex-align">
        <div class="input-box" @click="show = true">
          <i class="iconfont">&#xe9ce;</i>
          写评论
        </div>
        <div class="btn-icon flex flex-align">
          <div class="btn" @click="addPraise(item)">
            <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
            <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
          </div>
          <div class="btn">
            <i class="iconfont">&#xe64c;</i>
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="show" class="comment-popup" position="bottom">
      <div class="comment-content flex flex-align">
        <div class="field-box">
          <van-cell-group>
            <van-field v-model="message" type="textarea" placeholder="请输入评论" rows="1" autosize />
          </van-cell-group>
        </div>
        <div class="submit-btn theme-color" @click="submit">发送</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from './../../lib/js/api'

export default {
  name: 'comment',
  computed: {
    ...mapGetters(['userToken'])
  },
  props: ['item'],
  data() {
    return {
      show: false,
      message: ''
    }
  },
  methods: {
    submit() {
      let data = {
        post_id: this.$route.query.id,
        contents: this.message
      }
      axios.post(`/book/SchoolArticleComment/edit?ajax=1&token=${this.userToken}`, data).then(res => {
        this.show = false
      })
    },
    addPraise(item) {
      item.isZan = !item.isZan
      console.log(item.isZan)
      axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
        item.zan_num = res.data.data.like
      })
    }
  }
}
</script>
<style scoped>
.footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem /* 48/16 */;
  background: #fff;
  border-top: 0.0625rem /* 1/16 */ solid #ededed;
}

.comment-popup {
  padding: 0.3125rem /* 5/16 */;
}

.comment-content {
  padding-left: 0.9375rem /* 15/16 */;
}

.bar-padding {
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
}

.input-box {
  height: 2.375rem /* 38/16 */;
  flex: 3;
}

.btn-icon {
  flex: 1;
}

.btn {
  flex: 1;
  text-align: center;
}

.btn i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.input-box {
  background: #ebeef5;
  line-height: 2.375rem /* 38/16 */;
  border-radius: 0.375rem /* 6/16 */;
}

.input-box i.iconfont {
  margin-left: 0.625rem /* 10/16 */;
}

.field-box {
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 0.5rem /* 8/16 */;
  overflow: hidden;
  flex: 5;
}

.submit-btn {
  flex: 1;
  text-align: center;
}
</style>
