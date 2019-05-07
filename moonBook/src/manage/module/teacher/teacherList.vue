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
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
                    name:'赵金龙',
                    office: '班主任',
                    tell:'18772293253'
                },{
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
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
