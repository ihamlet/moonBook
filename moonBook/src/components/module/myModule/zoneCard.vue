<template>
    <div class="zone">
        <div class="module-card">
            <van-cell-group class="cell-group">
            <van-cell class="cell" center is-link to='./zoom'>
                <span class="icon" slot="icon">
                    <i class="iconfont">&#xe606;</i>
                </span>
                <div class="content flex flex-align flex-justify" slot="title">
                    <div class="img-preview flex flex-justify" v-if='imageslength > 0'>
                        <div class="img-grid" v-if='index < 4' v-for='(item,index) in userDataState.dryingList[0].media.imgList' v-lazy:background-image='item.img'></div>
                        <div class="robe"  v-if='imageslength > 4'>
                            <photo-stack/>
                        </div>
                        <div class="badge" v-if='imageslength > 4'>
                            {{imageslength}}
                        </div>
                    </div>
                    <div class="text-preview" v-line-clamp:20="2" v-else>
                        {{userDataState.dryingList[0].text}}
                    </div>
                </div>
             </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import photoStack from './../animate/photoStack'
import { mapGetters } from 'vuex'

export default {
    name:'zone',
    components: {
      photoStack
    },
    computed: {
        ...mapGetters(['userDataState']),
        imageslength(){
            return this.userDataState.dryingList[0].media.imgList.length
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.cell.van-cell{
    line-height: normal
}

.cell{
    height: 5rem /* 80/16 */;
}

.badge{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
}

.cell-group{
    border-radius: .625rem /* 10/16 */;
    overflow: hidden;
}

.icon i.iconfont{
    font-size: 1.625rem /* 26/16 */;
    background-image: linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%);
    -webkit-background-clip: text;
    color: transparent;
}

.icon{
    margin-right: .625rem /* 10/16 */;
}

.text-preview,
.img-preview{
    position: relative;
}

.robe,
.img-preview .img-grid{
    width:3.375rem /* 54/16 */;
    height: 3.375rem /* 54/16 */;
    border-radius: .25rem /* 4/16 */;
}

.robe{
    position: absolute;
    right: -.3125rem /* 5/16 */;
    top: .25rem /* 4/16 */;
    z-index: 1;
}

.img-preview .img-grid{
    margin-right: .3125rem /* 5/16 */;
    z-index: 2;
}

.img-preview .img-grid:last-child{
    box-shadow: 0 .125rem /* 2/16 */ .625rem /* 10/16 */ rgba(0, 0, 0, .3)
}
</style>
