<template>
    <div class="notice page-padding">
        <van-nav-bar  @click-left="onClickLeft" left-text="个人中心"  left-arrow :title="$route.meta.title" />
        <div class="container">
            <message-list :readList='readList'/>
        </div>
    </div>
</template>
<script>
import messageList from './../module/message'
import axios from 'axios'

export default {
    name:'notice',
    components: {
        messageList
    },
    data () {
        return {
            readList:[]
        }
    },
    methods: {
        onClickLeft(){
            this.$router.push({
                name:'my'
            })
        }
    }
}
</script>
<style scoped>
</style>
