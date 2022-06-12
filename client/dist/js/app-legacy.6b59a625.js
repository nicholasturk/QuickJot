(function(){"use strict";var t={817:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var o=n(8935),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],r=n(1001),a={},c=(0,r.Z)(a,i,s,!1,null,null,null),l=c.exports,u=n(2814),d=n(2809),h=n(6379),p=n(5535),f=n(7364),m=n(81),v=n(6978),b=n(9009),g=function(){var t=this,e=this,n=e.$createElement,o=e._self._c||n;return o("div",{attrs:{id:"home-page"}},[o("alert"),o("key-press",{attrs:{"key-event":"keyup","key-code":83},on:{success:function(t){return e.activateSearch()}}}),o("key-press",{attrs:{"key-event":"keyup","key-code":27},on:{success:function(t){return e.deactivateSearch()}}}),o("key-press",{attrs:{"key-event":"keyup","key-code":65},on:{success:function(t){return e.addNote()}}}),o("div",{staticClass:"content"},[o("div",{staticClass:"title"},[e._v("quickjot")]),o("div",{staticClass:"controls"},[o("div",{staticClass:"input-section"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.inputBody,expression:"inputBody"}],staticClass:"note-input",style:{resize:this.isSearching?"none":""},attrs:{type:"text",id:"note-input",placeholder:e.inputText},domProps:{value:e.inputBody},on:{keydown:function(t){return 13!=t.keyCode||t.shiftKey?"":t.preventDefault()},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitNote.apply(null,arguments)},input:function(t){t.target.composing||(e.inputBody=t.target.value)}}}),e._v(" "),o("div",{staticClass:"search-button"},[o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Search",expression:"'Search'"}],staticClass:"topButton",attrs:{id:"search-button",size:"2x",icon:"magnifying-glass",color:"#b1b4ba"},on:{click:function(t){return e.search()}}})],1)]),o("div",{staticClass:"topButtons"},[o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Help",expression:"'Help'"}],staticClass:"topButton grow-on-hover",attrs:{size:"2x",icon:"clipboard-question",id:"cbq",color:"#b1b4ba"},on:{click:function(t){return e.displayInfo()}}}),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Copy shareable collection",expression:"'Copy shareable collection'"}],staticClass:"topButton grow-on-hover",attrs:{size:"2x",icon:"file-export",id:"export-button",color:"#b1b4ba"},on:{click:function(t){return e.exportCollection()}}}),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Delete collection",expression:"'Delete collection'"}],staticClass:"topButton grow-on-hover",class:{"fa-shake":e.shouldShake},attrs:{size:"2x",icon:"bomb",color:"#b1b4ba"},on:{click:function(t){return e.clear()}}})],1)]),e.itemsFiltered.length>0?o("div",{staticClass:"filter-section"},[o("div",{staticClass:"filter-message"},[e._v(" "+e._s((this.reversed,""))+" ")]),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Hide collection",expression:"`Hide collection`"}],staticClass:"topButton top-collapse grow-on-hover",attrs:{icon:"angles-up",color:"#b1b4ba"},on:{click:function(){return e.collapseAll(!1)}}}),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Show collection",expression:"`Show collection`"}],staticClass:"topButton top-collapse grow-on-hover",attrs:{icon:"angles-down",color:"#b1b4ba"},on:{click:function(){return e.collapseAll(!0)}}}),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Change layout",expression:"`Change layout`"}],staticClass:"topButton grow-on-hover",attrs:{size:"2x",id:"layout-button",icon:"grip",color:"#b1b4ba"},on:{click:function(){return e.addToCols()}}}),o("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Sort",expression:"`Sort`"}],staticClass:"topButton grow-on-hover",attrs:{size:"2x",id:"sort-button",icon:"sort",color:"#b1b4ba"},on:{click:function(){return t.reversed=!t.reversed}}})],1):e._e(),o("div",{staticClass:"ui grid"},[o("div",{class:e.colsNumToStr+" column row"},e._l(e.itemsFiltered,(function(t,n){return o("note-card",{key:(t.id,n),staticClass:"column",attrs:{content:t,isLast:n==e.itemsFiltered.length-1,isSecondLast:n==e.itemsFiltered.length-2,isThirdLast:n==e.itemsFiltered.length-3,numCols:e.numCols,lastAdded:e.lastAdded===t[0]},on:{deleteItem:e.deleteItem,addItem:e.addItem}})})),1)])])],1)},y=[],w=n(6198),C=(n(8975),n(1539),n(4747),n(4916),n(3123),n(7327),n(4723),n(2707),n(561),n(1249),n(7042),n(9714),n(9600),n(2222),n(4765),n(9720),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"note-card-root"},[n("div",{staticClass:"note-card",class:{"not-last-card":!t.isLastish,"nc-bl":!t.isLastish&&1===t.numCols,"note-card-lg":!0},attrs:{id:t.content[0]}},[t.isLastish||1!==t.numCols?t._e():n("div",{domProps:{innerHTML:t._s(t.dateSinceCss)}}),n("div",{staticClass:"card-container item-background"},[n("div",{staticClass:"card-header",class:{"border-bottom":t.showContent}},[n("div",{staticClass:"card-button"},[n("font-awesome-icon",{staticClass:"show-arrow collapse",attrs:{icon:t.showContent?"caret-down":"caret-right",size:"xl",color:"#b1b4ba"},on:{click:t.collapse}})],1),n("div",{staticClass:"card-info"},[n("span",{staticClass:"card-header-text"},[t._v(" "+t._s(t.timeSince(t.content[0])+(t.showContent?"":","))+" ")]),t.showContent?t._e():n("span",{staticClass:"preview card-content-text"},[t._v(" "+t._s(t.preview)+" ")])]),n("div",{staticClass:"card-buttons"},[n("div",{on:{click:function(e){return t.copyToClipboard()}}},[n("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Copy to clipboard",expression:"'Copy to clipboard'"}],staticClass:"card-button",attrs:{icon:"clipboard",size:"lg",color:"#b1b4ba"}})],1),n("div",{on:{click:function(e){return t.generateLink()}}},[n("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Copy shareable link",expression:"'Copy shareable link'"}],staticClass:"card-button",attrs:{icon:"link",size:"lg",color:"#b1b4ba"}})],1),n("div",{on:{click:function(e){return t.clone()}}},[n("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Clone",expression:"'Clone'"}],staticClass:"card-button",attrs:{icon:"clone",size:"lg",color:"#b1b4ba"}})],1),n("div",{on:{click:function(e){return t.$emit("deleteItem",t.content[0])}}},[n("font-awesome-icon",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Delete note",expression:"'Delete note'"}],staticClass:"card-button",attrs:{icon:"trash-can",size:"lg",color:"#b1b4ba"}})],1)])]),t.showContent?n("div",{staticClass:"card-content"},[n("span",{staticClass:"starter"},[t._v(">")]),n("div",{staticClass:"card-content-text"},[t._v(t._s(t.content[1]))])]):t._e()])])])}),k=[],x={props:["content","isLast","isSecondLast","isThirdLast","numCols"],data:function(){return{showContent:!0}},created:function(){this.$parent.$on("hideOrShowAll",this.hideOrShow)},methods:{hideOrShow:function(t){this.showContent=t},collapse:function(){this.showContent=!this.showContent},clone:function(){this.$emit("addItem",this.content[1]),this.notify("Note cloned.")},timeSince:function(t){var e=Math.floor((new Date-t)/1e3);if(0===e)return"just now";var n=e/31536e3,o="";n>=1?o="year":(n=e/2592e3,n>=1?o="month":(n=e/86400,n>=1?o="day":(n=e/3600,n>=1?o="hour":(n=e/60,o=n>=1?"minute":"second"))));var i="second"!==o?Math.floor(n):e;return"".concat(i," ").concat(o).concat(i>1?"s":""," ago")},generateLink:function(){var t=this;return(0,w.Z)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n="linknote=".concat(encodeURIComponent(t.content[1])),o="".concat(location.protocol,"//").concat(location.host).concat(location.pathname,"?").concat(n),!(o.length>2048)){e.next=6;break}t.notify("Error: Note too large to share. Must be under 2000 characters."),e.next=9;break;case 6:return e.next=8,navigator.clipboard.writeText(o);case 8:t.notify("Shareable collection link copied to clipboard.");case 9:case"end":return e.stop()}}),e)})))()},copyToClipboard:function(){var t=this;return(0,w.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText(t.content[1]);case 2:t.notify("Note content copied to clipboard.");case 3:case"end":return e.stop()}}),e)})))()},notify:function(t){this.$notify({message:t,type:"",top:!0,bottom:!1,left:!1,right:!1,showClose:!1,closeDelay:3e3})}},computed:{isLastish:function(){var t=this.isLast;return this.numCols>=2&&(t=t||this.isSecondLast),this.numCols>=3&&(t=t||this.isThirdLast),t},preview:function(){return" "+this.content[1].substring(0,20)+"..."},dateSinceCss:function(){return'<style>\n      .note-card-root::before{\n        color: #d9dce2;\n        display: inline-block;\n        font-size: 17px;\n        float: left;\n        margin-left: 0.5px;\n        margin-top: -10px;\n        letter-spacing: 4px;\n        height: 10px;\n        content: "-------------";\n      }</style>'}}},S=x,I=(0,r.Z)(S,C,k,!1,null,null,null),B=I.exports,_={name:"HomePage",components:{NoteCard:B},data:function(){return{lastAdded:-1,inputBody:"",numCols:1,items:[],shouldShake:!1,isSearching:!1,linknote:!1,linknotes:!1,reversed:!1}},mounted:function(){var t=this;this.getItems(),"linknote"in this.$route.query?(this.linknote=!0,this.addItem(this.$route.query.linknote),this.$router.push(this.$route.path)):"linknotes"in this.$route.query&&(this.$route.query.linknotes.split(this.$route.query.joiner).forEach((function(e){return t.addItem(e)})),this.$router.push(this.$route.path))},computed:{colsNumToStr:function(){var t={1:"one",2:"two",3:"three"};return t[this.numCols]},searchBody:function(){return this.isSearching?this.inputBody:""},itemsFiltered:function(){var t=this,e=this.items.filter((function(e){return e[1].match(t.searchBody)}));return this.reversed?e.sort((function(t,e){return t[0]-e[0]})):e.sort((function(t,e){return e[0]-t[0]})),e},inputText:function(){return this.isSearching?"Search for a note...":"Add a note"}},methods:{collapseAll:function(t){this.$emit("hideOrShowAll",t)},addToCols:function(){3===this.numCols?this.numCols=1:this.numCols+=1},displayInfo:function(){this.$alert.present("Info","This app uses local storage. Clearing cache will remove all notes.\n\n\nHotkeys:\n\nA: add note (enter to submit)\n\nS: search for note\n\nesc: unfocus textarea/stop searching or exit this modal\n\nshift + enter: for new line in textarea")},addNote:function(){!document.getElementById("note-input")===document.activeElement||this.isSearching||document.getElementById("note-input").focus()},deleteItem:function(t){this.items.splice(this.items.map((function(t){return t[0]})).indexOf(t),1),localStorage.removeItem(t)},addItem:function(t){var e=Date.now(),n=t;null!==localStorage.getItem(e)&&(e+=1),this.reversed?("\n"===t[-1]&&(n=t.slice(0,-1)),this.items.push([e,n,!0])):this.items.unshift([e,n,!0]),localStorage.setItem(e,n),this.lastAdded=e},exportCollection:function(){var t=this;return(0,w.Z)(regeneratorRuntime.mark((function e(){var n,o,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n="_"+Math.random().toString(36).substr(2,5),o=t.items.map((function(t){return encodeURIComponent(t[1])})).join(n),i="linknotes=".concat(o,"&joiner=").concat(n),s="".concat(location.protocol,"//").concat(location.host).concat(location.pathname,"?").concat(i),!(s.length>2048)){e.next=8;break}t.notify("Error: Collection too large. Must be under 2000 characters."),e.next=11;break;case 8:return e.next=10,navigator.clipboard.writeText(s);case 10:0===o.length?t.notify("Copied, but you might want to add some notes first..."):t.notify("Shareable collection link copied to clipboard.");case 11:case"end":return e.stop()}}),e)})))()},notify:function(t){this.$notify({message:t,type:"",top:!0,bottom:!1,left:!1,right:!1,showClose:!1,closeDelay:3e3})},submitNote:function(t){t.shiftKey||this.isSearching||(this.addItem(this.inputBody),this.inputBody="")},activateSearch:function(t){this.isSearching||document.getElementById("note-input")===document.activeElement||this.search()},deactivateSearch:function(t){this.isSearching&&this.search(),document.getElementById("note-input").blur()},search:function(){document.getElementById("note-input").focus();document.getElementById("search-button");this.isSearching=!this.isSearching},getItems:function(){this.items=Object.entries(localStorage).filter((function(t){return"randid"!=t[0]}))},clear:function(){var t=this;this.shouldShake=!0,this.items.forEach((function(t){return localStorage.removeItem(t[0])})),this.getItems(),setTimeout((function(){t.shouldShake=!1}),1e3)}}},N=_,T=(0,r.Z)(N,g,y,!1,null,null,null),$=T.exports,O=[{path:"/",component:$}];m.vI.add(v.O97),m.vI.add(v.UAH),m.vI.add(v.O97),m.vI.add(v.BC0),m.vI.add(v.eW2),m.vI.add(v.I4f),m.vI.add(v.irx),m.vI.add(v.ca9),m.vI.add(v.Y$T),m.vI.add(v.Yme),m.vI.add(v.CmM),m.vI.add(v.WM4),m.vI.add(v.Yjj),m.vI.add(v.Vui),m.vI.add(v.nNP),m.vI.add(v.QR4),o.Z.use(d.Z),o.Z.use(f.ZP),o.Z.use(u.Z),o.Z.use(p.Z,{developerMode:!0,presentBlockTime:100,dismissBlockTime:100}),o.Z.component("key-press",h.Z),o.Z.component("font-awesome-icon",b.GN),o.Z.config.productionTip=!1;var Z=new d.Z({routes:O,mode:"history"});new o.Z({router:Z,render:function(t){return t(l)}}).$mount("#app")}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var s=e[o]={id:o,loaded:!1,exports:{}};return t[o](s,s.exports,n),s.loaded=!0,s.exports}n.m=t,function(){var t=[];n.O=function(e,o,i,s){if(!o){var r=1/0;for(u=0;u<t.length;u++){o=t[u][0],i=t[u][1],s=t[u][2];for(var a=!0,c=0;c<o.length;c++)(!1&s||r>=s)&&Object.keys(n.O).every((function(t){return n.O[t](o[c])}))?o.splice(c--,1):(a=!1,s<r&&(r=s));if(a){t.splice(u--,1);var l=i();void 0!==l&&(e=l)}}return e}s=s||0;for(var u=t.length;u>0&&t[u-1][2]>s;u--)t[u]=t[u-1];t[u]=[o,i,s]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,s,r=o[0],a=o[1],c=o[2],l=0;if(r.some((function(e){return 0!==t[e]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(c)var u=c(n)}for(e&&e(o);l<r.length;l++)s=r[l],n.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return n.O(u)},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(817)}));o=n.O(o)})();
//# sourceMappingURL=app-legacy.6b59a625.js.map