<template>
    <div class="notice page-padding">
        <van-nav-bar  @click-left="onClickLeft" :left-text="$route.query.back?'返回':'我的'"  left-arrow :title="$route.meta.title" />
        <div class="container">
            <message-list :readList='readList'/>
        </div>
    </div>
</template>
<script>
import axios from './../lib/js/api'
import messageList from './../module/message'

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
                name: this.$route.query.back?this.$route.query.back:'my-home'
            })
        }
    }
}
</script>
<style scoped>
</style>
