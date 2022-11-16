import{_ as e,o as s,c as t,e as o}from"./app.5e7cbef3.js";const k='{"title":"cdkRegistryToSuggestFunction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Parameters","slug":"parameters"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"utilities/cdkRegistryToSuggestFunction.md"}',a={},n=o(`<h1 id="cdkregistrytosuggestfunction" tabindex="-1">cdkRegistryToSuggestFunction <a class="header-anchor" href="#cdkregistrytosuggestfunction" aria-hidden="true">#</a></h1><p>Helper function that converts a <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a> registry into a suggest function for concepts that can be used with <a href="./../components/ItemSuggest.html">ItemSuggest</a>.</p><p>By default, it will use <code>suggest</code> (i.e. for concepts). With the parameter <code>options.voc</code>, it is possible to use <code>vocSuggest</code> for concept schemes instead.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
<span class="token keyword">const</span> suggest <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">cdkRegistryToSuggestFunction</span><span class="token punctuation">(</span>registry<span class="token punctuation">,</span> <span class="token punctuation">{</span> voc <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> scheme <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-hidden="true">#</a></h2><ul><li><code>registry</code> (object) - a registry object initialized by <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a></li><li><code>options</code> (object) <ul><li><code>options.scheme</code> (object) - JSKOS concept scheme to suggest concepts from</li><li><code>options.voc</code> (boolean) - whether to use <code>vocSuggest</code> instead of <code>suggest</code></li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2><p>Please refer to <a href="./../components/ItemSuggest.html">ItemSuggest</a> for examples.</p>`,8),c=[n];function r(i,p,l,u,d,g){return s(),t("div",null,c)}var m=e(a,[["render",r]]);export{k as __pageData,m as default};
