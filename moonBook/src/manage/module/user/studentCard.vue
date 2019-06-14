<template>
    <van-cell>
        <div class="user-card flex flex-align">
            <div class="info flex flex-align">
                <div class="select" @click="selectChild">
                    <transition enter-active-class="fadeIn animated"  leave-active-class="fadeOut animated"  mode="out-in">
                        <i class="icon-select theme-color iconfont"  v-if='select'>&#xea32;</i>
                        <i class="icon-select to-be-selected  iconfont" v-else-if='selectShow'>&#xe677;</i>
                    </transition>
                </div>
                <img :src="item.avatar" @error="imgError" @click="show = true"/>
                <div class="user-info" @click="show = true">
                    <div class="name">{{item.name}}</div>
                    <div class="child flex" v-line-clamp:20="1" v-if='activeId!=0'>{{item.parent_name?`${item.parent_name} | `:''}}{{item.relation_name}}</div>
                    <div class="child flex" v-line-clamp:20="1" v-else>{{item.banji_name?`${formatBanjiTitle(item.banji_name)} | `:''}}{{item.parent_name}}</div>
                </div>
            </div>
            <div class="operation-btn flex flex-align">
                <!-- <van-button class="pass" size="small" round type="info" @click="info">详情</van-button> -->
                <van-button class="past" size="small" round :type="item.is_banji_confirm == 1?'warning':'primary'" @click="past">  {{item.is_banji_confirm == 1?'请出':'通过'}} </van-button>
            </div>
        </div> 

        <van-popup v-model="show" get-container='#app' class="popup-techaer">
            <div class="popup-close" @click="show = false">
               <i class="iconfont">&#xe647;</i> 
            </div>
            
            <div class="techer-card">      
                <div class="avatar">
                    <img :src="item.avatar" @error="imgError"/>
                </div>
           
                <van-cell-group>
                    <van-cell title="姓名" :value="item.name" :border='false'/>
                    <van-cell title="家长" v-if='item.parent_name' :value="item.parent_name" :border='false' value-class='info-cell'/>
                    <van-cell title="联系电话" :border='false' v-if='item.parent_mobile'>
                        <a class="theme-color" :href="`tel:${item.parent_mobile}`">{{item.parent_mobile}}</a>
                    </van-cell>
                    <van-cell title="学校" v-if='item.school_name' :value="item.school_name" :border='false' value-class='info-cell' is-link @click="toSchool"/>
                    <van-cell title="班级" v-if='item.banji_name' :value="formatBanjiTitle(item.banji_name)" is-link :border='false' @click="toBanji"/>
                    <van-cell title="申请时间" v-if='item.banji_apply_date' :value="item.banji_apply_date" :border='false'/>
                </van-cell-group>

                <div class="popup-footer flex-align flex">
                    <div class="btn">
                        <van-button class="edit" size="small" type="info" round plain @click="changeBanji"> 换班 {{activeId!=0?'/升班':''}} </van-button>
                    </div>
                    <div class="btn">
                        <van-button class="past" size="small" round :type="item.is_banji_confirm == 1?'warning':'primary'" @click="past">  {{item.is_confirm == 1?'请出':'通过'}} </van-button>
                    </div>
                </div>

            </div>  
        </van-popup>
    </van-cell>   
</template>
<script>
import axios from './../../../components/lib/js/api'

export default {
    name:'userCard',
    props: {
        item:{
            type: Object,
            default(){
                return {
                    avatar:'',
                    name:'',
                    banji_id:0,
                    banji_name:'3',
                    parent_name: '赵静静',
                    relation_name: '妈妈',
                    is_banji_confirm: 0,
                    school_name:'微美幼儿园',
                    parent_mobile:'',
                    school_id:0,
                    id: 0
                }
            }
        },
        activeId:{
            type: Number,
            default: 0
        },
        selectShow:{
            type: Boolean,
            default: false
        }
    }, 
    data () {
        return {
            show: false,
            select: false
        }
    },
    watch: {
        selectShow(val){
            if(!val){
                this.select = val
            }
        }
    },
    methods: {
        past(){
            
            let apiType = this.item.is_banji_confirm == 1?'kick':'check'

            axios.get(`/SchoolManage/students/${apiType}`,{
                params:{
                    id: this.item.id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        if(apiType == 'check'){
                            this.item.is_banji_confirm = 1
                            this.$toast.success('审核通过')
                        }else{
                            this.item.is_banji_confirm = 0
                            this.$toast(res.data.msg)
                        }

                        this.$emit('statusChange')
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })

        },
        formatBanjiTitle(text) {
            if (text && text.indexOf('班') == -1) {
                return text + '班'
            } else {
                return text
            }
        },
        toSchool(){
            if(this.item.school_id > 0){
                this.$router.push({
                    name:'apps-school',
                    query:{
                        id: this.item.school_id
                    }
                })
            }
        },
        toBanji(){
            if(this.item.banji_id > 0){
                this.$router.push({
                    name:'class-home',
                    query:{
                        id: this.item.banji_id,
                        cate_id: 116,
                        home_type: 'banji'
                    }
                })
            }
        },
        changeBanji(){
            this.$emit('selectShowTrue')
            this.show = false
            this.selectChild()
        },
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        },
        selectChild(){
           this.select = !this.select
           this.$emit('electChild',this.select,this.item)
        }
    },
}
</script>
<style scoped>
.user-info{
    flex: 1;
    font-size: 12px;
}

.popup-techaer{
    width: 80%;
    border-radius: 8px;
    padding: 10px;
    overflow: hidden;
}

.avatar{
    padding: 0 0 15px;
}

.avatar,
.avatar img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin:  0 auto;
}

.avatar img{
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1)
}

.popup-close{
    position: absolute;
    width: 80px;
    height: 80px;
    background: #F56C6C;
    border-radius: 50%;
    right: -40px;
    top: -40px;
}

.popup-close i.iconfont{
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
}

.popup-footer{
    padding: 20px 0 0;
}

.popup-footer .edit,
.popup-footer .past{
    width: 100%;   
}

.popup-techaer .btn{
    flex: 1;
    padding: 0 10px;
}

.icon-select{
    margin-right: 10px;
}

.to-be-selected{
    opacity: .3;
}
</style>
