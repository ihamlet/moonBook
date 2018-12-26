<template>
    <div class="video">
        <van-cell :value="title" is-link />
        <div class="scroll-x">
            <div class="video-list flex">
                <div class="video-item scroll-item" v-for='(item,index) in videoList' :key="index">
                    <div class="video">
                        <div class="video-cover">
                            <img :src="item.cover" :alt="`视频封面-${index}`">
                        </div>
                        <div class="video-info flex flex-align">
                            <div class="avatar">
                                <img :src="item.avatar" :alt="item.name">
                            </div>
                            <div class="name">
                                {{item.name}}
                            </div>
                            <div class="like flex flex-align" @click="addLike(item)">
                                <i class="iconfont" :class="[item.getLike?'icon-like bounceIn animated':'']">&#xe668;</i>
                                {{item.like>1000?'999+':item.like}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <van-popup v-model="show" class="add-like-popup" :overlay="false" :lock-scroll='false' get-container='#app'>
            <i class="iconfont" :class="[show?'bounceIn animated':'']">&#xe668;</i>
        </van-popup>
    </div>    
</template>
<script>
import axios from 'axios'

export default {
    name:'Video',
    props: ['videoList'],
    data () {
        return {
            title:'精选视频',
            like:'',
            show:false
        }
    },
    methods: {
        addLike(item){
            item.getLike = !item.getLike
            if(item.getLike){
                this.show = true
                setTimeout(()=>{
                    this.show = false
                },1000)
            }
            axios.post('/api/addLike',{
                id:item.id,
                getLike:item.getLike
            }).then(res=>{
                item.like = res.data.like
            })
        }
    }
}
</script>
<style scoped>
.video-list{
    margin-left: .9375rem /* 15/16 */;
}

.video-item{
    width: 12.5rem /* 200/16 */;
    height: 18.75rem /* 300/16 */;
    overflow: hidden;
    margin-right: .625rem /* 10/16 */;
    position: relative;
}

.video-info{
    position: absolute;
    bottom: .625rem /* 10/16 */;
    width: 100%;
}

.avatar{
    margin-right: .3125rem /* 5/16 */;
    margin-left: .625rem /* 10/16 */;
}

.avatar img{
    width: 2.25rem /* 36/16 */;
    height: 2.25rem /* 36/16 */;
    border-radius: 50%;
}

.name{
    color: #fff;
}

.like{
    position: absolute;
    right: .625rem /* 10/16 */;
    color: #fff;
}

.like i.iconfont{
    display: block;
    margin-right: .3125rem /* 5/16 */;
    font-size: 1.25rem /* 20/16 */;
}


.add-like-popup i.iconfont,
i.iconfont.icon-like{
    background: linear-gradient(90deg, #FF765C,#FF23B3);
    -webkit-background-clip: text;
    color: transparent;
}

.add-like-popup{
    background: transparent;
}

.add-like-popup i.iconfont{
    font-size: 5rem /* 80/16 */;
    display: block;
}

</style>
