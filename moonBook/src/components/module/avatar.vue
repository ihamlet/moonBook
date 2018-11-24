<template>
    <div class="avatar">
        <img v-if="gender=='boy'" src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/boy-avatar.png" alt="默认男孩头像" />
        <img v-else src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/girl-avatar.png" alt="默认男孩头像" />
    </div>
</template>
<script>
export default {
    name:'avatar',
    props: ['gender']
}
</script>
