import{e,y as s,E as l,G as t,v as u,x as a,V as n,n as o,o as r,c,p as i,C as v,H as g,b as d,I as p,k as m,D as h,F as f,q as y,w as k}from"./app.84d78238.js";import{_ as w}from"./LoadingIndicator.b951b7d2.js";import{a as R,b as j}from"./utils.2e583d56.js";import"./shared.99084317.js";function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const b=e({name:"ItemSuggest",components:{LoadingIndicator:w},props:{search:{type:Function,default:null}},emits:["select"],setup(e,{emit:u}){const a=s(!1),o=s(!1),r=s(null),c=s(""),i=s(-1),v=s([]),g=s(!1),d=s(null),p=s(null),m=s(null),h=j((async s=>{s=s.trim(),v.value=[],a.value=!0;const l=e.search(s);let t;r.value=l.cancel;try{t=(await l).slice(1).reduce(((e,s)=>e=s.map(((s,l)=>(e[l]||[]).concat(s)))),[])}catch(u){if("canceled"===u.message)return;console.error(u),t=[]}s===c.value.trim()&&(v.value=t,r.value=null,a.value=!1)}),200);l(c,(e=>{i.value=-1,null!=r.value&&(r.value("There was a newer search query."),r.value=null),""===e?(a.value=!1,o.value=!1):(v.value=["Waiting for you to stop typing..."],a.value=!0,o.value=!0,h(e))}));const f=()=>{o.value=!1},y=e=>{f(),i.value=-1,u("select",{uri:v.value[e][2]}),document.activeElement!==document.body&&document.activeElement.blur()},k=()=>{const e=m.value.childNodes[i.value+1];if(e){const s=e.parentElement.parentElement,l=e.getBoundingClientRect(),t=s.getBoundingClientRect();n.scrollTo(e,100,{container:s,easing:"ease-in",offset:l.bottom>t.bottom?-t.height+l.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return R((()=>[{elements:[d.value],handler:()=>{o.value=!1,i.value=-1}}])),{isLoading:a,isOpen:o,query:c,searchSelected:i,results:v,uniqueID:"abc",openResults:()=>{o.value=""!==c.value},closeResults:f,chooseResult:y,itemSuggest:d,searchInput:p,resultList:m,mouseover(e){g.value||(i.value=e)},mousemove(){g.value=!1},onArrowDown(){g.value=!0,i.value>=v.value.length-1?i.value=0:i.value+=1,k()},onArrowUp(){g.value=!0,i.value<=0?i.value=v.value.length-1:i.value-=1,k()},onEnter(){let e;a.value||0===v.value.length||(e=i.value<0||i.value>=v.value.length?0:i.value,y(e))},highlightQueryInResult:e=>{if(!c.value.length)return e;const s=c.value,l=new RegExp(s,"ig");let t=l.exec(e),u=0,a="";for(;t;){let n=t.index;a+=I(e.slice(u,n))+"<span class='jskos-vue-text-bold'>"+I(e.slice(n,n+s.length))+"</span>",u=n+s.length,t=l.exec(e)}return a+=I(e.slice(u)),a},focus(){p.value.focus()},setQuery(e,s=!1){c.value=e,s?p.value.focus():t((()=>{f()}))}}}}),S=k("data-v-c88d3a6c");u("data-v-c88d3a6c");const x={class:"jskos-vue-itemSuggest-results jskos-vue-text-small"},E={key:0,class:"jskos-vue-itemSuggest-loading"},L={ref:"resultList",class:"jskos-vue-itemSuggest-results-list"},q={key:0,class:"jskos-vue-itemSuggest-results-item"},A=d("div",null,"No results",-1);a();const C=S(((e,s,l,t,u,a)=>{const n=o("loading-indicator");return r(),c("div",{ref:"itemSuggest",class:"jskos-vue-itemSuggest",onMousemove:s[8]||(s[8]=(...s)=>e.mousemove&&e.mousemove(...s))},[i(" Input field "),v(d("input",{ref:"searchInput","onUpdate:modelValue":s[1]||(s[1]=s=>e.query=s),placeholder:"Type to search...",onClick:s[2]||(s[2]=(...s)=>e.openResults&&e.openResults(...s)),onKeydown:[s[3]||(s[3]=p(m(((...s)=>e.onArrowDown&&e.onArrowDown(...s)),["prevent"]),["down"])),s[4]||(s[4]=p(m(((...s)=>e.onArrowUp&&e.onArrowUp(...s)),["prevent"]),["up"]))],onKeyup:[s[5]||(s[5]=p(((...s)=>e.onEnter&&e.onEnter(...s)),["enter"])),s[6]||(s[6]=p((s=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:s[7]||(s[7]=(...s)=>e.openResults&&e.openResults(...s))},null,544),[[g,e.query]]),i(" Results "),v(d("div",x,[i(" Loading indicator if necessary "),e.isLoading?(r(),c("div",E,[d(n,{size:"md"})])):(r(),c(f,{key:1},[i(" If not loading, show results "),d("ul",L,[(r(!0),c(f,null,y(e.results,((s,l)=>(r(),c("li",{key:l,class:[{"jskos-vue-itemSuggest-selected":l===e.searchSelected},"jskos-vue-itemSuggest-results-item"],onClick:s=>e.chooseResult(l),onMouseover:s=>e.mouseover(l)},[d("span",{innerHTML:e.highlightQueryInResult(s[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(r(),c("li",q,[i(" TODO: Add other languages "),A])):i("v-if",!0)],512)],2112))],512),[[h,e.isOpen]])],544)}));b.render=C,b.__scopeId="data-v-c88d3a6c";export{b as _};