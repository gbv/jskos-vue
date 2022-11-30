import{g as h,h as m,o as p,c as l,b as e,t as g,i as y,w as u,e as k,j as i}from"./app.5e7cbef3.js";import{C as w}from"./chunks/ConceptTree.a2ff6510.js";import{j as r}from"./chunks/utils.a5bf753d.js";import{c as v}from"./chunks/index.0481e8fb.js";import"./chunks/ItemList.37706ccd.js";import"./chunks/ItemName.aa105fd6.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/Arrow.3916db28.js";const f=k('<h1 id="concepttree" tabindex="-1">ConceptTree <a class="header-anchor" href="#concepttree" aria-hidden="true">#</a></h1><p>Component to display a concept tree.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>modelValue</code> (object, v-model) - currently selected concept <ul><li>default: <code>null</code></li></ul></li><li><code>concepts</code> (array) - array of JSKOS concepts to be displayed <ul><li>required</li></ul></li><li><code>hierarchy</code> (boolean) - whether to display concept hierarchy (via <code>narrower</code> property) <ul><li>default: <code>true</code></li></ul></li><li><code>itemListOptions</code> (object) - options that are passed along to <a href="./ItemList.html">ItemList</a> via v-bind <ul><li>default: <code>{}</code></li></ul></li></ul><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><ul><li><code>beforeItem</code>: Content shown before an item (includes parameter <code>item</code> that contains the concept).</li><li><code>afterItem</code>: Content shown after an item (includes parameter <code>item</code> that contains the concept).</li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><ul><li><code>scrollToUri(uri)</code> - scrolls the list to a certain item via its URI</li></ul><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><ul><li><code>select</code><ul><li>Emitted when a concept is selected.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS concept) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li><li><code>open</code><ul><li>Emitted when a concept&#39;s narrower concepts are opened.</li><li>Parameter is the JSKOS concept.</li></ul></li><li><code>close</code><ul><li>Emitted when a concept&#39;s narrower concepts are closed.</li><li>Parameter is the JSKOS concept.</li></ul></li><li><code>update:modelValue</code><ul><li>Used to push changes to v-model value. Will always be emitted together with <code>select</code>.</li></ul></li></ul><h2 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-hidden="true">#</a></h2><ul><li><code>--jskos-vue-conceptTree-selected-bgColor</code> - row background color for selected concept (v-model) <ul><li>default: <code>#fdbd58aa</code></li></ul></li><li><code>--jskos-vue-conceptTree-hover-bgColor</code> - row hover background color <ul><li>default: <code>#fdbd58aa</code></li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2>',13),q=["onClick"],_=["onClick"],b={key:1},C=k(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ConceptTree <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">let</span> registry
<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">scheme</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">loadScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scheme <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> registry<span class="token punctuation">.</span><span class="token function">getSchemes</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://www.ixtheo.de/classification/&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">concepts</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">loadConcepts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>concepts <span class="token operator">=</span> jskos<span class="token punctuation">.</span><span class="token function">sortConcepts</span><span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scheme<span class="token punctuation">.</span><span class="token function">_getTop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token function">loadNarrower</span><span class="token punctuation">(</span><span class="token parameter">concept</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>concept<span class="token punctuation">.</span>narrower <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>concept<span class="token punctuation">.</span>narrower<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    concept<span class="token punctuation">.</span>narrower <span class="token operator">=</span> jskos<span class="token punctuation">.</span><span class="token function">sortConcepts</span><span class="token punctuation">(</span><span class="token keyword">await</span> concept<span class="token punctuation">.</span><span class="token function">_getNarrower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">selected</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  registry <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">provider</span><span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">api</span><span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> state<span class="token punctuation">.</span><span class="token function">loadScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">await</span> state<span class="token punctuation">.</span><span class="token function">loadConcepts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
    Selected: {{ state.selected &amp;&amp; state.selected.uri || &quot;none&quot; }}
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>concept-tree</span>
    <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.concepts<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.selected<span class="token punctuation">&quot;</span></span>
    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span> <span class="token property">overflow</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 2px solid #0001<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
    <span class="token attr-name">:concepts</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.concepts<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">@open</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.loadNarrower($event)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>beforeItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>opacity-hover<span class="token punctuation">&quot;</span></span>
        <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">margin-right</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
        <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(\`Clicked on Star for item \${item.uri}\`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        \u2B50\uFE0F
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>opacity-hover<span class="token punctuation">&quot;</span></span>
        <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-50%<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
        <span class="token attr-name">@click.stop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(\`Clicked on Rocket for item \${item.uri}\`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        \u{1F680}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>concept-tree</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-else</span><span class="token punctuation">&gt;</span></span>
    Loading concepts...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.opacity-hover:hover</span> <span class="token punctuation">{</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),$='{"title":"ConceptTree","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptTree.md"}',S={},M=Object.assign(S,{__name:"ConceptTree",setup(x){let o;const n=h({scheme:null,async loadScheme(){this.scheme=(await o.getSchemes({params:{uri:"https://www.ixtheo.de/classification/"}}))[0]},concepts:null,async loadConcepts(){this.concepts=r.sortConcepts(await this.scheme._getTop())},async loadNarrower(s){s.narrower&&!s.narrower.includes(null)||(s.narrower=r.sortConcepts(await s._getNarrower()))},selected:null});m(async()=>{o=v.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),await n.loadScheme(),await n.loadConcepts()});const c=(...s)=>window.alert(...s);return(s,t)=>(p(),l("div",null,[f,e("p",null," Selected: "+g(n.selected&&n.selected.uri||"none"),1),n.concepts?(p(),y(w,{key:0,modelValue:n.selected,"onUpdate:modelValue":t[0]||(t[0]=a=>n.selected=a),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:n.concepts,onOpen:t[1]||(t[1]=a=>n.loadNarrower(a))},{beforeItem:u(({item:a})=>[e("span",{class:"opacity-hover",style:{"margin-right":"5px"},onClick:i(d=>c(`Clicked on Star for item ${a.uri}`),["stop"])}," \u2B50\uFE0F ",8,q)]),afterItem:u(({item:a})=>[e("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:i(d=>c(`Clicked on Rocket for item ${a.uri}`),["stop"])}," \u{1F680} ",8,_)]),_:1},8,["modelValue","concepts"])):(p(),l("div",b," Loading concepts... ")),C]))}});export{$ as __pageData,M as default};
