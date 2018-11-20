<template>
    <div class="form-teacher">
        <div class="avatar-uploader">
            <van-uploader :after-read="onRead">
                <div class="prompt" v-if='!childInfo.avatar'>
                    <img v-if="childInfo.gender=='boy'" src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/boy-avatar.png" alt="男孩默认头像">
                    <img v-else src="https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/girl-avatar.png" alt="女孩默认头像">
                    <div class="text">请上传头像</div>
                </div>
                <div class="avatar-preview" v-else>
                    <img :src="childInfo.avatar" alt="女孩默认头像">
                </div>
            </van-uploader>
        </div>
    </div>
</template>
<script>
import { VueCropper }  from 'vue-cropper'

export default {
    name:'teacher',
    props: ['regInfo'],
    components: {
        VueCropper  
    }
}
</script>
<style scoped>

</style>
