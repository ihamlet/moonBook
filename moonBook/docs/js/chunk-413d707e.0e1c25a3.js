(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-413d707e"],{"0da3":function(t,a,e){},3648:function(t,a,e){"use strict";var n=e("0da3"),i=e.n(n);i.a},"80f5":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"share"},[t.pathData.user_id==t.userDataState.user_id||0==t.pathData.user_id?e("div",{staticClass:"tips"},[t._v("点击发送到家庭群或家长 邀请家长加入班级")]):t._e(),e("div",{staticClass:"share-cover"},[e("div",{staticClass:"present"},t._l(t.tips,function(a,n){return e("span",{key:n,staticClass:"animated fadeInUp",style:{animationDelay:200*n+"ms"}},[t._v(t._s(a))])}),0),e("img",{attrs:{src:t.backgroundImg[t.randomNum]}})]),e("div",{staticClass:"share-info flex flex-align"},[e("div",{staticClass:"join-btn",on:{click:t.toClassHome}},[t._m(0),t._m(1)]),e("div",{staticClass:"code-number"},[e("div",{staticClass:"title"},[t._v("班级邀请码")]),e("div",{staticClass:"number"},[t._v(t._s(t.pathData.invite_code))]),e("div",{staticClass:"school-info"},[e("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"school-name"},[t._v("\n          "+t._s(t.pathData.school_name)+"\n        ")]),e("div",{staticClass:"banji-name"},[t._v("\n          "+t._s(t.pathData.banji_name)+"\n        ")])])]),e("div",{staticClass:"code-img"},[e("img",{staticClass:"qr-img",attrs:{src:t.codeImgURL}}),e("div",{staticClass:"code-description"},[t._v("长按识别二维码 加入班级")])])])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"join-banji theme-background"},[e("i",{staticClass:"iconfont"},[t._v("")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"join-text theme-color"},[e("i",{staticClass:"iconfont"},[t._v("")]),t._v(" \n        加入班级\n      ")])}],s=(e("28a5"),e("96cf"),e("3b8d")),r=(e("7f7f"),e("cebc")),c=e("9993"),o=e("0a67"),u=e.n(o),h=e("591a"),l=e("fed1"),d=e.n(l),m={name:"share",computed:Object(r["a"])({},Object(h["e"])("openWX",["ready"]),Object(h["c"])(["userDataState","userPointState"]),{item:function(){var t={cate_name:"邀请",details:"老师邀请您加入".concat(this.$route.query.school_name,"(").concat(this.$route.query.banji_name,")"),title:"".concat(this.userDataState.name,"老师邀请您加入").concat(this.$route.query.school_name,"(").concat(this.$route.query.banji_name,")"),imgUrl:this.backgroundImg[this.randomNum]};return t}}),beforeRouteLeave:function(t,a,e){if("banjiEdit"==t.name&&"add"==t.query.pageType){var n=Object(r["a"])({},a.query,{pageType:"edit",pageTitle:"设置班级",title:a.query.banji_name});e({path:"/manage/banjiEdit?".concat(d.a.stringify(n))})}else e()},data:function(){return{codeImgURL:"",randomNum:Math.floor(5*Math.random()),backgroundImg:["https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-0.png","https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-1.png","https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-2.png","https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-3.png","https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banjiShare/class-share-4.png"],pathData:this.$route.query,tips:["接收班级通知","了解班级动态"]}},updated:function(){this.wxShare()},created:function(){this.fetchData()},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(r["a"])({},Object(h["b"])(["getUserData"]),Object(h["b"])("openWX",["share"]),{fetchData:function(){this.acceptClass()},wxShare:function(){var t=this;t.$nextTick(function(){var a={item:t.item,success:function(){t.$router.go(-1)}};t.share(a)})},qrcode:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var a,e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a={id:this.$route.query.banji_id,banji_name:this.$route.query.banji_name,banji_id:this.$route.query.banji_id,school_id:this.$route.query.school_id,school_name:this.$route.query.school_name},e="".concat(location.origin,"/#/class-home?").concat(d.a.stringify(a)),t.abrupt("return",u.a.toDataURL(e).then(function(t){return t}).catch(function(t){console.error(t)}));case 3:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),acceptClass:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.qrcode().then(function(t){a.codeImgURL=t});case 2:if(this.pathData.user_id==this.userDataState.user_id||0==this.pathData.user_id||this.userDataState.banji_id==this.pathData.banji_id){t.next=9;break}return t.next=5,this.joinSchool(this.userDataState.child_id);case 5:return t.next=7,this.joinBanji(this.userDataState.child_id);case 7:return t.next=9,this.getUserData();case 9:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}(),toClassHome:function(){this.$router.push({name:"class-home",query:{id:this.pathData.banji_id}})},joinSchool:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(a){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.userPointState.location.split(","),n={params:{child_id:a,school_id:this.pathData.school_id,school_name:this.pathData.school_name,cityname:this.userPointState.city,lat:e[1],lng:e[0],amap_id:"",typecode:""}},t.abrupt("return",c["a"].get("/book/babySchool/bind",n).then(function(t){}));case 3:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}(),joinBanji:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(a){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={params:{banji_id:this.pathData.banji_id,invite_code:this.pathData.invite_code,child_id:a}},t.abrupt("return",c["a"].get("/book/baby/join_banji",e).then(function(t){}));case 2:case"end":return t.stop()}},t,this)}));function a(a){return t.apply(this,arguments)}return a}()})},p=m,b=(e("3648"),e("2877")),f=Object(b["a"])(p,n,i,!1,null,"2f5409f7",null);a["default"]=f.exports}}]);