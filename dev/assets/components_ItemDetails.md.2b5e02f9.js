import"./chunks/ItemName.6cba955f.js";import"./chunks/ItemList.615904b5.js";import{I as k,a as y}from"./chunks/ItemDetails.c9fe9c77.js";import"./chunks/LoadingIndicator.35e914a0.js";import"./chunks/Arrow.42725cdf.js";import"./chunks/AutoLink.8ee23c2a.js";import"./chunks/ConceptTree.dddd0845.js";import"./chunks/ItemSuggest.fc45560b.js";import{v as g}from"./chunks/style.ada7e4fb.js";import"./chunks/utils.18cb2ff0.js";import{g as m,o as q,c as h,b as a,d as p,t as l,a as o,w as e,p as d,x as c,e as r}from"./app.58ffbb48.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/vue-scrollto.ec7616c3.js";const f=r('<h1 id="itemdetails" tabindex="-1">ItemDetails <a class="header-anchor" href="#itemdetails" aria-hidden="true">#</a></h1><p>Component to display details for a JSKOS item.</p><p>Uses <a href="./ItemName.html">ItemName</a>, <a href="./ItemList.html">ItemList</a>, <a href="./LicenseInfo.html">LicenseInfo</a>, <a href="./AutoLink.html">AutoLink</a>. Also uses <a href="./../utilities/dragAndDrop.html">dragAndDrop</a> and defines a dropzone for items. Dropped items will trigger the <code>select</code> event.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h2><ul><li><code>item</code> (object) - JSKOS item (concept or concept scheme) <ul><li>required</li></ul></li><li><code>itemListOptions</code> (object) - options that are passed along to <a href="./ItemList.html">ItemList</a> via v-bind <ul><li>default: <code>{}</code></li></ul></li><li><code>showTabs</code> (boolean) - option whether to show ItemDetailsTabs <ul><li>default: <code>true</code></li></ul></li><li><code>showAncestors</code> (boolean) - option whether to show the item&#39;s ancestors <ul><li>default: <code>true</code></li></ul></li><li><code>showBroader</code> (boolean) - option whether to show the item&#39;s broader concepts <ul><li>default: <code>true</code></li></ul></li><li><code>showNarrower</code> (boolean) - option whether to show the item&#39;s narrower concepts <ul><li>default: <code>true</code></li></ul></li><li><code>dropzone</code> (boolean) - option whether the component is a drop zone for concepts <ul><li>default: <code>true</code></li></ul></li></ul><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h2><ul><li><code>beforeName</code>: Content shown before the item&#39;s name.</li><li><code>afterName</code>: Content shown after the item&#39;s name.</li><li><code>additionalTabs</code>: Slot to add additional tabs (via <a href="https://github.com/gbv/jskos-vue-tabs" target="_blank" rel="noopener noreferrer">jskos-vue-tabs</a>) or absolutely positioned content for all tabs.</li></ul><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h2><ul><li><code>select</code><ul><li>Emitted when a concept is selected.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS concept) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li></ul><h2 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-hidden="true">#</a></h2><ul><li><code>--jskos-vue-itemDetails-dropzone-bgCover</code> - background color for overlay which is shown when an item is being dragged over ItemDetails <ul><li>default: <code>#eeeeee99</code></li></ul></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-hidden="true">#</a></h2><h3 id="default" tabindex="-1">Default <a class="header-anchor" href="#default" aria-hidden="true">#</a></h3>',13),b=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u{1F680} ",-1),v=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u2795 ",-1),D=r(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemDetails <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Tab <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue-tabs&quot;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">itemListOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">indicatorByUri</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;https://example.com/DT2&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;https://example.com/DT3&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dropzone</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;Detailed Item&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;Detalliertes Item&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">altLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">fr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D\xE9signation alternative&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Alternative Benennung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;noch eine&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">editorialNote</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial English&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Deutsch&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">fr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Fran\xE7ais&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">identifier</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;uri:detailed&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">created</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">issued</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">modified</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-28&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">definition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;a defintion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a second definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eine Definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">narrower</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT1&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;a Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT2&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;another Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;yet another Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;noch ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ancestors</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D0&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D0&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;another Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein weiteres Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">broader</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D-alt&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D-alt&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;a broader concept&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein \xFCbergeordnetes Konzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
    Settings:
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {
        if (state.itemListOptions.indicatorByUri) {
          state.itemListOptions._indicatorByUri = state.itemListOptions.indicatorByUri
          delete state.itemListOptions.indicatorByUri
        } else {
          state.itemListOptions.indicatorByUri = state.itemListOptions._indicatorByUri
          delete state.itemListOptions._indicatorByUri
        }
      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      indicators: {{ !!state.itemListOptions.indicatorByUri }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.dropzone = !state.dropzone<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      dropzone: {{ !!state.dropzone }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {
        if (state.item.scopeNote) {
          delete state.item.scopeNote
        } else {
          state.item.scopeNote = {
            de: [&#39;Scope Deutsch&#39;],
            en: [&#39;Scope English&#39;],
          }
        }
      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      {{ state.item.scopeNote ? &quot;Remove&quot; : &quot;Add&quot; }} scopeNote
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details</span>
    <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(\`Clicked on item \${$event.item.uri}\`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>additionalTabs</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Test<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        This tab was added via the &quot;additionalTabs&quot; slot.
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
        \u{1F680}
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>beforeName</span><span class="token punctuation">&gt;</span></span>
      \u{1F187}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterName</span><span class="token punctuation">&gt;</span></span>
      \u2B50\uFE0F
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
        \u2795
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>item-details</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="hide-tabs-and-show-them-next-to-component" tabindex="-1">Hide tabs and show them next to component <a class="header-anchor" href="#hide-tabs-and-show-them-next-to-component" aria-hidden="true">#</a></h3><p>Note: This works best when using a fixed width for ItemDetailsTabs (otherwise wrapping might change depending on the selected tab).</p>`,3),w={style:{display:"flex","flex-wrap":"wrap"}},x=r(`<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemDetails<span class="token punctuation">,</span> ItemDetailsTabs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>

<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">item</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;Detailed Item&quot;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;Detalliertes Item&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">altLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">fr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D\xE9signation alternative&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Alternative Benennung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;noch eine&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">editorialNote</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial English&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Deutsch&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">fr</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Fran\xE7ais&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">identifier</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;uri:detailed&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">created</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">issued</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">modified</span><span class="token operator">:</span> <span class="token string">&quot;2021-05-28&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">definition</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;a defintion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a second definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eine Definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">narrower</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT1&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;a Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT2&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;another Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;yet another Child&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;noch ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">ancestors</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D0&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D0&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;another Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein weiteres Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">broader</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">uri</span><span class="token operator">:</span> <span class="token string">&quot;https://example.com/D-alt&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">notation</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D-alt&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefLabel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">en</span><span class="token operator">:</span> <span class="token string">&quot;a broader concept&quot;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">de</span><span class="token operator">:</span> <span class="token string">&quot;ein \xFCbergeordnetes Konzept&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details</span>
      <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">:showTabs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span>
      <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span>
      <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(\`Clicked on item \${$event.item.uri}\`)<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details-tabs</span>
      <span class="token attr-name">:item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.item<span class="token punctuation">&quot;</span></span>
      <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">flex</span><span class="token punctuation">:</span> 0 0 280px<span class="token punctuation">;</span> <span class="token property">padding-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),P='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Default","slug":"default"},{"level":3,"title":"Hide tabs and show them next to component","slug":"hide-tabs-and-show-them-next-to-component"}],"relativePath":"components/ItemDetails.md"}',T={},$=Object.assign(T,{__name:"ItemDetails",setup(_){const n=m({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},dropzone:!0,item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["D\xE9signation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Fran\xE7ais"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D0",notation:["D0"],prefLabel:{en:"another Ancestor",de:"ein weiteres Elternkonzept"}},{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein \xFCbergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}}),u=(...i)=>window.alert(...i);return(i,s)=>(q(),h("div",null,[f,a("p",null,[p(" Settings: "),a("button",{onClick:s[0]||(s[0]=()=>{n.itemListOptions.indicatorByUri?(n.itemListOptions._indicatorByUri=n.itemListOptions.indicatorByUri,delete n.itemListOptions.indicatorByUri):(n.itemListOptions.indicatorByUri=n.itemListOptions._indicatorByUri,delete n.itemListOptions._indicatorByUri)})}," indicators: "+l(!!n.itemListOptions.indicatorByUri),1),a("button",{onClick:s[1]||(s[1]=t=>n.dropzone=!n.dropzone)}," dropzone: "+l(!!n.dropzone),1),a("button",{onClick:s[2]||(s[2]=()=>{n.item.scopeNote?delete n.item.scopeNote:n.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},l(n.item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),o(c(k),d(n,{onSelect:s[3]||(s[3]=t=>u(`Clicked on item ${t.item.uri}`))}),{additionalTabs:e(()=>[o(c(g),{title:"Test"},{default:e(()=>[p(' This tab was added via the "additionalTabs" slot. ')]),_:1}),b]),beforeName:e(()=>[p(" \u{1F187} ")]),afterName:e(()=>[p(" \u2B50\uFE0F "),v]),_:1},16),D,a("div",w,[o(c(k),d(n,{showTabs:!1,style:{flex:"1"},onSelect:s[4]||(s[4]=t=>u(`Clicked on item ${t.item.uri}`))}),null,16),o(c(y),{item:n.item,style:{flex:"0 0 280px","padding-left":"10px"}},null,8,["item"])]),x]))}});export{P as __pageData,$ as default};
