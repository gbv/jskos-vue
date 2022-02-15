import{s as n,g as s,h as a,o as t,c as p,b as o,u as e,a as c}from"./app.a4c86903.js";import{_ as u}from"./ItemSuggest.a3846749.js";import{u as l}from"./utils.2a641db9.js";import"./LoadingIndicator.c2b0b84f.js";import"./shared.99084317.js";const i=c('',11),r=c('',3),k=c('',3),g=c('',1),d='{"title":"ItemSuggest","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Search with a custom search function","slug":"search-with-a-custom-search-function"},{"level":3,"title":"Search for concepts inside a concept scheme","slug":"search-for-concepts-inside-a-concept-scheme"},{"level":3,"title":"Search for schemes in BARTOC","slug":"search-for-schemes-in-bartoc"}],"relativePath":"components/ItemSuggest.md","lastUpdated":1644908922472}',m={};const h=Object.assign(m,{setup:function(c){const d=n(null),m=n(null);s((()=>{d.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),m.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://bartoc.org/api/"})}));const h={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]},q=[{id:1,name:"Bulbasaur"},{id:2,name:"Ivysaur"},{id:3,name:"Venusaur"},{id:4,name:"Charmander"},{id:5,name:"Charmeleon"},{id:6,name:"Charizard"},{id:7,name:"Squirtle"},{id:8,name:"Wartortle"},{id:9,name:"Blastoise"},{id:10,name:"Caterpie"},{id:11,name:"Metapod"},{id:12,name:"Butterfree"},{id:13,name:"Weedle"},{id:14,name:"Kakuna"},{id:15,name:"Beedrill"},{id:16,name:"Pidgey"},{id:17,name:"Pidgeotto"},{id:18,name:"Pidgeot"},{id:19,name:"Rattata"},{id:20,name:"Raticate"}],f=async n=>{n=n.toLowerCase();const s=q.filter((s=>s.name.toLowerCase().includes(n))),a=[n];return a[1]=s.map((n=>n.name)),a[2]=s.map((()=>"")),a[3]=s.map((n=>`pokemon:${n.id}`)),a};return(n,s)=>(t(),p("div",null,[i,o(u,{search:f}),r,o(u,{search:e(l).cdkRegistryToSuggestFunction(d.value,{scheme:h})},null,8,["search"]),k,o(u,{search:e(l).cdkRegistryToSuggestFunction(m.value,{voc:!0})},null,8,["search"]),g]))}});export{d as __pageData,h as default};
