(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78d91a7a"],{"01eb":function(t,e,a){"use strict";var i=a("39d6"),n=a.n(i);n.a},"39d6":function(t,e,a){},"3a09":function(t,e,a){"use strict";var i=a("53c6"),n=a.n(i);n.a},"53c6":function(t,e,a){},"876b":function(t,e,a){},abd3:function(t,e,a){"use strict";var i=a("876b"),n=a.n(i);n.a},cba5:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"banji-tree flex"},[a("div",{staticClass:"dropdown-menu"},[a("van-dropdown-menu",[a("van-dropdown-item",{attrs:{options:t.option},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1),a("div",{staticClass:"tree-select"},[a("ul",{staticClass:"scroll-y scroll-container"},t._l(t.banjiList,function(e,i){return a("li",{key:i,staticClass:"tree-item",class:t.activeId==i?"select":"",on:{click:function(a){return t.onNavClick(e,i)}}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"banji-title"},[t._v(t._s(0==i?e.title:t.formatBanjiTitle(e.title)))]),a("div",{staticClass:"student-count"},[t._v(t._s(0==e.student_count?"尚无成员":e.student_count+"人"))])])}),0)]),a("div",{staticClass:"tree-content scroll-y scroll-container"},[a("div",{staticClass:"list-wrap page-padding"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan,offset:0},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[t.banjiItems.length?a("div",{staticClass:"list-container"},t._l(t.banjiItems,function(e,i){return a("studentCard",{key:i,attrs:{item:e,activeId:t.activeId,selectShow:t.selectShow},on:{selectShowTrue:function(e){t.selectShow=!0},electChild:t.selectSwitch}})}),1):-1==t.value&&t.currentBanji.invite_code?a("div",{staticClass:"no-list"},[t._v("\n            尚无班级成员 "),a("span",{staticClass:"theme-color",attrs:{size:"normal"},on:{click:t.invite}},[t._v("邀请家长")])]):a("div",{staticClass:"no-list"},[t._v("\n            尚无"+t._s(1==t.value?"已":"待")+"审核成员\n            "),0!=t.activeId&&t.currentBanji.invite_code?a("b",{staticClass:"invite-code",on:{click:t.invite}},[t._v("班级邀请码:"+t._s(t.currentBanji.invite_code))]):t._e()])])],1)],1),a("transition",{attrs:{"enter-active-class":"slideInUp animated","leave-active-class":"slideOutDown animated",mode:"out-in"}},[t.selectShow?a("div",{staticClass:"footer-bar flex flex-align"},[a("div",{staticClass:"cancel theme-color",on:{click:t.cancel}},[t._v("取消")]),a("van-button",{staticClass:"switch-class btn",attrs:{square:"",type:"primary"},on:{click:function(e){return t.toBanjiList("transmit")}}},[t._v("换班")]),0!=t.activeId&&t.selectChilds.length<2?a("van-button",{staticClass:"promotion-class theme-btn btn",attrs:{square:"",type:"primary"},on:{click:function(e){return t.toBanjiList("transmitAll")}}},[t._v("全员转班")]):t._e()],1):t._e()])],1),"is_banji_confirm,0"==t.value&&t.banjiItems.length?a("van-button",{staticClass:"boss-key theme-btn",attrs:{type:"primary",round:""},on:{click:t.allCheck}},[t._v("一键审核")]):t._e()],1)},n=[],s=(a("7f7f"),a("ac6a"),a("28a5"),a("c5f6"),a("cebc")),c=a("9993"),o=a("d3b8"),l=a("591a"),r=a("77e0"),u={name:"banjiTree",mixins:[r["f"],r["e"],r["b"]],components:{studentCard:o["a"]},computed:Object(s["a"])({},Object(l["c"])("manage",["manageSchoolInfo"])),data:function(){return{banjiList:[],banjiItems:[],currentBanji:{banji_id:this.$route.query.banji_id},allStudent:0,activeId:Number(this.$route.query.activeId)||0,page:1,loading:!1,finished:!1,selectShow:!1,value:"is_banji_confirm,-1",option:[{text:"全部",value:"is_banji_confirm,-1"},{text:"待审核",value:"is_banji_confirm,0"},{text:"已审核",value:"is_banji_confirm,1"},{text:"已办卡",value:"is_card,1"},{text:"未办卡",value:"is_card,0"}]}},beforeRouteEnter:function(t,e,a){a(function(t){t.request()})},watch:{value:function(){this.onRefresh()}},methods:{request:function(){var t=this,e={params:Object(s["a"])({},this.$route.query,{is_all:1})};c["a"].get("/SchoolManage/banji/getList",e).then(function(e){switch(e.data.status){case 1:t.banjiList=e.data.data,c["a"].get("/SchoolManage/students/getList").then(function(e){t.banjiList.unshift({title:"全部",student_count:e.data.count})});break;default:t.$toast(e.data.msg)}})},onLoad:function(){var t=this,e={params:{school_id:this.$route.query.school_id,banji_id:this.currentBanji.banji_id,page:this.page}},a=this.value.split(",");switch(a[0]){case"is_banji_confirm":e.params.is_banji_confirm=a[1];break;case"is_card":e.params.is_card=a[1];break}return c["a"].get("/SchoolManage/students/getList",e).then(function(e){switch(e.data.status){case 1:1==t.page?t.banjiItems=e.data.data:t.banjiItems=t.banjiItems.concat(e.data.data),t.page++,t.loading=!1,t.banjiItems.length>=e.data.count&&(t.finished=!0);break;default:t.$toast(e.data.msg)}})},onRefresh:function(){var t=this;this.page=1,this.onLoad().then(function(){t.loading=!1,t.finished=!1})},onNavClick:function(t,e){this.activeId=e,this.currentBanji=t,this.selectShow=!1,this.onRefresh()},allCheck:function(){var t=this;this.$dialog.confirm({message:"此操作将会通过全部待审核的学生，您确定要这么做吗?"}).then(function(){var e={params:{is_all:1}};t.currentBanji&&(e.params.banji_id=t.currentBanji.banji_id),c["a"].get("/SchoolManage/students/check",e).then(function(e){switch(e.data.status){case 1:t.onRefresh();break;default:t.$toast(e.data.msg)}})}).catch(function(){})},invite:function(){this.$router.push({name:"share",query:{banji_id:this.currentBanji.banji_id,banji_name:this.currentBanji.banji_name,invite_code:this.currentBanji.invite_code,school_id:this.currentBanji.school_id,school_name:this.currentBanji.school_name,user_id:this.currentBanji.user_id}})},toBanjiList:function(t){var e=[],a=[];this.selectChilds.forEach(function(t){e.push(t.id),a.push(t.name)}),this.$router.push({name:"banjiList",query:Object(s["a"])({},this.$route.query,this.currentBanji,{year:this.classYear,type:"select",set:t,id:e.join(","),names:a.join(","),activeId:this.activeId})})},cancel:function(){this.selectShow=!1,this.selectChilds=[]}}},d=u,h=(a("01eb"),a("3a09"),a("2877")),m=Object(h["a"])(d,i,n,!1,null,"311ef269",null);e["default"]=m.exports},d3b8:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-cell",{attrs:{border:!1}},[a("div",{staticClass:"user-card flex flex-align"},[a("div",{staticClass:"info flex flex-align"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.item.avatar},on:{error:t.imgError,click:function(e){t.show=!0}}}),a("div",{staticClass:"user-info",on:{click:function(e){t.show=!0}}},[a("div",{staticClass:"name"},[t._v(t._s(t.item.name))]),0!=t.activeId?a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"child flex"},[t._v(t._s(t.item.parent_name?t.item.parent_name+" | ":"")+t._s(t.item.relation_name))]):a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"child flex"},[t._v(t._s(t.item.banji_name?t.formatBanjiTitle(t.item.banji_name)+" | ":"")+t._s(t.item.parent_name))])])]),t.isBtnShow&&!t.selectShow?a("div",{staticClass:"operation-btn flex flex-align"},[a("van-button",{staticClass:"past",attrs:{size:"small",round:"",type:1==t.item.is_banji_confirm?"warning":"primary"},on:{click:t.past}},[t._v("  "+t._s(1==t.item.is_banji_confirm?"请出":"通过")+" ")])],1):a("div",{staticClass:"select",on:{click:t.selectChild}},[t.select?a("i",{staticClass:"icon-select theme-color iconfont"},[t._v("")]):t.selectShow?a("i",{staticClass:"icon-select to-be-selected  iconfont"},[t._v("")]):t._e()])]),a("van-popup",{staticClass:"popup-techaer",attrs:{"get-container":"#app"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("div",{staticClass:"popup-close",on:{click:function(e){t.show=!1}}},[a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"techer-card"},[a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"http2https",rawName:"v-http2https"}],attrs:{src:t.item.avatar},on:{error:t.imgError}})]),a("van-cell-group",[a("van-cell",{attrs:{title:"姓名",value:t.item.name,border:!1}}),t.item.parent_name?a("van-cell",{attrs:{title:"家长",value:t.item.parent_name,border:!1,"value-class":"info-cell"}}):t._e(),t.item.parent_mobile?a("van-cell",{attrs:{title:"联系电话",border:!1}},[a("a",{staticClass:"theme-color",attrs:{href:"tel:"+t.item.parent_mobile}},[t._v("请触拨号")])]):t._e(),t.item.school_name?a("van-cell",{attrs:{title:"学校",value:t.item.school_name,border:!1,"value-class":"info-cell","is-link":""},on:{click:t.toSchool}}):t._e(),t.item.banji_name?a("van-cell",{attrs:{title:"班级",value:t.formatBanjiTitle(t.item.banji_name),"is-link":"",border:!1},on:{click:t.toBanji}}):t._e(),t.item.banji_apply_date?a("van-cell",{attrs:{title:"申请时间",value:t.item.banji_apply_date,border:!1}}):t._e()],1),a("div",{staticClass:"popup-footer flex-align flex"},[a("div",{staticClass:"btn"},[a("van-button",{staticClass:"edit",attrs:{size:"small",type:"info",round:"",plain:""},on:{click:t.changeBanji}},[t._v(" 换班 "+t._s(0!=t.activeId?"/转班":"")+" ")])],1),a("div",{staticClass:"btn"},[a("van-button",{staticClass:"past",attrs:{size:"small",round:"",type:1==t.item.is_banji_confirm?"warning":"primary"},on:{click:t.past}},[t._v("  "+t._s(1==t.item.is_confirm?"请出":"通过")+" ")])],1)])],1)])],1)},n=[],s=(a("7f7f"),a("c5f6"),a("cebc")),c=a("9993"),o=a("77e0"),l=a("591a"),r={name:"userCard",mixins:[o["e"],o["b"]],computed:Object(s["a"])({},Object(l["c"])("manage",["manageSchoolInfo"])),props:{item:{type:Object,default:function(){return{avatar:"",name:"",banji_id:0,banji_name:"3",parent_name:"赵静静",relation_name:"妈妈",is_banji_confirm:0,school_name:"微美幼儿园",parent_mobile:"",school_id:0,id:0}}},activeId:{type:Number,default:0},selectShow:{type:Boolean,default:!1},isBtnShow:{type:Boolean,default:!0}},data:function(){return{show:!1,select:!1}},watch:{selectShow:function(t){t||(this.select=t)}},methods:{past:function(){var t,e=this,a=1==this.item.is_banji_confirm?"kick":"check";switch(a){case"kick":t="您确定要请出".concat(this.item.name,"该学生吗?此操作后，该用户将无法进入").concat(this.item.banji_name?this.formatBanjiTitle(this.item.banji_name):"班级","。");break;case"check":t="您确定要通过".concat(this.item.name,"吗?");break}this.$dialog.confirm({message:t}).then(function(){c["a"].get("/SchoolManage/students/".concat(a),{params:{id:e.item.id}}).then(function(t){switch(t.data.status){case 1:"check"==a?(e.item.is_banji_confirm=1,e.$toast.success("审核通过")):(e.item.is_banji_confirm=0,e.$toast(t.data.msg)),e.$emit("statusChange");break;default:e.$toast(t.data.msg)}})}).catch(function(){})},toSchool:function(){this.item.school_id>0&&this.$router.push({name:"apps-school",query:{id:this.item.school_id}})},toBanji:function(){this.item.banji_id>0&&this.$router.push({name:"class-home",query:{id:this.item.banji_id,cate_id:116,home_type:"banji"}})},changeBanji:function(){"edit"==this.$route.query.pageType?this.$router.push({name:"banjiList",query:{id:this.item.id,names:this.item.name,school_id:this.manageSchoolInfo.school_id,set:"transmit",type:"select",year:this.classYear,back:this.$route.name}}):(this.$emit("selectShowTrue"),this.show=!1,this.selectChild())},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},selectChild:function(){this.select=!this.select,this.$emit("electChild",this.select,this.item)}}},u=r,d=(a("abd3"),a("2877")),h=Object(d["a"])(u,i,n,!1,null,"e1574e70",null);e["a"]=h.exports}}]);
//# sourceMappingURL=chunk-78d91a7a.e2823a26.js.map