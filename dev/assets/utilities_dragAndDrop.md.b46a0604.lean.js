var n=Object.defineProperty,a=Object.defineProperties,s=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,o=(a,s,t)=>s in a?n(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;import{h as c,y as l,o as u,c as i,b as r,t as k,u as d,p as g,F as m,q as h,a as v,d as f}from"./app.b3c3cf0c.js";import{_ as b}from"./ItemName.79091110.js";import{_ as y}from"./ItemList.ca3554ac.js";import{_ as q}from"./ItemDetails.d09054b0.js";import{_ as D}from"./LoadingIndicator.385deb92.js";import{_ as I}from"./Arrow.6abda008.js";import{_ as z}from"./ConceptTree.8d78c80c.js";import{_ as w}from"./ItemSuggest.e25939e4.js";import"./shared.d928cca0.js";import{d as _}from"./utils.90967e43.js";import"./AutoLink.3da61a23.js";var x=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ItemName:b,ItemList:y,ItemDetails:q,LoadingIndicator:D,Arrow:I,ConceptTree:z,ItemSuggest:w});for(let $ of Object.values(x))$.install||($.install=n=>{n.component($.name,$)});const j=v('',22),S=v('',4),T=f(" Single item: "),O=f("ItemList: "),A=r("p",null,"ItemDetails (is a dropzone by default):",-1),P=v('',1),C='{"title":"dragAndDrop","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"draggedItem","slug":"draggeditem"},{"level":3,"title":"dragstart(item), dragend()","slug":"dragstart-item-dragend"},{"level":3,"title":"addDropzone(element, callback)","slug":"adddropzone-element-callback"},{"level":2,"title":"Defining a Draggable Item","slug":"defining-a-draggable-item"},{"level":2,"title":"Defining a Dropzone","slug":"defining-a-dropzone"},{"level":3,"title":"addDropzone Parameters","slug":"adddropzone-parameters"},{"level":3,"title":"addDropzone Returned Object Properties","slug":"adddropzone-returned-object-properties"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Basic Example","slug":"basic-example"},{"level":3,"title":"Example with ItemName/ItemList/ItemDetails","slug":"example-with-itemname-itemlist-itemdetails"}],"relativePath":"utilities/dragAndDrop.md","lastUpdated":1626089783109}',L={};const E=Object.assign(L,{expose:[],setup:function(n){const{draggedItem:v,dragstart:f,dragend:D,addDropzone:I}=_,{dragover:z,dragenter:w,dragleave:x,drop:C,isDraggingOver:L}=I(null,(n=>{alert(`Dropped item with URI ${n.uri}`)}));c((()=>{I(document.getElementById("dropzone"),(n=>{alert(`Dropped item with URI ${n.uri}`)})),I(document.getElementById("dropzone2"),(n=>{alert(`Dropped item with URI ${n.uri}`)}))}));const E=[{notation:["1"]},{notation:["2"]},{notation:["3"]}].map((n=>{return c=((n,a)=>{for(var s in a||(a={}))e.call(a,s)&&o(n,s,a[s]);if(t)for(var s of t(a))p.call(a,s)&&o(n,s,a[s]);return n})({},n),l={uri:`item:${n.notation[0]}`,prefLabel:{en:`Item ${n.notation[0]}`}},a(c,s(l));var c,l})),$=l(E[2]);return(n,a)=>(u(),i("div",null,[j,r("p",null,"Currently dragging: "+k(d(v)&&d(v).uri),1),g(" Defining draggable items "),(u(!0),i(m,null,h(d(E),(n=>(u(),i("div",{key:n.uri,draggable:"true",onDragstart:a=>d(f)(n),onDragend:a[1]||(a[1]=(...n)=>d(D)&&d(D)(...n))},k(n.uri),41,["onDragstart"])))),128)),g(" Dropzone with manually set events and conditional CSS classes "),r("div",{class:{drag:d(v),noDrag:!d(v),draggingOver:d(L)},onDragover:a[2]||(a[2]=(...n)=>d(z)&&d(z)(...n)),onDragenter:a[3]||(a[3]=(...n)=>d(w)&&d(w)(...n)),onDragleave:a[4]||(a[4]=(...n)=>d(x)&&d(x)(...n)),onDrop:a[5]||(a[5]=(...n)=>d(C)&&d(C)(...n))},k(d(v)?"Try to drop the item here":"Start dragging an item"),35),g(" Dropzone that we can get by ID; no conditional CSS classes "),S,r("p",null,[T,r(b,{item:d(E)[0]},null,8,["item"])]),r("p",null,[O,r(y,{items:d(E)},null,8,["items"])]),A,r(q,{item:$.value,onSelect:a[6]||(a[6]=n=>$.value=n.item)},null,8,["item"]),P]))}});export default E;export{C as __pageData};