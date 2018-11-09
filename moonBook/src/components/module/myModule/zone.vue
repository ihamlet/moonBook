<template>
    <div class="zone">
        <div class="module-card">
            <van-cell-group class="cell-group">
            <van-cell class="cell" center is-link>
                <div class="content flex flex-align" slot="title">
                    <span class="icon">
                        <i class="iconfont">&#xe606;</i>
                    </span>
                    <div class="img-preview flex flex-justify" v-if='imageslength > 0'>
                        <div class="img-grid" v-if='index < 4' v-for='(item,index) in userData.dryingList[0].images' v-lazy:background-image='item.img'></div>
                        <div class="robe"  v-if='imageslength > 4'>
                            <photo-stack/>
                        </div>
                        <div class="badge" v-if='imageslength > 4'>
                            {{imageslength}}
                        </div>
                    </div>
                    <div class="text-preview" v-line-clamp:20="2" v-else>
                        {{userData.dryingList[0].text}}
                    </div>
                </div>
             </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import photoStack from './../animate/photoStack'

export default {
    name:'zone',
    components: {
      photoStack  
    },
    computed: {
        userData(){
            return this.$store.getters.userDataState
        },
        imageslength(){
            return this.userData.dryingList[0].images.length
        }
    },
    data () {
        return {
           
        }
    },
    created () {

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

.icon{
    width: 3.125rem /* 50/16 */;
    height: 5rem /* 80/16 */;
    text-align: center;
    line-height: 5rem /* 80/16 */;
}

.icon i.iconfont{
    font-size: 1.625rem /* 26/16 */;
    background-image: linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%);
    -webkit-background-clip: text;
    color: transparent;
}

.text-preview,
.img-preview{
    margin-left: .625rem /* 10/16 */;
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
</style>
