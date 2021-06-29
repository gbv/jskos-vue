import{o as a,c as s,b as n,F as t,B as p,d as o,t as e,a as l}from"./app.8613c751.js";import{_ as c}from"./LoadingIndicator.5f377c22.js";import"./shared.690f4af6.js";const u=l('<h1 id="loadingindicator"><a class="header-anchor" href="#loadingindicator" aria-hidden="true">#</a> LoadingIndicator</h1><p>Spinning loading indicator.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>size</code> (string) - sm/md/lg/xl <ul><li>default: md</li></ul></li></ul><h2 id="css-variables"><a class="header-anchor" href="#css-variables" aria-hidden="true">#</a> CSS Variables</h2><ul><li><code>--jskos-vue-loadingIndicator-primary-color</code> - color of the ring <ul><li>default: lightgray</li></ul></li><li><code>--jskos-vue-loadingIndicator-secondary-color</code> - color of the spinner <ul><li>default: blue</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',7),i=o(" Different color: "),r=l('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size in [<span class="token punctuation">&#39;</span>sm<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>md<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>lg<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>xl<span class="token punctuation">&#39;</span>]<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      {{ size }}: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loading-indicator</span> <span class="token attr-name">:size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>size<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>\n      Different color: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>loading-indicator</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">--jskos-vue-loadingIndicator-secondary-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> LoadingIndicator <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),k='{"title":"LoadingIndicator","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/LoadingIndicator.md","lastUpdated":1624965811376}',d={};const g=Object.assign(d,{expose:[],setup:function(l){return(l,k)=>(a(),s("div",null,[u,n("ul",null,[(a(),s(t,null,p(["sm","md","lg","xl"],(a=>n("li",{key:a},[o(e(a)+": ",1),n(c,{size:a},null,8,["size"])]))),64)),n("li",null,[i,n(c,{style:{"--jskos-vue-loadingIndicator-secondary-color":"red"}})])]),r]))}});export default g;export{k as __pageData};
