import{I as D}from"./chunks/ItemName.CuMQb6WA.js";import{I as b}from"./chunks/ItemList.CI6NDTcO.js";import{I as A}from"./chunks/ItemDetails.B5OeYKoT.js";import{y as v,s as q,c as k,j as h,t as p,k as s,F as f,E as I,n as z,a as x,I as E,a1 as r,o as d}from"./chunks/framework.CXbGQEsj.js";import{b as _}from"./chunks/utils.Du2BS91N.js";import"./chunks/jskos-tools.BngNuJFy.js";import"./chunks/shared.l0sNRNKZ.js";import"./chunks/LoadingIndicator.CWAPJBMj.js";import"./chunks/vue-scrollto.FOkUA__D.js";import"./chunks/style.-xXEQWSy.js";import"./chunks/AutoLink.DdFLTQbv.js";import"./chunks/LicenseInfo.CO5g-42M.js";const w=r("",22),S=["onDragstart"],T=r("",4),P=h("p",null,"ItemList:",-1),O=h("p",null,"ItemDetails (is a dropzone by default):",-1),j=r("",1),X=JSON.parse('{"title":"dragAndDrop","description":"","frontmatter":{},"headers":[],"relativePath":"utilities/dragAndDrop.md","filePath":"utilities/dragAndDrop.md"}'),N={name:"utilities/dragAndDrop.md"},Z=Object.assign(N,{setup($){const{draggedItem:t,dragstart:m,dragend:g,addDropzone:e}=_,{dragover:o,dragenter:y,dragleave:F,drop:c,isDraggingOver:B}=e(null,n=>{alert(`Dropped item with URI ${n.uri}`)});v(()=>{e(document.getElementById("dropzone"),n=>{alert(`Dropped item with URI ${n.uri}`)}),e(document.getElementById("dropzone2"),n=>{alert(`Dropped item with URI ${n.uri}`)})});const l=[{notation:["1"]},{notation:["2"]},{notation:["3"]}].map(n=>({...n,uri:`item:${n.notation[0]}`,prefLabel:{en:`Item ${n.notation[0]}`}})),C=q(l[2]);return(n,a)=>(d(),k("div",null,[w,h("p",null,"Currently dragging: "+p(s(t)&&s(t).uri),1),(d(!0),k(f,null,I(s(l),i=>(d(),k("div",{key:i.uri,draggable:"true",onDragstart:u=>s(m)(i),onDragend:a[0]||(a[0]=(...u)=>s(g)&&s(g)(...u))},p(i.uri),41,S))),128)),h("div",{class:z({drag:s(t),noDrag:!s(t),draggingOver:s(B)}),onDragover:a[1]||(a[1]=(...i)=>s(o)&&s(o)(...i)),onDragenter:a[2]||(a[2]=(...i)=>s(y)&&s(y)(...i)),onDragleave:a[3]||(a[3]=(...i)=>s(F)&&s(F)(...i)),onDrop:a[4]||(a[4]=(...i)=>s(c)&&s(c)(...i))},p(s(t)?"Try to drop the item here":"Start dragging an item"),35),T,h("p",null,[x(" Single item: "),E(D,{item:s(l)[0]},null,8,["item"])]),P,E(b,{items:s(l)},null,8,["items"]),O,E(A,{item:C.value,onSelect:a[5]||(a[5]=i=>C.value=i.item)},null,8,["item"]),j]))}});export{X as __pageData,Z as default};
