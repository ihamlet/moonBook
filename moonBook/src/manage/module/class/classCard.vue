<template>
    <div>
        <van-cell-group>
            <van-cell v-for="(item,index) in list" :key="index" :to="item.urls">
                <div class="class-list">
                    <div class="class-left">
                        <div class="left-pic"><img :src="item.picimg"></div>
                        <div>
                            <div class="title-text">{{item.classname}}</div>
                            <div class="title-bz">{{item.teachername}}丨{{item.number}}位学员丨{{item.school}}</div>
                        </div>
                    </div>
                    <div><van-icon name="arrow" /></div>
                </div>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name:'classCard',
    props: ['list'],
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.class-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
}
.class-left{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.left-pic{
    margin-right: 10px;
}
.left-pic img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.title-text{
    font-size: 16px;
    font-weight: bold;
    color: #333;
}
.title-bz{
    font-size: 14px;
    color: #999;
}
</style>

