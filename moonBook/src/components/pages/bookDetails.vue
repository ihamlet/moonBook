<template>
  <div class="book-details page-padding">
    <van-nav-bar left-text="返回" fixed left-arrow @click-left="onClickLeft">
      <div class="head-bar-title" slot="title">
        <transition name="slide-fade" mode="out-in">
          <div key="1" v-if='!themeBarSearch'>{{$route.meta.title}}</div>
          <div key="2" v-else>{{details.title}}</div>
        </transition>
      </div>
    </van-nav-bar>
    <div class="container">
      <lazy-component class="module">
        <div class="book-card" ref='bookCard'>
          <van-row gutter="10">
            <van-col span="9">
              <div class="book-thumb">
                <img :src="details.thumb" @error="outThumb($event,details)" />
              </div>
            </van-col>
            <van-col span="15">
              <div class="content">
                <div class="title" v-line-clamp:20="2">{{details.title}}</div>
                <div class="book-info">
                  <div class="author" v-line-clamp:20="1"><b>作者:</b>{{details.author}}</div>
                  <div class="borrow-count"><span class="people">{{details.borrow_count}}</span>人借过</div>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </lazy-component>
      <lazy-component class="module" v-if='freshList.length > 0'>
        <freshList :list='freshList' cid="child_id" avatar="child_avatar" routerName="baby-home" name="child_name" />
      </lazy-component>
      <lazy-component class="module">
        <comment :item='details' cid='post_id'/>
      </lazy-component>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import freshList from './../module/findModule/freshList'
import comment from './../module/comment'

export default {
  name: 'book-details',
  components: {
    freshList,
    comment
  },
  data() {
    return {
      details: '',
      freshList: '',
      scrollTop: '',
      domHeight: 0,
      themeBarSearch: false,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    outThumb(e, details) {
      let book_author = ''

      if (details.author.length > 7) {
        book_author = details.author.substr(0, 7) + '...'
      } else {
        book_author = details.author
      }

      e.target.outerHTML = `
        <div class='three-d-book'>
            <div class='three-d-book-cover'>
                <div class='three-d-book-name'>
                    ${details.title}
                </div>
                <div class='three-d-book-author'>
                    ${book_author}
                </div>
            </div>
        </div>
      `
    },
    fetchData() {
      axios.get(`/book/ShelfBook/getInfo?book_id=${this.$route.query.id}`).then(res => {
        this.details = res.data.data
      })

      axios.get(`/book/ShelfBookChild/getList?book_id=${this.$route.query.id}`).then(res => {
        this.freshList = res.data.data
      })
    },
    handleScroll() {
      if (this.$refs.userCard) {
        this.domHeight = this.$refs.bookCard.offsetHeight
      }
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > this.domHeight) {
        this.themeBarSearch = true
      } else {
        this.themeBarSearch = false
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.18s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.book-card {
  padding: 1.25rem /* 20/16 */;
  background: #fff;
}

.book-thumb {
  width: 100%;
  height: 8.75rem /* 140/16 */;
}

.title {
  color: #303133;
  margin-bottom: 0.3125rem /* 5/16 */;
  height: 2.625rem /* 42/16 */;
  font-weight: 500;
}

.book-info b{
  width: 3.125rem /* 50/16 */;
}

.book-info div {
  font-size: 0.875rem /* 14/16 */;
  margin-top: 0.3125rem /* 5/16 */;
}

.people {
  color: #f56c6c;
}

.container{
  padding-top: 2.8125rem /* 45/16 */;
}
</style>
