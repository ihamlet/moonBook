<template>
    <div class="donate-books">
        <van-tabs>
            <van-tab v-for="(list,index) in tab" :key="index" :title='list.title'>
                
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
    name:'donateBooks',
    data () {
        return {
            tab:[{
                title:'已捐书',
                content:''
            },{
                title:'待审核',
                content:''
            }]
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>

</style>
