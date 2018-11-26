<template>
    <div class="add-school">
        <div class="fixed" :class="[pageType=='popup'?'sticky':'']">
            <search-bar :prompt='prompt' @show='isListShow = true'/>
        </div>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <van-cell v-for="(item,index) in list" :key="index" is-link center @click="selectSchool(item)">
                <div class="school-name" v-line-clamp:20="1">{{item.name}}</div>
                <div class="school-address" v-line-clamp:20="1">
                    <span>{{item.adname}}</span>
                    <span v-if='item.address.length!=0'>{{item.address}}</span>
                </div>
            </van-cell>
        </van-list>

        <van-popup v-model="isListShow" class="page-popup" :overlay="false">
            <school-list :prompt='prompt' @close='isListShow = false' @select='selectSchool'/>
        </van-popup>
    </div>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import searchBar from './search/searchBar'
import schoolList from './search/schoolList'

export default {
    name:'add-school',
    props: ['prompt','pageType'],
    components: {
        searchBar,
        schoolList
    },
    computed: {
      ...mapGetters(['userPointState']),
    },
    data () {
        return {
            isListShow:false,
            page:0,
            loading: false,
            finished: false,
            list: []
        }
    },
    methods: {
        ...mapActions(['getSchoolList']),
        onLoad() {
            this.page++
            let products = {
                page:this.page,
                location:this.userPointState.location
            }
            this.getSchoolList(products).then(res=>{
                this.list = this.list.concat(res.pois)
                this.loading = false
                if (this.list.length >= res.count) {
                    this.finished = true
                }
            })
        },
        selectSchool(item){
            this.$emit('select',item)
        }
    }
}
</script>
<style scoped>
.fixed{
    position: fixed;
    top: 2.8125rem /* 45/16 */;
    z-index: 1001;
    width: 100%;
}

.fixed.sticky{
    position: sticky;
}
</style>
