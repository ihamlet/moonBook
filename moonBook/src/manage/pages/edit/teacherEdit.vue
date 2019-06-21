<template>
  <div class="teacher-edit page-padding">
    <van-nav-bar :title="$route.query.title" :border='false' @click-right="past">
      <div class="is-confim" :style="{color:`${isConfirm == 1?'#F56C6C':'#67C23A'}`}" slot="right" v-if='form.is_master == 0&&$route.query.type == "edit"'>
        {{isConfirm == 0?'通过':'请出'}}
      </div>
    </van-nav-bar>

    <div class="container">
      <van-cell-group>
        <van-field size='large' :border='false' v-model="form.username" :readonly="pageType=='edit'" input-align='right'
          :required="pageType!='edit'" label="姓名" placeholder="请输入用户姓名" />
        <van-field size='large' :border='false' v-model="form.mobile" :readonly="pageType=='edit'" input-align='right'
          :required="pageType!='edit'" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group :border='false'>
        <van-cell title="班级" :border='false' :value="form.banji_name?formatBanjiTitle(form.banji_name):'请设置班级'" is-link
          @click="toSelectBanjiPage" />
        <van-cell title="职务" :border='false' :value="form.duty" is-link @click="show = true" :arrow-direction='show?"up":"down"' />
      </van-cell-group>
      <van-panel title="角色设置" desc="对应角色设有不同权限" :status="form.role_id?'':'尚未取得设置权限'">
         <van-switch-cell v-for='(item,index) in roles' :disabled='!item.disabled' :key="index" :title="item.role_name" :value="form.role_id" :active-value='String(index)' active-color='#67C23A' @input='onSwitchChange(index)' value-class='switch-cell-value'/>
      </van-panel>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar title="职务" :visibleItemCount='3' :columns="columns" @change="selectDuty" @cancel="onCancel"
        @confirm="show = false" />
      <van-field size='large' input-align='right' label="填写职务" v-model="duty" placeholder="请填写职务" />
    </van-popup>

    <div class="footer-bar">
      <van-button class="theme-btn" square :loading='loading' loading-text='正在提交中...' type="primary" size="normal"
        @click="sumbit">提 交</van-button>
    </div>
  </div>
</template>
<script>
import axios from './../../../components/lib/js/api'
import { slectDuty } from './../../../components/lib/js/schoolInfo'
import { getBanjiYear, newBanjiTitle, verification } from './../../../components/lib/js/mixin'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'teacherEdit',
  mixins: [getBanjiYear, newBanjiTitle, verification],
  computed: {
    ...mapGetters('manage', ['manageSchoolInfo'])
  },
  data() {
    return {
      show: false,
      pageType: this.$route.query.type,
      form: {
        ...this.$route.query
      },
      isConfirm: this.$route.query.is_confirm,
      columns: slectDuty,
      regPhone: /^1[34578]\d{9}$/,
      loading: false,
      duty: '',
      roles:[]
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData',
    duty(val) {
      this.form.duty = val
    }
  },
  methods: {
    ...mapActions('manage', ['getSchoolList']),
    fetchData() {
        axios.get('/SchoolManage/teacher/getRoles').then(res=>{
            switch(res.data.status){
                case 1:
                    let arr = []
                    let dvtObj = this.getDomDvt('修改老师')
                    let dvtArr = dvtObj.value
                  
                    let userDvtArr = []

                    dvtArr.map(e =>{
                        if(e.when == Number(this.manageSchoolInfo.role_id)){
                            userDvtArr = e.value
                        }
                    })

                    res.data.data.map(element=>{
                        let obj = {
                            ...element
                        }

                        userDvtArr.map(e=>{
                            if(e == Number(element.id)){
                                obj.disabled = true
                            }
                        })

                        arr.push(obj)
                    })

                    this.roles = arr

                    break
                default:
                    this.$toast(res.data.msg)
            }
        })
    },
    past() {

      let apiType = this.isConfirm == 1 ? 'kick' : 'check'

      axios.get(`/SchoolManage/teacher/${apiType}`, {        params: {
          id: this.$route.query.id
        }      }).then(res => {
        switch (res.data.status) {
          case 1:
            this.isConfirm = `${apiType == 'kick' ? 0 : 1}`
            this.$toast.success(res.data.msg)
            break
          default:
            this.$toast(res.data.msg)
        }
      })

    },
    onSwitchChange(index) {

      let warning

      switch (index) {
        case 3:
          warning = `此操作将会把您的学校群主操作权限移交给${this.form.username},您确定吗?`
          break
        case 2:
          warning = `${this.isMaster == 1 ? `确定要取消${this.form.username}的管理权限吗?` : `确定要将${this.form.username}设置为管理员吗?`}`
          break
        case 1:
          warning = `此操作将会取消${this.form.username}的管理权限,您确定吗?`
          break
        default:
          warning = `此操作将会变更${this.form.username}的相关权限,您确定吗?`
      }

      this.$dialog.confirm({
        message: warning
      }).then(() => {

        let mun = index == this.form.role_id?'0':String(index)

        axios.post('/SchoolManage/teacher/edit', {
          ...this.form,
          role_id: mun
        }).then(res => {
          switch (res.data.status) {
            case 1:
              this.form.role_id = mun
              this.getSchoolList()
              break
            default:
              this.$toast(res.data.msg)

          }
        })
      }).catch(() => {
        // on cancel
      })

    },
    selectDuty(picker, value, index) {
      this.form.duty = value
    },
    onCancel() {
      this.show = false
      this.form.duty = this.$route.query.duty
    },
    toSelectBanjiPage() {
      this.$router.replace({
        name: 'banjiList',
        query: {
          ...this.$route.query,
          year: this.classYear,
          back: this.$route.name
        }
      })
    },
    // formatBanjiTitle(text) {
    //     if (text && text.indexOf('班') == -1) {
    //         return text + '班'
    //     } else {
    //         let arr = text.split('')
    //         let newArr = [...new Set(arr)]
    //         return newArr.join('')
    //     }
    // },
    sumbit() {
      switch (this.$route.query.type) {
        case 'edit':
          this.$dialog.confirm({
            message: `您确定要修改${this.form.username}的相关信息吗?`
          }).then(() => {
            this.loading = true
            axios.post('/SchoolManage/teacher/edit', { ...this.form }).then(res => {
              this.loading = false
              switch (res.data.status) {
                case 1:
                  this.$toast.success(res.data.msg)
                  this.$router.go(-1)
                  break
                default:
                  this.$toast(res.data.msg)
              }
            })
          }).catch(() => {
            // on cancel
          })
          break
        case 'add':
          if (!this.form.username) {
            this.$toast('请填写姓名')
          } else if (!this.form.mobile) {
            this.$toast('请填写手机号')
          } else if (this.form.username.match(/^[\u4e00-\u9fa5]{2,4}$/i) == null) {
            this.$toast('请正确填写姓名')
          } else if (!this.regPhone.test(this.form.mobile)) {
            this.$toast('请正确填写手机号')
          } else {
            this.loading = true
            let data = {
              ...this.$route.query,
              ...this.form
            }

            axios.post('/SchoolManage/teacher/edit', data).then(res => {
              this.loading = false
              switch (res.data.status) {
                case 1:
                  this.$toast.success(res.data.msg)

                  this.$router.replace({
                    name: 'share',
                    query: {
                      school_id: this.$route.query.school_id,
                      school_name: this.$route.query.school_name,
                      banji_id: this.$route.query.banji_id,
                      banji_name: this.$route.query.banji_name,
                      invite_code: this.$route.query.invite_code,
                      user_id: this.$route.query.user_id
                    }
                  })

                  break
                default:
                  this.$toast(res.data.msg)
              }
            })
          }
          break
      }
    }
  }
}
</script>
<style scoped>
.footer-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 2019;
}

.theme-btn {
  width: 100%;
}

.prompt-text {
  font-size: 12px;
  color: #f56c6c;
  margin-right: 15px;
}

.column {
  justify-content: space-between;
}
</style>
