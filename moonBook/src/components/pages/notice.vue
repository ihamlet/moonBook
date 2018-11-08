<template>
    <div class="notice page-padding">
        <van-nav-bar :title="$route.meta.title"/>
        <div class="container">
            <message-list :readList='readList'/>
        </div>
        <footer-bar :pageIndex='pageIndex' />
    </div>
</template>
<script>
import footerBar from './../module/footerBar'
import messageList from './../module/message'
import axios from 'axios'

export default {
    name:'notice',
    components: {
        footerBar,
        messageList
    },
    data () {
        return {
            readList:[],
            pageIndex:2
        }
    }
}
</script>
<style scoped>
</style>
