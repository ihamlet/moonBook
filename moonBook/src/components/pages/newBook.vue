<template>
    <div class="new-book">
        <img class="head-bg" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/newBook.jpg" />
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <van-cell v-for="(item,index) in list" :key="index">
              <div class="create-time theme-color">
                {{getTimeAgo(item.create_time)}}
              </div>
              <bookCard :item='item' :type='list.title' />
            </van-cell>
          </van-list>
        </van-pull-refresh> -->
    </div>    
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters } from 'vuex'
import bookCard from './../module/card/bookCard'

export default {
    name:'new-book',
    components:{
        bookCard
    },
    data() {
        return {
            loading: false,
            finished: false,
            page:1,
            list:[]
        }
    },
    computed: {
      ...mapGetters(['userDataState'])  
    },
    methods: {
        onLoad(){
            let data = {
                params:{
                    sort: 'new',
                    start_time: Date.parse(new Date()) - 86400*7000
                }
            }

            axios.get('/book/SchoolShelfBook/getList',data).then(res=>{
                switch (res.data.status) {
                case 1:
                    if (this.page == 1) {
                        this.list = res.data.data
                    } else {
                        this.list = this.list.concat(res.data.data)
                    }
                    this.loading = false
                    this.page++
                    if (this.list.length >= res.data.count) {
                        this.finished = true
                    }
                    break
                case 0:
                    this.page = 1
                    this.loading = false
                    this.finished = true
                    this.list = []
                    break
                }
            })
        }
    }
}
</script>
<style scoped>
.head-bg{
    position: fixed;
    top: 0;
}
</style>
