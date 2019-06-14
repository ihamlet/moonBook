<template>
    <div class="teacher-list">
        
    </div>    
</template>
<script>
import axios from './../../../components/lib/js/api'

export default {
    name:'teacherList',
    data () {
        return {
            
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
            

            // axios.get('',).then(res=>{

            // })
        }
    },
}
</script>
<style scoped>

</style>
