<template>
    <div class="release">
        <ul class="flex flex-align">
            <li @click="toGraphic('graphic')">
                <i class="iconfont an-0 flipInX animated">&#xe690;</i>
                <span>发布图文</span>
            </li>
            <li>
                <i class="iconfont an-1 flipInX animated">&#xe68a;</i>
                <span>拍摄短视频</span>
            </li>
            <li>
                <i class="iconfont an-2 flipInX animated">&#xe66b;</i>
                <span>发布视频</span>
            </li>
            <li>
                <i class="iconfont an-3 flipInX animated">&#xe7df;</i>
                <span>发布音频</span>
            </li>
           <li>
                <i class="iconfont an-4 flipInX animated">&#xe663;</i>
                 <span>问答</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'release',
    methods: {
        toGraphic(val){
            this.$emit('close',false)
            this.$emit('open',true)
            this.$emit('param',val)
            this.graphicShow = true
        }
    }
}
</script>
<style scoped>
.release::before{
    content: '';
    width:0;
    height:0;
    border-width:0 .3125rem /* 5/16 */ .375rem /* 6/16 */;
    border-style:solid;
    border-color:transparent transparent rgba(0, 0, 0, .72);
    position: absolute;
    top: -.3125rem /* 5/16 */;
    right: .125rem /* 2/16 */;
}

.release{
    position: absolute;
    background: rgba(0, 0, 0, .72);
    width: 20rem /* 320/16 */;
    right: .9375rem /* 15/16 */;
    top: 3.75rem /* 60/16 */;
    border-radius:.625rem /* 10/16 */ .3125rem /* 5/16 */ .625rem /* 10/16 */ .625rem /* 10/16 */;
    padding: .3125rem /* 5/16 */;
    color: #fff;
}

.release ul li{
    display: inline-grid;
    flex: 1;
    text-align: center;
    transform: scale(0.9);
}

.release ul li i.iconfont{
    font-size: 2rem /* 32/16 */;
    margin-bottom: .3125rem /* 5/16 */;
}

.release ul li span{
    font-size: .75rem /* 12/16 */;
    white-space : nowrap; 
}
</style>
