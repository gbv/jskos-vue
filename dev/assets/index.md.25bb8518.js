import{o as n,c as a,a as s}from"./app.de95b7d4.js";const t='{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"What is jskos-vue?","slug":"what-is-jskos-vue"},{"level":2,"title":"Requirements","slug":"requirements"},{"level":2,"title":"Installation","slug":"installation"},{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"Globally in a Vue project","slug":"globally-in-a-vue-project"},{"level":3,"title":"Globally in a Vue project (individual components)","slug":"globally-in-a-vue-project-individual-components"},{"level":3,"title":"Locally in a Vue project","slug":"locally-in-a-vue-project"},{"level":3,"title":"Browser","slug":"browser"},{"level":2,"title":"Additional Notes","slug":"additional-notes"}],"relativePath":"index.md","lastUpdated":1624958734535}',e={},p=s('<h1 id="introduction"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h1><h2 id="what-is-jskos-vue"><a class="header-anchor" href="#what-is-jskos-vue" aria-hidden="true">#</a> What is jskos-vue?</h2><p>jskos-vue is a library for <a href="https://v3.vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a> containing components and utilities related to the <a href="https://gbv.github.io/jskos/" target="_blank" rel="noopener noreferrer">JSKOS data format</a> and the <a href="https://coli-conc.gbv.de" target="_blank" rel="noopener noreferrer">coli-conc project</a>. It was developed to make it easier to use JSKOS data and the coli-conc infrastructure in front-end projects.</p><p>Note that it was specifically developed with the needs of our <a href="https://github.com/gbv/cocoda" target="_blank" rel="noopener noreferrer">Cocoda Mapping Tool</a> and <a href="https://github.com/gbv/bartoc.org" target="_blank" rel="noopener noreferrer">BARTOC</a> in mind. So if certain decisions seem odd to you, it is probably because it was needed in one of those projects. Nevertheless feel free to <a href="https://github.com/gbv/jskos-vue/issues" target="_blank" rel="noopener noreferrer">contact us</a> with your questions, suggestions, and use-cases!</p><h2 id="requirements"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2><ul><li><a href="https://v3.vuejs.org" target="_blank" rel="noopener noreferrer">Vue 3</a></li><li>One of the following: <ul><li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> version &gt;=12.0.0</li><li>A modern browser</li></ul></li><li><a href="https://github.com/gbv/jskos-tools" target="_blank" rel="noopener noreferrer">jskos-tools</a><ul><li>Needed for ConceptSearch, ConceptTree, ItemDetails, ItemList, and ItemName.</li></ul></li><li><a href="https://github.com/gbv/jskos-vue-tabs" target="_blank" rel="noopener noreferrer">jskos-vue-tabs</a><ul><li>Needed for ItemDetails.</li></ul></li><li><a href="https://github.com/rigor789/vue-scrollto" target="_blank" rel="noopener noreferrer">vue-scrollto</a><ul><li>Needed for ConceptSearch, ConceptTree, ItemDetails, and ItemList.</li></ul></li></ul><p>For a Node.js project, it is recommended to use either <a href="https://cli.vuejs.org" target="_blank" rel="noopener noreferrer">Vue CLI</a> or <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>.</p><h2 id="installation"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><div class="language-bash"><pre><code><span class="token function">npm</span> <span class="token function">install</span> jskos-vue\n</code></pre></div><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><h3 id="globally-in-a-vue-project"><a class="header-anchor" href="#globally-in-a-vue-project" aria-hidden="true">#</a> Globally in a Vue project</h3><p>This adds all of jskos-vue&#39;s components globally to your Vue project (<code>src/main.js</code>):</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> JskosVue <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>JskosVue<span class="token punctuation">)</span>\n\napp<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>\n</code></pre></div><h3 id="globally-in-a-vue-project-individual-components"><a class="header-anchor" href="#globally-in-a-vue-project-individual-components" aria-hidden="true">#</a> Globally in a Vue project (individual components)</h3><p>This adds individual components (tree-shakable) globally to your Vue project (<code>src/main.js</code>):</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>\n\n<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\napp<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ItemName<span class="token punctuation">)</span>\n\napp<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>\n</code></pre></div><h3 id="locally-in-a-vue-project"><a class="header-anchor" href="#locally-in-a-vue-project" aria-hidden="true">#</a> Locally in a Vue project</h3><p>You can also add individual components where needed (e.g. in some SFC, tree-shakable):</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemName <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span>\n    ItemName<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><h3 id="browser"><a class="header-anchor" href="#browser" aria-hidden="true">#</a> Browser</h3><p>The library can be used in the browser, for example via jsDelivr. <a href="https://www.jsdelivr.com/package/npm/jskos-vue" target="_blank" rel="noopener noreferrer"><img src="https://data.jsdelivr.com/v1/package/npm/jskos-vue/badge?style=rounded" alt=""></a></p><p>Fully working HTML example:</p><div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Vue App<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token comment">&lt;!-- TODO --&gt;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token comment">&lt;!-- Vue 3 production build --&gt;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n    <span class="token comment">&lt;!-- TODO: Additional libraries, i.e. jskos-tools, jskos-vue-tabs, cocoda-sdk, etc. --&gt;</span>\n    <span class="token comment">&lt;!-- Our library (adjust version if necessary) --&gt;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://cdn.jsdelivr.net/npm/jskos-vue@0.1/dist/jskos-vue.umd.min.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n      <span class="token comment">// Here, we are creating an empty Vue app and include the library as a plugin.</span>\n      Vue<span class="token punctuation">.</span><span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ViteTestLibrary<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&quot;#app&quot;</span><span class="token punctuation">)</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="additional-notes"><a class="header-anchor" href="#additional-notes" aria-hidden="true">#</a> Additional Notes</h2><p>It is recommended to use the following CSS snippet in your applications to make sure box sizing is correctly calculated (<a href="https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/" target="_blank" rel="noopener noreferrer">more info</a>):</p><div class="language-css"><pre><code><span class="token selector">html</span> <span class="token punctuation">{</span>\n  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">*, *:before, *:after</span> <span class="token punctuation">{</span>\n  <span class="token property">box-sizing</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',26);e.render=function(s,t,e,o,c,l){return n(),a("div",null,[p])};export default e;export{t as __pageData};
