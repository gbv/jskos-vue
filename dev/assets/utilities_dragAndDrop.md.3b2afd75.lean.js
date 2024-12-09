import"./chunks/index.f76433c6.js";import{I}from"./chunks/ItemName.7852b992.js";import{I as z}from"./chunks/ItemList.37c02559.js";import{I as _}from"./chunks/ItemDetails.1ea46015.js";import{h as x,s as w,o as l,c as u,b as e,t as i,x as n,F as S,l as T,n as A,d as q,a as r,e as k}from"./app.58ffbb48.js";import{d as j}from"./chunks/utils.18cb2ff0.js";import"./chunks/LoadingIndicator.35e914a0.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/Arrow.42725cdf.js";import"./chunks/AutoLink.8ee23c2a.js";import"./chunks/ConceptTree.e6385bce.js";import"./chunks/ItemSuggest.fc45560b.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/style.ada7e4fb.js";const O=k("",22),E=["onDragstart"],$=k("",4),N=e("p",null,"ItemDetails (is a dropzone by default):",-1),C=k("",1),Z='{"title":"dragAndDrop","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"draggedItem","slug":"draggeditem"},{"level":3,"title":"dragstart(item), dragend()","slug":"dragstart-item-dragend"},{"level":3,"title":"addDropzone(element, callback)","slug":"adddropzone-element-callback"},{"level":2,"title":"Defining a Draggable Item","slug":"defining-a-draggable-item"},{"level":2,"title":"Defining a Dropzone","slug":"defining-a-dropzone"},{"level":3,"title":"addDropzone Parameters","slug":"adddropzone-parameters"},{"level":3,"title":"addDropzone Returned Object Properties","slug":"adddropzone-returned-object-properties"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Basic Example","slug":"basic-example"},{"level":3,"title":"Example with ItemName/ItemList/ItemDetails","slug":"example-with-itemname-itemlist-itemdetails"}],"relativePath":"utilities/dragAndDrop.md"}',L={},nn=Object.assign(L,{__name:"dragAndDrop",setup(R){const{draggedItem:p,dragstart:b,dragend:d,addDropzone:c}=j,{dragover:g,dragenter:m,dragleave:h,drop:v,isDraggingOver:D}=c(null,t=>{alert(`Dropped item with URI ${t.uri}`)});x(()=>{c(document.getElementById("dropzone"),t=>{alert(`Dropped item with URI ${t.uri}`)}),c(document.getElementById("dropzone2"),t=>{alert(`Dropped item with URI ${t.uri}`)})});const o=[{notation:["1"]},{notation:["2"]},{notation:["3"]}].map(t=>({...t,uri:`item:${t.notation[0]}`,prefLabel:{en:`Item ${t.notation[0]}`}})),y=w(o[2]);return(t,s)=>(l(),u("div",null,[O,e("p",null,"Currently dragging: "+i(n(p)&&n(p).uri),1),(l(!0),u(S,null,T(n(o),a=>(l(),u("div",{key:a.uri,draggable:"true",onDragstart:f=>n(b)(a),onDragend:s[0]||(s[0]=(...f)=>n(d)&&n(d)(...f))},i(a.uri),41,E))),128)),e("div",{class:A({drag:n(p),noDrag:!n(p),draggingOver:n(D)}),onDragover:s[1]||(s[1]=(...a)=>n(g)&&n(g)(...a)),onDragenter:s[2]||(s[2]=(...a)=>n(m)&&n(m)(...a)),onDragleave:s[3]||(s[3]=(...a)=>n(h)&&n(h)(...a)),onDrop:s[4]||(s[4]=(...a)=>n(v)&&n(v)(...a))},i(n(p)?"Try to drop the item here":"Start dragging an item"),35),$,e("p",null,[q(" Single item: "),r(I,{item:n(o)[0]},null,8,["item"])]),e("p",null,[q("ItemList: "),r(z,{items:n(o)},null,8,["items"])]),N,r(_,{item:y.value,onSelect:s[5]||(s[5]=a=>y.value=a.item)},null,8,["item"]),C]))}});export{Z as __pageData,nn as default};