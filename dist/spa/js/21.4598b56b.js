(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"168b":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card-section",[r("div",{staticClass:"text-h6"},[t._t("default")],2)])},a=[],c={},o=c,s=r("2877"),i=r("eebe"),l=r.n(i),u=r("a370"),d=Object(s["a"])(o,n,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardSection:u["a"]})},4109:function(t,e,r){},5626:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card-actions",{attrs:{align:"right"}},[t._t("default")],2)},a=[],c={},o=c,s=r("2877"),i=r("eebe"),l=r.n(i),u=r("4b7e"),d=Object(s["a"])(o,n,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardActions:u["a"]})},"6dec":function(t,e,r){"use strict";var n=r("4109"),a=r.n(n);a.a},"8b24":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticClass:"bg-white"},[n("q-parallax",{staticClass:"q-mb-sm",attrs:{height:250,speed:.5},scopedSlots:t._u([{key:"media",fn:function(){return[n("img",{attrs:{src:r("ce71")}})]},proxy:!0}])},[n("h3",{staticClass:"text-white text-center"},[t._v("Get Healthy With Our Vegie")])]),n("div",{class:"sm"===t.$mq||"md"===t.$mq?"row wrap ":"web row wrap"},t._l(t.products,(function(e,r){return n("div",{key:r,staticClass:"col-xs-6 col-sm-3 col-md-3 col-xl-3 q-pa-xs q-mb-md"},[n("q-card",{staticClass:"my-card zoom q-mt-xl",attrs:{clickable:"",flat:""}},[n("q-card-section",{staticClass:"q-pa-none",on:{click:function(r){return t.viewSingleProduct(e)}}},[n("q-img",{attrs:{src:e.photo[0].url}}),n("div",{staticClass:"row no-wrap items-center text-center"},[n("h6",{staticClass:"col text-subtitle2 text-grey-8 q-ma-none text-italic text-bold"},[t._v("\n              "+t._s(e.name)+"\n            ")]),n("div",{staticClass:"col-auto text-grey text-caption q-pt-md row no-wrap items-center"})]),n("p",{staticClass:"text-center text-italic text-grey-8"},[n("span",{staticClass:"text-green text-bold"},[t._v("₱"+t._s(e.price))]),t._v("\n            /"+t._s(e.unit)+"\n          ")])],1),n("q-card-actions",{staticClass:"fit row wrap justify-center items-start content-center"},[n("q-btn",{attrs:{outline:!!t.cart.find((function(t){return t.id===e.id})),disable:!!t.cart.find((function(t){return t.id===e.id})),label:t.cart.find((function(t){return t.id===e.id}))?"PLACED ON CART":"ADD TO CART",color:"green"},on:{click:function(t){e.confirm=!e.confirm}}}),n("q-dialog",{attrs:{persistent:""},model:{value:e.confirm,callback:function(r){t.$set(e,"confirm",r)},expression:"product.confirm"}},[n("AddtoCart",{attrs:{productInfo:e}})],1)],1)],1)],1)})),0)],1)},a=[],c=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("7f7f"),r("c47a")),o=r.n(c),s=r("2f62"),i=r("9d4c");function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={name:"PageIndex",data:function(){return{viewItem:!1}},computed:u({},Object(s["c"])(["products","cart"])),methods:u({},Object(s["b"])(["getItems"]),{viewSingleProduct:function(t){this.$router.push({name:"product",params:{name:t.name}})}}),created:function(){this.getItems()},components:{AddtoCart:i["a"]}},p=d,f=(r("6dec"),r("2877")),m=r("eebe"),b=r.n(m),O=r("9989"),v=r("639d"),g=r("f09f"),y=r("a370"),w=r("068f"),h=r("27f9"),C=r("9c40"),j=r("4b7e"),x=r("24e8"),_=r("eb85"),q=Object(f["a"])(p,n,a,!1,null,null,null);e["default"]=q.exports;b()(q,"components",{QPage:O["a"],QParallax:v["a"],QCard:g["a"],QCardSection:y["a"],QImg:w["a"],QInput:h["a"],QBtn:C["a"],QCardActions:j["a"],QDialog:x["a"],QSeparator:_["a"]})},"9d4c":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card",[r("ModalHeader",[t._v("Cart")]),r("ModalBody",[r("span",{staticClass:"q-ml-sm"},[t._v("\n      Are you sure you want to add\n      "),r("span",{staticClass:"text-green"},[t._v(t._s(t.productInfo.name))]),t._v(" to your cart?\n    ")])]),r("ModalActions",[r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No",color:"primary"}}),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Yes",color:"primary"},on:{click:t.addCart}})],1)],1)},a=[],c=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("c47a")),o=r.n(c),s=r("168b"),i=r("ad5d"),l=r("5626"),u=r("2f62");function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){o()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={name:"Modal",data:function(){return{dataItem:null}},props:["productInfo"],created:function(){this.dataItem=p({},this.productInfo)},computed:p({},Object(u["c"])(["cart"])),methods:p({},Object(u["b"])(["addToCart"]),{addCart:function(){var t=this;this.addToCart(this.dataItem).then((function(){t.productInfo.qty=0}))}}),components:{ModalHeader:s["a"],ModalBody:i["a"],ModalActions:l["a"]}},m=f,b=r("2877"),O=r("eebe"),v=r.n(O),g=r("f09f"),y=r("9c40"),w=r("7f67"),h=Object(b["a"])(m,n,a,!1,null,null,null);e["a"]=h.exports;v()(h,"components",{QCard:g["a"],QBtn:y["a"]}),v()(h,"directives",{ClosePopup:w["a"]})},ad5d:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card-section",{staticClass:"row items-center scroll"},[t._t("default")],2)},a=[],c={},o=c,s=r("2877"),i=r("eebe"),l=r.n(i),u=r("a370"),d=Object(s["a"])(o,n,a,!1,null,null,null);e["a"]=d.exports;l()(d,"components",{QCardSection:u["a"]})},ce71:function(t,e,r){t.exports=r.p+"img/vegies.fd87b933.jpg"}}]);