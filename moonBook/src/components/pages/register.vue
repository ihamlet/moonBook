<template>
  <div class="register">
    <van-nav-bar :title="$route.meta.title" fixed :zIndex='99' :border='false'>
      <div class="icon-right" slot="right" @click="toHelp">
        <i class="iconfont">&#xe618;</i>
      </div>
    </van-nav-bar>
    <div class="container" ref='listContainer'>
      <div class="identity">
        <van-cell-group>
          <van-cell :border='false' class="role-list" :title="item.name" :label="item.subtitle" is-link center v-for='(item,index) in role'
            :key='index' @click="selectRole(item)">
            <div class="icon iconfont" :class="item.iconClass" slot="icon"></div>
          </van-cell>
        </van-cell-group>

        <van-cell-group>
          <div class="form-title">办卡</div>
          <van-cell :border='false' is-link center title='办理老师卡' label="老师卡更实惠" @click="onAcceptSchool" v-if='userDataState.teacher_school_id > 0'>
            <div class="icon-accept" slot="icon">
              <i class="iconfont teacher-card">&#xe66c;</i>
            </div>
          </van-cell>

          <van-cell :border='false' is-link center title='办理借书卡' label="放学借上学还" @click="toAccept">
            <div class="icon-accept" slot="icon">
              <i class="iconfont accept-card">&#xe620;</i>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <slogan />

    <van-action-sheet v-model="isSelectSchool" :actions="schoolActions" cancel-text="取消" @select="onSelect" @cancel="isSelectSchool = false" />

    <div class="fixed-button">
      <van-button class="theme-btn" square type="primary" size="large" @click="toWmPage">学校入驻</van-button>
    </div>
  </div>
</template>
<script>
import slogan from './../module/slogan'
import { mapGetters } from 'vuex'
import axios from './../lib/js/api'
import { isRepeatArr } from './../lib/js/util'
import { manageSchoolList } from './../lib/js/mixin'

export default {
  name: 'register',
  mixins: [ manageSchoolList ],
  components: {
    slogan
  },
  computed: {
    ...mapGetters(['userDataState', 'managerState']),
  },
  data() {
    return {
      show: false,
      isSelectSchool: false,
      list: [],
      takeUp: false,
      startX: '',
      startY: '',
      location: '',
      applyShow: false,
      active: 0,
      prompt: '输入幼儿园名称/拼音',
      role: [
        {
          name: '家长',
          subtitle: '亲子阅读 在线交流 分享阅读',
          type: 'parent',
          iconClass: 'icon-parent',
          index: 0,
        },
        {
          name: '老师',
          subtitle: '阅读课教学 阅读方法 育儿交流',
          type: 'teacher',
          iconClass: 'icon-principal',
          index: 1
        },
        {
          name: '园长/校长',
          subtitle: '学校风采 掌握教育动态',
          type: 'headmaster',
          iconClass: 'icon-teacher',
          index: 1
        }
      ],
      schoolList: []
    }
  },
  watch: {
    '$router': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get('/SchoolManage/school/getSchools').then(res => {
        switch (res.data.status) {
          case 1:
            this.schoolList = isRepeatArr(res.data.data)
            break
          default:
            this.schoolList = []
        }
      })
    },
    selectRole(role) {
      switch (role.index) {
        case 0:
          this.$router.push({
            name: 'edit-child',
            query: {
              type: 'register',
              back: this.$route.name
            }
          })

          localStorage.removeItem('childInfo')
          break
        case 1:
          this.$router.push({
            name: 'edit-manager',
            query: {
              registerType: role.type,
              type: 'add'
            }
          })
          break
      }
    },
    toAccept() {
      this.$router.push({
        name: 'AcceptSchoolList'
      })
    },
    toWmPage() {
      location.href = 'https://fang.wmlife.net/kindergarten/index/register'
    },
    toHelp() {
      location.href = '/book/manual/user'
    },
    onAcceptSchool() {
      if (this.schoolList.length > 1) {
        this.isSelectSchool = true
      } else {
        location.href = `/book/SchoolTeacher/card_apply?sid=${this.schoolList[0].school_id}`
      }
    },
    onSelect(item) {
      location.href = `/book/SchoolTeacher/card_apply?sid=${item.school_id}`
    }
  }
}
</script>
<style scoped>
.container {
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
.teacher-card,
.icon.iconfont {
  font-size: 1.75rem /* 28/16 */;
}

.add-school-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.teacher-card,
.icon-accept {
  margin-right: 0.625rem /* 10/16 */;
}

.iconfont.teacher-card {
  background: linear-gradient(90deg, #ffeb3b, #ff9800);
  -webkit-background-clip: text;
  color: transparent;
}

.iconfont.accept-card {
  background: linear-gradient(90deg, #d400ff, #ff320a);
  -webkit-background-clip: text;
  color: transparent;
}

.fixed-button {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
<style>
.select-school-title.van-cell__title {
  flex: 3;
}
</style>

