var n=Object.defineProperty,a=Object.defineProperties,s=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,o=(a,s,t)=>s in a?n(a,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[s]=t;import{g as c,z as l,o as u,c as i,d as r,t as k,u as d,s as g,F as m,v as h,n as v,b as f,a as b,e as y}from"./app.d57fb543.js";import"./index.94242523.js";import{_ as q}from"./ItemName.45ee4917.js";import{_ as D}from"./ItemList.daa1996a.js";import{_ as I}from"./ItemDetails.58b2f316.js";import{d as z}from"./utils.0f4dc86e.js";import"./LoadingIndicator.52cd3ce7.js";import"./shared.99084317.js";import"./Arrow.812c1b03.js";import"./ConceptTree.e1a57818.js";import"./ItemSuggest.fa29f632.js";import"./AutoLink.494f68d0.js";import"./style.4b5628f1.js";const w=b('<h1 id="draganddrop"><a class="header-anchor" href="#draganddrop" aria-hidden="true">#</a> dragAndDrop</h1><p>Helper to add drag and drop functionality to JSKOS items.</p><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> draggedItem<span class="token punctuation">,</span> dragstart<span class="token punctuation">,</span> dragend<span class="token punctuation">,</span> addDropzone <span class="token punctuation">}</span> <span class="token operator">=</span> utils<span class="token punctuation">.</span>dragAndDrop\n</code></pre></div><h3 id="draggeditem"><a class="header-anchor" href="#draggeditem" aria-hidden="true">#</a> <code>draggedItem</code></h3><p>A reactive reference to the currently dragged item. (<code>null</code> if no item is being dragged.)</p><h3 id="dragstart-item-dragend"><a class="header-anchor" href="#dragstart-item-dragend" aria-hidden="true">#</a> <code>dragstart(item)</code>, <code>dragend()</code></h3><p>Can be used to define a draggable item. (See <a href="#defining-a-draggable-item">below</a> on how to use this.)</p><h3 id="adddropzone-element-callback"><a class="header-anchor" href="#adddropzone-element-callback" aria-hidden="true">#</a> <code>addDropzone(element, callback)</code></h3><p>Defines a new dropzone. (See <a href="#defining-a-dropzone">below</a> on how to use this.)</p><h2 id="defining-a-draggable-item"><a class="header-anchor" href="#defining-a-draggable-item" aria-hidden="true">#</a> Defining a Draggable Item</h2><p>Any element can be defined as a draggable item. <a href="./../components/ItemName.html">ItemName</a> and rows in <a href="./../components/ItemList.html">ItemList</a> are draggable by default. To define an element as draggable, you need to set its <code>draggable</code> property to <code>true</code> and define event handlers for <code>dragstart</code> and <code>dragend</code> which are exported by <code>utils.dragAndDrop</code>.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n  <span class="token attr-name">draggable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">@dragstart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragstart({ uri: <span class="token punctuation">&#39;</span>some:item<span class="token punctuation">&#39;</span> })<span class="token punctuation">&quot;</span></span>\n  <span class="token attr-name">@dragend</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragend<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n  Some item\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="defining-a-dropzone"><a class="header-anchor" href="#defining-a-dropzone" aria-hidden="true">#</a> Defining a Dropzone</h2><p>Any element can be defined as a dropzone and can therefore receive item drops. <a href="./../components/ItemDetails.html">ItemDetails</a> is a dropzone by default. To define a dropzone, you need to use the <code>addDropzone</code> function that is exported by <code>utils.dragAndDrop</code>. It needs to be called separately for every dropzone. It receives two parameters and returns an object with several properties.</p><h3 id="adddropzone-parameters"><a class="header-anchor" href="#adddropzone-parameters" aria-hidden="true">#</a> <code>addDropzone</code> Parameters</h3><ul><li><code>element</code> - a reference to a DOM element <ul><li>optional, but if not given, the event handlers <code>dragover</code>, <code>dragenter</code>, <code>dragleave</code>, and <code>drop</code> need to be defined manually on the element</li></ul></li><li><code>callback</code> (function) - a function that is called when an item is dropped on the dropzone <ul><li>The first parameter will be the dropped item (which is the same as <code>draggedItem</code> that is exported by <code>utils.dragAndDrop</code>).</li><li>The other parameters are any additional parameters that are providing to <code>drop</code> (usually none).</li></ul></li></ul><h3 id="adddropzone-returned-object-properties"><a class="header-anchor" href="#adddropzone-returned-object-properties" aria-hidden="true">#</a> <code>addDropzone</code> Returned Object Properties</h3><ul><li><code>isDraggingOver</code> (boolean) - a reactive boolean reference that is <code>true</code> if an item is currently being dragged over the dropzone <ul><li>Requires <code>dragenter</code> and <code>dragleave</code> events to be defined.</li></ul></li><li><code>dragover</code> - dragover event handler (required to enable drops) <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this <strong>has</strong> to be defined manually on the dropzone element.</li></ul></li><li><code>dragenter</code> - dragenter event handler <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this can optionally be defined manually on the dropzone element to enable <code>isDraggingOver</code> to work.</li></ul></li><li><code>dragleave</code> - dragleave event handler <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this can optionally be defined manually on the dropzone element to enable <code>isDraggingOver</code> to work.</li></ul></li><li><code>drop</code> - drop event handler (required to enable drops) <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this <strong>has</strong> to be defined manually on the dropzone element.</li></ul></li></ul><p>See the following examples for how this is used in practice.</p><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3 id="basic-example"><a class="header-anchor" href="#basic-example" aria-hidden="true">#</a> Basic Example</h3>',22),_=["onDragstart"],x=b('<div id="dropzone" class="noDrag" style="height:100px;"> This zone does not change, but you can drop an item here. </div><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> draggedItem<span class="token punctuation">,</span> dragstart<span class="token punctuation">,</span> dragend<span class="token punctuation">,</span> addDropzone <span class="token punctuation">}</span> <span class="token operator">=</span> utils<span class="token punctuation">.</span>dragAndDrop\n<span class="token keyword">const</span> <span class="token punctuation">{</span>\n  dragover<span class="token punctuation">,</span>\n  dragenter<span class="token punctuation">,</span>\n  dragleave<span class="token punctuation">,</span>\n  drop<span class="token punctuation">,</span>\n  isDraggingOver<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">addDropzone</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Dropped item with URI </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>item<span class="token punctuation">.</span>uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// We need to use onMounted so that dropzone is mounted in DOM</span>\n<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token function">addDropzone</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;dropzone&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Dropped item with URI </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>item<span class="token punctuation">.</span>uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">i</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>i<span class="token punctuation">,</span> uri<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">item:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token punctuation">.</span>notation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span> en<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Item </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token punctuation">.</span>notation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  Currently dragging: {{ draggedItem &amp;&amp; draggedItem.uri }}\n\n  <span class="token comment">&lt;!-- Defining draggable items --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in items<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.uri<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">draggable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@dragstart</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragstart(item)<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@dragend</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragend<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    {{ item.uri }}\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n\n  <span class="token comment">&lt;!-- Dropzone with manually set events and conditional CSS classes --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{\n      drag: draggedItem,\n      noDrag: !draggedItem,\n      draggingOver: isDraggingOver,\n    }<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@dragover</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragover<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@dragenter</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragenter<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@dragleave</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dragleave<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@drop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>drop<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    {{ draggedItem ? &quot;Try to drop the item here&quot; : &quot;Start dragging an item&quot; }}\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n\n  <span class="token comment">&lt;!-- Dropzone that we can get by ID; no conditional CSS classes --&gt;</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dropzone<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>noDrag<span class="token punctuation">&quot;</span></span>\n    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n    This zone does not change, but you can drop an item here.\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n<span class="token selector">.drag, .noDrag</span> <span class="token punctuation">{</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 250px<span class="token punctuation">;</span>\n  <span class="token property">margin</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>\n  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>\n  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">.drag</span> <span class="token punctuation">{</span>\n  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token selector">.draggingOver</span> <span class="token punctuation">{</span>\n  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h3 id="example-with-itemname-itemlist-itemdetails"><a class="header-anchor" href="#example-with-itemname-itemlist-itemdetails" aria-hidden="true">#</a> Example with ItemName/ItemList/ItemDetails</h3><div id="dropzone2" style="height:100px;width:250px;display:flex;justify-content:center;align-items:center;border:1px solid black;"> You can drop an item here. </div>',4),j=y(" Single item: "),S=y("ItemList: "),T=r("p",null,"ItemDetails (is a dropzone by default):",-1),O=b('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> utils<span class="token punctuation">,</span> ItemName<span class="token punctuation">,</span> ItemList<span class="token punctuation">,</span> ItemDetails <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> draggedItem<span class="token punctuation">,</span> dragstart<span class="token punctuation">,</span> dragend<span class="token punctuation">,</span> addDropzone <span class="token punctuation">}</span> <span class="token operator">=</span> utils<span class="token punctuation">.</span>dragAndDrop\n<span class="token comment">// We need to use onMounted so that dropzone2 is mounted in DOM</span>\n<span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token function">addDropzone</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;dropzone2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Dropped item with URI </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>item<span class="token punctuation">.</span>uri<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">i</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>i<span class="token punctuation">,</span> uri<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">item:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token punctuation">.</span>notation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span> en<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Item </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token punctuation">.</span>notation<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token comment">// Selected item for ItemDetails</span>\n<span class="token keyword">const</span> selected <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>items<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dropzone2<span class="token punctuation">&quot;</span></span>\n    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 250px<span class="token punctuation">;</span> <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n    You can drop an item here.\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\n  Single item: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-name</span> <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items[0]<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  ItemList:\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-list</span> <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n  ItemDetails (is a dropzone by default):\n\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details</span>\n    <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>selected<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>selected = $event.item<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),A='{"title":"dragAndDrop","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"draggedItem","slug":"draggeditem"},{"level":3,"title":"dragstart(item), dragend()","slug":"dragstart-item-dragend"},{"level":3,"title":"addDropzone(element, callback)","slug":"adddropzone-element-callback"},{"level":2,"title":"Defining a Draggable Item","slug":"defining-a-draggable-item"},{"level":2,"title":"Defining a Dropzone","slug":"defining-a-dropzone"},{"level":3,"title":"addDropzone Parameters","slug":"adddropzone-parameters"},{"level":3,"title":"addDropzone Returned Object Properties","slug":"adddropzone-returned-object-properties"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Basic Example","slug":"basic-example"},{"level":3,"title":"Example with ItemName/ItemList/ItemDetails","slug":"example-with-itemname-itemlist-itemdetails"}],"relativePath":"utilities/dragAndDrop.md","lastUpdated":1628666731007}',P={};const C=Object.assign(P,{setup:function(n){const{draggedItem:b,dragstart:y,dragend:A,addDropzone:P}=z,{dragover:C,dragenter:E,dragleave:L,drop:$,isDraggingOver:R}=P(null,(n=>{alert(`Dropped item with URI ${n.uri}`)}));c((()=>{P(document.getElementById("dropzone"),(n=>{alert(`Dropped item with URI ${n.uri}`)})),P(document.getElementById("dropzone2"),(n=>{alert(`Dropped item with URI ${n.uri}`)}))}));const M=[{notation:["1"]},{notation:["2"]},{notation:["3"]}].map((n=>{return c=((n,a)=>{for(var s in a||(a={}))e.call(a,s)&&o(n,s,a[s]);if(t)for(var s of t(a))p.call(a,s)&&o(n,s,a[s]);return n})({},n),l={uri:`item:${n.notation[0]}`,prefLabel:{en:`Item ${n.notation[0]}`}},a(c,s(l));var c,l})),N=l(M[2]);return(n,a)=>(u(),i("div",null,[w,r("p",null,"Currently dragging: "+k(d(b)&&d(b).uri),1),g(" Defining draggable items "),(u(!0),i(m,null,h(d(M),(n=>(u(),i("div",{key:n.uri,draggable:"true",onDragstart:a=>d(y)(n),onDragend:a[0]||(a[0]=(...n)=>d(A)&&d(A)(...n))},k(n.uri),41,_)))),128)),g(" Dropzone with manually set events and conditional CSS classes "),r("div",{class:v({drag:d(b),noDrag:!d(b),draggingOver:d(R)}),onDragover:a[1]||(a[1]=(...n)=>d(C)&&d(C)(...n)),onDragenter:a[2]||(a[2]=(...n)=>d(E)&&d(E)(...n)),onDragleave:a[3]||(a[3]=(...n)=>d(L)&&d(L)(...n)),onDrop:a[4]||(a[4]=(...n)=>d($)&&d($)(...n))},k(d(b)?"Try to drop the item here":"Start dragging an item"),35),g(" Dropzone that we can get by ID; no conditional CSS classes "),x,r("p",null,[j,f(q,{item:d(M)[0]},null,8,["item"])]),r("p",null,[S,f(D,{items:d(M)},null,8,["items"])]),T,f(I,{item:N.value,onSelect:a[5]||(a[5]=n=>N.value=n.item)},null,8,["item"]),O]))}});export{A as __pageData,C as default};
