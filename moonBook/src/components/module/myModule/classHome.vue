<template>
    <div class="class module-card">
        <van-cell-group>
            <van-cell :title="userDataState.childInfo[0].data.name" :value="`选择班级`" is-link center @click="toPageClass">
                <div class="icon" slot="icon">
                    <i class="iconfont">&#xe802;</i>
                </div>
            </van-cell>
        </van-cell-group>

        <!-- 选择班级 -->
        <van-popup v-model="show" class="page-popup" position="right">
            <add-class :school='userDataState.regInfo.school' @close='show = false'/>
        </van-popup>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import addClass from './../addClass'

export default {
    name:'class',
    components: {
      addClass  
    },
    computed: {
      ...mapGetters(['userDataState'])
    },
    data () {
        return {
            show:false
        }
    },
    methods: {
        toPageClass(){
            this.show = true
        }
    }   
}
</script>
<style scoped>
.class{
    overflow: hidden;
}

.icon{
    margin-right: .625rem /* 10/16 */;
}

.icon i.iconfont{
    font-size: 1.5rem /* 24/16 */;
    background-image: linear-gradient( 135deg, #795548 10%, #000 100%);
    -webkit-background-clip: text;
    color: transparent;
}
</style>
