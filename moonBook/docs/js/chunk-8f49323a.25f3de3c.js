(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f49323a"],{"350e":function(t,e,o){},"530a":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"new-book"},[o("img",{staticClass:"head-bg",attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/newBook.jpg"}}),o("div",{staticClass:"list-padding"},[o("van-pull-refresh",{key:t.userDataState.card_id,on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[o("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,function(e,a){return o("van-cell",{key:a},[t.timediff(e,a)?o("div",{staticClass:"hd-bar flex flex-align"},[o("div",{staticClass:"card-school-name theme-color",on:{click:t.toSchoolHome}},[t._v(t._s(0==a?t.userDataState.card_school_name:""))]),o("div",{staticClass:"time"},[t._v(t._s(t.getTimeAgo(e.create_time)))])]):t._e(),o("bookCard",{attrs:{item:e,type:t.list.title}})],1)}),1)],1)],1),o("div",{staticClass:"footer-bar"},[o("div",{staticClass:"btn-box"},[o("van-button",{staticClass:"theme-btn",attrs:{round:"",type:"primary",size:"normal"},on:{click:t.toBookShelf}},[t._v("去书架看看")])],1)])])},i=[],s=o("cebc"),n=o("9993"),c=o("591a"),l=o("bec1"),r=o("be6b"),d={name:"new-book",components:{bookCard:r["a"]},data:function(){return{loading:!1,finished:!1,page:1,list:[]}},computed:Object(s["a"])({},Object(c["c"])(["userDataState"])),methods:{onLoad:function(){var t=this,e={params:{sort:"new",start_time:Date.parse(new Date)-6048e5,card_id:this.userDataState.card_id}};return n["a"].get("/book/SchoolShelfBook/getList",e).then(function(e){switch(e.data.status){case 1:1==t.page?t.list=e.data.data:t.list=t.list.concat(e.data.data),t.loading=!1,t.page++,t.list.length>=e.data.count&&(t.finished=!0);break;case 0:t.page=1,t.loading=!1,t.finished=!0,t.list=[];break}})},onRefresh:function(){var t=this;this.page=1,this.onLoad().then(function(){t.loading=!1,t.finished=!1})},getTimeAgo:function(t){return Object(l["e"])(1e3*t,"yyyy-MM-dd")},timediff:function(t,e){if(0==e)return!0;if(e){var o=Object(l["e"])(1e3*this.list[e-1].create_time,"yyyy-MM-dd"),a=Object(l["e"])(1e3*t.create_time,"yyyy-MM-dd");return o!=a}},toBookShelf:function(){this.$router.push({name:"bookshelf"})},toSchoolHome:function(){this.$router.push({name:"apps-school",query:{id:this.userDataState.card_school_id}})}}},u=d,m=(o("a873"),o("2877")),h=Object(m["a"])(u,a,i,!1,null,"7de206d4",null);e["default"]=h.exports},"7b82":function(t,e,o){},a873:function(t,e,o){"use strict";var a=o("7b82"),i=o.n(a);i.a},be6b:function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("van-row",{attrs:{gutter:"20"}},[o("van-col",{attrs:{span:"7"}},[o("div",{staticClass:"book-cover"},[o("img",{attrs:{src:t.thumb(t.item.book_photo)},on:{error:t.imgError}}),t.item.is_read>0?o("div",{staticClass:"is-read"},[o("i",{staticClass:"iconfont"},[t._v("")])]):t._e()])]),o("van-col",{attrs:{span:"11"}},[o("div",{staticClass:"book-info",on:{click:t.toBookDetails}},[o("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:2,expression:"2",arg:"20"}],staticClass:"title"},[t._v(t._s(t.item.book_title))]),o("div",{staticClass:"attach"},[t.item.pos_name?o("div",{staticClass:"pos-title"},[t._v("书位："+t._s(t.item.pos_name))]):t._e()]),"guide"==t.type?o("div",{staticClass:"borrow"},[t._v("\n        借阅："+t._s(t.item.book_borrow_count)+" 次\n      ")]):t._e()])]),o("van-col",{attrs:{span:"6"}},[o("div",{staticClass:"button"},[o("div",{staticClass:"flex flex-align"},[o("div",{staticClass:"like",on:{click:t.addCollect}},[t.itemCollect?o("i",{staticClass:"iconfont"},[t._v("")]):o("i",{staticClass:"iconfont"},[t._v("")])]),o("div",{staticClass:"listening",on:{click:t.listening}},[o("i",{staticClass:"iconfont"},[t._v("")])])]),"在读"==t.type?o("div",{staticClass:"abrasion"},[o("van-button",{staticClass:"theme-btn",attrs:{plain:"",size:"small",type:"primary",round:""},on:{click:t.toBorrow}},[t._v("磨损")])],1):t._e()])])],1)},i=[],s=(o("a481"),o("4917"),o("9993")),n={name:"bookCard",props:["item","type","isCollect"],data:function(){return{itemCollect:!1}},watch:{isCollect:function(t){this.itemCollect=1==t}},methods:{thumb:function(t){if(t){var e=t.match(/https?:\/\/(.+?)\//);return e?"/book/api/remotePic?url=".concat(t):t}},listening:function(){var t=this,e=/（.+?）/,o=this.item.book_title.replace(e,""),a="https://m.ximalaya.com/search/".concat(o),i=localStorage.getItem("bookRead_"+this.item.book_id);i?location.href=a:s["a"].get("/book/story/updateRead").then(function(e){localStorage.setItem("bookRead_"+t.item.book_id,!0),location.href=a})},toBookDetails:function(){this.$router.push({name:"book-details",query:{id:this.item.book_id}})},addCollect:function(){var t=this,e={params:{target_id:this.item.book_id,type_id:5}};s["a"].get("/book/member/add_favorite",e).then(function(e){1==e.data.status&&(t.itemCollect=!t.itemCollect,t.itemCollect&&t.$toast.success({className:"like-icon toast-icon",duration:"800"}))})},toBorrow:function(){this.item.borrow_id&&(location.href="/book/MemberBookBroken/add/borrow_id/".concat(this.item.borrow_id,"?back_url=").concat(encodeURIComponent(location.href)))},imgError:function(t){t.target.src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg"}}},c=n,l=(o("f9b6"),o("2877")),r=Object(l["a"])(c,a,i,!1,null,"f522cdfc",null);e["a"]=r.exports},f9b6:function(t,e,o){"use strict";var a=o("350e"),i=o.n(a);i.a}}]);
//# sourceMappingURL=chunk-8f49323a.25f3de3c.js.map