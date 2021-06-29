import{g as s,o as n,c as a,b as t,u as e,a as o}from"./app.8613c751.js";import{_ as p}from"./ConceptSearch.47356921.js";import"./LoadingIndicator.5f377c22.js";import"./shared.690f4af6.js";const c=o('<h1 id="conceptsearch"><a class="header-anchor" href="#conceptsearch" aria-hidden="true">#</a> ConceptSearch</h1><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>scheme</code> (object) - JSKOS scheme to search in <ul><li>required</li></ul></li><li><code>registry</code> (object) - <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a> registry to access the scheme <ul><li>required if <code>scheme._registry</code> is not defined</li></ul></li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>focus()</code> - focuses the input field</li><li><code>setQuery(newQuery, focus = false)</code> - sets the query (input field) to <code>newQuery</code>; optionally focuses the input field</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a search result is selected (either via click or enter).</li><li>Parameter is the JSKOS concept of the selected result (with <code>uri</code> and <code>inScheme</code> properties).</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',8),l=o('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ConceptSearch</span>\n    <span class="token attr-name">:scheme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scheme<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:registry</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>registry<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ConceptSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">const</span> registry <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n  api<span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> scheme <span class="token operator">=</span> <span class="token punctuation">{</span>\n  uri<span class="token operator">:</span> <span class="token string">&quot;http://dewey.info/scheme/edition/e23/&quot;</span><span class="token punctuation">,</span>\n  license<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      uri<span class="token operator">:</span> <span class="token string">&quot;http://creativecommons.org/licenses/by-nc-nd/3.0/&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),i='{"title":"ConceptSearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ConceptSearch.md","lastUpdated":1624965700136}',r={};const u=Object.assign(r,{expose:[],setup:function(o){const i=s.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),r={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]};return(s,o)=>(n(),a("div",null,[c,t(p,{scheme:r,registry:e(i)},null,8,["registry"]),l]))}});export default u;export{i as __pageData};
