(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5744ae06"],{2615:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"share"},[t.userDataState.child_id==t.$route.query.id?a("div",{staticClass:"tips"},[t._v("分享成就")]):t._e(),a("div",{staticClass:"wrap"},[a("div",{staticClass:"child-info"},[a("div",{staticClass:"avatar"},[a("img",{attrs:{src:t.$route.query.avatar},on:{error:t.imgError}})]),a("div",{staticClass:"name"},[t._v(t._s(t.$route.query.name))]),a("div",{staticClass:"label"},[t._v("在阅亮书架获得的成就")])]),a("div",{staticClass:"medal-box fadeIn animated",class:t.userDataState.child_id==t.$route.query.id?"is-mine":""},[a("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/medal.png"}}),a("div",{staticClass:"level"},[t._v("Lv."+t._s(t.$route.query.level))]),a("div",{staticClass:"ribbon bounceIn animated"},[a("div",{staticClass:"ribbon-content"},[t._v(t._s(t.$route.query.medalName))]),a("div",{staticClass:"ribbon-left"}),a("div",{staticClass:"ribbon-right"})])]),a("div",{staticClass:"text"},[t._v("坚持"+t._s(t.text[1])+t._s(t.$route.query.number)+t._s("punch"==t.$route.query.type?"天":"本")+"达成")]),t.userDataState.child_id!=t.$route.query.id?a("div",{staticClass:"tags-row"},[a("van-row",{attrs:{gutter:"10"}},[a("div",{staticClass:"row-title"},[t._v("给Ta鼓励")]),t._l(t.tags,function(e,n){return a("van-col",{key:n,attrs:{span:"8"}},[a("van-button",{staticClass:"tags-btn",attrs:{round:"",type:"default",size:"small"},on:{click:function(a){return t.encourage(e)}}},[t._v(t._s(e))])],1)}),a("van-col",{attrs:{span:"8"}},[a("van-button",{staticClass:"tags-btn",attrs:{round:"",type:"default",size:"small"},on:{click:t.showField}},[t._v("\n            自己写   \n            "),a("img",{staticClass:"pencil",attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/pencil.png"}})])],1)],2),a("div",{staticClass:"button-bar"},[a("van-button",{staticClass:"accept",attrs:{size:"normal",type:"default",round:""},on:{click:t.toBabyHome}},[t._v("加入阅读打卡")])],1)],1):t._e(),a("div",{staticClass:"logo",on:{click:t.toHome}},[a("img",{attrs:{src:"https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png"}})])]),a("div",{staticClass:"round-bg"},[a("round")],1),a("van-popup",{staticClass:"popup-message",attrs:{position:"bottom"},on:{close:function(e){return t.$refs.field.blur()}},model:{value:t.isFieldShow,callback:function(e){t.isFieldShow=e},expression:"isFieldShow"}},[a("van-field",{ref:"field",staticClass:"field",attrs:{border:!1,type:"textarea",placeholder:"给"+t.$route.query.name+"一些鼓励吧...",rows:"4",autosize:""},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),a("div",{staticClass:"footer-btn"},[a("van-button",{staticClass:"theme-btn",attrs:{type:"primary",round:"",loading:t.isLoading,"loading-text":"发布中"},on:{click:t.submit}},[t._v("鼓励Ta")])],1)],1)],1)},s=[],i=(a("7f7f"),a("cebc")),r=a("9993"),o=a("d248"),u=a("75e0"),c=a("591a"),l={name:"share",components:{round:o["a"]},computed:Object(i["a"])({},Object(c["c"])(["userDataState"]),Object(c["e"])("openWX",["ready"]),{item:function(){var t={details:"阅亮书架，与家人一起参与宝贝阅读，记录成长",title:"".concat(this.$route.query.name,"获得").concat(this.$route.query.number).concat(this.text[0],"成就“").concat(this.$route.query.medalName,"”"),imgUrl:location.origin+this.$route.query.avatar};return t},text:function(){var t=[];switch(this.$route.query.type){case"punch":t=["天阅读","阅读"];break;case"read":t=["本借阅","借阅"];break}return t}}),data:function(){return{tags:u["b"],message:"",isFieldShow:!1,isLoading:!1}},mounted:function(){var t=this;this.$nextTick(function(){t.wxShare()})},watch:{ready:function(){this.wxShare()}},methods:Object(i["a"])({},Object(c["b"])("openWX",["share"]),{imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"},wxShare:function(){var t=this,e={item:this.item,success:function(){t.$router.go(-1)}};this.share(e)},toHome:function(){this.$router.push({name:"home"})},submit:function(){var t=this,e={child_id:this.$route.query.id,target:"baby",post_id:this.$route.query.post_id,contents:this.message};this.message.length?(this.isLoading=!0,r["a"].post("/book/SchoolArticleComment/edit?ajax=1",e).then(function(e){1==e.data.status?(t.$toast.success("鼓励"),t.isLoading=!1,t.isFieldShow=!1):t.$toast.fail(e.data.info)})):this.$toast("请填写评论内容")},toBabyHome:function(){this.$router.push({name:"baby-home",query:{id:this.userDataState.child_id}})},encourage:function(t){this.message=t,this.submit()},showField:function(){var t=this;this.isFieldShow=!0,this.message="",this.$nextTick(function(){t.$refs.field.focus()})}})},d=l,m=(a("7b1a"),a("2877")),h=Object(m["a"])(d,n,s,!1,null,"3a61e3a8",null);e["default"]=h.exports},5344:function(t,e,a){},5902:function(t,e,a){},"75e0":function(t,e,a){"use strict";a.d(e,"h",function(){return s}),a.d(e,"c",function(){return i}),a.d(e,"k",function(){return o}),a.d(e,"e",function(){return l}),a.d(e,"f",function(){return d}),a.d(e,"i",function(){return m}),a.d(e,"j",function(){return h}),a.d(e,"b",function(){return r}),a.d(e,"a",function(){return u}),a.d(e,"d",function(){return c}),a.d(e,"g",function(){return p});var n=a("cebc"),s=["说一点什么吧，他都能听得到","随心而起，有感而发","千头万绪,落笔汇成评论一句","听说，爱评论的人粉丝多","从小陪伴孩子读绘本，日积月累","陪伴就是给孩子最好的爱","愿你像颗种子，勇敢地冲破泥沙","心似海，不敌诗的咏叹"],i=["👍 棒棒哒","🙆 声音很棒","💪 加油哦","👪 很温馨","👏 非常棒","😊 很可爱哦","👑 继续努力","😄 向你学习","🌞 积少成多","📚 推荐这本书","🏆 很精彩"],r=["再接再厉","向你学习","坚持下去","太厉害了","难能可贵"],o=["聪明在于勤奋，天才在于积累","腹有诗书气自华，读书万卷始通神","少成若天性，习惯如自然","锲而不舍，金石可镂","敏而好学，不耻下问","读书之法，在循序渐进，熟读而精思"],u=["阅读是关系孩子素养发展的重要因素","阅读能够提高孩子的语言技能","亲子阅读是传递亲情的桥梁","阅读可以促进儿童认知能力"],c="<p>一起关爱孩子们的成长，我们可以从阅读做起。阅亮书架，将认真与执着地做着这件事情，同时也吸引了无数有识之士加入其中，和我们一起播撒着幸福的种子。</p><p>在路上，我们满怀期待，愿与您同行......</p>",l=[{name:"好的开始",number:1,type:"punch"},{name:"小试牛刀",number:21,type:"punch"},{name:"坚持不懈",number:50,type:"punch"},{name:"渐入佳境",number:100,type:"punch"},{name:"扬帆远航",number:198,type:"punch"},{name:"持之以恒",number:365,type:"punch"},{name:"学富五车",number:660,type:"punch"},{name:"阅读之星",number:1e3,type:"punch"}],d=[{name:"好的开始",number:1,type:"read"},{name:"小试牛刀",number:20,type:"read"},{name:"坚持不懈",number:60,type:"read"},{name:"渐入佳境",number:120,type:"read"},{name:"扬帆远航",number:300,type:"read"},{name:"持之以恒",number:700,type:"read"},{name:"学富五车",number:1e3,type:"read"},{name:"阅亮之星",number:1500,type:"read"}];function m(t){var e=[];return l.forEach(function(a,s){t>=a.number&&e.push(Object(n["a"])({},a,{level:s+1})),0==t&&e.push(Object(n["a"])({},a,{level:0}))}),e}function h(t){var e=[];return d.forEach(function(a,s){t>=a.number&&e.push(Object(n["a"])({},a,{level:s+1})),0==t&&e.push(Object(n["a"])({},a,{level:0}))}),e}var p=["","","","","","","","","",""]},"7b1a":function(t,e,a){"use strict";var n=a("5344"),s=a.n(n);s.a},9274:function(t,e,a){"use strict";var n=a("5902"),s=a.n(n);s.a},d248:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"welt"},t._l(t.round,function(t,e){return a("div",{key:e,staticClass:"round",class:"round-"+e,style:{width:t.w,height:t.w}})}),0)},s=[],i={name:"round",data:function(){return{round:[{w:"300px"},{w:"100px"},{w:"50px"},{w:"200px"},{w:"60px"}]}}},r=i,o=(a("9274"),a("2877")),u=Object(o["a"])(r,n,s,!1,null,"2b981942",null);e["a"]=u.exports}}]);