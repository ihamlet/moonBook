(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42b59174"],{"1d2b":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.videoList.length>0?i("div",{staticClass:"video"},[i("van-cell",{attrs:{"title-class":"cell-title",title:t.title}},[i("div",{staticClass:"icon",attrs:{slot:"icon"},slot:"icon"},[i("i",{staticClass:"iconfont"},[t._v("")])])]),i("div",{staticClass:"scroll-x"},[i("div",{staticClass:"video-list flex"},t._l(t.videoList,function(e,a){return i("div",{key:a,staticClass:"video-item scroll-item",on:{click:function(i){return t.toVideoPage(e)}}},[i("div",{staticClass:"video"},[i("div",{staticClass:"video-cover"},[i("div",[i("img",{attrs:{src:e.cover,alt:"视频封面-"+a}})]),e.post_id==t.$route.query.id?i("div",{staticClass:"playing flex flex-align"},[i("i",{staticClass:"iconfont"},[t._v("")]),i("span",{staticClass:"text"},[t._v("正在播放")])]):t._e()]),i("div",{staticClass:"video-info"},[i("div",{staticClass:"user-info flex flex-align"},[i("div",{staticClass:"user-data flex flex-align"},[i("div",{staticClass:"avatar"},[i("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:e.user.avatar}})]),i("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v("\n                  "+t._s(e.user.name)+"\n                ")])]),i("div",{staticClass:"views"},[t._v("\n                "+t._s(e.views)+"次播放\n              ")])])])])])}),0)])],1):t._e()},s=[],o=(i("7f7f"),i("9993")),n={name:"Video",props:["title","type"],data:function(){return{videoList:[]}},created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var t=this,e={};e=this.$route.query.user_id?{params:{portal_name:"首页",sort:"post",user_id:this.$route.query.user_id,hasvideo:1}}:{params:{portal_name:"首页",sort:"tuijian",hasvideo:1}},o["a"].get("/book/SchoolArticle/getList?sort=post",e).then(function(e){t.videoList=e.data.data})},toVideoPage:function(t){var e={};e=this.$route.query.user_id?{id:t.post_id,user_id:this.$route.query.user_id,back:this.$route.name}:{id:t.post_id,user_id:t.user_id,back:this.$route.name},this.$router.push({name:"video-page",query:e}),this.$emit("refresh")}}},c=n,r=(i("db60"),i("5a45"),i("2877")),l=Object(r["a"])(c,a,s,!1,null,"36a7c0dd",null);e["a"]=l.exports},4316:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.hackReset?i("div",{staticClass:"video-page page-padding"},[i("div",{ref:"videoDom",staticClass:"video-box"},[i("div",{class:t.fixedHeaderBar?"":"fixed",style:!t.fixedHeaderBar&&t.styleObject,attrs:{id:"video"}})]),i("div",{staticClass:"container"},[i("div",{staticClass:"module"},[i("van-cell-group",[i("van-cell",{attrs:{center:"",value:t.item.views+"次播放","title-class":"video-user-info"},on:{click:function(e){return t.toZoom(t.item)}}},[i("div",{staticClass:"user-info-bar",attrs:{slot:"title"},slot:"title"},[t.item.user?i("div",{staticClass:"info flex flex-align"},[i("div",{staticClass:"avatar"},[i("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.item.user.avatar}})]),i("div",{staticClass:"promulgator flex flex-align"},[i("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v(t._s(t.item.user.username||""))]),i("div",{staticClass:"upload-date"},[t._v(" "+t._s(t.timeAgo(t.item.create_time))+" ")])])]):t._e()])])],1)],1),i("div",{staticClass:"module"},[i("video-list",{attrs:{title:"相关视频",type:"video"},on:{refresh:t.refresh}})],1),i("div",[i("comment",{attrs:{item:t.item,include:"include"}})],1)])]):t._e()},s=[],o=(i("7f7f"),i("ac6a"),i("cebc")),n=i("9993"),c=i("bec1"),r=i("1d2b"),l=i("c629"),d=i("591a"),u={name:"ckplayer",components:{videoList:r["a"],comment:l["a"]},computed:Object(o["a"])({},Object(d["e"])("openWX",["ready"])),data:function(){return{videoObject:{container:"#video",variable:"player",loaded:"loadedHandler",loop:!1,config:"",debug:!0,drag:"start",seek:0,video:[],autoplay:!0},styleObject:{position:"fixed",top:"0",zIndex:10},item:"",fixedHeaderBar:!0,domTop:0,hackReset:!0,scrollTop:0}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},mounted:function(){this.getDomTop(),window.addEventListener("scroll",this.handleScroll)},created:function(){var t=this;this.fetchData().then(function(){t.player})},updated:function(){this.wxShare()},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(o["a"])({},Object(d["b"])("openWX",["share"]),{wxShare:function(){var t={item:this.item,success:function(){console.log("微信分享")}};this.share(t)},fetchData:function(){var t=this;return n["a"].get("/book/SchoolArticle/detail?ajax=1&id=".concat(this.$route.query.id)).then(function(e){if(1==e.data.status){t.item=e.data.data.post;var i=e.data.data.post.photos,a=[];i.forEach(function(e,i){1==e.is_video&&(a.push([e.photo]),t.videoObject.poster=e.thumb)}),t.videoObject.video=a}})},handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=t,this.domTop<this.scrollTop?this.fixedHeaderBar=!1:this.fixedHeaderBar=!0},getDomTop:function(){this.domTop=this.$refs.videoDom.offsetTop},onClickLeft:function(){this.$route.query.back?this.$router.push({name:this.$route.query.back,query:{id:this.$route.query.back_id}}):this.$router.push({name:"apps-find"})},timeAgo:function(t){return Object(c["l"])(1e3*t)},toZoom:function(t){this.$router.push({name:"zoom",query:{id:t.user_id,back:this.$route.name,post_id:t.post_id,user_id:t.user_id}})},refresh:function(){location.reload()}})},v=u,f=(i("a39d"),i("6fa3"),i("2877")),h=Object(f["a"])(v,a,s,!1,null,"cf1ae00e",null);e["default"]=h.exports},"5a45":function(t,e,i){"use strict";var a=i("9eb5"),s=i.n(a);s.a},"6fa3":function(t,e,i){"use strict";var a=i("b5f2"),s=i.n(a);s.a},"9eb5":function(t,e,i){},a39d:function(t,e,i){"use strict";var a=i("aa5d"),s=i.n(a);s.a},aa5d:function(t,e,i){},ab85:function(t,e,i){},ae3a:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"topic-list"},[i("van-picker",{ref:"picker",attrs:{"show-toolbar":"",title:t.title,columns:t.column,"value-key":"cate_name"},on:{change:t.onCateChange,cancel:t.close,confirm:function(e){return t.$emit("confirm")}}})],1)},s=[],o=(i("ac6a"),i("cebc")),n=(i("9993"),i("591a")),c={name:"topic-list",props:["type","topicList","tagIndex","cateIndex","cateName"],computed:Object(o["a"])({},Object(n["c"])(["managerState"]),{column:function(){var t=[{values:this.topicList,className:"column1",defaultIndex:this.tagIndex},{values:this.topicList[this.tagIndex]?this.topicList[this.tagIndex].children:[],className:"column2",defaultIndex:this.cateIndex}];return t},title:function(){var t="宝贝主页的分类";switch(this.$route.query.back){case"class-home":t="班级主页的分类";break;case"apps-school":t="学校主页的分类";break}return t}}),methods:{onCateChange:function(t,e,i){t.setColumnValues(1,e[0].children),this.$emit("select",e[i])},close:function(){this.$refs.picker.setColumnValues(1,this.column[1].values),this.$refs.picker.setColumnIndex(0,0),this.$refs.picker.setColumnIndex(1,0),this.$emit("close")}}},r=c,l=i("2877"),d=Object(l["a"])(r,a,s,!1,null,"96386f08",null);e["a"]=d.exports},b5f2:function(t,e,i){},db60:function(t,e,i){"use strict";var a=i("ab85"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-42b59174.855ca3b2.js.map