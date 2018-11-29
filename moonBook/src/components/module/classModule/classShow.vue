<template>
    <div class="class-show">
        <van-cell value="班级风采" is-link center>
            <windmill slot="icon"/>
        </van-cell>
    </div>
</template>
<script>
import windmill from './../animate/svg/windmill'

export default {
    name:'class-show',
    components: {
      windmill  
    },
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>

</style>
