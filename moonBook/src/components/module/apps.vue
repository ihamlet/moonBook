<template>
    <div class="apps">
        <div class="app-list flex">
            <div class="app-item" v-for='(item,index) in appList' :key="index">
                <div class="icon iconfont" :class="item.iconClass"></div>
                <div class="app-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'apps',
    data () {
        return {
            appList:[{
                iconClass:'icon-school',
                name:'学校主页'
            },{
                iconClass:'icon-story',
                name:'讲故事'
            },{
                iconClass:'icon-zoom',
                name:'爸妈专区'
            },{
                iconClass:'icon-article',
                name:'教育头条'
            }]
        }
    }
}
</script>
<style scoped>
.icon-school::before{
    content: '\e636';
    background: linear-gradient(127deg, #FFEB3B,#FF9800);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .375rem /* 6/16 */ rgba(255, 152, 0, 0.3);
}

.icon-story::before{
    content: '\e7ad';
    background: linear-gradient(127deg, #FF9800,#E91E63);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .375rem /* 6/16 */ rgba(233, 30, 99, 0.3);
}

.icon-zoom::before{
    content: '\e64d';
    background: linear-gradient(127deg, #CDDC39,#4CAF50);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .375rem /* 6/16 */ rgba(76, 175, 80, 0.3);
}

.icon-article::before{
    content: '\e63f';
    background: linear-gradient(127deg, #03A9F4,#673AB7);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .375rem /* 6/16 */ rgba(103, 58, 183, 0.3);
}

.app-item{
    flex: 1;
    text-align: center;
}

.icon.iconfont{
    font-size: 2rem /* 32/16 */;
}

.app-list{
    padding: .625rem /* 10/16 */;
}

.app-name{
    font-size: .8125rem /* 13/16 */;
    text-align: center;
    color: #303133;
}
</style>
