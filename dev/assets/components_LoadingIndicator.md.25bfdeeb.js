import{L as n}from"./chunks/LoadingIndicator.35e914a0.js";import{o as t,c as p,b as s,F as c,l as i,d as e,a as o,e as l,t as u}from"./app.58ffbb48.js";import"./chunks/shared.3f0a6f78.js";const r=l('<h1 id="loadingindicator" tabindex="-1">LoadingIndicator <a class="header-anchor" href="#loadingindicator" aria-hidden="true">#</a></h1><p>Spinning loading indicator.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>size</code> (string) - sm/md/lg/xl <ul><li>default: md</li></ul></li></ul><h2 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-hidden="true">#</a></h2><ul><li><code>--jskos-vue-loadingIndicator-primary-color</code> - color of the ring <ul><li>default: <code>lightgray</code></li></ul></li><li><code>--jskos-vue-loadingIndicator-secondary-color</code> - color of the spinner <ul><li>default: <code>blue</code></li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2>',7),d=l(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size in [&#39;sm&#39;, &#39;md&#39;, &#39;lg&#39;, &#39;xl&#39;]<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      {{ size }}: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loading-indicator</span> <span class="token attr-name">:size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>
      Different color: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loading-indicator</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">--jskos-vue-loadingIndicator-secondary-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> LoadingIndicator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),x='{"title":"LoadingIndicator","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/LoadingIndicator.md"}',k={},q=Object.assign(k,{__name:"LoadingIndicator",setup(g){return(_,m)=>(t(),p("div",null,[r,s("ul",null,[(t(),p(c,null,i(["sm","md","lg","xl"],a=>s("li",{key:a},[e(u(a)+": ",1),o(n,{size:a},null,8,["size"])])),64)),s("li",null,[e(" Different color: "),o(n,{style:{"--jskos-vue-loadingIndicator-secondary-color":"red"}})])]),d]))}});export{x as __pageData,q as default};