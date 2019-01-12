<template>
  <div class="course">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        {{list}}
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
import slogan from './../module/slogan'

export default {
  name: 'course',
  components: {
    slogan
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          page: this.page,
          sort: 'top',
          portal_name: '首页'
        }
      }

      axios.get('/book/SchoolArticle/getList', data).then(res => {
          let datas = []
          let array = res.data.data
          array.forEach(element => {
            if(element.template_id == 0){
                datas.push(element)
            }  
          })
        
        this.list = datas
          
      })
    }
  }
}
</script>
<style scoped>
.course-item {
  position: relative;
}

.participate {
  width: 6.875rem /* 110/16 */;
  height: 1.25rem /* 20/16 */;
  border: 0.0625rem /* 1/16 */ solid #e6a23c;
  color: #e6a23c;
  display: block;
  text-align: center;
  line-height: 1.25rem /* 20/16 */;
}
</style>
