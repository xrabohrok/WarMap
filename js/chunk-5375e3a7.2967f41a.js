(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5375e3a7"],{"36f5":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"about"},[r("h1",[e._v("Character auditor")]),r("v-multiselect-listbox",{staticClass:"boxClass",attrs:{options:e.allFighters,"reduce-display-property":function(e){return e.name},"reduce-value-property":function(e){return e.id}},on:{change:e.getBackground},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),r("div",{staticClass:"button",on:{click:e.clear}},[e._v("Clear")]),r("div",{staticClass:"button",on:{click:e.save}},[e._v("Merge Chars")]),r("div",{staticClass:"editorText"},[e._v(e._s(e.selected))]),r("div",{staticClass:"editorText"},[e._v(e._s(e.output))]),r("div",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.curBackground,expression:"curBackground"}],staticClass:"backgrounds",domProps:{value:e.curBackground},on:{input:function(t){t.target.composing||(e.curBackground=t.target.value)}}})]),r("ProfilePicEditor",{staticClass:"profPic",attrs:{imgUrl:"/fighterimages/397.png",isEditable:!0}})],1)},c=[],a=r("1da1"),s=(r("96cf"),r("ac1f"),r("5319"),r("b0c0"),r("4e82"),r("d81d"),r("b64b"),r("fb6a"),r("d4b7")),o=r.n(s),i=(r("f31d"),r("25bc")),u=r("bc3a").default,l=function(e,t){var r=/the /i,n=e.name.toUpperCase().replace(r,""),c=t.name.toUpperCase().replace(r,"");return n<c?-1:n>c?1:0},d={components:{vMultiselectListbox:o.a,ProfilePicEditor:i["a"]},data:function(){return{selected:[],curFighters:[],curBackground:"",output:""}},computed:{allFighters:function(){var e=this;return Object.keys(this.curFighters).map((function(t){return e.curFighters[t]})).sort(l)}},methods:{clear:function(){console.log("cleared!"),console.log(this.selected),this.selected=[]},save:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:u.post("/server/mergeFighters",{target:e.selected[0],doomed:e.selected.slice(1)}).then((function(){u.get("/server/allFighters").then((function(t){e.curFighters=t.data,e.selected=[]})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}));case 1:case"end":return t.stop()}}),t)})))()},getBackground:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(void 0!==e.selected[0]){t.next=3;break}return e.curBackground="",t.abrupt("return");case 3:u.get("/server/backstory/".concat(e.selected[0])).then((function(t){return e.curBackground=t.data})).catch((function(t){if(404===t.response.status)return console.log("no bg for "+e.selected[0]),void(e.curBackground="");console.log(t)}));case 4:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;u.get("/server/allFighters").then((function(t){return e.curFighters=t.data})).catch((function(e){return console.log(e)}))},name:"CharacterEditor"},g=d,f=(r("41a3"),r("2877")),h=Object(f["a"])(g,n,c,!1,null,"f0a99430",null);t["default"]=h.exports},"41a3":function(e,t,r){"use strict";r("6188")},6188:function(e,t,r){}}]);
//# sourceMappingURL=chunk-5375e3a7.2967f41a.js.map