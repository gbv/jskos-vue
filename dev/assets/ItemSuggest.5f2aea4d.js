import{e,s,B as l,C as t,V as u,m as a,o as n,c as o,n as r,z as i,D as c,b as v,E as g,i as m,A as p,F as d,p as h}from"./app.d6ab46c4.js";import{_ as f}from"./LoadingIndicator.0ed36c8b.js";import{a as y,b as k}from"./utils.e2bdf247.js";import"./shared.99084317.js";function w(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const R=e({name:"ItemSuggest",components:{LoadingIndicator:f},props:{search:{type:Function,default:null}},emits:["select"],setup(e,{emit:a}){const n=s(!1),o=s(!1),r=s(null),i=s(""),c=s(-1),v=s([]),g=s(!1),m=s(null),p=s(null),d=s(null),h=k((async s=>{s=s.trim(),v.value=[],n.value=!0;const l=e.search(s);let t;r.value=l.cancel;try{t=(await l).slice(1).reduce(((e,s)=>e=s.map(((s,l)=>(e[l]||[]).concat(s)))),[])}catch(u){if("canceled"===u.message)return;console.error(u),t=[]}s===i.value.trim()&&(v.value=t,r.value=null,n.value=!1)}),200);l(i,(e=>{c.value=-1,null!=r.value&&(r.value("There was a newer search query."),r.value=null),""===e?(n.value=!1,o.value=!1):(v.value=["Waiting for you to stop typing..."],n.value=!0,o.value=!0,h(e))}));const f=()=>{o.value=!1},R=e=>{f(),c.value=-1,a("select",{uri:v.value[e][2]}),document.activeElement!==document.body&&document.activeElement.blur()},b=()=>{const e=d.value.childNodes[c.value+1];if(e){const s=e.parentElement.parentElement,l=e.getBoundingClientRect(),t=s.getBoundingClientRect();u.scrollTo(e,100,{container:s,easing:"ease-in",offset:l.bottom>t.bottom?-t.height+l.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return y((()=>[{elements:[m.value],handler:()=>{o.value=!1,c.value=-1}}])),{isLoading:n,isOpen:o,query:i,searchSelected:c,results:v,uniqueID:"abc",openResults:()=>{o.value=""!==i.value},closeResults:f,chooseResult:R,itemSuggest:m,searchInput:p,resultList:d,mouseover(e){g.value||(c.value=e)},mousemove(){g.value=!1},onArrowDown(){g.value=!0,c.value>=v.value.length-1?c.value=0:c.value+=1,b()},onArrowUp(){g.value=!0,c.value<=0?c.value=v.value.length-1:c.value-=1,b()},onEnter(){let e;n.value||0===v.value.length||(e=c.value<0||c.value>=v.value.length?0:c.value,R(e))},highlightQueryInResult:e=>{if(!i.value.length)return e;const s=i.value,l=new RegExp(s,"ig");let t=l.exec(e),u=0,a="";for(;t;){let n=t.index;a+=w(e.slice(u,n))+"<span class='jskos-vue-text-bold'>"+w(e.slice(n,n+s.length))+"</span>",u=n+s.length,t=l.exec(e)}return a+=w(e.slice(u)),a},focus(){p.value.focus()},setQuery(e,s=!1){i.value=e,s?p.value.focus():t((()=>{f()}))}}}}),b={class:"jskos-vue-itemSuggest-results jskos-vue-text-small"},j={key:0,class:"jskos-vue-itemSuggest-loading"},S={ref:"resultList",class:"jskos-vue-itemSuggest-results-list"},I={key:0,class:"jskos-vue-itemSuggest-results-item"},E=v("div",null,"No results",-1);R.render=function(e,s,l,t,u,f){const y=a("loading-indicator");return n(),o("div",{ref:"itemSuggest",class:"jskos-vue-itemSuggest",onMousemove:s[8]||(s[8]=(...s)=>e.mousemove&&e.mousemove(...s))},[r(" Input field "),i(v("input",{ref:"searchInput","onUpdate:modelValue":s[1]||(s[1]=s=>e.query=s),placeholder:"Type to search...",onClick:s[2]||(s[2]=(...s)=>e.openResults&&e.openResults(...s)),onKeydown:[s[3]||(s[3]=g(m(((...s)=>e.onArrowDown&&e.onArrowDown(...s)),["prevent"]),["down"])),s[4]||(s[4]=g(m(((...s)=>e.onArrowUp&&e.onArrowUp(...s)),["prevent"]),["up"]))],onKeyup:[s[5]||(s[5]=g(((...s)=>e.onEnter&&e.onEnter(...s)),["enter"])),s[6]||(s[6]=g((s=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:s[7]||(s[7]=(...s)=>e.openResults&&e.openResults(...s))},null,544),[[c,e.query]]),r(" Results "),i(v("div",b,[r(" Loading indicator if necessary "),e.isLoading?(n(),o("div",j,[v(y,{size:"md"})])):(n(),o(d,{key:1},[r(" If not loading, show results "),v("ul",S,[(n(!0),o(d,null,h(e.results,((s,l)=>(n(),o("li",{key:l,class:[{"jskos-vue-itemSuggest-selected":l===e.searchSelected},"jskos-vue-itemSuggest-results-item"],onClick:s=>e.chooseResult(l),onMouseover:s=>e.mouseover(l)},[v("span",{innerHTML:e.highlightQueryInResult(s[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(n(),o("li",I,[r(" TODO: Add other languages "),E])):r("v-if",!0)],512)],2112))],512),[[p,e.isOpen]])],544)};export{R as _};