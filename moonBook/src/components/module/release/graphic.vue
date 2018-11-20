<template>
    <div class="graphic">
        <van-nav-bar title="发布图文" left-text="取消" @click-left="onClickLeft" @click-right="onClickRight">
            <div class="head-bar-btn theme-color" slot="right">
                <i class="iconfont">
                    &#xe72c;
                </i>
                发布
            </div>
        </van-nav-bar>
        <div class="textarea-module">
            <van-cell-group>
                <van-field class="theme-textarea" v-model="grapicData.text" type="textarea" placeholder="想说点什么？" rows="4" autosize />
                <van-cell>
                    <div class="flex flex-align">
                        <div class="upload-media flex flex-align">
                            <div class="btn-video" @click="uploadVideo">
                                <i class="iconfont">&#xe625;</i>
                            </div>
                            <div class="btn-audio" @click="uploadAudio">
                                <i class="iconfont">&#xe627;</i>
                            </div>
                        </div>
                        <div class="topic theme-color" @click="toTopicPage">
                            #选择话题
                        </div>
                        <div class="text-length" :class="[grapicData.text.length>140?'danger':'']" v-if='grapicData.text.length>0'>{{grapicData.text.length}}</div>
                    </div>
                </van-cell>
                <input type="file" accept="video/" capture="camcorder" ref='fileVideo' hidden>
                <input type="file" accept="audio/*" capture="microphone" ref='fileAudio' hidden>
            </van-cell-group>
            <van-checkbox-group v-model="result">
                <div class="form-title">同步到</div>
                <van-cell-group>
                    <van-cell v-for="(item,index) in list" clickable :key="index" :title="item.title" @click="toggle(index)">
                        <van-checkbox class="theme-checkbox" :name="item.name" ref="checkboxes" />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </div>
        <div class="upload-module flex wrap">
            <van-cell>
                <van-row gutter="5">
                    <van-col :span="8" v-for='(item,index) in grapicData.images' :key="index">
                        <div class="preview img-grid" v-lazy:background-image='item.img'>
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
            <topic-list />
        </van-popup>
    </div>
</template>
<script>
import axios from 'axios'
import topicList from './topicList'
import { compress } from './../../lib/js/util.js'

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
            list:[{
                title:'发现',
                name:'find'
            },{
                title:'班级主页',
                name:'class'
            }],
            result:['find','class'],
            show:false,
            grapicData:{
                text:'',
                images:[]
            }
        }
    },
    watch: {
        grapicData:{
            handler(val){
                if(val.text.match('#')){
                    this.show = true
                }
            },  
            deep: true
        }
    },
    methods: {
        onRead(file) {
            if(file.length){
                file.forEach( element => {
                        compress(element.content,800,0.5).then( val => {
                            if(this.imagesLength < 9){
                                this.grapicData.images.push({
                                    img:val
                                })
                            }
                        })
                    })
                }else{
                compress(file.content,800,0.5).then( val => {
                    this.grapicData.images.push({ 
                        img:val
                    })
                })
            }
        },
        onClickLeft(){
            this.$emit('close')
        },
        onClickRight(){
            if( this.grapicData.text.length == 0 && this.grapicData.images.length == 0){
                this.$emit('close')
            }else if( this.grapicData.text.length < 140 ){
                axios.put('/api/addDrying',{
                    graphic: this.grapicData,
                    result: this.result
                }).then(res=>{
                    this.$emit('close')

                    if(this.result.indexOf('find') == 0){
                        this.$router.push({name:'find'})
                    }else{
                        this.$router.push({name:'zoom'})
                    }
                })
            }
        },
        deletePhoto(index){
            this.grapicData.images.splice(index,1)
        },
        toTopicPage(){
            this.show = true
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle()
        },
        uploadVideo(){
            console.log(this.$refs.fileVideo) 
            this.$refs.fileVideo.click()
        },
        uploadAudio(){  
            console.log(this.$refs.fileAudio)
            this.$refs.fileAudio.click()
        }
    }
}
</script>
<style scoped>
.bar {
    height: 2rem /* 32/16 */;
    line-height: 2rem /* 32/16 */;
}

.text-length.danger {
    color: #f56c6c;
}

.photo-upload {
    line-height: 6.875rem /* 110/16 */;
    text-align: center;
}

.photo-upload i.iconfont {
    font-size: 1.5rem /* 24/16 */;
    color: #c0c4cc;
}

.preview {
    position: relative;
}

.preview i.iconfont {
    position: absolute;
    right: 0.3125rem /* 5/16 */;
    top: 0.3125rem /* 5/16 */;
    font-size: 1.5rem /* 24/16 */;
    color: #fff;
}

.btn-video,
.btn-audio{
    width: 3rem /* 48/16 */;
    height: 3rem /* 48/16 */;
    text-align: center;
    line-height: 3rem /* 48/16 */;
}

.btn-video i.iconfont,
.btn-audio i.iconfont{
    font-size: 1.25rem /* 20/16 */;
}

.btn-video i.iconfont{
    background: linear-gradient(90deg, #FF765C,#FF23B3);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .3125rem /* 5/16 */ #ff2383;
}

.btn-audio i.iconfont{
    background: linear-gradient(90deg, #00C2AB,#3E94FF);
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 .0625rem /* 1/16 */ .3125rem /* 5/16 */ #3E94FF;
}

.upload-media{
    flex: 5;
}

.topic{
    flex: 2;
    text-align: center;
}

.text-length{
    flex: 1;
    text-align: center;
}
</style>
