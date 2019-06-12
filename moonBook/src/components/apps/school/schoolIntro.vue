<template>
  <div class="school-intro page-padding">
    <van-nav-bar :zIndex='999' title='学校介绍' :class="fixedHeaderBar?'theme-nav':''" fixed :border='false' @click-right="edit">
      <div :class="fixedHeaderBar?'nav-bar-right':'theme-color'" slot="right" v-if='userDataState.teacher_school_id == $route.query.id'>
        <van-button round :class="readonly?'theme-btn':''" type="primary" size="small"> {{readonly?'编辑':'完成'}} </van-button>
      </div>
    </van-nav-bar>
    <div class="head theme-background" ref='domHeight'>
      <img class="bg-school-3d" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/school-intro.png" />
    </div>
    <div class="container">
      <div class="module school-info">
        <div class="cell flex">
          <div class="logo" @click="uploaderType('logo')">
            <van-uploader :after-read="onRead" :disabled='readonly'>
              <img :src="schoolInfo.logo" @error="imgError" v-if='schoolInfo.logo' />
              <van-icon name="photograph" v-else />
            </van-uploader>
          </div>
          <div class="info">
            <div class="title">
              <van-field class="text-input school-title" v-model="schoolInfo.title" placeholder="请输入学校名称" :border='false' :readonly='readonly' />
            </div>
            <div class="text level flex flex-align">
              <div class="text school-level" @click="select('level')">{{schoolInfo.level?schoolInfo.level:'未定级'}}</div>
              <div class="scale text" @click="select('scale')">
                {{schoolInfo.member_range}}
              </div>
            </div>
            <div class="text school-type" @click="select('type')">{{schoolInfo.run_type}}</div>
            <div class="addr">
              <van-field class="text-input" v-model="schoolInfo.addr" type="textarea" rows="1" autosize placeholder="请输入学校地址" :border='false' :readonly='readonly' />
            </div>
          </div>
          <div class="code">
            <img :src="codeImgURL" />
          </div>
        </div>
      </div>
      <div class="module school-details" v-for='(item,index) in details' :key="index">
        <div class="module-school-title flex flex-align">
          <img :src="titleBanner[index]" />
        </div>
        <div class="content" v-if='item.title == "关于我们"'>
          <div class="about" v-if='item.content || !readonly'>
            <van-field v-model="item.content" type="textarea" autosize :placeholder="item.content?item.content:'请添加关于我们'" :readonly='readonly' :border='false' />
            <div class="img-wrap">
              <van-row :gutter="5">
                <van-col :span="12" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
                  <div class="img-grid" v-if='photo || !readonly' @click="uploaderType(index,photoIndex)">
                    <div class="delete-photo" v-if='photo && !readonly' @click="deletePhoto">
                      <i class="iconfont">&#xe647;</i>
                    </div>
                    <img class="img-preview" :src="photo" v-if='photo' preview='0'/>
                    <van-uploader class="img-uploader-grid" :after-read="onRead" :disabled='readonly' v-else-if='hackReset'>
                      <div class="uploader-prompt">
                        <van-icon class="img-uploader-icon" name="photograph" />
                        <div class="prompt-text">请上传图片</div>
                      </div>
                    </van-uploader>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="not-content" v-else>
            尚未添加
          </div>
        </div>
        <div class="content" v-if='item.title=="风采展示"'>
          <div class="video" v-if='(item.video || !readonly) && hackReset'>
            <video ref='videoPlayer' id='video' controls='controls' v-if='item.video.photo' :src="item.video.photo"
              :poster="item.video.thumb" preload="auto" x-webkit-airplay='true' airplay="allow" webkit-playsinline="true"
              x5-playsinline playsinline="true"></video>
            <div class="video-prompt theme-color" @click="selectFileVideo(index)" v-else>请上传视频</div>
            <div class="re-upload" v-if='!readonly&&item.video.photo' @click="selectFileVideo(index)">
              <div class="theme-color">没有拍摄好? 点击重新上传</div>
              <div class="prompt-text">横向拍摄 视野更广</div>
            </div>
          </div>
          <div class="no-list" v-else>
            尚未添加
          </div>
        </div>
        <div class="content" v-if='item.title=="办学特色"'>
          <div class="item" v-if='item.list.length > 0 || !readonly'>
            <div class="item-content" v-for='(content, itemIndex) in item.list' :key="itemIndex">
              <van-row>
                <van-col :span="7">
                  <div class="img-grid" @click="uploaderType(index,itemIndex)">
                    <div class="delete-photo" v-if='content.img && !readonly' @click="deletePhoto">
                      <i class="iconfont">&#xe683;</i>
                    </div>
                    <img class="img-preview" :src="content.img" v-if='content.img' preview='1'/>
                    <van-uploader class="img-uploader-grid" :after-read="onRead" :disabled='readonly' v-else-if='hackReset'>
                      <div class="uploader-prompt">
                        <van-icon class="img-uploader-icon" name="photograph" />
                        <div class="prompt-text">请上传图片</div>
                      </div>
                    </van-uploader>
                  </div>
                </van-col>
                <van-col :span="17">
                  <div class="cell">
                    <van-field class="text-input sub-title" v-model="content.sub" :placeholder="content.sub?content.sub:'请输入标题'"
                      :border='false' :readonly='readonly' />
                  </div>
                  <van-field v-model="content.content" type="textarea" autosize :placeholder="content.content?content.content:'请输入内容'"
                    :readonly='readonly' :border='false' />
                </van-col>
              </van-row>

              <div class="delete-item" v-if='!readonly' @click="delItem(itemIndex)">
                <i class="iconfont">&#xe683;</i>
              </div>
            </div>
            <div class="add-item theme-color" @click="addItem" v-if='!readonly'>
              添加
            </div>
          </div>
          <div class="no-list" v-else>
            尚未添加
          </div>
        </div>
        <div class="content" v-if='item.title == "招生简章"'>
          <div class="chapter" v-if='item.content.length > 0 || !readonly'>
            <div class="cell">
              <p class="honorifics">尊敬的家长朋友：</p>
            </div>
            <div class="chapter-item" :class="readonly?'chapter-field-item':''" v-for='(chapter,chapterIndex) in item.content'
              :key="chapterIndex">
              <van-field :class="readonly?'chapter-field':''" v-model="chapter.text" type="textarea" autosize
                :placeholder="chapter.text?chapter.text:'请输入内容'" rows="1" :readonly='readonly' :border='false' />
              <div class="delete-item" v-if='!readonly' @click="delChapter(chapterIndex)">
                <i class="iconfont">&#xe683;</i>
              </div>
            </div>
            <div class="add-item theme-color" v-if='!readonly' @click="addChapter">添加段落</div>
          </div>
          <div class="not-content" v-else>
            尚未添加
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bar flex flex-align">
      <van-button class="btn" type="primary" @click="phoneDialogShow = true" v-if='!readonly'>设置电话</van-button>
      <a class="btn flex flex-align flex-justify a-tel" :href="`tel:${schoolInfo.phone}`" v-else>
        <i class="iconfont">&#xe66a;</i>
        咨询电话
      </a>
      <van-button class="btn theme-btn" type="primary" @click="toSchoolHome">校园主页</van-button>
    </div>

    <van-popup v-model="progressIsShow" class="progress-popup" :close-on-click-overlay='false'>
      <div class="progress">
        <div class="upload-upload">视频正在上传中...</div>
        <van-progress v-if='percent!=0' :percentage="percent" :show-pivot='false' color="linear-gradient(to right, #00BCD4, #0084ff)" />
      </div>
    </van-popup>

    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" @change="onChange" />
    </van-popup>

    <van-dialog v-model="phoneDialogShow" title="设置联系电话" show-confirm-button :before-close='onBeforeClose' getContainer='#app'>
      <van-field type="tel" maxlength="11" class="phone-field" input-align='center' v-model="schoolInfo.phone"
        placeholder="请输入手机号" />
    </van-dialog>

    <van-dialog v-model="helpShow" confirmButtonText='我知道了' getContainer='#app'>
      <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/demo.gif">
      <div class="tips-help-text">请点选您需要修改的内容，进行修改。</div>
    </van-dialog>

    <input type="file" accept="video/*" ref='selectFileVideo' data-type='video' hidden @change='doUpload'>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import QRcode from 'qrcode'
import { schoolLevel, schoolType, shcoolScale } from './../../lib/js/schoolInfo'
import { compress } from './../../lib/js/util'
import { watchScroll } from './../../lib/js/mixin'
import { mapGetters,mapActions,mapState } from 'vuex'

export default {
  name: 'school-intro',
  mixins:[watchScroll],
  computed: {
    ...mapState('openWX',['ready']),
    ...mapGetters(['userDataState']),
    item() {
      let data = {
        details: this.schoolInfo.introduce,
        title: `${this.schoolInfo.title}的学校主页`,
        imgUrl: location.origin + this.schoolInfo.logo
      }

      return data
    }
  },
  data() {
    let u = navigator.userAgent
    return {
      isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //安卓终端
      isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      schoolInfo: '',
      readonly: true,
      codeImgURL: '',
      titleBanner: [
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/school-intro-icon/title-关于我们.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/school-intro-icon/title-风采展示.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/school-intro-icon/title-办学特色.png',
        'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/school-intro-icon/title-招生简章.png',
      ],
      details: [{
        title: '关于我们',
        content: '',
        photos: ['', '', '', '', '', '', '', '']
      }, {
        title: '风采展示',
        video: ''
      }, {
        title: '办学特色',
        list: []
      }, {
        title: '招生简章',
        content: []
      }],
      type: '',
      ossSign: '',
      percent: '',
      hackReset: true,
      progressIsShow: false,
      phoneDialogShow: false,
      show: false,
      selectType: '',
      columns: [],
      helpShow: false,
      regPhone: /^1[34578]\d{9}$/
    }
  },
  created() {
    this.fetchData()
  },
  updated(){   
    this.wxShare()
  },
  watch: {
    '$router': 'fetchData',
    readonly(val){
      if(localStorage.getItem(`${this.$route.name}-help`)){
        this.helpShow = false
      }else{
        this.helpShow = !val
        localStorage.setItem(`${this.$route.name}-help`,true)
      }

      if(val){
        this.$dialog.confirm({
          message: `您确定要更新${this.schoolInfo.title}的学校介绍信息吗？`
        }).then(() => {
          this.schoolInfo.details =  JSON.stringify(this.details)  
          axios.post('/book/school/edit', this.schoolInfo).then(res=>{
            switch(res.data.status){
              case 1:
                this.$toast.success(res.data.msg)
                break
            }
          })
        }).catch(() => {
            this.fetchData()
        })
      }
    },
    ready(){
      this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX', ['share']),
    wxShare(){
      const self = this 
      let data = {
        item: self.item,
        success() {
          self.$router.go(-1)
        }
      }
      self.share(data)
    },
    fetchData() {
      let data = {
        params: {
          school_id: this.$route.query.id
        }
      }

      axios.get('/book/school/get_info', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.schoolInfo = res.data.data
            this.details[0].content = res.data.data.introduce

            if(res.data.data.details){
              this.details = JSON.parse(res.data.data.details)
            }
            break
        }
      })

      axios.get('/book/api/oss_sign').then(res => {
        this.ossSign = res.data.data
      })

      this.qrcode()
    },
    edit() {
      this.readonly = !this.readonly
      if (this.readonly) {
        this.details[2].list.forEach((e, i) => {
          if (!e.sub || !e.img) {
            this.details[2].list.splice(i, this.details[2].list.length ? this.details[2].list.length : 1)
          }
        })

        this.details[3].content.forEach((e, i) => {
          if (!e.text) {
            this.details[3].content.splice(i, this.details[3].content.length ? this.details[3].content.length : 1)
          }
        })
      }
    },
    uploaderType(type, index) {
      this.type = [type, index]
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    qrcode() {
      if(location.href){
        let link = `${location.href.replace('/#', '/?#')}`
        QRcode.toDataURL(link).then(url => {
          this.codeImgURL = url
        }).catch(err => {
          console.error(err)
        })
      }
    },
    selectFileVideo(type) {
      this.type = [type]
      this.$refs.selectFileVideo.click()
    },
    // 上传视频
    doUpload(e) {
      let file = e.target.files[0]
      let type = e.target.dataset.type
      let formData = new FormData()
      //  动态获取视频截取大小以获取视频封面
      let size = e.target.files[0].size / 1024 / 1024 / 2

      let sizeVal

      if (this.isIOS) {
        sizeVal = 3
      } else {
        sizeVal = size > 3 ? 3 : size
      }

      let maxSize = 1024 * 1024 * sizeVal
      let blob = file.slice(0, maxSize)

      formData.append('file', blob, file.name)

      let url = '/book/file/get_video_screen'

      axios({
        url: url,
        data: formData,
        method: 'post',
        onUploadProgress: p => {
          this.progressIsShow = true
          this.percent = 1
        }
      }).then(res => {
        let info = res.data.data

        this.details[this.type[0]].video = {
          thumb: info.thumb,
          rotate: info.rotate,
          duration: Math.floor(info.duration) || 15
        }

        this.upOssMedia(type, file)
      })
    },
    upOssMedia(type, file) {
      if (!this.ossSign) {
        alert('未能获取上传参数')
      }
      let url = this.ossSign.host
      let data = new FormData()
      let key = this.ossSign.dir + '/' + Date.now() + file.name
      let path = url + '/' + this.ossSign.dir + '/' + Date.now() + file.name

      data.append('key', key)
      data.append('OSSAccessKeyId', this.ossSign.accessid)
      data.append('policy', this.ossSign.policy)
      data.append('success_action_status', 200)
      data.append('signature', this.ossSign.signature)
      data.append('file', file)

      axios({
        url: url,
        data: data,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then(res => {
        this.hackReset = false

        this.details[this.type[0]].video.photo = path

        this.$nextTick(() => {
          this.hackReset = true
        })

        this.percent = 0
        this.progressIsShow = false
      })
    },
    // 上传图片
    onRead(file) {
      compress(file.content, 1200, 0.8, 'blob').then(val => {
        val.toBlob(blob => {
          this.upOssPhoto(blob, file, file.content)
        })
      })
    },
    upOssPhoto(blob, file, base64) {
      let img = new Image()
      img.src = base64

      let fd = new FormData()
      let url = this.ossSign.host
      let key = this.ossSign.dir + '/' + Date.now() + file.name
      let path = url + '/' + this.ossSign.dir + '/' + Date.now() + file.name

      fd.append('key', key)
      fd.append('OSSAccessKeyId', this.ossSign.accessid)
      fd.append('policy', this.ossSign.policy)
      fd.append('success_action_status', 200)
      fd.append('signature', this.ossSign.signature)
      fd.append('file', blob, file.name)

      axios({
        url: url,
        data: fd,
        method: 'post',
        onUploadProgress: p => {
          this.percent = Math.floor(100 * (p.loaded / p.total))
        }
      }).then((res) => {

        switch (this.type[0]) {
          case 'logo':
            this.schoolInfo.logo = `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`
            break
          case 0:
            this.details[this.type[0]].photos[this.type[1]] = `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`
            break
          case 2:
            this.details[this.type[0]].list[this.type[1]].img = `${path}?x-oss-percent=image/resize,m_fill,h_200,w_200`
            break
        }

        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })

        this.percent = 0
      })
    },
    deletePhoto() {
      this.hackReset = false

      switch (this.type[0]) {
        case 0:
          this.details[this.type[0]].photos[this.type[1]] = ''
          break
        case 2:
          this.details[this.type[0]].list[this.type[1]].img = ''
          break
      }

      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    addChapter() {
      this.details[3].content.push({
        text: ''
      })
    },
    addItem() {
      this.details[2].list.push({
        sub: '',
        content: '',
        img: ''
      })
    },
    delItem(itemIndex) {
      this.details[2].list.splice(itemIndex, 1)
    },
    delChapter(chapterIndex) {
      this.details[3].content.splice(chapterIndex, 1)
    },
    toSchoolHome() {
      this.$router.push({
        name: 'apps-school',
        query: {
          id: this.$route.query.id
        }
      })
    },
    select(type) {
      this.selectType = type
      if (!this.readonly) {
        this.show = true
        switch (type) {
          case 'level':
            this.columns = schoolLevel
            break
          case 'scale':
            this.columns = shcoolScale
            break
          case 'type':
            this.columns = schoolType
            break
        }
      }
    },
    onChange(picker, value, index) {
      switch (this.selectType) {
        case 'level':
          this.schoolInfo.level = value
          break
        case 'scale':
          this.schoolInfo.member_range = value
          break
        case 'type':
          this.schoolInfo.run_type = value
          break
      }
    },
    onBeforeClose(action, done) {
      if (!this.regPhone.test(this.schoolInfo.phone)) {
        done(false)
        this.$toast('请输入正确手机号')
      } else {
        done()
      }
    }
  }
}
</script>
<style scoped>
.head {
  height: 150px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.head .bg-school-3d {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

.container {
  padding: 0 10px;
  margin-top: -25px;
  position: relative;
}

.module {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 10px 0;
}

.cell {
  padding: 0 15px;
}

.school-title {
  font-size: 16px;
  font-weight: 700;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  line-height: 43px;
  background: #f2f6fc;
  position: relative;
}

.logo img{
  object-fit: cover;
}

.info {
  flex: 3;
  margin-left: 10px;
}

.code {
  flex: 1;
}

.nav-bar-right {
  color: #fff;
}

.module-school-title {
  margin: 0 auto;
  width: 180px;
}

.img-wrap {
  padding: 0 15px;
}

.img-grid {
  background: #f2f6fc;
  border-radius: 8px;
  position: relative;
}

.img-uploader-grid {
  width: 100%;
  padding-bottom: 100%;
  position: absolute;
}

.uploader-prompt {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 30px;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  white-space: nowrap;
}

.delete-photo {
  position: absolute;
  z-index: 10;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  right: 0;
}

.prompt-text {
  font-size: 13px;
  color: #909399;
}

.add-photo-video {
  width: 180px;
  height: 120px;
  background: #c0c4cc;
}

.video-prompt {
  text-align: center;
  height: 180px;
  line-height: 180px;
}

.video {
  padding: 20px 15px;
}

#video {
  border-radius: 8px;
  overflow: hidden;
}

.re-upload {
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
}

.progress-popup {
  background: transparent;
  width: 100%;
  height: 70vh;
}

.upload-upload {
  margin-bottom: 20px;
}

.progress {
  color: #fff;
  text-align: center;
}

.add-item {
  text-align: center;
  height: 46px;
  line-height: 46px;
}

.item-content {
  padding-top: 20px;
  padding-left: 15px;
}

.sub-title {
  font-weight: 700;
}

.delete-item {
  position: absolute;
  right: 10px;
  top: 0;
  color: #fff;
  width: 20px;
  height: 20px;
  text-align: center;
}

.delete-item i.iconfont {
  font-size: 20px;
  color: #f56c6c;
}

.chapter {
  padding: 20px 0;
}

.item-content,
.chapter-item {
  position: relative;
}

.chapter-item {
  padding: 10px 0;
}

.chapter-field {
  padding: 0 15px;
}

.chapter-item.chapter-field-item {
  padding: 0;
}

.honorifics {
  color: #323233;
  font-size: 13px;
}

.footer-bar {
  padding: 10px 15px;
}

.footer-bar .btn.theme-btn {
  flex: 1.5;
  margin-left: 15px;
}

.footer-bar .btn {
  flex: 1;
}

a.a-tel {
  background: #07c160;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  border-radius: 2px;
}

.text {
  font-size: 13px;
  color: #323233;
  height: 24px;
  line-height: 24px;
}

.school-level {
  margin-right: 10px;
}

.phone-field {
  font-size: 18px;
  font-weight: 700;
}

.tips-help-text{
  text-align: center;
  font-size: 14px;
  height: 46px;
  line-height: 46px;
}
</style>
<style>
.chapter-field textarea {
  text-indent: 20px;
}

.text-input.van-cell{
  padding: 0;
}
</style>

