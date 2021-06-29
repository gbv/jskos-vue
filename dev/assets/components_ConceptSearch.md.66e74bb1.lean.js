import{g as e,h as s,d as n,i as a,j as t,k as o,n as l,V as c,p,l as u,m as r,o as i,c as d,q as h,s as v,v as k,b as g,u as m,x as f,y,F as S,z as w,A as _,w as q,B as b,C as j,a as T}from"./app.de95b7d4.js";import{_ as R}from"./LoadingIndicator.4e2a64d2.js";import"./shared.690f4af6.js";function C(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const x=n({name:"ConceptSearch",components:{LoadingIndicator:R},props:{scheme:{type:Object,required:!0},registry:{type:Object,default:null}},emits:["select"],setup(n,{emit:p}){const u=a((()=>n.registry||n.scheme._registry)),r=t(!1),i=t(!1),d=t(null),h=t(""),v=t(-1),k=t([]),g=t(!1),m=t(null),f=t(null),y=t(null),S=(w=async e=>{if(!u.value)return[];e=e.trim(),k.value=[],r.value=!0;const s=u.value.suggest({search:e,scheme:n.scheme});let a;d.value=s.cancel;try{a=(await s).slice(1).reduce(((e,s)=>e=s.map(((s,n)=>(e[n]||[]).concat(s)))),[])}catch(t){if("canceled"===t.message)return;console.error(t),a=[]}e===h.value.trim()&&(k.value=a,d.value=null,r.value=!1)},q=200,function(){var e=this,s=arguments,n=function(){j=null,b||w.apply(e,s)},a=b&&!j;clearTimeout(j),j=setTimeout(n,q),a&&w.apply(e,s)});var w,q,b,j;o(h,(e=>{v.value=-1,null!=d.value&&(d.value("There was a newer search query."),d.value=null),""===e?(r.value=!1,i.value=!1):(k.value=["Waiting for you to stop typing..."],r.value=!0,i.value=!0,S(e))})),o((()=>n.scheme),((e,s)=>{_.compare(s,e)||(h.value="",k.value=[],i.value=!1,r.value=!1,v.value=-1)}));const T=()=>{i.value=!1},R=e=>{T(),v.value=-1,p("select",{uri:k.value[e][2],inScheme:[n.scheme]}),document.activeElement!==document.body&&document.activeElement.blur()},x=()=>{const e=y.value.childNodes[v.value+1];if(e){const s=e.parentElement.parentElement,n=e.getBoundingClientRect(),a=s.getBoundingClientRect();c.scrollTo(e,100,{container:s,easing:"ease-in",offset:n.bottom>a.bottom?-a.height+n.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return function(n,a=!1){const t=e=>{for(const s of n()){const n=(s.elements||[]).reduce(((s,n)=>s||n&&n.contains(e.target)),!1);!a&&n||s.handler({event:e,isInside:n})}};e((()=>{document.addEventListener("click",t)})),s((()=>{document.removeEventListener("click",t)}))}((()=>[{elements:[m.value],handler:()=>{i.value=!1,v.value=-1}}])),{isLoading:r,isOpen:i,query:h,searchSelected:v,results:k,uniqueID:"abc",openResults:()=>{i.value=""!==h.value},closeResults:T,chooseResult:R,conceptSearch:m,searchInput:f,resultList:y,mouseover(e){g.value||(v.value=e)},mousemove(){g.value=!1},onArrowDown(){g.value=!0,v.value>=k.value.length-1?v.value=0:v.value+=1,x()},onArrowUp(){g.value=!0,v.value<=0?v.value=k.value.length-1:v.value-=1,x()},onEnter(){let e;r.value||0===k.value.length||(e=v.value<0||v.value>=k.value.length?0:v.value,R(e))},highlightQueryInResult:e=>{if(!h.value.length)return e;const s=h.value,n=new RegExp(s,"ig");let a=n.exec(e),t=0,o="";for(;a;){let l=a.index;o+=C(e.slice(t,l))+"<span class='jskos-vue-text-bold'>"+C(e.slice(l,l+s.length))+"</span>",t=l+s.length,a=n.exec(e)}return o+=C(e.slice(t)),o},focus(){f.value.focus()},setQuery(e,s=!1){h.value=e,s?f.value.focus():l((()=>{T()}))}}}}),E=q();p("data-v-3385bd1c");const A={class:"jskos-vue-conceptSearch-results jskos-vue-text-small"},I={key:0,class:"jskos-vue-conceptSearch-loading"},L={ref:"resultList",class:"jskos-vue-conceptSearch-results-list"},O={key:0,class:"jskos-vue-conceptSearch-results-item"},P=g("div",null,"No results",-1);u();const D=E(((e,s,n,a,t,o)=>{const l=r("loading-indicator");return i(),d("div",{ref:"conceptSearch",class:"jskos-vue-conceptSearch",onMousemove:s[8]||(s[8]=(...s)=>e.mousemove&&e.mousemove(...s))},[h(" Input field "),v(g("input",{ref:"searchInput","onUpdate:modelValue":s[1]||(s[1]=s=>e.query=s),placeholder:"Type to search...",onClick:s[2]||(s[2]=(...s)=>e.openResults&&e.openResults(...s)),onKeydown:[s[3]||(s[3]=m(f(((...s)=>e.onArrowDown&&e.onArrowDown(...s)),["prevent"]),["down"])),s[4]||(s[4]=m(f(((...s)=>e.onArrowUp&&e.onArrowUp(...s)),["prevent"]),["up"]))],onKeyup:[s[5]||(s[5]=m(((...s)=>e.onEnter&&e.onEnter(...s)),["enter"])),s[6]||(s[6]=m((s=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:s[7]||(s[7]=(...s)=>e.openResults&&e.openResults(...s))},null,544),[[k,e.query]]),h(" Results "),v(g("div",A,[h(" Loading indicator if necessary "),e.isLoading?(i(),d("div",I,[g(l,{size:"md"})])):(i(),d(S,{key:1},[h(" If not loading, show results "),g("ul",L,[(i(!0),d(S,null,w(e.results,((s,n)=>(i(),d("li",{key:n,class:[{"jskos-vue-conceptSearch-selected":n===e.searchSelected},"jskos-vue-conceptSearch-results-item"],onClick:s=>e.chooseResult(n),onMouseover:s=>e.mouseover(n)},[g("span",{innerHTML:e.highlightQueryInResult(s[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(i(),d("li",O,[h(" TODO: Add other languages "),P])):h("v-if",!0)],512)],2112))],512),[[y,e.isOpen]])],544)}));x.render=D,x.__scopeId="data-v-3385bd1c";const M=T('',10),Q=T('',1),V='{"title":"ConceptSearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptSearch.md","lastUpdated":1624958855580}',N={};const U=Object.assign(N,{expose:[],setup:function(e){const s=b.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),n={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]};return(e,a)=>(i(),d("div",null,[M,g(x,{scheme:n,registry:j(s)},null,8,["registry"]),Q]))}});export default U;export{V as __pageData};
