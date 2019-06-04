<template>
    <div class="read-list">
        <div class="scroll-x">
            <div class="item" v-for='(item,index) in list' :key="index" @click="toZoom(item)">
                <div class="avatar">
                    <img :src="item.avatar" v-http2https @error='imgError'/>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name:'readList',
    props:['list'],
    methods: {
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        },
        toZoom(item){
            this.$router.push({
                name:'zoom',
                query:{
                    id:item.user_id
                }
            })
        }
    }
}
</script>
<style scoped>
.avatar{
    margin-right: 10px;
}

.avatar,
.avatar img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
</style>
