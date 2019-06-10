<template>
  <div class="teacher-edit">
    <van-nav-bar title="成员设置" :border='false' @click-right="past">
        <div class="is-confim" :style="{color:`${isConfirm == 1?'#F56C6C':'#67C23A'}`}" slot="right">
            {{isConfirm == 0?'通过':'请出'}}
        </div>
    </van-nav-bar>

    <div class="container">
      <van-cell-group>
        <van-field :border='false' v-model="form.username" input-align='right' required label="姓名" placeholder="请输入用户姓名" />
        <van-field :border='false' v-model="form.mobile" input-align='right' required label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group :border='false'>
        <van-cell title="班级" :border='false' :value="form.banji_name?'':'请设置班级'" is-link  @click="toSelectBanjiPage"/>
        <van-cell title="职务" :border='false' :value="form.duty" is-link @click="show = true" :arrow-direction='show == true?"up":"down"'/>
      </van-cell-group>
      <van-cell-group>
        <van-switch-cell v-model="isChecked.manage" title="是否为管理员" active-color='#67C23A' inactive-color='#F2F6FC'/>
        <van-switch-cell v-model="isChecked.owner" title="是否转让群主" active-color='#67C23A' inactive-color='#F2F6FC'/>
      </van-cell-group>
    </div>

    <van-popup v-model="show" position="bottom">
        <van-picker show-toolbar title="职务" :columns="columns" @change="selectDuty" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { slectDuty } from './../../../components/lib/js/schoolInfo'

export default {
  name: 'teacherEdit',
  data() {
    return {
      show: false,
      form: {
        ...this.$route.query
      },
      isConfirm: this.$route.query.is_confirm,
      isChecked: {
        manage: false,
        owner: false
      },
      columns: slectDuty
    }
  },
  methods: {
        past(){

            let apiType = this.isConfirm == 1?'kick':'check'

            axios.get(`/SchoolManage/teacher/${apiType}`,{params:{
                id: this.item.id
            }}).then(res=>{
                switch(res.data.status){
                    case 1:
                        apiType == 'check'?1:0
                        this.$toast.success(res.data.msg)
                        break
                    default:
                        this.$toast.fail(res.data.msg)
                }
            })

        },
        selectDuty(picker, value, index){
            this.form.duty = value
        },
        onConfirm(){

        },
        onCancel(){
            this.show = false
            this.form.duty = this.$route.query.duty
        },
        toSelectBanjiPage(){
            this.$router.push({
                name:'edit-class',
                query:{
                    
                }
            })
        }
  }
}
</script>
<style scoped>
</style>
