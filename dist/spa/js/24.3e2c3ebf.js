(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{"10e8":function(t,e,r){},"6c3c":function(t,e,r){"use strict";var a=r("10e8"),o=r.n(a);o.a},bdd1:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"hHh lpR fFf"}},[r("q-header",{staticClass:"bg-white text-dark",attrs:{elevated:""}},[r("q-toolbar",{staticClass:"row justify-center"},[r("q-toolbar-title",{staticClass:"col-sm-8 q-mt-sm"},[r("div",{staticClass:"row"},[r("span",{staticClass:"col-4 text-h6"},[t._v("Freshy Rider")]),r("div",{staticClass:"col text-right"},["sm"!==t.$mq?r("q-btn-group",{staticClass:"col-12",attrs:{flat:""}},t._l(t.routes,(function(t){return r("q-btn",{key:t.id,attrs:{flat:"",round:"",color:"accent",to:t.route,icon:t.icon}})})),1):t._e(),r("q-btn-group",{staticClass:"col-12",attrs:{flat:""}},[r("q-btn",{staticClass:"text-right",attrs:{flat:"",round:"",color:"purple",icon:"home",to:"/"}}),r("q-btn",{staticClass:"text-right",attrs:{flat:"",round:"",color:"purple",icon:"fas fa-user-secret",to:"/admining"}})],1)],1)])])],1)],1),r("div",{staticClass:"row justify-center"},[r("div",{staticClass:"col-xs-12 col-sm-8"},[r("q-page-container",[r("router-view")],1)],1)]),"sm"===t.$mq?r("q-footer",{staticClass:"bg-white text-dark text-center q-pa-sm",attrs:{elevated:""}},t._l(t.routes,(function(e){return r("q-btn",{key:e.id,staticClass:"text-center",attrs:{to:e.route,rounded:"",flat:"",icon:e.icon}},[1===e.id&&t.badgeData.notificaiton>0?r("q-badge",{staticClass:"textSize q-pa-xs",attrs:{color:"orange",floating:"",label:t.badgeData.notificaiton}}):t._e()],1)})),1):t._e()],1)},o=[],n=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("7514"),r("c47a")),s=r.n(n),i=r("2f62");function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){s()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={data:function(){return{riderId:"fos753",routes:[{id:1,btnName:"Requests",color:"teal",icon:"fas fa-bell",route:"/rider/requests"},{id:2,btnName:"Dashboard",color:"teal",icon:"dashboard",route:"/rider/dashboard"},{id:3,btnName:"Inventory",color:"teal",icon:"fas fa-shopping-bag",route:"/rider/inventory"}]}},computed:l({},Object(i["c"])(["getRiders"]),{badgeData:function(){var t=this,e=this.getRiders.find((function(e){return e.id===t.riderId}));return{notificaiton:e.itemsInHand.filter((function(t){return""===t.riderStatus&&!t.confirmedByRider})).length}}}),created:function(){},components:{}},u=d,f=(r("6c3c"),r("2877")),b=r("eebe"),p=r.n(b),g=r("4d5a"),h=r("e359"),m=r("65c6"),y=r("6ac5"),q=r("e7a9"),v=r("9c40"),w=r("09e3"),O=r("7ff0"),C=r("58a8"),j=Object(f["a"])(u,a,o,!1,null,"66c39bac",null);e["default"]=j.exports;p()(j,"components",{QLayout:g["a"],QHeader:h["a"],QToolbar:m["a"],QToolbarTitle:y["a"],QBtnGroup:q["a"],QBtn:v["a"],QPageContainer:w["a"],QFooter:O["a"],QBadge:C["a"]})}}]);