(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39f3963c"],{"261b":function(t,s,a){"use strict";var i=a("62ab"),e=a.n(i);e.a},"42c4":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{class:t.show?"advertising-details":""},[a("div",{staticClass:"ad-container",domProps:{innerHTML:t._s(t.details.intro)}}),a("div",{staticClass:"footer-bar"},[a("div",{staticClass:"bar"},[a("van-button",{staticClass:"theme-btn",attrs:{round:"",type:"primary",size:"large"},on:{click:function(s){t.show=!0}}},[a("i",{staticClass:"iconfont"},[t._v("")]),t._v("  \n        领取卡券\n      ")])],1)]),a("van-popup",{attrs:{position:"bottom",overlay:!1,"lock-scroll":!1},model:{value:t.show,callback:function(s){t.show=s},expression:"show"}},[a("van-nav-bar",{attrs:{title:"卡券领取","right-text":"更多奖品","left-text":"收起",border:!1},on:{"click-left":function(s){t.show=!1},"click-right":t.toProgress}}),a("div",{staticClass:"prize-card flex flex-column"},[a("div",{staticClass:"prize-content"},[a("div",{staticClass:"name"},[t._v(t._s(t.details.shop_name))]),t.details.price>0?a("div",{staticClass:"title"},[t._v("\n          "+t._s(t.details.title)+",价值"+t._s(t.details.price/100)+"元\n        ")]):t._e()]),a("div",{staticClass:"prize-bar"},[a("van-button",{staticClass:"theme-btn",attrs:{round:"",size:"normal",loading:t.picking,type:"primary"},on:{click:t.receive}},[t._v("领兑换券")])],1),a("div",{staticClass:"prompt-text"},[t._v("领券后商家客服或许会与您联系")])])],1),a("van-popup",{staticClass:"popup-details",model:{value:t.detailsCard,callback:function(s){t.detailsCard=s},expression:"detailsCard"}},[a("van-nav-bar",{attrs:{title:t.successful?"恭喜领取成功":"领取失败",border:!1},on:{"click-right":t.onClickRight}},[a("div",{staticClass:"close-btn",attrs:{slot:"right"},slot:"right"},[a("i",{staticClass:"iconfont"},[t._v("")])])]),t.successful?a("div",{staticClass:"container"},[a("div",{staticClass:"card-head"}),a("div",{staticClass:"card-title"},[t._v("领取规则")]),a("div",{staticClass:"details flex flex-column"},[a("div",{staticClass:"cell process"},[a("ul",t._l(t.process,function(s,i){return a("li",{key:i},[a("van-tag",{attrs:{type:"success",plain:""}},[t._v(t._s(s))])],1)}),0)]),a("div",{staticClass:"cell info"},[a("div",{staticClass:"time theme-color"},[a("b",[t._v("领奖时间")]),t._v("2019/03/12-"+t._s(t.details.expire_date))]),a("div",{staticClass:"address theme-color"},[a("van-swipe",{attrs:{autoplay:3e3,"show-indicators":!1}},t._l(t.addrList,function(s,i){return a("van-swipe-item",{key:i},[a("div",{staticClass:"shop-info"},[a("b",[t._v("领奖地点")]),a("span",{staticClass:"shop-name"},[t._v("\n                    "+t._s(s[0])+"\n                  ")]),a("span",{staticClass:"shop-addr"},[t._v("\n                    "+t._s(s[1])+"\n                  ")]),a("span",{staticClass:"shop-tell"},[t._v("\n                    "+t._s(s[2])+"\n                  ")])])])}),1)],1)]),a("div",{staticClass:"cell theway"},[a("b",[t._v("领奖方式")]),t._v("你所选择的奖品需要到领奖地点核销，并由商家发放奖品。你所领取的兑换券在首页-我的-钱包-卡券中，核销过程请出示兑换券，由商家扫码进行核销。\n        ")])]),a("div",{staticClass:"draw-btn"},[a("van-button",{staticClass:"theme-btn",attrs:{round:"",size:"normal",type:"primary"},on:{click:t.toPopupList}},[t._v("查看兑换券")])],1),a("div",{staticClass:"cell statement"},[a("b",[t._v("声明")]),t._v("本活动奖品有第三方商家提供，阅亮书架平台不对奖品质保负责。\n      ")])]):a("div",{staticClass:"container"},[a("div",{staticClass:"content"},[a("div",{staticClass:"hint"},[t._v(t._s(t.msg))]),a("div",{staticClass:"point"},[t._v("继续加油，坚持下去")])]),a("div",{staticClass:"draw-btn"},[a("van-button",{staticClass:"theme-btn",attrs:{round:"",size:"normal",type:"primary"},on:{click:t.toProgress}},[t._v("查看我的打卡进度")])],1)])],1)],1)},e=[],n=(a("a481"),a("ac6a"),a("28a5"),a("cebc")),c=a("9993"),o=a("591a"),r={name:"advertisingDetails",data:function(){return{show:!1,detailsCard:!1,process:["领奖时间","领奖地点","出示兑换券","商家核销","领取奖品"],picking:!1,successful:!1,coupon_id:this.$route.query.coupon_id||0,details:"",msg:""}},computed:Object(n["a"])({},Object(o["c"])(["userDataState"]),{addrList:function(){var t=[];t=this.details.addr.split(/\n/);var s=[];t.forEach(function(t,a){t.trim().length&&s.push(t)});for(var a=[],i=0,e=s.length;i<e;i+=3)a.push(s.slice(i,i+3));return a}}),created:function(){this.fetchData()},watch:{$router:"fetchData"},methods:{fetchData:function(){var t=this,s={params:{coupon_id:this.$route.query.coupon_id}};c["a"].get("/book/member/get_coupon",s).then(function(s){switch(s.data.status){case 1:t.show=!0,t.details=s.data.data;break}})},onClickRight:function(){this.detailsCard=!1,this.show=!0},receive:function(){var t=this;this.picking=!0;var s={params:{coupon_id:this.coupon_id}};if(this.userDataState.child_id>0)return Object(c["a"])("/book/member/pick_coupon",s).then(function(s){switch(t.picking=!1,t.detailsCard=!0,t.msg=s.data.msg,s.data.status){case 1:t.successful=!0;break}});this.$dialog.alert({title:"请添加宝贝",message:"请添加宝贝参与阅读打卡",confirmButtonText:"添加",cancelButtonText:"稍后",showCancelButton:!0}).then(function(){t.$router.push({name:"edit-child",query:{type:"add",pageTitle:"添加宝贝"}}),localStorage.removeItem("childInfo")}).catch(function(){t.$router.go(-1)})},toPopupList:function(){this.$router.push({name:"popupList"})},toProgress:function(){this.$router.replace({name:"punchSpeed"})}}},l=r,d=(a("261b"),a("2877")),u=Object(d["a"])(l,i,e,!1,null,"98bfa29e",null);s["default"]=u.exports},"62ab":function(t,s,a){}}]);