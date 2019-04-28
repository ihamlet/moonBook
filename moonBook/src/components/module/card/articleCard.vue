<template>
    <div class="cell">
        <div class="share-cell flex flex-align">
            <div class="details flex flex-align">
                <div class="info" @click="toDetails" v-if='detailsId&&detailsId > 0'>
                    <div class="theme-color" v-line-clamp:20="1">{{item.title}}</div>
                </div>
                <div class='punches theme-color' @click="toReadStat">
                    累计{{item.sign_read_count}}本
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { checkHtml,formatTime } from './../../lib/js/util'
import { mapGetters } from 'vuex'

export default {
    name:'article-card',
    props: ['item','detailsId'],
    computed: {
        ...mapGetters(['userDataState']),
        details(){
            return checkHtml(this.item.details)?this.item.details.replace(/<[^>]+>/g,""):this.item.details
        }
    },
    methods: {
        toDetails(){
            let routerName = this.item.type == 'book'?'book-details':'article'
            this.$emit('toDetails',{routeName:routerName,detailsId:this.detailsId})
        },
        toReadStat(){
            this.$router.push({
                name:'readStat',
                query:{
                   id: this.userDataState.child_id
                }
            })
        }
    }
}
</script>
<style scoped>
.article-cover{
    width: 45px;
    height: 45px;
    background: #fff;
    position: relative;
}

.article-cover img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #fff;
}

.tag{
    position: absolute;
    left: 0;
    bottom: 0;
}

.article-card{
    background: #f8f8f8;
}

.content{
    color: #909399;
    font-size: 12px;
}

.title{
    font-size: 14px;
}

.info{
   flex: 2;
   padding-left: 10px;
   font-size: 18px;
}

.details{
    flex: 5;
}

.cell{
    background: #F2F6FC;
    height: 32px;
    line-height: 32px;
}

.punches{
    padding-right: 10px;
    flex: 1;
    text-align: right;
    font-size: 13px;
}

.share-cell{
    justify-content: space-between;
}
</style>
