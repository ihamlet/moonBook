<template>
  <div class="img-preview flex flex-justify" v-if="imgList.length > 0">
    <div class="grid" v-for="(item,index) in imgArray" :key="index">
      <img :src="item.thumb" />
    </div>
    
    <div class="badge" v-if="imgList.length > 4">{{imgList.length}}</div>
  </div>
  <div class="text-preview" v-line-clamp:20="2" v-else>{{text}}</div>
</template>
<script>
import axios from './../../lib/js/api'
import photoStack from "./../animate/photoStack"
export default {
  name: "show-card",
  props: ["imgList", 'text'],
  components: {
    photoStack
  },
  computed: {
    imgArray(){
      let array = this.imgList
      let arr = []

      array.forEach((element,i) => {
        if(element != null){
          arr.push(element)
        }
      })

      return arr.slice(0,4)
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
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.3);
}
</style>
