(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09d37c60"],{"2b51":function(t,e,a){},"2fdb":function(t,e,a){"use strict";var s=a("5ca1"),i=a("d2c8"),c="includes";s(s.P+s.F*a("5147")(c),"String",{includes:function(t){return!!~i(this,t,c).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},3606:function(t,e,a){},"49f3":function(t,e,a){"use strict";var s=a("2b51"),i=a.n(s);i.a},5147:function(t,e,a){var s=a("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[s]=!1,!"/./"[t](e)}catch(i){}}return!0}},ae3a:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topic-list"},[a("van-picker",{ref:"picker",attrs:{"show-toolbar":"",title:t.title,columns:t.column,"value-key":"cate_name"},on:{change:t.onCateChange,cancel:t.close,confirm:function(e){return t.$emit("confirm")}}})],1)},i=[],c=(a("ac6a"),a("cebc")),n=a("591a"),o={name:"topic-list",props:["type","topicList","tagIndex","cateIndex","cateName"],computed:Object(c["a"])({},Object(n["c"])(["managerState"]),{column:function(){var t=[{values:this.topicList,className:"column1",defaultIndex:this.tagIndex},{values:this.topicList[this.tagIndex]?this.topicList[this.tagIndex].children:[],className:"column2",defaultIndex:this.cateIndex}];return t},title:function(){var t="宝贝主页的分类";switch(this.$route.query.back){case"class-home":t="班级主页的分类";break;case"apps-school":t="学校主页的分类";break}return t}}),methods:{onCateChange:function(t,e,a){t.setColumnValues(1,e[0].children),this.$emit("select",e[a])},close:function(){this.$refs.picker.setColumnValues(1,this.column[1].values),this.$refs.picker.setColumnIndex(0,0),this.$refs.picker.setColumnIndex(1,0),this.$emit("close")}}},r=o,u=a("2877"),l=Object(u["a"])(r,s,i,!1,null,"7f7e82cb",null);e["a"]=l.exports},d2c8:function(t,e,a){var s=a("aae3"),i=a("be13");t.exports=function(t,e,a){if(s(e))throw TypeError("String#"+a+" doesn't accept regex!");return String(i(t))}},e620:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"article-setting"},[a("van-cell",{attrs:{value:t.classify,"is-link":"notice"!=t.$route.query.pageType,"arrow-direction":"down"},on:{click:t.selectTagShow}},[a("div",{staticClass:"classify-title",attrs:{slot:"title"},slot:"title"},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v(" 分类\n    ")])]),(99!=t.tag.cate_id&&124!=t.tag.cate_id||t.$route.query.tags)&&"notice"!=t.$route.query.pageType?a("van-cell",{attrs:{title:"同步到","value-class":"cell-value",value:t.synchronous,center:"","is-link":""},on:{click:function(e){t.isResultShow=!0}}}):a("van-switch-cell",{attrs:{title:"微信公众号消息","title-style":"flex:3","value-class":"switch-cell-value","active-value":1,"inactive-value":0,"active-color":"#67C23A","inactive-color":"#f2f6fc",label:"通知会通过阅亮书架公众号提醒家长"},on:{change:function(e){return t.$emit("onChangeSwitch",t.checked)}},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}}),a("van-popup",{staticClass:"page-popup-layer",attrs:{position:"bottom","get-container":"#app"},model:{value:t.isResultShow,callback:function(e){t.isResultShow=e},expression:"isResultShow"}},[a("van-checkbox-group",{model:{value:t.settingResult,callback:function(e){t.settingResult=e},expression:"settingResult"}},[a("div",{staticClass:"form-title"},[t._v("同步到")]),a("van-cell-group",t._l(t.resultList,function(e,s){return a("van-cell",{key:s,attrs:{border:!1,clickable:"",title:e.title},on:{click:function(e){return t.toggle(s)}}},[a("van-checkbox",{ref:"checkboxes",refInFor:!0,staticClass:"theme-checkbox",attrs:{name:e.name}})],1)}),1)],1)],1),a("van-popup",{staticClass:"page-popup-layer",attrs:{position:"bottom","get-container":"#app"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[t.isCateShow?a("div",{staticClass:"cate-item"},t._l(t.schoolCateList,function(e,s){return a("van-cell-group",{key:s},[a("van-cell",{attrs:{title:e.name,size:"large"}},[a("i",{staticClass:"iconfont icon-topic",attrs:{slot:"icon"},slot:"icon"},[t._v("")])]),t._l(e.cateList,function(e,s){return a("van-cell",{key:s,attrs:{"is-link":"",title:e.cate_name},on:{click:function(a){return t.selectCate(e)}}},[a("i",{staticClass:"iconfont icon-topic-mini",attrs:{slot:"icon"},slot:"icon"},[t._v("")])])})],2)}),1):a("topic-list",{attrs:{topicList:t.topicList,tagIndex:t.tagIndex,cateIndex:t.cateIndex},on:{close:t.closeTopic,confirm:function(e){t.show=!1},select:t.selectTag}})],1)],1)},i=[],c=(a("2fdb"),a("6762"),a("96cf"),a("3b8d")),n=(a("7f7f"),a("ac6a"),a("cebc")),o=(a("c5f6"),a("9993")),r=a("ae3a"),u=a("591a"),l={name:"article-setting",props:{isWxMsg:{type:Number,default:1}},components:{topicList:r["a"]},computed:Object(n["a"])({},Object(u["e"])("articleSetting",["result","group","tag"]),Object(u["c"])(["userDataState","managerState"]),{synchronous:function(){var t=this,e=[];return this.resultList.forEach(function(a){t.result.forEach(function(t){t==a.name&&e.push(a.title)})}),e.join(",")},classify:function(){var t;return t=this.$route.query.tags&&"宝贝主页"!=this.$route.query.tags?this.$route.query.tags:this.tag.cate_name,t}}),data:function(){return{show:!1,isResultShow:!1,selectGroup:!1,loading:!1,groupList:[],resultList:[],topicList:[],settingResult:[],tagIndex:0,cateIndex:0,cateName:"",banjiCateList:[],babyCateList:[],routerPath:["apps-school","class-home","baby-home","apps-find"],schoolCateList:[{name:"宝贝主页",cateList:[]},{name:"班级主页",cateList:[]},{name:"学校主页",cateList:[]}],isCateShow:!1,checked:1}},created:function(){this.fetchData()},beforeRouteLeave:function(t,e,a){t.meta.keepAlive=!1,a()},watch:{$router:"fetchData",settingResult:{handler:function(t){this.addResult(t),localStorage.setItem("result",JSON.stringify(t))},deep:!0},isWxMsg:function(t){this.checked=t},managerState:function(){localStorage.removeItem("tag")}},methods:Object(n["a"])({},Object(u["b"])(["release"]),Object(u["b"])("articleSetting",["addResult"]),Object(u["d"])("articleSetting",["setTag"]),{fetchData:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,a,s,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=[],e.push({title:"发现",name:"apps-find",to:1}),this.userDataState.child_id>0&&116!=this.$route.query.cate_id&&e.push({title:"宝贝主页",name:"baby-home",to:1}),(this.userDataState.banji_id>0||this.userDataState.teacher_school_id>0)&&e.push({title:"".concat(this.userDataState.teacher_banji_id==this.$route.query.id||this.userDataState.teacher_school_id==this.$route.query.id||116==this.$route.query.cate_id?"管理的":"宝贝的","班级"),name:"class-home",to:1}),this.resultList=e,a=[],e.map(function(t){a.push(t.name)}),this.settingResult=a,this.addResult(a),localStorage.getItem("result")&&!a.includes(this.$route.query.back)&&(this.settingResult=JSON.parse(localStorage.getItem("result")),this.addResult(this.settingResult)),this.routerPath.includes(this.$route.query.back)){t.next=20;break}return this.isCateShow=!0,t.next=14,this.getCateList("宝贝主页");case 14:return t.next=16,this.getCateList("班级主页");case 16:return t.next=18,this.getCateList("学校主页");case 18:t.next=24;break;case 20:s={params:{portal_name:"宝贝主页"}},"class-home"==this.$route.query.back&&(s.params.portal_name="班级主页"),"apps-school"==this.$route.query.back&&(s.params.portal_name="学校主页"),o["a"].get("/book/schoolArticleCate/getList",s).then(function(t){if(200==t.status){var e=t.data,a=[];e.forEach(function(t){0==t.access_level?a.push(t):i.userDataState.teacher_school_id!=i.$route.query.id&&i.userDataState.teacher_banji_id!=i.$route.query.id||a.push(t)}),i.topicList=a,i.$route.query.cate_id||i.$route.query.tag_id?e.forEach(function(t,e){i.$route.query.tag_id?t.cate_id==i.$route.query.tag_id&&(i.tagIndex=e,i.cateName=t.cate_name,i.setTag(t)):t.children.forEach(function(t,a){t.cate_id==i.$route.query.cate_id&&(i.tagIndex=e,i.cateIndex=a,i.cateName=t.cate_name,i.setTag(t))})}):localStorage.getItem("tag")?i.setTag(JSON.parse(localStorage.getItem("tag"))):i.setTag(a[0])}});case 24:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getCateList:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",o["a"].get("/book/schoolArticleCate/getList",{params:{portal_name:e}}).then(function(t){a.schoolCateList.map(function(a){a.name==e&&(a.cateList=t.data)})}));case 1:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),toggle:function(t){this.addResult(this.settingResult),this.$refs.checkboxes[t].toggle()},selectTag:function(t){this.setTag(t),localStorage.setItem("tag",JSON.stringify(t))},closeTopic:function(){this.setTag(this.topicList[this.tagIndex]),this.show=!1},selectCate:function(t){this.show=!1,this.setTag(t)},selectTagShow:function(){"notice"!=this.$route.query.pageType&&(this.show=!0)}})},h=l,p=(a("49f3"),a("e641"),a("2877")),f=Object(p["a"])(h,s,i,!1,null,"984cfea4",null);e["default"]=f.exports},e641:function(t,e,a){"use strict";var s=a("3606"),i=a.n(s);i.a}}]);