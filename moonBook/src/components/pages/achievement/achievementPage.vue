<template>
    <div class="achievement-page">
      <IconMedal :level="level"/>
      <van-cell>
          <van-row>
            <van-col span="6" v-for='(item,index) in medalList' :key="index">
                <div class="icon flex flex-justify">
                    <IconMedal :animate='level >= index+1?1:0' :gray='level >= index+1?false:true' :level="index+1"/>
                </div>
                <div class="name">{{item.name}}</div>
            </van-col>
          </van-row>
      </van-cell>
    </div>
</template>
<script>
import axios from './../../lib/js/api'
import { medalLevel, medal } from './../../lib/js/speech'
import IconMedal from './../../module/animate/medal'

export default {
    name:'achievement',
    components:{
        IconMedal
    },
    computed: {
        level(){
            let num = medalLevel(this.$route.query.sign_days).pop().level
            return num
        }
    },
    data() {
        return {
            medalList: medal
        }
    },
    // created() {
    //     this.fetchData()
    // },
    // watch: {
    //   '$router':'fetchData'  
    // },
    // methods: {
    //     fetchData(){

    //     }
    // }
}
</script>
<style scoped>
.icon{
    margin: 5px auto;
}

.name{
    text-align: center;
}
</style>
