<template>
    <div class="find">
        <van-nav-bar :title="$route.meta.title"/>
        <lazy-component class="module">
            <fresh-list :list='freshList'/>
        </lazy-component>
        <lazy-component>
            <div class="container">
                <van-tabs color='#409eff' :line-width='20' sticky swipeable>
                    <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
                        <div class="tab-content" v-if='index == 0'>
                            <drying-list/>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </lazy-component>
    </div>
</template>
<script>
import axios from 'axios'
import freshList from './../module/findModule/freshList'
import dryingList from './../module/findModule/dryingList'

export default {
    name:'find',
    components: {
        freshList,
        dryingList
    },  
    data () {
        return {
            freshList:[],
            tab:[{
                title:'关注'
            },{
                title:'推荐'
            },{
                title:'最新'
            }]
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
            axios.get('/api/fresh').then(res=>{
                this.freshList = res.data.freshData.freshList
            })
        }
    }
}
</script>
<style scoped>

</style>

