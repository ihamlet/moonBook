<template>
  <div class="notice" v-if='notice.length!=0'>
    <van-nav-bar title="通知"/>
    <div class="module">
      <graphicCard :item='notice[0]' type='notice' title='老师'/>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import graphicCard from './../card/graphicCard'

export default {
  name: 'notice',
  props: ['type'],
  components: {
    graphicCard
  },
  data() {
    return {
      count: 0,
      notice: ''
    }
  },
  watch: {
    '$router': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          cate: '通知',
        }
      }

      if (this.type == 'banji') {
        data.params.banji_id = this.$route.query.id,
        data.params.portal_name = '班级主页'
      }

      if (this.type == 'school') {
        data.params.school_id = this.$route.query.id,
        data.params.portal_name = '学校主页'
      }

      axios.get('/book/SchoolArticle/getList', data).then(res => {
        if (res.data.status == 1) {
          this.count = res.data.count
          this.notice = res.data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.icon {
  margin-right: 0.9375rem /* 15/16 */;
}

.icon .iconfont {
  font-size: 1.625rem /* 26/16 */;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.module{
  padding: 15px;
}
</style>
