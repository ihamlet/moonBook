(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c9c10452"],{"23bc":function(t,a,e){},"355b":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"fresh-list"},[t.list.length>0?e("div",{staticClass:"content scroll-x",class:t.type},t._l(t.list,function(a,s){return e("div",{key:s,staticClass:"scroll-item fadeInRight animated",style:{animationDelay:200*s+"ms"},on:{click:function(e){return t.toZoom(a)}}},[e("div",{staticClass:"avatar"},[a[t.avatar]?e("img",{attrs:{src:t.avatarLink(a[t.avatar]),alt:a[t.name]},on:{error:t.imgError}}):t._e()]),e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v("\n        "+t._s(a[t.name])+"\n      ")])])}),0):t._e()])},i=[],n=(e("a481"),e("7f7f"),{name:"fresh-list",props:["list","type","avatar","name","cid","routerName"],methods:{toZoom:function(t){this.$router.push({name:"zoom",query:{id:t[this.cid],back:this.$route.name,back_id:t.banji_id||t.child_id}})},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},avatarLink:function(t){if(-1==t.indexOf(location.origin))return t.replace("http:","https:")}}}),o=n,c=(e("bccf"),e("2877")),r=Object(c["a"])(o,s,i,!1,null,"0c94f412",null);a["a"]=r.exports},"75e0":function(t,a,e){"use strict";e.d(a,"h",function(){return i}),e.d(a,"c",function(){return n}),e.d(a,"k",function(){return c}),e.d(a,"e",function(){return d}),e.d(a,"f",function(){return u}),e.d(a,"i",function(){return m}),e.d(a,"j",function(){return h}),e.d(a,"b",function(){return o}),e.d(a,"a",function(){return r}),e.d(a,"d",function(){return l}),e.d(a,"g",function(){return v});var s=e("cebc"),i=["说一点什么吧，他都能听得到","随心而起，有感而发","千头万绪,落笔汇成评论一句","听说，爱评论的人粉丝多","从小陪伴孩子读绘本，日积月累","陪伴就是给孩子最好的爱","愿你像颗种子，勇敢地冲破泥沙","心似海，不敌诗的咏叹"],n=["👍 棒棒哒","🙆 声音很棒","💪 加油哦","👪 很温馨","👏 非常棒","😊 很可爱哦","👑 继续努力","😄 向你学习","🌞 积少成多","📚 推荐这本书","🏆 很精彩"],o=["再接再厉","向你学习","坚持下去","太厉害了","难能可贵"],c=["聪明在于勤奋，天才在于积累","腹有诗书气自华，读书万卷始通神","少成若天性，习惯如自然","锲而不舍，金石可镂","敏而好学，不耻下问","读书之法，在循序渐进，熟读而精思"],r=["阅读是关系孩子素养发展的重要因素","阅读能够提高孩子的语言技能","亲子阅读是传递亲情的桥梁","阅读可以促进儿童认知能力"],l="<p>一起关爱孩子们的成长，我们可以从阅读做起。阅亮书架，将认真与执着地做着这件事情，同时也吸引了无数有识之士加入其中，和我们一起播撒着幸福的种子。</p><p>在路上，我们满怀期待，愿与您同行......</p>",d=[{name:"好的开始",number:1,type:"punch"},{name:"小试牛刀",number:21,type:"punch"},{name:"坚持不懈",number:50,type:"punch"},{name:"渐入佳境",number:100,type:"punch"},{name:"扬帆远航",number:198,type:"punch"},{name:"持之以恒",number:365,type:"punch"},{name:"学富五车",number:660,type:"punch"},{name:"阅读之星",number:1e3,type:"punch"}],u=[{name:"好的开始",number:1,type:"read"},{name:"小试牛刀",number:20,type:"read"},{name:"坚持不懈",number:60,type:"read"},{name:"渐入佳境",number:120,type:"read"},{name:"扬帆远航",number:300,type:"read"},{name:"持之以恒",number:700,type:"read"},{name:"学富五车",number:1e3,type:"read"},{name:"阅亮之星",number:1500,type:"read"}];function m(t){var a=[];return d.forEach(function(e,i){t>=e.number&&a.push(Object(s["a"])({},e,{level:i+1})),0==t&&a.push(Object(s["a"])({},e,{level:0}))}),a}function h(t){var a=[];return u.forEach(function(e,i){t>=e.number&&a.push(Object(s["a"])({},e,{level:i+1})),0==t&&a.push(Object(s["a"])({},e,{level:0}))}),a}var v=["","","","","","","","","",""]},9791:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"book-details page-padding"},[e("van-nav-bar",{key:t.$route.query.id,attrs:{fixed:"",border:!1}},[e("div",{staticClass:"head-bar-title",attrs:{slot:"title"},slot:"title"},[e("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[t.themeBarSearch?e("div",{key:"2"},[t._v(t._s(t.details.title))]):e("div",{key:"1"},[t._v(t._s(t.$route.meta.title))])])],1)]),e("div",{staticClass:"container"},[e("div",{staticClass:"module"},[e("div",{ref:"domHeight",staticClass:"book-card"},[e("div",{staticClass:"tag"},[t.details.is_read?e("van-tag",{attrs:{mark:"",type:"success",size:"large"}},[t._v("已读")]):e("van-tag",{attrs:{mark:"",type:"danger",size:"large"}},[t._v("未读")])],1),e("van-row",{key:t.$route.query.id,attrs:{gutter:"10"}},[e("van-col",{attrs:{span:"9"}},[e("div",{staticClass:"book-thumb"},[e("img",{attrs:{src:t.details.thumb},on:{error:function(a){return t.imgError(a,t.details)}}})])]),e("van-col",{attrs:{span:"13"}},[e("div",{staticClass:"content"},[e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.details.title))]),e("van-rate",{attrs:{disabled:"","disabled-color":"#ffd21e"},model:{value:t.star,callback:function(a){t.star=a},expression:"star"}}),e("div",{staticClass:"book-info"},[e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"author"},[e("b",[t._v("作者:")]),t._v(t._s(t.details.author))]),t.details.borrow_count>0?e("div",{staticClass:"borrow-count"},[e("span",{staticClass:"people"},[t._v(t._s(t.details.borrow_count))]),t._v("人借过")]):t._e()])],1)])],1),e("van-col",{attrs:{span:"1"}},[e("div",{staticClass:"listening",on:{click:function(a){return t.listening(t.details)}}},[e("i",{staticClass:"iconfont"},[t._v("")])])])],1)]),t.freshList.length?e("div",{staticClass:"module"},[e("freshList",{key:t.$route.query.id,attrs:{list:t.freshList,cid:"child_id",avatar:"child_avatar",routerName:"baby-home",name:"child_name"}})],1):t._e(),t.details.details||t.details.recommend_comment?e("div",{staticClass:"module"},[t.details.details?e("div",{staticClass:"item-details"},[e("div",{staticClass:"module-title"},[t._v("图书简介")]),e("van-cell",{attrs:{border:!1}},[e("div",{staticClass:"details-text"},[t._v("\n            "+t._s(t.details.details)+"\n          ")])])],1):t._e(),t.details.recommend_comment?e("div",{staticClass:"item-details"},[e("div",{staticClass:"module-title"},[t._v("编辑推荐")]),e("van-cell",{attrs:{border:!1}},[e("div",{staticClass:"details-text"},[t._v("\n            "+t._s(t.details.recommend_comment)+"\n          ")])])],1):t._e()]):t._e(),e("div",{staticClass:"comment-box"},[e("comment",{key:t.$route.query.id,attrs:{item:t.details,type:"bookDetails",postId:t.details.post_id}})],1)])],1)},i=[],n=(e("a481"),e("cebc")),o=e("9993"),c=e("355b"),r=e("c629"),l=e("591a"),d=e("bec1"),u=e("77e0"),m={name:"book-details",mixins:[u["i"]],components:{freshList:c["a"],comment:r["a"]},computed:Object(n["a"])({},Object(l["c"])(["userDataState"]),Object(l["e"])("openWX",["ready"]),{star:function(){var t=3;return this.details&&(t=Math.ceil(this.details.star/2)),t}}),data:function(){return{details:"",freshList:""}},created:function(){this.fetchData()},beforeRouteLeave:function(t,a,e){t.meta.keepAlive=!1,e()},updated:function(){this.wxShare()},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(n["a"])({},Object(l["b"])("openWX",["share"]),{wxShare:function(){var t={item:this.details,success:function(){}};this.share(t)},imgError:function(t){t.target.src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg"},fetchData:function(){var t=this,a={params:{book_id:this.$route.query.id,child_id:this.userDataState.child_id}};o["a"].get("/book/ShelfBook/getInfo",a).then(function(a){1==a.data.status&&(t.details=a.data.data)}),o["a"].get("/book/ShelfBookChild/getList",a).then(function(a){1==a.data.status&&(t.freshList=Object(d["a"])(a.data.data,"user_id"))})},listening:function(t){var a=/（.+?）/,e=t.title.replace(a,""),s="https://m.ximalaya.com/search/".concat(e),i=localStorage.getItem("bookRead_"+t.tushu_id);i?location.href=s:o["a"].get("/book/story/updateRead").then(function(){localStorage.setItem("bookRead_"+t.tushu_id,!0),location.href=s})}})},h=m,v=(e("f685"),e("2877")),p=Object(v["a"])(h,s,i,!1,null,"519bde13",null);a["default"]=p.exports},bccf:function(t,a,e){"use strict";var s=e("f847"),i=e.n(s);i.a},c629:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.flag?e("div",{ref:"comment",staticClass:"comment-list",attrs:{id:"comment"}},[e("van-nav-bar",{key:t.$route.query.id,attrs:{border:!1,zIndex:0}},[e("div",{staticClass:"zan",attrs:{slot:"right"},slot:"right"},[t._v("赞 "+t._s(t.item.zan_num))]),e("div",{staticClass:"comment",attrs:{slot:"left"},slot:"left"},[t._v(t._s(t.listLength)+" 评论")])]),0==t.listLength?e("div",{staticClass:"no-centent"},[e("div",{staticClass:"prompt",on:{click:function(a){return t.showField()}}},[t._v("暂无评论,点击抢沙发")])]):t._e(),e("div",{staticClass:"container"},[e("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.list,function(a,s){return e("van-cell",{key:s},[e("div",{staticClass:"user-card flex flex-align"},[e("div",{staticClass:"user-info flex flex-align"},[e("div",{staticClass:"avatar",on:{click:function(e){return t.toZoom(a)}}},[e("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:a.avatar}})]),e("div",{staticClass:"user-data"},[e("span",{staticClass:"user-name"},[t._v(t._s(a.username))])])]),e("div",{staticClass:"zan flex flex-align",on:{click:function(e){return t.zan(a)}}},[a.isZan?e("i",{staticClass:"iconfont highlight rotateInDownLeft animated"},[t._v("")]):e("i",{staticClass:"iconfont"},[t._v("")]),e("div",{staticClass:"num"},[t._v(t._s(a.zan_count))])])]),e("div",{staticClass:"contents"},[t._v("\n          "+t._s(a.contents)+"\n        ")]),e("div",{staticClass:"reply"},[0!=a.replyList.length?e("div",{staticClass:"reply-content"},t._l(a.replyList,function(s,i){return e("div",{key:i,staticClass:"list"},[e("div",{staticClass:"item"},[e("span",{staticClass:"reply-title"},[e("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n                  "+t._s(s.username)+"回复"+t._s(a.username)+"\n                ")]),e("span",{staticClass:"reply-contents"},[t._v("\n                  "+t._s(s.contents)+"\n                ")])])])}),0):t._e(),a.quote?e("div",{staticClass:"reply-content"},[e("div",{staticClass:"list"},[e("div",{staticClass:"item"},[e("span",{staticClass:"reply-title"},[e("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n                  "+t._s(a.quote.username)+"的评论\n                ")]),e("span",{staticClass:"reply-contents"},[t._v("\n                  "+t._s(a.quote.contents)+"\n                ")])])])]):t._e(),e("div",{staticClass:"comment-bar flex flex-align"},[e("div",{staticClass:"date"},[t._v(t._s(t.timeAgo(a.create_time)))]),e("div",{staticClass:"theme-color",on:{click:function(e){return t.showField(a,"reply")}}},[e("van-tag",{attrs:{round:"",size:"large",type:"primary"}},[t._v(t._s(a.replyList.length?a.replyList.length:"")+"回复")])],1)])])])}),1)],1),e("div",{staticClass:"comment"},[e("div",{staticClass:"footer-bar"},[e("div",{staticClass:"bar-padding flex flex-align"},[e("div",{staticClass:"input-box flex flex-align",on:{click:function(a){return t.showField()}}},[e("div",{staticClass:"input-box-avatar avatar"},[e("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.userDataState.avatar},on:{error:t.imgError}})]),e("span",[t._v("写评论")])]),e("div",{staticClass:"btn-icon flex flex-align"},[e("div",{staticClass:"btn",on:{click:t.toScroll}},[t.listLength>0?e("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.listLength>1e3?"999+":t.listLength))]):t._e(),e("i",{staticClass:"iconfont"},[t._v("")])],1),e("div",{staticClass:"btn",on:{click:function(a){return t.addPraise(t.item)}}},[t.item.zan_num>0?e("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.item.zan_num>1e3?"999+":t.item.zan_num))]):t._e(),t.item.isZan?e("i",{staticClass:"iconfont highlight rotateInDownLeft animated"},[t._v("")]):e("i",{staticClass:"iconfont"},[t._v("")])],1),"include"!=t.include?e("div",{staticClass:"btn",on:{click:function(a){return t.addCollect(t.item)}}},[t.item.collect_num>0?e("van-tag",{staticClass:"num-tag",attrs:{round:"",type:"danger"}},[t._v(t._s(t.item.collect_num>1e3?"999+":t.item.collect_num))]):t._e(),t.item.isShoucang?e("i",{staticClass:"iconfont star highlight swing animated"},[t._v("")]):e("i",{staticClass:"iconfont"},[t._v(" ")])],1):e("div",{staticClass:"btn",on:{click:t.isShare}},[e("i",{staticClass:"iconfont"},[t._v("")])])])])]),e("van-popup",{staticClass:"comment-popup",attrs:{"overlay-class":"bg-opacity",position:"top","get-container":"#app"},on:{close:function(a){return t.$refs.field.blur()}},model:{value:t.show,callback:function(a){t.show=a},expression:"show"}},["include"!=t.include&&t.score?e("div",{staticClass:"score flex-column"},[e("div",{staticClass:"score-title"},[t._v("评分")]),e("van-rate",{staticClass:"score-rate",attrs:{size:25,count:5,"void-color":"#ceefe8"},model:{value:t.star,callback:function(a){t.star=a},expression:"star"}})],1):t._e(),e("div",{staticClass:"comment-content"},[e("div",{staticClass:"field-box"},[e("van-field",{ref:"field",staticClass:"comment-field",attrs:{border:!1,size:"large",type:"textarea",placeholder:t.placeholder,autosize:{maxHeight:200,minHeight:100}},model:{value:t.message,callback:function(a){t.message=a},expression:"message"}})],1)]),1==t.item.template_id?e("div",{staticClass:"comment-tag scroll-x"},t._l(t.commentTag,function(a,s){return e("div",{key:s,staticClass:"scroll-item jackInTheBox animated",style:{animationDelay:100*s+"ms"},on:{click:function(e){return t.biuCommentTag(a)}}},[e("van-button",{staticClass:"tag-item",attrs:{round:"",type:"default"}},[t._v(t._s(a))])],1)}),0):t._e(),e("van-cell",[e("van-button",{staticClass:"theme-btn",attrs:{loading:t.isLoading,size:"normal",type:"primary",round:""},on:{click:t.submit}},[t._v("发 布")])],1)],1)],1),e("van-popup",{staticClass:"share-popup",attrs:{"get-container":"#app"},model:{value:t.shareShow,callback:function(a){t.shareShow=a},expression:"shareShow"}},[e("div",{staticClass:"share-img"},[e("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/shareWord.png"}})])])],1):t._e()},i=[],n=(e("7f7f"),e("55dd"),e("cebc")),o=e("591a"),c=e("9993"),r=e("bec1"),l=e("75e0"),d={name:"comment",props:["item","include","type","postId","isCommentShow"],computed:Object(n["a"])({},Object(o["c"])(["userToken","userDataState"]),{placeholder:function(){var t;return t=this.commentId?this.prompt:Object(r["f"])(l["h"],1)[0],t},commentTag:function(){return l["c"].sort(function(){return Math.random()-.5}),l["c"]}}),data:function(){return{star:3,list:[],toTopAndComment:!1,listLength:"",loading:!1,finished:!1,page:1,commentId:"",show:!1,isLoading:!1,message:"",shareShow:!1,score:!1,flag:!1,prompt:""}},watch:{postId:function(t){var a=this;this.flag=!0,"comments"==this.$route.query.point&&this.$nextTick(function(){a.$refs.comment.scrollIntoView()}),c["a"].get("/book/SchoolArticleComment/getList",{params:{post_id:t}}).then(function(t){switch(t.data.status){case 1:a.listLength=t.data.count;break;default:a.$toast(t.data.msg)}})},show:function(t){this.$emit("showComment",t)}},methods:{onLoad:function(){var t=this,a={params:{post_id:this.postId,page:this.page,limit:10,sort:"new"}};return c["a"].get("/book/SchoolArticleComment/getList",a).then(function(a){if(1==a.data.status){var e=a.data.data;1==t.page?t.list=e:t.list=t.list.concat(e),t.loading=!1,t.page++,t.list.length>=a.data.count&&(t.finished=!0)}})},biuCommentTag:function(t){this.message=t,this.submit()},submit:function(){var t=this;this.isLoading=!0;var a={post_id:this.item.post_id,contents:this.message,tags:this.item.ad_label};this.commentId?a.reply_comment_id=this.commentId:a.star=2*this.star,this.message.length?c["a"].post("/book/SchoolArticleComment/edit?ajax=1",a).then(function(a){1==a.data.status?(t.show=!1,t.page=1,t.onLoad(),t.$toast.success(a.data.info),t.isLoading=!1,t.$refs.comment.scrollIntoView()):t.$toast.fail(a.data.info)}):this.$toast("请填写评论内容")},addPraise:function(t){var a=this;if("preview"!=this.$route.query.type){t.isZan=!t.isZan;var e={params:{ajax:1,id:this.item.post_id}};c["a"].get("/book/SchoolArticle/zan",e).then(function(e){1==e.data.status&&(t.isZan?t.zan_num++:t.zan_num--,"1"==e.data.data.like&&a.$toast.success({className:"zan-icon toast-icon"}))})}},addCollect:function(t){var a=this;t.isShoucang=!t.isShoucang;var e={params:{post_id:this.postId}};c["a"].get("/book/SchoolArticleCollect/add",e).then(function(e){1==e.data.status&&(t.isShoucang?t.collect_num++:t.collect_num--,t.isShoucang||a.$toast.success({className:"shoucang-icon toast-icon"}))})},showField:function(t,a){var e=this;"preview"!=this.$route.query.type&&(this.isLoading=!1,this.message="",t?(this.prompt="回复：".concat(t.username),this.commentId=t.comment_id):(this.commentId="",this.prompt="写评论"),this.show=!0,this.$nextTick(function(){e.$refs.field.focus()}),this.score="reply"!=a)},timeAgo:function(t){return Object(r["l"])(1e3*t)},toScroll:function(){this.toTopAndComment=!this.toTopAndComment,this.toTopAndComment?this.$refs.comment.scrollIntoView({behavior:"smooth"}):window.scrollTo(0,0)},toZoom:function(t){this.$router.push({name:"zoom",query:{id:t.user_id,back:this.$route.name,back_id:this.$route.query.id||this.$route.query.back_id}})},isShare:function(){"preview"!=this.$route.query.type&&(this.shareShow=!0)},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},zan:function(t){t.isZan=!t.isZan;var a={params:{comment_id:t.comment_id}};c["a"].get("/book/SchoolArticleComment/zan",a).then(function(a){switch(a.data.status){case 1:t.zan_count=a.data.data.zan_count;break}})}}},u=d,m=(e("fc52"),e("2877")),h=Object(m["a"])(u,s,i,!1,null,"298900e0",null);a["a"]=h.exports},ce98:function(t,a,e){},f685:function(t,a,e){"use strict";var s=e("23bc"),i=e.n(s);i.a},f847:function(t,a,e){},fc52:function(t,a,e){"use strict";var s=e("ce98"),i=e.n(s);i.a}}]);