<template>
  <div class="img-preview flex flex-justify" v-if="imgArray.length > 0">
    <div class="grid" v-for="(item,index) in imgArray" :key="index">
      <img :src="item.thumb" @error="imgError"/>
    </div>
  </div>
  <div class="text-preview" v-line-clamp:20="2" v-else>{{text}}</div>
</template>
<script>
export default {
  name: "show-card",
  props: ["imgList", 'text'],
  computed: {
    imgArray(){
      let array = this.imgList
      let arr = []

      array.forEach(element => {
        if(element != null){
          arr.push(element)
        }
      })

      return arr.slice(0,4)
    }
  },
  methods: {
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.text-preview,
.img-preview {
  position: relative;
}

.badge {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}

.robe,
.img-preview .grid img{
  width: 2.8125rem /* 45/16 */;
  height: 2.8125rem /* 45/16 */;
  border-radius: 0.25rem /* 4/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  z-index: 2;
  object-fit: cover;
}

.robe {
  position: absolute;
  right: -0.3125rem /* 5/16 */;
  top: 0.25rem /* 4/16 */;
  z-index: 1;
}

.img-preview .grid:last-child img{
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}
</style>
