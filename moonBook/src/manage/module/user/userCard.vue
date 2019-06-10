<template>
    <van-cell>
        <div class="user-card flex flex-align">
            <div class="info flex flex-align" @click="toEditPage">
                <img :src="item.avatar"/>
                <div class="user-info">
                    <div class="name">{{item.username}}</div>
                    <div class="child flex flex-align">{{item.banji_name?`${formatBanjiTitle(item.banji_name)} | `:''}}{{item.duty}}</div>
                </div>
            </div>
            <div class="operation-btn flex flex-align">
                <van-button class="pass" size="small" round type="info" @click="info">详情</van-button>
                <van-button class="past" size="small" round :type="item.is_confirm == 1?'warning':'primary'" @click="past">  {{item.is_confirm == 1?'请出':'通过'}} </van-button>
            </div>
        </div> 

        <van-popup v-model="show" get-container='#app' class="popup-techaer">
            <div class="popup-close" @click="show = false">
               <i class="iconfont">&#xe647;</i> 
            </div>
            
            <div class="techer-card">      
                <div class="avatar" @click="toEditPage">
                    <img :src="item.avatar"/>
                </div>
           
                <van-cell-group>
                    <van-cell title="手机号" :border='false'>
                        <a class="theme-color" :href="`tel:${item.mobile}`">{{item.mobile}}</a>
                    </van-cell>
                    <van-cell title="姓名" :value="item.username" :border='false'/>
                    <van-cell title="学校" :value="item.school_name" :border='false' value-class='info-cell' :is-link='item.school_id > 0' @click="toSchool"/>
                    <van-cell title="职位" :value="item.duty?item.duty:'老师'" :border='false'/>
                    <van-cell title="审核人" :value="teacherInfo.confirm_user_name == item.username?'自己':teacherInfo.confirm_user_name" :border='false'/>
                    <van-cell title="审核时间" :value='teacherInfo.confirm_date' value-class='info-cell' :border='false'/>
                </van-cell-group>

                <div class="popup-footer flex-align flex">
                    <div class="btn">
                        <van-button class="edit" size="small" type="info" round plain @click="toEditPage"> 编辑 </van-button>
                    </div>
                    <div class="btn">
                        <van-button class="past" size="small" round :type="item.is_confirm == 1?'warning':'primary'" @click="past">  {{item.is_confirm == 1?'请出':'通过'}} </van-button>
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
                    avatar:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556506992586&di=b64924d9e9f0cdf4cc0b88d9737ebb0c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201704%2F27%2F20170427155254_Kctx8.jpeg',
                    username:'赵金龙',
                    banji_name: '3',
                    duty:'信息老师',
                    is_confirm: 0,
                    mobile:'',
                    school_name:'微美幼儿园',
                    school_id:0,
                    id: 0
                }
            }
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
                this.show = true
                this.teacherInfo = res.data.data
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
                        this.$toast.success(res.data.msg)
                        break
                    default:
                        this.$toast.fail(res.data.msg)
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
                this.$rotuer.push({
                    name:'apps-school',
                    query:{
                        id: this.item.school_id
                    }
                })
            }
        },
        toEditPage(){
            this.$router.push({
                name:'teacherEdit',
                query:{
                    ...this.item,
                    ...this.teacherInfo
                }
            })
        }
    },
}
</script>
<style scoped>
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
</style>
