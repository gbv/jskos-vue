import{I as e}from"./chunks/ItemList.d4bf8f5e.js";import{o,c as p,a as l,w as u,e as c,b as r,F as k,d,m}from"./app.5e7cbef3.js";import"./chunks/ItemName.aa105fd6.js";import"./chunks/utils.a5bf753d.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/vue-scrollto.ec7616c3.js";const h=c('<h1 id="itemlist" tabindex="-1">ItemList <a class="header-anchor" href="#itemlist" aria-hidden="true">#</a></h1><p>A list of JSKOS items with their notation and label.</p><p>Uses <a href="./ItemName.html">ItemName</a>. Also uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and rows are draggable by default.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>items</code> (array) - array of objects <ul><li>required</li></ul></li><li><code>itemProperty</code> (string) - defines which property on the objects contains the JSKOS item <ul><li>by default, the objects themselves will be considered the JSKOS items</li></ul></li><li><code>rowMode</code> (boolean) - if enabled, the whole row will have a background color on hover (CSS var <code>--jskos-vue-itemList-hover-bgColor</code>) and be clickable <ul><li>default: <code>true</code></li></ul></li><li><code>draggable</code> (boolean) - whether the item is draggable <ul><li>default: <code>true</code></li><li>This will also set <code>itemNameOptions.draggable</code> if it&#39;s not set separately.</li></ul></li><li><code>itemNameOptions</code> (object) - options that are passed along to <a href="./ItemName.html">ItemName</a> via v-bind</li><li><code>indicatorByUri</code> (object) - object that maps item URIs to either color strings or boolean values <ul><li>If either a color or <code>true</code> is given for a particular item, an indicator will be shown to the right side of the item in the list.</li><li>Note that lists use the full width of the page, so it makes sense to define a maximum width to make sure indicators can be associated with the right item.</li></ul></li></ul><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><ul><li>beforeItem: Content shown before an item (includes parameter <code>item</code>).</li><li>afterItem: Content shown after an item (includes parameter <code>item</code>).</li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><ul><li><code>scrollToUri(uri)</code> - scrolls the item list to a certain item via its URI</li></ul><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><ul><li><code>select</code><ul><li>Emitted when an item or a row (if <code>rowMode</code> prop is <code>true</code>) is clicked.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS item) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li></ul><h2 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-hidden="true">#</a></h2><ul><li><code>--jskos-vue-itemList-hover-bgColor</code> - row hover background color (for <code>rowMode</code> = <code>true</code>) <ul><li>default: <code>#fdbd58aa</code></li></ul></li><li><code>--jskos-vue-itemList-indicator-color</code> - default indicator color (for <code>true</code> values) <ul><li>default: <code>green</code></li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2><h3>Default, clickable = true, with indicators and slot</h3>',15),g=r("h3",null,"rowMode = false, with itemNameOptions",-1),b=c(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>Default, clickable = true, with indicators and slot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-list</span>
    <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concepts<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:indicator-by-uri</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
      &#39;uri:2&#39;: true,
      &#39;uri:3&#39;: true,
      &#39;uri:12&#39;: &#39;blue&#39;,
      &#39;uri:13&#39;: &#39;yellow&#39;,
      &#39;uri:14&#39;: &#39;black&#39;,
    }<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>select<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterItem</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ item }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token comment">&lt;!-- Show a rocket after all items with URIs starting with 1 --&gt;</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.uri.startsWith(&#39;uri:1&#39;)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        \u{1F680}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>item-list</span><span class="token punctuation">&gt;</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>rowMode = false, with itemNameOptions<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-list</span>
    <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>concepts.slice(0, 5)<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:row-mode</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:item-name-options</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
      clickable: true,
      draggable: false,
    }<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>select<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemList <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>

<span class="token keyword">const</span> concepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">15</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  concepts<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">uri:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Concept no. </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">select</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> item<span class="token punctuation">,</span> row <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Item with URI </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token punctuation">.</span>uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> selected (row: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>row<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">).</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),N='{"title":"ItemList","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemList.md"}',f={},C=Object.assign(f,{__name:"ItemList",setup(w){const n=[];for(let a=0;a<=15;a+=1)n.push({uri:`uri:${a}`,notation:[`${a}`],prefLabel:{en:`Concept no. ${a}`}});const s=({item:a,row:t})=>{alert(`Item with URI ${a.uri} selected (row: ${t}).`)};return(a,t)=>(o(),p("div",null,[h,l(e,{items:n,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:s},{afterItem:u(({item:i})=>[i.uri.startsWith("uri:1")?(o(),p(k,{key:0},[d(" \u{1F680} ")],64)):m("",!0)]),_:1}),g,l(e,{items:n.slice(0,5),"row-mode":!1,"item-name-options":{clickable:!0,draggable:!1},onSelect:s},null,8,["items"]),b]))}});export{N as __pageData,C as default};
