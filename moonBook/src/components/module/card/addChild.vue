<template>
    <div class="add-child">
        <div class="box flex flex-align">
            <i class="iconfont close-icon" @click="$emit('close')">&#xe675;</i>

            <div class="brand flex flex-align">
                <img class="logo" src="/Public/lib/bookshelf/img/logo.png" />
                <div class="brand-info">
                    <div class="app-name">阅亮书架</div>
                    <div class="slogan-text">{{$store.state.slogan}}</div>
                </div>
            </div>
            <div class="btn-add">
                <van-button class="theme-btn" square type="primary" size="large" @click="addChild">添加宝贝</van-button>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name:'add-child',
    methods: {
        addChild(){
            this.$router.push({
                name:'edit-child',
                query:{
                    type:'register',
                    back: this.$route.name
                }
            })
        }
    }
}
</script>
<style scoped>
.add-child{
    width: 100%;
    height: 50px;
    background: #232326;
}

.theme-btn{
    padding: 0 30px;
}

.box{
    justify-content: space-between;
}

.app-name{
    color: #fff;
}

.brand{
    font-size: 13px;
    margin-left: 50px;
}

.slogan-text{
    color: #909399;
}

.logo{
    width: 34px;
    height: 34px;
    margin-right: 5px;
}

.close-icon{
    position: absolute;
    left: 15px;
    color: #C0C4CC;
}
</style>
