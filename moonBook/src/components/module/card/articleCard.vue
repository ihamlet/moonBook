<template>
    <van-cell class="article-card" :border='false' is-link center>
        <div class="flex flex-align">
            <div class="article-cover">
                <img v-if='item.cover' :src="item.cover">
            </div>
            <div class="details">
                <div class="content" v-line-clamp:20="2"> 
                    {{details}}
                </div>
            </div>
        </div>   
    </van-cell>
</template>
<script>
import { checkHtml,formatTime } from './../../lib/js/util'

export default {
    name:'article-card',
    props: {
        item:{
            type: Object,
            default:{
                cover: '',
                photos:[],
                details: ''
            }
        }
    },
    computed: {
        details(){
            let content = `${this.item.baby_name}在阅亮书架`
            if(this.item.hasvideo == '0'){
                if(this.item.template_id == 0){
                    content = this.item.title
                }else{
                    checkHtml(this.item.details)?content:content = this.item.details
                }
            }else{
                content = `${this.item.baby_name}的小视频  ${this.getDuration(this.item.photos[0].duration)}`
            }

            return content
        }
    },
    methods: {
        getDuration(time) {
            return formatTime(time)
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
