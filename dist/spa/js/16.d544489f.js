(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"168b":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card-section",[n("div",{staticClass:"text-h6"},[t._t("default")],2)])},a=[],c={},o=c,s=n("2877"),i=n("eebe"),l=n.n(i),u=n("a370"),d=Object(s["a"])(o,r,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardSection:u["a"]})},"17be":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{class:"sm"===t.$mq||"md"===t.$mq?"bg-white":"web web bg-white",attrs:{padding:""}},[t.loading?n("q-spinner-hourglass",{staticClass:"fixed-center",attrs:{color:"light-green",size:"10rem"}}):t._e(),t.loading?t._e():n("div",{staticClass:"row text-center"},[n("div",{staticClass:"col-xs-12 col-sm-6"},[n("q-img",{staticStyle:{height:"300px","max-width":"400px"},attrs:{src:"http://localhost:3000/"+t.changeProdPic,"spinner-color":"white"},scopedSlots:t._u([{key:"error",fn:function(){return[n("div",{staticClass:"absolute-full flex flex-center bg-negative text-white"},[t._v("\n            Cannot load image\n          ")])]},proxy:!0}],null,!1,2724282628)}),n("div",{staticClass:"row justify-center items-center content-center q-pa-sm"},t._l(t.getProduct.photos,(function(e,r){return n("q-img",{key:r,staticStyle:{height:"40px","max-width":"50px"},attrs:{src:"http://localhost:3000/"+e,"spinner-color":"white"},on:{click:function(e){t.slide=r}}})})),1)],1),n("div",{staticClass:"col-xs-12 col-sm-6 q-pa-md"},[n("h3",{staticClass:"text-h5 text-grey-8 q-mb-none q-mt-md text-italic"},[t._v("\n        "+t._s(t.getProduct.name)+"\n      ")]),n("q-separator",{attrs:{inset:""}}),n("h6",{staticClass:"text-h6 q-ma-none text-italic text-grey-8 q-ml-sm"},[n("span",{staticClass:"text-green text-weight-bolder"},[t._v("₱"+t._s(t.getProduct.price))]),t._v("\n        per "+t._s(t.getProduct.unit)+"\n      ")]),n("p",{staticClass:"text-body2 text-grey-8 q-mt-md q-ml-sm",domProps:{innerHTML:t._s(t.getProduct.description)}}),n("div",{staticClass:"q-ml-sm"},[n("q-btn",{attrs:{color:"green",label:"ADD TO CART"},on:{click:function(e){return t.cartAction(t.getProduct._id,1,"add")}}})],1)],1)]),t.loading?t._e():n("q-separator",{staticStyle:{height:"3px"},attrs:{inset:""}}),t.loading?t._e():n("p",{staticClass:"text-grey-8 text-h6 q-ml-md q-mb-none"},[t._v("\n    Recommendations\n  ")]),t.loading?t._e():n("div",{staticClass:"row"},t._l(t.recommendations,(function(e,r){return n("div",{key:r,staticClass:"col-xs-6 col-sm-2"},[n("q-card",{staticClass:"my-card zoom q-mt-xl",attrs:{clickable:"",flat:""}},[n("q-card-section",{staticClass:"q-pa-none",on:{click:function(n){return t.viewSingleProduct(e)}}},[n("q-img",{attrs:{src:"http://localhost:3000/"+e.photos[0]}}),n("div",{staticClass:"row no-wrap items-center text-center"},[n("h6",{staticClass:"col text-subtitle2 text-grey-8 q-ma-none text-italic text-bold"},[t._v("\n              "+t._s(e.name)+"\n            ")]),n("div",{staticClass:"col-auto text-grey text-caption q-pt-md row no-wrap items-center"})]),n("p",{staticClass:"text-center text-italic text-grey-8"},[n("span",{staticClass:"text-green text-bold"},[t._v("₱"+t._s(e.price))]),t._v("\n            /"+t._s(e.unit)+"\n          ")])],1),n("q-card-actions",{staticClass:"fit row wrap justify-center items-start content-center"},[n("q-btn",{attrs:{label:"ADD TO CART",color:"green"},on:{click:function(t){e.confirm=!e.confirm}}}),n("q-dialog",{attrs:{persistent:""},model:{value:e.confirm,callback:function(n){t.$set(e,"confirm",n)},expression:"product.confirm"}},[n("AddtoCart",{attrs:{product:e}})],1)],1)],1)],1)})),0)],1)},a=[],c=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("967e")),o=n.n(c),s=(n("96cf"),n("fa84")),i=n.n(s),l=(n("7514"),n("c47a")),u=n.n(l),d=(n("7f7f"),n("2f62")),p=n("9d4c");function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){u()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var b={data:function(){return{vueProducts:null,param:this.$route.params.name,slide:0,loading:!0}},computed:f({},Object(d["c"])(["products"]),{getProduct:function(){var t=this;return this.products.find((function(e){return e.name===t.param}))},changeProdPic:function(){return this.getProduct.photos[this.slide]},recommendations:function(){var t=[];return this.products.map((function(e){return t.push(e)})),t.length=6,t.sort((function(){return Math.random()-.5}))}}),methods:f({},Object(d["b"])(["cartItemFxn"]),{cartAction:function(t,e,n){this.cartItemFxn({productId:t,payload:{quantity:e,cartFxnType:n}})},viewSingleProduct:function(t){this.$router.push({name:"product",params:{name:t.name}}),this.param=t.name,this.$route.params.name=t.name}}),created:function(){var t=this;return i()(o.a.mark((function e(){return o.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:0!==t.products.length&&(t.loading=!1);case 1:case"end":return e.stop()}}),e)})))()},watch:{param:function(t,e){console.log(t),console.log(e),window.scrollTo(0,0)},getProduct:function(t){t&&(this.loading=!1)}},components:{AddtoCart:p["a"]}},g=b,h=(n("d3f7"),n("2877")),v=n("eebe"),x=n.n(v),y=n("9989"),w=n("9149"),O=n("0d59"),_=n("068f"),C=n("eb85"),q=n("9c40"),P=n("f09f"),j=n("a370"),S=n("4b7e"),k=n("24e8"),Q=Object(h["a"])(g,r,a,!1,null,null,null);e["default"]=Q.exports;x()(Q,"components",{QPage:y["a"],QSpinnerHourglass:w["a"],QSpinner:O["a"],QImg:_["a"],QSeparator:C["a"],QBtn:q["a"],QCard:P["a"],QCardSection:j["a"],QCardActions:S["a"],QDialog:k["a"]})},5626:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card-actions",{attrs:{align:"right"}},[t._t("default")],2)},a=[],c={},o=c,s=n("2877"),i=n("eebe"),l=n.n(i),u=n("4b7e"),d=Object(s["a"])(o,r,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardActions:u["a"]})},"9d4c":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",[n("ModalHeader",[t._v("Cart")]),n("ModalBody",[n("span",{staticClass:"q-ml-sm"},[t._v("\n      Are you sure you want to add\n      "),n("span",{staticClass:"text-green"},[t._v(t._s(t.product.name))]),t._v(" to your cart?\n    ")])]),n("ModalActions",[n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"}}),n("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:t.addCart}})],1)],1)},a=[],c=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("c47a")),o=n.n(c),s=n("168b"),i=n("ad5d"),l=n("5626"),u=n("2f62");function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={name:"Modal",data:function(){return{dataItem:null}},props:["product"],created:function(){},computed:p({},Object(u["c"])(["cart"])),methods:p({},Object(u["b"])(["cartItemFxn"]),{addCart:function(){console.log("id",this.product._id),this.cartItemFxn({productId:this.product._id,payload:{quantity:1,cartFxnType:"add"}})}}),components:{ModalHeader:s["a"],ModalBody:i["a"],ModalActions:l["a"]}},f=m,b=n("2877"),g=n("eebe"),h=n.n(g),v=n("f09f"),x=n("9c40"),y=n("7f67"),w=Object(b["a"])(f,r,a,!1,null,null,null);e["a"]=w.exports;h()(w,"components",{QCard:v["a"],QBtn:x["a"]}),h()(w,"directives",{ClosePopup:y["a"]})},ad5d:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card-section",{staticClass:"row items-center scroll"},[t._t("default")],2)},a=[],c={},o=c,s=n("2877"),i=n("eebe"),l=n.n(i),u=n("a370"),d=Object(s["a"])(o,r,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardSection:u["a"]})},cd5a:function(t,e,n){},d3f7:function(t,e,n){"use strict";var r=n("cd5a"),a=n.n(r);a.a}}]);