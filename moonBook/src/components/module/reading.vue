<template>
  <div class="reading">
    <van-cell :title="moduleTitle" :is-link="type =='rank'" @click="toBabyHome" />
    <div class="not-content" v-if='!list'>
      尚无记录, <span class="theme-color">阅读是与心灵沟通</span>
    </div>
    <div class="book-list scroll-x" v-else>
      <div class="book-item scroll-item" v-for='(item,index) in list' :key="index">
        <div class="book-cover">
          <img :src="thumb(item.book_thumb)" @error="outThumb($event,item)" :alt="item.book_name">
        </div>
        <div class="book-name" v-line-clamp:20="2">
          {{item.book_name}}
        </div>
        <div class="book-detail">
          <div class="book-author" v-line-clamp:20="1">作者:{{item.book_author}}</div>
          <div class="book-borrow">
            <span>{{item.book_borrow_count}}</span>人借过
          </div>
          <div class="book-label">
            <div class="label-item" v-for='(sortItem,sortIndex) in item.book_tags' :key="sortIndex">
              {{sortItem}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'reading',
  props: ['list', 'moduleTitle', 'type', 'babyId'],
  methods: {
    toBabyHome() {
      this.$router.push({
        name: 'baby-home',
        query: {
          id: this.babyId
        }
      })
    },
    thumb(img) {
      let hostMatch = img.match(/https?:\/\/(.+?)\//)
      if (hostMatch) {
        return `/book/api/remotePic?url=${img}`
      } else {
        return img
      }
    },
    outThumb(e, item) {
      e.target.outerHTML = `
            <div class='three-d-book'>
                <div class='three-d-book-cover'>
                    <div class='three-d-book-name'>
                        ${item.book_name}
                    </div>
                    <div class='three-d-book-author'>
                        ${item.book_author}
                    </div>
                </div>
            </div>
       `
    }
  }
}
</script>
<style scoped>
.scroll-item {
  display: inline-grid;
}

.book-list {
  padding-left: 0.625rem /* 10/16 */;
}

.book-cover {
  width: 9.375rem /* 150/16 */;
  height: 9.375rem /* 150/16 */;
}

.book-cover img {
  height: 8.75rem /* 140/16 */;
  margin: 0 auto;
  display: block;
  background: #f2f6fc;
  text-align: center;
  line-height: 8.75rem /* 140/16 */;
  color: #c0c4cc;
  overflow: hidden;
}

.book-item {
  padding-right: 0.625rem /* 10/16 */;
}

.book-name {
  color: #303133;
  height: 2.5rem /* 40/16 */;
  margin: 0.3125rem /* 5/16 */ 0;
}

.book-label {
  height: 4.0625rem /* 65/16 */;
}

.book-label .label-item {
  font-size: 0.75rem /* 12/16 */;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  padding: 0.125rem /* 2/16 */ 0.3125rem /* 5/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  margin-top: 0.3125rem /* 5/16 */;
  float: left;
  border-radius: 0.25rem /* 4/16 */;
}

.book-borrow span {
  color: #f56c6c;
}

.book-detail {
  display: grid;
  font-size: 0.8125rem /* 13/16 */;
}

.book-borrow {
  margin: 0.125rem /* 2/16 */ 0;
}
</style>
<style>
.three-d-book{
  perspective: 350;
  position: relative;
}

.three-d-book-cover {
  background: linear-gradient(135deg, #00bcd4, #409eff);
  width: 6.875rem /* 110/16 */;
  margin: 0 auto;
  padding: 0.625rem 0;
  transform: rotateY(8deg);
  position: relative;
  perspective: 350;
}

.three-d-book-cover::before{
    content:'';
    width: .625rem /* 10/16 */;
    height: 100%;
    background: linear-gradient(135deg, #F2F6FC, #DCDFE6);
    position: absolute;
    transform: rotateY(-32deg);
    left: -.5rem /* 8/16 */;
    top:0;
}

.three-d-box,
.three-d-book-cover {
  height: 7.5rem /* 120/16 */;
}

.three-d-book-name {
  color: #fff;
  width: 5.625rem /* 90/16 */;
  margin: 0 auto;
  font-size: 0.8125rem;
  height: 3.125rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.three-d-book-author {
  padding: 0.625rem;
  text-align: right;
  background: linear-gradient(left, #fff, #F2F6FC);
  font-size: 0.75rem;
  box-shadow: 0 5px 20px -9px rgba(0, 0, 0, 0.5);
  margin-top: 1.25rem;
}
</style>
