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
                    <van-cell class="role-list" :title="item.name" :label="item.subtitle" is-link center v-for='(item,index) in role' :key='index' @click="selectRole(item)"/>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      show: false,
      list: [],
      takeUp: false,
      startX: '',
      startY: '',
      location: '',
      prompt: '输入幼儿园名称/拼音',
      role: [
        {
          name: '家长',
          subtitle: '亲子阅读 在线交流 分享阅读',
          type: 'parent'
        },
        {
          name: '老师',
          subtitle: '阅读课教学 阅读方法 育儿交流',
          type: 'teacher'
        },
        {
          name: '园长/校长',
          subtitle: '学校风采 掌握教育动态',
          type: 'headmaster'
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    selectRole(role) {
      if(role.type == 'parent'){
        this.$router.push({
          name:'edit-child',
          query:{
            pageTitle:'添加宝贝',
            type:'add'
          }
        })
      }

      if(role.type == 'teacher'){
        this.$router.push({
          name:'edit-teacher',
          query:{
            pageTitle:'成为老师',
            type:'add'
          }
        })
      }
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
</style>
