(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c155c3e"],{"21d3":function(t,a,i){"use strict";var n=i("c6c5"),c=i.n(n);c.a},"42f2":function(t,a,i){"use strict";i.r(a);var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"read-data"},[i("van-nav-bar",{attrs:{title:t.$route.query.banji_name,border:!1}}),i("div",{staticClass:"container"},[i("van-tabs",{attrs:{type:"card",color:"#0084ff",sticky:"",animated:"",swipeable:""},on:{change:t.onChangeTab},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},t._l(t.tab,function(a,n){return i("van-tab",{key:n,attrs:{title:a.name}},[i("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},[i("van-list",{attrs:{finished:t.finished,"finished-text":t.$store.state.slogan},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},[t.list.length?i("div",{staticClass:"list"},t._l(t.list,function(a,n){return i("van-cell",{key:n},[i("div",{staticClass:"flex flex-align"},[i("div",{staticClass:"ranking",attrs:{slot:"icon"},slot:"icon"},[i("svgRanking",{attrs:{ranking:a.rank}})],1),i("div",{staticClass:"cell-data flex flex-align"},[i("div",{staticClass:"baby-info flex flex-align",on:{click:function(i){return t.toBabyHome(a)}}},[i("div",{staticClass:"avatar"},[i("img",{attrs:{src:a.avatar},on:{error:t.imgError}})]),i("div",{staticClass:"name"},[t._v("\n                                              "+t._s(a.name)+"\n                                          ")])]),i("div",{staticClass:"count"},[i("span",{staticClass:"count-num"},[t._v(t._s(a.count))]),i("span",{staticClass:"sign-days"},[t._v(t._s(a.sign_days))])])])])])}),1):i("div",{staticClass:"no-list"},[t._v("\n                          尚无数据\n                      ")])])],1)],1)}),1)],1)],1)},c=[],s=(i("7f7f"),i("cebc")),l=i("9993"),e=i("ed76"),r=i("591a"),o={name:"readData",components:{svgRanking:e["a"]},computed:Object(s["a"])({},Object(r["c"])(["userPointState"]),{tab:function(){return[{name:"图书借阅",api:"/book/SchoolTushuBorrow/getRank",params:{region:"banji",group:"baby"},getList:function(t){return t.list},getItem:function(t){return{avatar:t.babyInfo.avatar,name:t.babyInfo.name,rank:t.rank,count:"".concat(t.read_count,"本"),id:t.child_id}}},{name:"阅读打卡",api:"/book/SchoolBookSign/getRank",params:{sort:"read_sign",time:"all",city_name:this.userPointState.city},getList:function(t){return t},getItem:function(t){return{avatar:t.avatar,name:t.name,rank:t.rank,count:"".concat(t.sign_read_count,"本"),sign_days:"".concat(t.sign_days,"天"),id:t.child_id}}}]}}),data:function(){return{active:0,page:1,loading:!1,finished:!1,list:[]}},methods:{onLoad:function(){var t=this,a=this.tab[this.active],i={params:Object(s["a"])({page:this.page,banji_id:this.$route.query.banji_id,school_id:this.$route.query.school_id},a.params)};return l["a"].get(a.api,i).then(function(i){switch(i.data.status){case 1:var n=a.getList(i.data.data),c=n.map(function(t){return a.getItem(t)});1==t.page?t.list=c:t.list=t.list.concat(c),t.page++,t.loading=!1,t.list.length>=i.data.count&&(t.finished=!0);break;default:t.$toast(i.data.msg)}})},onRefresh:function(){var t=this;this.page=1,this.onLoad().then(function(){t.loading=!1,t.finished=!1})},onChangeTab:function(t){this.active=t,this.onRefresh()},toBabyHome:function(t){this.$router.push({name:"baby-home",query:{id:t.id}})},imgError:function(t){t.target.src="https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0"}}},d=o,u=(i("ffb6"),i("2877")),f=Object(u["a"])(d,n,c,!1,null,"9969f820",null);a["default"]=f.exports},"92c5":function(t,a,i){},c6c5:function(t,a,i){},ed76:function(t,a,i){"use strict";var n=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"svg-icon"},[t.ranking<4?i("div",{staticClass:"icon",class:"ranking-"+t.type},[1==t.ranking?i("svg",{staticClass:"icon",staticStyle:{width:"1em",height:"1em","vertical-align":"middle",fill:"currentColor",overflow:"hidden"},attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"729"}},[i("path",{attrs:{d:"M392.192 440.32L244.224 367.104c-16.384-8.192-30.72 0-31.744 18.432l-10.752 164.864c-1.024 18.432 11.264 39.424 27.648 47.616l147.968 73.216c16.384 8.192 30.72 0 31.744-18.432L419.84 487.936c1.024-18.432-11.776-39.424-27.648-47.616z m338.944-196.096l-147.968-73.216c-16.384-8.192-30.72 0-31.744 18.432l-10.752 164.864c-1.024 18.432 11.264 39.424 27.648 47.616l147.968 73.216c16.384 8.192 30.72 0 31.744-18.432l10.752-164.864c1.024-17.92-11.264-39.424-27.648-47.616z",fill:"#FEAE30","p-id":"730"}}),i("path",{attrs:{d:"M560.128 725.504c5.632 9.728 16.384 11.264 27.136 5.632l81.92-47.616c8.192-4.608 10.752-14.848 6.144-22.528-4.608-8.192-14.848-10.752-23.04-6.144l-52.736 30.208 13.824-33.28c14.848-36.352 20.48-56.32 6.144-81.408v-0.512c-16.384-28.16-47.616-34.816-78.848-16.384-23.04 13.312-32.256 29.696-36.352 50.688-1.024 4.096 0 9.216 2.048 12.288 5.12 8.192 15.36 11.264 23.552 6.656 5.12-3.072 7.68-7.68 8.192-11.264 3.072-13.824 7.68-22.016 16.896-27.648 11.776-6.656 24.064-4.608 31.744 7.68 7.168 12.288 4.608 25.088-5.12 51.2l-22.528 59.904c-3.072 8.704-3.072 15.872 1.024 22.528z",fill:"#E5E5E5","p-id":"731"}}),i("path",{attrs:{d:"M901.12 506.88c10.752 24.576 6.144 52.224-9.728 72.704-36.864 44.544-118.272 108.544-221.184 168.96-100.352 58.88-193.536 98.816-249.856 110.08-26.624 4.096-53.76-6.144-70.144-27.648 0.512 0.512 0.512 1.024 1.024 1.536L110.08 522.24c0-0.512 0.512 0 0-1.024-6.656-11.776-2.56-26.624 9.216-33.792 4.608-2.56 9.728-3.072 14.336-2.56l222.72 46.08-16.384-294.4c-0.512-12.288 6.144-24.576 17.408-31.232 10.752-6.144 23.552-5.632 33.792 0l248.32 162.304 70.144-211.456v0.512c1.536-6.144 5.632-11.264 11.264-14.848 11.776-6.656 27.136-3.072 33.792 8.704 0.512 0.512 0.512 0 1.024 0l147.968 360.96c-1.024-1.536-2.048-2.56-2.56-4.608z",fill:"#FED530","p-id":"732"}}),i("path",{attrs:{d:"M486.912 425.984c65.536-37.888 149.504-15.36 187.392 50.176 37.888 65.536 15.36 149.504-50.176 187.392-65.536 37.888-149.504 15.36-187.392-50.176s-15.36-148.992 50.176-187.392z",fill:"#FEAE30","p-id":"733"}}),i("path",{attrs:{d:"M584.192 606.208c6.144 10.752 19.456 14.336 30.208 8.192 10.752-6.144 14.336-19.456 8.192-30.208L560.128 481.28c-6.144-10.752-19.456-14.336-30.208-8.192l-0.512 0.512c-5.12 3.072-10.24 7.68-16.384 13.824l-20.48 21.504c-6.656 6.656-7.68 16.384-3.072 24.064 5.12 9.216 17.408 12.288 26.624 6.656 2.048-1.024 4.608-3.072 6.144-5.12l11.776-11.264 50.176 82.944z",fill:"#FED530","p-id":"734"}})]):t._e(),2==t.ranking?i("svg",{staticClass:"icon",staticStyle:{width:"1em",height:"1em","vertical-align":"middle",fill:"currentColor",overflow:"hidden"},attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"695"}},[i("path",{attrs:{d:"M392.192 440.32L244.224 367.104c-16.384-8.192-30.72 0-31.744 18.432l-10.752 164.864c-1.024 18.432 11.264 39.424 27.648 47.616l147.968 73.216c16.384 8.192 30.72 0 31.744-18.432L419.84 487.936c1.024-18.432-11.776-39.424-27.648-47.616z m338.944-196.096l-147.968-73.216c-16.384-8.192-30.72 0-31.744 18.432l-10.752 164.864c-1.024 18.432 11.264 39.424 27.648 47.616l147.968 73.216c16.384 8.192 30.72 0 31.744-18.432l10.752-164.864c1.024-17.92-11.264-39.424-27.648-47.616z",fill:"#C6C6C6","p-id":"696"}}),i("path",{attrs:{d:"M560.128 725.504c5.632 9.728 16.384 11.264 27.136 5.632l81.92-47.616c8.192-4.608 10.752-14.848 6.144-22.528-4.608-8.192-14.848-10.752-23.04-6.144l-52.736 30.208 13.824-33.28c14.848-36.352 20.48-56.32 6.144-81.408v-0.512c-16.384-28.16-47.616-34.816-78.848-16.384-23.04 13.312-32.256 29.696-36.352 50.688-1.024 4.096 0 9.216 2.048 12.288 5.12 8.192 15.36 11.264 23.552 6.656 5.12-3.072 7.68-7.68 8.192-11.264 3.072-13.824 7.68-22.016 16.896-27.648 11.776-6.656 24.064-4.608 31.744 7.68 7.168 12.288 4.608 25.088-5.12 51.2l-22.528 59.904c-3.072 8.704-3.072 15.872 1.024 22.528z",fill:"#E8E8E8","p-id":"697"}}),i("path",{attrs:{d:"M901.12 506.88c10.752 24.576 6.144 52.224-9.728 72.704-36.864 44.544-118.272 108.544-221.184 168.96-100.352 58.88-193.536 98.816-249.856 110.08-26.624 4.096-53.76-6.144-70.144-27.648 0.512 0.512 0.512 1.024 1.024 1.536L110.08 522.24c0-0.512 0.512 0 0-1.024-6.656-11.776-2.56-26.624 9.216-33.792 4.608-2.56 9.728-3.072 14.336-2.56l222.72 46.08-16.384-294.4c-0.512-12.288 6.144-24.576 17.408-31.232 10.752-6.144 23.552-5.632 33.792 0l248.32 162.304 70.144-211.456v0.512c1.536-6.144 5.632-11.264 11.264-14.848 11.776-6.656 27.136-3.072 33.792 8.704 0.512 0.512 0.512 0 1.024 0l147.968 360.96c-1.024-1.536-2.048-2.56-2.56-4.608z",fill:"#E8E8E8","p-id":"698"}}),i("path",{attrs:{d:"M486.912 425.984c65.536-37.888 149.504-15.36 187.392 50.176 37.888 65.536 15.36 149.504-50.176 187.392-65.536 37.888-149.504 15.36-187.392-50.176s-15.36-148.992 50.176-187.392z",fill:"#C6C6C6","p-id":"699"}}),i("path",{attrs:{d:"M538.112 627.2c5.632 9.216 15.872 10.752 25.6 5.12l77.312-44.544c7.68-4.096 10.24-13.824 5.632-21.504-4.096-7.68-13.824-10.24-21.504-5.632l-49.664 28.672 12.8-31.232c13.824-34.304 19.456-52.736 5.632-76.8v-0.512c-15.36-26.624-45.056-32.768-74.24-15.36-21.504 12.288-30.72 27.648-34.304 47.616-1.024 4.096 0 8.192 2.048 11.776 4.608 7.68 14.336 10.752 22.528 6.144 5.12-2.56 7.168-7.168 8.192-10.752 3.072-13.312 7.168-20.48 15.872-25.6 11.264-6.656 23.04-4.608 29.696 7.68 6.656 11.776 4.608 23.552-5.12 48.128l-20.992 56.32c-3.072 7.168-3.072 14.336 0.512 20.48z",fill:"#E8E8E8","p-id":"700"}})]):t._e(),3==t.ranking?i("svg",{staticClass:"icon",staticStyle:{width:"1em",height:"1em","vertical-align":"middle",fill:"currentColor",overflow:"hidden"},attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"661"}},[i("path",{attrs:{d:"M392.192 439.296L244.224 366.08c-16.384-8.192-30.72 0-31.744 18.432l-10.752 164.864c-1.024 18.432 11.264 39.424 27.648 47.616l147.968 73.216c16.384 8.192 30.72 0 31.744-18.432L419.84 486.912c1.024-18.432-11.776-39.424-27.648-47.616z m338.944-196.096l-147.968-73.216c-16.384-8.192-30.72 0-31.744 18.432l-10.24 164.864c-1.024 18.432 11.264 39.424 27.648 47.616L716.8 474.112c16.384 8.192 30.72 0 31.744-18.432l10.752-164.864c0.512-17.92-11.776-39.424-28.16-47.616z",fill:"#AA733D","p-id":"662"}}),i("path",{attrs:{d:"M560.128 724.48c5.632 9.728 16.384 11.264 27.136 5.632l81.92-47.616c8.192-4.608 10.752-14.848 6.144-22.528-4.608-8.192-14.848-10.752-23.04-6.144l-52.736 30.208 13.824-33.28c14.848-36.352 20.48-56.32 6.144-81.408v-0.512c-16.384-28.16-47.616-34.816-78.848-16.384-23.04 13.312-32.256 29.696-36.352 50.688-1.024 4.096 0 9.216 2.048 12.288 5.12 8.192 15.36 11.264 23.552 6.656 5.12-3.072 7.68-7.68 8.192-11.264 3.072-13.824 7.68-22.016 16.896-27.648 11.776-6.656 24.064-4.608 31.744 7.68 7.168 12.288 4.608 25.088-5.12 51.2l-22.528 59.904c-3.072 8.704-3.072 15.872 1.024 22.528z",fill:"#E5E5E5","p-id":"663"}}),i("path",{attrs:{d:"M901.12 505.856c10.752 24.576 6.144 52.224-9.728 72.704-36.864 44.544-118.272 108.544-221.184 168.96-100.352 58.88-193.536 98.816-249.856 110.08-26.624 4.096-53.76-6.144-70.144-27.648 0.512 0.512 0.512 1.024 1.024 1.536l-240.128-310.784c0-0.512 0.512 0 0-1.024-6.656-11.776-2.56-26.624 9.216-33.792 4.608-2.56 9.728-3.072 14.336-2.56l222.72 46.08-16.384-294.4c-0.512-12.288 6.144-24.576 17.408-31.232 10.752-6.144 23.552-5.632 33.792 0l248.32 162.304 70.144-211.456v0.512c1.536-6.144 5.632-11.264 11.264-14.848 11.776-6.656 27.136-3.072 33.792 8.704 0.512 0.512 0.512 0 1.024 0l147.968 360.96c-2.048-1.024-3.072-2.048-3.584-4.096z",fill:"#CA9561","p-id":"664"}}),i("path",{attrs:{d:"M486.912 424.96c65.536-37.888 149.504-15.36 187.392 50.176 37.888 65.536 15.36 149.504-50.176 187.392-65.536 37.888-149.504 15.36-187.392-50.176s-15.36-148.992 50.176-187.392z",fill:"#AA733D","p-id":"665"}}),i("path",{attrs:{d:"M600.064 619.52c30.208-17.408 37.888-46.592 23.04-72.192v-0.512c-14.336-25.088-37.888-24.064-57.856-16.896l11.776-40.448c2.56-8.192 3.584-14.336-1.024-21.504-4.608-8.192-13.824-9.216-22.528-4.608L487.936 501.76c-6.656 4.096-9.216 13.312-5.632 19.968 4.096 6.656 13.312 9.216 19.968 5.632l41.472-24.064-10.752 41.472c-2.048 7.168-1.536 11.776 0.512 15.872 4.096 6.656 13.312 9.216 19.968 5.632l4.608-2.56c16.384-9.728 29.696-9.216 36.352 2.048v0.512c5.632 10.24 1.536 20.992-9.728 27.648-10.752 6.144-20.48 7.168-32.256 5.12-3.584-0.512-7.168-0.512-11.776 2.048-7.68 4.608-10.752 14.848-6.144 22.528 2.56 4.096 7.168 6.656 11.264 7.68 16.896 1.536 35.328-1.024 54.272-11.776z",fill:"#CA9561","p-id":"666"}})]):t._e()]):i("div",{staticClass:"icon"},[i("div",{staticClass:"number"},[t._v(t._s(t.ranking>100?"99+":t.ranking))])])])},c=[],s={name:"svg-ranking",props:["ranking","type"]},l=s,e=(i("21d3"),i("2877")),r=Object(e["a"])(l,n,c,!1,null,"5e380186",null);a["a"]=r.exports},ffb6:function(t,a,i){"use strict";var n=i("92c5"),c=i.n(n);c.a}}]);