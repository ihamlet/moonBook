<template>
    <div class="drying-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index">
                    <van-cell>
                        <div class="content">
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
import graphicCrad from './../card/graphicCrad'

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
</style>
