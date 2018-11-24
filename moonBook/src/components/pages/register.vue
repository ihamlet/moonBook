<template>
    <div class="register">
        <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' :left-text="active==0?'返回':'上一步'" left-arrow @click-left="onClickLeft">
            <div class="icon-right" slot="right">
                <i class="iconfont">&#xe618;</i>
            </div>
        </van-nav-bar>        
        <div class="container" ref='listContainer'>
            <div class="step">
                <van-steps active-color='#409eff' :active="active">
                    <van-step>选择学校</van-step>
                    <van-step>选择角色</van-step>
                    <van-step>提交表单</van-step>
                </van-steps>
            </div>
            <div class="school" v-if='active==0'>
                <add-school :prompt='prompt' @select='selectSchool' @showSearchList='listShow = true'/>
            </div>
            <div class="identity" v-if='active==1'>
                <van-cell-group>
                    <div class="form-title">您的角色？</div>
                    <van-cell class="role-list" :title="item.name" :label="item.subtitle" is-link center v-for='(item,index) in role' :key='index' @click="selectRole(item)"/>
                </van-cell-group>
            </div>
            <div class="form"  v-if='active==2'>
                <form-parent v-if="formType=='parent'" :regInfo='regInfo' @close="toPageMy"/>
                <form-teacher v-if="formType=='teacher'" :regInfo='regInfo' @close="toPageMy"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import searchBar from './../module/search/searchBar'
import addSchool from './../module/addSchool'

// 表单
import formParent from './../module/form/parent'
import formTeacher from './../module/form/teacher'

export default {
    name:'register',
    components: {
        searchBar,
        addSchool,
        formParent,
        formTeacher
    },
    computed: {
      ...mapGetters(['userPointState'])
    },
    data () {
        return {
            show:false,
            active:0,
            list: [],
            takeUp: false,
            startX:'',
            startY:'',
            location:'',
            prompt:'输入幼儿园名称/拼音',
            role:[{
                name:'家长',
                subtitle:'亲子阅读 在线交流 分享阅读',
                type:'parent'
            },{
                name:'老师',
                subtitle:'阅读课教学 阅读方法 育儿交流',
                type:'teacher'
            },{
                name:'园长/校长',
                subtitle:'学校风采 掌握教育动态',
                type:'headmaster'
            }],
            regInfo:{
                school:'',
                role:'',
            },
            formType:'',
        }
    },
    methods: {
        ...mapActions(['getSchoolList']),
        onLoad() {
            this.page++
            let products = {
                page:this.page,
                location:this.userPointState.location
            }
            this.getSchoolList(products).then(res=>{
                this.list = this.list.concat(res.pois)
                this.loading = false
                if (this.list.length >= res.count) {
                    this.finished = true
                }
            })
        },
        onClickLeft(){
            switch(this.active)
            {
                case 0:
                    this.$router.go(-1)
                break
                case 1:
                    this.active = 0
                break
                case 2:
                    this.active = 1
                break
            }
 
        },
        selectSchool(school){
            this.regInfo.school = school.name
            this.active = 1
        },
        selectRole(role){
            this.regInfo.role = role.name
            this.formType = role.type
            this.active = 2
        },
        toPageMy(){
            this.$router.push({name:'my'})
        }
    }
}
</script>
<style scoped>
.container{
    padding-top: 2.8125rem /* 45/16 */;
}

.register{
    padding-bottom: 5.5rem /* 88/16 */;
}

.search-module{
    width: 100%;
    height: 2.875rem /* 46/16 */;
}
</style>
