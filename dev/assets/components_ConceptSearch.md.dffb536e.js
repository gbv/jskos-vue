import{d as e,g as s,o as n,c as a,w as t,h as o,i as l,j as c,k as p,n as r,V as u,p as i,l as d,m as h,q as v,s as k,v as g,b as m,u as y,x as f,y as S,F as w,z as _,A as q,B as x,C as b,a as C}from"./app.e45e6cd8.js";import"./shared.73f3a6f3.js";const j=e({name:"LoadingIndicator",props:{size:{type:String,default:"sm"},primaryColor:{type:String,default:"lightgray"},secondaryColor:{type:String,default:"blue"}},setup:e=>({sizePixels:s((()=>({sm:9,md:15,lg:21,xl:27}[e.size])))})}),T=t()(((e,s,t,o,l,c)=>(n(),a("div",{style:{border:`${e.sizePixels/3}px solid ${e.primaryColor}`,"border-top":`${e.sizePixels/3}px solid ${e.secondaryColor}`,width:`${e.sizePixels}px`,height:`${e.sizePixels}px`},class:"jskos-vue-loadingIndicator"},null,4))));j.render=T,j.__scopeId="data-v-2891f739";function R(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const I=e({name:"ConceptSearch",components:{LoadingIndicator:j},props:{scheme:{type:Object,required:!0},registry:{type:Object,default:null}},emits:["select"],setup(e,{emit:n}){const a=s((()=>e.registry||e.scheme._registry)),t=c(!1),i=c(!1),d=c(null),h=c(""),v=c(-1),k=c([]),g=c(!1),m=c(null),y=c(null),f=c(null),S=(w=async s=>{if(!a.value)return[];s=s.trim(),k.value=[],t.value=!0;const n=a.value.suggest({search:s,scheme:e.scheme});let o;d.value=n.cancel;try{o=(await n).slice(1).reduce(((e,s)=>e=s.map(((s,n)=>(e[n]||[]).concat(s)))),[])}catch(l){if("canceled"===l.message)return;console.error(l),o=[]}s===h.value.trim()&&(k.value=o,d.value=null,t.value=!1)},_=200,function(){var e=this,s=arguments,n=function(){b=null,x||w.apply(e,s)},a=x&&!b;clearTimeout(b),b=setTimeout(n,_),a&&w.apply(e,s)});var w,_,x,b;p(h,(e=>{v.value=-1,null!=d.value&&(d.value("There was a newer search query."),d.value=null),""===e?(t.value=!1,i.value=!1):(k.value=["Waiting for you to stop typing..."],t.value=!0,i.value=!0,S(e))})),p((()=>e.scheme),((e,s)=>{q.compare(s,e)||(h.value="",k.value=[],i.value=!1,t.value=!1,v.value=-1)}));const C=()=>{i.value=!1},j=s=>{C(),v.value=-1,n("select",{uri:k.value[s][2],inScheme:[e.scheme]}),document.activeElement!==document.body&&document.activeElement.blur()},T=()=>{const e=f.value.childNodes[v.value+1];if(e){const s=e.parentElement.parentElement,n=e.getBoundingClientRect(),a=s.getBoundingClientRect();u.scrollTo(e,100,{container:s,easing:"ease-in",offset:n.bottom>a.bottom?-a.height+n.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return function(e,s=!1){const n=n=>{for(const a of e()){const e=(a.elements||[]).reduce(((e,s)=>e||s&&s.contains(n.target)),!1);!s&&e||a.handler({event:n,isInside:e})}};o((()=>{document.addEventListener("click",n)})),l((()=>{document.removeEventListener("click",n)}))}((()=>[{elements:[m.value],handler:()=>{i.value=!1,v.value=-1}}])),{isLoading:t,isOpen:i,query:h,searchSelected:v,results:k,uniqueID:"abc",openResults:()=>{i.value=""!==h.value},closeResults:C,chooseResult:j,conceptSearch:m,searchInput:y,resultList:f,mouseover(e){g.value||(v.value=e)},mousemove(){g.value=!1},onArrowDown(){g.value=!0,v.value>=k.value.length-1?v.value=0:v.value+=1,T()},onArrowUp(){g.value=!0,v.value<=0?v.value=k.value.length-1:v.value-=1,T()},onEnter(){let e;t.value||0===k.value.length||(e=v.value<0||v.value>=k.value.length?0:v.value,j(e))},highlightQueryInResult:e=>{if(!h.value.length)return e;const s=h.value,n=new RegExp(s,"ig");let a=n.exec(e),t=0,o="";for(;a;){let l=a.index;o+=R(e.slice(t,l))+"<span class='jskos-vue-text-bold'>"+R(e.slice(l,l+s.length))+"</span>",t=l+s.length,a=n.exec(e)}return o+=R(e.slice(t)),o},focus(){y.value.focus()},setQuery(e,s=!1){h.value=e,s?y.value.focus():r((()=>{C()}))}}}}),E=t();i("data-v-3385bd1c");const A={class:"jskos-vue-conceptSearch-results jskos-vue-text-small"},P={key:0,class:"jskos-vue-conceptSearch-loading"},z={ref:"resultList",class:"jskos-vue-conceptSearch-results-list"},L={key:0,class:"jskos-vue-conceptSearch-results-item"},O=m("div",null,"No results",-1);d();const D=E(((e,s,t,o,l,c)=>{const p=h("loading-indicator");return n(),a("div",{ref:"conceptSearch",class:"jskos-vue-conceptSearch",onMousemove:s[8]||(s[8]=(...s)=>e.mousemove&&e.mousemove(...s))},[v(" Input field "),k(m("input",{ref:"searchInput","onUpdate:modelValue":s[1]||(s[1]=s=>e.query=s),placeholder:"Type to search...",onClick:s[2]||(s[2]=(...s)=>e.openResults&&e.openResults(...s)),onKeydown:[s[3]||(s[3]=y(f(((...s)=>e.onArrowDown&&e.onArrowDown(...s)),["prevent"]),["down"])),s[4]||(s[4]=y(f(((...s)=>e.onArrowUp&&e.onArrowUp(...s)),["prevent"]),["up"]))],onKeyup:[s[5]||(s[5]=y(((...s)=>e.onEnter&&e.onEnter(...s)),["enter"])),s[6]||(s[6]=y((s=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:s[7]||(s[7]=(...s)=>e.openResults&&e.openResults(...s))},null,544),[[g,e.query]]),v(" Results "),k(m("div",A,[v(" Loading indicator if necessary "),e.isLoading?(n(),a("div",P,[m(p,{size:"md"})])):(n(),a(w,{key:1},[v(" If not loading, show results "),m("ul",z,[(n(!0),a(w,null,_(e.results,((s,t)=>(n(),a("li",{key:t,class:[{"jskos-vue-conceptSearch-selected":t===e.searchSelected},"jskos-vue-conceptSearch-results-item"],onClick:s=>e.chooseResult(t),onMouseover:s=>e.mouseover(t)},[m("span",{innerHTML:e.highlightQueryInResult(s[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(n(),a("li",L,[v(" TODO: Add other languages "),O])):v("v-if",!0)],512)],2112))],512),[[S,e.isOpen]])],544)}));I.render=D,I.__scopeId="data-v-3385bd1c";const M=C('<h1 id="conceptsearch"><a class="header-anchor" href="#conceptsearch" aria-hidden="true">#</a> ConceptSearch</h1><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>scheme</code> (object) - JSKOS scheme to search in <ul><li>required</li></ul></li><li><code>registry</code> (object) - <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a> registry to access the scheme <ul><li>required if <code>scheme._registry</code> is not defined</li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><p>None</p><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>focus()</code> - focuses the input field</li><li><code>setQuery(newQuery, focus = false)</code> - sets the query (input field) to <code>newQuery</code>; optionally focuses the input field</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a search result is selected (either via click or enter).</li><li>Parameter is the JSKOS concept of the selected result (with <code>uri</code> and <code>inScheme</code> properties).</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',10),$=C('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConceptSearch</span>\n    <span class="token attr-name">:scheme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scheme<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:registry</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>registry<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ConceptSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">const</span> registry <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n  api<span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> scheme <span class="token operator">=</span> <span class="token punctuation">{</span>\n  uri<span class="token operator">:</span> <span class="token string">&quot;http://dewey.info/scheme/edition/e23/&quot;</span><span class="token punctuation">,</span>\n  license<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      uri<span class="token operator">:</span> <span class="token string">&quot;http://creativecommons.org/licenses/by-nc-nd/3.0/&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),Q='{"title":"ConceptSearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptSearch.md","lastUpdated":1624875566924}',V={};const N=Object.assign(V,{expose:[],setup:function(e){const s=x.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),t={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]};return(e,o)=>(n(),a("div",null,[M,m(I,{scheme:t,registry:b(s)},null,8,["registry"]),$]))}});export default N;export{Q as __pageData};