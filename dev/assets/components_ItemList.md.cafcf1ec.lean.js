import{I as e}from"./chunks/ItemList.e3bc06e0.js";import{o,c as p,a as l,w as u,e as c,b as r,F as k,d,m}from"./app.58ffbb48.js";import"./chunks/ItemName.6cba955f.js";import"./chunks/utils.18cb2ff0.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/LoadingIndicator.35e914a0.js";import"./chunks/vue-scrollto.ec7616c3.js";const h=c("",15),g=r("h3",null,"rowMode = false, with itemNameOptions",-1),f=c("",1),C='{"title":"ItemList","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemList.md"}',b={},N=Object.assign(b,{__name:"ItemList",setup(w){const n=[];for(let a=0;a<=15;a+=1)n.push({uri:`uri:${a}`,notation:[`${a}`],prefLabel:{en:`Concept no. ${a}`}});const s=({item:a,row:t})=>{alert(`Item with URI ${a.uri} selected (row: ${t}).`)};return(a,t)=>(o(),p("div",null,[h,l(e,{items:n,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:s},{afterItem:u(({item:i})=>[i.uri.startsWith("uri:1")?(o(),p(k,{key:0},[d(" \u{1F680} ")],64)):m("",!0)]),_:1}),g,l(e,{items:n.slice(0,5),"row-mode":!1,"item-name-options":{clickable:!0,draggable:!1},onSelect:s},null,8,["items"]),f]))}});export{C as __pageData,N as default};
