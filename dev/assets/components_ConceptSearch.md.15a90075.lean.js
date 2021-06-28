import{e,f as s,o as n,c as a,w as t,g as o,h as l,r as c,i as p,n as u,V as r,p as i,j as d,k as h,l as v,m as k,v as g,b as m,q as y,s as f,t as w,F as S,u as q,x,y as b,z as j,a as C}from"./app.a39189a4.js";const _=e({name:"LoadingIndicator",props:{size:{type:String,default:"sm"},primaryColor:{type:String,default:"lightgray"},secondaryColor:{type:String,default:"blue"}},setup:e=>({sizePixels:s((()=>({sm:9,md:15,lg:21,xl:27}[e.size])))})}),R=t()(((e,s,t,o,l,c)=>(n(),a("div",{style:{border:`${e.sizePixels/3}px solid ${e.primaryColor}`,"border-top":`${e.sizePixels/3}px solid ${e.secondaryColor}`,width:`${e.sizePixels}px`,height:`${e.sizePixels}px`},class:"jskos-vue-loadingIndicator"},null,4))));_.render=R,_.__scopeId="data-v-2891f739";function E(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const I=e({name:"ConceptSearch",components:{LoadingIndicator:_},props:{scheme:{type:Object,required:!0},registry:{type:Object,default:null}},emits:["select"],setup(e,{emit:n}){const a=s((()=>e.registry||e.scheme._registry)),t=c(!1),i=c(!1),d=c(null),h=c(""),v=c(-1),k=c([]),g=c(!1),m=c(null),y=c(null),f=c(null),w=(S=async s=>{if(!a.value)return[];s=s.trim(),k.value=[],t.value=!0;const n=a.value.suggest({search:s,scheme:e.scheme});let o;d.value=n.cancel;try{o=(await n).slice(1).reduce(((e,s)=>e=s.map(((s,n)=>(e[n]||[]).concat(s)))),[])}catch(l){if("canceled"===l.message)return;console.error(l),o=[]}s===h.value.trim()&&(k.value=o,d.value=null,t.value=!1)},q=200,function(){var e=this,s=arguments,n=function(){j=null,b||S.apply(e,s)},a=b&&!j;clearTimeout(j),j=setTimeout(n,q),a&&S.apply(e,s)});var S,q,b,j;p(h,(e=>{v.value=-1,null!=d.value&&(d.value("There was a newer search query."),d.value=null),""===e?(t.value=!1,i.value=!1):(k.value=["Waiting for you to stop typing..."],t.value=!0,i.value=!0,w(e))})),p((()=>e.scheme),((e,s)=>{x.compare(s,e)||(h.value="",k.value=[],i.value=!1,t.value=!1,v.value=-1)}));const C=()=>{i.value=!1},_=s=>{C(),v.value=-1,n("select",{uri:k.value[s][2],inScheme:[e.scheme]}),document.activeElement!==document.body&&document.activeElement.blur()},R=()=>{const e=f.value.childNodes[v.value+1];if(e){const s=e.parentElement.parentElement,n=e.getBoundingClientRect(),a=s.getBoundingClientRect();r.scrollTo(e,100,{container:s,easing:"ease-in",offset:n.bottom>a.bottom?-a.height+n.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return function(e,s=!1){const n=n=>{for(const a of e()){const e=(a.elements||[]).reduce(((e,s)=>e||s&&s.contains(n.target)),!1);!s&&e||a.handler({event:n,isInside:e})}};o((()=>{document.addEventListener("click",n)})),l((()=>{document.removeEventListener("click",n)}))}((()=>[{elements:[m.value],handler:()=>{i.value=!1,v.value=-1}}])),{isLoading:t,isOpen:i,query:h,searchSelected:v,results:k,uniqueID:"abc",openResults:()=>{i.value=""!==h.value},closeResults:C,chooseResult:_,conceptSearch:m,searchInput:y,resultList:f,mouseover(e){g.value||(v.value=e)},mousemove(){g.value=!1},onArrowDown(){g.value=!0,v.value>=k.value.length-1?v.value=0:v.value+=1,R()},onArrowUp(){g.value=!0,v.value<=0?v.value=k.value.length-1:v.value-=1,R()},onEnter(){let e;t.value||0===k.value.length||(e=v.value<0||v.value>=k.value.length?0:v.value,_(e))},highlightQueryInResult:e=>{if(!h.value.length)return e;const s=h.value,n=new RegExp(s,"ig");let a=n.exec(e),t=0,o="";for(;a;){let l=a.index;o+=E(e.slice(t,l))+"<span class='jskos-vue-text-bold'>"+E(e.slice(l,l+s.length))+"</span>",t=l+s.length,a=n.exec(e)}return o+=E(e.slice(t)),o},focus(){y.value.focus()},setQuery(e,s=!1){h.value=e,s?y.value.focus():u((()=>{C()}))}}}}),T=t();i("data-v-3385bd1c");const A={class:"jskos-vue-conceptSearch-results jskos-vue-text-small"},z={key:0,class:"jskos-vue-conceptSearch-loading"},L={ref:"resultList",class:"jskos-vue-conceptSearch-results-list"},P={key:0,class:"jskos-vue-conceptSearch-results-item"},O=m("div",null,"No results",-1);d();const M=T(((e,s,t,o,l,c)=>{const p=h("loading-indicator");return n(),a("div",{ref:"conceptSearch",class:"jskos-vue-conceptSearch",onMousemove:s[8]||(s[8]=(...s)=>e.mousemove&&e.mousemove(...s))},[v(" Input field "),k(m("input",{ref:"searchInput","onUpdate:modelValue":s[1]||(s[1]=s=>e.query=s),placeholder:"Type to search...",onClick:s[2]||(s[2]=(...s)=>e.openResults&&e.openResults(...s)),onKeydown:[s[3]||(s[3]=y(f(((...s)=>e.onArrowDown&&e.onArrowDown(...s)),["prevent"]),["down"])),s[4]||(s[4]=y(f(((...s)=>e.onArrowUp&&e.onArrowUp(...s)),["prevent"]),["up"]))],onKeyup:[s[5]||(s[5]=y(((...s)=>e.onEnter&&e.onEnter(...s)),["enter"])),s[6]||(s[6]=y((s=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:s[7]||(s[7]=(...s)=>e.openResults&&e.openResults(...s))},null,544),[[g,e.query]]),v(" Results "),k(m("div",A,[v(" Loading indicator if necessary "),e.isLoading?(n(),a("div",z,[m(p,{size:"md"})])):(n(),a(S,{key:1},[v(" If not loading, show results "),m("ul",L,[(n(!0),a(S,null,q(e.results,((s,t)=>(n(),a("li",{key:t,class:[{"jskos-vue-conceptSearch-selected":t===e.searchSelected},"jskos-vue-conceptSearch-results-item"],onClick:s=>e.chooseResult(t),onMouseover:s=>e.mouseover(t)},[m("span",{innerHTML:e.highlightQueryInResult(s[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(n(),a("li",P,[v(" TODO: Add other languages "),O])):v("v-if",!0)],512)],2112))],512),[[w,e.isOpen]])],544)}));I.render=M,I.__scopeId="data-v-3385bd1c";const $=C('',11),D='{"title":"ConceptSearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptSearch.md","lastUpdated":1624870540401}',Q={};const U=Object.assign(Q,{expose:[],setup:function(e){const s=b.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),t={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]};return(e,o)=>(n(),a("div",null,[$,m(I,{scheme:t,registry:j(s)},null,8,["registry"])]))}});export default U;export{D as __pageData};
