<template>
  <div class="zone">
    <div class="module-card">
      <van-cell-group class="cell-group">
        <van-cell
          class="cell"
          center
          is-link
          to="./zoom"
        >
          <span
            class="icon"
            slot="icon"
          >
            <i class="iconfont">&#xe606;</i>
          </span>
          <div
            class="content flex flex-align flex-justify"
            slot="title"
          >
            <show-card
              :imgList="userDataState.dryingList[0].media.imgList"
              :text='userDataState.dryingList[0].text'
            />
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import showCard from "./../card/showCrad";
import { mapGetters } from "vuex";
export default {
  name: "zone",
  components: {
    showCard
  },
  computed: {
    ...mapGetters(["userDataState"])
  }
};
</script>
<style scoped>
.cell.van-cell {
  line-height: normal;
}

.cell {
  height: 5rem /* 80/16 */;
}

.cell-group {
  border-radius: 0.625rem /* 10/16 */;
  overflow: hidden;
}

.icon i.iconfont {
  font-size: 1.625rem /* 26/16 */;
  background-image: linear-gradient(135deg, #fdeb71 10%, #f8d800 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}
</style>
