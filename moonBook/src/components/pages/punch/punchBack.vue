<template>
  <div class="punch-list">
    <van-nav-bar :title="$route.meta.title"/>
    <div class="booth">
      <div class="ad-mould">
        广告位
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'punchBack',
  data() {
    return {

    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router':'fetchData'
  },
  methods: {
    fetchData(){
      let data = {
        params:{
          page:1,
          child_id:this.$route.query.id
        }
      }

      axios.get('/book/member/ger_read_sign_list',data).then(res=>{

      })
    }
  }
}
</script>
<style scoped>
.ad-mould{
  width: 100%;
  height: 6.25rem /* 100/16 */;
  background: #fff;
  color: #C0C4CC;
  text-align: center;
  line-height: 6.25rem /* 100/16 */;
  border: .125rem /* 2/16 */ dashed #EBEEF5;
  border-radius: .625rem /* 10/16 */;
}

.booth{
  padding: .625rem /* 10/16 */;
}
</style>
