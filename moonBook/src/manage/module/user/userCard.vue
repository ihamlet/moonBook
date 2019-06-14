<template>
    <van-cell>
        <div class="user-card flex flex-align">
            <div class="info flex flex-align" @click="toEditPage">
                <img :src="item.avatar" @error="imgError"/>

                <div class="user-info">
                    <div class="name">{{item.username}}</div>

                    <div class="tags">
                        <van-tag plain round type="success" v-if='item.is_school_head == 1'>学校群主</van-tag>
                        <van-tag plain round type="primary" v-if='item.is_master == 1'>管理员</van-tag>
                    </div>

                    <div class="child flex" v-line-clamp:20="1">{{item.banji_name?`${formatBanjiTitle(item.banji_name)} | `:''}}{{item.duty}}</div>                
                </div>
            </div>
            
            <div class="operation-btn flex flex-align">
                <van-button class="pass" size="small" round type="info" @click="info">详情</van-button>
                <van-button :disabled='!(isMaster == 1&&item.is_master == 0)' class="past" size="small" round :type="item.is_confirm == 1?'warning':'primary'" @click="past">  {{item.is_confirm == 1?'请出':'通过'}} </van-button>
            </div>
        </div> 

        <van-popup v-model="show" get-container='#app' class="popup-techaer">
            <div class="popup-close" @click="show = false">
               <i class="iconfont">&#xe647;</i> 
            </div>
            
            <div class="techer-card">      
                <div class="avatar" @click="toEditPage">
                    <img :src="item.avatar" @error="imgError"/>
                </div>
           
                <van-cell-group>
                    <van-cell title="手机号" :border='false'>
                        <a class="theme-color" :href="`tel:${item.mobile}`">{{item.mobile}}</a>
                    </van-cell>
                    <van-cell title="姓名" :value="item.username" :border='false'/>
                    <van-cell title="学校" v-if='item.school_name' :value="item.school_name" :border='false' value-class='info-cell' is-link @click="toSchool"/>
                    <van-cell title="班级" v-if='item.banji_name' :value="formatBanjiTitle(item.banji_name)" is-link :border='false' @click="toBanji"/> 
                    <van-cell title="职位" :value="item.duty?item.duty:'老师'" :border='false'/>
                    <van-cell title="审核人" v-if='teacherInfo.confirm_user_id > 0' :value="teacherInfo.confirm_user_name == item.username?'自己':teacherInfo.confirm_user_name" :border='false'/>
                    <van-cell title="审核时间" :value='teacherInfo.confirm_date' value-class='info-cell' :border='false'/>
                </van-cell-group>

                <div class="popup-footer flex-align flex">
                    <div class="btn">
                        <van-button class="edit" size="small" type="info" round plain @click="toEditPage"> 编辑 </van-button>
                    </div>
                    <div class="btn">
                        <van-button :disabled='!(manageSchoolInfo.is_master == 1&&item.is_master == 0)' class="past" size="small" round :type="item.is_confirm == 1?'warning':'primary'" @click="past">  {{item.is_confirm == 1?'请出':'通过'}} </van-button>
                    </div>
                </div>
            </div>  
        </van-popup>
    </van-cell>   
</template>
<script>
import axios from './../../../components/lib/js/api'
import { mapGetters } from 'vuex'

export default {
    name:'userCard',
    computed: {
        ...mapGetters('manage',['manageSchoolInfo'])
    },
    props: {
        item:{
            type: Object,
            default(){
                return {
                    avatar:'',
                    username:'',
                    banji_id:0,
                    banji_name: '3',
                    duty:'信息老师',
                    is_confirm: 0,
                    is_master:0,
                    mobile:'',
                    school_name:'微美幼儿园',
                    school_id:0,
                    id: 0
                }
            }
        },
        isMaster:{
            type: Number,
            default: 0
        },
        isHead:{
            type: Number,
            default: 0  
        },
        isSchoolHead:{
            type: Number,
            default: 0
        }
    }, 
    data () {
        return {
            show: false,
            teacherInfo:''      
        }
    },
    methods: {
        info(){
            axios.get('/SchoolManage/teacher/getTeacher',{
                params: {
                    id: this.item.id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.show = true
                        this.teacherInfo = res.data.data
                        break
                    default:
                        this.$toast(res.data.msg)
                }  
            })
        },
        past(){
            
            let apiType = this.item.is_confirm == 1?'kick':'check'

            axios.get(`/SchoolManage/teacher/${apiType}`,{
                params:{
                    id: this.item.id
                }
            }).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.item.is_confirm = `${apiType == 'check'?1:0}`
                        this.$toast.success(res.data.msg)

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
        toEditPage(){
            this.$router.push({
                name:'teacherEdit',
                query:{
                    ...this.teacherInfo,
                    ...this.item,
                    isHead: this.isHead,
                    isMaster: this.isMaster,
                    isSchoolHead: this.isSchoolHead,
                    type:'edit'
                }
            })
        },
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
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

.child{
    font-size: 12px;
}
</style>
