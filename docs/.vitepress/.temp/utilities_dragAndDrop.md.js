import { useSSRContext, onMounted, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './ItemName.BpIluzQm.js';
import { _ as _sfc_main$2 } from './ItemList.CtBWb-Jg.js';
import { _ as _sfc_main$3 } from './ItemDetails.DMiXtytR.js';
import { c as dragAndDrop } from './utils.Br9Zv_eu.js';
import 'jskos-tools';
/* empty css                */
import './LoadingIndicator.e8vfq6Bx.js';
import 'vue-scrollto';
import 'jskos-vue-tabs';
/* empty css               */
import './AutoLink.BuusOaCI.js';
import './LicenseInfo._OuJ6Rc-.js';

const __pageData = JSON.parse("{\"title\":\"dragAndDrop\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"utilities/dragAndDrop.md\",\"filePath\":\"utilities/dragAndDrop.md\"}");
const __default__ = {name:"utilities/dragAndDrop.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {

const { draggedItem, addDropzone } = dragAndDrop;
const {
  isDraggingOver,
} = addDropzone(null, (item) => {
  alert(`Dropped item with URI ${item.uri}`);
});
// We need to use onMounted so that dropzone is mounted in DOM
onMounted(() => {
  addDropzone(document.getElementById("dropzone"), (item) => {
    alert(`Dropped item with URI ${item.uri}`);
  });
  addDropzone(document.getElementById("dropzone2"), (item) => {
    alert(`Dropped item with URI ${item.uri}`);
  });
});
const items = [
  { notation: ["1"] },
  { notation: ["2"] },
  { notation: ["3"] },
].map(i => ({ ...i, uri: `item:${i.notation[0]}`, prefLabel: { en: `Item ${i.notation[0]}` } }));
// Selected item for ItemDetails
const selected = ref(items[2]);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(_attrs)
  }><h1 id="draganddrop" tabindex="-1">dragAndDrop <a class="header-anchor" href="#draganddrop" aria-label="Permalink to &quot;dragAndDrop&quot;">​</a></h1><p>Helper to add drag and drop functionality to JSKOS items.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { utils } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">draggedItem</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> utils.dragAndDrop</span></span></code></pre></div><h3 id="draggeditem" tabindex="-1"><code>draggedItem</code> <a class="header-anchor" href="#draggeditem" aria-label="Permalink to &quot;\`draggedItem\`&quot;">​</a></h3><p>A reactive reference to the currently dragged item. (<code>null</code> if no item is being dragged.)</p><h3 id="dragstart-item-dragend" tabindex="-1"><code>dragstart(item)</code>, <code>dragend()</code> <a class="header-anchor" href="#dragstart-item-dragend" aria-label="Permalink to &quot;\`dragstart(item)\`, \`dragend()\`&quot;">​</a></h3><p>Can be used to define a draggable item. (See <a href="#defining-a-draggable-item">below</a> on how to use this.)</p><h3 id="adddropzone-element-callback" tabindex="-1"><code>addDropzone(element, callback)</code> <a class="header-anchor" href="#adddropzone-element-callback" aria-label="Permalink to &quot;\`addDropzone(element, callback)\`&quot;">​</a></h3><p>Defines a new dropzone. (See <a href="#defining-a-dropzone">below</a> on how to use this.)</p><h2 id="defining-a-draggable-item" tabindex="-1">Defining a Draggable Item <a class="header-anchor" href="#defining-a-draggable-item" aria-label="Permalink to &quot;Defining a Draggable Item&quot;">​</a></h2><p>Any element can be defined as a draggable item. <a href="./../components/ItemName.html">ItemName</a> and rows in <a href="./../components/ItemList.html">ItemList</a> are draggable by default. To define an element as draggable, you need to set its <code>draggable</code> property to <code>true</code> and define event handlers for <code>dragstart</code> and <code>dragend</code> which are exported by <code>utils.dragAndDrop</code>.</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">  draggable</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;true&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">({ uri: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&#39;some:item&#39;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> })</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  Some item</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div><h2 id="defining-a-dropzone" tabindex="-1">Defining a Dropzone <a class="header-anchor" href="#defining-a-dropzone" aria-label="Permalink to &quot;Defining a Dropzone&quot;">​</a></h2><p>Any element can be defined as a dropzone and can therefore receive item drops. <a href="./../components/ItemDetails.html">ItemDetails</a> is a dropzone by default. To define a dropzone, you need to use the <code>addDropzone</code> function that is exported by <code>utils.dragAndDrop</code>. It needs to be called separately for every dropzone. It receives two parameters and returns an object with several properties.</p><h3 id="adddropzone-parameters" tabindex="-1"><code>addDropzone</code> Parameters <a class="header-anchor" href="#adddropzone-parameters" aria-label="Permalink to &quot;\`addDropzone\` Parameters&quot;">​</a></h3><ul><li><code>element</code> - a reference to a DOM element <ul><li>optional, but if not given, the event handlers <code>dragover</code>, <code>dragenter</code>, <code>dragleave</code>, and <code>drop</code> need to be defined manually on the element</li></ul></li><li><code>callback</code> (function) - a function that is called when an item is dropped on the dropzone <ul><li>The first parameter will be the dropped item (which is the same as <code>draggedItem</code> that is exported by <code>utils.dragAndDrop</code>).</li><li>The other parameters are any additional parameters that are providing to <code>drop</code> (usually none).</li></ul></li></ul><h3 id="adddropzone-returned-object-properties" tabindex="-1"><code>addDropzone</code> Returned Object Properties <a class="header-anchor" href="#adddropzone-returned-object-properties" aria-label="Permalink to &quot;\`addDropzone\` Returned Object Properties&quot;">​</a></h3><ul><li><code>isDraggingOver</code> (boolean) - a reactive boolean reference that is <code>true</code> if an item is currently being dragged over the dropzone <ul><li>Requires <code>dragenter</code> and <code>dragleave</code> events to be defined.</li></ul></li><li><code>dragover</code> - dragover event handler (required to enable drops) <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this <strong>has</strong> to be defined manually on the dropzone element.</li></ul></li><li><code>dragenter</code> - dragenter event handler <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this can optionally be defined manually on the dropzone element to enable <code>isDraggingOver</code> to work.</li></ul></li><li><code>dragleave</code> - dragleave event handler <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this can optionally be defined manually on the dropzone element to enable <code>isDraggingOver</code> to work.</li></ul></li><li><code>drop</code> - drop event handler (required to enable drops) <ul><li>Will be added to <code>element</code> if given.</li><li>If no element is given, this <strong>has</strong> to be defined manually on the dropzone element.</li></ul></li></ul><p>See the following examples for how this is used in practice.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="basic-example" tabindex="-1">Basic Example <a class="header-anchor" href="#basic-example" aria-label="Permalink to &quot;Basic Example&quot;">​</a></h3><p>Currently dragging: ${
    ssrInterpolate(unref(draggedItem) && unref(draggedItem).uri)
  }</p><!--[-->`);
  ssrRenderList(unref(items), (item) => {
    _push(`<div draggable="true">${ssrInterpolate(item.uri)}</div>`);
  });
  _push(`<!--]--><div class="${
    ssrRenderClass({
    drag: unref(draggedItem),
    noDrag: !unref(draggedItem),
    draggingOver: unref(isDraggingOver),
  })
  }">${
    ssrInterpolate(unref(draggedItem) ? "Try to drop the item here" : "Start dragging an item")
  }</div><div id="dropzone" class="noDrag" style="${
    ssrRenderStyle({"height":"100px"})
  }"> This zone does not change, but you can drop an item here. </div><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> setup</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { onMounted } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { utils } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">draggedItem</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> utils.dragAndDrop</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  dragover</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  dragenter</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  dragleave</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  drop</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  isDraggingOver</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">} </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">null</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, (</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">) </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">  alert</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`Dropped item with URI \${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">uri</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">})</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">// We need to use onMounted so that dropzone is mounted in DOM</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">onMounted</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(() </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">  addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(document.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">getElementById</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;dropzone&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">), (</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">) </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    alert</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`Dropped item with URI \${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">uri</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  })</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">})</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> [</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;1&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;2&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;3&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">].</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">map</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> ({ </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">...</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i, uri: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`item:\${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">notation</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">]</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, prefLabel: { en: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`Item \${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">notation</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">]</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } }))</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  Currently dragging: {{ draggedItem </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">&amp;&amp;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> draggedItem.uri }}</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">  &lt;!-- Defining draggable items --&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">    v-for</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">in</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">key</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item.uri</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    draggable</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;true&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(item)</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    {{ item.uri }}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">  &lt;!-- Dropzone with manually set events and conditional CSS classes --&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">class</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">{</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      drag: draggedItem,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      noDrag: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">!</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">draggedItem,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      draggingOver: isDraggingOver,</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    }</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragover</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">dragover</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragenter</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">dragenter</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">dragleave</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">dragleave</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">drop</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">drop</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    {{ draggedItem </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">?</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;Try to drop the item here&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;Start dragging an item&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> }}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">  &lt;!-- Dropzone that we can get by ID; no conditional CSS classes --&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    id</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;dropzone&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    class</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;noDrag&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">height</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">100</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    This zone does not change, but you can drop an item here.</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">.drag</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">.noDrag</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  height</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">50</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  width</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">250</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  margin</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">20</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  padding</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">10</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  display</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">flex</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  justify-content</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">center</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  align-items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">center</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  text-align</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">center</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  border</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> solid</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> black</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">.drag</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  border-style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dashed</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">.draggingOver</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">  background-color</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">red</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div><h3 id="example-with-itemname-itemlist-itemdetails" tabindex="-1">Example with ItemName/ItemList/ItemDetails <a class="header-anchor" href="#example-with-itemname-itemlist-itemdetails" aria-label="Permalink to &quot;Example with ItemName/ItemList/ItemDetails&quot;">​</a></h3><div id="dropzone2" style="${
    ssrRenderStyle({"height":"100px","width":"250px","display":"flex","justify-content":"center","align-items":"center","border":"1px solid black"})
  }"> You can drop an item here. </div><p> Single item: `);
  _push(ssrRenderComponent(_sfc_main$1, {
    item: unref(items)[0]
  }, null, _parent));
  _push(`</p><p>ItemList:</p>`);
  _push(ssrRenderComponent(_sfc_main$2, { items: unref(items) }, null, _parent));
  _push(`<p>ItemDetails (is a dropzone by default):</p>`);
  _push(ssrRenderComponent(_sfc_main$3, {
    item: selected.value,
    onSelect: $event => (selected.value = $event.item)
  }, null, _parent));
  _push(`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> setup</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { onMounted } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { utils, ItemName, ItemList, ItemDetails } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">draggedItem</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragstart</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">dragend</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> utils.dragAndDrop</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">// We need to use onMounted so that dropzone2 is mounted in DOM</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">onMounted</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(() </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">  addDropzone</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(document.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">getElementById</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;dropzone2&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">), (</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">) </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    alert</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`Dropped item with URI \${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">uri</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  })</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">})</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> [</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;1&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;2&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  { notation: [</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;3&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">] },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">].</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">map</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> ({ </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">...</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i, uri: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`item:\${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">notation</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">]</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, prefLabel: { en: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">\`Item \${</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">i</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">notation</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">]</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">}\`</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } }))</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">// Selected item for ItemDetails</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> selected</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> ref</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(items[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">2</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">])</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    id</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;dropzone2&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">height</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">100</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">width</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">250</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">display</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">flex</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">justify-content</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">center</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">align-items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">center</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">border</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> solid</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> black</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    You can drop an item here.</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  Single item: &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">item-name</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">items[</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">]</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> /&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  ItemList:</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">item-list</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">items</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> /&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  ItemDetails (is a dropzone by default):</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">item-details</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">selected</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    @</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">select</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">selected </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> \$event.item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> /&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div></div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("utilities/dragAndDrop.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
