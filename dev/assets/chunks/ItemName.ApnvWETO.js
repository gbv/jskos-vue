import{e as p,n as b,p as f,l as c}from"./utils.Dv7twT1s.js";/* empty css               */import{_ as k,a1 as N,o,c as n,e as l,F as u,a as d,t as g,n as L,d as h,h as m}from"./framework.eEdxNogO.js";const{dragstart:y,dragend:w}=p,s=N({label:[],processLabel(e,a){for(let t of this.label)e=t(e,a);return e},notation:[],processNotation(e,a){for(let t of this.notation)e=t(e,a);return e}}),r=h({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1},draggable:{type:Boolean,default:!0}},setup(e){const a=m(()=>e.showNotation?s.processNotation(b(e.item),e):""),t=m(()=>e.showLabel?s.processLabel(f(e.item,{fallbackToUri:!a.value,language:e.language||c.selectLanguage(e.item.prefLabel)}),e):"");return{notation:a,label:t,dragstart:y,dragend:w}}});r.addLabelPlugin=e=>{s.label.push(e)};r.addNotationPlugin=e=>{s.notation.push(e)};const v=r,B=["draggable"],$=["innerHTML"],T={key:0,innerHTML:" "};function D(e,a,t,I,j,C){return o(),n("span",{class:L({"jskos-vue-itemName":!0,clickable:e.clickable}),draggable:e.draggable,onDragstart:a[0]||(a[0]=i=>e.dragstart(e.item)),onDragend:a[1]||(a[1]=(...i)=>e.dragend&&e.dragend(...i))},[e.showNotation||e.label===""?(o(),n("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,$)):l("",!0),e.label!==""?(o(),n(u,{key:1},[e.showNotation&&e.notation!==""?(o(),n("span",T)):l("",!0),d(" "+g(e.label),1)],64)):l("",!0),(!e.showNotation||e.notation==="")&&e.label===""?(o(),n(u,{key:2},[d(g(e.fallbackLabel),1)],64)):l("",!0)],42,B)}const F=k(v,[["render",D],["__scopeId","data-v-4c2189b3"]]);export{F as I};
