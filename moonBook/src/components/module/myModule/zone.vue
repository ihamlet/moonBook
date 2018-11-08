<template>
    <div class="zone">
        <div class="module-card">
            <van-cell-group class="cell-group">
            <van-cell class="cell"  value='个人主页' center is-link>
                <div slot="title">
                    <span class="icon">
                        <i class="iconfont">&#xe606;</i>
                    </span>
                </div>
             </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
export default {
    name:'zone',
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>
.cell.van-cell{
    line-height: normal
}

.cell{
    height: 5rem /* 80/16 */;
}

.cell-group{
    border-radius: .625rem /* 10/16 */;
    overflow: hidden;
}

.icon i.iconfont{
    font-size: 1.625rem /* 26/16 */;
    background-image: linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%);
    -webkit-background-clip: text;
    color: transparent;
}
</style>
