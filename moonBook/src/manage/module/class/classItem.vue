<template>
    <div class="class-item">
        <van-cell is-link size='large' @click="selection">
            <div class="item-cell flex flex-align">
                <div class="title flex flex-align">
                    <div class="banji-name">{{formatBanjiTitle(item.title)}} </div>   
                    <van-tag v-if='item.student_count > 0' round type="danger" class="student-count">{{item.student_count == 0?'尚无成员':`${item.student_count}人`}}</van-tag> 
                    <div class="grade-name">{{moduleType == 'tab'?item.year:''}}{{item.grade_name?` | ${formatBanjiTitle(item.grade_name)}`:''}}</div>
                </div>
                <div class="head-name" v-if='item.head_name'>
                    {{item.head_name}}
                </div>
                <div class="nofound-head" v-else>
                    设置
                </div>
            </div>
        </van-cell>
    </div>    
</template>
<script>
import axios from './../../../components/lib/js/api'


export default {
    name:'class-list',
    props:{
        item:{
            type:Object,
            default(){
                return {
                    title: '一班',
                    banji_id: 0,
                    year: '2018',
                    grade_name:'大班',
                    invite_code:0,
                    student_count:0
                }
            }
        },
        moduleType:{
            type:String,
            default:''
        }
    },
    methods: {
        formatBanjiTitle(text){
            if (text && text.indexOf('班') == -1) {
                return text + '班'
            } else {
                return text
            }
        },
        selection(){
            switch(this.moduleType){
                case 'tab':
                    this.$router.push({
                        name:'banjiEdit',
                        query:{
                            ...this.item,
                            pageType:'edit',
                            pageTitle:'班级设置',
                        }
                    })
                    break
                default:
                    this.selectBanji()
            }
        },
        selectBanji(){
            if(this.$route.query.type == 'add' || this.$route.query.type == 'edit'){
                this.$router.replace({
                    name: this.$route.query.back,
                    query:{
                        ...this.$route.query,
                        banji_id: this.item.banji_id,
                        banji_name: this.item.title,
                        invite_code: this.item.invite_code,
                        title: this.$route.query.type == 'add'?'录入成员':'成员设置'
                    }
                })
            }else{
                let msg = {
                    loading:'',
                    confirm:''
                }

                switch (this.$route.query.set) {
                    case 'transmitAll':
                        msg.loading = '全员转班中...'
                        msg.confirm = `您确定要将${this.formatBanjiTitle(this.$route.query.title)}的学生全部转移到${this.item.title}吗?`
                        break
                    case 'transmit':
                        msg.loading = '正在换班中...'
                        msg.confirm = `您确定要将${this.$route.query.names}转到${this.item.title}吗?`
                        break
                }

                let data = {
                    params:{
                        id: this.$route.query.id.split(','),
                        banji_id: this.item.banji_id,
                        from_banji_id: this.$route.query.banji_id,
                        to_banji_id: this.item.banji_id
                    }
                }

                this.$dialog.confirm({
                    message: msg.confirm
                }).then(()=>{
                    let toast = this.$toast.loading({
                        forbidClick: true,
                        message: msg.loading
                    })

                    axios.get(`/SchoolManage/students/${this.$route.query.set}`, data).then(res=>{
                        toast.clear()
                        this.$toast(res.data.msg)                        
                        this.backRouter()
                    })
                }).catch(()=>{
                    this.backRouter()
                })
            }

        },
        backRouter(){
            this.$router.replace({
                name:'banjiTree',
                query:{
                    school_id: this.$route.query.school_id,
                    banji_id: this.$route.query.banji_id,
                    year: this.$route.query.year,
                    activeId: this.$route.query.activeId
                }
            })
        }
    }
}
</script>
<style scoped>
.item-cell{
    justify-content: space-between;
}

.banji-name{
    margin-right: 10px;
}

.grade-name{
    font-size: 13px;
    color: #909399;
    margin-left: 10px;
}

.nofound-head{
    color: #C0C4CC;
}
</style>
