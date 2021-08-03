import{f as n,j as s,g as a,h as t,o as p,c as e,b as o,t as c,u as l,w as u,i,a as r}from"./app.299cedce.js";import{_ as k}from"./ConceptTree.7321feed.js";import"./ItemList.a012caf4.js";import"./ItemName.659e824e.js";import"./utils.9c5057b1.js";import"./shared.99084317.js";import"./LoadingIndicator.55435477.js";import"./Arrow.d28dcfac.js";const d=r('<h1 id="concepttree"><a class="header-anchor" href="#concepttree" aria-hidden="true">#</a> ConceptTree</h1><p>Component to display a concept tree.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>modelValue</code> (object, v-model) - currently selected concept <ul><li>default: <code>null</code></li></ul></li><li><code>concepts</code> (array) - array of JSKOS concepts to be displayed <ul><li>required</li></ul></li><li><code>hierarchy</code> (boolean) - whether to display concept hierarchy (via <code>narrower</code> property) <ul><li>default: <code>true</code></li></ul></li><li><code>itemListOptions</code> (object) - options that are passed along to <a href="./ItemList.html">ItemList</a> via v-bind <ul><li>default: <code>{}</code></li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li><code>beforeItem</code>: Content shown before an item (includes parameter <code>item</code> that contains the concept).</li><li><code>afterItem</code>: Content shown after an item (includes parameter <code>item</code> that contains the concept).</li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>scrollToUri(uri)</code> - scrolls the list to a certain item via its URI</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a concept is selected.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS concept) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li><li><code>open</code><ul><li>Emitted when a concept&#39;s narrower concepts are opened.</li><li>Parameter is the JSKOS concept.</li></ul></li><li><code>close</code><ul><li>Emitted when a concept&#39;s narrower concepts are closed.</li><li>Parameter is the JSKOS concept.</li></ul></li><li><code>update:modelValue</code><ul><li>Used to push changes to v-model value. Will always be emitted together with <code>select</code>.</li></ul></li></ul><h2 id="css-variables"><a class="header-anchor" href="#css-variables" aria-hidden="true">#</a> CSS Variables</h2><ul><li><code>--jskos-vue-conceptTree-selected-bgColor</code> - row background color for selected concept (v-model) <ul><li>default: <code>#fdbd58aa</code></li></ul></li><li><code>--jskos-vue-conceptTree-hover-bgColor</code> - row hover background color <ul><li>default: <code>#fdbd58aa</code></li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',13),h={key:1},m=r('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ConceptTree <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">let</span> registry\n<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  scheme<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n  <span class="token keyword">async</span> <span class="token function">loadScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>scheme <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> registry<span class="token punctuation">.</span><span class="token function">getSchemes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      params<span class="token operator">:</span> <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://www.ixtheo.de/classification/&quot;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  concepts<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n  <span class="token keyword">async</span> <span class="token function">loadConcepts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>concepts <span class="token operator">=</span> jskos<span class="token punctuation">.</span><span class="token function">sortConcepts</span><span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scheme<span class="token punctuation">.</span><span class="token function">_getTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token keyword">async</span> <span class="token function">loadNarrower</span><span class="token punctuation">(</span><span class="token parameter">concept</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>concept<span class="token punctuation">.</span>narrower <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>concept<span class="token punctuation">.</span>narrower<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span>\n    <span class="token punctuation">}</span>\n    concept<span class="token punctuation">.</span>narrower <span class="token operator">=</span> jskos<span class="token punctuation">.</span><span class="token function">sortConcepts</span><span class="token punctuation">(</span><span class="token keyword">await</span> concept<span class="token punctuation">.</span><span class="token function">_getNarrower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  selected<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  registry <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n    api<span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token keyword">await</span> state<span class="token punctuation">.</span><span class="token function">loadScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token keyword">await</span> state<span class="token punctuation">.</span><span class="token function">loadConcepts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\n    Selected: {{ state.selected &amp;&amp; state.selected.uri || &quot;none&quot; }}\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>concept-tree</span>\n    <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.concepts<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.selected<span class="token punctuation">&quot;</span></span>\n    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">overflow</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 2px solid #0001<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>\n    <span class="token attr-name">:concepts</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.concepts<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@open</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.loadNarrower($event)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>beforeItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>\n        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>opacity-hover<span class="token punctuation">&quot;</span></span>\n        <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">margin-right</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>\n        <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(`Clicked on Star for item ${item.uri}`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        ⭐️\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>opacity-hover<span class="token punctuation">&quot;</span></span>\n        <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>\n        <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(`Clicked on Rocket for item ${item.uri}`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        🚀\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>concept-tree</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span>\n    Loading concepts...\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n<span class="token selector">.opacity-hover:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">opacity</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),g='{"title":"ConceptTree","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptTree.md","lastUpdated":1627992735694}',w={};const y=Object.assign(w,{setup:function(r){let g;const w=n({scheme:null,async loadScheme(){this.scheme=(await g.getSchemes({params:{uri:"https://www.ixtheo.de/classification/"}}))[0]},concepts:null,async loadConcepts(){this.concepts=s.exports.sortConcepts(await this.scheme._getTop())},async loadNarrower(n){n.narrower&&!n.narrower.includes(null)||(n.narrower=s.exports.sortConcepts(await n._getNarrower()))},selected:null});a((async()=>{g=t.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),await w.loadScheme(),await w.loadConcepts()}));const y=(...n)=>window.alert(...n);return(n,s)=>(p(),e("div",null,[d,o("p",null," Selected: "+c(l(w).selected&&l(w).selected.uri||"none"),1),l(w).concepts?(p(),e(k,{key:0,modelValue:l(w).selected,"onUpdate:modelValue":s[1]||(s[1]=n=>l(w).selected=n),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:l(w).concepts,onOpen:s[2]||(s[2]=n=>l(w).loadNarrower(n))},{beforeItem:u((({item:n})=>[o("span",{class:"opacity-hover",style:{"margin-right":"5px"},onClick:i((s=>y(`Clicked on Star for item ${n.uri}`)),["stop"])}," ⭐️ ",8,["onClick"])])),afterItem:u((({item:n})=>[o("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:i((s=>y(`Clicked on Rocket for item ${n.uri}`)),["stop"])}," 🚀 ",8,["onClick"])])),_:1},8,["modelValue","concepts"])):(p(),e("div",h," Loading concepts... ")),m]))}});export{g as __pageData,y as default};
