import{s as n,o as a,c as s,b as t,z as e,A as p,a as o}from"./app.d6ab46c4.js";import"./index.4b14d3d9.js";import{a as c}from"./utils.e2bdf247.js";import"./ItemName.69fd819b.js";import"./shared.99084317.js";import"./ItemList.020bbe27.js";import"./LoadingIndicator.0ed36c8b.js";import"./ItemDetails.11ea1537.js";import"./AutoLink.b76e57f2.js";import"./style.4b5628f1.js";import"./Arrow.43cb1752.js";import"./ConceptTree.e533f848.js";import"./ItemSuggest.5f2aea4d.js";const l=o('<h1 id="addclickhandlers"><a class="header-anchor" href="#addclickhandlers" aria-hidden="true">#</a> addClickHandlers</h1><p>Handles clicks in the application, e.g. to hide popovers when clicked outside.</p><p>Is used in <a href="./../components/ItemSuggest.html">ItemSuggest</a></p><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\nutils<span class="token punctuation">.</span><span class="token function">addClickHandlers</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    elements<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token comment">// Some DOM elements</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">handler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> event<span class="token punctuation">,</span> isInside <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token comment">// Handle click event</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">)</span>\n</code></pre></div><p>Takes a function as its first argument which returns an array. Each item in the array is an object with the following properties:</p><ul><li><code>elements</code> - An array of elements that the click should be checked against.</li><li><code>handler</code> - A function that is called when a click <strong>outside</strong> the elements is registered.</li></ul><p>The second argument (optional, default: <code>false</code>) forces the handler to be called even if the click is <strong>inside</strong> the provided elements. In this case, <code>isInside</code> will be set to <code>true</code> when calling the handler function.</p><p>Usually for popovers, you should add both the popover element (or rather the inside div) and the button that opens the popover to <code>elements</code>.</p><h2 id="example"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2>',10),u={id:"examplePopover",style:{border:"1px dotted black"}},i=o('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n\n<span class="token keyword">const</span> showPopover <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n\n<span class="token comment">// No need to put this in `onMounted` since everything will be called on demand</span>\nutils<span class="token punctuation">.</span><span class="token function">addClickHandlers</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span>\n    elements<span class="token operator">:</span> <span class="token punctuation">[</span>\n      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;exampleButton&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;examplePopover&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">handler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      showPopover<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>\n    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>exampleButton<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showPopover = !showPopover<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    Toggle Popover\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n    <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showPopover<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>examplePopover<span class="token punctuation">&quot;</span></span>\n    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">border</span><span class="token punctuation">:</span> 1px dotted black<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n    This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover).\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),k='{"title":"addClickHandlers","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Example","slug":"example"}],"relativePath":"utilities/addClickHandlers.md","lastUpdated":1627980097356}',r={};const d=Object.assign(r,{setup:function(o){const k=n(!1);return c((()=>[{elements:[document.getElementById("exampleButton"),document.getElementById("examplePopover")],handler:()=>{k.value=!1}}])),(n,o)=>(a(),s("div",null,[l,t("p",null,[t("button",{id:"exampleButton",onClick:o[1]||(o[1]=n=>k.value=!k.value)}," Toggle Popover "),e(t("div",u," This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover). ",512),[[p,k.value]])]),i]))}});export{k as __pageData,d as default};
