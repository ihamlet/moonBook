<template>
  <div class="write-off">
    <van-nav-bar :title="$route.meta.title" />
    <div class="content">
        <div class="card-head">
            <div class="head">
                <div class="title">阅读月领奖券</div>
                <div class="name">乐高课程卡4课时，价值240元</div>
            </div>
            <div class="info">
                <div class="time"><b>领奖时间</b>2019/03/12-2019/04/12</div>
                <div class="address"><b>领奖地点</b>黄石港区黄石大道786号微美大厦2楼天婴母婴店</div>
            </div>
        </div>
        <div class="code">
            
        </div>
        <div class=""></div>
    </div>
  </div>
</template>
<script>
import QRcode from 'qrcode'

export default {
  name: 'write-off',
  data() {
    return {

    }
  },
  methods: {
    qrcode() {
      let link = `${location.href.replace('/#','/?#')}`
      QRcode.toDataURL(link).then(url => {
        this.codeImgURL = url
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
<style scoped>
.content{
    padding: 10px 20px;
}

.card-head{
    padding: 10px;
    background: linear-gradient(90deg, #ff765c, #ff23b3);
}

.card-head,
.title,
.time,
.address{
    color: #fff;
}

.title{
    height: 46px;
    line-height: 46px;
    font-size: 20px;
}

.head{
    text-align: center;
    margin-bottom: 10px;
}

.code{
    width: 100%;
    height: 200px;
    background: #fff;
}

b{
    margin-right: 10px;
}
</style>
