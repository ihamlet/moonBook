<template>
  <div class="register">
    <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' left-text="返回" left-arrow @click-left="onClickLeft">
      <div class="icon-right" slot="right">
        <i class="iconfont">&#xe618;</i>
      </div>
    </van-nav-bar>
    <div class="container" ref='listContainer'>
      <div class="identity">
        <van-cell-group>
          <van-cell class="role-list" :title="item.name" :label="item.subtitle" is-link center v-for='(item,index) in role'
            :key='index' @click="selectRole(item)">
            <div class="icon iconfont" :class="item.iconClass" slot="icon"></div>
          </van-cell>
        </van-cell-group>

        <van-cell-group>
          <div class="form-title">办卡</div>
          <van-cell is-link center title='办理借书卡' label="放学借上学还" @click="toAccept">
            <div class="icon-accept" slot="icon">
              <i class="iconfont accept-card">&#xe620;</i>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <slogan />
    <!-- 借阅卡办理页面 -->
    <van-popup v-model="applyShow" class="page-popup" position="bottom" get-container='#app'>
      <accept @close='applyShow = false' v-model='active' />
    </van-popup>

    <div class="fixed-button">
      <van-button class="theme-btn" square type="primary" size="large" @click="toWmPage">学校入驻</van-button>
    </div>
  </div>
</template>
<script>
import accept from './../module/accept'
import slogan from './../module/slogan'

export default {
  name: 'register',
  components: {
    accept,
    slogan
  },
  data() {
    return {
      show: false,
      list: [],
      takeUp: false,
      startX: '',
      startY: '',
      location: '',
      applyShow: false,
      active:0,
      prompt: '输入幼儿园名称/拼音',
      role: [
        {
          name: '家长',
          subtitle: '亲子阅读 在线交流 分享阅读',
          type: 'parent',
          iconClass: 'icon-parent',
          index:0,
        },
        {
          name: '老师',
          subtitle: '阅读课教学 阅读方法 育儿交流',
          type: 'teacher',
          iconClass: 'icon-teacher',
          index:1
        },
        {
          name: '园长/校长',
          subtitle: '学校风采 掌握教育动态',
          type: 'headmaster',
          iconClass: 'icon-principal',
          index:1
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name:'home'
      })
    },
    selectRole(role) {
      switch (role.index){
        case 0:
          this.$router.push({
            name: 'edit-child',
            query: {
              pageTitle: '添加宝贝',
              type: 'register',
              back: this.$route.name
            }
          })
        break
        case 1:
          this.$router.push({
            name: 'edit-manager',
            query: {
              pageTitle: `${role.name}注册`,
              registerType: role.type,
              type: 'add'
            }
          })
        break
      }
    },
    toAccept() {
      this.applyShow = true
      this.active = 0
    },
    toWmPage(){
      location.href = 'https://fang.wmlife.net/kindergarten/index/register'
    }
  }
}
</script>
<style scoped>
.container{
  padding-top: 2.8125rem /* 45/16 */;
}

.register {
  padding-bottom: 5.5rem /* 88/16 */;
}

.search-module {
  width: 100%;
  height: 2.875rem /* 46/16 */;
}

.icon-parent::before {
  content: '\e624';
  background: linear-gradient(127deg, #ff9800, #f44336);
  -webkit-background-clip: text;
  color: transparent;
}

.icon-teacher::before {
  content: '\e626';
  background: linear-gradient(127deg, #00c2ab, #3e94ff);
  -webkit-background-clip: text;
  color: transparent;
}

.icon-principal::before {
  content: '\e628';
  background: linear-gradient(127deg, #2ad396, #85bb1f);
  -webkit-background-clip: text;
  color: transparent;
}

.icon {
  margin-right: 1.25rem /* 20/16 */;
}

.accept-card,
.icon.iconfont {
  font-size: 1.75rem /* 28/16 */;
}

.add-school-btn{
  position: fixed;
  width: 100%;
  bottom: 0;
}

.icon-accept{
  margin-right: .625rem /* 10/16 */;
}

.iconfont.accept-card{
    background: linear-gradient(90deg, #D400FF,#FF320A);
    -webkit-background-clip: text;
    color: transparent;
}

.fixed-button{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
