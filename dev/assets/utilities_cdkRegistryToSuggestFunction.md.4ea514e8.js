import{o as e,c as s,a as t}from"./app.d6ab46c4.js";const a='{"title":"cdkRegistryToSuggestFunction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Parameters","slug":"parameters"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"utilities/cdkRegistryToSuggestFunction.md","lastUpdated":1627980097356}',o={},n=t('<h1 id="cdkregistrytosuggestfunction"><a class="header-anchor" href="#cdkregistrytosuggestfunction" aria-hidden="true">#</a> cdkRegistryToSuggestFunction</h1><p>Helper function that converts a <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a> registry into a suggest function for concepts that can be used with <a href="./../components/ItemSuggest.html">ItemSuggest</a>.</p><p>By default, it will use <code>suggest</code> (i.e. for concepts). With the parameter <code>options.voc</code>, it is possible to use <code>vocSuggest</code> for concept schemes instead.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> suggest <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">cdkRegistryToSuggestFunction</span><span class="token punctuation">(</span>registry<span class="token punctuation">,</span> <span class="token punctuation">{</span> voc <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> scheme <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="parameters"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h2><ul><li><code>registry</code> (object) - a registry object initialized by <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a></li><li><code>options</code> (object) <ul><li><code>options.scheme</code> (object) - JSKOS concept scheme to suggest concepts from</li><li><code>options.voc</code> (boolean) - whether to use <code>vocSuggest</code> instead of <code>suggest</code></li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><p>Please refer to <a href="./../components/ItemSuggest.html">ItemSuggest</a> for examples.</p>',8);o.render=function(t,a,o,c,r,p){return e(),s("div",null,[n])};export{a as __pageData,o as default};
