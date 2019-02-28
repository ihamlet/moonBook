<template>
  <div class="share-box">
    <van-row class="svg-list">
      <van-col span="12">
        <div class='btn' @click="share">
          <svg class="icon wechat" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3129">
            <path d="M1024 636.032c0-141.888-141.866667-257.429333-301.461333-257.429333-169.088 0-301.866667 115.541333-301.866667 257.429333 0 142.250667 132.778667 257.386667 301.866667 257.386667 35.370667 0 71.146667-9.024 106.496-17.642667l97.450667 53.418667-26.666667-88.789333C970.922667 786.965333 1024 715.84 1024 636.032zM624.618667 591.616c-17.642667 0-35.328-17.664-35.328-35.392 0-17.621333 17.685333-35.328 35.328-35.328 26.752 0 44.458667 17.706667 44.458667 35.328C669.077333 573.952 651.370667 591.616 624.618667 591.616zM820.010667 591.616c-17.664 0-35.306667-17.664-35.306667-35.392 0-17.621333 17.642667-35.328 35.306667-35.328 26.709333 0 44.416 17.706667 44.416 35.328C864.426667 573.952 846.293333 591.616 820.010667 591.616z"
              fill="#30CE39" p-id="3130"></path>
            <path d="M693.248 347.242667c11.626667 0 23.296 0.810667 34.901333 2.005333-31.274667-146.133333-187.392-254.464-365.674667-254.464C163.370667 94.784 0 230.442667 0 403.029333c0 99.562667 54.208 181.418667 144.917333 244.864L108.8 757.034667l126.826667-63.786667c45.354667 8.810667 81.877333 18.069333 126.848 18.069333 11.221333 0 22.506667-0.405333 33.749333-1.557333-7.232-24.128-11.242667-49.749333-11.242667-75.882667C384.96 475.690667 521.066667 347.242667 693.248 347.242667zM498.133333 248.896c27.285333 0 45.333333 18.069333 45.333333 45.376 0 27.264-18.069333 45.333333-45.333333 45.333333-27.306667 0-54.570667-18.069333-54.570667-45.333333C443.968 266.944 471.210667 248.896 498.133333 248.896zM244.458667 339.562667c-27.306667 0-54.570667-18.048-54.570667-45.333333 0-27.306667 27.285333-45.354667 54.570667-45.354667 27.328 0 45.397333 18.069333 45.397333 45.354667C289.834667 321.130667 271.786667 339.562667 244.458667 339.562667z"
              fill="#30CE39" p-id="3131"></path>
          </svg>
          <div class="text">分享到微信</div>
        </div>
      </van-col>
      <van-col span="12">
        <div class="btn" @click="childShow = true">
          <svg t="1551174489120" class="icon zhuanfa" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3124">
            <path d="M878.4 575.3h-68.5c-14.6 0-26.5 11.9-26.5 26.5v182.8H240V671.9c0-14.6-11.9-26.5-26.5-26.5H145c-14.6 0-26.5 11.9-26.5 26.5v207.6c0 9.1 4.6 17.1 11.5 21.8l0.1 0.1 0.6 0.3c4.1 2.6 9 4.2 14.2 4.2h733.4c0.9 0 1.8 0 2.7-0.1 3.4-0.3 6.7-1.4 9.6-2.9 0.1-0.1 0.2-0.1 0.3-0.2 0.3-0.2 0.7-0.4 1-0.6 0.4-0.2 0.8-0.5 1.2-0.7l0.1-0.1c7-4.8 11.6-12.8 11.6-21.9V601.8c0-14.6-11.8-26.5-26.4-26.5z"
              fill="#70c6f2" p-id="3125"></path>
            <path d="M899.1 321.7v-0.1l-0.5-0.4c-1.4-1.5-3-2.8-4.7-3.9L664.1 125.9c-4.6-5.4-11.4-8.9-19.1-8.9-13.8 0-25 11.2-25 25h-0.1v94.7C134 288.3 163.9 614 163.9 614c97.3-173.3 374.3-178.8 456-176.4v97.2h0.1c0 13.8 11.2 25 25 25 7.2 0 13.6-3 18.2-7.9l230.7-192.5c7-4.4 11.6-12.2 11.6-21.1 0-6.4-2.4-12.2-6.4-16.6z"
              fill="#ffcf10" p-id="3126" data-spm-anchor-id="a313x.7781069.0.i0"></path>
          </svg>
          <div class="text">收录</div>
        </div>
      </van-col>
    </van-row>

    <van-popup v-model="childShow" position='bottom'  get-container='#app'>
      <van-picker show-toolbar :columns="columns" @change="onChange" title='收录到' @confirm='inclusion'/>
    </van-popup>

    <van-popup class="page-popup-layer" position="bottom" v-model="show" get-container='#app'>
      <topic-list @close='show = false' @select='selectTag' />
    </van-popup>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
import axios from './../../lib/js/api'
import topicList from './../../module/release/topicList'

export default {
  name: 'share',
  props: ['postId'],
  components: {
    topicList
  },
  computed: {
    columns(){
      let array = []
      if(this.children){
        this.children.forEach(element => {
          array.push(element.name)
        })
      }
      return array
    }
  },
  data(){
    return {
      children:'',
      childShow:false,
      columnIndex:0,
      cateId:'',
      show:false,
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData(){
      this.getUserData().then(res => {
        axios.get(`/book/baby/getList?sort=old&user_id=${res.id}`).then(res => {
          if(res.data.status == 1){
            this.children = res.data.data
          }
        })
      })
    },
    hide() {
      this.$emit('hide')
    },
    share(){
      Cookies.set('shareLink', location.href)
      location.href = `/book/weixin/share?back_url=${encodeURIComponent(location.href)}&id=${this.$route.query.id}&type=文章`
      this.hide()
    },
    onChange(picker, values, columnIndex){
      this.columnIndex = columnIndex
    },
    inclusion(){
      this.childShow = false
      this.show = true
    },
    selectTag(tag) {
      this.cateId = tag.cate_id
    }
  }
}
</script>
<style scoped>
.svg-list {
  padding: 1.25rem /* 20/16 */ 0;
}

.svg-list .btn {
  font-size: 2.25rem /* 36/16 */;
  text-align: center;
  margin: 0 auto;
}

.svg-list .btn svg {
  margin: 0.3125rem /* 5/16 */ auto;
}

.svg-list .btn .text {
  font-size: 0.875rem /* 14/16 */;
}
</style>
