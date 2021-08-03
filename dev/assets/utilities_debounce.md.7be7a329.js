import{o as e,c as a,a as n}from"./app.d6ab46c4.js";const t='{"title":"debounce","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Parameters","slug":"parameters"}],"relativePath":"utilities/debounce.md","lastUpdated":1627979909379}',s={},o=n('<h1 id="debounce"><a class="header-anchor" href="#debounce" aria-hidden="true">#</a> debounce</h1><p>Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds. Can be used to reduce the number of API requests when the user is typing, for example in <a href="./../components/ItemSuggest.html">ItemSuggest</a>.</p><p>See also: <a href="https://davidwalsh.name/javascript-debounce-function" target="_blank" rel="noopener noreferrer">https://davidwalsh.name/javascript-debounce-function</a></p><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> debouncedFunction <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">debounce</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> immediate<span class="token punctuation">)</span>\n</code></pre></div><h2 id="parameters"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h2><ul><li><code>func</code> - a function to be called <ul><li>required</li></ul></li><li><code>wait</code> - a time in milliseconds for the debounce <ul><li>required</li></ul></li><li><code>immediate</code> - will trigger the function on the leading edge, instead of the trailing <ul><li>optional, default: <code>false</code></li></ul></li></ul>',7);s.render=function(n,t,s,i,l,r){return e(),a("div",null,[o])};export{t as __pageData,s as default};
