import{o as a,c as s,r as n,e as t,t as p,b as e,f as o,a as l}from"./app.de95b7d4.js";const c={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},u={key:1};c.render=function(e,o,l,c,i,k){return l.href.startsWith("http://")||l.href.startsWith("https://")?(a(),s("a",{key:0,href:l.href,target:"_blank"},[n(e.$slots,"default",{},(()=>[t(p(l.text||l.href),1)]))],8,["href"])):(a(),s("span",u,[n(e.$slots,"default",{},(()=>[t(p(l.text||l.href),1)]))]))};const i=l('',11),k=t("URL without text: "),r=t("URL with text (via prop): "),h=t("URL with text (via slot): "),g=t("coli-conc"),d=t("Not a URL (show as text): "),f=l('',1),v='{"title":"AutoLink","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/AutoLink.md","lastUpdated":1624955647363}',m={};const x=Object.assign(m,{expose:[],setup:function(n){return(n,t)=>(a(),s("div",null,[i,e("ul",null,[e("li",null,[k,e(c,{href:"https://coli-conc.gbv.de"})]),e("li",null,[r,e(c,{href:"https://coli-conc.gbv.de",text:"coli-conc"})]),e("li",null,[h,e(c,{href:"https://coli-conc.gbv.de"},{default:o((()=>[g])),_:1})]),e("li",null,[d,e(c,{href:"some text"})])]),f]))}});export default x;export{v as __pageData};
