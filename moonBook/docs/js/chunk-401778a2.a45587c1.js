(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-401778a2"],{"1d2b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.videoList.length>0?a("div",{staticClass:"video"},[a("van-cell",{attrs:{"title-class":"cell-title",title:t.title}},[a("div",{staticClass:"icon",attrs:{slot:"icon"},slot:"icon"},[a("i",{staticClass:"iconfont"},[t._v("")])])]),a("div",{staticClass:"scroll-x"},[a("div",{staticClass:"video-list flex"},t._l(t.videoList,function(e,s){return a("div",{key:s,staticClass:"video-item scroll-item",on:{click:function(a){return t.toVideoPage(e)}}},[a("div",{staticClass:"video"},[a("div",{staticClass:"video-cover"},[a("div",[a("img",{attrs:{src:e.cover,alt:"视频封面-"+s}})]),e.post_id==t.$route.query.id?a("div",{staticClass:"playing flex flex-align"},[a("i",{staticClass:"iconfont"},[t._v("")]),a("span",{staticClass:"text"},[t._v("正在播放")])]):t._e()]),a("div",{staticClass:"video-info"},[a("div",{staticClass:"user-info flex flex-align"},[a("div",{staticClass:"user-data flex flex-align"},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:e.user.avatar}})]),a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v("\n                  "+t._s(e.user.name)+"\n                ")])]),a("div",{staticClass:"views"},[t._v("\n                "+t._s(e.views)+"次播放\n              ")])])])])])}),0)])],1):t._e()},i=[],n=(a("7f7f"),a("9993")),o={name:"Video",props:["title","type"],data:function(){return{videoList:[]}},created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var t=this,e={};e=this.$route.query.user_id?{params:{portal_name:"首页",sort:"post",user_id:this.$route.query.user_id,hasvideo:1}}:{params:{portal_name:"首页",sort:"tuijian",hasvideo:1}},n["a"].get("/book/SchoolArticle/getList?sort=post",e).then(function(e){t.videoList=e.data.data})},toVideoPage:function(t){var e={};e=this.$route.query.user_id?{id:t.post_id,user_id:this.$route.query.user_id,back:this.$route.name}:{id:t.post_id,user_id:t.user_id,back:this.$route.name},this.$router.push({name:"video-page",query:e}),this.$emit("refresh")}}},c=o,r=(a("db60"),a("5a45"),a("2877")),l=Object(r["a"])(c,s,i,!1,null,"36a7c0dd",null);e["a"]=l.exports},"3df9":function(t,e,a){"use strict";var s=a("711f"),i=a.n(s);i.a},4316:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.hackReset?a("div",{staticClass:"video-page page-padding"},[a("div",{ref:"videoDom",staticClass:"video-box"},[a("div",{class:t.fixedHeaderBar?"":"fixed",style:!t.fixedHeaderBar&&t.styleObject,attrs:{id:"video"}})]),a("div",{staticClass:"container"},[a("div",{staticClass:"module"},[a("van-cell-group",[a("van-cell",{attrs:{center:"",value:t.item.views+"次播放","title-class":"video-user-info"},on:{click:function(e){return t.toZoom(t.item)}}},[a("div",{staticClass:"user-info-bar",attrs:{slot:"title"},slot:"title"},[t.item.user?a("div",{staticClass:"info flex flex-align"},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.item.user.avatar}})]),a("div",{staticClass:"promulgator flex flex-align"},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v(t._s(t.item.user.username||""))]),a("div",{staticClass:"upload-date"},[t._v(" "+t._s(t.timeAgo(t.item.create_time))+" ")])])]):t._e()])])],1)],1),a("div",{staticClass:"module"},[a("video-list",{attrs:{title:"相关视频",type:"video"},on:{refresh:t.refresh}})],1),a("div",[a("comment",{attrs:{item:t.item,include:"include"}})],1)])]):t._e()},i=[],n=(a("7f7f"),a("ac6a"),a("cebc")),o=a("9993"),c=a("bec1"),r=a("1d2b"),l=a("c629"),u=a("591a"),d={name:"ckplayer",components:{videoList:r["a"],comment:l["a"]},computed:Object(n["a"])({},Object(u["e"])("openWX",["ready"])),data:function(){return{videoObject:{container:"#video",variable:"player",loaded:"loadedHandler",loop:!1,config:"",debug:!0,drag:"start",seek:0,video:[],autoplay:!0},styleObject:{position:"fixed",top:"0",zIndex:10},item:"",fixedHeaderBar:!0,domTop:0,hackReset:!0,scrollTop:0}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},mounted:function(){this.getDomTop(),window.addEventListener("scroll",this.handleScroll)},created:function(){var t=this;this.fetchData().then(function(){t.player})},updated:function(){this.wxShare()},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(n["a"])({},Object(u["b"])("openWX",["share"]),{wxShare:function(){var t={item:this.item,success:function(){}};this.share(t)},fetchData:function(){var t=this;return o["a"].get("/book/SchoolArticle/detail?ajax=1&id=".concat(this.$route.query.id)).then(function(e){if(1==e.data.status){t.item=e.data.data.post;var a=e.data.data.post.photos,s=[];a.forEach(function(e){1==e.is_video&&(s.push([e.photo]),t.videoObject.poster=e.thumb)}),t.videoObject.video=s}})},handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=t,this.domTop<this.scrollTop?this.fixedHeaderBar=!1:this.fixedHeaderBar=!0},getDomTop:function(){this.domTop=this.$refs.videoDom.offsetTop},onClickLeft:function(){this.$route.query.back?this.$router.push({name:this.$route.query.back,query:{id:this.$route.query.back_id}}):this.$router.push({name:"apps-find"})},timeAgo:function(t){return Object(c["l"])(1e3*t)},toZoom:function(t){this.$router.push({name:"zoom",query:{id:t.user_id,back:this.$route.name,post_id:t.post_id,user_id:t.user_id}})},refresh:function(){location.reload()}})},m=d,h=(a("6ba9"),a("6fa3"),a("2877")),p=Object(h["a"])(m,s,i,!1,null,"4dac76f4",null);e["default"]=p.exports},"5a45":function(t,e,a){"use strict";var s=a("9eb5"),i=a.n(s);i.a},"6ba9":function(t,e,a){"use strict";var s=a("bc41"),i=a.n(s);i.a},"6fa3":function(t,e,a){"use strict";var s=a("b5f2"),i=a.n(s);i.a},"711f":function(t,e,a){},"75e0":function(t,e,a){"use strict";a.d(e,"h",function(){return i}),a.d(e,"c",function(){return n}),a.d(e,"k",function(){return c}),a.d(e,"e",function(){return u}),a.d(e,"f",function(){return d}),a.d(e,"i",function(){return m}),a.d(e,"j",function(){return h}),a.d(e,"b",function(){return o}),a.d(e,"a",function(){return r}),a.d(e,"d",function(){return l}),a.d(e,"g",function(){return p});var s=a("cebc"),i=["说一点什么吧，他都能听得到","随心而起，有感而发","千头万绪,落笔汇成评论一句","听说，爱评论的人粉丝多","从小陪伴孩子读绘本，日积月累","陪伴就是给孩子最好的爱","愿你像颗种子，勇敢地冲破泥沙","心似海，不敌诗的咏叹"],n=["👍 棒棒哒","🙆 声音很棒","💪 加油哦","👪 很温馨","👏 非常棒","😊 很可爱哦","👑 继续努力","😄 向你学习","🌞 积少成多","📚 推荐这本书","🏆 很精彩"],o=["再接再厉","向你学习","坚持下去","太厉害了","难能可贵"],c=["聪明在于勤奋，天才在于积累","腹有诗书气自华，读书万卷始通神","少成若天性，习惯如自然","锲而不舍，金石可镂","敏而好学，不耻下问","读书之法，在循序渐进，熟读而精思"],r=["阅读是关系孩子素养发展的重要因素","阅读能够提高孩子的语言技能","亲子阅读是传递亲情的桥梁","阅读可以促进儿童认知能力"],l="<p>一起关爱孩子们的成长，我们可以从阅读做起。阅亮书架，将认真与执着地做着这件事情，同时也吸引了无数有识之士加入其中，和我们一起播撒着幸福的种子。</p><p>在路上，我们满怀期待，愿与您同行......</p>",u=[{name:"好的开始",number:1,type:"punch"},{name:"小试牛刀",number:21,type:"punch"},{name:"坚持不懈",number:50,type:"punch"},{name:"渐入佳境",number:100,type:"punch"},{name:"扬帆远航",number:198,type:"punch"},{name:"持之以恒",number:365,type:"punch"},{name:"学富五车",number:660,type:"punch"},{name:"阅读之星",number:1e3,type:"punch"}],d=[{name:"好的开始",number:1,type:"read"},{name:"小试牛刀",number:20,type:"read"},{name:"坚持不懈",number:60,type:"read"},{name:"渐入佳境",number:120,type:"read"},{name:"扬帆远航",number:300,type:"read"},{name:"持之以恒",number:700,type:"read"},{name:"学富五车",number:1e3,type:"read"},{name:"阅亮之星",number:1500,type:"read"}];function m(t){var e=[];return u.forEach(function(a,i){t>=a.number&&e.push(Object(s["a"])({},a,{level:i+1})),0==t&&e.push(Object(s["a"])({},a,{level:0}))}),e}function h(t){var e=[];return d.forEach(function(a,i){t>=a.number&&e.push(Object(s["a"])({},a,{level:i+1})),0==t&&e.push(Object(s["a"])({},a,{level:0}))}),e}var p=["","","","","","","","","",""]},"9eb5":function(t,e,a){},ab85:function(t,e,a){},b5f2:function(t,e,a){},bc41:function(t,e,a){},c629:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"comment",staticClass:"comment-list page-padding",attrs:{id:"comment"}},[a("van-nav-bar",{key:t.$route.query.id,attrs:{border:!1,zIndex:0}},[a("div",{staticClass:"zan",attrs:{slot:"right"},slot:"right"},[t._v("赞 "+t._s(t.item.zan_num))]),a("div",{staticClass:"comment",attrs:{slot:"left"},slot:"left"},[t._v(t._s(t.listLength)+" 评论")])]),t.list.length?a("div",{staticClass:"container"},[a("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,function(e,s){return a("van-cell",{key:s},[a("div",{staticClass:"user-card flex flex-align"},[a("div",{staticClass:"user-info flex flex-align"},[a("div",{staticClass:"avatar",on:{click:function(a){return t.toZoom(e)}}},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:e.avatar}})]),a("div",{staticClass:"user-data"},[a("span",{staticClass:"user-name"},[t._v(t._s(e.username))])])]),a("div",{staticClass:"zan flex flex-align",on:{click:function(a){return t.zan(e)}}},[e.isZan?a("i",{staticClass:"iconfont highlight rotateInDownLeft animated"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v("")]),a("div",{staticClass:"num"},[t._v(t._s(e.zan_count))])])]),a("div",{staticClass:"contents"},[t._v("\n          "+t._s(e.contents)+"\n        ")]),a("div",{staticClass:"reply"},[0!=e.replyList.length?a("div",{staticClass:"reply-content"},t._l(e.replyList,function(s,i){return a("div",{key:i,staticClass:"list"},[a("div",{staticClass:"item"},[a("span",{staticClass:"reply-title"},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n                  "+t._s(s.username)+"回复"+t._s(e.username)+"\n                ")]),a("span",{staticClass:"reply-contents"},[t._v("\n                  "+t._s(s.contents)+"\n                ")])])])}),0):t._e(),e.quote?a("div",{staticClass:"reply-content"},[a("div",{staticClass:"list"},[a("div",{staticClass:"item"},[a("span",{staticClass:"reply-title"},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n                  "+t._s(e.quote.username)+"的评论\n                ")]),a("span",{staticClass:"reply-contents"},[t._v("\n                  "+t._s(e.quote.contents)+"\n                ")])])])]):t._e(),a("div",{staticClass:"comment-bar flex flex-align"},[a("div",{staticClass:"date"},[t._v(t._s(t.timeAgo(e.create_time)))]),a("div",{staticClass:"theme-color",on:{click:function(a){return t.showField(e,"reply")}}},[a("van-tag",{attrs:{round:"",size:"large",type:"primary"}},[t._v(t._s(e.replyList.length?e.replyList.length:"")+"回复")])],1)])])])}),1)],1):a("div",{staticClass:"no-centent"},[a("div",{staticClass:"prompt",on:{click:function(e){return t.showField()}}},[t._v("暂无评论,点击抢沙发")])]),a("div",{staticClass:"comment"},[a("div",{staticClass:"footer-bar"},[a("div",{staticClass:"bar-padding flex flex-align"},[a("div",{staticClass:"input-box flex flex-align",on:{click:function(e){return t.showField()}}},[a("div",{staticClass:"input-box-avatar avatar"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.userDataState.avatar},on:{error:t.imgError}})]),a("span",[t._v("写评论")])]),a("div",{staticClass:"btn-icon flex flex-align"},[a("div",{staticClass:"btn",on:{click:t.toScroll}},[t.listLength>0?a("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.listLength>1e3?"999+":t.listLength))]):t._e(),a("i",{staticClass:"iconfont"},[t._v("")])],1),"article"==t.$route.name?a("div",{staticClass:"btn flip animated",on:{click:function(e){return t.$emit("giftShow")}}},[a("img",{staticClass:"ds-icon",attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/jinbi.png"}})]):t._e(),a("div",{staticClass:"btn",on:{click:function(e){return t.addPraise(t.item)}}},[t.item.zan_num>0?a("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.item.zan_num>1e3?"999+":t.item.zan_num))]):t._e(),t.item.isZan?a("i",{staticClass:"iconfont highlight rotateInDownLeft animated"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v("")])],1),"include"!=t.include?a("div",{staticClass:"btn",on:{click:function(e){return t.addCollect(t.item)}}},[t.item.collect_num>0?a("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.item.collect_num>1e3?"999+":t.item.collect_num))]):t._e(),t.item.isShoucang?a("i",{staticClass:"iconfont star highlight swing animated"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v(" ")])],1):a("div",{staticClass:"btn",on:{click:t.isShare}},[a("i",{staticClass:"iconfont"},[t._v("")])])])])]),a("van-popup",{staticClass:"comment-popup",attrs:{"overlay-class":"bg-opacity",position:"top","get-container":"#app"},on:{close:function(e){return t.$refs.field.blur()}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},["include"!=t.include&&t.score?a("div",{staticClass:"score flex-column"},[a("div",{staticClass:"score-title"},[t._v("评分")]),a("van-rate",{staticClass:"score-rate",attrs:{size:25,count:5,"void-color":"#ceefe8"},model:{value:t.star,callback:function(e){t.star=e},expression:"star"}})],1):t._e(),a("div",{staticClass:"comment-content"},[a("div",{staticClass:"field-box"},[a("van-field",{ref:"field",staticClass:"comment-field",attrs:{border:!1,size:"large",type:"textarea",placeholder:t.placeholder,autosize:{maxHeight:200,minHeight:100}},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1)]),1==t.item.template_id?a("div",{staticClass:"comment-tag scroll-x"},t._l(t.commentTag,function(e,s){return a("div",{key:s,staticClass:"scroll-item jackInTheBox animated",style:{animationDelay:100*s+"ms"},on:{click:function(a){return t.biuCommentTag(e)}}},[a("van-button",{staticClass:"tag-item",attrs:{round:"",type:"default"}},[t._v(t._s(e))])],1)}),0):t._e(),a("van-cell",[a("van-button",{staticClass:"theme-btn",attrs:{loading:t.isLoading,size:"normal",type:"primary",round:""},on:{click:t.submit}},[t._v("发 布")])],1)],1)],1),a("van-popup",{staticClass:"share-popup",attrs:{"get-container":"#app"},model:{value:t.shareShow,callback:function(e){t.shareShow=e},expression:"shareShow"}},[a("div",{staticClass:"share-img"},[a("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/shareWord.png"}})])])],1)},i=[],n=(a("7f7f"),a("55dd"),a("cebc")),o=a("591a"),c=a("9993"),r=a("bec1"),l=a("75e0"),u={name:"comment",props:["item","include","type","postId","isCommentShow"],computed:Object(n["a"])({},Object(o["c"])(["userToken","userDataState"]),{placeholder:function(){var t;return t=this.commentId?this.prompt:Object(r["f"])(l["h"],1)[0],t},commentTag:function(){return l["c"].sort(function(){return Math.random()-.5}),l["c"]}}),data:function(){return{star:3,list:[],toTopAndComment:!1,listLength:"",loading:!1,finished:!1,page:1,commentId:"",show:!1,isLoading:!1,message:"",shareShow:!1,score:!1,prompt:""}},watch:{postId:function(t){var e=this;c["a"].get("/book/SchoolArticleComment/getList",{params:{post_id:t}}).then(function(t){switch(t.data.status){case 1:e.listLength=t.data.count,e.list=t.data.data;break;default:e.$toast(t.data.msg)}})},show:function(t){this.$emit("showComment",t)}},methods:{onLoad:function(){var t=this,e={params:{post_id:this.postId,page:this.page,limit:10,sort:"new"}};return c["a"].get("/book/SchoolArticleComment/getList",e).then(function(e){if(1==e.data.status){var a=e.data.data;1==t.page?t.list=a:t.list=t.list.concat(a),t.loading=!1,t.page++,t.list.length>=e.data.count&&(t.finished=!0)}})},biuCommentTag:function(t){this.message=t,this.submit()},submit:function(){var t=this;this.isLoading=!0;var e={post_id:this.item.post_id,contents:this.message,tags:this.item.ad_label};this.commentId?e.reply_comment_id=this.commentId:e.star=2*this.star,this.message.length?c["a"].post("/book/SchoolArticleComment/edit?ajax=1",e).then(function(e){1==e.data.status?(t.show=!1,t.page=1,t.onLoad(),t.$toast.success(e.data.info),t.isLoading=!1,t.$refs.comment.scrollIntoView()):t.$toast.fail(e.data.info)}):this.$toast("请填写评论内容")},addPraise:function(t){var e=this;if("preview"!=this.$route.query.type){t.isZan=!t.isZan;var a={params:{ajax:1,id:this.item.post_id}};c["a"].get("/book/SchoolArticle/zan",a).then(function(a){1==a.data.status&&(t.isZan?t.zan_num++:t.zan_num--,"1"==a.data.data.like&&e.$toast.success({className:"zan-icon toast-icon"}))})}},addCollect:function(t){var e=this;t.isShoucang=!t.isShoucang;var a={params:{post_id:this.postId}};c["a"].get("/book/SchoolArticleCollect/add",a).then(function(a){1==a.data.status&&(t.isShoucang?t.collect_num++:t.collect_num--,t.isShoucang||e.$toast.success({className:"shoucang-icon toast-icon"}))})},showField:function(t,e){var a=this;"preview"!=this.$route.query.type&&(this.isLoading=!1,this.message="",t?(this.prompt="回复：".concat(t.username),this.commentId=t.comment_id):(this.commentId="",this.prompt="写评论"),this.show=!0,this.$nextTick(function(){a.$refs.field.focus()}),this.score="reply"!=e)},timeAgo:function(t){return Object(r["l"])(1e3*t)},toScroll:function(){this.toTopAndComment=!this.toTopAndComment,this.toTopAndComment?this.$refs.comment.scrollIntoView({behavior:"smooth"}):window.scrollTo(0,0)},toZoom:function(t){this.$router.push({name:"zoom",query:{id:t.user_id,back:this.$route.name,back_id:this.$route.query.id||this.$route.query.back_id}})},isShare:function(){"preview"!=this.$route.query.type&&(this.shareShow=!0)},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},zan:function(t){t.isZan=!t.isZan;var e={params:{comment_id:t.comment_id}};c["a"].get("/book/SchoolArticleComment/zan",e).then(function(e){switch(e.data.status){case 1:t.zan_count=e.data.data.zan_count;break}})}}},d=u,m=(a("3df9"),a("2877")),h=Object(m["a"])(d,s,i,!1,null,"2bc94fee",null);e["a"]=h.exports},db60:function(t,e,a){"use strict";var s=a("ab85"),i=a.n(s);i.a}}]);