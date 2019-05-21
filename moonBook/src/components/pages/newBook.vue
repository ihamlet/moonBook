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
        }
    },
    computed: {
      ...mapGetters(['userDataState'])  
    },
    methods: {
        onLoad(){
            
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
