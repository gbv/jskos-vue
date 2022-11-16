import{g as h,h as m,o as p,c as l,b as e,t as g,i as y,w as u,e as k,j as i}from"./app.5e7cbef3.js";import{C as w}from"./chunks/ConceptTree.8287f3c2.js";import{j as r}from"./chunks/utils.a5bf753d.js";import{c as v}from"./chunks/index.0481e8fb.js";import"./chunks/ItemList.17c44198.js";import"./chunks/ItemName.b42d4d5a.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/Arrow.3916db28.js";const f=k("",13),q=["onClick"],_=["onClick"],b={key:1},C=k("",1),$='{"title":"ConceptTree","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptTree.md"}',S={},M=Object.assign(S,{__name:"ConceptTree",setup(x){let o;const n=h({scheme:null,async loadScheme(){this.scheme=(await o.getSchemes({params:{uri:"https://www.ixtheo.de/classification/"}}))[0]},concepts:null,async loadConcepts(){this.concepts=r.sortConcepts(await this.scheme._getTop())},async loadNarrower(s){s.narrower&&!s.narrower.includes(null)||(s.narrower=r.sortConcepts(await s._getNarrower()))},selected:null});m(async()=>{o=v.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),await n.loadScheme(),await n.loadConcepts()});const c=(...s)=>window.alert(...s);return(s,t)=>(p(),l("div",null,[f,e("p",null," Selected: "+g(n.selected&&n.selected.uri||"none"),1),n.concepts?(p(),y(w,{key:0,modelValue:n.selected,"onUpdate:modelValue":t[0]||(t[0]=a=>n.selected=a),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:n.concepts,onOpen:t[1]||(t[1]=a=>n.loadNarrower(a))},{beforeItem:u(({item:a})=>[e("span",{class:"opacity-hover",style:{"margin-right":"5px"},onClick:i(d=>c(`Clicked on Star for item ${a.uri}`),["stop"])}," \u2B50\uFE0F ",8,q)]),afterItem:u(({item:a})=>[e("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:i(d=>c(`Clicked on Rocket for item ${a.uri}`),["stop"])}," \u{1F680} ",8,_)]),_:1},8,["modelValue","concepts"])):(p(),l("div",b," Loading concepts... ")),C]))}});export{$ as __pageData,M as default};
