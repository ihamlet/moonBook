<template>
    <div class="new-book">
        <img class="head-bg" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/newBook.jpg" />
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
              <div class="create-time theme-color" v-if='list.title=="最新"&&timediff(item,itemIndex)'>
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

export default {
    name:'new-book',
    data() {
        return {
            
        }
    },
    computed: {
      ...mapGetters(['userDataState'])  
    },
    created () {
        this.fetchData()
    },
    watch: {
      '$router':'fetchData'  
    },
    methods: {
        fetchData(){
            
        }
    }
}
</script>
<style scoped>
.head-bg{

}
</style>
