(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-073aafb6"],{"093c":function(t,e,a){"use strict";var s=a("4ce6"),i=a.n(s);i.a},"0e08":function(t,e,a){},"4ce6":function(t,e,a){},"53ba":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"read-amount page-padding"},[a("div",{staticClass:"banner",on:{click:t.onClickRight}},[a("van-button",{staticClass:"theme-plain",attrs:{plain:"",round:"",type:"primary"}},[t._v("前往捐书")]),a("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banner/banner-juanshu.png"}})],1),a("div",{staticClass:"refresh-container"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("form",{attrs:{action:"/"}},[a("van-search",{attrs:{placeholder:"请输入搜索关键词",shape:"round"},on:{search:t.onSearch},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),a("van-tabs",{attrs:{color:"#0084ff","line-width":20,"line-height":4,sticky:"",swipeable:"",animated:"",border:!1},on:{change:t.onChangeTab},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},t._l(t.readArray,function(e,s){return a("van-tab",{key:s},[a("div",{staticClass:"tab-title",attrs:{slot:"title"},slot:"title"},[t._v("\n              "+t._s(e.title)+" "),t.bookStatus[e.key]>0?a("van-tag",{staticClass:"tab-tag",attrs:{type:"danger",round:""}},[t._v(t._s(t.bookStatus[e.key]))]):t._e()],1),a("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},["捐书"==e.title?a("div",{staticClass:"tab-jianshu"},[a("van-tabs",{attrs:{type:"card",color:"#0084ff"},on:{click:t.onClickTab}},t._l(t.donationTab,function(t,e){return a("van-tab",{key:e,attrs:{title:t}})}),1)],1):t._e(),"未读"==e.title?a("div",{staticClass:"kings flex flex-align"},[a("div",{staticClass:"bar-title"},[t._v("阅读进度")]),a("div",{staticClass:"kings-box flex flex-align"},[a("div",{staticClass:"num"},[t._v(t._s(t.childInfo.read_kinds)+"/"+t._s(t.childInfo.shelf_tushu_kinds))]),a("div",{staticClass:"filter",on:{click:function(e){t.show=!0}}},[a("i",{staticClass:"iconfont theme-color"},[t._v("")])])])]):t._e(),t.list.length?a("div",{staticClass:"list"},t._l(t.list,function(t,e){return a("van-cell",{key:e},[a("bookCard",{attrs:{item:t,isCollect:t.is_collect}})],1)}),1):a("div",{staticClass:"no-list"},[t._v("\n                  暂无数据\n                ")])])],1)}),1)],1)],1),a("van-popup",{staticClass:"filter-popup",attrs:{position:"right"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("Filter-list",{attrs:{filterList:t.selectTag},on:{onSelect:t.onSelect,close:function(e){t.show=!1}}})],1)],1)},i=[],n=a("cebc"),o=a("9993"),l=a("9077"),c=a("be6b"),r={name:"readAmount",components:{FilterList:l["a"],bookCard:c["a"]},computed:{readArray:function(){var t=[];return this.childInfo&&(t=[{title:"在读",key:"reading_count",params:{is_read:1}},{title:"读过",key:"read_count",params:{is_read:2}},{title:"收藏",key:"favorite_count",params:{is_collect:1}},{title:"磨损",key:"broken_count",params:{is_broke:1}},{title:"未读",params:{is_read:0}},{title:"捐书",params:{is_donate:1}}]),t},rendStatus:function(){var t;return this.bookStatus.overdue_count>0&&(t="待还还有".concat(this.bookStatus.overdue_count,"本逾期")),t}},data:function(){return{show:!1,page:1,loading:!1,finished:!1,childInfo:"",tabIndex:sessionStorage.getItem("readAmountTabIndex")?sessionStorage.getItem("readAmountTabIndex"):0,isCheck:1,selectTag:[{title:"年龄",arr:["3-5","5-6"]},{title:"分类",arr:["绘本","寓言故事","童话","科普","3D","VR","故事汇"]},{title:"所在层数",arr:["一层","二层","三层","四层","五层","六层"]}],donationTab:["已捐书","待审核","未通过"],selsetData:"",bookStatus:{},list:[],value:""}},created:function(){this.fetchData()},watch:{$router:"fetchData",value:function(){this.onSearch()}},methods:{fetchData:function(){var t=this,e={params:{child_id:this.$route.query.id}};o["a"].get("/book/baby/getInfo",e).then(function(e){t.childInfo=e.data.data}),o["a"].get("/book/MemberBorrow/getMyBookStat").then(function(e){t.bookStatus=e.data.data})},onClickRight:function(){window.location.href="/book/member/entry_donation"},onLoad:function(){var t=this,e=this.readArray[this.tabIndex],a={params:Object(n["a"])({},e.params,{page:this.page,keyword:this.value})};return 4==this.tabIndex&&(a.params=Object(n["a"])({},a.params,this.selsetData)),o["a"].get("/book/shelfBook/getList",a).then(function(e){switch(e.data.status){case 1:var a=e.data.data.map(function(t){return Object(n["a"])({},t,{book_title:t.title,book_photo:t.thumb})});1==t.page?t.list=a:t.list=t.list.concat(a),t.page++,t.loading=!1,t.list.length>=e.data.count&&(t.finished=!0);break;default:t.$toast(e.data.msg)}})},onRefresh:function(){var t=this;this.page=1,this.onLoad().then(function(){t.loading=!1,t.finished=!1})},onSelect:function(t){this.selsetData=t,this.onRefresh()},onChangeTab:function(t){this.list=[],this.tabIndex=t,this.onRefresh(),sessionStorage.setItem("readAmountTabIndex",t)},onClickTab:function(t,e){var a;switch(e){case"已捐书":a=1;break;case"待审核":a=0;break;case"未通过":a=2;break}this.readArray[this.tabIndex].params.is_donate=a,this.onRefresh()},onSearch:function(){this.onRefresh()}}},d=r,u=(a("093c"),a("2877")),f=Object(u["a"])(d,s,i,!1,null,"478c42f2",null);e["default"]=f.exports},9077:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-popup-box"},[a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[0].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[0].arr,function(e,s){return a("van-col",{key:s,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[s==t.selectIndex.selectAgeIndex?"selection":""],on:{click:function(a){return t.selectAge(e,s)}}},[t._v(t._s(e))])])}),1)],1),a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[1].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[1].arr,function(e,s){return a("van-col",{key:s,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[s==t.selectIndex.selectClassifyIndex?"selection":""],on:{click:function(a){return t.selectClassify(e,s)}}},[t._v(t._s(e))])])}),1)],1),a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[2].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[2].arr,function(e,s){return a("van-col",{key:s,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[s==t.selectIndex.selectFloorIndex?"selection":""],on:{click:function(a){return t.selectFloor(e,s)}}},[t._v(t._s(e))])])}),1)],1),a("div",{staticClass:"footer-bar flex"},[a("van-button",{staticClass:"btn",attrs:{square:"",text:"重置"},on:{click:t.onClickBtnLeft}}),a("van-button",{staticClass:"btn theme-btn",attrs:{square:"",text:"确定",type:"primary"},on:{click:t.onClickBtnRight}})],1)])},i=[],n={name:"filterPopup",props:["filterList"],data:function(){return{selectIndex:{selectAgeIndex:-1,selectClassifyIndex:-1,selectFloorIndex:-1}}},watch:{selectIndex:{handler:function(t){var e=this.filterList[0].arr[t.selectAgeIndex],a=this.filterList[1].arr[t.selectClassifyIndex],s=t.selectFloorIndex+1,i=[e,a].join(","),n={tag:i,floor:s};this.$emit("onSelect",n)},deep:!0}},methods:{onClickBtnLeft:function(){this.selectIndex.selectAgeIndex=-1,this.selectIndex.selectClassifyIndex=-1,this.selectIndex.selectFloorIndex=-1},onClickBtnRight:function(){this.$emit("close")},selectAge:function(t,e){this.selectIndex.selectAgeIndex=e},selectClassify:function(t,e){this.selectIndex.selectClassifyIndex=e},selectFloor:function(t,e){this.selectIndex.selectFloorIndex=e}}},o=n,l=(a("f293"),a("2877")),c=Object(l["a"])(o,s,i,!1,null,"700479ea",null);e["a"]=c.exports},a188:function(t,e,a){},a9ee:function(t,e,a){"use strict";var s=a("0e08"),i=a.n(s);i.a},be6b:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-row",{attrs:{gutter:"20"}},[a("van-col",{attrs:{span:"7"}},[a("div",{staticClass:"book-cover"},[a("img",{attrs:{src:t.thumb(t.item.book_photo)},on:{error:t.imgError}}),t.item.is_read>0?a("div",{staticClass:"is-read"},[a("i",{staticClass:"iconfont"},[t._v("")])]):t._e()])]),a("van-col",{attrs:{span:"11"}},[a("div",{staticClass:"book-info",on:{click:t.toBookDetails}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.item.book_title))]),a("div",{staticClass:"attach"},[t.item.pos_name?a("div",{staticClass:"pos-title"},[t._v("书位："+t._s(t.item.pos_name))]):t._e()]),"guide"==t.type?a("div",{staticClass:"borrow"},[t._v("\n        借阅："+t._s(t.item.book_borrow_count)+" 次\n      ")]):t._e()])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"button"},[a("div",{staticClass:"flex flex-align"},[a("div",{staticClass:"like",on:{click:t.addCollect}},[t.itemCollect?a("i",{staticClass:"iconfont"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"listening",on:{click:t.listening}},[a("i",{staticClass:"iconfont"},[t._v("")])])]),"在读"==t.type?a("div",{staticClass:"abrasion"},[a("van-button",{staticClass:"theme-btn",attrs:{plain:"",size:"small",type:"primary",round:""},on:{click:t.toBorrow}},[t._v("磨损")])],1):t._e()])])],1)},i=[],n=(a("a481"),a("4917"),a("9993")),o={name:"bookCard",props:["item","type","isCollect"],data:function(){return{itemCollect:!1}},watch:{isCollect:function(t){this.itemCollect=1==t}},methods:{thumb:function(t){if(t){var e=t.match(/https?:\/\/(.+?)\//);return e?"/book/api/remotePic?url=".concat(t):t}},listening:function(){var t=this,e=/（.+?）/,a=this.item.book_title.replace(e,""),s="https://m.ximalaya.com/search/".concat(a),i=localStorage.getItem("bookRead_"+this.item.book_id);i?location.href=s:n["a"].get("/book/story/updateRead").then(function(){localStorage.setItem("bookRead_"+t.item.book_id,!0),location.href=s})},toBookDetails:function(){this.$router.push({name:"book-details",query:{id:this.item.book_id}})},addCollect:function(){var t=this,e={params:{target_id:this.item.book_id,type_id:5}};n["a"].get("/book/member/add_favorite",e).then(function(e){1==e.data.status&&(t.itemCollect=!t.itemCollect,t.itemCollect&&t.$toast.success({className:"like-icon toast-icon",duration:"800"}))})},toBorrow:function(){this.item.borrow_id&&(location.href="/book/MemberBookBroken/add/borrow_id/".concat(this.item.borrow_id,"?back_url=").concat(encodeURIComponent(location.href)))},imgError:function(t){t.target.src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg"}}},l=o,c=(a("a9ee"),a("2877")),r=Object(c["a"])(l,s,i,!1,null,"6f59a41f",null);e["a"]=r.exports},f293:function(t,e,a){"use strict";var s=a("a188"),i=a.n(s);i.a}}]);