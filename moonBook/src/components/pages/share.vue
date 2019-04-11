<template>
  <div class="share">
    <div class="code-number">
      <div class="title">邀请码</div>
      <div>{{$route.query.invite_code}}</div>
    </div>
    <div class="code-img">
        <img class="qr-img" :src="codeImgURL" />
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import QRcode from 'qrcode'

export default {
  name: 'share',
  computed: {

  },
  data() {
    return {
      codeImgURL:''
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
      this.qrcode()
    },
    qrcode() {
      QRcode.toDataURL(this.$route.query.fullPath).then(url => {
        this.codeImgURL = url
      }).catch(err => {
        console.error(err)
      })
    }
  }
}

</script>
<style scoped>
.code-img{
  width: 200px;
  height: 200px;
}

.code-img{
  margin: 0 auto;
}

.code-number{
  text-align: center;
}
</style>
