import{_ as n,d as f,o as t,c as s,r,a as o,t as a}from"./framework.CXbGQEsj.js";const p=f({name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}}),h=["href"],i={key:1};function d(e,l,u,c,k,m){return e.href.startsWith("http://")||e.href.startsWith("https://")?(t(),s("a",{key:0,href:e.href,target:"_blank"},[r(e.$slots,"default",{},()=>[o(a(e.text||e.href),1)])],8,h)):(t(),s("span",i,[r(e.$slots,"default",{},()=>[o(a(e.text||e.href),1)])]))}const y=n(p,[["render",d]]);export{y as A};
