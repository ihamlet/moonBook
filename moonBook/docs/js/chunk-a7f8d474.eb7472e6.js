(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a7f8d474"],{3431:function(e,t,a){},"80ec":function(e,t,a){"use strict";var s=a("3431"),i=a.n(s);i.a},f552:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"select-list"},[a("div",{staticClass:"card-list"},[e._l(e.fees,function(t,s){return a("div",{key:s,staticClass:"item",class:[e.intervalIndex==s?"select":""],on:{click:function(a){return e.selectInterval(t,s)}}},[a("van-row",{staticClass:"flex flex-align"},[a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"focus col-box theme-background"},[e._v("\n              "+e._s(t.months)+"\n            ")])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"col-box date"},[e._v("\n              "+e._s(t.name)+"\n            ")])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"col-box day"},[e._v("\n              "+e._s(t.duration)+"天\n            ")])]),a("van-col",{attrs:{span:"6"}},[a("div",{staticClass:"col-box price"},[e._v("\n              "+e._s(t.origin_price/100)+"\n            ")])])],1)],1)}),a("div",{staticClass:"explain"},[a("b",[e._v("说明")]),a("p",[e._v(e._s(e.tips))])])],2)]),a("van-popup",{staticClass:"order-popup",attrs:{position:"bottom","get-container":"#app","close-on-click-overlay":!1},on:{"click-overlay":function(t){e.isPayShow=!1}},model:{value:e.isPayShow,callback:function(t){e.isPayShow=t},expression:"isPayShow"}},[a("div",{staticClass:"content"},[a("div",{staticClass:"pay-info flex flex-align"},[a("div",{staticClass:"title"},[e._v("支付信息")]),a("div",{directives:[{name:"line-clamp",rawName:"v-line-clamp:20",value:1,expression:"1",arg:"20"}],staticClass:"school-name"},[e._v(e._s(e.schoolName))])]),a("van-cell-group",[a("van-cell",{attrs:{title:"会员类型",value:e.selectFees.name+" "+e.leves.name}}),a("van-cell",{attrs:{title:"支付押金",value:"￥"+e.leves.price/100}}),a("van-cell",{attrs:{title:"会员金额"}},[a("span",[e._v("￥"+e._s(e.selectFees.origin_price/100))]),e.selectFees.gold_cut_price?a("span",{staticClass:"red"},[e._v(" -￥"+e._s(e.selectFees.gold_cut_price))]):e._e()]),e.selectFees.gold_cut_price?a("van-cell",{attrs:{"value-class":"wm-coin"}},[a("div",[e._v("已使用微美币抵扣"),a("span",{staticClass:"red"},[e._v(e._s(e.selectFees.cut_off)+"%")]),e._v("的会员费")]),a("div",{staticClass:"red"},[e._v("扣除"+e._s(e.selectFees.gold)+"微美币,剩余"+e._s(e.selectFees.gold_remain)+"微美币")])]):e._e(),a("van-cell",{attrs:{title:"小计",size:"large",value:"￥"+(e.leves.price/100+e.selectFees.price/100-(e.selectFees.gold_cut_price||0))}}),a("van-button",{staticClass:"theme-btn",attrs:{square:"",loading:e.payLoading,size:"large",type:"primary"},on:{click:e.pay}},[e._v("\n          支 付\n        ")])],1)],1)])],1)},i=[],c=(a("ac6a"),a("9993")),l={name:"cardTime",data:function(){return{fees:[],tips:"",feeId:"",intervalIndex:0,isPayShow:!1,leves:"",schoolName:"",selectFees:"",payLoading:!1}},created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var e=this,t={params:{shelf_id:this.$route.query.id}};c["a"].get("/book/MemberCard/getMemberRegPayConfig",t).then(function(t){if(1==t.data.status){e.schoolName=t.data.data.title,e.tips=t.data.data.borrow_tip,e.fees=t.data.data.durations;var a=t.data.data.deposites;a.forEach(function(t){t.id==e.$route.query.leveId&&(e.leves=t)})}})},selectInterval:function(e,t){this.selectFees=e,this.isPayShow=!0,this.intervalIndex=t,this.feeId=e.id},pay:function(){this.payLoading=!0,location.href="/book/memberCard/buycard?level_id=".concat(this.$route.query.leveId,"&fee_id=").concat(this.feeId,"&is_auto=1&url=").concat(encodeURIComponent(location.href))}}},n=l,o=(a("80ec"),a("2877")),r=Object(o["a"])(n,s,i,!1,null,"0baffdad",null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-a7f8d474.eb7472e6.js.map