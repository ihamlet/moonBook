<template>
    <div class="zoom-home">
        <div class="user-card">
            <div class=""></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'zoom-home',
    computed: {
        userData(){
            return this.$store.getters.userDataState
        }
    },
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>

</style>
