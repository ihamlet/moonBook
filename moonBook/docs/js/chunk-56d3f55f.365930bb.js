(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56d3f55f"],{7967:function(t,a,n){"use strict";var i=n("832b"),e=n.n(i);e.a},"832b":function(t,a,n){},8390:function(t,a,n){"use strict";n.r(a);var i=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"ranking-list"},[n("van-nav-bar",{attrs:{title:"榜单",border:!1}}),n("div",{staticClass:"list"},t._l(t.list,function(a,i){return n("div",{key:i,staticClass:"item flex flex-align",on:{click:function(n){return t.toRankingPage(a)}}},[n("div",{staticClass:"cell-info flex flex-align"},[n("i",{staticClass:"iconfont"},[t._v(t._s(a.icon))]),n("div",{staticClass:"name"},[t._v(t._s(a.name))])]),n("i",{staticClass:"iconfont right-icon"},[t._v("")])])}),0),n("div",{staticClass:"slogan"},[t._v("\n    "+t._s(t.$store.state.slogan)+"\n  ")])],1)},e=[],s=(n("a481"),n("cebc")),c=n("591a"),l={name:"ranking-list",computed:Object(s["a"])({},Object(c["c"])(["userDataState"])),data:function(){return{list:[{name:"阅读之星榜",routeName:"ranking",icon:""},{name:"打卡榜",routeName:"memberRanking",icon:""}]}},methods:{toRankingPage:function(t){this.$router.replace({name:t.routeName,query:{id:this.userDataState.child_id}})}}},o=l,r=(n("7967"),n("2877")),u=Object(r["a"])(o,i,e,!1,null,"4ca9a5e2",null);a["default"]=u.exports}}]);