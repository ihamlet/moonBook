(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b824423a","chunk-09d37c60"],{"049d":function(t,e,a){"use strict";var i=a("ca2a"),s=a.n(i);s.a},1170:function(t,e,a){"use strict";var i=a("5af2"),s=a.n(i);s.a},"15a1":function(t,e,a){},"2b51":function(t,e,a){},"2fdb":function(t,e,a){"use strict";var i=a("5ca1"),s=a("d2c8"),o="includes";i(i.P+i.F*a("5147")(o),"String",{includes:function(t){return!!~s(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},3545:function(t,e,a){"use strict";var i=a("f56e"),s=a.n(i);s.a},3606:function(t,e,a){},"49f3":function(t,e,a){"use strict";var i=a("2b51"),s=a.n(i);s.a},5147:function(t,e,a){var i=a("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[i]=!1,!"/./"[t](e)}catch(s){}}return!0}},5902:function(t,e,a){},"5af2":function(t,e,a){},"6b61":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"graphic page-padding"},[a("van-nav-bar",{attrs:{border:!1,fixed:""}},[t.title?a("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[t._v("\n      "+t._s(t.title)+"\n    ")]):a("div",{staticClass:"user-info",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.userDataState.avatar}})])]),a("div",{staticClass:"head-bar-btn theme-color",attrs:{slot:"right"},slot:"right"},[a("van-button",{staticClass:"theme-btn",attrs:{loading:0!=t.percent,"loading-text":"上传中",type:"primary",size:"small",round:""},on:{click:t.onClickRelease}},[t._v("发布")])],1)]),a("div",{staticClass:"textarea-module"},[0==t.percent||100==t.percent||t.progressIsShow?t._e():a("van-progress",{attrs:{percentage:t.percent,"show-pivot":!1,color:"linear-gradient(to right, #00BCD4, #0084ff)"}}),a("van-cell-group",[a("van-field",{staticClass:"theme-textarea",attrs:{border:!1,type:"textarea",placeholder:99==t.tag.cate_id||124==t.tag.cate_id?"请输入通知内容...":t.icon,rows:"2",autosize:""},model:{value:t.grapicData.text,callback:function(e){t.$set(t.grapicData,"text",e)},expression:"grapicData.text"}}),a("div",{staticClass:"upload-module flex wrap"},[a("van-cell",{attrs:{border:!1}},[a("van-row",{attrs:{gutter:"4"}},[t._l(t.grapicData.photos,function(e,i){return a("van-col",{key:i,attrs:{span:8}},[a("div",{staticClass:"preview img-grid",class:[e.thumb?"transparent":""]},[a("img",{staticClass:"thumb",attrs:{src:e.thumb,large:1==e.is_video?"":e.photo,preview:""}}),a("div",{staticClass:"close-btn",on:{click:function(e){return t.deletePhoto(i)}}},[a("i",{staticClass:"iconfont"},[t._v("")])]),1==e.is_video?a("van-tag",{staticClass:"type-tag",attrs:{color:"#7232dd"}},[t._v("视频")]):t._e()],1)])}),t.boolean?a("van-col",{attrs:{span:8}},[a("div",{staticClass:"img-grid",on:{click:t.uploaderImg}},[a("div",{staticClass:"photo-upload"},[a("i",{staticClass:"iconfont"},[t._v("")]),a("span",{staticClass:"directions"},[t._v(t._s(t.typeUpload?"添加视频":"添加图片"))])])])]):t._e()],2)],1)],1),t.post?a("div",{staticClass:"article-card"},[a("van-cell",[a("articleCard",{attrs:{item:t.post,childId:t.userDataState.child_id,detailsId:t.post.post_id||t.post.tushu_id},on:{toDetails:t.toArticle}})],1)],1):t._e()],1)],1),a("articleSetting",{attrs:{type:"mould",isWxMsg:t.isWxMsg},on:{onChangeSwitch:t.switchChange}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],staticClass:"media-input"},[a("van-uploader",{ref:"selectPhoto",attrs:{"after-read":t.onRead,multiple:""}}),a("input",{ref:"selectFileVideo",attrs:{type:"file",accept:"video/*","data-type":"video",hidden:""},on:{change:t.doUpload}}),a("input",{ref:"fileVideo",attrs:{type:"file",accept:"video/*",capture:"camcorder","data-type":"video",hidden:""},on:{change:t.doUpload}})],1),a("van-popup",{staticClass:"progress-popup",attrs:{"close-on-click-overlay":!1},model:{value:t.progressIsShow,callback:function(e){t.progressIsShow=e},expression:"progressIsShow"}},[a("div",{staticClass:"progress"},[a("div",{staticClass:"upload-upload"},[t._v("视频正在上传中...")]),0!=t.percent?a("van-progress",{attrs:{percentage:t.percent,"show-pivot":!1,color:"linear-gradient(to right, #00BCD4, #0084ff)"}}):t._e()],1)]),a("div",{staticClass:"slogan"},[t._v("\n    "+t._s(t.$store.state.slogan)+"\n  ")])],1)},s=[],o=(a("a481"),a("7f7f"),a("ac6a"),a("4917"),a("cebc")),c=a("9993"),n=a("591a"),r=a("e620"),l=a("93c1"),u=a("bec1"),d=a("77e0"),h={name:"graphic",mixins:[d["e"]],components:{articleSetting:r["default"],articleCard:l["a"]},computed:Object(o["a"])({},Object(n["e"])("openWX",["ready","imgList"]),Object(n["e"])("articleSetting",["group","tag"]),Object(n["c"])("articleSetting",["getResult"]),Object(n["c"])(["userDataState","managerState"]),{imagesLength:function(){return this.grapicData.photos.length},boolean:function(){var t=!0;return this.typeUpload?1==this.imagesLength&&(t=!1):this.imagesLength>=9&&(t=!1),t}}),data:function(){var t=navigator.userAgent;return{icon:"",show:!1,actionShow:!1,grapicData:{text:"",photos:[]},isAndroid:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,isIOS:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),ossSign:"",mediaContent:[],percent:0,photoLength:0,videoThumb:"",typeUpload:"",post:"",progressIsShow:!1,isWxMsg:1,title:this.$route.query.title||""}},created:function(){this.fetchData()},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()},watch:{grapicData:{handler:function(t){localStorage.setItem("grapicData",JSON.stringify(t))},deep:!0},imgList:{handler:function(t){this.grapicData.photos=t,this.photoLength=t.length},deep:!0},tag:function(t){switch(t.cate_id){case"124":this.title="班级通知",this.icon="请输入班级通知内容...";break;case"116":this.title="课堂阅读",this.icon="请输入...";break;case"99":this.title="学校通知",this.icon="请输入学校通知内容...";break;default:this.title="",this.icon=""}},$router:"fetchData"},methods:Object(o["a"])({},Object(n["b"])("openWX",["selectImg"]),Object(n["b"])(["release"]),Object(n["d"])("openWX",["clearImg"]),{fetchData:function(){var t=this;if(localStorage.getItem("grapicData")&&(this.grapicData=JSON.parse(localStorage.getItem("grapicData"))),c["a"].get("/book/api/oss_sign").then(function(e){t.ossSign=e.data.data}),this.$route.query.post_id){var e={params:{ajax:1,id:this.$route.query.post_id}};c["a"].get("/book/SchoolArticle/detail",e).then(function(e){if(1==e.data.status)if(e.data.data.post.extra)t.post=JSON.parse(e.data.data.post.extra);else{var a=e.data.data.post;t.post={title:1==a.template_id?"".concat(a.user.username,"的晒一晒"):a.title,post_id:a.post_id||0,type:"post"}}})}if(this.$route.query.book_id)if(this.$route.query.book_id>0){var a={params:{ajax:1,book_id:this.$route.query.book_id}};c["a"].get("/book/ShelfBook/getInfo",a).then(function(e){if(1==e.data.status){var a=e.data.data;t.post={title:a.title,tushu_id:a.tushu_id||0,sign_read_count:t.$route.query.sign_read_count,sign_days:t.$route.query.sign_days,type:"book"}}})}else this.post={title:"自选图书",tushu_id:0,sign_read_count:this.$route.query.sign_read_count,sign_days:this.$route.query.sign_days,type:"book"};this.$route.query.upVideo&&this.$nextTick(function(){switch(t.$route.query.upVideo){case 1:t.$refs.fileVideo.click(),t.typeUpload="fileVideo";break;case 2:t.$refs.selectFileVideo.click(),t.typeUpload="selectFileVideo";break}})},uploaderImg:function(){switch(this.typeUpload){case"fileVideo":this.$refs.fileVideo.click();break;case"selectFileVideo":this.$refs.selectFileVideo.click();break;default:this.ready?this.selectImg(9-this.photoLength):this.$refs.selectPhoto.$refs.input.click()}},onRead:function(t){var e=this,a=[];t.length?a=t:a.push(t),a.forEach(function(t){e.photoLength<9?(e.photoLength++,Object(u["d"])(t.content,1200,.8,"blob").then(function(a){a.toBlob(function(a){e.upOssPhoto(a,t.file,t.content)})})):e.$dialog.alert({message:"<div class='text-center'>最多只能上传9张图片</div>"})})},onSelect:function(){this.$router.go(-1),this.actionShow=!1,this.grapicData={text:"",photos:[]}},onClickRelease:function(){var t=this;if(this.grapicData.text.length||this.grapicData.photos.length){if(this.grapicData.text.length<12e3){var e={details:this.grapicData.text,template_id:1,photos:this.grapicData.photos,extra:this.post,banji_id:this.$route.query.banji_id,school_id:this.$route.query.school_id,is_wx_msg:this.isWxMsg};switch(this.userDataState.teacher_school_id>0&&"banji"==this.$route.query.home_type&&(e.from_page="".concat(this.userDataState.teacher_school_id,",").concat(this.userDataState.teacher_school_name),e.tags=this.$route.query.tags||"".concat(this.tag.cate_name,",").concat(this.userDataState.teacher_duty,",").concat(this.userDataState.class_post_count)),this.$route.query.back){case"baby-home":e.child_id=this.$route.query.id,e.tags=this.$route.query.tags||"宝贝主页";break;case"class-home":e.banji_id=this.$route.query.id;break;case"apps-school":e.school_id=this.$route.query.id;break}this.release(e).then(function(a){switch(a.data.status){case 1:if(t.$route.query.post_id&&t.$route.query.post_id>0){var i={post_id:t.post.post_id,contents:"收录了"};c["a"].post("/book/SchoolArticleComment/edit?ajax=1",i).then(function(){})}t.clearImg(),t.$toast.success("发布成功"),124==t.tag.cate_id||116==t.tag.cate_id?t.$router.replace({name:"class-home",query:{id:e.banji_id||t.userDataState.teacher_banji_id}}):99==t.tag.cate_id||"apps-school"==t.$route.query.back?t.$router.replace({name:"apps-school",query:{id:e.school_id||t.userDataState.teacher_school_id}}):""!=t.getResult[0]&&"apps-find"!=t.getResult[0]?t.$router.replace({name:t.getResult[0],query:Object(o["a"])({},t.$route.query,{id:"baby-home"==t.getResult[0]?t.userDataState.child_id:t.userDataState.teacher_banji_id>0?t.userDataState.teacher_banji_id:t.userDataState.banji_id})}):t.$router.replace({name:"apps-find"});break;default:t.$toast.fail(a.data.msg)}})}}else 124==this.tag.cate_id||99==this.tag.cate_id?this.$toast("请输入通知内容"):this.$route.query.back&&"home"!=this.$route.name?this.$router.push({name:this.$route.query.back,query:{id:this.$route.query.id}}):this.$router.push({name:"apps-find"})},deletePhoto:function(t){this.grapicData.photos.splice(t,1),this.photoLength--},toTopicPage:function(){this.show=!0},doUpload:function(t){var e,a=this,i=t.target.files[0],s=t.target.dataset.type,o=new FormData,n=t.target.files[0].size/1024/1024/2;e=this.isIOS?3:n>3?3:n;var r=1048576*e,l=i.slice(0,r);o.append("file",l,i.name);var u="/book/file/get_video_screen";Object(c["a"])({url:u,data:o,method:"post",onUploadProgress:function(){a.progressIsShow=!0,a.percent=1}}).then(function(t){var e=t.data.data;a.grapicData.photos.push({thumb:e.thumb,height:e.height,width:e.width,rotate:e.rotate,duration:Math.floor(e.duration)||15}),a.upOssMedia(s,i)})},upOssMedia:function(t,e){var a=this;this.ossSign||alert("未能获取上传参数");var i=this.ossSign.host,s=new FormData,o=this.ossSign.dir+"/"+Date.now()+e.name,n=i+"/"+this.ossSign.dir+"/"+Date.now()+e.name;s.append("key",o),s.append("OSSAccessKeyId",this.ossSign.accessid),s.append("policy",this.ossSign.policy),s.append("success_action_status",200),s.append("signature",this.ossSign.signature),s.append("file",e),Object(c["a"])({url:i,data:s,method:"post",onUploadProgress:function(t){a.percent=Math.floor(t.loaded/t.total*100)}}).then(function(){a.grapicData.photos[0].is_audio="audio"==t?1:0,a.grapicData.photos[0].is_video="video"==t?1:0,a.grapicData.photos[0].photo=n,a.percent=0,a.progressIsShow=!1})},upOssPhoto:function(t,e,a){var i=this,s=new Image;s.src=a;var o=new FormData,n=this.ossSign.host,r=this.ossSign.dir+"/"+Date.now()+e.name,l=n+"/"+this.ossSign.dir+"/"+Date.now()+e.name;o.append("key",r),o.append("OSSAccessKeyId",this.ossSign.accessid),o.append("policy",this.ossSign.policy),o.append("success_action_status",200),o.append("signature",this.ossSign.signature),o.append("file",t,e.name),Object(c["a"])({url:n,data:o,method:"post",onUploadProgress:function(t){i.percent=Math.floor(t.loaded/t.total*100)}}).then(function(){i.grapicData.photos.push({photo:l,is_audio:0,is_video:0,thumb:"".concat(l,"?x-oss-percent=image/resize,m_fill,h_200,w_200"),height:s.height||0,width:s.width||0}),i.percent=0})},toArticle:function(t){this.$router.push({name:t.routeName,query:Object(o["a"])({},this.$route.query,{id:t.detailsId})})},switchChange:function(t){this.weChatSwitch=t}})},p=h,g=(a("049d"),a("3545"),a("2877")),m=Object(g["a"])(p,i,s,!1,null,"fcbe8b68",null);e["default"]=m.exports},"6bc7":function(t,e,a){"use strict";var i=a("15a1"),s=a.n(i);s.a},9274:function(t,e,a){"use strict";var i=a("5902"),s=a.n(i);s.a},"93c1":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"book-card"},["article"==t.cardStyle?a("div",{staticClass:"grade-card"},["book"==t.item.type?a("div",{staticClass:"type-book flipInX animated",on:{click:t.toReadStat}},[a("div",{staticClass:"content"},[a("div",{staticClass:"book-sign"},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"book-name"},[t._v("本次打卡 "+t._s(0==t.item.tushu_id?"":"《"+t.item.title+"》"))]),a("div",{staticClass:"flex flex-align"},[t.item.sign_days?a("div",{staticClass:"item-data"},[a("div",{staticClass:"sign-title"},[t._v("打卡天数")]),a("div",{staticClass:"number"},[t._v(t._s(t.item.sign_days))])]):t._e(),t.item.sign_read_count?a("div",{staticClass:"item-data"},[a("div",{staticClass:"sign-title"},[t._v("打卡本数")]),a("div",{staticClass:"number"},[t._v(t._s(t.item.sign_read_count))])]):t._e(),a("van-button",{staticClass:"theme-plain",attrs:{plain:"",size:"small",round:"",type:"primary"}},[t._v("查看成绩")])],1)]),a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"bg"}),a("Round")],1):t.flag?a("div",{staticClass:"article-share",on:{click:t.toDetails}},[a("media",{key:t.detailsId,attrs:{type:"card",item:t.article,stopClick:!0,isDetailsShow:t.textShow}}),t.article?a("div",{staticClass:"info-bar flex flex-align"},[a("div",{staticClass:"date"},[t._v(t._s(t.getTimeAgo(t.article.create_time)))]),a("div",{staticClass:"author"},[t._v("来自:"+t._s(t.username))])]):t._e()],1):t._e()]):a("div",{staticClass:"cell"},[a("div",{staticClass:"share-cell flex flex-align"},[a("div",{staticClass:"details flex flex-align"},[t.detailsId&&t.detailsId>0?a("div",{staticClass:"info",on:{click:t.toDetails}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"theme-color"},[t._v(t._s(t.item.post_id?t.item.title:"《"+t.item.title+"》")+" ")])]):t._e(),"book"==t.item.type?a("div",{staticClass:"punches theme-color",on:{click:t.toReadStat}},[t._v("\n                    "+t._s(t.item.sign_read_count>0?"累计"+t.item.sign_read_count+"本":"")+"\n                ")]):a("div",{staticClass:"include"},[t._v("\n                    收录\n                ")])])])])])},s=[],o=(a("a481"),a("cebc")),c=a("9993"),n=a("bec1"),r=a("591a"),l=a("f6ba"),u=a("d248"),d={name:"article-card",props:["item","detailsId","type","childId","cardStyle"],components:{Round:u["a"],media:l["a"]},computed:Object(o["a"])({},Object(r["c"])(["userDataState"]),{details:function(){return Object(n["c"])(this.item.details)?this.item.details.replace(/<[^>]+>/g,""):this.item.details}}),data:function(){return{article:{},username:"",flag:!1,textShow:!0}},created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var t=this;if("post"==this.type){var e={params:{ajax:1,id:this.detailsId}};c["a"].get("/book/SchoolArticle/detail",e).then(function(e){1==e.data.status&&(t.flag=!0,t.article=e.data.data.post,1==e.data.data.post.template_id?t.textShow=!0:t.textShow=!1,t.username=e.data.data.post.user.username)})}},toDetails:function(){var t="book"==this.item.type?"book-details":"article";this.$emit("toDetails",{routeName:t,detailsId:this.detailsId})},toReadStat:function(){this.$router.push({name:"readStat",query:{id:this.childId}})},getTimeAgo:function(t){return Object(n["m"])(1e3*t)}}},h=d,p=(a("db12"),a("6bc7"),a("2877")),g=Object(p["a"])(h,i,s,!1,null,"47a3a470",null);e["a"]=g.exports},a0ae:function(t,e,a){"use strict";var i=a("de22"),s=a.n(i);s.a},abc1:function(t,e,a){},ae3a:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topic-list"},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"",title:t.title,columns:t.column,"value-key":"cate_name"},on:{change:t.onCateChange,cancel:t.close,confirm:function(e){return t.$emit("confirm")}}})],1)},s=[],o=(a("ac6a"),a("cebc")),c=a("591a"),n={name:"topic-list",props:["type","topicList","tagIndex","cateIndex","cateName"],computed:Object(o["a"])({},Object(c["c"])(["managerState"]),{column:function(){var t=[{values:this.topicList,className:"column1",defaultIndex:this.tagIndex},{values:this.topicList[this.tagIndex]?this.topicList[this.tagIndex].children:[],className:"column2",defaultIndex:this.cateIndex}];return t},title:function(){var t="宝贝主页的分类";switch(this.$route.query.back){case"class-home":t="班级主页的分类";break;case"apps-school":t="学校主页的分类";break}return t}}),methods:{onCateChange:function(t,e,a){t.setColumnValues(1,e[0].children),this.$emit("select",e[a])},close:function(){this.$refs.picker.setColumnValues(1,this.column[1].values),this.$refs.picker.setColumnIndex(0,0),this.$refs.picker.setColumnIndex(1,0),this.$emit("close")}}},r=n,l=a("2877"),u=Object(l["a"])(r,i,s,!1,null,"7f7e82cb",null);e["a"]=u.exports},ca2a:function(t,e,a){},d248:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"welt"},t._l(t.round,function(t,e){return a("div",{key:e,staticClass:"round",class:"round-"+e,style:{width:t.w,height:t.w}})}),0)},s=[],o={name:"round",data:function(){return{round:[{w:"300px"},{w:"100px"},{w:"50px"},{w:"200px"},{w:"60px"}]}}},c=o,n=(a("9274"),a("2877")),r=Object(n["a"])(c,i,s,!1,null,"2b981942",null);e["a"]=r.exports},d2c8:function(t,e,a){var i=a("aae3"),s=a("be13");t.exports=function(t,e,a){if(i(e))throw TypeError("String#"+a+" doesn't accept regex!");return String(s(t))}},db12:function(t,e,a){"use strict";var i=a("abc1"),s=a.n(i);s.a},de22:function(t,e,a){},e620:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article-setting"},[a("van-cell",{attrs:{value:t.classify,"is-link":"notice"!=t.$route.query.pageType,"arrow-direction":"down"},on:{click:t.selectTagShow}},[a("div",{staticClass:"classify-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" 分类\n    ")])]),(99!=t.tag.cate_id&&124!=t.tag.cate_id||t.$route.query.tags)&&"notice"!=t.$route.query.pageType?a("van-cell",{attrs:{title:"同步到","value-class":"cell-value",value:t.synchronous,center:"","is-link":""},on:{click:function(e){t.isResultShow=!0}}}):a("van-switch-cell",{attrs:{title:"微信公众号消息","title-style":"flex:3","value-class":"switch-cell-value","active-value":1,"inactive-value":0,"active-color":"#67C23A","inactive-color":"#f2f6fc",label:"通知会通过阅亮书架公众号提醒家长"},on:{change:function(e){return t.$emit("onChangeSwitch",t.checked)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}}),a("van-popup",{staticClass:"page-popup-layer",attrs:{position:"bottom","get-container":"#app"},model:{value:t.isResultShow,callback:function(e){t.isResultShow=e},expression:"isResultShow"}},[a("van-checkbox-group",{model:{value:t.settingResult,callback:function(e){t.settingResult=e},expression:"settingResult"}},[a("div",{staticClass:"form-title"},[t._v("同步到")]),a("van-cell-group",t._l(t.resultList,function(e,i){return a("van-cell",{key:i,attrs:{border:!1,clickable:"",title:e.title},on:{click:function(e){return t.toggle(i)}}},[a("van-checkbox",{ref:"checkboxes",refInFor:!0,staticClass:"theme-checkbox",attrs:{name:e.name}})],1)}),1)],1)],1),a("van-popup",{staticClass:"page-popup-layer",attrs:{position:"bottom","get-container":"#app"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t.isCateShow?a("div",{staticClass:"cate-item"},t._l(t.schoolCateList,function(e,i){return a("van-cell-group",{key:i},[a("van-cell",{attrs:{title:e.name,size:"large"}},[a("i",{staticClass:"iconfont icon-topic",attrs:{slot:"icon"},slot:"icon"},[t._v("")])]),t._l(e.cateList,function(e,i){return a("van-cell",{key:i,attrs:{"is-link":"",title:e.cate_name},on:{click:function(a){return t.selectCate(e)}}},[a("i",{staticClass:"iconfont icon-topic-mini",attrs:{slot:"icon"},slot:"icon"},[t._v("")])])})],2)}),1):a("topic-list",{attrs:{topicList:t.topicList,tagIndex:t.tagIndex,cateIndex:t.cateIndex},on:{close:t.closeTopic,confirm:function(e){t.show=!1},select:t.selectTag}})],1)],1)},s=[],o=(a("2fdb"),a("6762"),a("96cf"),a("3b8d")),c=(a("7f7f"),a("ac6a"),a("cebc")),n=(a("c5f6"),a("9993")),r=a("ae3a"),l=a("591a"),u={name:"article-setting",props:{isWxMsg:{type:Number,default:1}},components:{topicList:r["a"]},computed:Object(c["a"])({},Object(l["e"])("articleSetting",["result","group","tag"]),Object(l["c"])(["userDataState","managerState"]),{synchronous:function(){var t=this,e=[];return this.resultList.forEach(function(a){t.result.forEach(function(t){t==a.name&&e.push(a.title)})}),e.join(",")},classify:function(){var t;return t=this.$route.query.tags&&"宝贝主页"!=this.$route.query.tags?this.$route.query.tags:this.tag.cate_name,t}}),data:function(){return{show:!1,isResultShow:!1,selectGroup:!1,loading:!1,groupList:[],resultList:[],topicList:[],settingResult:[],tagIndex:0,cateIndex:0,cateName:"",banjiCateList:[],babyCateList:[],routerPath:["apps-school","class-home","baby-home","apps-find"],schoolCateList:[{name:"宝贝主页",cateList:[]},{name:"班级主页",cateList:[]},{name:"学校主页",cateList:[]}],isCateShow:!1,checked:1}},created:function(){this.fetchData()},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()},watch:{$router:"fetchData",settingResult:{handler:function(t){this.addResult(t),localStorage.setItem("result",JSON.stringify(t))},deep:!0},isWxMsg:function(t){this.checked=t},managerState:function(){localStorage.removeItem("tag")}},methods:Object(c["a"])({},Object(l["b"])(["release"]),Object(l["b"])("articleSetting",["addResult"]),Object(l["d"])("articleSetting",["setTag"]),{fetchData:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,a,i,s=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=[],e.push({title:"发现",name:"apps-find",to:1}),this.userDataState.child_id>0&&116!=this.$route.query.cate_id&&e.push({title:"宝贝主页",name:"baby-home",to:1}),(this.userDataState.banji_id>0||this.userDataState.teacher_school_id>0)&&e.push({title:"".concat(this.userDataState.teacher_banji_id==this.$route.query.id||this.userDataState.teacher_school_id==this.$route.query.id||116==this.$route.query.cate_id?"管理的":"宝贝的","班级"),name:"class-home",to:1}),this.resultList=e,a=[],e.map(function(t){a.push(t.name)}),this.settingResult=a,this.addResult(a),localStorage.getItem("result")&&!a.includes(this.$route.query.back)&&(this.settingResult=JSON.parse(localStorage.getItem("result")),this.addResult(this.settingResult)),this.routerPath.includes(this.$route.query.back)){t.next=20;break}return this.isCateShow=!0,t.next=14,this.getCateList("宝贝主页");case 14:return t.next=16,this.getCateList("班级主页");case 16:return t.next=18,this.getCateList("学校主页");case 18:t.next=24;break;case 20:i={params:{portal_name:"宝贝主页"}},"class-home"==this.$route.query.back&&(i.params.portal_name="班级主页"),"apps-school"==this.$route.query.back&&(i.params.portal_name="学校主页"),n["a"].get("/book/schoolArticleCate/getList",i).then(function(t){if(200==t.status){var e=t.data,a=[];e.forEach(function(t){0==t.access_level?a.push(t):s.userDataState.teacher_school_id!=s.$route.query.id&&s.userDataState.teacher_banji_id!=s.$route.query.id||a.push(t)}),s.topicList=a,s.$route.query.cate_id||s.$route.query.tag_id?e.forEach(function(t,e){s.$route.query.tag_id?t.cate_id==s.$route.query.tag_id&&(s.tagIndex=e,s.cateName=t.cate_name,s.setTag(t)):t.children.forEach(function(t,a){t.cate_id==s.$route.query.cate_id&&(s.tagIndex=e,s.cateIndex=a,s.cateName=t.cate_name,s.setTag(t))})}):localStorage.getItem("tag")?s.setTag(JSON.parse(localStorage.getItem("tag"))):s.setTag(a[0])}});case 24:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getCateList:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",n["a"].get("/book/schoolArticleCate/getList",{params:{portal_name:e}}).then(function(t){a.schoolCateList.map(function(a){a.name==e&&(a.cateList=t.data)})}));case 1:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),toggle:function(t){this.addResult(this.settingResult),this.$refs.checkboxes[t].toggle()},selectTag:function(t){this.setTag(t),localStorage.setItem("tag",JSON.stringify(t))},closeTopic:function(){this.setTag(this.topicList[this.tagIndex]),this.show=!1},selectCate:function(t){this.show=!1,this.setTag(t)},selectTagShow:function(){"notice"!=this.$route.query.pageType&&(this.show=!0)}})},d=u,h=(a("49f3"),a("e641"),a("2877")),p=Object(h["a"])(d,i,s,!1,null,"984cfea4",null);e["default"]=p.exports},e641:function(t,e,a){"use strict";var i=a("3606"),s=a.n(i);s.a},f56e:function(t,e,a){},f6ba:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",class:"article"==t.$route.name?"article":"",attrs:{id:"media"},on:{click:t.toArticle}},["card"==t.type&&"0"==t.item.template_id?a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.item.title))]):t._e(),t.item.details&&t.isDetailsShow?a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:"card"==t.type?2:0,expression:"type == 'card'?2:0",arg:"20"}],ref:"textContent",staticClass:"text",class:0==t.item.template_id?"content":"",domProps:{innerHTML:t._s(t.item.details)}}):t._e(),"1"==t.item.hasvideo?a("div",{staticClass:"media",class:"1"==t.item.hasvideo?"video-cover":""},t._l(t.item.photos,function(e,i){return a("div",{key:i,staticClass:"thumb"},[e&&"1"==e.is_video?a("div",{staticClass:"video-thumb"},["card"==t.type||t.isCommentShow?a("div",{staticClass:"player-card",class:["90"==e.rotate?"vertical":"",t.isCommentShow?"poster":""]},[t._m(0,!0),a("img",{attrs:{src:t.item.cover,alt:"视频封面"}}),a("van-tag",{staticClass:"duration",attrs:{size:"medium",color:"rgba(0,0,0,.5)"}},[t._v(t._s(t.getDuration(e.duration)))])],1):t.isCommentShow?t._e():a("div",{staticClass:"video-wrapper"},[a("video",{ref:"videoPlayer",refInFor:!0,attrs:{id:"video",controls:"controls",src:e.photo,poster:e.thumb,preload:"auto","x-webkit-airplay":"true",airplay:"allow","webkit-playsinline":"true","x5-playsinline":"",playsinline:"true"}})])]):t._e()])}),0):t._e(),"1"==t.item.template_id&&t.item.photos?a("div",{staticClass:"media img"},[a("div",{class:["card"==t.type?"layout-"+t.item.photos.length:""]},[a("van-row",{attrs:{gutter:4}},t._l(t.item.photos,function(e,i){return a("van-col",{key:i,attrs:{span:t.grid}},[e&&0==e.is_video&&0==e.is_audio?a("div",{staticClass:"img-grid",class:[1==t.item.photos.length&&e.height/e.width>1?"long":"",1==t.item.photos.length&&"details"==t.type?"alone":""]},[a("img",{staticClass:"img-preview",class:[e.height/e.width>2?"long":""],attrs:{src:e.thumb,large:e.photo,preview:"card"!=t.type&&e.post_id}}),e.height/e.width>2&&"card"==t.type&&i<1?a("van-tag",{staticClass:"photo-tag",attrs:{type:"primary"}},[t._v("长图")]):t._e()],1):t._e()])}),1)],1)]):t._e(),"0"==t.item.template_id&&"card"==t.type&&t.item.cover&&"1"!=t.item.hasvideo?a("div",{staticClass:"media img long-article-thumb"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.item.cover||t.item.photos[0].thumb}}),a("van-tag",{staticClass:"photo-tag",attrs:{type:"primary"}},[t._v("文章")])],1):t._e()])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"player"},[a("i",{staticClass:"iconfont"},[t._v("")])])}],o=(a("7f7f"),a("a481"),a("bec1")),c={name:"media",props:{item:{type:Object,default:function(){return{photos:[]}}},type:{type:String,default:""},coverShow:{type:Boolean,default:!0},stopClick:{type:Boolean,default:!1},schoolName:{type:String,default:""},schoolId:{type:String,default:""},isDetailsShow:{type:Boolean,default:!0},isCommentShow:{type:Boolean,default:!1}},computed:{grid:function(){var t;return t=4==this.item.photos.length||2==this.item.photos.length?12:1==this.item.photos.length&&"details"==this.type?24:8,t}},data:function(){return{playing:!1}},updated:function(){this.$nextTick(function(){for(var t=document.getElementsByTagName("img"),e=0;e<t.length;e++)-1==t[e].src.indexOf(location.origin)&&(t[e].src=t[e].src.replace("http:","https:"))})},methods:{toArticle:function(){"card"!=this.type||this.stopClick||this.$router.push({name:"article",query:{id:this.item.post_id,type:this.item.template_id,back:this.$route.name,back_id:this.$route.query.id,school_name:this.schoolName,school_id:this.schoolId}})},toVideoPage:function(t){this.$router.push({name:"video-page",query:{id:t.post_id,user_id:this.item.user_id,back:this.$route.name,back_id:this.$route.query.id}})},getDuration:function(t){return Object(o["f"])(t)}}},n=c,r=(a("a0ae"),a("1170"),a("2877")),l=Object(r["a"])(n,i,s,!1,null,"1d14f574",null);e["a"]=l.exports}}]);