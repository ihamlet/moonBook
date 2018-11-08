<template>
    <div class="error-404">
        <div class="content">
            <h1 class="title">404</h1>
            <img src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/404.png" alt="404" />
            <div class="error-text">工程师正在抓紧施工...</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'not-found'
}
</script>
<style scoped>
.error-404{
    width: 100%;
    height: 100vh;
    background: #fff;
}

h1{
    height: 6.25rem /* 100/16 */;
    line-height: 6.25rem /* 100/16 */;
    text-align: center;
}

.content{
    width: 18.75rem /* 300/16 */;
    margin: 0 auto;
    padding: 3.125rem /* 50/16 */ 0;
}

.error-text{
    text-align: center;
    margin-top: 1.25rem /* 20/16 */;
}
</style>
