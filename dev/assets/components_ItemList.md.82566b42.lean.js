import{o as n,c as a,b as s,f as t,p as e,F as p,a as o,d as c}from"./app.aab1c900.js";import{_ as l}from"./ItemList.1cfceee8.js";import"./ItemName.59200f2d.js";import"./shared.ae523b09.js";import"./LoadingIndicator.d6ef6120.js";const i=o('',15),u=c(" 🚀 "),r=s("h3",null,"rowMode = false, with itemNameOptions",-1),k=o('',1),d='{"title":"ItemList","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemList.md","lastUpdated":1625732228428}',m={};const h=Object.assign(m,{expose:[],setup:function(o){const c=[];for(let n=0;n<=15;n+=1)c.push({uri:`uri:${n}`,notation:[`${n}`],prefLabel:{en:`Concept no. ${n}`}});const d=({item:n,row:a})=>{alert(`Item with URI ${n.uri} selected (row: ${a}).`)};return(o,m)=>(n(),a("div",null,[i,s(l,{items:c,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:d},{afterItem:t((({item:s})=>[e(" Show a rocket after all items with URIs starting with 1 "),s.uri.startsWith("uri:1")?(n(),a(p,{key:0},[u],2112)):e("v-if",!0)])),_:1}),r,s(l,{items:c.slice(0,5),"row-mode":!1,"item-name-options":{clickable:!0},onSelect:d},null,8,["items"]),k]))}});export default h;export{d as __pageData};
