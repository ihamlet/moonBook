(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-409042be"],{"0df1":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"vip-level"},[1==t.level?e("i",{staticClass:"iconfont",class:[1==t.level?"icon-1":""]},[t._v("")]):t._e(),2==t.level?e("i",{staticClass:"iconfont",class:[2==t.level?"icon-2":""]},[t._v("")]):t._e(),3==t.level?e("i",{staticClass:"iconfont",class:[3==t.level?"icon-3":""]},[t._v("")]):t._e(),4==t.level?e("i",{staticClass:"iconfont",class:[4==t.level?"icon-4":""]},[t._v("")]):t._e(),1==t.animate?e("div",{staticClass:"highlight"}):t._e()])},i=[],n={name:"vip-level",props:["level","animate"]},o=n,c=(e("16b4"),e("2877")),r=Object(c["a"])(o,s,i,!1,null,"4b9ff89e",null);a["a"]=r.exports},"16b4":function(t,a,e){"use strict";var s=e("bcd6"),i=e.n(s);i.a},"2b4a":function(t,a,e){"use strict";var s=e("3aef"),i=e.n(s);i.a},"2e44":function(t,a,e){},3224:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"apps module-card flex flex-align",class:t.type},t._l(t.appsList,function(a,s){return e("div",{key:s,staticClass:"icon",on:{click:function(e){return t.toPage(a)}}},[e("div",{staticClass:"iconfont",class:[a.iconClass,0==s&&"apps-school"==t.$route.name?"rotate":""]}),e("div",{staticClass:"name"},[t._v(t._s(a.name))])])}),0)},i=[],n={name:"apps",props:["appsList","type"],methods:{toPage:function(t){t.routeLink?window.location=t.routeLink:t.params&&this.$router.push({name:t.path,query:t.params})}}},o=n,c=(e("cfb0"),e("2877")),r=Object(c["a"])(o,s,i,!1,null,"096fee60",null);a["a"]=r.exports},"352c":function(t,a,e){},"3aef":function(t,a,e){},4679:function(t,a,e){"use strict";var s=e("bec0"),i=e.n(s);i.a},5050:function(t,a,e){},5767:function(t,a,e){"use strict";var s=e("352c"),i=e.n(s);i.a},5778:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"avatar-default",class:[t.size,t.avatarClass]},[1==t.gender?e("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/boy-avatar.png",alt:"默认男孩头像"}}):e("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/girl-avatar.png",alt:"默认女孩头像"}})])},i=[],n={name:"avatar",props:["gender","size","avatarClass"]},o=n,c=(e("7335"),e("2877")),r=Object(c["a"])(o,s,i,!1,null,"ba617808",null);a["a"]=r.exports},"5b1e":function(t,a,e){"use strict";var s=e("5050"),i=e.n(s);i.a},"5c8c":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"slogan"},[t._v("\n    "+t._s(t.$store.state.slogan)+"\n")])},i=[],n={name:"slogan"},o=n,c=(e("d071"),e("2877")),r=Object(c["a"])(o,s,i,!1,null,"ef722a5e",null);a["a"]=r.exports},"72af":function(t,a,e){"use strict";var s=e("ef4f"),i=e.n(s);i.a},7335:function(t,a,e){"use strict";var s=e("2e44"),i=e.n(s);i.a},"95e9":function(t,a,e){},b204:function(t,a,e){"use strict";var s=e("ba3b"),i=e.n(s);i.a},ba3b:function(t,a,e){},bcd6:function(t,a,e){},bec0:function(t,a,e){},cece:function(t,a,e){},cfb0:function(t,a,e){"use strict";var s=e("cece"),i=e.n(s);i.a},d071:function(t,a,e){"use strict";var s=e("95e9"),i=e.n(s);i.a},e19a:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"my page-padding"},[e("card-head",{attrs:{userInfo:t.userDataState,children:t.children[0],couponCount:t.couponCount}}),e("div",{staticClass:"gutter gap"},[1==t.isTeacher||1==t.isHeaderTeacher?e("apps",{attrs:{appsList:t.appsList}}):t._e()],1),e("div",{staticClass:"gutter gap"},[0!=t.children.length?e("class-home",{attrs:{children:t.children[0]}}):t._e()],1),t.zoomCard?e("div",{staticClass:"gutter gap"},[e("zone-card",{attrs:{zoomCard:t.zoomCard,userInfo:t.userDataState}})],1):t._e(),e("div",{staticClass:"gutter gap"},[e("baby-list",{attrs:{childrenList:t.children}})],1),e("slogan")],1)},i=[],n=e("cebc"),o=e("9993"),c=e("591a"),r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{ref:"domHeight",staticClass:"head head-background"},[e("van-nav-bar",{key:t.$route.query.id,class:[t.fixedHeaderBar?"theme-nav":""],attrs:{border:!1,zIndex:100,fixed:"",title:t.fixedHeaderBar?t.$route.meta.title:t.userInfo.name},on:{"click-left":t.onClickLeft}},[e("div",{staticClass:"head-bar-icon",attrs:{slot:"left"},slot:"left"},[e("i",{staticClass:"iconfont"},[t._v("")])]),e("div",{staticClass:"head-bar-icon bar-right",attrs:{slot:"right"},slot:"right"},[e("i",{staticClass:"iconfont",on:{click:t.toHelp}},[t._v("")]),e("i",{staticClass:"iconfont coupon",on:{click:t.toPopupList}},[t._v("")]),t.couponCount>0?e("div",{staticClass:"tips",on:{click:t.toPopupList}},[e("van-tag",{attrs:{round:"",type:"danger"}},[t._v(t._s(t.couponCount))])],1):t._e()])]),e("div",{staticClass:"user-info flex flex-justify"},[e("div",{staticClass:"info"},[t.children?e("i",{staticClass:"iconfont"},[t._v("")]):t._e(),t.userInfo.avatar?e("div",{staticClass:"avatar"},[e("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.userInfo.avatar}})]):e("avatar",{attrs:{size:"medium",avatarClass:"border"}}),t.children?e("div",{staticClass:"children-info",on:{click:t.toBabyHome}},[e("img",{directives:[{name:"http2https",rawName:"v-http2https"}],staticClass:"children-avatar",attrs:{src:t.children.avatar}})]):t._e(),e("div",{staticClass:"name"},[t._v(t._s(t.userInfo.name))])],1),e("div",{staticClass:"card slideInUp animated"},[e("div",{staticClass:"borrow-card"},[t.userInfo.card_level>0?e("div",{staticClass:"library-card flex flex-align",on:{click:t.onClickLeft}},[e("img",{staticClass:"logo",attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png"}}),e("div",{staticClass:"card-info flex flex-align"},[e("div",{staticClass:"card-name"},[t._v(t._s(t.userInfo.card_name))]),e("vipLevel",{attrs:{level:t.userInfo.card_level,animate:"1"}}),e("i",{staticClass:"iconfont icon-right"},[t._v("")])],1)]):e("div",{staticClass:"no-service flex flex-align flex-justify",on:{click:t.toAccept}},[t._v("您还没有办理借阅卡?\n          "),e("div",{staticClass:"theme-color"},[t._v("前往办卡")]),e("i",{staticClass:"iconfont"},[t._v("")])])])])])],1)},l=[],u=(e("7f7f"),e("77e0")),d=e("5778"),h=e("0df1"),m={name:"cardHead",mixins:[u["i"]],components:{avatar:d["a"],vipLevel:h["a"]},props:["userInfo","children","couponCount"],data:function(){return{active:0,punchShow:!1,applyShow:!1}},methods:{getDomHeight:function(){this.$refs.head&&(this.domHeight=this.$refs.head.offsetHeight/2)},onClickLeft:function(){this.$router.push({name:"card-list"})},toHelp:function(){location.href="/book/manual/user"},toAccept:function(){this.$router.push({name:"AcceptSchoolList"})},onAccpetPage:function(){this.applyShow=!1},onStepActiveChange:function(t){this.active=t},toBabyHome:function(){this.$router.push({name:"baby-home",query:{id:this.children.id,back:this.$route.name}})},toPopupList:function(){this.$router.push({name:"popupList"})}}},f=m,v=(e("5767"),e("2877")),p=Object(v["a"])(f,r,l,!1,null,"7e35a62c",null),b=p.exports,C=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"module-card"},[e("van-cell-group",[e("van-cell",{attrs:{value:t.formatBanjiTitle(t.selectPrompt.prompt),"is-link":"",center:""},on:{click:t.toClassHome}},[e("div",{staticClass:"icon",attrs:{slot:"icon"},slot:"icon"},[e("i",{staticClass:"iconfont"},[t._v("")])]),e("div",{staticClass:"title flex flex-align",attrs:{slot:"title"},slot:"title"},[e("div",{staticClass:"avatar"},[e("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.children.avatar,alt:t.children.child_name}})]),t._v("\n        "+t._s(t.children.name)+"\n      ")])])],1)],1)},g=[],_=e("bec1"),y={name:"class-home",props:["children"],mixins:[u["e"]],computed:Object(n["a"])({},Object(c["c"])(["userDataState"]),{selectPrompt:function(){return 0==this.children.school_id?{prompt:"请选择学校班级",type:0}:0==this.children.banji_id?{prompt:"请选择班级",type:1}:{prompt:this.children.banji_name,type:2}}}),data:function(){return{showSchool:!1,showClass:!1,school:""}},methods:{toClassHome:function(){switch(this.selectPrompt.type){case 0:this.$router.push({name:"edit-school",query:{id:this.children.id}});break;case 1:var t=Object(_["e"])(new Date,"yyyy-MM-dd");this.$router.push({name:"edit-class",query:{id:this.children.id,school_id:this.children.school_id,birthday:t,school_name:this.userDataState.school_name}});break;case 2:this.$router.push({name:"class-home",query:{id:this.children.banji_id}});break}}}},k=y,x=(e("2b4a"),Object(v["a"])(k,C,g,!1,null,"6b7702ef",null)),L=x.exports,j=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"zone"},[e("div",{staticClass:"module-card"},[e("van-cell-group",{staticClass:"cell-group"},[e("van-cell",{staticClass:"cell",attrs:{center:"","is-link":""},on:{click:t.toZoom}},[e("span",{staticClass:"icon",attrs:{slot:"icon"},slot:"icon"},[e("i",{staticClass:"iconfont"},[t._v("")])]),e("div",{staticClass:"content flex flex-align flex-justify",attrs:{slot:"title"},slot:"title"},[e("show-card",{attrs:{imgList:t.imgList,text:t.text}})],1)])],1)],1)])},w=[],$=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.imgArray.length>0?e("div",{staticClass:"img-preview flex flex-justify"},t._l(t.imgArray,function(a,s){return e("div",{key:s,staticClass:"grid"},[e("img",{attrs:{src:a.thumb},on:{error:t.imgError}})])}),0):e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"text-preview"},[t._v(t._s(t.text))])},H=[],I=(e("ac6a"),{name:"show-card",props:["imgList","text"],computed:{imgArray:function(){var t=this.imgList,a=[];return t.forEach(function(t){null!=t&&a.push(t)}),a.slice(0,4)}},methods:{imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"}}}),z=I,S=(e("4679"),Object(v["a"])(z,$,H,!1,null,"0e2f6e33",null)),D=S.exports,q={name:"zone",props:["zoomCard","userInfo"],components:{showCard:D},computed:{imgList:function(){return this.zoomCard.photos?this.zoomCard.photos:""},text:function(){var t;return t=this.zoomCard.details.length>1?this.zoomCard.details:this.zoomCard.title,"《".concat(t,"》")}},methods:{toZoom:function(){this.$router.push({name:"zoom",query:{id:this.userInfo.id,back:this.$route.name}})}}},T=q,O=(e("b204"),Object(v["a"])(T,j,w,!1,null,"70cf83ec",null)),E=O.exports,P=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"baby-home"},[e("div",{staticClass:"module-card"},[0==t.childrenList.length?e("div",{staticClass:"add-baby flipInX animated",on:{click:t.toAddChild}},[e("i",{staticClass:"iconfont hot"},[t._v("")]),t._m(0)]):e("div",{staticClass:"list"},[e("div",{staticClass:"module-title"},[t._v("我的宝贝")]),t._l(t.childrenList,function(a,s){return e("div",{key:s,staticClass:"item module"},[e("div",{staticClass:"card-top-bar"},[e("van-nav-bar",{attrs:{title:""+a.name,"right-text":"编辑","left-text":a.banji_name?t.formatBanjiTitle(a.banji_name):"班级",border:!1},on:{"click-left":function(e){return t.onClickLeft(a)},"click-right":function(e){return t.onClickRight(a)}}})],1),e("div",{staticClass:"baby-info flex flex-align",on:{click:function(e){return t.toPageBabyHome(a)}}},[e("div",{staticClass:"volume"},[t._v("\n            阅读量\n            "),e("span",{staticClass:"number"},[t._v(t._s(a.sign_read_count))])]),e("div",{staticClass:"content"},[a.avatar?e("div",{staticClass:"avatar",class:a.sex},[e("img",{attrs:{src:a.avatar,alt:"宝贝头像"},on:{error:t.imgError}})]):e("avatar",{attrs:{gender:a.sex}}),e("div",{staticClass:"age"},[t._v(t._s(a.age)+"岁")]),a.school_id>0?e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"school"},[t._v(t._s(a.school_name))]):t._e()],1),e("div",{staticClass:"volume"},[t._v("\n            获赞量\n            "),e("span",{staticClass:"number"},[t._v(t._s(a.zan_count))])])])])}),e("van-button",{staticClass:"theme-btn",attrs:{plain:"",round:"",type:"primary",size:"normal"},on:{click:t.toAddChild}},[t._v("添加宝贝")])],2)])])},B=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("i",{staticClass:"iconfont baby-hd"},[t._v("")]),t._v("\n        让孩子爱上阅读\n        "),e("div",{staticClass:"theme-color"},[t._v("添加孩子")])])}],A={name:"baby-list",props:["childrenList"],mixins:[u["e"]],components:{avatar:d["a"]},computed:Object(n["a"])({},Object(c["c"])(["userDataState"])),data:function(){return{babyId:"",listenData:"",childId:"",pageTitle:"addBaby",schoolName:"",child:""}},methods:{toAddChild:function(){this.$router.push({name:"edit-child",query:{pageTitle:"添加宝贝",type:"add"}}),localStorage.removeItem("childInfo")},onClickRight:function(t){this.pageTitle="editBaby",this.$router.push({name:"edit-child",query:{id:t.id,pageTitle:"编辑宝贝",type:"edit",back:this.$route.name}})},onClickLeft:function(t){0==t.school_id?this.$router.push({name:"edit-school",query:Object(n["a"])({},t,{type:"edit"})}):0==t.banji_id?this.$router.push({name:"edit-class",query:Object(n["a"])({},t,{type:"edit"})}):this.$router.push({name:"class-home",query:{id:t.banji_id,back:this.$route.name}})},toPageBabyHome:function(t){this.$router.push({name:"baby-home",query:{id:t.id,back:this.$route.name}})},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"}}},M=A,N=(e("72af"),Object(v["a"])(M,P,B,!1,null,"d0f0ba52",null)),R=N.exports,X=e("3224"),W=e("5c8c"),Z={name:"my",components:{slogan:W["a"],cardHead:b,zoneCard:E,babyList:R,classHome:L,apps:X["a"]},computed:Object(n["a"])({},Object(c["c"])(["userDataState"])),data:function(){return{couponCount:0,children:"",zoomCard:"",isTeacher:0,isHeaderTeacher:0,appsList:[{name:"代借还",iconClass:"icon-huanshu",routeLink:"/book/ManageBorrow/borrow"},{name:"定位码",iconClass:"icon-saomadingwei",routeLink:"/book/ManageShelf/location"},{name:"数据",iconClass:"icon-shuju",routeLink:"/SchoolManage/MemberCard"},{name:"权限管理",iconClass:"icon-quanxian",routeLink:"/SchoolManage"},{name:"捐书",iconClass:"icon-shujia",routeLink:"/book/member/entry_donation"}]}},created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var t=this;if(o["a"].get("/book/SchoolTeacher/getMine").then(function(a){1==a.data.status&&(t.isTeacher=a.data.data.is_confirm)}),o["a"].get("/book/SchoolTeacher/getMine?is_master=1").then(function(a){1==a.data.status&&(t.isHeaderTeacher=a.data.data.is_confirm)}),null!=this.userDataState.id){var a={params:{sort:"old",user_id:this.userDataState.id}};o["a"].get("/book/baby/getList",a).then(function(a){t.children=a.data.data});var e={params:{page:1,sort:"new",user_id:this.userDataState.id}};o["a"].get("/book/SchoolArticle/getList",e).then(function(a){t.zoomCard=a.data.data[0]})}else this.$toast.fail("获取数据失败");o["a"].get("/book/member/get_coupon_downloads").then(function(a){t.couponCount=a.data.count})}}},U=Z,J=(e("5b1e"),Object(v["a"])(U,s,i,!1,null,"474a2262",null));a["default"]=J.exports},ef4f:function(t,a,e){}}]);