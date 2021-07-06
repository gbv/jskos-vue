import{B as n,h as s,i as a,o as t,c as p,b as o,a as e}from"./app.a5d7b78a.js";import{_ as c}from"./ItemSearch.2bc3f46c.js";import"./LoadingIndicator.afa78c4a.js";import"./shared.4aef2e40.js";const u=e('<h1 id="itemsearch"><a class="header-anchor" href="#itemsearch" aria-hidden="true">#</a> ItemSearch</h1><p>Input field to search and select an item (usually concept or concept scheme) from a list of search results. Shows a <a href="./LoadingIndicator.html">LoadingIndicator</a> while waiting for results.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>scheme</code> (object) - JSKOS scheme to search in <ul><li>required if searching for concepts</li></ul></li><li><code>registry</code> (object) - <a href="https://github.com/gbv/cocoda-sdk" target="_blank" rel="noopener noreferrer">cocoda-sdk</a> registry to access the scheme <ul><li>required if <code>search</code> is not given or <code>scheme._registry</code> is not defined</li></ul></li><li><code>search(query, props)</code> (async function) - a custom search function that provides results in <a href="https://github.com/dewitt/opensearch/blob/master/mediawiki/Specifications/OpenSearch/Extensions/Suggestions/1.1/Draft%201.wiki" target="_blank" rel="noopener noreferrer">OpenSearch Suggest Format</a><ul><li><code>query</code> is the search string, <code>props</code> is an object containing these props</li><li>The Promise that is returned by this function can optionally have a property <code>cancel</code> attached. If this is the case, it will be called if there is a newer search query and the previous request should be aborted.</li></ul></li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>focus()</code> - focuses the input field</li><li><code>setQuery(newQuery, focus = false)</code> - sets the query (input field) to <code>newQuery</code>; optionally focuses the input field</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a search result is selected (either via click or enter).</li><li>Parameter is the JSKOS concept of the selected result (with <code>uri</code> and <code>inScheme</code> properties).</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3 id="search-for-concepts-inside-a-concept-scheme"><a class="header-anchor" href="#search-for-concepts-inside-a-concept-scheme" aria-hidden="true">#</a> Search for concepts inside a concept scheme</h3><p>This example uses the <a href="https://coli-conc.gbv.de/api/" target="_blank" rel="noopener noreferrer">coli-conc API</a> to search for concept inside German Dewey Decimal Classification (DDC, licensed by <a href="https://www.oclc.org/" target="_blank" rel="noopener noreferrer">OCLC</a> under CC BY-NC-ND 3.0).</p>',11),l=e('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-search</span>\n    <span class="token attr-name">:scheme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scheme<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:registry</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>registry<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">const</span> registry <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>\n<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  registry<span class="token punctuation">.</span>value <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n    api<span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> scheme <span class="token operator">=</span> <span class="token punctuation">{</span>\n  uri<span class="token operator">:</span> <span class="token string">&quot;http://dewey.info/scheme/edition/e23/&quot;</span><span class="token punctuation">,</span>\n  license<span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      uri<span class="token operator">:</span> <span class="token string">&quot;http://creativecommons.org/licenses/by-nc-nd/3.0/&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h3 id="search-with-a-custom-search-function"><a class="header-anchor" href="#search-with-a-custom-search-function" aria-hidden="true">#</a> Search with a custom search function</h3><p>This example provides a custom search function (results come from local data in this case).</p>',3),r=e('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-search</span>\n    <span class="token attr-name">:search</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>searchPokemon<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token comment">// Custom data and search function</span>\n<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Bulbasaur&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Ivysaur&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Venusaur&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Charmander&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Charmeleon&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Charizard&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Squirtle&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Wartortle&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Blastoise&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Caterpie&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Metapod&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Butterfree&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Weedle&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Kakuna&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Beedrill&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pidgey&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pidgeotto&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Pidgeot&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Rattata&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> <span class="token string">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Raticate&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span>\n<span class="token keyword">const</span> <span class="token function-variable function">searchPokemon</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">query</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  query <span class="token operator">=</span> query<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> results <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=&gt;</span> entry<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token comment">// Convert to OpenSearch Suggest Format</span>\n  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span>query<span class="token punctuation">]</span>\n  result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> results<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">r</span> <span class="token operator">=&gt;</span> r<span class="token punctuation">.</span>name<span class="token punctuation">)</span>\n  result<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> results<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>\n  result<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> results<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">r</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">pokemon:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>r<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> result\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h3 id="search-for-schemes-in-bartoc"><a class="header-anchor" href="#search-for-schemes-in-bartoc" aria-hidden="true">#</a> Search for schemes in BARTOC</h3><p>This example uses the <a href="https://bartoc.org" target="_blank" rel="noopener noreferrer">BARTOC API</a> to search for vocabularies.</p>',3),i=e('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ItemSearch</span>\n    <span class="token attr-name">:registry</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bartocRegistry<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemSearch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">const</span> bartocRegistry <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>\n<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  bartocRegistry<span class="token punctuation">.</span>value <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n    api<span class="token operator">:</span> <span class="token string">&quot;https://bartoc.org/api/&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),k='{"title":"ItemSearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Search for concepts inside a concept scheme","slug":"search-for-concepts-inside-a-concept-scheme"},{"level":3,"title":"Search with a custom search function","slug":"search-with-a-custom-search-function"},{"level":3,"title":"Search for schemes in BARTOC","slug":"search-for-schemes-in-bartoc"}],"relativePath":"components/ItemSearch.md","lastUpdated":1625553657205}',d={};const g=Object.assign(d,{expose:[],setup:function(e){const k=n(null),d=n(null);s((()=>{k.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),d.value=a.exports.initializeRegistry({provider:"ConceptApi",api:"https://bartoc.org/api/"})}));const g={uri:"http://dewey.info/scheme/edition/e23/",license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"}]},m=[{id:1,name:"Bulbasaur"},{id:2,name:"Ivysaur"},{id:3,name:"Venusaur"},{id:4,name:"Charmander"},{id:5,name:"Charmeleon"},{id:6,name:"Charizard"},{id:7,name:"Squirtle"},{id:8,name:"Wartortle"},{id:9,name:"Blastoise"},{id:10,name:"Caterpie"},{id:11,name:"Metapod"},{id:12,name:"Butterfree"},{id:13,name:"Weedle"},{id:14,name:"Kakuna"},{id:15,name:"Beedrill"},{id:16,name:"Pidgey"},{id:17,name:"Pidgeotto"},{id:18,name:"Pidgeot"},{id:19,name:"Rattata"},{id:20,name:"Raticate"}],h=async n=>{n=n.toLowerCase();const s=m.filter((s=>s.name.toLowerCase().includes(n))),a=[n];return a[1]=s.map((n=>n.name)),a[2]=s.map((()=>"")),a[3]=s.map((n=>`pokemon:${n.id}`)),a};return(n,s)=>(t(),p("div",null,[u,o(c,{scheme:g,registry:k.value},null,8,["registry"]),l,o(c,{search:h}),r,o(c,{registry:d.value},null,8,["registry"]),i]))}});export default g;export{k as __pageData};
