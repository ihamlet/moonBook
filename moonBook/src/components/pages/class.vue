<template>
  <div class="edit-class page-padding">
    <van-nav-bar :border='false' fixed :title="schoolName" :key='$route.query.id'/>
    <div class="container">
      <div class="baby-info flex flex-justify" v-if='$route.query.registerType!="teacher"'>
        <div class="avatar flex" v-if='avatar'>
          <img :src="avatar" v-http2https>
        </div>
        <avatar v-else />
        <div class="name">{{childInfo.name}}（{{childInfo.age || age}}岁）</div>
        <round class="bg-round" />
      </div>
      <div class="title">{{list.length?'请选择班级':''}} </div>
      <div class="list">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <div class="content" v-if='list.length'>
            <div v-for="(item,index) in list" size='large' :key="index" is-link @click='select(item,index)'>
              <div class="banji-item" v-if='item.year > "0"'>
                <div class="year theme-color" v-if='isYearShow(item,index)'>{{item.year}}</div>
                <van-cell is-link>
                  <div class="banji-cell flex flex-align">
                    <div class="banji-name">
                      {{formatBanjiTitle(item.title)}}
                    </div>
                    <div class="add-value">
                      {{item.student_count}}人已加入
                    </div>
                  </div>
                </van-cell>
              </div>
            </div>

          </div>
          <div class="theme-color no-content" v-else>
            <van-button class="theme-btn" plain type="primary" @click="show = true">请添加班级</van-button>
          </div>
        </van-list>
      </div>

    </div>

    <div class="add-school" v-if='!list'>
      <div class="fx-box flex flex-align">
        <div class="theme-color">没有你所在的班级？</div>
        <van-button class="theme-btn" type="primary" size='small' round @click="show = true">添加班级</van-button>
      </div>
    </div>

    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" getContainer='#app'>
      <div class="dialog-title">添加班级</div>
      <van-cell-group>
        <van-field v-model="className" label="班级名称" placeholder="请输入班级名称" input-align='right' />
      </van-cell-group>
    </van-dialog>

    <van-dialog v-model="showCode" show-cancel-button confirmButtonText='忽略' cancelButtonText='重新选择' :before-close="codeBeforeClose" getContainer='#app'>
      <div class="dialog-title tips"> 
        <div class="prompt-text">填写邀请码直接进入班级</div>
        <div class="prompt">点击忽略请等待老师审核通过</div>
      </div>
      <van-cell-group :border='false'>
        <div class="flex flex-align">
          <van-field class="dialog-field" maxlength='4' v-model="code" placeholder="请填写邀请码" input-align='center' :border='false'/> 
          <van-button type="primary" square size='normal' class="dialog-btn theme-btn" @click="verification">进入班级</van-button>
        </div>
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters, mapActions } from 'vuex'
import { getBanjiYear,newBanjiTitle } from './../lib/js/mixin'
import avatar from './../module/avatar'
import round from './../module/animate/round'

export default {
  name: 'edit-class',
  mixins:[getBanjiYear,newBanjiTitle],
  components: {
    avatar,
    round
  },
  computed: {
    ...mapGetters(["userDataState"]),
    avatar(){
      let imgAvatar
      if(this.$route.query.type == 'type'){
        imgAvatar = this.childInfo.avatar
      }else{
        imgAvatar = this.$route.query.avatar
      }

      return imgAvatar
    },
    age(){
      let date = new Date()
      let year = date.getFullYear()

      let birthdayYear = this.$route.query.birthday?this.$route.query.birthday.substring(0,4) : year
  
      return year-birthdayYear
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      childInfo: '',
      schoolName: '',
      className: '',
      code:'',
      show: false,
      showCode: false,
      itemIndex:0
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions(['getUserData','managerState']),
    fetchData() {
        this.schoolName = this.$route.query.school_name
        this.childInfo = {
          name: this.$route.query.name,
          age: this.$route.query.age || 0,
          avatar: this.$route.query.avatar
        }
    },
    beforeClose(action) {
      if (action === 'confirm') {
        let data = {
          school_id: this.$route.query.school_id,
          title: this.className,
          year: this.classYear
        }

        axios.post('/book/school/edit_banji', data).then(res => {
          switch (res.data.status) {
            case 1:
              if(this.$route.query.registerType == 'teacher'){
                  this.$router.replace({
                    name: 'edit-manager',
                    query: {
                      ...this.$route.query,
                      banji_name: res.data.data.title,
                      banji_id: res.data.data.banji_id,
                      back: this.$route.name
                    }
                  })
              }else{
                this.$router.replace({
                  name: 'edit-child',
                  query:{
                    ...this.$route.query,
                    banji_id: res.data.data.banji_id,
                    child_id: this.$route.query.id,
                    id: this.$route.query.id,
                    invite_code: this.code
                  }
                })
              }
              break
            case 0:
              this.$toast(res.data.msg)
              break
          }
        })
      } else {
        this.$router.go(-1)
      }
    },
    codeBeforeClose(action, done){
      if (action === 'confirm') {
        let BabyJoinBanjiBdind = {
          ...this.$route.query,
          banji_id:this.list[this.itemIndex].banji_id,
          banji_name:this.list[this.itemIndex].title,
          invite_code:this.code || this.list[this.itemIndex].invite_code
        }
        this.$router.replace({
          name:'edit-child',
          query: BabyJoinBanjiBdind
        })
        done()
      } else {
        done()
      }
    },
    select(item, itemIndex) {
      if (this.$route.query.registerType) {
          this.$router.replace({
            name: 'edit-manager',
            query: {
              ...this.$route.query,
              banji_name: item.title,
              banji_id: item.banji_id,
              back: this.$route.name
            }
          })
      } else {
        let BabyJoinBanjiBdind = {
          params: {
            child_id: this.$route.query.id,
            banji_id: item.banji_id,
            banji_name: item.title,
            invite_code: this.code
          }
        }

        if(item.invite_code){
          this.showCode = true
          this.itemIndex = itemIndex
        }else{
          this.babyJoin(BabyJoinBanjiBdind)
        }
        
      }
    },
    babyJoin(data){
      axios.get('/book/baby/join_banji', data).then(res => {
        if (res.data.status == 1) {
          this.$toast('成功提交申请')
          this.$router.go(-1)
          this.getUserData()
        } else {
          this.$toast.fail('加入失败')
          this.$router.replace({
            name:'my-home'
          })
        }
      })
    },
    onLoad() {
      let data = {
        params: {
          page: this.page,
          limit: 20,
          school_id: this.$route.query.school_id,
          year: this.classYear
        }
      }
      axios.get(`/book/SchoolBanji/getList`, data).then(res => {
        switch(res.data.status){
          case 1: 
          if(res.data.count == 0){
            this.show = true
            this.page = 1
            this.loading = false
            this.finished = true
          }else{
            this.page++
            this.list = this.list.concat(res.data.data)
            this.loading = false
            if (this.list.length >= res.data.count) {
              this.finished = true
            }
          }
          break
        }
      })
    },
    // formatBanjiTitle(text) {
    //   if (text && text.indexOf('班') == -1) {
    //     return text + '班'
    //   } else {
    //     let arr = text.split('')
    //     let newArr = [...new Set(arr)]
    //     return newArr.join('')
    //   }
    // },
    isYearShow(item, index) {
      let yearHistory
      if (index > 0) {
        yearHistory = this.list[index - 1].year
      }

      if (item.year == yearHistory) {
        return false
      } else {
        return true
      }
    },
    verification(){
      let BabyJoinBanjiBdind = {
        params: {
          banji_id: this.list[this.itemIndex].banji_id,
          child_id: this.$route.query.id,
          invite_code: this.code
        }
      }

      if(this.code && this.code.length){
        if(this.list[this.itemIndex].invite_code == this.code){
          this.babyJoin(BabyJoinBanjiBdind)
        }else{
          this.$toast('邀请码不正确')
        }
      }else{
        this.$toast('请输入邀请码')
      }
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  height: 3.75rem /* 60/16 */;
  line-height: 5rem /* 80/16 */;
  background: #fff;
}

.container {
  padding-top: 2.8125rem /* 45/16 */;
}

.class-title {
  width: 100%;
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  text-align: center;
  margin-bottom: 0.625rem /* 10/16 */;
}

.baby-info {
  display: grid;
  padding: 0.625rem /* 10/16 */ 0 1.875rem /* 30/16 */ 0;
  position: relative;
}

.baby-info .avatar img {
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 1.25rem /* 20/16 */ auto 0 auto;
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.avatar img {
  border-radius: 50%;
}

.name {
  text-align: center;
  margin-top: 0.625rem /* 10/16 */;
  color: #000;
}

.age {
  text-align: center;
}

.select {
  width: 6.875rem /* 110/16 */;
  padding: 0.3125rem /* 5/16 */ 0;
  margin: 0 auto;
  text-align: center;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 0.5rem /* 8/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
  display: grid;
  overflow: hidden;
  background: #fff;
}

.select .people {
  font-size: 0.8125rem /* 13/16 */;
  height: 1.5rem /* 24/16 */;
  line-height: 1.5rem /* 24/16 */;
  color: #909399;
}

.bg-round {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.banji-cell {
  justify-content: space-between;
}

.year {
  text-align: center;
  background: #fff;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
  font-weight: 700;
}

.page-padding {
  padding-bottom: 7.5rem /* 120/16 */;
}

.no-content {
  width: 100%;
  height: 6.25rem /* 100/16 */;
  text-align: center;
  background: #fff;
}

.add-value{
  color: #C0C4CC;
}

.prompt-text{
  font-size: 18px;
  text-align: left;
  margin: 0 auto;
  text-align: center;
  margin-top: 5px
}

.prompt{
  color:red
}

.dialog-field{
  font-size: 20px;
  font-weight: 700;
}
</style>
