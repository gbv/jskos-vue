import{d as f,j as o}from"./utils.18cb2ff0.js";import"./shared.3f0a6f78.js";import{g as p,f as b,_ as c,k as u,o as l,c as s,m as d,d as g,t as m,F as k,n as N}from"../app.58ffbb48.js";const{dragstart:L,dragend:y}=f,n=p({label:[],processLabel(e,a){for(let t of this.label)e=t(e,a);return e},notation:[],processNotation(e,a){for(let t of this.notation)e=t(e,a);return e}}),r=b({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1}},setup(e){const a=u(()=>e.showNotation?n.processNotation(o.notation(e.item),e):""),t=u(()=>e.showLabel?n.processLabel(o.prefLabel(e.item,{fallbackToUri:!a.value,language:e.language||o.languagePreference.selectLanguage(e.item.prefLabel)}),e):"");return{notation:a,label:t,dragstart:L,dragend:y}}});r.addLabelPlugin=e=>{n.label.push(e)};r.addNotationPlugin=e=>{n.notation.push(e)};const v=r,h=["innerHTML"];function j(e,a,t,w,B,T){return l(),s("span",{class:N({"jskos-vue-itemName":!0,clickable:e.clickable}),draggable:"true",onDragstart:a[0]||(a[0]=i=>e.dragstart(e.item)),onDragend:a[1]||(a[1]=(...i)=>e.dragend&&e.dragend(...i))},[e.showNotation||e.label===""?(l(),s("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,h)):d("",!0),g(" "+m(e.label)+" ",1),e.notation===""&&e.label===""?(l(),s(k,{key:1},[g(m(e.fallbackLabel),1)],64)):d("",!0)],34)}var C=c(v,[["render",j]]);export{C as I};
