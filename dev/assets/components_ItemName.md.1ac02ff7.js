import{f as n,j as s,o as a,c as t,d as p,F as o,v as e,k as c,u as l,t as u,b as i,a as k,e as r}from"./app.d57fb543.js";import{_ as g}from"./ItemName.45ee4917.js";import"./utils.0f4dc86e.js";import"./shared.99084317.js";const d=k('<h1 id="itemname"><a class="header-anchor" href="#itemname" aria-hidden="true">#</a> ItemName</h1><p>Represents a JSKOS item (concept or concept scheme) with its notation and label.</p><p>Uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and is draggable by default.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>item</code> (object) - JSKOS item <ul><li>required</li></ul></li><li><code>showNotation</code> (boolean) - whether to show the item&#39;s notation <ul><li>default: <code>true</code></li></ul></li><li><code>showLabel</code> (boolean) - whether to show the item&#39;s label (<code>prefLabel</code>) <ul><li>default: <code>true</code></li></ul></li><li><code>fallbackLabel</code> (string) - string that will be shown if both notation and label are empty <ul><li>default: &quot;???&quot;</li></ul></li><li><code>language</code> (string) - preferred language for the label <ul><li>default: uses <a href="https://gbv.github.io/jskos-tools/#languagepreference" target="_blank" rel="noopener noreferrer">jskos-tools&#39; languagePreference</a></li></ul></li><li><code>clickable</code> (boolean) - adjusts mouse pointer and text decoration on hover if <code>true</code><ul><li>default: <code>false</code></li></ul></li></ul><h2 id="plugins-for-notations-and-labels"><a class="header-anchor" href="#plugins-for-notations-and-labels" aria-hidden="true">#</a> Plugins for notations and labels</h2><p>You can adjust how notations/labels are processed in <code>ItemName</code> by providing plugins. A plugin is a simple function that receives the current label/notation and the component&#39;s props as parameters and returns the processed label/notation. Plugins can be added on the imported component directly using the provided <code>addLabelPlugin</code> and <code>addNotationPlugin</code> methods.</p><p>For example, you can use the following snippet to add trailing zeros to DDC notations in the first two levels:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\nItemName<span class="token punctuation">.</span><span class="token function">addNotationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">notation<span class="token punctuation">,</span> <span class="token punctuation">{</span> item <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> fill <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>\n  <span class="token comment">// For DDC and SDNB only: fill number notation with trailing zeros</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>jskos<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    uri <span class="token operator">:</span> <span class="token string">&quot;http://dewey.info/scheme/edition/e23/&quot;</span><span class="token punctuation">,</span>\n    identifier <span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token string">&quot;http://bartoc.org/en/node/241&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;http://bartoc.org/en/node/18497&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;http://www.wikidata.org/entity/Q67011877&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;http://id.loc.gov/vocabulary/classSchemes/sdnb&quot;</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;http://uri.gbv.de/terminology/sdnb&quot;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span>inScheme <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>inScheme<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>notation<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">while</span> <span class="token punctuation">(</span>notation<span class="token punctuation">.</span>length <span class="token operator">+</span> fill<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      fill <span class="token operator">+=</span> <span class="token string">&quot;0&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>fill<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Using the shared `jskos-vue-text-lightGrey` CSS class</span>\n    notation <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span class=&#39;jskos-vue-text-lightGrey&#39;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>fill<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">`</span></span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> notation\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',10),m=r(" Change language: "),h=["onClick"],f=r(" - "),q=k('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\n    Change language:\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>\n      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(language, index) in state.languages<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>\n        <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span>\n        <span class="token attr-name">@click.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.languages.move(index, 0)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        {{ language }}\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span> -\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>\n      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(concept, index) in concepts<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-name</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concept<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>\n\n<span class="token comment">// Setup jskos-tools&#39; languagePreference</span>\n<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  languages<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;de&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;fr&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\njskos<span class="token punctuation">.</span>languagePreference<span class="token punctuation">.</span>store <span class="token operator">=</span> state\njskos<span class="token punctuation">.</span>languagePreference<span class="token punctuation">.</span>path <span class="token operator">=</span> <span class="token string">&quot;languages&quot;</span>\n\n<span class="token comment">// Add move method to arrays</span>\n<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">move</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">from<span class="token punctuation">,</span> to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>from<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token keyword">this</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> concept1 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;EX&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> concept2 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;EX&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n    en<span class="token operator">:</span> <span class="token string">&quot;Example&quot;</span><span class="token punctuation">,</span>\n    de<span class="token operator">:</span> <span class="token string">&quot;Beispiel&quot;</span><span class="token punctuation">,</span>\n    fr<span class="token operator">:</span> <span class="token string">&quot;Exemple&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> concept3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> concepts <span class="token operator">=</span> <span class="token punctuation">[</span>\n  concept1<span class="token punctuation">,</span>\n  concept2<span class="token punctuation">,</span>\n  concept3<span class="token punctuation">,</span>\n<span class="token punctuation">]</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),b='{"title":"ItemName","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Plugins for notations and labels","slug":"plugins-for-notations-and-labels"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemName.md","lastUpdated":1644908921151}',v={};const y=Object.assign(v,{setup:function(k){const r=n({languages:["en","de","fr"]});s.exports.languagePreference.store=r,s.exports.languagePreference.path="languages",Array.prototype.move=function(n,s){return this.splice(s,0,this.splice(n,1)[0]),this};const b=[{notation:["EX"]},{notation:["EX"],prefLabel:{en:"Example",de:"Beispiel",fr:"Exemple"}},{}];return(n,s)=>(a(),t("div",null,[d,p("p",null,[m,(a(!0),t(o,null,e(l(r).languages,((n,s)=>(a(),t("span",{key:s},[p("a",{href:"",onClick:c((n=>l(r).languages.move(s,0)),["prevent"])},u(n),9,h),f])))),128))]),p("ul",null,[(a(),t(o,null,e(b,((n,s)=>p("li",{key:s},[i(g,{item:n},null,8,["item"])]))),64))]),q]))}});export{b as __pageData,y as default};
