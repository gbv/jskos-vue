import{o as a,c as s,r as n,e as t,t as p,b as e,f as o,a as l}from"./app.de95b7d4.js";const c={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},u={key:1};c.render=function(e,o,l,c,i,k){return l.href.startsWith("http://")||l.href.startsWith("https://")?(a(),s("a",{key:0,href:l.href,target:"_blank"},[n(e.$slots,"default",{},(()=>[t(p(l.text||l.href),1)]))],8,["href"])):(a(),s("span",u,[n(e.$slots,"default",{},(()=>[t(p(l.text||l.href),1)]))]))};const i=l('<h1 id="autolink"><a class="header-anchor" href="#autolink" aria-hidden="true">#</a> AutoLink</h1><p>Replacement for the <code>&lt;a&gt;</code> element that automatically links the URL if it&#39;s valid, and only shows text if it&#39;s invalid.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>href</code> (string) - a string that could be a URL</li><li><code>text</code> (string) - text shown for the link <ul><li>default: <code>href</code> property</li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li>default: Alternative to the <code>text</code> property.</li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><p>None</p><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><p>None</p><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',11),k=t("URL without text: "),r=t("URL with text (via prop): "),h=t("URL with text (via slot): "),g=t("coli-conc"),d=t("Not a URL (show as text): "),f=l('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL without text: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL with text (via prop): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>coli-conc<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>URL with text (via slot): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://coli-conc.gbv.de<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>coli-conc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>auto-link</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span>Not a URL (show as text): <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>auto-link</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>some text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> AutoLink <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),v='{"title":"AutoLink","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/AutoLink.md","lastUpdated":1624955647363}',m={};const x=Object.assign(m,{expose:[],setup:function(n){return(n,t)=>(a(),s("div",null,[i,e("ul",null,[e("li",null,[k,e(c,{href:"https://coli-conc.gbv.de"})]),e("li",null,[r,e(c,{href:"https://coli-conc.gbv.de",text:"coli-conc"})]),e("li",null,[h,e(c,{href:"https://coli-conc.gbv.de"},{default:o((()=>[g])),_:1})]),e("li",null,[d,e(c,{href:"some text"})])]),f]))}});export default x;export{v as __pageData};
