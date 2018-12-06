<template>
<<<<<<< HEAD
    <div class="drying-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index" @click="onItemClick(item.post_id)">
                    <van-cell>
                        <div class="content">
                            <graphic-crad :item='item'/>
                        </div>
                    </van-cell>
                </div>
                <slogan v-if='!loading'/>
=======
  <div class="drying-list">
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <div class="item" v-for="(item,index) in list" :key="index">
          <van-cell>
            <div class="content">
              <graphic-crad :item="item" />
>>>>>>> master
            </div>
          </van-cell>
        </div>
      </van-pull-refresh>
    </van-list>
  </div>
</template>
<script>
<<<<<<< HEAD
import axios from '@/fetch/api'
=======
import axios from 'axios'
import { mapGetters } from 'vuex'
>>>>>>> master
import slogan from './../slogan'
import graphicCrad from './../card/graphicCrad'

export default {
  name: 'drying-list',
  components: {
    slogan,
    graphicCrad
  },
  props: ['sort'],
  computed: {
    ...mapGetters(['userToken'])
  },
  data() {
    return {
      DetailsId: 0,
      pictureShow: false,
      praiseShow: false,
      list: [],
      item: '',
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    getList() {
      return axios
        .get(
          `/book/SchoolArticle/getList?page=${this.page}&token=${
          this.userToken
          }&sort=${this.sort}`
        )
        .then(res => {
          this.page++
          let datas = []
          res.data.data.forEach(element => {
            datas.push(element)
          })

          this.list = this.list.concat(datas)
          this.loading = false

          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        })
    },
<<<<<<< HEAD
    data () {
        return {
            DetailsId:0,
            pictureShow:false,
            praiseShow:false,
            list: [],
            item:'',
            loading: false,
            finished: false,
            p: 1,
            limit: 20
        }
    },
    methods: {
        onLoad() {
            const url = '/book/SchoolArticle/getList';
            const params = {
                p: this.p,
                limit: this.limit
            }
            axios.get(url, params).then((res) => {
                console.log('res', res);
                if(res.data && res.data.length) {
                    this.list = this.list.concat(res.data);
                }

                if(!res.data || res.data.length < this.limit) {
                    this.finished = true;
                }
            });
        },
        onItemClick(id) {
            location.href = '/book/SchoolArticle/detail/id/' + id + '.html';
        }
=======
    onLoad() {
      this.getList()
    },
    onRefresh() {
      this.page = 1
      this.getList().then(res => {
        this.loading = false
      })
>>>>>>> master
    }
  }
}
</script>
<style scoped>
.item {
  margin-bottom: 0.3125rem /* 5/16 */;
}
</style>
