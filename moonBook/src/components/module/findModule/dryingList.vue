<template>
    <div class="drying-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <van-cell>
                        <div class="content">
                            <div class="user-card flex flex-align">
                                <div class="avatar">
                                    <img :src="item.avatar" :alt="item.name">
                                </div>
                                <div class="info">
                                    <div class="name">
                                        {{item.name}} 
                                        <i class="iconfont vip-masonry" v-if="item.isVip==1&&item.vipType.borrow==7">&#xe611;</i>
                                        <i class="iconfont vip-gold" v-if="item.isVip==1&&item.vipType.borrow==5">&#xe611;</i>
                                        <i class="iconfont vip-ordinary" v-if="item.isVip==1&&item.vipType.borrow==3">&#xe611;</i>     
                                    </div>
                                    <div class="school">
                                        {{item.school.name}}
                                    </div>
                                </div>
                                <div class="date">
                                    <span>{{item.date}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                            </div>
                            <graphic-crad :item='item'/>
                        </div>
                    </van-cell>
                </div>
                <slogan v-if='!loading'/>
            </div>
        </van-list>
    </div>
</template>
<script>
import axios from 'axios'
import slogan from './../slogan'
import graphicCrad from './../list/graphicCrad'

export default {
    name:'drying-list',
    components: {
        slogan,
        graphicCrad
    },
    data () {
        return {
            DetailsId:0,
            pictureShow:false,
            praiseShow:false,
            list: [],
            item:'',
            loading: false,
            finished: false
        }
    },
    methods: {
        onLoad() {
            axios.get('/api/drying').then(res=>{
                setTimeout(() => {
                    let array = res.data.dryingData.dryingList
                    for (let i = 0; i < 5; i++) {
                        this.list.push( array[this.list.length] )
                    }
                    this.loading = false
                    if (this.list.length >= 25) {
                        this.finished = true;
                    }
                },500)
            })
        }
    }
}
</script>
<style scoped>
.list{
    padding-bottom: 10rem /* 160/16 */;
}

.item{
    margin-bottom: .3125rem /* 5/16 */;
}

.avatar{
    margin-right: .625rem /* 10/16 */;
}

.name{
    font-size: 1rem /* 16/16 */;
    color: #303133
}

.avatar img{
    width: 3.5rem /* 56/16 */;
    height: 3.5rem /* 56/16 */;
    border-radius: 50%;
}

.date{
    position: absolute;
    top: 0;
    right: 0;
    font-size: .75rem /* 12/16 */;
    color: #C0C4CC;
}

</style>
