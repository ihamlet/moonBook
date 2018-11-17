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
        <footer-bar :pageIndex='pageIndex'/>
    </div>
</template>
<script>
import footerBar from './../module/footerBar'
import freshList from './../module/findModule/freshList'
import dryingList from './../module/findModule/dryingList'
import axios from '@/fetch/api'

export default {
    name:'find',
    components: {
        footerBar,
        freshList,
        dryingList
    },  
    data () {
        return {
            freshList:[],
            pageIndex:1,
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
            axios.get('/book/SchoolArticle/index').then(res=>{
                this.freshList = res.data.freshData.freshList
            })
        }
    }
}
</script>
<style scoped>

</style>

