import{o as n,c as a,b as s,w as t,n as e,F as o,a as p,d as c}from"./app.a4c86903.js";import{_ as l}from"./ItemList.f96294f0.js";import"./ItemName.463edcd0.js";import"./utils.2a641db9.js";import"./shared.99084317.js";import"./LoadingIndicator.c2b0b84f.js";const i=p('<h1 id="itemlist"><a class="header-anchor" href="#itemlist" aria-hidden="true">#</a> ItemList</h1><p>A list of JSKOS items with their notation and label.</p><p>Uses <a href="./ItemName.html">ItemName</a>. Also uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and rows are draggable by default.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>items</code> (array) - array of objects <ul><li>required</li></ul></li><li><code>itemProperty</code> (string) - defines which property on the objects contains the JSKOS item <ul><li>by default, the objects themselves will be considered the JSKOS items</li></ul></li><li><code>rowMode</code> (boolean) - if enabled, the whole row will have a background color on hover (CSS var <code>--jskos-vue-itemList-hover-bgColor</code>) and be clickable <ul><li>default: <code>true</code></li></ul></li><li><code>itemNameOptions</code> (object) - options that are passed along to <a href="./ItemName.html">ItemName</a> via v-bind</li><li><code>indicatorByUri</code> (object) - object that maps item URIs to either color strings or boolean values <ul><li>If either a color or <code>true</code> is given for a particular item, an indicator will be shown to the right side of the item in the list.</li><li>Note that lists use the full width of the page, so it makes sense to define a maximum width to make sure indicators can be associated with the right item.</li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li>beforeItem: Content shown before an item (includes parameter <code>item</code>).</li><li>afterItem: Content shown after an item (includes parameter <code>item</code>).</li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>scrollToUri(uri)</code> - scrolls the item list to a certain item via its URI</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when an item or a row (if <code>rowMode</code> prop is <code>true</code>) is clicked.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS item) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li></ul><h2 id="css-variables"><a class="header-anchor" href="#css-variables" aria-hidden="true">#</a> CSS Variables</h2><ul><li><code>--jskos-vue-itemList-hover-bgColor</code> - row hover background color (for <code>rowMode</code> = <code>true</code>) <ul><li>default: <code>#fdbd58aa</code></li></ul></li><li><code>--jskos-vue-itemList-indicator-color</code> - default indicator color (for <code>true</code> values) <ul><li>default: <code>green</code></li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3>Default, clickable = true, with indicators and slot</h3>',15),u=c(" 🚀 "),r=s("h3",null,"rowMode = false, with itemNameOptions",-1),k=p('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>Default, clickable = true, with indicators and slot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-list</span>\n    <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concepts<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:indicator-by-uri</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{\n      <span class="token punctuation">&#39;</span>uri:2<span class="token punctuation">&#39;</span>: true,\n      <span class="token punctuation">&#39;</span>uri:3<span class="token punctuation">&#39;</span>: true,\n      <span class="token punctuation">&#39;</span>uri:12<span class="token punctuation">&#39;</span>: <span class="token punctuation">&#39;</span>blue<span class="token punctuation">&#39;</span>,\n      <span class="token punctuation">&#39;</span>uri:13<span class="token punctuation">&#39;</span>: <span class="token punctuation">&#39;</span>yellow<span class="token punctuation">&#39;</span>,\n      <span class="token punctuation">&#39;</span>uri:14<span class="token punctuation">&#39;</span>: <span class="token punctuation">&#39;</span>black<span class="token punctuation">&#39;</span>,\n    }<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>select<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token comment">&lt;!-- Show a rocket after all items with URIs starting with 1 --&gt;</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.uri.startsWith(<span class="token punctuation">&#39;</span>uri:1<span class="token punctuation">&#39;</span>)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        🚀\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>item-list</span><span class="token punctuation">&gt;</span></span>\n\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>rowMode = false, with itemNameOptions<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-list</span>\n    <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concepts.slice(0, 5)<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:row-mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:item-name-options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{\n      clickable: true,\n    }<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>select<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n\n<span class="token keyword">const</span> concepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">15</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  concepts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    uri<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">uri:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n    notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Concept no. </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">select</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> item<span class="token punctuation">,</span> row <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Item with URI </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>item<span class="token punctuation">.</span>uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> selected (row: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>row<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">).</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),d='{"title":"ItemList","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemList.md","lastUpdated":1627991274264}',m={};const h=Object.assign(m,{setup:function(p){const c=[];for(let n=0;n<=15;n+=1)c.push({uri:`uri:${n}`,notation:[`${n}`],prefLabel:{en:`Concept no. ${n}`}});const d=({item:n,row:a})=>{alert(`Item with URI ${n.uri} selected (row: ${a}).`)};return(p,m)=>(n(),a("div",null,[i,s(l,{items:c,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:d},{afterItem:t((({item:s})=>[e(" Show a rocket after all items with URIs starting with 1 "),s.uri.startsWith("uri:1")?(n(),a(o,{key:0},[u],2112)):e("v-if",!0)])),_:1}),r,s(l,{items:c.slice(0,5),"row-mode":!1,"item-name-options":{clickable:!0},onSelect:d},null,8,["items"]),k]))}});export{d as __pageData,h as default};
