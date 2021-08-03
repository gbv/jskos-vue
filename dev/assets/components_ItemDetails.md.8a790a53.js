import{f as n,o as s,c as a,b as t,u as p,t as o,w as e,x as c,q as i,a as l,d as u}from"./app.299cedce.js";import"./ItemName.659e824e.js";import"./ItemList.a012caf4.js";import{_ as r}from"./ItemDetails.cdd16aa8.js";import"./LoadingIndicator.55435477.js";import"./Arrow.d28dcfac.js";import"./ConceptTree.7321feed.js";import"./ItemSuggest.e072929a.js";import"./utils.9c5057b1.js";import"./shared.99084317.js";import"./AutoLink.6e12dad1.js";import"./style.4b5628f1.js";const k=l('<h1 id="itemdetails"><a class="header-anchor" href="#itemdetails" aria-hidden="true">#</a> ItemDetails</h1><p>Component to display details for a JSKOS item.</p><p>Uses <a href="./ItemName.html">ItemName</a>, <a href="./ItemList.html">ItemList</a>, <a href="./LicenseInfo.html">LicenseInfo</a>, <a href="./AutoLink.html">AutoLink</a>. Also uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and defines a dropzone for items. Dropped items will trigger the <code>select</code> event.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>item</code> (object) - JSKOS item (concept or concept scheme) <ul><li>required</li></ul></li><li><code>itemListOptions</code> (object) - options that are passed along to <a href="./ItemList.html">ItemList</a> via v-bind <ul><li>default: <code>{}</code></li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li><code>beforeName</code>: Content shown before the item&#39;s name.</li><li><code>afterName</code>: Content shown after the item&#39;s name.</li><li><code>additionalTabs</code>: Slot to add additional tabs (via <a href="https://github.com/gbv/jskos-vue-tabs" target="_blank" rel="noopener noreferrer">jskos-vue-tabs</a>) or absolutely positioned content for all tabs.</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a concept is selected.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS concept) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li></ul><h2 id="css-variables"><a class="header-anchor" href="#css-variables" aria-hidden="true">#</a> CSS Variables</h2><ul><li><code>--jskos-vue-itemDetails-dropzone-bgCover</code> - background color for overlay which is shown when an item is being dragged over ItemDetails <ul><li>default: #eeeeee99</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',12),d=u(" Settings: "),m=u(' This tab was added via the "additionalTabs" slot. '),g=t("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),h=u(" 🆇 "),q=u(" ⭐️ "),f=t("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),b=l('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemDetails <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Tab <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue-tabs&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  itemListOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n    indicatorByUri<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  item<span class="token operator">:</span> <span class="token punctuation">{</span>\n    uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT&quot;</span><span class="token punctuation">,</span>\n    notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token string">&quot;Detailed Item&quot;</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token string">&quot;Detalliertes Item&quot;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    altLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n      fr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Désignation alternative&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Alternative Benennung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;noch eine&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    editorialNote<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial English&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Deutsch&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      fr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Français&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    identifier<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;uri:detailed&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    created<span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>\n    issued<span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>\n    modified<span class="token operator">:</span> <span class="token string">&quot;2021-05-28&quot;</span><span class="token punctuation">,</span>\n    definition<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;a defintion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a second definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eine Definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    narrower<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT1&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;a Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT2&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;another Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;yet another Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;noch ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    ancestors<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    broader<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D-alt&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D-alt&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;a broader concept&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein übergeordnetes Konzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\n    Settings:\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>\n      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {\n        if (state.itemListOptions.indicatorByUri) {\n          state.itemListOptions._indicatorByUri = state.itemListOptions.indicatorByUri\n          delete state.itemListOptions.indicatorByUri\n        } else {\n          state.itemListOptions.indicatorByUri = state.itemListOptions._indicatorByUri\n          delete state.itemListOptions._indicatorByUri\n        }\n      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      indicators: {{ !!state.itemListOptions.indicatorByUri }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>\n      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {\n        if (state.item.scopeNote) {\n          delete state.item.scopeNote\n        } else {\n          state.item.scopeNote = {\n            de: [<span class="token punctuation">&#39;</span>Scope Deutsch<span class="token punctuation">&#39;</span>],\n            en: [<span class="token punctuation">&#39;</span>Scope English<span class="token punctuation">&#39;</span>],\n          }\n        }\n      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      {{ state.item.scopeNote ? &quot;Remove&quot; : &quot;Add&quot; }} scopeNote\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details</span>\n    <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(`Clicked on item ${$event.item.uri}`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>additionalTabs</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Test<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        This tab was added via the &quot;additionalTabs&quot; slot.\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n        🚀\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>beforeName</span><span class="token punctuation">&gt;</span></span>\n      🆇\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterName</span><span class="token punctuation">&gt;</span></span>\n      ⭐️\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n        ➕\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>item-details</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),v='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemDetails.md","lastUpdated":1627988372105}',D={};const L=Object.assign(D,{setup:function(l){const u=n({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}});return(n,l)=>(s(),a("div",null,[k,t("p",null,[d,t("button",{onClick:l[1]||(l[1]=()=>{p(u).itemListOptions.indicatorByUri?(p(u).itemListOptions._indicatorByUri=p(u).itemListOptions.indicatorByUri,delete p(u).itemListOptions.indicatorByUri):(p(u).itemListOptions.indicatorByUri=p(u).itemListOptions._indicatorByUri,delete p(u).itemListOptions._indicatorByUri)})}," indicators: "+o(!!p(u).itemListOptions.indicatorByUri),1),t("button",{onClick:l[2]||(l[2]=()=>{p(u).item.scopeNote?delete p(u).item.scopeNote:p(u).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},o(p(u).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),t(p(r),i(p(u),{onSelect:l[3]||(l[3]=n=>((...n)=>window.alert(...n))(`Clicked on item ${n.item.uri}`))}),{additionalTabs:e((()=>[t(p(c),{title:"Test"},{default:e((()=>[m])),_:1}),g])),beforeName:e((()=>[h])),afterName:e((()=>[q,f])),_:1},16),b]))}});export{v as __pageData,L as default};
