(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e4ba3d0"],{"08c5":function(t,e,a){"use strict";var s=a("f664"),i=a.n(s);i.a},"355b":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fresh-list"},[t.list.length>0?a("div",{staticClass:"content scroll-x",class:t.type},t._l(t.list,function(e,s){return a("div",{key:s,staticClass:"scroll-item fadeInRight animated",style:{animationDelay:200*s+"ms"},on:{click:function(a){return t.toZoom(e)}}},[a("div",{staticClass:"avatar"},[e[t.avatar]?a("img",{attrs:{src:t.avatarLink(e[t.avatar]),alt:e[t.name]},on:{error:t.imgError}}):t._e()]),a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"name"},[t._v("\n        "+t._s(e[t.name])+"\n      ")])])}),0):t._e()])},i=[],n=(a("a481"),a("7f7f"),{name:"fresh-list",props:["list","type","avatar","name","cid","routerName"],methods:{toZoom:function(t){this.$router.push({name:"zoom",query:{id:t[this.cid],back:this.$route.name,back_id:t.banji_id||t.child_id}})},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},avatarLink:function(t){if(-1==t.indexOf(location.origin))return t.replace("http:","https:")}}}),c=n,o=(a("bccf"),a("2877")),r=Object(o["a"])(c,s,i,!1,null,"0c94f412",null);e["a"]=r.exports},9791:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"book-details page-padding"},[a("van-nav-bar",{key:t.$route.query.id,attrs:{fixed:"",border:!1}},[a("div",{staticClass:"head-bar-title",attrs:{slot:"title"},slot:"title"},[a("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[t.themeBarSearch?a("div",{key:"2"},[t._v(t._s(t.details.title))]):a("div",{key:"1"},[t._v(t._s(t.$route.meta.title))])])],1)]),a("div",{staticClass:"container"},[a("div",{staticClass:"module"},[a("div",{ref:"domHeight",staticClass:"book-card"},[a("div",{staticClass:"tag"},[t.details.is_read?a("van-tag",{attrs:{mark:"",type:"success",size:"large"}},[t._v("已读")]):a("van-tag",{attrs:{mark:"",type:"danger",size:"large"}},[t._v("未读")])],1),a("van-row",{key:t.$route.query.id,attrs:{gutter:"10"}},[a("van-col",{attrs:{span:"9"}},[a("div",{staticClass:"book-thumb"},[a("img",{attrs:{src:t.details.thumb},on:{error:function(e){return t.imgError(e,t.details)}}})])]),a("van-col",{attrs:{span:"13"}},[a("div",{staticClass:"content"},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.details.title))]),a("van-rate",{attrs:{disabled:"","disabled-color":"#ffd21e"},model:{value:t.star,callback:function(e){t.star=e},expression:"star"}}),a("div",{staticClass:"book-info"},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"author"},[a("b",[t._v("作者:")]),t._v(t._s(t.details.author))]),t.details.borrow_count>0?a("div",{staticClass:"borrow-count"},[a("span",{staticClass:"people"},[t._v(t._s(t.details.borrow_count))]),t._v("人借过")]):t._e()])],1)])],1),a("van-col",{attrs:{span:"1"}},[a("div",{staticClass:"listening",on:{click:function(e){return t.listening(t.details)}}},[a("i",{staticClass:"iconfont"},[t._v("")])])])],1)]),t.freshList.length?a("div",{staticClass:"module"},[a("freshList",{key:t.$route.query.id,attrs:{list:t.freshList,cid:"child_id",avatar:"child_avatar",routerName:"baby-home",name:"child_name"}})],1):t._e(),t.details.details||t.details.recommend_comment?a("div",{staticClass:"module"},[t.details.details?a("div",{staticClass:"item-details"},[a("div",{staticClass:"module-title"},[t._v("图书简介")]),a("van-cell",{attrs:{border:!1}},[a("div",{staticClass:"details-text"},[t._v("\n            "+t._s(t.details.details)+"\n          ")])])],1):t._e(),t.details.recommend_comment?a("div",{staticClass:"item-details"},[a("div",{staticClass:"module-title"},[t._v("编辑推荐")]),a("van-cell",{attrs:{border:!1}},[a("div",{staticClass:"details-text"},[t._v("\n            "+t._s(t.details.recommend_comment)+"\n          ")])])],1):t._e()]):t._e(),a("div",{staticClass:"comment-box"},[a("comment",{key:t.$route.query.id,attrs:{item:t.details,type:"bookDetails",postId:t.details.post_id}})],1)])],1)},i=[],n=(a("a481"),a("cebc")),c=a("9993"),o=a("355b"),r=a("c629"),l=a("591a"),d=a("bec1"),u=a("77e0"),m={name:"book-details",mixins:[u["h"]],components:{freshList:o["a"],comment:r["a"]},computed:Object(n["a"])({},Object(l["c"])(["userDataState"]),Object(l["e"])("openWX",["ready"]),{star:function(){var t=3;return this.details&&(t=Math.ceil(this.details.star/2)),t}}),data:function(){return{details:"",freshList:""}},created:function(){this.fetchData()},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()},updated:function(){this.wxShare()},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(n["a"])({},Object(l["b"])("openWX",["share"]),{wxShare:function(){var t={item:this.details,success:function(){console.log("微信分享")}};this.share(t)},imgError:function(t){t.target.src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg"},fetchData:function(){var t=this,e={params:{book_id:this.$route.query.id,child_id:this.userDataState.child_id}};c["a"].get("/book/ShelfBook/getInfo",e).then(function(e){1==e.data.status&&(t.details=e.data.data)}),c["a"].get("/book/ShelfBookChild/getList",e).then(function(e){1==e.data.status&&(t.freshList=Object(d["b"])(e.data.data,"user_id"))})},listening:function(t){var e=/（.+?）/,a=t.title.replace(e,""),s="https://m.ximalaya.com/search/".concat(a),i=localStorage.getItem("bookRead_"+t.tushu_id);i?location.href=s:c["a"].get("/book/story/updateRead").then(function(e){localStorage.setItem("bookRead_"+t.tushu_id,!0),location.href=s})}})},h=m,v=(a("08c5"),a("2877")),f=Object(v["a"])(h,s,i,!1,null,"1eda79a4",null);e["default"]=f.exports},ae3a:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topic-list"},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"",title:t.title,columns:t.column,"value-key":"cate_name"},on:{change:t.onCateChange,cancel:t.close,confirm:function(e){return t.$emit("confirm")}}})],1)},i=[],n=(a("ac6a"),a("cebc")),c=(a("9993"),a("591a")),o={name:"topic-list",props:["type","topicList","tagIndex","cateIndex","cateName"],computed:Object(n["a"])({},Object(c["c"])(["managerState"]),{column:function(){var t=[{values:this.topicList,className:"column1",defaultIndex:this.tagIndex},{values:this.topicList[this.tagIndex]?this.topicList[this.tagIndex].children:[],className:"column2",defaultIndex:this.cateIndex}];return t},title:function(){var t="宝贝主页的分类";switch(this.$route.query.back){case"class-home":t="班级主页的分类";break;case"apps-school":t="学校主页的分类";break}return t}}),methods:{onCateChange:function(t,e,a){t.setColumnValues(1,e[0].children),this.$emit("select",e[a])},close:function(){this.$refs.picker.setColumnValues(1,this.column[1].values),this.$refs.picker.setColumnIndex(0,0),this.$refs.picker.setColumnIndex(1,0),this.$emit("close")}}},r=o,l=a("2877"),d=Object(l["a"])(r,s,i,!1,null,"96386f08",null);e["a"]=d.exports},bccf:function(t,e,a){"use strict";var s=a("f847"),i=a.n(s);i.a},f664:function(t,e,a){},f847:function(t,e,a){}}]);
//# sourceMappingURL=chunk-7e4ba3d0.ac460ea4.js.map