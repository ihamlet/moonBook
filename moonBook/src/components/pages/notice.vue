<template>
    <div class="notice page-padding">
        <van-nav-bar :title="$route.meta.title" :border='false'/>
        <div class="container">
            <message-list/>
        </div>
    </div>
</template>
<script>
import messageList from './../module/message'

export default {
    name:'notice',
    components: {
        messageList
    }
}
</script>
<style scoped>
</style>
