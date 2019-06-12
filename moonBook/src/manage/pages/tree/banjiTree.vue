<template>
    <div class="banji-tree">
        
    </div>    
</template>
<script>
import axios from './../../../components/lib/js/api'

export default {
    name:'banjiTree',
    data() {
        return {
            banjiList:[]
        }
    },
    computed: {
        items(){

        }
    },
    created () {
      this.fetchData()  
    },
    watch: {
      '$router':'fetchData'  
    },
    methods: {
        fetchData(){
            let data = {
                params:{
                    ...this.$route.query,
                    is_all:1
                }
            }

            axios.get('/SchoolManage/banji/getList',data).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.banjiList = res.data.data
                    break
                    default:
                        this.$toast(res.data.msg)
                }
            })
        }
    },
}
</script>
<style scoped>

</style>
