import{o as t,c as e,r,d as a,t as s}from"./app.a4c86903.js";const f={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},h={key:1};f.render=function(f,n,p,o,i,l){return p.href.startsWith("http://")||p.href.startsWith("https://")?(t(),e("a",{key:0,href:p.href,target:"_blank"},[r(f.$slots,"default",{},(()=>[a(s(p.text||p.href),1)]))],8,["href"])):(t(),e("span",h,[r(f.$slots,"default",{},(()=>[a(s(p.text||p.href),1)]))]))};export{f as _};
