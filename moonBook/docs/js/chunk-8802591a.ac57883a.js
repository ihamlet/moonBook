(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8802591a"],{"12f7":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"find page-padding"},[a("van-nav-bar",{attrs:{border:!1,title:t.$route.query.pageTitle?t.$route.query.pageTitle:t.$route.meta.title},on:{"click-right":t.toRanking}},[t.$route.query.pageTitle?t._e():a("div",{staticClass:"right-icon",attrs:{slot:"right"},slot:"right"},[a("van-button",{staticClass:"theme-btn theme-release",attrs:{type:"primary",size:"small",round:""}},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("排行榜")])],1)]),t.isFreshListShow?a("div",{staticClass:"module"},[a("freshList",{key:t.$route.query.tag_id,attrs:{list:t.freshList,cid:"user_id",avatar:"avatar",routerName:"zoom",name:"nickname"}})],1):t._e(),a("div",{staticClass:"warp"},[a("div",{staticClass:"container"},[a("van-tabs",{attrs:{color:"#0084ff","line-width":20,"line-height":4,sticky:"",swipeable:"",animated:"",border:!1},model:{value:t.indexTab,callback:function(e){t.indexTab=e},expression:"indexTab"}},t._l(t.tab,function(e,i){return a("van-tab",{key:i,attrs:{title:e.title}},[a("div",{staticClass:"tab-content"},[a("drying-list",{attrs:{cateId:e.cate_id||t.$route.query.cate_id,params:e.params,type:"find",tagId:t.$route.query.tag_id,school_id:t.$route.query.school_id,banji_id:t.$route.query.banji_id}})],1)])}),1)],1)]),"育儿专栏"!=t.$route.query.pageTitle&&"教育"!=t.$route.query.pageTitle&&"班级通知"!=t.$route.query.pageTitle?a("div",{staticClass:"release-footer-bar"},[a("van-button",{staticClass:"theme-btn theme-release",class:t.isBtnShow?"bounceIn animated":"",attrs:{round:"",size:"normal",type:"primary"},on:{click:function(e){return t.setReleaseSwitch(!0)}}},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("\n      发 布\n    ")]),a("van-popup",{staticClass:"tips-popup",attrs:{overlayStyle:{backgroundColor:"transparent"},"get-container":".footer-bar","lock-scroll":!1},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("tips",{attrs:{isShow:t.show,iconLength:t.$route.query.pageTitle?2:"",position:"bottom",cate:t.cateList[t.indexTab-1]},on:{close:function(e){return t.setReleaseSwitch(!1)}}})],1)],1):t._e()],1)},s=[],n=(a("ac6a"),a("cebc")),o=a("9993"),r=a("355b"),c=a("a009"),l=a("0606"),h=a("591a"),u={name:"find",components:{freshList:r["a"],dryingList:c["a"],tips:l["a"]},computed:Object(n["a"])({},Object(h["e"])(["releaseSwitch"]),Object(h["c"])(["managerState","userDataState"]),{isFreshListShow:function(){var t=!0;return(this.$route.query.cate_id||this.$route.query.tag_id)&&(t=!1),t},show:{get:function(){return this.releaseSwitch},set:function(t){this.setReleaseSwitch(t)}},tab:function(){var t=[];return this.$route.query.tag_id||this.$route.query.cate_id?(t.push({title:"全部",cate_id:this.$route.query.tag_id||this.$route.query.cate_id}),this.cateList&&this.cateList.forEach(function(e){var a={title:e.cate_name,cate_id:e.cate_id};t.push(a)})):t=[{title:"关注",params:{subscribe:1}},{title:"最新",params:{sort:"new"}},{title:"推荐",params:{level:1}}],t}}),data:function(){return{indexTab:1,cateList:"",freshList:[],topicList:[],isBtnShow:!1}},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()},created:function(){var t=this;this.fetchData(),this.$nextTick(function(){t.isBtnShow=!0})},watch:{$router:"fetchData"},methods:Object(n["a"])({},Object(h["d"])(["setReleaseSwitch"]),{fetchData:function(){var t=this,e={params:{is_random:1,tid:this.$route.query.tag_id||""}};o["a"].get("/book/SchoolArticle/recommendUsers",e).then(function(e){t.freshList=e.data}),this.getCate()},getCate:function(){var t=this,e={params:{cate_id:this.$route.query.tag_id||this.$route.query.cate_id}};149==this.$route.query.cate_id||this.$route.query.tag_id,e.params.is_visit=1,o["a"].get("/book/schoolArticleCate/getList",e).then(function(e){e.data[0].children.length&&(t.cateList=e.data[0].children)})},toRanking:function(){this.$router.push({name:"ranking",query:{id:this.userDataState.child_id}})}})},d=u,m=(a("459c"),a("2877")),p=Object(m["a"])(d,i,s,!1,null,"7a38f26a",null);e["default"]=p.exports},"355b":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fresh-list"},[t.list.length>0?a("div",{staticClass:"content scroll-x",class:t.type},t._l(t.list,function(e,i){return a("div",{key:i,staticClass:"scroll-item fadeInRight animated",style:{animationDelay:200*i+"ms"},on:{click:function(a){return t.toZoom(e)}}},[a("div",{staticClass:"avatar"},[e[t.avatar]?a("img",{attrs:{src:t.avatarLink(e[t.avatar]),alt:e[t.name]},on:{error:t.imgError}}):t._e()]),a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v("\n        "+t._s(e[t.name])+"\n      ")])])}),0):t._e()])},s=[],n=(a("a481"),a("7f7f"),{name:"fresh-list",props:["list","type","avatar","name","cid","routerName"],methods:{toZoom:function(t){this.$router.push({name:"zoom",query:{id:t[this.cid],back:this.$route.name,back_id:t.banji_id||t.child_id}})},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},avatarLink:function(t){if(-1==t.indexOf(location.origin))return t.replace("http:","https:")}}}),o=n,r=(a("bccf"),a("2877")),c=Object(r["a"])(o,i,s,!1,null,"0c94f412",null);e["a"]=c.exports},"35e4":function(t,e,a){"use strict";var i=a("d0cd"),s=a.n(i);s.a},"459c":function(t,e,a){"use strict";var i=a("8cfd"),s=a.n(i);s.a},"8cfd":function(t,e,a){},a009:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"drying-list"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[0==t.list.length?a("div",{staticClass:"no-content"},[t._v("\n          尚无内容\n        ")]):t._l(t.list,function(e,i){return a("div",{key:i,staticClass:"item",on:{click:function(a){return t.setItem(e)}}},[a("van-cell",[a("div",{staticClass:"content"},[a("graphic-card",{attrs:{item:e},on:{follow:t.follow,more:t.actionsheet}})],1)])],1)})],2)],1),a("van-action-sheet",{attrs:{actions:t.manageActions,"cancel-text":"取消","get-container":"#app"},on:{select:t.onRecommendSelect},model:{value:t.actionsheetShow,callback:function(e){t.actionsheetShow=e},expression:"actionsheetShow"}}),a("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消","get-container":"#app"},on:{select:t.onSelect,cancel:function(e){t.show=!1}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}}),a("van-action-sheet",{attrs:{actions:t.reportActions,"cancel-text":"取消","get-container":"#app"},on:{select:t.onReportSelect,cancel:function(e){t.reportShow=!1}},model:{value:t.reportShow,callback:function(e){t.reportShow=e},expression:"reportShow"}})],1)},s=[],n=(a("7f7f"),a("ac6a"),a("cebc")),o=a("9993"),r=a("591a"),c=a("77e0"),l=a("a618"),h={name:"drying-list",mixins:[c["d"]],components:{graphicCard:l["a"]},props:["params","tagId","school_id","type","portal_name","banji_id","cateId"],computed:Object(n["a"])({},Object(r["c"])(["userToken","managerState","userDataState"]),{manage:function(){var t=!1;return this.managerState&&this.managerState.forEach(function(e){"teacher"==e.item_relation&&(t=!0)}),t},actions:function(){var t=[{name:"推荐",type:"recommend",index:2}];return this.item.isMe?t.push({name:"删除",type:"delete",index:1}):(this.manage&&t.push({name:"删除",type:"delete",index:1}),t.push({name:"举报",type:"report",index:3})),t},reportActions:function(){var t=[];return t.push({name:"垃圾内容",subname:"低俗，标题党等"},{name:"拉黑",subname:"不再推送".concat(this.item?"".concat(this.item.user.name):"他","发布的内容"),is_block:1}),t}}),data:function(){return{postId:"",templateId:"",show:!1,DetailsId:0,pictureShow:!1,praiseShow:!1,actionsheetShow:!1,list:[],item:"",loading:!1,finished:!1,page:1,reportShow:!1}},methods:{getList:function(){var t=this,e={params:Object(n["a"])({page:this.page},this.params,{tag_id:this.tagId,route:this.type,cate_id:this.cid,banji_id:this.banji_id})};return this.school_id&&(e.params.school_id=this.school_id),this.portal_name&&(e.params.portal_name=this.portal_name),this.cateId&&(e.params.cate_id=this.cateId),o["a"].get("/book/SchoolArticle/getList",e).then(function(e){1==e.data.status?(1==t.page?t.list=e.data.data:t.list=t.list.concat(e.data.data),t.page++,t.loading=!1,t.list.length>=e.data.count&&(t.finished=!0)):(t.list=[],t.loading=!1,t.finished=!0)})},onLoad:function(){this.getList()},onRefresh:function(){var t=this;this.page=1,this.getList().then(function(){t.loading=!1,t.finished=!1})},follow:function(t){this.list.forEach(function(e){e.user_id==t.user_id&&(e.isSubscribe=!e.isSubscribe)}),o["a"].get("/book/MemberFollow/subscribe?user_id=".concat(t.user_id)).then(function(){})},onSelect:function(t){var e=this;switch(t.index){case 1:this.$dialog.confirm({title:"删除",message:"您确认要删除吗"}).then(function(){var t={params:{id:e.postId}};"apps-school"==e.$route.name&&(t.params.mode="school"),o["a"].get("/book/SchoolArticle/del",t).then(function(t){var a;1==t.data.status?(e.list.forEach(function(t,i){t.post_id==e.postId&&(a=i)}),e.list.splice(a,1),e.$toast.success("删除成功")):e.$toast(t.data.msg)})}).catch(function(){}),this.show=!1;break;case 2:if(this.managerState.length)this.actionsheetShow=!0,"apps-school"==this.$route.name&&this.manageActions.splice(this.manageActions.length-1,1);else{var a={title:"",message:"",routeName:""};switch("0"){case this.userDataState.school_id:a.title="请加入学校",a.message="加入学校，及时了解学校动态",a.routeName="edit-school";break;case this.userDataState.banji_id:a.title="请加入班级",a.message="加入班级，及时了解班级动态",a.routeName="edit-class";break}this.$dialog.confirm({title:a.title,message:a.message,cancelButtonText:"稍后",confirmButtonText:"加入"}).then(function(){e.$router.push({name:a.routeName})}).catch(function(){}),this.show=!1}break;case 3:this.reportShow=!0,this.show=!1;break}},actionsheet:function(t){this.show=!0,this.postId=t.post_id,this.templateId=t.template_id},onReportSelect:function(t){var e=this,a={params:{post_id:this.postId,reason:t.name,is_block:t.is_block?t.is_block:""}};o["a"].get("/book/SchoolArticle/report",a).then(function(t){e.$toast(t.data.msg);var a,i=e.list;i.forEach(function(t,i){e.item.post_id==t.post_id&&(a=i)}),e.list.splice(a,1)}),this.reportShow=!1},setItem:function(t){this.item=t},toggle:function(t){this.$refs.checkboxes[t].toggle()}}},u=h,d=(a("35e4"),a("2877")),m=Object(d["a"])(u,i,s,!1,null,"22cbe694",null);e["a"]=m.exports},bccf:function(t,e,a){"use strict";var i=a("f847"),s=a.n(i);s.a},d0cd:function(t,e,a){},f847:function(t,e,a){}}]);