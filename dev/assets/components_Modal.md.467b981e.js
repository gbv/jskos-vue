import{e as s,J as a,y as n,l as t,v as e,x as o,o as p,c as l,b as i,s as u,p as c,r,T as d,K as k,w as m,f as g,u as h,B as b,A as v,a as q,d as f}from"./app.bd5504d7.js";import"./shared.99084317.js";import"./style.4b5628f1.js";const S=s({name:"Modal",inheritAttrs:!1,props:{modelValue:{type:Boolean,required:!1,default:void 0}},emits:["update:modelValue"],setup(s,{emit:e}){a((()=>{const s="jskos-vue-modal-area";if(!document.getElementById(s)){const a=document.createElement("div");a.id=s,document.body.appendChild(a)}}));const o=n(!1),p=t({get:()=>void 0===s.modelValue?o.value:s.modelValue,set(s){o.value=s,e("update:modelValue",s)}});return{shown:p,show(){p.value=!0},hide(){p.value=!1}}}}),w=m();e("data-v-1783c0e8");const C={class:"jskos-vue-modal-dialog"},y={class:"jskos-vue-modal-header"},P=i("h1",null,"Test Header",-1),_={class:"jskos-vue-modal-body"},M={class:"jskos-vue-modal-footer"};o();const V=w(((s,a,n,t,e,o)=>(p(),l(k,{to:"#jskos-vue-modal-area"},[i(d,{name:"fade"},{default:w((()=>[s.shown?(p(),l("div",u({key:0,class:"jskos-vue-modal"},s.$attrs),[c(" Actual modal "),i("div",C,[i("header",y,[r(s.$slots,"header",{},(()=>[P]),{}),i("button",{type:"button","aria-label":"Close",onClick:a[1]||(a[1]=a=>s.shown=!1)}," × ")]),i("div",_,[r(s.$slots,"default",{},void 0,!0)]),i("footer",M,[r(s.$slots,"footer",{},void 0,!0)])]),c(" Semi-transparent backdrop "),i("div",{class:"jskos-vue-modal-backdrop",onClick:a[2]||(a[2]=a=>s.shown=!1)})],16)):c("v-if",!0)])),_:3})]))));S.render=V,S.__scopeId="data-v-1783c0e8";const T=q('<h1 id="modal"><a class="header-anchor" href="#modal" aria-hidden="true">#</a> Modal</h1><p>A full-screen modal.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>modelValue</code> (boolean, v-model) - whether the modal is currently shown <ul><li>default: <code>undefined</code> (= value is kept track of internally)</li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li><code>default</code>: Body content</li><li><code>header</code>: Header content</li><li><code>footer</code>: Footer content</li></ul><h2 id="methods"><a class="header-anchor" href="#methods" aria-hidden="true">#</a> Methods</h2><ul><li><code>show()</code> - shows the modal</li><li><code>hide()</code> - hides the modal</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>update:modelValue</code><ul><li>Used to push changes to v-model value.</li></ul></li></ul><h2 id="css-variables"><a class="header-anchor" href="#css-variables" aria-hidden="true">#</a> CSS Variables</h2><ul><li><code>--jskos-vue-modal-bgColor</code> - background color for header and body of the modal <ul><li>default: same as <code>--jskos-vue-bgColor</code> (white)</li></ul></li><li><code>--jskos-vue-modal-footer-bgColor</code> - footer background color <ul><li>default: <code>rgba(0, 0, 0, 0.05)</code></li></ul></li><li><code>--jskos-vue-modal-minWidth</code> - minimum width of the modal <ul><li>default: <code>400px</code></li><li>Useful tip: Set this value to <code>var(--jskos-vue-modal-maxWidth)</code> to have a consistently sized full-screen modal.</li></ul></li><li><code>--jskos-vue-modal-maxWidth</code> - maximum width of the modal <ul><li>default: <code>800px</code></li></ul></li><li><code>--jskos-vue-modal-minHeight</code> - minimum height of the modal <ul><li>default: <code>300px</code></li><li>Useful tip: Set this value to <code>var(--jskos-vue-modal-maxHeight)</code> to have a consistently sized full-screen modal.</li></ul></li><li><code>--jskos-vue-modal-maxHeight</code> - maximum height of the modal <ul><li>default: <code>calc(100% - 3.5rem)</code></li></ul></li><li><code>--jskos-vue-modal-zIndexBase</code> - base value for <code>z-index</code><ul><li>default: <code>1000</code></li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2><h3 id="two-different-ways-to-show-hide-modals"><a class="header-anchor" href="#two-different-ways-to-show-hide-modals" aria-hidden="true">#</a> Two different ways to show/hide modals</h3>',14),j=f("Test Footer"),x=i("div",{style:{padding:"10px"}},"Test Content",-1),I=q('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>modalShown = true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Show Modal via v-model value<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>showTestModal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Show Modal via method<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modal</span>\n    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>modalShown<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>testModal<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>footer</span><span class="token punctuation">&gt;</span></span>Test Footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token comment">&lt;!-- Note that by default, there is no padding or margins for the content div. --&gt;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>Test Content<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modal</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Modal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">const</span> modalShown <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> testModal <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token function-variable function">showTestModal</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  testModal<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h3 id="modal-with-tabs-and-fixed-size"><a class="header-anchor" href="#modal-with-tabs-and-fixed-size" aria-hidden="true">#</a> Modal with tabs and fixed size</h3>',2),N=f("Test Footer"),F=i("p",null,[f('Because the "Tabs" component changes dimensions with the tab content, we fixate '),i("code",null,"minWidth"),f(" and "),i("code",null,"minHeight"),f(" via CSS variables.")],-1),D=i("p",null,"Nothing to see here.",-1),L=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),A=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),H=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),z=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),E=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),W=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),B=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),U=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),$=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),R=i("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",-1),J=q('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name"><span class="token namespace">v-on:</span>click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tabsModalShown = true<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Show Modal<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modal</span>\n    <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tabsModalShown<span class="token punctuation">&quot;</span></span>\n    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">--jskos-vue-modal-minWidth</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--jskos-vue-modal-maxWidth<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token property">--jskos-vue-modal-minHeight</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--jskos-vue-modal-maxHeight<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>footer</span><span class="token punctuation">&gt;</span></span>Test Footer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tabs</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Tab 1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Because the &quot;Tabs&quot; component changes dimensions with the tab content, we fixate <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span>minWidth<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> and <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span>minHeight<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> via CSS variables.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Tab 2 with long title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Nothing to see here.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Tab 3 with longer title and scrolling content<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tabs</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modal</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Modal <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n<span class="token comment">// Include jskos-vue-tabs with necessary CSS</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Tabs<span class="token punctuation">,</span> Tab <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue-tabs&quot;</span>\n<span class="token keyword">import</span> <span class="token string">&quot;jskos-vue-tabs/dist/style.css&quot;</span>\n\n<span class="token keyword">const</span> tabsModalShown <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),K='{"title":"Modal","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Two different ways to show/hide modals","slug":"two-different-ways-to-show-hide-modals"},{"level":3,"title":"Modal with tabs and fixed size","slug":"modal-with-tabs-and-fixed-size"}],"relativePath":"components/Modal.md","lastUpdated":1627971680219}',O={};const G=Object.assign(O,{expose:[],setup:function(s){const a=n(!1),t=n(),e=()=>{t.value.show()},o=n(!1);return(s,n)=>(p(),l("div",null,[T,i("p",null,[i("button",{onClick:n[1]||(n[1]=s=>a.value=!0)},"Show Modal via v-model value"),i("button",{onClick:e},"Show Modal via method"),i(S,{modelValue:a.value,"onUpdate:modelValue":n[2]||(n[2]=s=>a.value=s),ref:t},{footer:g((()=>[j])),default:g((()=>[x])),_:1},8,["modelValue"])]),I,i("p",null,[i("button",{onClick:n[3]||(n[3]=s=>o.value=!0)},"Show Modal"),i(S,{modelValue:o.value,"onUpdate:modelValue":n[4]||(n[4]=s=>o.value=s),style:{"--jskos-vue-modal-minWidth":"var(--jskos-vue-modal-maxWidth)","--jskos-vue-modal-minHeight":"var(--jskos-vue-modal-maxHeight)"}},{footer:g((()=>[N])),default:g((()=>[i(h(b),{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}},{default:g((()=>[i(h(v),{title:"Tab 1"},{default:g((()=>[F])),_:1}),i(h(v),{title:"Tab 2 with long title"},{default:g((()=>[D])),_:1}),i(h(v),{title:"Tab 3 with longer title and scrolling content"},{default:g((()=>[L,A,H,z,E,W,B,U,$,R])),_:1})])),_:1})])),_:1},8,["modelValue"])]),J]))}});export default G;export{K as __pageData};
