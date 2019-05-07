<template>
  <div class="punch-share">
    <div class="img-poster">
        <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-share.jpg" />
        <div class="content">
            <div class="day">{{$route.query.day}}</div>
            <div class="saying">读书之法，在循序渐进，熟读而精思。</div>
        </div>
    </div>
    <div class="share-content">
        <div class="share-data">
            
        </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'punch-share',
  data() {
    return {
        childInfo:''
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
            params: {
                child_id: this.$route.query.child_id
            }
        }
        axios.get('/book/baby/getInfo', data).then(res => {
            switch (res.data.status) {
            case 1:
                this.childInfo = res.data.data
                break
            }
        })
      }
  }
}
</script>
<style scoped>
.img-poster{
    width: 100%;
    height: 60vh;
    overflow: hidden;
    position: relative;
}

.img-poster img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    bottom: 0;
}

.share-content{
    width: 100%;
    height: 40vh;
}

.share-data{
    width: 90%;
    height: 120px;
    background: #fff;
    margin: -15px auto 0;
    position: relative;
    z-index: 1;
    border-radius: 8px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, .1)
}

.content{
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    padding: 10px 0 20px;
}

.content .day{
    margin-bottom: 10px;
}
</style>
