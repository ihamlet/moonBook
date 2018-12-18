<template>
  <div class="img-preview flex flex-justify" v-if="imgList.length > 0">
    <div class="grid" v-if="4 > index" v-for="(item,index) in imgList" :key="index" v-lazy:background-image="item.thumb"></div>
    <div class="robe" v-if="imgList.length > 4">
      <photo-stack />
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
.img-preview .grid {
  width: 3.375rem /* 54/16 */;
  height: 3.375rem /* 54/16 */;
  border-radius: 0.25rem /* 4/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  background-size: cover;
  background-position: 50%;
  z-index: 2;
}

.robe {
  position: absolute;
  right: -0.3125rem /* 5/16 */;
  top: 0.25rem /* 4/16 */;
  z-index: 1;
}

.img-preview .grid:last-child {
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.3);
}
</style>
