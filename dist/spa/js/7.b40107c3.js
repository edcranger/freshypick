(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"520b":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-list",{staticClass:"col-xs-12 q-pa-sm"},[a("q-item",{staticClass:"row wrap shadow-1 bg-white q-pa-sm",attrs:{clickable:""},on:{click:function(t){return e.selectThis("Unionbank")}}},[a("div",{staticClass:"col-xs-12 q-pa-sm"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 q-my-none"},[a("span",{staticClass:"text-green text-caption q-my-none"},[e._v("DEFAULT")])]),a("div",{staticClass:"col-12"},[a("p",{staticClass:"text-subtitle1 q-my-none"},[e._v("\n            Union Bank of the Philippines\n          ")])])]),a("p",{staticClass:"q-my-none"},[e._v("*** **** 1030")]),a("p",{staticClass:"text-caption q-my-none"},[e._v("Edison Ocampo")])])])],1)},s=[],i={methods:{selectThis:function(e){this.paymentType=e,this.$emit("clicked",e)}}},r=i,l=a("2877"),o=a("eebe"),c=a.n(o),u=a("1c1c"),d=a("66e5"),m=Object(l["a"])(r,n,s,!1,null,null,null);t["a"]=m.exports;c()(m,"components",{QList:u["a"],QItem:d["a"]})},b41f:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{appear:"","enter-active-class":"sm"===e.$mq?"animated slideInRight ":"animated fadeIn"}},[a("q-page",[a("q-list",{attrs:{bordered:""}},[a("q-expansion-item",{attrs:{group:"somegroup",icon:"account_circle",label:"Profile","default-opened":"","header-class":"bg-white text-grey-8","expand-icon-class":"text-grey"}},[a("q-card",{staticClass:"bg-white"},[a("q-card-section",[a("ProfileSet")],1)],1)],1),a("q-separator"),a("q-expansion-item",{attrs:{group:"somegroup",icon:"fas fa-map-marked-alt",label:"Address","header-class":"bg-white text-grey-8","expand-icon-class":"text-grey"}},[a("q-card",{staticClass:"bg-white"},[a("q-card-section",[a("AddressList"),a("q-btn",{staticClass:"full-width q-mb-lg",attrs:{color:"primary",label:"New Address"},on:{click:function(t){e.addressForm=!e.addressForm}}}),a("q-slide-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.addressForm,expression:"addressForm"}]},[a("AddressSet")],1)])],1)],1)],1),a("q-separator"),a("q-expansion-item",{attrs:{group:"somegroup",icon:"fas fa-money-check-alt",label:"Billing","header-class":"bg-white text-grey-8","expand-icon-class":"text-grey"}},[a("q-card",{staticClass:"bg-white"},[a("q-card-section",[a("BillingSet")],1)],1)],1),a("q-separator"),a("q-expansion-item",{attrs:{group:"somegroup",icon:"fas fa-cogs",label:"General","header-class":"bg-white text-grey-8","expand-icon-class":"text-grey"}},[a("q-card",{staticClass:"bg-white"},[a("q-card-section",[a("General")],1)],1)],1),a("q-separator")],1),a("div",{staticClass:"row wrap items-center q-pa-sm"})],1)],1)},s=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 q-px-sm"},[a("q-input",{attrs:{filled:"",label:"Username*","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userProfile.username,callback:function(t){e.$set(e.userProfile,"username",t)},expression:"userProfile.username"}})],1),a("div",{staticClass:"col-6 q-px-sm"},[a("q-input",{attrs:{filled:"",label:"Phone",mask:"(####) ### - ####",hint:"Ex: (09##) ### - ####"},model:{value:e.userProfile.phone,callback:function(t){e.$set(e.userProfile,"phone",t)},expression:"userProfile.phone"}})],1)]),a("q-input",{attrs:{filled:"",label:"Your name *",hint:"Name and surname","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userProfile.name,callback:function(t){e.$set(e.userProfile,"name",t)},expression:"userProfile.name"}}),a("q-input",{attrs:{filled:"",type:"email",hint:"Example: edison@gmail.com",label:"Email"},model:{value:e.userProfile.email,callback:function(t){e.$set(e.userProfile,"email",t)},expression:"userProfile.email"}}),a("div",{staticClass:"text-right"},[a("q-btn",{attrs:{label:"Save",type:"submit",color:"primary"}})],1)],1)},r=[],l=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("7f7f"),a("c47a")),o=a.n(l),c=a("2f62");function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){o()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var m={data:function(){return{}},computed:d({},Object(c["c"])(["userProfile"])),methods:{onSubmit:function(){!0!==this.accept?this.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"You need to accept the license and terms first"}):this.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"})},onReset:function(){this.name=null,this.age=null,this.accept=!1}}},p=m,f=a("2877"),b=a("eebe"),g=a.n(b),h=a("0378"),v=a("27f9"),y=a("9c40"),q=Object(f["a"])(p,i,r,!1,null,null,null),x=q.exports;g()(q,"components",{QForm:h["a"],QInput:v["a"],QBtn:y["a"]});var C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[a("q-input",{attrs:{filled:"",label:"Address name","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userAdd.name,callback:function(t){e.$set(e.userAdd,"name",t)},expression:"userAdd.name"}}),a("q-input",{attrs:{filled:"",label:"Detailed Address",hint:"House/Unit/Flr #, Bldg Name, Blk or Lot #","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userAdd.detailedAdd,callback:function(t){e.$set(e.userAdd,"detailedAdd",t)},expression:"userAdd.detailedAdd"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 q-px-sm"},[a("q-input",{attrs:{filled:"",label:"Brgy","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userAdd.brgy,callback:function(t){e.$set(e.userAdd,"brgy",t)},expression:"userAdd.brgy"}})],1),a("div",{staticClass:"col-6 q-px-sm"},[a("q-select",{attrs:{filled:"",options:e.userAddress.cityOption,label:"City/Municipality"},model:{value:e.userAdd.city,callback:function(t){e.$set(e.userAdd,"city",t)},expression:"userAdd.city"}})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-6 q-px-sm"},[a("q-input",{attrs:{filled:"",label:"Region",hint:"House/Unit/Flr #, Bldg Name, Blk or Lot #","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userAdd.region,callback:function(t){e.$set(e.userAdd,"region",t)},expression:"userAdd.region"}})],1),a("div",{staticClass:"col-6 q-px-sm"},[a("q-input",{attrs:{filled:"",label:"Zipcode","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.userAdd.zipcode,callback:function(t){e.$set(e.userAdd,"zipcode",t)},expression:"userAdd.zipcode"}})],1)]),a("q-toggle",{attrs:{color:"green",label:"Set as default address"},model:{value:e.userAdd.default,callback:function(t){e.$set(e.userAdd,"default",t)},expression:"userAdd.default"}}),a("div",[a("q-btn",{attrs:{label:"Save",type:"submit",color:"primary"}})],1)],1)},w=[],k=a("7e89");function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function A(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(Object(a),!0).forEach((function(t){o()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var P={data:function(){return{phone:null,email:null,userAddress:{name:null,region:"National Capital Region",province:"Metro Manila",city:null,cityOption:[],brgy:null,zipcode:null,detailedAdd:null,default:!1}}},created:function(){var e=this,t=k["cities"].filter((function(e){return"MM"===e.province}));t.map((function(t){e.userAddress.cityOption.push(t.name)}))},computed:A({},Object(c["c"])(["userAdd"])),methods:{onSubmit:function(){!0!==this.accept?this.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"You need to accept the license and terms first"}):this.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"})},onReset:function(){this.name=null,this.age=null,this.accept=!1}}},_=P,S=a("ddd8"),j=a("9564"),Q=Object(f["a"])(_,C,w,!1,null,null,null),N=Q.exports;g()(Q,"components",{QForm:h["a"],QInput:v["a"],QSelect:S["a"],QToggle:j["a"],QBtn:y["a"]});var E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-list",{staticClass:"col-xs-12 q-pa-sm"},[a("q-item",{staticClass:"row wrap shadow-1 bg-white q-pa-md",attrs:{exact:"",to:"/"}},[a("div",{staticClass:"col-xs-12 q-pa-sm"},[a("p",{staticClass:"text-subtitle1"},[e._v("\n        "+e._s(e.userAdd.name)+"\n        "),a("span",{staticClass:"text-green text-caption float-right q-mt-sm"},[e._v("DEFAULT")])]),a("p",{staticClass:"text-caption q-my-none"},[e._v(e._s(e.userAdd.detailedAdd))]),a("p",{staticClass:"text-caption q-my-none"},[e._v("\n        "+e._s(e.userAdd.region)+"~"+e._s(e.userAdd.province)+"- "+e._s(e.userAdd.city)+"-\n        "+e._s(e.userAdd.brgy)+"\n      ")]),a("p",{staticClass:"text-caption q-my-none"},[e._v(e._s(e.userProfile.phone))])])])],1)},$=[];function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function D(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(Object(a),!0).forEach((function(t){o()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var F={computed:D({},Object(c["c"])(["userAdd","userProfile"]))},I=F,z=a("1c1c"),M=a("66e5"),T=Object(f["a"])(I,E,$,!1,null,null,null),R=T.exports;g()(T,"components",{QList:z["a"],QItem:M["a"]});var L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-list",{staticClass:"rounded-borders"},[a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"billingGroup",icon:"fas fa-hand-holding-usd",label:"Cash on delivery",caption:"Edison Ocampo"}},[a("q-card",[a("q-card-section",[a("Cod")],1)],1)],1),a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"billingGroup",icon:"fab fa-cc-mastercard",label:"Credit/Debit Card",caption:"Unionbank"}},[a("q-card",[a("q-card-section",[a("CardList"),a("q-btn",{staticClass:"full-width q-mb-lg",attrs:{color:"primary",label:"Add New Card"},on:{click:function(t){e.cardForm=!e.cardForm}}}),a("q-slide-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.cardForm,expression:"cardForm"}]},[a("CardSet")],1)])],1)],1)],1),a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"billingGroup",icon:"fab fa-cc-amazon-pay",label:"Payment Gateway"}},[a("q-card",[a("q-card-section",[a("Payment",{on:{clicked:e.onClickChild}})],1)],1)],1)],1)},G=[],U=a("c7e4"),Y=a("520b"),H=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[a("q-input",{attrs:{filled:"",label:"Account Name",hint:"Full Name in the Bank Account","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.accName,callback:function(t){e.accName=t},expression:"accName"}}),a("q-input",{attrs:{filled:"",label:"Card",mask:"#### #### #### ####","fill-mask":"#",hint:"Enter the long number of your card"},model:{value:e.cardNumber,callback:function(t){e.cardNumber=t},expression:"cardNumber"}}),a("q-input",{attrs:{filled:"",label:"CVV",mask:"###/##","fill-mask":"",hint:"You can see it at the back of your card"},model:{value:e.cvv,callback:function(t){e.cvv=t},expression:"cvv"}}),a("q-select",{attrs:{filled:"",options:e.bankOptions,label:"Bank Name"},model:{value:e.bankName,callback:function(t){e.bankName=t},expression:"bankName"}}),a("div",[a("q-btn",{attrs:{label:"Save",type:"submit",color:"primary"}})],1)],1)},J=[],K={data:function(){return{accName:null,cardNumber:null,bankName:null,cvv:null,bankOptions:["BANCO DE OCAMPO","BPI","UNIONBANK","BDO","SECURITY","METROBANK","BPI","HSBC","CITIBANK","RCBC"]}},created:function(){},methods:{onSubmit:function(){!0!==this.accept?this.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"You need to accept the license and terms first"}):this.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"})},onReset:function(){this.name=null,this.age=null,this.accept=!1}}},V=K,Z=Object(f["a"])(V,H,J,!1,null,null,null),W=Z.exports;g()(Z,"components",{QForm:h["a"],QInput:v["a"],QSelect:S["a"],QBtn:y["a"]});var X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col-xs-12  q-pa-sm"},[e._m(0),e._m(1),a("q-btn",{staticClass:"full-width q-mb-lg",attrs:{color:"primary",label:"Add Proxy"},on:{click:function(t){e.proxyForm=!e.proxyForm}}}),a("q-slide-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.proxyForm,expression:"proxyForm"}]},[a("ProxySet")],1)])],1)},ee=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("p",{staticClass:"text-subtitle1"},[e._v("\n        Ship to:\n      ")])]),a("div",{staticClass:"col-8"},[a("p",{staticClass:"float-right q-mb-none"},[e._v("\n        Home "),a("span",{staticClass:"text-green text-caption q-mt-sm"},[e._v("DEFAULT")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("p",{staticClass:"q-mb-none text-subtitle1"},[e._v("Proxy:")]),a("p",{staticStyle:{"font-size":"12px"}},[e._v("\n        Person(s) who is allowed to received the item.\n      ")])]),a("div",{staticClass:"col-8"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 q-mb-none"},[a("p",{staticClass:" float-right q-mt-sm q-mb-none"},[e._v("\n            Juan DelaCruz\n          ")])]),a("div",{staticClass:"col-12 q-mb-none"},[a("p",{staticClass:" float-right q-mt-sm q-mb-none"},[e._v("\n            Dodong DelaCruz\n          ")])]),a("div",{staticClass:"col-12 q-mb-none"},[a("p",{staticClass:" float-right q-mt-sm q-mb-none"},[e._v("\n            Inday DelaCruz\n          ")])])])])])}],te=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[a("q-input",{attrs:{filled:"",label:"Name",hint:"Name and surname","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("q-input",{attrs:{filled:"",label:"Birthday","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.dob,callback:function(t){e.dob=t},expression:"dob"}}),a("q-input",{attrs:{filled:"",label:"Relationship","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]},model:{value:e.relationship,callback:function(t){e.relationship=t},expression:"relationship"}}),a("div",[a("q-btn",{attrs:{label:"Save",type:"submit",color:"primary"}})],1)],1)},ae=[],ne={data:function(){return{name:null,dob:null,relationship:null}},methods:{onSubmit:function(){!0!==this.accept?this.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"You need to accept the license and terms first"}):this.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Submitted"})},onReset:function(){this.name=null,this.age=null,this.accept=!1}}},se=ne,ie=Object(f["a"])(se,te,ae,!1,null,null,null),re=ie.exports;g()(ie,"components",{QForm:h["a"],QInput:v["a"],QBtn:y["a"]});var le={data:function(){return{proxyForm:!1}},components:{ProxySet:re}},oe=le,ce=a("e9c1"),ue=Object(f["a"])(oe,X,ee,!1,null,null,null),de=ue.exports;g()(ue,"components",{QBtn:y["a"],QSlideTransition:ce["a"]});var me={data:function(){return{cardForm:!1,tab:"mails"}},methods:{onClickChild:function(e){console.log(e)}},components:{Payment:U["a"],CardList:Y["a"],CardSet:W,Cod:de}},pe=me,fe=a("3b73"),be=a("f09f"),ge=a("a370"),he=Object(f["a"])(pe,L,G,!1,null,null,null),ve=he.exports;g()(he,"components",{QList:z["a"],QExpansionItem:fe["a"],QCard:be["a"],QCardSection:ge["a"],QBtn:y["a"],QSlideTransition:ce["a"]});var ye=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-list",{staticClass:"rounded-borders"},[a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"generalGroup",icon:"fas fa-bell",label:"Notification"}},[a("q-card",[a("q-card-section",[a("q-toggle",{attrs:{color:"green",icon:"apps",label:"Daily In App Notifications",size:"xl"},model:{value:e.DailyInApp,callback:function(t){e.DailyInApp=t},expression:"DailyInApp"}}),a("q-toggle",{attrs:{size:"xl",color:"green",icon:"mail",label:"Email Notifications"},model:{value:e.emailMarketing,callback:function(t){e.emailMarketing=t},expression:"emailMarketing"}}),a("q-toggle",{attrs:{size:"xl",color:"green",icon:"fas fa-sms",label:"SMS Notifications"},model:{value:e.smsMarketing,callback:function(t){e.smsMarketing=t},expression:"smsMarketing"}})],1)],1)],1),a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"generalGroup",icon:"fab fa-rocketchat",label:"Chat Settings"}},[a("q-card",[a("q-card-section",[a("q-toggle",{attrs:{size:"xl",color:"green",icon:"chat_bubble",label:"Chat Messaging System"},model:{value:e.chatActivated,callback:function(t){e.chatActivated=t},expression:"chatActivated"}}),a("q-toggle",{attrs:{size:"xl",color:"green",icon:"money",label:"Allow Chat Marketing"},model:{value:e.chatMarketing,callback:function(t){e.chatMarketing=t},expression:"chatMarketing"}})],1)],1)],1),a("q-expansion-item",{attrs:{"header-class":"text-grey-8",group:"generalGroup",icon:"fas fa-cog",label:"App Settings"}},[a("q-card",[a("q-card-section",[a("q-select",{attrs:{filled:"",options:["English","Korean 한국어","Japanese 中文","Arabin عربى","Chinese 日本語","Italian","Filipino Tagalog","Filipino Bisaya"],label:"Language"},model:{value:e.language,callback:function(t){e.language=t},expression:"language"}}),a("div",{staticClass:"text-center"},[a("q-btn",{staticClass:"q-mt-lg q-mb-md"},[e._v("Deactive Account")])],1),a("div",{staticClass:"text-center"},[a("q-btn",{staticClass:"q-my-md"},[e._v("Request Account Deletion")])],1)],1)],1)],1)],1)},qe=[],xe={data:function(){return{DailyInApp:!0,cardForm:!1,emailMarketing:!0,smsMarketing:!1,chatActivated:!0,chatMarketing:!1,language:"English"}},methods:{onClickChild:function(e){console.log(e)}},components:{}},Ce=xe,we=Object(f["a"])(Ce,ye,qe,!1,null,null,null),ke=we.exports;g()(we,"components",{QList:z["a"],QExpansionItem:fe["a"],QCard:be["a"],QCardSection:ge["a"],QToggle:j["a"],QSelect:S["a"],QBtn:y["a"]});var Oe={data:function(){return{tab:"mails",addressForm:!1}},components:{ProfileSet:x,AddressSet:N,AddressList:R,BillingSet:ve,General:ke}},Ae=Oe,Pe=a("9989"),_e=a("eb85"),Se=Object(f["a"])(Ae,n,s,!1,null,null,null);t["default"]=Se.exports;g()(Se,"components",{QPage:Pe["a"],QList:z["a"],QExpansionItem:fe["a"],QCard:be["a"],QCardSection:ge["a"],QSeparator:_e["a"],QBtn:y["a"],QSlideTransition:ce["a"]})},c7e4:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-list",[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.selectThis("Gcash")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{square:""}},[a("img",{attrs:{src:"https://dronthego.net/wp-content/uploads/2019/05/Gcash.png"}})])],1),a("q-item-section",[e._v("Gcash")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.selectThis("PayMaya")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{square:""}},[a("img",{attrs:{src:"https://pbs.twimg.com/profile_images/1136827706727780354/86je_Bl7_400x400.png"}})])],1),a("q-item-section",[e._v("PayMaya")])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:function(t){return e.selectThis("Bayad Center")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-avatar",{attrs:{square:""}},[a("img",{attrs:{src:"https://www.bworldonline.com/wp-content/uploads/2017/05/bayad-center-logo-e1569327665179.jpg"}})])],1),a("q-item-section",[e._v("Bayad Center")])],1)],1)},s=[],i={data:function(){return{paymentType:null}},methods:{selectThis:function(e){this.paymentType=e,this.$emit("clicked",e)}}},r=i,l=a("2877"),o=a("eebe"),c=a.n(o),u=a("1c1c"),d=a("66e5"),m=a("4074"),p=a("cb32"),f=a("714f"),b=Object(l["a"])(r,n,s,!1,null,null,null);t["a"]=b.exports;c()(b,"components",{QList:u["a"],QItem:d["a"],QItemSection:m["a"],QAvatar:p["a"]}),c()(b,"directives",{Ripple:f["a"]})}}]);