<template>
  <div class="class-show">
    <van-cell-group class="cell-group">
      <van-cell is-link center @click="show = true">
        <windmill slot="icon" />

        <div class="content flex flex-align flex-justify" slot="title">
          <show-crad :drying="drying" />
        </div>
      </van-cell>
    </van-cell-group>

    <van-popup v-model="show" class="page-popup" position="right">
      <class-zoom @close="show = false" />
    </van-popup>
  </div>
</template>
<script>
  import axios from "axios"
  import windmill from "./../animate/svg/windmill"
  import photoStack from "./../animate/photoStack"
  import classZoom from "./../classZoom"
  import showCrad from "./../card/showCrad"
  export default {
    name: "class-show",
    components: {
      windmill,
      photoStack,
      classZoom,
      showCrad
    },
    data() {
      return {
        drying: "",
        show: false
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      $router: "fetchData"
    },
    methods: {
      fetchData() {
        axios.get("/api/classAticleList").then(res => {
          if (res.data.classAticleList) {
            res.data.classAticleList.forEach((element, i) => {
              if (i == 0) {
                this.drying = element
              }
            })
          }
        })
      }
    }
  }

</script>
<style scoped>
  .content {
    padding: 0 0.625rem
      /* 10/16 */
    ;
  }

</style>
