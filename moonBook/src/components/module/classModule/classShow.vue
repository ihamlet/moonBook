<template>
  <div class="class-show">
    <van-cell-group class="cell-group">
      <van-cell @click="toClassZoom" center is-link>
        <windmill slot="icon"/>
        <div class="content flex flex-align flex-justify" slot="title" v-if="drying">
          <show-crad :imgList="drying.photos" :text="drying.details"/>
        </div>

        <div class="value flex" v-else>
          <span class="title">暂无班级动态</span>
          <span class="text">班级风采</span>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import windmill from './../animate/svg/windmill'
import photoStack from './../animate/photoStack'
import showCrad from './../card/showCrad'
export default {
  name: 'class-show',
  props: ['banji_name','banji_id'],
  components: {
    windmill,
    photoStack,
    showCrad
  },
  data() {
    return {
      drying: '',
      show: false,
      page:1
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData() {
      axios.get(`/book/SchoolArticle/getList?page=${this.page}&limit=1&banji_id=${this.banji_id}`).then(res => {
        this.drying = res.data.data[0]
      })
    },
    toClassZoom() {
      this.$router.push({
        name: 'class-zoom',
        query: {
          id: this.banji_id,
          banji_name: this.banji_name
        }
      })
    }
  }
}
</script>
<style scoped>
.content {
  padding: 0 0.625rem /* 10/16 */;
}

.value span {
  flex: 1;
}

.title {
  color: #909399;
}

.text {
  text-align: right;
}

.class-show .img-preview{
  position: absolute;
}
</style>
