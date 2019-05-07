<template>
    <div class="child-list">
        <div class="item">
            <div class="letter">A</div>
            <van-cell is-link arrow-direction="down" v-for='(item,index) in list' :key="index" center>
                <div class="child-card">
                    <div class="info flex flex-align">
                        <div class="avatar">
                            <img :src="item.avatar"/>
                        </div>
                        <div class="name">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </van-cell>
        </div>
    </div>    
</template>
<script>
import axios from './../../../components/lib/js/api'
import { compare } from './../../lib/js/util'

export default {
    name:'child-card',
    computed: {
      nodeLetter(){
         let arr = this.list.map(e=>{
              return e.name[0]
          })

          return arr
      }  
    },
    props:{
        list:{
            type:Array,
            default(){
                return [{
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
                    name:'菜包',
                },{
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
                    name:'八宝',
                },{
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
                    name:'迪宝'
                },{
                    avatar:'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0',
                    name:'阿宝'
                }]
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.child-list{
    margin-top: 10px;
    padding-right: 20px;
    background: #fff;
}

.letter{
    height: 28px;
    line-height: 28px;
    padding-left: 15px
}
</style>
