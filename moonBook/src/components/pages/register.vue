<template>
    <div class="register">
        <div class="fixed">
            <search-school @show='listShow'/>
        </div>
        <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft" />        
        <div class="container" ref='listContainer'>
            <div class="school" v-if='active==0'>
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell v-for="(item,index) in list" :key="index" is-link center>
                        <div class="school-name" v-line-clamp:20="1">{{item.name}}</div>
                        <div class="school-address" v-line-clamp:20="1">
                            <span>{{item.adname}}</span>
                            <span v-if='item.address.length!=0'>{{item.address}}</span>
                        </div>
                    </van-cell>
                </van-list>
            </div>
            <div class="identity" v-else>
                <van-cell-group>
                    <div class="form-title">您的身份？</div>
                    <van-cell title="我是家长" is-link />
                    <van-cell title="我是老师" is-link />
                    <van-cell title="我是园长" is-link />
                </van-cell-group>
            </div>
        </div>
        <van-popup v-model="show" class="page-popup" :overlay="false">
            <school-list @close='listHide'/>
        </van-popup>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import searchSchool from './../module/search/searchSchool'
import schoolList from './../module/search/schoolList'

export default {
    name:'register',
    components: {
        searchSchool,
        schoolList
    },
    computed: {
      ...mapGetters(['userLocation'])  
    },
    data () {
        return {
            show:false,
            active:0,
            page:0,
            list: [],
            loading: false,
            takeUp: false,
            finished: false,
            startX:'',
            startY:'',
            location:''
        }
    },
    methods: {
        ...mapActions(['getSchoolList']),
        onLoad() {
            this.page++
            let products = {
                page:this.page,
                location:this.userLocation
            }
            this.getSchoolList(products).then(res=>{
                this.list = this.list.concat(res.pois)
                this.loading = false
                if (this.list.length >= res.count) {
                    this.finished = true
                }
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        listShow(){
            this.show = true
        },
        listHide(){
            this.show = false
        }
    }
}
</script>
<style scoped>
.container,
.school{
    padding-top: 2.8125rem /* 45/16 */;
}

.register{
    padding-bottom: 5.5rem /* 88/16 */;
}

.fixed{
    position: fixed;
    top: 2.8125rem /* 45/16 */;
    z-index: 1001;
    width: 100%;
}

.search-module{
    width: 100%;
    height: 2.875rem /* 46/16 */;
}

</style>
