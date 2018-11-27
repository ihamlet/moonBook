<template>
    <div class="class module-card">
        <van-cell-group>
            <van-cell :title="userDataState.childInfo[0].data.name" :value="classInfo?classInfo:'选择班级'" is-link center @click="toClassHome">
                <div class="icon" slot="icon">
                    <i class="iconfont">&#xe802;</i>
                </div>
            </van-cell>
        </van-cell-group>

        <!-- 选择班级 -->
        <van-popup v-model="show" class="page-popup" position="right">
           <add-class :school="schoolState" @close='show = false'/>
        </van-popup>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import addClass from './../addClass'

export default {
    name:'class-home',
    components: {
      addClass  
    },
    computed: {
        ...mapGetters(['userDataState','schoolState']),
        classInfo(){
            if(this.userDataState.childInfo[0].class){
                return this.userDataState.childInfo[0].class
            }else{
                return null
            }
        }
    },
    data () {
        return {
            show:false
        }
    },
    methods:{
        toClassHome(){
            if(this.classInfo){
                console.log(this.$router)
                this.$router.push({name:'class-home'})
            }else{
                this.show = true
            }
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
