<template>
    <div class="avatar" :class="[$route.query.type?'big':'']">
        <img v-if="gender=='boy'" src="./../../assets/img/boy-avatar.png" alt="默认男孩头像" />
        <img v-else src="./../../assets/img/girl-avatar.png" alt="默认男孩头像" />
    </div>
</template>
<script>
export default {
    name:'avatar',
    props: ['gender'],
    
}
</script>
<style scoped>
.avatar.big img,
.avatar img{
    border-radius: 50%;
}
.avatar img{
    width: 3.75rem /* 60/16 */;
    height: 3.75rem /* 60/16 */;
}

.avatar.big img{
    width: 6.25rem /* 100/16 */;
    height: 6.25rem /* 100/16 */;
}
</style>
