<template>
    <div class="avatar-default" :class="[size,avatarClass]">
        <img v-if="gender=='boy'" src="./../../assets/img/boy-avatar.png" alt="默认男孩头像" />
        <img v-else src="./../../assets/img/girl-avatar.png" alt="默认女孩头像" />
    </div>
</template>
<script>
export default {
    name:'avatar',
    props: ['gender','size','avatarClass'],
    created(){
        console.log(this.avatarClass)
    }
}
</script>
<style scoped>
.avatar-default img{
    border-radius: 50%;
    width: 5rem /* 80/16 */;
    height: 5rem /* 80/16 */;
}

.avatar-default.mini img{
    width: 2.625rem /* 42/16 */;
    height: 2.625rem /* 42/16 */;
}

.avatar-default.small img{
    width: 3.75rem /* 60/16 */;
    height: 3.75rem /* 60/16 */;
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
