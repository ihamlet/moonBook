<template>
    <div class="article-item">
        <van-cell>
            <van-row gutter="10">
                <van-col span="6">
                    <div class="img-grid" @click="$refs.selectPhoto.$refs.input.click()">
                        <div class="photo-upload"  v-if='photo'>
                            <img :src="photo" alt="" srcset="">
                        </div>
                    </div>
                </van-col>
                <van-col span="16">
                    <div class="add-text" @click="show = true">
                        <div class="description">点击添加文字</div>
                    </div>
                    <div class="text-content" v-if='text'>
                        {{text}}
                    </div>
                </van-col>
               <van-col span="2">
                   <div class="operation">
                        <div class="delete">
                            <i class="iconfont">&#xe651;</i>
                        </div>
                        <div class="sort">
                            <i class="iconfont">&#xe68d;</i>
                        </div>
                   </div>
                </van-col>
            </van-row>
        </van-cell>
        
        <van-popup class="publishing-popup" v-model="show" position="bottom">
            <Publishing />
        </van-popup>
    </div>    
</template>
<script>
import Publishing from './../Publishing'

export default {
    name:'article-item',
    props: ['photo','text'],
    components: {
        Publishing
    },
    data () {
        return {
            show: false      
        }
    },
    methods: {
        addText(){
            
        }
    }
}
</script>
<style scoped>
.article-item{
    width: 100%;
    overflow: hidden;
    position: relative;
}

.img-grid{
    background: #f2f2f2;
    margin-top: 0;
}

.photo-upload{
    position: absolute;
    text-align: center;
}

.add-text{
    width: 100%;
    font-size: 1rem /* 16/16 */;
    color: #C0C4CC;
}

.operation{
    width: 100%;
    text-align: center;
}

.operation .delete{
    margin-bottom: .625rem /* 10/16 */;
}

.publishing-popup{
    height: 100vh;
}
</style>
