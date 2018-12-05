<template>
    <div class="comment-list">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item">
                    <comment-card />
            </van-cell>
        </van-list>
    </div>
</template>
<script>
import commentCard from './../module/card/commentCrad'

export default {
  name: 'comment-card',
  components: {
    commentCard
  },
  data() {
    return {

    }
  }
}
</script>
<style scoped>
</style>

