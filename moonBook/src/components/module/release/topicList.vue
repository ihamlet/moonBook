<template>
    <div class="topic-list">
        <van-nav-bar title="选择话题"/>
        <div class="list">
            <div class="item" v-for='(item,index) in topicList'>
                <van-cell-group>
                    <van-cell is-link>
                        <div class="theme-color">#{{item}}</div>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name:'topic-list',
    data () {
        return {
            topicList:''
        }
    },
    created () {
        this.fetchData()
    },
    watch: {
        '$router':'fetchData'
    },
    methods: {
        fetchData(){
            axios.get('/api/topicList').then(res=>{
                this.topicList = res.data.topicList
            })
        }
    }
}
</script>
<style scoped>

</style>
