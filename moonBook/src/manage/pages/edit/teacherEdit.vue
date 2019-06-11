<template>
  <div class="teacher-edit">
    <van-nav-bar title="成员设置" :border='false' @click-right="past">
        <div class="is-confim" :style="{color:`${isConfirm == 1?'#F56C6C':'#67C23A'}`}" slot="right" v-if='form.is_master == 0'>
            {{isConfirm == 0?'通过':'请出'}}
        </div>
    </van-nav-bar>

    <div class="container">
      <van-cell-group>
        <van-field :border='false' v-model="form.username" :readonly="pageType=='edit'" input-align='right' :required="pageType!='edit'" label="姓名" placeholder="请输入用户姓名" />
        <van-field :border='false' v-model="form.mobile" :readonly="pageType=='edit'" input-align='right' :required="pageType!='edit'" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group :border='false'>
        <van-cell title="班级" :border='false' :value="form.banji_name?formatBanjiTitle(form.banji_name):'请设置班级'" is-link  @click="toSelectBanjiPage"/>
        <van-cell title="职务" :border='false' :value="form.duty" is-link @click="show = true" :arrow-direction='show?"up":"down"'/>
      </van-cell-group>
      <van-cell-group>
        <van-switch-cell v-model="isMaster" title="是否为管理员" active-color='#67C23A' inactive-color='#F2F6FC' @change='onSwitchChange("setMaster")' value-class='switch-cell-value'/>
        <van-switch-cell v-model="isSchoolHead" :disabled='!$route.query.isSchoolHead' title="设置为学校群主" active-color='#67C23A' inactive-color='#F2F6FC' @change='onSwitchChange("setSchoolHead")' value-class='switch-cell-value'/>
        <van-switch-cell v-model="isHead" :disabled='!$route.query.isHead' title="设置为班级群主" active-color='#67C23A' inactive-color='#F2F6FC' @change='onSwitchChange("setBanjiHead")' value-class='switch-cell-value'/>
      </van-cell-group>
    </div>

    <van-popup v-model="show" position="bottom">
        <van-picker show-toolbar title="职务" :columns="columns" @change="selectDuty" @cancel="onCancel" @confirm="show = false"/>
    </van-popup>

    <div class="footer-bar">
        <van-button class="theme-btn" square type="primary" size="normal" @click="sumbit">提 交</van-button>
    </div>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { slectDuty } from './../../../components/lib/js/schoolInfo'
import { mapActions } from 'vuex'

export default {
  name: 'teacherEdit',
  data() {
    return {
      show: false,
      pageType: this.$route.query.type,
      form: {
        ...this.$route.query
      },
      isConfirm: this.$route.query.is_confirm,
      isMaster: this.$route.query.is_master == 1?true:false,
      isHead: this.$route.query.is_head == 1?true:false,
      isSchoolHead: this.$route.query.is_school_head == 1?true:false,
      columns: slectDuty
    }
  },
  methods: {
      ...mapActions('manage',['getSchoolList']),
        past(){

            let apiType = this.isConfirm == 1?'kick':'check'

            axios.get(`/SchoolManage/teacher/${apiType}`,{params:{
                id: this.$route.query.id
            }}).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.isConfirm = `${apiType == 'kick'?0:1}`
                        this.$toast.success(res.data.msg)
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })

        },
        onSwitchChange(type){
            axios.get(`/SchoolManage/teacher/${type}`,{params:{
                id: this.$route.query.id,
                banji_id: this.$route.query.banji_id
            }}).then(res=>{
                switch(res.data.status){
                    case 1:
                        this.getSchoolList()
                        break
                    default:
                        this.$toast(res.data.msg)
                        
                }
            })     
        },
        selectDuty(picker, value, index){
            this.form.duty = value
        },
        onCancel(){
            this.show = false
            this.form.duty = this.$route.query.duty
        },
        toSelectBanjiPage(){
            this.$router.push({
                name:'edit-class',
                query:{
                    ...this.$route.query,
                    registerType: 'teacher',
                    type:'select',
                    back: this.$route.name
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
        sumbit(){
            this.$dialog.confirm({
                message: `您确定要修改${this.form.username}的相关信息吗?`
            }).then(() => {
                axios.post('/SchoolManage/teacher/edit',{...this.form}).then(res=>{
                    switch(res.data.status){
                        case 1:
                            this.$toast.success(res.data.msg)
                            break
                        default:
                            this.$toast(res.data.msg)
                    }
                })
            }).catch(() => {
                // on cancel
            })
        }
  }
}
</script>
<style scoped>
.footer-bar{
    width: 100%;
    position: fixed;
    bottom: 0;
}

.theme-btn{
    width: 100%;
}
</style>
