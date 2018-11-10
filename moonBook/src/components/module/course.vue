<template>
    <div class="course">
        <div class="module-title">精选课程</div> 
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <div class="list">
                <div class="item" v-for="(item,index) in list">
                    <van-cell-group>
                        <van-cell>
                            <div class="course-item">
                                <van-row gutter="10">
                                    <van-col span="10">
                                        <div class="cover">
                                            <img class="lazy" v-lazy='item.cover' :alt="item.title" />
                                        </div>
                                    </van-col>
                                    <van-col span="14">
                                        <span v-line-clamp:20="2" class="title">
                                            {{item.free.boolean?'【免费课】':''}} {{item.title}}
                                        </span>
                                        <div class="info">
                                            <div class="date">
                                                <span>{{item.date}}</span>
                                                <span>{{item.time}}</span>
                                                开始
                                            </div>
                                            <div class="price foot-bar-left">
                                                <span class="free" v-if='item.free.boolean'>免费</span>
                                                <div v-else class="flex flex-align">
                                                    <span class="unit">¥</span>
                                                    {{item.price}}
                                                </div>
                                            </div>
                                            <div class="foot-bar-right">
                                                <span class="participate">报名人数:{{item.participate}}</span>
                                            </div>
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </div>
            </div>
        </van-list>
        <slogan v-if='finished'/>
    </div>
</template>
<script>
import axios from 'axios'
import slogan from './../module/slogan'

export default {
    name:'course',
    components: {
      slogan  
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            p:1,
            limit:20
        }
    },
    methods: {
        onLoad() {
            let $this = this;
            axios.get('/book/PeixunCourse/getList', {params:{
                p: $this.p,
                limit: $this.limit
            }}).then(res=>{
                // setTimeout(() => {
                //     let array = res.data.courseData.courseList
                //     for (let i = 0; i < 5; i++) {
                //         this.list.push( array[this.list.length] )
                //     }
                //     this.loading = false
                //     if (this.list.length >= 20) {
                //         this.finished = true;
                //     }
                // },500)
                if(res.data && res.data.length) {
                    this.list = this.list.concat(res.data);
                    this.p ++;
                    this.finished = true;
                }
               this.loading = true;
               if(!res.data || res.data.length < 20){
                   this.finished = true;
               }
                
            })
        }
    }
}
</script>
<style scoped>
.course-item {
    position: relative;
}

.participate{
    width: 6.875rem /* 110/16 */;
    height: 1.25rem /* 20/16 */;
    border: .0625rem /* 1/16 */ solid #E6A23C;
    color: #E6A23C;
    display: block;
    text-align: center;
    line-height: 1.25rem /* 20/16 */;
}
</style>
