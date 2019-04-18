<template>
  <div class="punch-speed">
    <van-nav-bar title="21天打卡奖品" :border='false'/>
    <div class="baby-card">
      <van-cell>
        <div class="info-card flex flex-align">
          <div class="child-info flex flex-align">
            <div class="avatar">
              <img :src="childInfo.avatar" />
            </div>
            <div class="name">
              {{childInfo.name}}
            </div>
          </div>
          <div class="days">
            {{childInfo.sign_days}}/21天
          </div>
        </div>

        <div class="label">
            完成21天打卡即可获取奖品
        </div>
      </van-cell>

    </div>
    <div class="list">

    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'punch-speed',
  data() {
    return {
      childInfo: ''
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
      let data = {
        params: {
          child_id: this.$route.query.id
        }
      }
      axios.get('/book/baby/getInfo', data).then(res => {
        if (res.data.status == 1) {
          this.childInfo = res.data.data
        }
      })
    }
  }
}
</script>
<style scoped>
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar {
  margin-right: 10px;
}

.info-card {
  justify-content: space-between;
}

.days {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(90deg, #FF765C,#FF23B3);
    -webkit-background-clip: text;
    color: transparent;
}

.name {
  font-size: 17px;
}

.label{
    text-align: right;
}
</style>
