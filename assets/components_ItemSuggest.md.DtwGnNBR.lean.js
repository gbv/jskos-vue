import{l as N}from"./chunks/jskos-tools.CpjLtWvA.js";import{_ as O,h as z,d as x,o as u,c as y,a3 as R,a4 as K,j as q,Z as C,$ as I,a5 as W,I as B,F as H,E as U,n as Q,e as J,s as l,v as G,R as Y,D as Z,y as X,a1 as v}from"./chunks/framework.CXbGQEsj.js";import{L as ss}from"./chunks/LoadingIndicator.CWAPJBMj.js";import{V as is}from"./chunks/vue-scrollto.FOkUA__D.js";import{a as as,d as ts,c as P}from"./chunks/utils.CotYGJ25.js";import"./chunks/shared.l0sNRNKZ.js";import{c as L}from"./chunks/index.C1QD6wya.js";const V={en:{placeholder:"Type to search..."},de:{placeholder:"Tippen zum Suchen..."}},ns=z(()=>N.getLanguages().find(s=>V[s])||"en"),es=s=>V[ns.value][s];function D(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const hs=x({name:"ItemSuggest",components:{LoadingIndicator:ss},props:{search:{type:Function,default:null},placeholder:{type:String,default:null}},emits:["select"],setup(s,{emit:n}){const E=l(!1),d=l(!1),g=l(null),r=l(""),t=l(-1),i=l([]),k="abc",h=l(!1),S=l(null),f=l(null),_=l(null),M=ts(async a=>{a=a.trim(),i.value=[],E.value=!0;const p=s.search(a);g.value=p.cancel;let o;try{o=(await p).slice(1).reduce((e,F)=>(e=F.map((m,c)=>(e[c]||[]).concat(m)),e),[])}catch(e){if(e.message==="canceled")return;console.error(e),o=[]}a===r.value.trim()&&(i.value=o,g.value=null,E.value=!1)},200);G(r,a=>{t.value=-1,g.value!=null&&(g.value("There was a newer search query."),g.value=null),a===""?(E.value=!1,d.value=!1):(i.value=["Waiting for you to stop typing..."],E.value=!0,d.value=!0,M(a))});const $=()=>{d.value=r.value!==""},A=()=>{d.value=!1},w=a=>{A(),t.value=-1,n("select",{uri:i.value[a][2]}),document.activeElement!==document.body&&document.activeElement.blur()},j=a=>{if(!r.value.length)return a;const p=r.value,o=new RegExp(p,"ig");let e=o.exec(a),F=0,m="";for(;e;){let c=e.index;m+=D(a.slice(F,c))+"<span class='jskos-vue-text-bold'>"+D(a.slice(c,c+p.length))+"</span>",F=c+p.length,e=o.exec(a)}return m+=D(a.slice(F)),m},T=()=>{const a=_.value.childNodes[t.value+1];if(a){const p=a.parentElement.parentElement,o=a.getBoundingClientRect(),e=p.getBoundingClientRect();is.scrollTo(a,100,{container:p,easing:"ease-in",offset:o.bottom>e.bottom?-e.height+o.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return as(()=>[{elements:[S.value],handler:()=>{d.value=!1,t.value=-1}}]),{t:es,isLoading:E,isOpen:d,query:r,searchSelected:t,results:i,uniqueID:k,openResults:$,closeResults:A,chooseResult:w,itemSuggest:S,searchInput:f,resultList:_,mouseover(a){h.value||(t.value=a)},mousemove(){h.value=!1},onArrowDown(){h.value=!0,t.value>=i.value.length-1?t.value=0:t.value+=1,T()},onArrowUp(){h.value=!0,t.value<=0?t.value=i.value.length-1:t.value-=1,T()},onEnter(){let a;E.value||i.value.length===0||(t.value<0||t.value>=i.value.length?a=0:a=t.value,w(a))},highlightQueryInResult:j,focus(){f.value.focus()},setQuery(a,p=!1){r.value=a,p?f.value.focus():Y(()=>{A()})}}}}),ls=["placeholder"],ks={class:"jskos-vue-itemSuggest-results jskos-vue-text-small"},ps={key:0,class:"jskos-vue-itemSuggest-loading"},Es={key:1,ref:"resultList",class:"jskos-vue-itemSuggest-results-list"},rs=["onClick","onMouseover"],ds=["innerHTML"],os={key:0,class:"jskos-vue-itemSuggest-results-item"},gs=q("div",null,"No results",-1),us=[gs];function ys(s,n,E,d,g,r){const t=Z("loading-indicator");return u(),y("div",{ref:"itemSuggest",class:"jskos-vue-itemSuggest",onMousemove:n[7]||(n[7]=(...i)=>s.mousemove&&s.mousemove(...i))},[R(q("input",{ref:"searchInput","onUpdate:modelValue":n[0]||(n[0]=i=>s.query=i),type:"search",placeholder:s.placeholder===null?s.t("placeholder"):s.placeholder,onClick:n[1]||(n[1]=(...i)=>s.openResults&&s.openResults(...i)),onKeydown:[n[2]||(n[2]=C(I((...i)=>s.onArrowDown&&s.onArrowDown(...i),["prevent"]),["down"])),n[3]||(n[3]=C(I((...i)=>s.onArrowUp&&s.onArrowUp(...i),["prevent"]),["up"]))],onKeyup:[n[4]||(n[4]=C((...i)=>s.onEnter&&s.onEnter(...i),["enter"])),n[5]||(n[5]=C(i=>{s.$refs&&s.$refs.searchInput&&s.$refs.searchInput.blur(),s.closeResults()},["esc"]))],onFocus:n[6]||(n[6]=(...i)=>s.openResults&&s.openResults(...i))},null,40,ls),[[K,s.query]]),R(q("div",ks,[s.isLoading?(u(),y("div",ps,[B(t,{size:"md"})])):(u(),y("ul",Es,[(u(!0),y(H,null,U(s.results,(i,k)=>(u(),y("li",{key:k,class:Q([{"jskos-vue-itemSuggest-selected":k===s.searchSelected},"jskos-vue-itemSuggest-results-item"]),onClick:h=>s.chooseResult(k),onMouseover:h=>s.mouseover(k)},[q("span",{innerHTML:s.highlightQueryInResult(i[0])},null,8,ds)],42,rs))),128)),s.results.length==0?(u(),y("li",os,us)):J("",!0)],512))],512),[[W,s.isOpen]])],544)}const b=O(hs,[["render",ys]]),cs=v("",11),Fs=v("",3),ms=v("",3),Cs=v("",1),_s=JSON.parse('{"title":"ItemSuggest","description":"","frontmatter":{},"headers":[],"relativePath":"components/ItemSuggest.md","filePath":"components/ItemSuggest.md"}'),qs={name:"components/ItemSuggest.md"},ws=Object.assign(qs,{setup(s){const n=l(null),E=l(null);X(()=>{n.value=L.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),E.value=L.initializeRegistry({provider:"ConceptApi",api:"https://bartoc.org/api/"})});const d={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]},g=[{id:1,name:"Bulbasaur"},{id:2,name:"Ivysaur"},{id:3,name:"Venusaur"},{id:4,name:"Charmander"},{id:5,name:"Charmeleon"},{id:6,name:"Charizard"},{id:7,name:"Squirtle"},{id:8,name:"Wartortle"},{id:9,name:"Blastoise"},{id:10,name:"Caterpie"},{id:11,name:"Metapod"},{id:12,name:"Butterfree"},{id:13,name:"Weedle"},{id:14,name:"Kakuna"},{id:15,name:"Beedrill"},{id:16,name:"Pidgey"},{id:17,name:"Pidgeotto"},{id:18,name:"Pidgeot"},{id:19,name:"Rattata"},{id:20,name:"Raticate"}],r=async t=>{t=t.toLowerCase();const i=g.filter(h=>h.name.toLowerCase().includes(t)),k=[t];return k[1]=i.map(h=>h.name),k[2]=i.map(()=>""),k[3]=i.map(h=>`pokemon:${h.id}`),k};return(t,i)=>(u(),y("div",null,[cs,B(b,{search:r}),Fs,B(b,{search:P(n.value,{scheme:d})},null,8,["search"]),ms,B(b,{search:P(E.value,{voc:!0})},null,8,["search"]),Cs]))}});export{_s as __pageData,ws as default};
