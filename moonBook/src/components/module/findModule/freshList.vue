<template>
    <div class="fresh-list scroll-x">
        <div class="scroll-item" v-for='(item,idx) in list' :key="idx">
            <div class="avatar">
                <img v-lazy="item.user.avatar" :alt="item.user.name">
            </div>
            <div class="name" v-line-clamp:20="1">
                {{item.user.name}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'fresh-list',
    props: ['list']
}
</script>
<style scoped>
.fresh-list{
    padding-left: .625rem /* 10/16 */;
}

.avatar{
    padding: .1875rem /* 3/16 */;
    border: .0625rem /* 1/16 */ solid #DCDFE6;
    border-radius: 50%;
}

.avatar img{
    width: 3.125rem /* 50/16 */;
    height: 3.125rem /* 50/16 */;
    border-radius: 50%;
}

.scroll-item{
    margin-right: .625rem /* 10/16 */;
    width: 3.5rem /* 56/16 */;
    display: inline-grid;
}

.name{
    width: 3.5rem /* 56/16 */;
    font-size: .875rem /* 14/16 */;
    text-align: center;
    margin-top: .3125rem /* 5/16 */;
    white-space: normal;
}
</style>
