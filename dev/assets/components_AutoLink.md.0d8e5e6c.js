import{o as a,c as s,b as n,f as t,a as p,d as o}from"./app.b3c3cf0c.js";import{_ as e}from"./AutoLink.3da61a23.js";const l=p('<h1 id="autolink"><a class="header-anchor" href="#autolink" aria-hidden="true">#</a> AutoLink</h1><p>Replacement for the <code>&lt;a&gt;</code> element that automatically links the URL if it&#39;s valid, and only shows text if it&#39;s invalid.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>href</code> (string) - a string that could be a URL</li><li><code>text</code> (string) - text shown for the link <ul><li>default: <code>href</code> property</li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li>default: Alternative to the <code>text</code> property.</li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',7),c=o("URL without text: "),u=o("URL with text (via prop): "),i=o("URL with text (via slot): "),k=o("coli-conc"),r=o("Not a URL (show as text): "),g=p('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL without text: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL with text (via prop): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>coli-conc<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL with text (via slot): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>coli-conc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>auto-link</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Not a URL (show as text): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>some text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> AutoLink <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),h='{"title":"AutoLink","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/AutoLink.md","lastUpdated":1626089783105}',d={};const f=Object.assign(d,{expose:[],setup:function(p){return(p,o)=>(a(),s("div",null,[l,n("ul",null,[n("li",null,[c,n(e,{href:"https://coli-conc.gbv.de"})]),n("li",null,[u,n(e,{href:"https://coli-conc.gbv.de",text:"coli-conc"})]),n("li",null,[i,n(e,{href:"https://coli-conc.gbv.de"},{default:t((()=>[k])),_:1})]),n("li",null,[r,n(e,{href:"some text"})])]),g]))}});export default f;export{h as __pageData};
