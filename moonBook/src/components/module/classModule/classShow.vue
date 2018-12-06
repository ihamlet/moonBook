<template>
  <div class="class-show">
    <van-cell-group class="cell-group">
      <van-cell @click="toClassZoom" center is-link>
        <windmill slot="icon"/>
        <div class="content flex flex-align flex-justify" slot="title" v-if="drying">
          <show-crad :imgList="drying.media.imgList" :text="drying.text"/>
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
import axios from 'axios'
import windmill from './../animate/svg/windmill'
import photoStack from './../animate/photoStack'
import showCrad from './../card/showCrad'
export default {
  name: 'class-show',
  props: ['className'],
  components: {
    windmill,
    photoStack,
    showCrad
  },
  data() {
    return {
      drying: '',
      show: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $router: 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get('/api/classAticleList').then(res => {
        if (res.data.classAticleList) {
          res.data.classAticleList.forEach((element, i) => {
            if (i == 0) {
              this.drying = element
            }
          })
        }
      })
    },
    toClassZoom() {
      this.$router.push({
        name: 'class-zoom',
        query: {
          id: this.$route.query.id,
          className: this.className
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
</style>
