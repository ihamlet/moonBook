<template>
  <div class="module-card">
    <van-cell-group>
      <van-cell :value="formatBanjiTitle(selectPrompt.prompt)" is-link center @click="toClassHome">
        <div class="icon" slot="icon">
          <i class="iconfont">&#xe802;</i>
        </div>
        <div class="title flex flex-align" slot="title">
          <div class="avatar">
            <img :src="children.avatar" :alt="children.child_name" v-http2https/>
          </div>
          {{children.name}}
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { format } from './../../lib/js/util'
import { newBanjiTitle } from './../../lib/js/mixin'
import { mapGetters } from 'vuex'

export default {
  name: "class-home",
  props: ['children'],
  mixins: [ newBanjiTitle ],
  computed: {
    ...mapGetters(['userDataState']),
    selectPrompt() {
      if (this.children.school_id == 0) {
        return {
          prompt: '请选择学校班级',
          type: 0
        }
      } else if (this.children.banji_id == 0) {
        return {
          prompt: '请选择班级',
          type: 1
        }
      } else {
        return {
          prompt: this.children.banji_name,
          type: 2
        }
      }
    }
  },
  data() {
    return {
      showSchool: false,
      showClass: false,
      school: ''
    }
  },
  methods: {
    toClassHome() {
      switch (this.selectPrompt.type) {
        case 0:
          this.$router.push({
            name: 'edit-school',
            query: {
              id: this.children.id
            }
          })
          break
        case 1:{
          let year = format(new Date(),'yyyy-MM-dd')

          this.$router.push({
            name: 'edit-class',
            query: {
              id: this.children.id,
              school_id: this.children.school_id,
              birthday: year,
              school_name: this.userDataState.school_name
            }
          })
          break
        }
        case 2:
          this.$router.push({
            name: "class-home",
            query: {
              id: this.children.banji_id
            }
          })
          break
      }
    },
    // formatBanjiTitle(text) {
    //   if (text && text.indexOf('班') == -1) {
    //     return text + '班'
    //   } else {
    //     let arr = text.split('')
    //     let newArr = [...new Set(arr)]
    //     return newArr.join('')
    //   }
    // }
  }
}
</script>
<style scoped>
.module-card {
  overflow: hidden;
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}

.icon i.iconfont {
  font-size: 1.25rem /* 20/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.3125rem /* 5/16 */;
}
</style>
