<template>
    <div class="notice">
        {{notice}}
    </div>    
</template>
<script>
import axios from './../../lib/js/api'

export default {
    name:'notice',
    props: ['type'],
    data () {
        return {
            notice:''
        }
    },
    watch: {
        '$router':'fetchData'
    },
    created () {
        this.fetchData()
    },
    methods: {
        fetchData(){
            let data = {
                params:{
                    cate:'通知'
                }
            }

            if(this.type == 'banji'){
                data.params.banji_id = this.$route.query.id
            }

            if(this.type == 'school'){
                data.params.school_id = this.$route.query.id
            }

            axios.get('/book/SchoolArticle/getList',data).then(res=>{

            })
        }
    }
}
</script>
<style scoped>

</style>
