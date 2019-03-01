<template>
  <div class="activity page-padding">

  </div>
</template>
<script>
import axios from './../lib/js/api'
import activityList from './../module/activity/activityList'

export default {
  name: 'activity',
  components: {
    activityList,
  },
  data() {
    return {
      childInfo: ''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
      // axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
      //   this.childInfo = res.data.data
      // })

      // axios.get(`/book/ShelfBook/getList?page=1&limit=20&mode=teacher&banji_id=${this.$route.query.banji_id}`).then(res => {
      //   this.lateBook = res.data.data
      // })
    },
    onClickLeft(){
        if(this.$route.query.back){
            this.$router.push({
                name: this.$route.query.back,
                query:{
                    id: this.$route.query.id
                }
            })
        }else{
            this.$router.push({
                name:'class-home',
                query:{
                    id: this.$route.query.id
                }
            })
        }
    }
  }
}
</script>
<style scoped>
.img-preview {
  position: absolute;
}

.baby-class .icon {
  margin-right: 0.625rem /* 10/16 */;
}

.baby-class .icon i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
