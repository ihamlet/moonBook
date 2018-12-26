<template>
    <div class="apps module-card flex flex-align" :class="type">
        <div class="icon" v-for='(list,index) in appsList' :key="index">
            <div class="iconfont" :class="list.iconClass"></div>
            <div class="name">{{list.name}}</div>
        </div>
    </div>  
</template>
<script>
export default {
    name:'apps',
    props: ['appsList','type']
}
</script>
<style scoped>
.icon-huanshu::before{ content: '\e697' }
.icon-saomadingwei::before { content: '\e678'}
.icon-shuju::before { content: '\e61d'}
.icon-quanxian::before { content: '\e698'}
.icon-tongxunlu::before { content: '\e7ab'}
.icon-guoxue::before { content: '\e61a'}
.icon-jianggushi::before { content: '\e638'}
.icon-tongxunlu::before { content: '\e6d3'}
.icon-liuyanbo::before { content: '\e61c'}
.icon-jiaoliu::before { content: '\e6af'}

.apps{
    padding: .625rem /* 10/16 */ 0;
    background: #fff;
}

.apps .icon{
    flex: 1;
    text-align: center;
}

.apps .icon .iconfont{
    font-size: 1.75rem /* 28/16 */;
    background: linear-gradient(145deg, #FFEB3B,#FF5722);
    -webkit-background-clip: text;
    color: transparent;
}

.classHome.apps .icon .iconfont{
    background: linear-gradient(145deg, #51ebff,#2196F3);
    -webkit-background-clip: text;
    color: transparent;
}

.apps .icon .name{
    font-size: small;
}
</style>
