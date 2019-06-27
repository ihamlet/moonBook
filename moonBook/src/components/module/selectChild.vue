<template>
    <div class="scroll-x" :class="babyList.length < 4?'align-items':''">
        <div class="flex">
            <div class="scroll-item">
                <div class="baby-item-card add" @click="addBaby">
                <div class="avatar">
                    <i class="iconfont">&#xe727;</i>
                </div>
                <div class="child-name">添加宝贝</div>
                </div>
            </div>
            <div class="scroll-item" v-for='(list,index) in babyList' :key="index">
                <div class="baby-item-card" @click="onSelectBaby(list)" :class="$route.query.id == list.id?'active':''">
                <div class="avatar" v-if="list.avatar">
                    <img :src="list.avatar" @error="imgError" v-http2https/>  
                </div>
                <avatar size='small' avatarClass='border' v-else />
                <div class="child-name" v-line-clamp:20="1">{{list.name}}</div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import axios from './../lib/js/api'
import { mapGetters,mapActions } from 'vuex'

export default {
    name:'select-child',
    props: ['babyList','invite_code'],
    computed: {
      ...mapGetters(['userDataState'])
    },
    methods: {
        ...mapActions(["getUserData"]),
        onInput(data) {
          axios.get('/book/MemberChild/top',data).then(res => {
              switch(res.data.status){
                case 1:
                  this.getUserData()
                break
              }
          })
        },
        addBaby(){
            localStorage.removeItem('childInfo')
            this.$router.push({
                name: 'edit-child',
                query: {
                    pageTitle: '添加宝贝',
                    type: 'add',
                    back: this.$route.name,
                    id: this.$route.query.id,
                    banji_name: this.$route.query.banji_name,
                    school_name: this.$route.query.school_name,
                    main_parent_id: this.userDataState.id,
                    invite_code: this.invite_code
                }
            })
        },
        onSelectBaby(item) {
            this.$emit('onSelect',item)
            let data = {
                params:{
                  child_id: item.id
                }
            }

            this.onInput(data)
        },
        imgError(e) {
            e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
        }
    }
}
</script>
<style scoped>
.scroll-x{
  padding:1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */ 1.25rem /* 20/16 */;
}

.baby-item-card .avatar img{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  margin: 0 auto;
  display: block;
}

.baby-item-card .avatar,
.baby-item-card .avatar img{
  border-radius: 50%;
}

.baby-item-card.active .child-name{
  font-weight: 700;
}

.baby-item-card .child-name{
  text-align: center;
  font-size: .9375rem /* 15/16 */;
  padding: 0 .125rem /* 2/16 */;
  margin-top: .3125rem /* 5/16 */;
}

.baby-item-card.add .avatar{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  text-align: center;
  line-height: 3.125rem /* 50/16 */;
  border: .0625rem /* 1/16 */ dashed #DCDFE6;
  margin:0 auto;
}

.baby-item-card.add .avatar i.iconfont{
  font-size: 1.75rem /* 28/16 */;
  color: #C0C4CC;
}

.baby-item-card.add .child-name{
  color: #909399; 
  font-size: .8125rem /* 13/16 */;
}

.align-items{
  justify-content:center
}

.active{
  transform: scale(1.1)
}

.scroll-item{
  width: 3.75rem /* 60/16 */;
  margin-right: .625rem /* 10/16 */;
}
</style>
