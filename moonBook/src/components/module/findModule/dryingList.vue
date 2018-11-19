<template>
    <div class="drying-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list">
                <div class="item" v-for="(item,index) in list" :key="index" @click="onItemClick(item.post_id)">
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
import axios from '@/fetch/api'
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
            finished: false,
            p: 1,
            limit: 20
        }
    },
    methods: {
        onLoad() {
            const url = '/book/SchoolArticle/getList';
            const params = {
                p: this.p,
                limit: this.limit
            }
            axios.get(url, params).then((res) => {
                console.log('res', res);
                if(res.data && res.data.length) {
                    this.list = this.list.concat(res.data);
                }

                if(!res.data || res.data.length < this.limit) {
                    this.finished = true;
                }
            });
        },
        onItemClick(id) {
            location.href = '/book/SchoolArticle/detail/id/' + id + '.html';
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
