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
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'菜包',
                },{
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'八宝',
                },{
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    name:'迪宝'
                },{
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
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
