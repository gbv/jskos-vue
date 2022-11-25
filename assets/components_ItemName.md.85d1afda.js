import{g as d,o as a,c as s,b as t,d as l,F as u,l as i,e as k,j as m,t as h,a as f}from"./app.5e7cbef3.js";import{I as q}from"./chunks/ItemName.aa105fd6.js";import{j as r}from"./chunks/utils.a5bf753d.js";import"./chunks/shared.3f0a6f78.js";const y=k(`<h1 id="itemname" tabindex="-1">ItemName <a class="header-anchor" href="#itemname" aria-hidden="true">#</a></h1><p>Represents a JSKOS item (concept or concept scheme) with its notation and label.</p><p>Uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and is draggable by default.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>item</code> (object) - JSKOS item <ul><li>required</li></ul></li><li><code>showNotation</code> (boolean) - whether to show the item&#39;s notation <ul><li>default: <code>true</code></li></ul></li><li><code>showLabel</code> (boolean) - whether to show the item&#39;s label (<code>prefLabel</code>) <ul><li>default: <code>true</code></li></ul></li><li><code>fallbackLabel</code> (string) - string that will be shown if both notation and label are empty <ul><li>default: &quot;???&quot;</li></ul></li><li><code>language</code> (string) - preferred language for the label <ul><li>default: uses <a href="https://gbv.github.io/jskos-tools/#languagepreference" target="_blank" rel="noopener noreferrer">jskos-tools&#39; languagePreference</a></li></ul></li><li><code>clickable</code> (boolean) - adjusts mouse pointer and text decoration on hover if <code>true</code><ul><li>default: <code>false</code></li></ul></li><li><code>draggable</code> (boolean) - whether the item is draggable <ul><li>default: <code>true</code></li></ul></li></ul><h2 id="plugins-for-notations-and-labels" tabindex="-1">Plugins for notations and labels <a class="header-anchor" href="#plugins-for-notations-and-labels" aria-hidden="true">#</a></h2><p>You can adjust how notations/labels are processed in <code>ItemName</code> by providing plugins. A plugin is a simple function that receives the current label/notation and the component&#39;s props as parameters and returns the processed label/notation. Plugins can be added on the imported component directly using the provided <code>addLabelPlugin</code> and <code>addNotationPlugin</code> methods.</p><p>For example, you can use the following snippet to add trailing zeros to DDC notations in the first two levels:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
ItemName<span class="token punctuation">.</span><span class="token function">addNotationPlugin</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">notation<span class="token punctuation">,</span> <span class="token punctuation">{</span> item <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> fill <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
  <span class="token comment">// For DDC and SDNB only: fill number notation with trailing zeros</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>jskos<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">uri</span> <span class="token operator">:</span> <span class="token string">&quot;http://dewey.info/scheme/edition/e23/&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">identifier</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;http://bartoc.org/en/node/241&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;http://bartoc.org/en/node/18497&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;http://www.wikidata.org/entity/Q67011877&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;http://id.loc.gov/vocabulary/classSchemes/sdnb&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;http://uri.gbv.de/terminology/sdnb&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span>inScheme <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>inScheme<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isNaN</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>notation<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>notation<span class="token punctuation">.</span>length <span class="token operator">+</span> fill<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fill <span class="token operator">+=</span> <span class="token string">&quot;0&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fill<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Using the shared \`jskos-vue-text-lightGrey\` CSS class</span>
    notation <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;span class=&#39;jskos-vue-text-lightGrey&#39;&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>fill<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span&gt;</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> notation
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2>`,10),b=["onClick"],v=k(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
    Change language:
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span>
      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(language, index) in state.languages<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span>
        <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">@click.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.languages.move(index, 0)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        {{ language }}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span> -
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>
      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(concept, index) in concepts<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-name</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concept<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>

<span class="token comment">// Setup jskos-tools&#39; languagePreference</span>
<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">languages</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;en&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;de&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;fr&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
jskos<span class="token punctuation">.</span>languagePreference<span class="token punctuation">.</span>store <span class="token operator">=</span> state
jskos<span class="token punctuation">.</span>languagePreference<span class="token punctuation">.</span>path <span class="token operator">=</span> <span class="token string">&quot;languages&quot;</span>

<span class="token comment">// Add move method to arrays</span>
<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">move</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">from<span class="token punctuation">,</span> to</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>to<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>from<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> concept1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;EX&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> concept2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;EX&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;Example&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;Beispiel&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">fr</span><span class="token operator">:</span> <span class="token string">&quot;Exemple&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> concept3 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> concepts <span class="token operator">=</span> <span class="token punctuation">[</span>
  concept1<span class="token punctuation">,</span>
  concept2<span class="token punctuation">,</span>
  concept3<span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),A='{"title":"ItemName","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Plugins for notations and labels","slug":"plugins-for-notations-and-labels"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemName.md"}',w={},C=Object.assign(w,{__name:"ItemName",setup(_){const p=d({languages:["en","de","fr"]});r.languagePreference.store=p,r.languagePreference.path="languages",Array.prototype.move=function(e,c){return this.splice(c,0,this.splice(e,1)[0]),this};const g=[{notation:["EX"]},{notation:["EX"],prefLabel:{en:"Example",de:"Beispiel",fr:"Exemple"}},{}];return(e,c)=>(a(),s("div",null,[y,t("p",null,[l(" Change language: "),(a(!0),s(u,null,i(p.languages,(o,n)=>(a(),s("span",{key:n},[t("a",{href:"",onClick:m(P=>p.languages.move(n,0),["prevent"])},h(o),9,b),l(" - ")]))),128))]),t("ul",null,[(a(),s(u,null,i(g,(o,n)=>t("li",{key:n},[f(q,{item:o},null,8,["item"])])),64))]),v]))}});export{A as __pageData,C as default};
