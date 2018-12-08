<template>
    <div class="avatar">
        <img v-if="gender=='boy'" src="./../../assets/img/boy-avatar.png" alt="默认男孩头像" />
        <img v-else src="./../../assets/img/girl-avatar.png" alt="默认男孩头像" />
    </div>
</template>
<script>
export default {
    name:'avatar',
    props: ['gender']
}
</script>
