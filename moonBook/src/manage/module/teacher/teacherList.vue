<template>
    <div class="list">
        <van-cell v-for='(item,index) in teacher' :key="index">
            <div class="teacher-card flex flex-align">
                <div class="info flex flex-align">
                    <div class="avatar">
                        <img :src="item.avatar" />
                        <van-tag class="teacher-type" type="primary" round :color='index == 0?"#F56C6C":"#E6A23C"'>{{index == 0?'主':'管'}}</van-tag>
                    </div>
                    <div class="teacher-info">
                        <div class="name">{{item.name}}</div>
                        <div class="office">{{item.office}}</div>
                    </div>
                </div>
                <div class="tell">
                    <i class="iconfont">&#xe66a;</i>
                </div>
            </div>
        </van-cell>
    </div>    
</template>
<script>
export default {
    name:'teacherList',
    props:{
        teacher:{
            type:Array,
            default(){
                return [{
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'赵金龙',
                    office: '班主任',
                    tell:'18772293253'
                },{
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'赵金龙',
                    office: '带班老师',
                    tell:'18772293253'
                }]
            }
        }
    }
}
</script>
<style scoped>

</style>
