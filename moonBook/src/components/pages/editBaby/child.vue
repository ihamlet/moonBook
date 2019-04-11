<template>
  <div class="add-child  page-padding">
    <van-nav-bar :title="$route.query.type!='edit'?'添加宝贝':'编辑宝贝'" :right-text="$route.query.type=='edit'?'注销':''" @click-right="onClickRight('delete')" />
    <div class="avatar-uploader">
      <van-uploader :after-read="onRead">
        <div class="prompt" v-if='!childInfo.avatar'>
          <avatar :gender='childInfo.gender' size='big'/>
          <div class="text">请上传头像</div>
        </div>
        <div class="avatar-preview" v-else>
          <img :src="childInfo.avatar" alt="女孩默认头像">
        </div>
      </van-uploader>
    </div>
    <van-cell-group>
      <van-field v-model="childInfo.name" :disabled='isMainParent' input-align='right' label="孩子姓名" placeholder="请输入孩子姓名" :error-message="errorMessage.name" />
      <van-field v-model="childInfo.birthday" :disabled='isMainParent' input-align='right' readonly label="孩子生日" placeholder="请选择日期" :error-message="errorMessage.birthday" @click="pickerShow = true" />
      <van-field v-model="childInfo.relation_name" :disabled='isMainParent' input-align='right' readonly label="您是孩子的？" placeholder="例如：爸爸"  @click="parentShow = true"/>
    </van-cell-group>
    <van-radio-group>
      <van-cell-group>
        <van-cell value='校园设置' title-class='cell-school-title' :title='info.school_name' :label='formatBanjiTitle(info.banji_name)' center is-link @click="!isMainParent&&setSchool($route.query.type)" />
      </van-cell-group>
    </van-radio-group>
    <van-cell-group>
      <van-cell>
        <div class="flex flex-align type-select">
          <div>孩子性别</div>
          <div class="select-type flex flex-align">
            <div class="select-btn" v-for='(item,index) in sexType' :key="index" @click="selectSexType(item,index)">
                <van-button size="small" class="theme-btn" type="primary" :plain='sexTypeIndex==index?false:true' round>{{item}}</van-button>
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>

    <!-- 截图工具 -->
    <van-popup class="cropper-popup" v-model="cropperShow" get-container='#app'>
      <vue-cropper class="theme-cropper" ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
        :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
        :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox" :fixed='option.fixed' :enlarge='.3'></vue-cropper>
      <van-button class="theme-btn" type="primary" :loading='cropperLoading' @click="getCropData" round>完成截图</van-button>
    </van-popup>

    <!-- 日期选择器 -->
    <van-popup class="picker-popup" position="bottom" v-model="pickerShow" get-container='#app'>
      <van-datetime-picker title='日期选择' v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm="pickerShow = false" @cancel='cancelPicker' />
    </van-popup>

    <!-- 家长类型选择器 -->
    <van-popup class="picker-popup" position="bottom" v-model="parentShow" get-container='#app'>
      <van-field v-model="childInfo.relation_name" input-align='right' label="您是孩子的？" placeholder="例如：爸爸"/>
      <van-picker :columns="parentList" :default-index="0" @change='onParentChange'/>
    </van-popup>

    <!-- 提交编辑 -->
    <div class="form-submit" v-if="$route.query.type=='edit'">
      <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="normal" @click="edit">提交修改</van-button>
    </div>

    <!-- 添加宝贝 -->
    <div class="form-submit" v-else>
      <van-button class="theme-btn" :loading='submitLoading' square type="primary" size="normal" @click="submit">提 交</van-button>
    </div>

    <van-popup class="card-routing-popup" v-model="show" get-container='#app'>
      <card-routing :childId='childId'/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapGetters } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { format } from './../../lib/js/util'
import avatar from './../../module/avatar'
import cardRouting from './../../module/cardRouting'

export default {
  name: 'child',
  components: {
    VueCropper,
    avatar,
    cardRouting
  },
  computed: {
    ...mapGetters(['userDataState','userPointState']),
    isMainParent(){
       let b = false    
      if(this.info){
        if(this.info.main_parent_id != this.userDataState.id){
          b = true
        }
      }
      return b
    }
  },
  data() {
    return {
      info: '',
      show:false,
      fileName: '',  
      cropperLoading: false,
      sexTypeIndex: 0,
      submitLoading: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(format(new Date(), 'yyyy') - 20, 0, 0),
      maxDate: new Date(format(new Date(), 'yyyy') - 1, 0),
      currentDate: new Date(format(new Date(), 'yyyy') - 2, 0, 0),
      childInfo: {
        name: '',
        gender: 1,
        avatar: '',
        birthday: '',
        relation_name: '妈妈'
      },
      childId:'',
      sexType:['小王子','小公主'],
      parentShow: false,
      parentList:['妈妈','爸爸','爷爷','奶奶','舅舅','姑姑','小姨','外公','外婆'],
      errorMessage: {
        name: '',
        birthday: ''
      },
      pickerShow: false,
      cropperShow: false,
      isSetSchoolLink:false,
      option: {
        img: '',
        full: false,
        outputType: 'png',
        canMove: false,
        fixedBox: false,
        fixed: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 250,
        autoCropHeight: 250,
        centerBox: true,
        size:.3,
        high: false
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false //去掉页面数据缓存
    localStorage.setItem('childInfo', JSON.stringify(this.childInfo))
    next()
  },
  created() {
    this.fetchData()
  },
  watch: {
    listenData(val) {
      this.childInfo = val
    },
    sexTypeIndex(val) {
      localStorage.setItem('radio', val)
      val == 0 ? this.childInfo.gender = 1 : this.childInfo.gender = 2
    },
    currentDate(val) {
      this.childInfo.birthday = format(new Date(val), 'yyyy-MM-dd')
    },
    $router: 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData']),
    fetchData() {
      if (localStorage['childInfo']) {
        this.childInfo = JSON.parse(localStorage['childInfo'])
      }
      
      if(this.$route.query.type!='add'){
        if(this.$route.query.id){
          let getChildByUserData = {
            params:{
              child_id: this.$route.query.id
            }
          }

          axios.get('/book/baby/getInfo',getChildByUserData).then(res => {
            let date = new Date(res.data.data.birthday * 1000)
            this.childInfo.name = res.data.data.name
            this.childInfo.avatar = res.data.data.avatar
            this.sexTypeIndex = res.data.data.gender == 1?0:1
            this.childInfo.relation_name = res.data.data.relation_name
            this.currentDate = date

            if (res.data.data.is_current_child == 1 || this.userDataState.child_id == this.$route.query.id) {
              this.settingSurrent = true
            }
            this.info = res.data.data
          })
        }
      }else{
        this.info = {
          banji_name: this.$route.query.banji_name,
          school_name: this.$route.query.school_name,
          main_parent_id: this.userDataState.id
        }
      }
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onRead(file) {
      this.cropperShow = true
      this.option.img = file.content
      this.fileName = file.file.name
    },
    getCropData() {
      this.cropperLoading = true
      this.$refs.cropper.getCropBlob(blob => {
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        let fd = new FormData()
        fd.append('file', blob, this.fileName)
        axios.post('/book/file/upload', fd, config).then((res) => {
          this.cropperShow = false
          this.cropperLoading = false
          if (res.data.status === 1) {
            this.childInfo.avatar = res.data.data.thumb
          } else {
            this.$toast.fail('上传失败,请重新上传')
          }
        })
      })
    },
    cancelPicker() {
      this.childInfo.birthday = ''
      this.pickerShow = false
    },
    // 孩子添加编辑API
    operationApi(id) {

      if (id) {
        this.childInfo.id = id
      }
    
      return new Promise((resolve, reject) => {
        axios.post('/book/baby/edit', this.childInfo).then(res => {
          if (res.data.status) {
            this.getUserData()
            resolve(res.data.data.child_id)
          }
        })
      })
    },
    submit(set) {
      if (!this.childInfo.avatar) {
        this.$toast.fail('请上传头像')
      }else if (!this.childInfo.name || this.childInfo.name.match(/^[\u4e00-\u9fa5]{2,4}$/i) == null) {
        this.errorMessage.name = '请正确填写孩子的姓名'
        setTimeout(() => {
          this.errorMessage.name = ''
        }, 2000)
      } else if (this.childInfo.birthday == '') {
        this.errorMessage.birthday = '请填写孩子的生日'
        setTimeout(() => {
          this.errorMessage.birthday = ''
        }, 2000)
      } else {
        this.operationApi().then(res => {
          this.childId = res
          if(this.$route.query.type == 'register'){
            this.show = true
          }else{
            this.$router.push({
              name: 'baby-home',
              query: {
                id: res,
              }
            })

            this.babyJoinSchool(res)
            this.babyJoinBanji(res)
          }
        })
      }
    },
    setSchool(set){
      if(set == 'add' || set == 'register'){
        if (!this.childInfo.avatar) {
          this.$toast.fail('请上传头像')
        }else if (!this.childInfo.name || this.childInfo.name.match(/^[\u4e00-\u9fa5]{2,4}$/i) == null) {
          this.errorMessage.name = '请正确填写孩子的姓名'
          setTimeout(() => {
            this.errorMessage.name = ''
          }, 2000)
        } else if (this.childInfo.birthday == '') {
          this.errorMessage.birthday = '请填写孩子的生日'
          setTimeout(() => {
            this.errorMessage.birthday = ''
          }, 2000)
        } else {
          this.operationApi().then(res => {
            this.$router.push({
              name: 'edit-setting',
              query: {
                id: res,
                back: this.$route.name,
                type: this.$route.query.type
              }
            })
            localStorage.setItem('childInfo', JSON.stringify(this.childInfo))
          })
        }
      }else{
        this.$router.push({
          name: 'edit-setting',
          query: {
            id: this.$route.query.id,
            back: this.$route.name,
            type: this.$route.query.type
          }
        })
      }
    },
    edit() {
      this.operationApi(this.$route.query.id).then(res => {
        if (res) {
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail('修改失败')
        }    
        this.back()
      })
    },
    onInput(checked) {
      if (checked) {
        let data = {
          params:{
            child_id:this.$route.query.id
          }
        }
        
        axios.get('/book/MemberChild/top',data).then(res => {
          switch(res.data.status){
            case 1:
              this.getUserData()
              this.$toast('已设为当前宝贝')
            break
            case 0:
              this.$toast.fail(res.data.data.msg)
            break
          }
        })
      }
    },
    selectSexType(item,index){
      this.sexTypeIndex = index
    },
    back(){
        if(this.$route.query.back){
          this.$router.push({
            name: this.$route.query.back,
            query:{
              id: this.$route.query.id
            }
          })
        }else{
          this.$router.push({
            name:'my-home'
          })
        }
    },
    onClickRight(type) {
      if (type == 'delete') {
        this.$dialog.alert({
          message: `<div class='text-center'>确定要注销吗？</div>`,
          confirmButtonText: '取消',
          cancelButtonText: '确认',
          showCancelButton: true
        }).then(() => {
          this.$router.go(-1)
        }).catch(() => {
          let data = {
            params:{
              child_id:this.$route.query.id
            }
          }
          axios.get('/book/baby/del',data).then(res => {
            this.getUserData()
            this.$router.go(-1)
          })
        })
      }
    },
    formatBanjiTitle(text){
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    onParentChange(picker, values){
      this.childInfo.relation_name = values
    },
    babyJoinSchool(childId) {

      let location = this.userPointState.location.split(',')

      let data = {
          params: {
            child_id: childId,
            school_id: this.$route.query.school_id,
            school_name: this.$route.query.school_name,
            cityname: this.userPointState.city,
            lat: location[1],
            lng: location[0],
          }
        }

      axios.get('/book/babySchool/bind', data).then(res => {

      })
    }, 
    babyJoinBanji(childId){

      let data = {
        params:{
          banji_id: this.$route.query.banji_id,
          child_id: childId
        }
      }

      axios.get('/book/baby/join_banji', data).then(res => {
      
      })
    }
  }
}
</script>
<style>
.add-child .van-cell__title.cell-school-title {
  flex: 4;
}

.form-submit .theme-btn{
  width: 100%;
}
</style>

