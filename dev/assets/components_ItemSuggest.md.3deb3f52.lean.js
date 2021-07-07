import{B as n,h as s,i as a,o as t,c as p,b as o,a as e}from"./app.8f7ad0eb.js";import{_ as c}from"./ItemSuggest.56ded683.js";import"./LoadingIndicator.6f67fafd.js";import"./shared.ae523b09.js";const u=e('',11),l=e('',3),i=e('',3),r=e('',1),k='{"title":"ItemSuggest","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Search for concepts inside a concept scheme","slug":"search-for-concepts-inside-a-concept-scheme"},{"level":3,"title":"Search with a custom search function","slug":"search-with-a-custom-search-function"},{"level":3,"title":"Search for schemes in BARTOC","slug":"search-for-schemes-in-bartoc"}],"relativePath":"components/ItemSuggest.md","lastUpdated":1625649754256}',d={};const g=Object.assign(d,{expose:[],setup:function(e){const k=n(null),d=n(null);s((()=>{k.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),d.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://bartoc.org/api/"})}));const g={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]},m=[{id:1,name:"Bulbasaur"},{id:2,name:"Ivysaur"},{id:3,name:"Venusaur"},{id:4,name:"Charmander"},{id:5,name:"Charmeleon"},{id:6,name:"Charizard"},{id:7,name:"Squirtle"},{id:8,name:"Wartortle"},{id:9,name:"Blastoise"},{id:10,name:"Caterpie"},{id:11,name:"Metapod"},{id:12,name:"Butterfree"},{id:13,name:"Weedle"},{id:14,name:"Kakuna"},{id:15,name:"Beedrill"},{id:16,name:"Pidgey"},{id:17,name:"Pidgeotto"},{id:18,name:"Pidgeot"},{id:19,name:"Rattata"},{id:20,name:"Raticate"}],h=async n=>{n=n.toLowerCase();const s=m.filter((s=>s.name.toLowerCase().includes(n))),a=[n];return a[1]=s.map((n=>n.name)),a[2]=s.map((()=>"")),a[3]=s.map((n=>`pokemon:${n.id}`)),a};return(n,s)=>(t(),p("div",null,[u,o(c,{scheme:g,registry:k.value},null,8,["registry"]),l,o(c,{search:h}),i,o(c,{registry:d.value},null,8,["registry"]),r]))}});export default g;export{k as __pageData};
