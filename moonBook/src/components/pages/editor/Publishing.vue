<template>
  <div class="publishing">
    <van-nav-bar title="编辑文字" right-text='完成' @click-right='onClickCarryOut'/>
    <div class="container">
      <div class="edit-content">
        <quill-editor ref='myQuillEditor' v-model="content" :options="editorOption" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { compress } from './../../lib/js/util'
// import topicList from './../../module/release/topicList'
import { mapActions,mapGetters } from 'vuex'

export default {
  name: 'publishing',
  components: {
    quillEditor,
    // topicList
  },
  computed: {
    ...mapGetters('beautifulArticle',['getArticleList'])
  },
  data() {
    return {
      content: '',
      item:'',
      editorOption: {
        placeholder: '请输入正文',
        modules: {
          toolbar: [
            // ['bold', 'italic', 'image', 'video'],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: "bullet" }],
            ['blockquote']
          ]
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('beautifulArticle',['add','revise']),
    fetchData() {
        if(this.$route.query.onClickType){
          if(this.getArticleList[this.$route.query.index].text){
            this.content = this.getArticleList[this.$route.query.index].text.text
          }
          this.item = this.getArticleList[this.$route.query.index]
        }
    },
    onClickCarryOut() {
      let data = {
        text: this.content,
        type:'text',
        index: this.$route.query.index
      }

      if(this.$route.query.onClickType){
        let reviseData = {
          photos: this.item.photos,
          index: this.$route.query.index,
          data: data
        }
        this.revise(reviseData)
      }else{
        this.add(data)
      }
    
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.container,
.publishing {
  background: #fff;
}
</style>
<style>
.edit-title .van-field__control {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.publishing .ql-toolbar.ql-snow {
  width: 100%;
  background: #f2f2f2;
  z-index: 10;
}

.publishing .edit-content.bar-show .ql-toolbar.ql-snow {
  position: fixed;
  top: 45px;
}

.publishing .ql-toolbar.ql-snow {
  width: 100%;
}

.publishing .ql-toolbar.ql-snow,
.publishing .ql-container.ql-snow {
  border: none;
}

.publishing .ql-editor {
  font-size: 1rem /* 16/16 */;
  padding-bottom: 5rem /* 80/16 */;
}

.publishing .ql-snow.ql-toolbar button,
.publishing .ql-snow .ql-toolbar button{
  height: auto;
  width: auto;
}

.publishing .ql-snow.ql-toolbar button svg, 
.publishing .ql-snow .ql-toolbar button svg{
  width: 1.5625rem /* 25/16 */;
}

.fixed-btn{
  position: fixed;
  bottom:0;
  width: 100%;
}
</style>

