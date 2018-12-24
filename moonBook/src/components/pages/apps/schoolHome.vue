<template>
    <div class="school-home">
        <div class="">
            
        </div>
    </div>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name:'school',
    computed: {
      ...mapGetters(['userDataState'])
    },
    data () {
        return {
            
        }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getUserData().then(res => {
            if(res.child_id > 0){
              axios.get(`/book/baby/getInfo?child_id=${to.query.id}`).then(res => {
                  vm.childInfo = res.data.data
              })
            }else{
              vm.$router.push({
                name: 'edit-child',
                query: {
                  type: 'add',
                  pageTitle:'添加宝贝'
                }
              })
            }
        })
    })
  },
}
</script>
<style scoped>

</style>
