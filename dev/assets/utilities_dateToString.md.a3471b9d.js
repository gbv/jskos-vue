import{o as a,c as e,a as t}from"./app.d57fb543.js";const s='{"title":"dateToString","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Parameters","slug":"parameters"}],"relativePath":"utilities/dateToString.md","lastUpdated":1628666731007}',n={},r=[t('<h1 id="datetostring"><a class="header-anchor" href="#datetostring" aria-hidden="true">#</a> dateToString</h1><p>Converts a date string to a localized date string. Incomplete dates (YYYY or YYYY-MM) will be returned non-localized. Dates with the exact length of 10 (e.g. YYYY-MM-DD) will be printed as date-only. If it was not possible to convert the string to a date, the input will be returned unchanged.</p><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> localizedDateString <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">dateToString</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span>\n</code></pre></div><h2 id="parameters"><a class="header-anchor" href="#parameters" aria-hidden="true">#</a> Parameters</h2><ul><li><code>dateString</code> - some kind of date or datetime string <ul><li>required</li></ul></li></ul>',6)];n.render=function(t,s,n,o,i,l){return a(),e("div",null,r)};export{s as __pageData,n as default};
