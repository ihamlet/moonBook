<template>
  <div class="module-card">
    <van-cell is-link title-class='family' :value="count > 0? `${count}位待审核`:'邀请家庭成员'" center size='large' @click="toFamily">
      <div class="icon" slot="icon">
        <i class="iconfont">&#xe6a3;</i>
      </div>
      <div class="family-list" slot="title">
        <div class="flex flex-align">
          <div class="avatar" v-for='(item,index) in list' :key="index" v-if='index < 5'>
            <img :src="item.avatar" />
          </div>
        </div>
      </div>
    </van-cell>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import { removeArray } from './../../lib/js/util'

export default {
  name: 'family',
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      list: [],
      count: 0
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get(`/book/babyParent/getList?child_id=${this.$route.query.id}`).then(res => {
        this.list = res.data.data
      })
      axios.get(`/book/babyParent/getList?child_id=${this.$route.query.id}&is_close=1`).then(res => {
        let array = res.data.data

        array.forEach((element, i) => {
          if (this.userDataState.id == element.parent_id) {
            array.splice(i, 1)
          }
        })

        this.count = array.length
      })
    },
    toFamily() {
      if (this.count > 0) {
        this.$router.push({
          name: 'verify-list',
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'add-family',
          query: {
            id: this.$route.query.id
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.module-card {
  overflow: hidden;
}

.icon i.iconfont {
  font-size: 1.625rem /* 26/16 */;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.icon {
  margin-right: 0.9375rem /* 15/16 */;
}

.avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}
</style>
<style>
.van-cell__title.family {
  flex: 2;
}
</style>

