import{s as e,o as p,c as o,b as a,y as c,z as l,e as t}from"./app.5e7cbef3.js";import"./chunks/index.6972e97c.js";import{b as u}from"./chunks/utils.a5bf753d.js";import"./chunks/ItemName.aa105fd6.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/ItemList.37706ccd.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/ItemDetails.5ab0b055.js";import"./chunks/style.e065a504.js";import"./chunks/AutoLink.917c2d13.js";import"./chunks/Arrow.3916db28.js";import"./chunks/ConceptTree.a2ff6510.js";import"./chunks/ItemSuggest.f4008f8f.js";const i=t(`<h1 id="addclickhandlers" tabindex="-1">addClickHandlers <a class="header-anchor" href="#addclickhandlers" aria-hidden="true">#</a></h1><p>Handles clicks in the application, e.g. to hide popovers when clicked outside.</p><p>Is used in <a href="./../components/ItemSuggest.html">ItemSuggest</a></p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
utils<span class="token punctuation">.</span><span class="token function">addClickHandlers</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">elements</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// Some DOM elements</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function-variable function">handler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> event<span class="token punctuation">,</span> isInside <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// Handle click event</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><p>Takes a function as its first argument which returns an array. Each item in the array is an object with the following properties:</p><ul><li><code>elements</code> - An array of elements that the click should be checked against.</li><li><code>handler</code> - A function that is called when a click <strong>outside</strong> the elements is registered.</li></ul><p>The second argument (optional, default: <code>false</code>) forces the handler to be called even if the click is <strong>inside</strong> the provided elements. In this case, <code>isInside</code> will be set to <code>true</code> when calling the handler function.</p><p>Usually for popovers, you should add both the popover element (or rather the inside div) and the button that opens the popover to <code>elements</code>.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h2>`,10),r={id:"examplePopover",style:{border:"1px dotted black"}},k=t(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> utils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>

<span class="token keyword">const</span> showPopover <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>

<span class="token comment">// No need to put this in \`onMounted\` since everything will be called on demand</span>
utils<span class="token punctuation">.</span><span class="token function">addClickHandlers</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">elements</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;exampleButton&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&quot;examplePopover&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token function-variable function">handler</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      showPopover<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>exampleButton<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showPopover = !showPopover<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    Toggle Popover
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showPopover<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>examplePopover<span class="token punctuation">&quot;</span></span>
    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">border</span><span class="token punctuation">:</span> 1px dotted black<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover).
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),A='{"title":"addClickHandlers","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Example","slug":"example"}],"relativePath":"utilities/addClickHandlers.md"}',d={},E=Object.assign(d,{__name:"addClickHandlers",setup(h){const n=e(!1);return u(()=>[{elements:[document.getElementById("exampleButton"),document.getElementById("examplePopover")],handler:()=>{n.value=!1}}]),(m,s)=>(p(),o("div",null,[i,a("p",null,[a("button",{id:"exampleButton",onClick:s[0]||(s[0]=g=>n.value=!n.value)}," Toggle Popover "),c(a("div",r," This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover). ",512),[[l,n.value]])]),k]))}});export{A as __pageData,E as default};
