<template>
    <div class="notice page-padding">
        <van-nav-bar :title="$route.meta.title"/>
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
    }
}
</script>
<style scoped>
</style>
