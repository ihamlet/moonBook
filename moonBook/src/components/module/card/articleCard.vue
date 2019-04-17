<template>
    <van-cell class="article-card" :border='false' is-link center>
        <div class="flex flex-align">
            <div class="article-cover">
                <img v-if='item.cover' :src="item.cover">
            </div>
            <div class="details">
                <div class="content" v-line-clamp:20="2">{{details}}</div>
            </div>
        </div>   
    </van-cell>
</template>
<script>
import { checkHtml } from './../../lib/js/util'

export default {
    name:'article-card',
    props: {
        item:{
            type: Object,
            default:{
                cover:'',
                photos:[],
                details:''
            }
        }
    },
    computed: {
        details(){
            let content = ''
            if(this.item.template_id == 0){
                content = this.item.title
            }else{
                checkHtml(this.item.details)?content:content = this.item.details
            }

            return content
        }
    }
}
</script>
<style scoped>
.article-cover{
    width: 50px;
    height: 50px;
    background: #fff;
    margin-right: 10px;
    position: relative;
}

.article-cover img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-card{
    background: #f8f8f8;
}

.details{
    flex: 1;
}
</style>
