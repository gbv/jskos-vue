import{C as n,D as s,h as a,i as t,o as p,c as o,b as e,t as c,E as l,f as u,y as i,a as r}from"./app.5ac7d51c.js";import{_ as k}from"./ConceptTree.e4470198.js";import"./ItemList.6ea86514.js";import"./ItemName.9943afb9.js";import"./shared.690f4af6.js";import"./LoadingIndicator.730f5faf.js";import"./Arrow.4e8d8833.js";const d=r('',13),h={key:1},m=r('',1),g='{"title":"ConceptTree","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptTree.md","lastUpdated":1625209779782}',w={};const y=Object.assign(w,{expose:[],setup:function(r){let g;const w=n({scheme:null,async loadScheme(){this.scheme=(await g.getSchemes({params:{uri:"https://www.ixtheo.de/classification/"}}))[0]},concepts:null,async loadConcepts(){this.concepts=s.exports.sortConcepts(await this.scheme._getTop())},async loadNarrower(n){n.narrower&&!n.narrower.includes(null)||(n.narrower=s.exports.sortConcepts(await n._getNarrower()))},selected:null});a((async()=>{g=t.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),await w.loadScheme(),await w.loadConcepts()}));const y=(...n)=>window.alert(...n);return(n,s)=>(p(),o("div",null,[d,e("p",null," Selected: "+c(l(w).selected&&l(w).selected.uri||"none"),1),l(w).concepts?(p(),o(k,{key:0,modelValue:l(w).selected,"onUpdate:modelValue":s[1]||(s[1]=n=>l(w).selected=n),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:l(w).concepts,onOpen:s[2]||(s[2]=n=>l(w).loadNarrower(n))},{beforeItem:u((({item:n})=>[e("span",{class:"opacity-hover",style:{"margin-right":"5px"},onClick:i((s=>y(`Clicked on Star for item ${n.uri}`)),["stop"])}," ⭐️ ",8,["onClick"])])),afterItem:u((({item:n})=>[e("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:i((s=>y(`Clicked on Rocket for item ${n.uri}`)),["stop"])}," 🚀 ",8,["onClick"])])),_:1},8,["modelValue","concepts"])):(p(),o("div",h," Loading concepts... ")),m]))}});export default y;export{g as __pageData};
