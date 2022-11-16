import"./chunks/ItemName.b42d4d5a.js";import"./chunks/ItemList.17c44198.js";import{L as a}from"./chunks/ItemDetails.0d57f550.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/Arrow.3916db28.js";import"./chunks/AutoLink.917c2d13.js";import"./chunks/ConceptTree.8287f3c2.js";import"./chunks/ItemSuggest.f4008f8f.js";import{o as t,c as p,a as e,x as o,e as n}from"./app.5e7cbef3.js";import"./chunks/utils.a5bf753d.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/style.e065a504.js";const c=n('<h1 id="licenseinfo" tabindex="-1">LicenseInfo <a class="header-anchor" href="#licenseinfo" aria-hidden="true">#</a></h1><p>Component to display license information for a JSKOS item.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>item</code> (object) - JSKOS item (concept or concept scheme) <ul><li>required</li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2>',5),l=n(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> LicenseInfo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>

<span class="token keyword">const</span> item <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">license</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;http://creativecommons.org/publicdomain/zero/1.0/&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;http://example.com/license/&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">publisher</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;https://www.gbv.de&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;VZG&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>license-info</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),I='{"title":"LicenseInfo","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/LicenseInfo.md"}',r={},w=Object.assign(r,{__name:"LicenseInfo",setup(i){const s={license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]};return(u,k)=>(t(),p("div",null,[c,e(o(a),{item:s}),l]))}});export{I as __pageData,w as default};
