<template>
  <div class="family-card">
    <div class="family">
      <div class="family-list flex flex-align" slot="title">
        <div class="flex flex-align">
          <div class="avatar" v-for='(item,index) in list' :key="index" @click="toDialog">
            <img :src="item.avatar" v-if='index < 6' v-http2https/>
          </div>
        </div>
        <div class="invite">
          <van-button plain type="primary" class="theme-plain" size="small" round @click="toFamily">+ 成员</van-button>
        </div>
      </div>
    </div>
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
      let wmLifeGetBabyParent = '/book/babyParent/getList'

      let data = {
        params: {
          child_id: this.$route.query.id,
          is_close: 0
        }
      }

      axios.get(wmLifeGetBabyParent, data).then(res => {
        switch(res.data.status){
          case 1:
            this.list = res.data.data
          break
        }
      })
    },
    toFamily() {
      this.$router.push({
        name: 'add-family',
        query: {
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    toDialog() {
      this.$router.push({
        name: 'dialog',
        query: {
          title: '家庭群聊',
          id: this.$route.query.id
        }
      })
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
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}

.family-list {
  justify-content: space-between;
}

.family-card{
  padding: .625rem /* 10/16 */;
}
</style>
<style>
.van-cell__title.family {
  flex: 3;
}
</style>

