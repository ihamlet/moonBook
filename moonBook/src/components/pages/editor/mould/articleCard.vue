<template>
  <div class="article-card">
    <div class="article-item">
      <articleTips @upLoandData='upLoandData'/>
      <articleItem v-if='photo || text' :photo='photo' :text='text'/>
    </div>
  </div>
</template>

<script>
import articleItem from './articleItem'
import articleTips from './articleTips'

export default {
  name: 'article-item',
  components: {
    articleTips,
    articleItem
  },
  data() {
    return {
        sTipsShow: false,
        percent: 0,
        photo:'',
        text:''
    }
  },
  methods: {
      upLoandData(data){
        this.photo = data.photos[0].photo
      }
  }
}
</script>
<style scoped>
</style>
