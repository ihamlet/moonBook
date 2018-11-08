<template>
    <div class="graphic">
        <van-nav-bar title="发布图文" left-text="取消" @click-left="onClickLeft" @click-right="onClickRight">
            <div class="release" slot="right">
                发布
            </div>
        </van-nav-bar>
        <div class="textarea-module">
            <van-cell-group>
                <van-field class="theme-textarea" v-model="grapicData.text" type="textarea" placeholder="想说点什么？" rows="4" autosize />
                <van-cell>
                    <div class="bar flex flex-align">
                        <div class="topic theme-color" @click="toTopicPage">
                            #选择话题
                        </div>
                        <div class="text-length foot-bar-right" :class="[grapicData.text.length>140?'danger':'']" v-if='grapicData.text.length>0'>{{grapicData.text.length}}</div>
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
        <div class="upload-module flex wrap">
            <van-cell>
                <van-row gutter="5">
                    <van-col :span="8" v-for='(item,index) in grapicData.images' :key="index">
                        <div class="preview img-grid"  v-lazy:background-image='item.img'>
                            <i class="iconfont" @click="deletePhoto(index)">&#xe683;</i>
                        </div>
                    </van-col>
                    <van-col :span="8" v-if='imagesLength < 9'>
                        <van-uploader class="img-grid" :after-read="onRead" multiple>
                            <div class="photo-upload">
                                <i class="iconfont">&#xe607;</i>
                            </div>
                        </van-uploader>
                    </van-col>
                </van-row>
            </van-cell>
        </div>
        <van-popup class="page-popup-layer" position="bottom" v-model="show">
            <topic-list/>
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import topicList from './topicList'

export default {
    name:'graphic',
    components: {
        topicList
    },
    computed: {
      imagesLength(){
          return this.grapicData.images.length
      }  
    },
    data () {
        return {
            show:false,
            grapicData:{
                text:'',
                images:[]
            }
        }
    },
    methods: {
        onRead(file) {
            if(file.length){
                file.forEach( element => {
                    if(this.imagesLength < 9){
                        this.grapicData.images.push({img:element.content})
                    }
                })
            }else{
                this.grapicData.images.push({img:file.content})
            }
        },
        onClickLeft(){
            this.$emit('close')
        },
        onClickRight(){
            if( this.grapicData.text.length < 140 ){
                axios.put('/api/addDrying',{
                    graphic: this.grapicData
                }).then(res=>{
                    console.log(res)
                })
            }

        },
        deletePhoto(index){
            this.grapicData.images.splice(index,1)
        },
        toTopicPage(){
            this.show = true
        }
    }
}
</script>
<style scoped>
.bar{
    height: 2rem /* 32/16 */;
    line-height: 2rem /* 32/16 */;
}

.text-length.danger{
    color: #F56C6C;
}

.photo-upload{
    line-height: 6.875rem /* 110/16 */;
    text-align: center;
}

.photo-upload i.iconfont{
    font-size: 1.5rem /* 24/16 */;
    color: #C0C4CC;
}

.preview{
    position: relative;
}

.preview i.iconfont{
    position: absolute;
    right: .3125rem /* 5/16 */;
    top: .3125rem /* 5/16 */;
    font-size: 1.5rem /* 24/16 */;
    color:#fff;
}
</style>
