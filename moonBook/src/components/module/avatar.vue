<template>
    <div class="avatar-default" :class="[size,avatarClass]">
        <img v-if="gender==1" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/boy-avatar.png" alt="默认男孩头像" />
        <img v-else src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/girl-avatar.png" alt="默认女孩头像" />
    </div>
</template>
<script>
export default {
    name:'avatar',
    props: ['gender','size','avatarClass']
}
</script>
<style scoped>
.avatar-default img{
    border-radius: 50%;
    width: 5rem /* 80/16 */;
    height: 5rem /* 80/16 */;
}

.avatar-default.medium img{
    width: 4.5rem /* 72/16 */;
    height: 4.5rem /* 72/16 */;
}

.avatar-default.small img{
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
}

.avatar-default.big img{
    width: 6.25rem /* 100/16 */;
    height: 6.25rem /* 100/16 */;
}

.avatar-default.border img{
    border: 0.1875rem /* 3/16 */ solid #fff;
    box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.2);
}
</style>
