var n=Object.defineProperty,a=Object.defineProperties,s=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,o=(a,s,t)=>s in a?n(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;import{g as c,s as l,o as u,c as i,b as r,t as k,u as d,n as g,F as m,p as h,a as v,d as f}from"./app.299cedce.js";import"./index.59ec46b5.js";import{_ as b}from"./ItemName.659e824e.js";import{_ as y}from"./ItemList.a012caf4.js";import{_ as q}from"./ItemDetails.0c997b60.js";import{d as D}from"./utils.9c5057b1.js";import"./LoadingIndicator.55435477.js";import"./shared.99084317.js";import"./Arrow.d28dcfac.js";import"./ConceptTree.7321feed.js";import"./ItemSuggest.e072929a.js";import"./AutoLink.6e12dad1.js";import"./style.4b5628f1.js";const I=v('',22),z=v('',4),w=f(" Single item: "),_=f("ItemList: "),x=r("p",null,"ItemDetails (is a dropzone by default):",-1),j=v('',1),S='{"title":"dragAndDrop","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"draggedItem","slug":"draggeditem"},{"level":3,"title":"dragstart(item), dragend()","slug":"dragstart-item-dragend"},{"level":3,"title":"addDropzone(element, callback)","slug":"adddropzone-element-callback"},{"level":2,"title":"Defining a Draggable Item","slug":"defining-a-draggable-item"},{"level":2,"title":"Defining a Dropzone","slug":"defining-a-dropzone"},{"level":3,"title":"addDropzone Parameters","slug":"adddropzone-parameters"},{"level":3,"title":"addDropzone Returned Object Properties","slug":"adddropzone-returned-object-properties"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Basic Example","slug":"basic-example"},{"level":3,"title":"Example with ItemName/ItemList/ItemDetails","slug":"example-with-itemname-itemlist-itemdetails"}],"relativePath":"utilities/dragAndDrop.md","lastUpdated":1627991087627}',T={};const O=Object.assign(T,{setup:function(n){const{draggedItem:v,dragstart:f,dragend:S,addDropzone:T}=D,{dragover:O,dragenter:A,dragleave:P,drop:C,isDraggingOver:E}=T(null,(n=>{alert(`Dropped item with URI ${n.uri}`)}));c((()=>{T(document.getElementById("dropzone"),(n=>{alert(`Dropped item with URI ${n.uri}`)})),T(document.getElementById("dropzone2"),(n=>{alert(`Dropped item with URI ${n.uri}`)}))}));const L=[{notation:["1"]},{notation:["2"]},{notation:["3"]}].map((n=>{return c=((n,a)=>{for(var s in a||(a={}))e.call(a,s)&&o(n,s,a[s]);if(t)for(var s of t(a))p.call(a,s)&&o(n,s,a[s]);return n})({},n),l={uri:`item:${n.notation[0]}`,prefLabel:{en:`Item ${n.notation[0]}`}},a(c,s(l));var c,l})),$=l(L[2]);return(n,a)=>(u(),i("div",null,[I,r("p",null,"Currently dragging: "+k(d(v)&&d(v).uri),1),g(" Defining draggable items "),(u(!0),i(m,null,h(d(L),(n=>(u(),i("div",{key:n.uri,draggable:"true",onDragstart:a=>d(f)(n),onDragend:a[1]||(a[1]=(...n)=>d(S)&&d(S)(...n))},k(n.uri),41,["onDragstart"])))),128)),g(" Dropzone with manually set events and conditional CSS classes "),r("div",{class:{drag:d(v),noDrag:!d(v),draggingOver:d(E)},onDragover:a[2]||(a[2]=(...n)=>d(O)&&d(O)(...n)),onDragenter:a[3]||(a[3]=(...n)=>d(A)&&d(A)(...n)),onDragleave:a[4]||(a[4]=(...n)=>d(P)&&d(P)(...n)),onDrop:a[5]||(a[5]=(...n)=>d(C)&&d(C)(...n))},k(d(v)?"Try to drop the item here":"Start dragging an item"),35),g(" Dropzone that we can get by ID; no conditional CSS classes "),z,r("p",null,[w,r(b,{item:d(L)[0]},null,8,["item"])]),r("p",null,[_,r(y,{items:d(L)},null,8,["items"])]),x,r(q,{item:$.value,onSelect:a[6]||(a[6]=n=>$.value=n.item)},null,8,["item"]),j]))}});export{S as __pageData,O as default};
