(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61cf23a8"],{"20fb":function(t,e,a){},3492:function(t,e,a){},"350e":function(t,e,a){},"38bf":function(t,e,a){"use strict";var i=a("3492"),s=a.n(i);s.a},5923:function(t,e,a){"use strict";var i=a("857d"),s=a.n(i);s.a},"857d":function(t,e,a){},9077:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-popup-box"},[a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[0].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[0].arr,function(e,i){return a("van-col",{key:i,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[i==t.selectIndex.selectAgeIndex?"selection":""],on:{click:function(a){return t.selectAge(e,i)}}},[t._v(t._s(e))])])}),1)],1),a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[1].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[1].arr,function(e,i){return a("van-col",{key:i,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[i==t.selectIndex.selectClassifyIndex?"selection":""],on:{click:function(a){return t.selectClassify(e,i)}}},[t._v(t._s(e))])])}),1)],1),a("div",{staticClass:"w-popup-list"},[a("div",{staticClass:"w-tit-box flex flex-align"},[a("span"),t._v(t._s(t.filterList[2].title))]),a("van-row",{attrs:{gutter:"10"}},t._l(t.filterList[2].arr,function(e,i){return a("van-col",{key:i,attrs:{span:"8"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"a-button",class:[i==t.selectIndex.selectFloorIndex?"selection":""],on:{click:function(a){return t.selectFloor(e,i)}}},[t._v(t._s(e))])])}),1)],1),a("van-goods-action",[a("van-goods-action-big-btn",{staticClass:"theme-action-btn-l",attrs:{text:"重置"},on:{click:t.onClickBtnLeft}}),a("van-goods-action-big-btn",{staticClass:"theme-action-btn-r",attrs:{primary:"",text:"确定"},on:{click:t.onClickBtnRight}})],1)],1)},s=[],n={name:"filterPopup",props:["filterList"],data:function(){return{selectIndex:{selectAgeIndex:-1,selectClassifyIndex:-1,selectFloorIndex:-1}}},watch:{selectIndex:{handler:function(t){var e=this.filterList[0].arr[t.selectAgeIndex],a=this.filterList[1].arr[t.selectClassifyIndex],i=t.selectFloorIndex+1,s=[e,a].join(","),n={tag:s,floor:i};this.$emit("onSelect",n)},deep:!0}},methods:{onClickBtnLeft:function(){this.selectIndex.selectAgeIndex=-1,this.selectIndex.selectClassifyIndex=-1,this.selectIndex.selectFloorIndex=-1},onClickBtnRight:function(){this.$emit("close")},selectAge:function(t,e){this.selectIndex.selectAgeIndex=e},selectClassify:function(t,e){this.selectIndex.selectClassifyIndex=e},selectFloor:function(t,e){this.selectIndex.selectFloorIndex=e}}},o=n,c=(a("5923"),a("38bf"),a("2877")),l=Object(c["a"])(o,i,s,!1,null,"057a22a1",null);e["a"]=l.exports},9360:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bookshelf"},[a("form",{attrs:{action:"/"}},[a("van-search",{attrs:{placeholder:"请输入搜索关键词",shape:"round"},on:{search:t.onSearch},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"card-school-name theme-color",attrs:{slot:"label"},on:{click:t.toShcoolHome},slot:"label"},[t._v(t._s(t.userDataState.card_school_name))])])],1),a("van-tabs",{attrs:{color:"#0084ff","line-width":20,"line-height":4,sticky:"",swipeable:"",animated:"","title-inactive-color":"#303133",border:!1},on:{change:t.onChangeTab,click:t.onClick,disabled:t.onClickDisabled},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},[t.isNewPointShow?a("div",{staticClass:"new-point",attrs:{slot:"nav-right"},slot:"nav-right"}):t._e(),t._l(t.tab,function(e,i){return a("van-tab",{key:i,attrs:{title:e.title,disabled:"筛选"==e.title}},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(e.content,function(i,s){return a("van-cell",{key:s},["最新"==e.title&&t.timediff(i,s)?a("div",{staticClass:"create-time theme-color"},[t._v("\n              "+t._s(t.getTimeAgo(i.create_time))+"\n            ")]):t._e(),a("bookCard",{attrs:{item:i,type:e.title}})],1)}),1)],1)],1)})],2),a("van-popup",{staticClass:"filter-popup",attrs:{position:"right"},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("Filter-list",{attrs:{filterList:t.selectTag},on:{onSelect:t.onSelect,close:function(e){t.show=!1}}})],1)],1)},s=[],n=a("cebc"),o=a("9993"),c=a("be6b"),l=a("9077"),r=a("bec1"),d=a("591a"),u={name:"bookshelf",components:{bookCard:c["a"],FilterList:l["a"]},computed:Object(n["a"])({},Object(d["c"])(["userDataState"]),{isNewPointShow:function(){if(this.newBookDate){var t,e=6048e5,a=Date.parse(new Date);return t=a>this.newBookDate&&a<this.newBookDate+e,t}}}),data:function(){return{page:1,loading:!1,finished:!1,show:!1,keyword:"",tabIndex:1,selectTag:[{title:"年龄",arr:["3-5","5-6"]},{title:"分类",arr:["绘本","寓言故事","童话","科普","3D","VR","故事汇"]},{title:"所在层数",arr:["一层","二层","三层","四层","五层","六层"]}],tab:[{title:"最热",params:{sort:"hot"},content:[]},{title:"最新",params:{sort:"new"},content:[]},{title:"筛选"}],selsetData:"",newBookDate:""}},watch:{keyword:function(t){this.tab[this.tabIndex].content=[],this.onSearch()}},methods:{onLoad:function(){var t=this,e={params:{page:this.page,child_id:this.userDataState.child_id,card_id:this.userDataState.card_id}};switch(this.tab[this.tabIndex].title){case"最热":e.params.sort="hot";break;case"最新":e.params.sort="new";break;case"未读":e.params.sort="new",e.params.is_read=0;break}return this.selsetData&&(e.params.tag=this.selsetData.tag,e.params.floor=this.selsetData.floor),this.keyword&&(e.params.keyword=this.keyword),o["a"].get("/book/SchoolShelfBook/getList",e).then(function(e){switch(e.data.status){case 1:1==t.page?(t.tab[t.tabIndex].content=e.data.data,t.newBookDate=1e3*e.data.data[0].create_time):t.tab[t.tabIndex].content=t.tab[t.tabIndex].content.concat(e.data.data),t.loading=!1,t.page++,t.tab[t.tabIndex].content.length>=e.data.count&&(t.finished=!0);break;case 0:t.page=1,t.loading=!1,t.finished=!0,t.tab[t.tabIndex].content=[];break}})},onRefresh:function(){var t=this;this.page=1,this.onLoad().then(function(){t.loading=!1,t.finished=!1})},onChangeTab:function(t){this.tabIndex=t,this.onRefresh()},onSearch:function(){this.onRefresh()},onClick:function(t){3==t&&(this.show=!0)},onClickDisabled:function(){this.show=!0},onSelect:function(t){this.selsetData=t,this.onRefresh()},getTimeAgo:function(t){return Object(r["e"])(1e3*t,"yyyy-MM-dd")},timediff:function(t,e){if(0==e)return!0;if(e){var a=this.tab[this.tabIndex].content[e-1]?Object(r["e"])(1e3*this.tab[this.tabIndex].content[e-1].create_time,"yyyy-MM-dd"):0,i=Object(r["e"])(1e3*t.create_time,"yyyy-MM-dd");return a!=i}},toShcoolHome:function(){this.userDataState.card_school_id>0&&this.$router.push({name:"apps-school",query:{id:this.userDataState.card_school_id}})}}},h=u,f=(a("ed58"),a("2877")),b=Object(f["a"])(h,i,s,!1,null,"0822a928",null);e["default"]=b.exports},be6b:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-row",{attrs:{gutter:"20"}},[a("van-col",{attrs:{span:"7"}},[a("div",{staticClass:"book-cover"},[a("img",{attrs:{src:t.thumb(t.item.book_photo)},on:{error:t.imgError}}),t.item.is_read>0?a("div",{staticClass:"is-read"},[a("i",{staticClass:"iconfont"},[t._v("")])]):t._e()])]),a("van-col",{attrs:{span:"11"}},[a("div",{staticClass:"book-info",on:{click:t.toBookDetails}},[a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.item.book_title))]),a("div",{staticClass:"attach"},[t.item.pos_name?a("div",{staticClass:"pos-title"},[t._v("书位："+t._s(t.item.pos_name))]):t._e()]),"guide"==t.type?a("div",{staticClass:"borrow"},[t._v("\n        借阅："+t._s(t.item.book_borrow_count)+" 次\n      ")]):t._e()])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"button"},[a("div",{staticClass:"flex flex-align"},[a("div",{staticClass:"like",on:{click:t.addCollect}},[t.itemCollect?a("i",{staticClass:"iconfont"},[t._v("")]):a("i",{staticClass:"iconfont"},[t._v("")])]),a("div",{staticClass:"listening",on:{click:t.listening}},[a("i",{staticClass:"iconfont"},[t._v("")])])]),"在读"==t.type?a("div",{staticClass:"abrasion"},[a("van-button",{staticClass:"theme-btn",attrs:{plain:"",size:"small",type:"primary",round:""},on:{click:t.toBorrow}},[t._v("磨损")])],1):t._e()])])],1)},s=[],n=(a("a481"),a("4917"),a("9993")),o={name:"bookCard",props:["item","type","isCollect"],data:function(){return{itemCollect:!1}},watch:{isCollect:function(t){this.itemCollect=1==t}},methods:{thumb:function(t){if(t){var e=t.match(/https?:\/\/(.+?)\//);return e?"/book/api/remotePic?url=".concat(t):t}},listening:function(){var t=this,e=/（.+?）/,a=this.item.book_title.replace(e,""),i="https://m.ximalaya.com/search/".concat(a),s=localStorage.getItem("bookRead_"+this.item.book_id);s?location.href=i:n["a"].get("/book/story/updateRead").then(function(e){localStorage.setItem("bookRead_"+t.item.book_id,!0),location.href=i})},toBookDetails:function(){this.$router.push({name:"book-details",query:{id:this.item.book_id}})},addCollect:function(){var t=this,e={params:{target_id:this.item.book_id,type_id:5}};n["a"].get("/book/member/add_favorite",e).then(function(e){1==e.data.status&&(t.itemCollect=!t.itemCollect,t.itemCollect&&t.$toast.success({className:"like-icon toast-icon",duration:"800"}))})},toBorrow:function(){this.item.borrow_id&&(location.href="/book/MemberBookBroken/add/borrow_id/".concat(this.item.borrow_id,"?back_url=").concat(encodeURIComponent(location.href)))},imgError:function(t){t.target.src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg"}}},c=o,l=(a("f9b6"),a("2877")),r=Object(l["a"])(c,i,s,!1,null,"f522cdfc",null);e["a"]=r.exports},ed58:function(t,e,a){"use strict";var i=a("20fb"),s=a.n(i);s.a},f9b6:function(t,e,a){"use strict";var i=a("350e"),s=a.n(i);s.a}}]);
//# sourceMappingURL=chunk-61cf23a8.c97237c7.js.map