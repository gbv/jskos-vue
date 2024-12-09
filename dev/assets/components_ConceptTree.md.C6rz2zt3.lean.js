import{_ as T,d as I,o as p,b as B,w as d,c as g,E as V,F as L,e as D,$ as f,r as u,M as $,a2 as q,h as j,D as v,y as P,j as m,t as x,a1 as _}from"./chunks/framework.DOrQYd6A.js";import{j as O,c as C,s as b}from"./chunks/jskos-tools.CpjLtWvA.js";import{I as N}from"./chunks/ItemList.cWUfRKyf.js";import{A as U}from"./chunks/Arrow.BM61LVN8.js";import"./chunks/shared.l0sNRNKZ.js";import{c as M}from"./chunks/index.C1QD6wya.js";import"./chunks/ItemName.CIbLrj7s.js";import"./chunks/utils.C_9pBjEX.js";import"./chunks/LoadingIndicator.BIFdSjTT.js";import"./chunks/vue-scrollto.FOkUA__D.js";const R=I({name:"ConceptTree",components:{ItemList:N,Arrow:U},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select","open","close","update:modelValue"],setup(i,{emit:h}){const t=q({}),r=a=>{let s=[],e=a.concept,F=a.depth+1;if(e&&t[e.uri])for(let o of e.narrower||[]){let c={concept:o,depth:F,isSelected:C(i.modelValue,o)};s.push(c),s=s.concat(r(c))}return s},l=j(()=>{let a=[];for(let s of i.concepts){let e={concept:s,depth:0,isSelected:C(i.modelValue,s)};a.push(e),i.hierarchy&&(a=a.concat(r(e)))}return a}),k=a=>{t[a.uri]=!0,h("open",a)},n=a=>{var F,o,c,A,w;let s=(F=i.modelValue)==null?void 0:F.uri,e=s;for(;s;){const E=(o=l.value.find(S=>C(S.concept,{uri:s})))==null?void 0:o.concept;if(s!==e&&C(E,a))return;s=(w=((c=E==null?void 0:E.ancestors)==null?void 0:c[0])||((A=E==null?void 0:E.broader)==null?void 0:A[0]))==null?void 0:w.uri}delete t[a.uri],h("close",a)};return{items:l,isOpen:t,open:k,close:n,toggle:a=>{t[a.uri]?n(a):k(a)},jskos:O}},methods:{isUriInView(...i){return this.$refs.itemList.isUriInView(...i)},scrollToUri(...i){this.$refs.itemList.scrollToUri(...i)}}}),J=["onClick"];function K(i,h,t,r,l,k){var a;const n=v("arrow"),y=v("item-list");return p(),B(y,$({ref:"itemList"},i.itemListOptions,{class:{"jskos-vue-conceptTree":!0,"jskos-vue-conceptTree-noHierarchy":!i.hierarchy},items:i.items,"item-property":"concept","highlight-by-uri":(a=i.modelValue)!=null&&a.uri?{[i.modelValue.uri]:!0}:{},onSelect:h[0]||(h[0]=s=>{i.$emit("select",s),i.$emit("update:modelValue",s.item)})}),{beforeItem:d(({item:s})=>[(p(!0),g(L,null,V(s.depth,e=>(p(),g("div",{key:e,class:"jskos-vue-conceptTree-depthSpacer"}))),128)),i.hierarchy?(p(),g("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:f(e=>i.toggle(s.concept),["stop"])},[s.concept&&s.concept.narrower&&s.concept.narrower.length!==0?(p(),B(n,{key:0,direction:i.isOpen[s.concept.uri]?"down":"right",clickable:!0},null,8,["direction"])):D("",!0)],8,J)):D("",!0),u(i.$slots,"beforeItem",{item:s.concept})]),afterItem:d(({item:s})=>[u(i.$slots,"afterItem",{item:s.concept})]),beforeList:d(()=>[u(i.$slots,"beforeList")]),afterList:d(()=>[u(i.$slots,"afterList")]),_:3},16,["class","items","highlight-by-uri"])}const z=T(R,[["render",K]]),Y=_("",13),H=["onClick"],W=["onClick"],G={key:1},Q=_("",1),ps=JSON.parse('{"title":"ConceptTree","description":"","frontmatter":{},"headers":[],"relativePath":"components/ConceptTree.md","filePath":"components/ConceptTree.md"}'),X={name:"components/ConceptTree.md"},Es=Object.assign(X,{setup(i){let h;const t=q({scheme:null,async loadScheme(){this.scheme=(await h.getSchemes({params:{uri:"https://www.ixtheo.de/classification/"}}))[0]},concepts:null,async loadConcepts(){this.concepts=b(await this.scheme._getTop())},async loadNarrower(l){l.narrower&&!l.narrower.includes(null)||(l.narrower=b(await l._getNarrower()))},selected:null});P(async()=>{h=M.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),await t.loadScheme(),await t.loadConcepts()});const r=(...l)=>window.alert(...l);return(l,k)=>(p(),g("div",null,[Y,m("p",null," Selected: "+x(t.selected&&t.selected.uri||"none"),1),t.concepts?(p(),B(z,{key:0,modelValue:t.selected,"onUpdate:modelValue":k[0]||(k[0]=n=>t.selected=n),style:{height:"400px",overflow:"auto",border:"2px solid #0001"},concepts:t.concepts,onOpen:k[1]||(k[1]=n=>t.loadNarrower(n))},{beforeItem:d(({item:n})=>[m("span",{class:"opacity-hover",style:{"margin-right":"5px"},onClick:f(y=>r(`Clicked on Star for item ${n.uri}`),["stop"])}," ⭐️ ",8,H)]),afterItem:d(({item:n})=>[m("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:f(y=>r(`Clicked on Rocket for item ${n.uri}`),["stop"])}," 🚀 ",8,W)]),_:1},8,["modelValue","concepts"])):(p(),g("div",G," Loading concepts... ")),Q]))}});export{ps as __pageData,Es as default};