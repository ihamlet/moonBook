(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dfb5dd10"],{"2bd5":function(t,e,a){"use strict";var s=a("f19a"),i=a.n(s);i.a},8935:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"punch-help page-padding"},[a("div",{staticClass:"tips"},[t._v("点击发送给朋友或分享到朋友圈")]),a("img",{attrs:{src:t.imgPoster}}),a("div",{staticClass:"footer-bar"},[a("div",{staticClass:"bar"},[a("van-button",{staticClass:"theme-btn",attrs:{round:"",size:"normal",type:"primary"},on:{click:t.toBabyHome}},[t._v(t._s("read"==t.$route.query.type?"进入宝贝主页":"打造宝贝主页"))])],1)])])},i=[],n=a("cebc"),r=a("591a"),c={name:"punch-help",computed:Object(n["a"])({},Object(r["c"])(["userDataState"]),Object(r["e"])("openWX",["ready"]),{imgPoster:function(){var t;return t="read"==this.$route.query.type?"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/punch-help.jpg":"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/babyHome-help.jpg",t},item:function(){var t;return t="read"==this.$route.query.type?{details:"邀请您一起参与阅读打卡",title:"阅读打卡"}:{details:"一心为孩子,关心成长，记录成长。全家一起，建立孩子的成长记录，您今天记录的是孩子一生的财富，关注孩子的教育和成长。",title:"使用阅亮书架打造宝贝主页"},t}}),created:function(){var t=this;this.fetchData(),this.$nextTick(function(){t.wxShare()})},watch:{$router:"fetchData",ready:function(){this.wxShare()}},methods:Object(n["a"])({},Object(r["b"])("openWX",["share"]),{fetchData:function(){this.wxShare()},wxShare:function(){var t=this,e={item:t.item,success:function(){t.$router.push({name:"baby-home",query:{id:t.userDataState.child_id,tags:"宝贝主页",home_type:"baby"}})}};t.share(e)},toBabyHome:function(){this.$router.push({name:"baby-home",query:{id:this.userDataState.child_id}})}})},o=c,u=(a("2bd5"),a("2877")),h=Object(u["a"])(o,s,i,!1,null,"883385e6",null);e["default"]=h.exports},f19a:function(t,e,a){}}]);
//# sourceMappingURL=chunk-dfb5dd10.aafc11e8.js.map