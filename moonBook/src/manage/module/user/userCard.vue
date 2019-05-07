<template>
    <van-cell>
        <div class="user-card flex flex-align">
            <div class="info flex flex-align">
                <img :src="item.avatar"/>
                <div class="user-info">
                    <div class="name">{{item.name}}</div>
                    <div class="child">{{item.child}} | {{item.relation_name}}</div>
                </div>
            </div>
            <div class="operation-btn flex flex-align">
                <van-button class="pass" size="small" round type="warning" @click="pass">退回</van-button>
                <van-button class="past" size="small" round type="primary" @click="past">通过</van-button>
            </div>
        </div> 
    </van-cell>   
</template>
<script>
export default {
    name:'userCard',
    props: {
        item:{
            type: Object,
            default(){
                return {
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'赵金龙',
                    child: '刘莉莉',
                    relation_name:'爸爸'
                }
            }
        }
    }, 
    methods: {
        pass(){
            console.log('退回')
        },
        past(){
            console.log('通过')
        }
    },
}
</script>
<style scoped>

</style>
