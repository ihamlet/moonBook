(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d27cfcb0"],{2664:function(t,s,a){"use strict";var i=a("d3cd"),n=a.n(i);n.a},d3cd:function(t,s,a){},f830:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"write-off page-padding"},[a("van-nav-bar",{attrs:{title:"请出示二维码"}}),a("div",{staticClass:"content"},[a("div",{staticClass:"card-head"},[a("div",{staticClass:"head"},[a("div",{staticClass:"title"},[t._v(t._s(t.details.title))]),a("div",{staticClass:"name"},[t._v(t._s(t.details.shop_name))])]),a("div",{staticClass:"info"},[a("van-swipe",{attrs:{autoplay:3e3,"show-indicators":!1}},t._l(t.addrList,function(s,i){return a("van-swipe-item",{key:i},[a("div",{staticClass:"shop-info"},[a("b",[t._v("领奖地点")]),a("span",{staticClass:"shop-name"},[t._v("\n                "+t._s(s[0])+"\n              ")]),a("span",{staticClass:"shop-addr"},[t._v("\n                "+t._s(s[1])+"\n              ")]),a("span",{staticClass:"shop-tell"},[t._v("\n                "+t._s(s[2])+"\n              ")])])])}),1)],1)]),a("div",{staticClass:"code"},[a("img",{attrs:{src:t.codeImgURL}}),a("div",{staticClass:"write"},[t._v("商家扫码核销")])]),a("div",{staticClass:"rule flex flex-column"},[a("van-nav-bar",{attrs:{title:"领奖规则",border:!1}}),a("div",{staticClass:"cell process"},[a("ul",t._l(t.process,function(s,i){return a("li",{key:i},[a("van-tag",{attrs:{type:"success",plain:""}},[t._v(t._s(s))])],1)}),0)]),t._m(0),t._m(1)],1)]),a("div",{staticClass:"slogan"},[t._v("\n    "+t._s(t.$store.state.slogan)+"\n  ")])],1)},n=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"cell theway"},[a("b",[t._v("领奖方式")]),t._v("你所选择的奖品需要到领奖地点核销，并由商家发放奖品。你所领取的兑换券在首页-我的-钱包-卡券中，核销过程请出示兑换券，由商家扫码进行核销。\n      ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"cell statement"},[a("b",[t._v("声明")]),t._v("本活动奖品有第三方商家提供，阅亮书架平台不对奖品质保负责。\n      ")])}],e=(a("ac6a"),a("28a5"),a("0a67")),c=a.n(e),o={name:"write-off",data:function(){return{details:this.$route.query,codeImgURL:"",process:["领奖时间","领奖地点","出示兑换券","商家核销","领取奖品"]}},computed:{addrList:function(){if(!this.details||!this.details.addr)return[];var t=[];t=this.details.addr.split(/\n/);var s=[];t.forEach(function(t){t.trim().length&&s.push(t)});for(var a=[],i=0,n=s.length;i<n;i+=3)a.push(s.slice(i,i+3));return a}},created:function(){this.qrcode()},methods:{qrcode:function(){var t=this,s="".concat(location.origin,"/book/shangjia/coupon_check?download_id=").concat(this.$route.query.download_id);c.a.toDataURL(s).then(function(s){t.codeImgURL=s}).catch(function(s){t.$toast(s)})}}},r=o,l=(a("2664"),a("2877")),d=Object(l["a"])(r,i,n,!1,null,"4408dc8a",null);s["default"]=d.exports}}]);