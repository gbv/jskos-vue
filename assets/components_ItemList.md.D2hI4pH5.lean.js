import{I as l}from"./chunks/ItemList.CUKMSVYV.js";import{c as e,I as n,w as E,a1 as k,j as r,o as h,F as d,a as o,e as c}from"./chunks/framework.CXbGQEsj.js";import"./chunks/ItemName.C-g5_niL.js";import"./chunks/jskos-tools.CpjLtWvA.js";import"./chunks/utils.CCe5VO4G.js";import"./chunks/shared.l0sNRNKZ.js";import"./chunks/LoadingIndicator.CWAPJBMj.js";import"./chunks/vue-scrollto.FOkUA__D.js";const g=k("",15),y=r("h3",null,"rowMode = false, with itemNameOptions",-1),F=k("",1),D=JSON.parse('{"title":"ItemList","description":"","frontmatter":{},"headers":[],"relativePath":"components/ItemList.md","filePath":"components/ItemList.md"}'),u={name:"components/ItemList.md"},I=Object.assign(u,{setup(m){const i=[];for(let s=0;s<=15;s+=1)i.push({uri:`uri:${s}`,notation:[`${s}`],prefLabel:{en:`Concept no. ${s}`}});const a=({item:s,row:t})=>{alert(`Item with URI ${s.uri} selected (row: ${t}).`)};return(s,t)=>(h(),e("div",null,[g,n(l,{items:i,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:a},{afterItem:E(({item:p})=>[p.uri.startsWith("uri:1")?(h(),e(d,{key:0},[o(" 🚀 ")],64)):c("",!0)]),_:1}),y,n(l,{items:i.slice(0,5),"row-mode":!1,"item-name-options":{clickable:!0,draggable:!1},onSelect:a},null,8,["items"]),F]))}});export{D as __pageData,I as default};