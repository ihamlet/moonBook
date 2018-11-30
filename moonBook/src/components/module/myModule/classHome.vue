<template>
  <div class="class module-card">
    <van-cell-group v-for="(list,index) in userDataState.childInfo" :key="index">
      <van-cell :title="list.data.name" v-if="index==0" :value="list.class?list.class.name:'选择班级'" is-link center
        @click="toClassHome(list)">
        <div class="icon" slot="icon">
          <i class="iconfont">&#xe802;</i>
        </div>
      </van-cell>
    </van-cell-group>

    <!-- 选择班级 -->
    <van-popup v-model="show" class="page-popup" position="right">
      <add-class :school="schoolState" :babyId="userDataState.childInfo[0].id" @close="show = false" />
    </van-popup>
  </div>
</template>
<script>
import {
  mapGetters
} from "vuex"
import addClass from "./../addClass"

export default {
  name: "class-home",
  components: {
    addClass
  },
  computed: {
    ...mapGetters(["userDataState", "schoolState"])
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    toClassHome(list) {
      if (list.class) {
        this.$router.push({
          name: "class-home",
          query: {
            id: list.id
          }
        });
      } else {
        this.show = true
      }
    }
  }
}
</script>
<style scoped>
  .class {
    overflow: hidden;
  }

  .icon {
    margin-right: 0.625rem/* 10/16 */;
  }

  .icon i.iconfont {
    font-size: 1.5rem/* 24/16 */;
    background-image: linear-gradient(135deg, #795548 10%, #000 100%);
    -webkit-background-clip: text;
    color: transparent;
  }
</style>
