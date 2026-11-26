import { ref, computed, mergeProps, nextTick, useSSRContext, resolveComponent, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import * as jskos from 'jskos-tools';
import { _ as _sfc_main$3 } from './Arrow.C-ZbZRg0.js';
import { _ as _sfc_main$2 } from './ItemSuggest.CfjA9Xh2.js';
import { C as ConceptTree } from './ConceptTree.CnQdJzOA.js';
import { u as useContentLanguage, l as localOptionsToSuggest } from './utils.Br9Zv_eu.js';
import { _ as _sfc_main$5 } from './ItemSelected.DZ3dU46R.js';
import { _ as _sfc_main$4 } from './ItemName.BpIluzQm.js';
import { cdk } from 'cocoda-sdk';
/* empty css                */
import './LoadingIndicator.e8vfq6Bx.js';
import 'vue-scrollto';
import './ItemList.CtBWb-Jg.js';
import './plugin-vue_export-helper.pcqpp-6-.js';
import './RemoveIcon.CI4k6I8F.js';

const _sfc_main$1 = /*@__PURE__*/Object.assign({ name: "ItemSelect" }, {
  __name: 'ItemSelect',
  __ssrInlineRender: true,
  props: {
  // Local options (for small sets like languages)
  options: { type: Array, default: null },

  // Remote search returning OpenSearch Suggest: [q, labels[], desc[], uris[]]
  // (Same contract as ItemSuggest expects.)
  search: { type: Function, default: null },

  // Minimum query length before searching
  minChars: { type: Number, default: 1 },

  // Optional JSKOS type resources available as filters
  types: { type: Array, default: null },

  // Optional ConceptTree picker
  treeConcepts: { type: Array, default: null },
  treeLoadNarrower: { type: Function, default: null },

  // Optional: resolve a URI into a full item object if it wasn't in the suggestion cache
  // resolve: async (uri) => concept/item
  resolve: { type: Function, default: null },

  placeholder: { type: String, default: "Search…" },

  // load concepts via registry object
  registry: { type: Object, default: null },
  // load concepts from this concept scheme
  scheme: { type: Object, default: null },
},
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {



const props = __props;

const emit = __emit;
const { prefLabel: contentPrefLabel } = useContentLanguage();

const conceptTree = ref(null);
const itemSuggest = ref(null);
const treeSelected = ref(null); // highlighted/active concept in ConceptTree
const treeCollapsed = ref(true);

// Cache last suggestion items by URI so we can emit full objects, not only { uri }
const cacheByUri = ref(Object.create(null));
let cacheRequest = 0;

// --- helpers (same normalization as before) ---
function itemWithScheme(item) {
  return item.inScheme?.length || !props.scheme
    ? item
    : { ...item, inScheme: [props.scheme] }
}

function normalize(item) {
  if (!item?.uri) {
    return null
  }

  const rawLabel = item.__label || contentPrefLabel(item);

  const notation =
    (Array.isArray(item.notation) && item.notation[0]) ||
    jskos.notation(itemWithScheme(item));

  const rawLabelStr = String(rawLabel);
  const cleanedLabel =
    notation && rawLabelStr.startsWith(String(notation))
      ? rawLabelStr.slice(String(notation).length).trim()
      : rawLabelStr;

  return {
    ...item,
    __label: rawLabelStr,
    notation: (Array.isArray(item.notation) && item.notation.length)
      ? item.notation
      : (notation ? [notation] : undefined),
    prefLabel: item.prefLabel
      ? { ...item.prefLabel, und: cleanedLabel }
      : { und: cleanedLabel },
  }
}

// Use the shared local-options search, but keep ItemSelect's normalization.
// The matched objects are cached so selecting a URI can emit the full item.
function localOptionsToSuggest$1(q, types) {
  cacheRequest += 1;
  return localOptionsToSuggest(props.options, q, {
    minChars: props.minChars,
    normalize,
    types,
    onMatches(matches) {
      const nextCache = Object.create(null);
      for (const it of matches) {
        nextCache[it.uri] = it;
      }
      cacheByUri.value = nextCache;
    },
  })
}

function providerSearch(q, types = null) {
  if (props.search) {
    return types === null ? props.search(q) : props.search(q, types)
  }
  if (props.registry && props.scheme?.uri) {
    const config = { search: q, params: { voc: props.scheme.uri } };
    if (types !== null) {
      config.types = types;
    }
    return props.registry.suggest(config)
  }
  return Promise.resolve([q, [], [], []])
}


// Wrap remote search so we can also populate cacheByUri (labels+uris -> normalized objects)
function remoteSearchWrapped(q, types = null) {
  const request = ++cacheRequest;
  const query = (q || "").trim();
  if (!query || query.length < props.minChars) {
    return Promise.resolve([query, [], [], []])
  }

  return Promise.resolve(providerSearch(query, types)).then((os) => {
    const labels = os?.[1] || [];
    const uris = os?.[3] || [];

    const nextCache = Object.create(null);
    for (let i = 0; i < uris.length; i++) {
      const uri = uris[i];
      const label = labels[i] || uri;
      const it = normalize({ uri, __label: label });
      if (it) {
        nextCache[uri] = it;
      }
    }
    if (request === cacheRequest) {
      cacheByUri.value = nextCache;
    }

    return os
  })
 
}

// This is the function we pass to ItemSuggest.
const searchForSuggest = computed(() => {
  if (props.options?.length) {
    return localOptionsToSuggest$1
  } else if (props.search) {
    return remoteSearchWrapped
  } else if (props.registry && props.scheme?.uri) {
    return remoteSearchWrapped
  } else {
    console.error("Could not create suggest function for ItemSelect");
  }
  return null
});

const hasTree = computed(() => props.treeConcepts?.length || props.registry?.getTop);

// Keep the optional tree in step with the selected concept. The tree starts
// collapsed, so opening it first gives Vue a tick to mount ConceptTree before
// navigateToUri tries to expand and highlight the selected concept.
async function syncTreeTo(concept) {
  if (!hasTree.value || !concept?.uri) {
    return
  }
  treeSelected.value = concept;
  treeCollapsed.value = false;
  await nextTick();
  if (!conceptTree.value) {
    return
  }
  await conceptTree.value.navigateToUri(concept, {
    select: false,
    onlyIfNotInView: true,
  });
}

const resolver = computed(() => {
  if (props.resolve) {
    return props.resolve
  } else if (props.registry?.getConcepts) {
    return async uri => props.registry.getConcepts({ concepts: [{ uri }]}).then(c => c?.[0])
  }
  return null
});

// Resolve a selected URI to an item object (cache -> resolve() -> fallback {uri})
async function itemFromUri(uri) {
  const cached = cacheByUri.value?.[uri];
  if (cached) {
    return cached
  }

  if (resolver.value) {
    try {
      const full = await resolver.value(uri);
      return normalize(full) || { uri }
    } catch(e) {
      console.error(e);
      return { uri }
    }
  }

  return { uri }
}

// --- event handlers ---
async function onSuggestSelect(ev) {
  const uri = ev?.uri;
  if (!uri) {
    return
  }

  const concept = await itemFromUri(uri);
  emit("select", concept);

  await syncTreeTo(concept);
}

// ConceptTree emits { item, row, ... }
async function onTreeSelect(ev) {
  if (!ev?.item) {
    return
  }

  const concept = normalize(ev.item) || ev.item;
  treeSelected.value = concept;
  emit("select", concept);
}

function onTreeOpen(concept) {
  if (props.treeLoadNarrower) {
    return props.treeLoadNarrower(concept)
  }
}

__expose({
  focus() {
    itemSuggest.value?.focus?.();
  },
});

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jskos-vue-itemSelect" }, _attrs))}>`);
  if (searchForSuggest.value) {
    _push(ssrRenderComponent(_sfc_main$2, {
      ref_key: "itemSuggest",
      ref: itemSuggest,
      search: searchForSuggest.value,
      placeholder: __props.placeholder,
      types: __props.types,
      onSelect: onSuggestSelect
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  if (hasTree.value) {
    _push(`<div class="jskos-vue-itemSelect-tree"><button type="button">`);
    _push(ssrRenderComponent(_sfc_main$3, {
      direction: treeCollapsed.value ? 'right' : 'down'
    }, null, _parent));
    _push(` Hierarchy </button>`);
    if (!treeCollapsed.value) {
      _push(ssrRenderComponent(ConceptTree, {
        ref_key: "conceptTree",
        ref: conceptTree,
        concepts: __props.treeConcepts,
        "model-value": treeSelected.value,
        registry: __props.registry,
        scheme: __props.scheme,
        onSelect: onTreeSelect,
        onOpen: onTreeOpen
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
}

});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

// Local options with types

const __pageData = JSON.parse("{\"title\":\"ItemSelect\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"components/ItemSelect.md\",\"filePath\":\"components/ItemSelect.md\"}");
const __default__ = {name:"components/ItemSelect.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {

const types = [
  {
    uri: "https://schema.org/Person",
    prefLabel: { en: "Person", de: "Person" },
  },
  {
    uri: "https://schema.org/Place",
    prefLabel: { en: "Place", de: "Ort" },
  },
  {
    uri: "https://schema.org/Organization",
    prefLabel: { en: "Organization", de: "Organisation" },
  },
];
const typedOptions = [
  {
    uri: "https://example.org/alexis",
    type: ["https://schema.org/Person"],
    prefLabel: { en: "Alexis Girard (Berlin)", de: "Alexis Girard (Berlin)" },
  },
  {
    uri: "https://example.org/berlin",
    type: ["https://schema.org/Place"],
    prefLabel: { en: "Berlin", de: "Berlin" },
  },
  {
    uri: "https://example.org/archive",
    type: ["https://schema.org/Organization"],
    prefLabel: { en: "Berlin municipal archive", de: "Stadtarchiv Berlin" },
  },
];
const typedSelected = ref(null);
// Local options (languages)
const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
];
const languageSelected = ref([]);
function addUnique(listRef, item) {
  if (item?.uri && !listRef.some(i => i?.uri === item.uri)) {
    listRef.push(item);
  }
}
// Remote DDC example
const selected = ref([]);
const registry = cdk.initializeRegistry({ provider: "ConceptApi", api: "https://coli-conc.gbv.de/api/" });
const scheme = { uri: "http://bartoc.org/en/node/241" };

return (_ctx, _push, _parent, _attrs) => {
  const _component_ComponentView = resolveComponent("ComponentView");

  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="itemselect" tabindex="-1">ItemSelect <a class="header-anchor" href="#itemselect" aria-label="Permalink to &quot;ItemSelect&quot;">​</a></h1><p>Pick <a href="https://gbv.github.io/jskos/#item" target="_blank" rel="noreferrer">JSKOS item</a> at a time via:</p><ul><li>a typeahead dropdown (via <a href="./ItemSuggest.html">ItemSuggest</a>)</li><li>optional hierarchy browsing (via <a href="./ConceptTree.html">ConceptTree</a>)</li></ul><p><code>ItemSelect</code> does <strong>not</strong> keep a selection list. It only emits the picked item. If you want to show/edit a list, combine it with <a href="./ItemSelected.html">ItemSelected</a> in your app.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><ul><li><p><code>options</code> <em>array, default <code>[]</code></em> — local options (small static lists like languages).</p></li><li><p><code>search</code> <em>function</em> — remote search function in <strong>OpenSearch Suggest</strong> format (see <a href="./ItemSuggest.html">ItemSuggest</a>). Default is based on <code>options</code> (if set) or on <code>registry.suggest</code> (if both <code>registry</code> and <code>scheme</code> are set). When <code>types</code> is configured, the function receives <code>(query, selectedTypeUris)</code>.</p></li><li><p><code>types</code> <em>array, default <code>null</code></em> — optional JSKOS type resources forwarded to <code>ItemSuggest</code>. All types are selected initially and whenever this array changes.</p></li><li><p><code>resolve</code> <em>function</em> — optional async resolver to turn a selected <strong>URI</strong> into a full JSKOS item object when it is not available in the internal suggestion cache. Default is based on <code>options</code> (if set) or on <code>registry.getConcepts</code> (if available).</p></li><li><p><code>minChars</code> <em>number, default <code>1</code></em> — minimum query length before searching (applies to <code>options</code> and <code>search</code>).</p></li><li><p><code>registry</code> <em>object, default <code>null</code></em> — Registry to load concepts from</p></li><li><p><code>scheme</code> <em>object, default <code>null</code></em> — Concept Scheme to load concepts from. Must have field <code>uri</code> or <code>identifier</code> at least.</p></li><li><p><code>treeConcepts</code> <em>array</em> — top concepts for the <code>ConceptTree</code> browser below the input.<br> Default is loaded via <code>registry.getTop</code> if both <code>registry</code> and <code>scheme</code> are set.</p></li><li><p><code>placeholder</code> <em>string, default <code>&quot;Search…&quot;</code></em> —</p></li></ul><h3 id="concepttree-integration" tabindex="-1">ConceptTree integration <a class="header-anchor" href="#concepttree-integration" aria-label="Permalink to &quot;ConceptTree integration&quot;">​</a></h3><ul><li><p><code>treeConcepts</code> <em>array, default <code>[]</code></em> — top concepts for the <code>ConceptTree</code> browser below the input.<br> default: <code>[]</code> (no tree is shown for empty array)</p></li><li><p><code>treeLoadNarrower</code> <em>function</em> — called when a tree node is opened; should load <code>narrower</code>.</p></li></ul><h3 id="optional-resolving" tabindex="-1">Optional resolving <a class="header-anchor" href="#optional-resolving" aria-label="Permalink to &quot;Optional resolving&quot;">​</a></h3><ul><li><code>resolve</code> <em>function</em> optional async resolver to turn a selected <strong>URI</strong> into a full item object<br> when it is not available in the internal suggestion cache.<br> Signature: <code>async (uri) =&gt; item</code></li></ul><h3 id="ui" tabindex="-1">UI <a class="header-anchor" href="#ui" aria-label="Permalink to &quot;UI&quot;">​</a></h3><ul><li><code>placeholder</code> <em>string, default <code>&quot;Search…&quot;</code></em> — input placeholder.</li></ul><p>See <a href="./ConceptTree.html#concept-loading">concept loading of ConceptTree</a> for background information on <code>registry</code> and <code>scheme</code>.</p><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><p>The default slot is shown between input field and hierarchy.</p><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><ul><li><code>select</code> — emitted when an item is picked (via typeahead or tree). Payload is usually a normalized item. If resolving is not possible, it may fall back to <code>{ uri }</code>.</li></ul><h2 id="behavior-notes" tabindex="-1">Behavior notes <a class="header-anchor" href="#behavior-notes" aria-label="Permalink to &quot;Behavior notes&quot;">​</a></h2><p>Before emitting <code>select</code>, items are normalized:</p><ul><li>An explicit <code>__label</code> is kept. Otherwise local JSKOS labels use the shared <a href="./../utilities/useContentLanguage.html">content language selection</a>.</li><li><code>prefLabel.und</code> is added for display. Existing labels are kept.</li><li><code>notation</code> is kept. If missing, <code>jskos-tools</code> tries to derive it from the item URI and scheme.</li></ul><p><code>ItemSuggest</code> emits only <code>{ uri }</code>. <code>ItemSelect</code> caches the current suggestion result set so it can emit a full object when available. If the URI is not cached, <code>resolve(uri)</code> can provide the item. Labels already returned by a remote OpenSearch Suggest service are preserved as provided by that service.</p><p>Type filtering is handled by <code>ItemSuggest</code>. Local <code>options</code> are filtered with OR semantics before normalization. Custom search functions receive the selected type URIs, and <code>registry.suggest()</code> receives them as its <code>types</code> option. Without the <code>types</code> prop, custom search functions keep their original one-argument call.</p><p>The hierarchy browser starts collapsed. Selecting via typeahead opens it and tries to show the selected concept. If the tree is closed and opened again, the selected concept is synced again.</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p>Via component ref (<code>ref=&quot;itemSelect&quot;</code>):</p><ul><li><code>focus</code> — focuses the internal <code>ItemSuggest</code> input.</li></ul><h2 id="layout" tabindex="-1">Layout <a class="header-anchor" href="#layout" aria-label="Permalink to &quot;Layout&quot;">​</a></h2><ul><li><code>.jskos-vue-itemSelect</code></li><li><code>.jskos-vue-itemSelect-tree</code></li></ul><p>See <a href="./ItemSuggest.html">ItemSuggest</a> for styling of dropdown and <a href="./ConceptTree.html">ConceptTree</a> for styling of tree.</p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_ComponentView, {
    src: "PHNjcmlwdCBzZXR1cD4KaW1wb3J0IEl0ZW1TZWxlY3QgZnJvbSAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSXRlbVNlbGVjdC52dWUiCmltcG9ydCBJdGVtU2VsZWN0ZWQgZnJvbSAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSXRlbVNlbGVjdGVkLnZ1ZSIKaW1wb3J0IEl0ZW1OYW1lIGZyb20gIi4uLy4uL3NyYy9jb21wb25lbnRzL0l0ZW1OYW1lLnZ1ZSIKaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgb25Nb3VudGVkIH0gZnJvbSAidnVlIgppbXBvcnQgKiBhcyBqc2tvcyBmcm9tICJqc2tvcy10b29scyIKaW1wb3J0IHsgY2RrIH0gZnJvbSAiY29jb2RhLXNkayIKLy8gTG9jYWwgb3B0aW9ucyB3aXRoIHR5cGVzCmNvbnN0IHR5cGVzID0gWwogIHsKICAgIHVyaTogImh0dHBzOi8vc2NoZW1hLm9yZy9QZXJzb24iLAogICAgcHJlZkxhYmVsOiB7IGVuOiAiUGVyc29uIiwgZGU6ICJQZXJzb24iIH0sCiAgfSwKICB7CiAgICB1cmk6ICJodHRwczovL3NjaGVtYS5vcmcvUGxhY2UiLAogICAgcHJlZkxhYmVsOiB7IGVuOiAiUGxhY2UiLCBkZTogIk9ydCIgfSwKICB9LAogIHsKICAgIHVyaTogImh0dHBzOi8vc2NoZW1hLm9yZy9Pcmdhbml6YXRpb24iLAogICAgcHJlZkxhYmVsOiB7IGVuOiAiT3JnYW5pemF0aW9uIiwgZGU6ICJPcmdhbmlzYXRpb24iIH0sCiAgfSwKXQpjb25zdCB0eXBlZE9wdGlvbnMgPSBbCiAgewogICAgdXJpOiAiaHR0cHM6Ly9leGFtcGxlLm9yZy9hbGV4aXMiLAogICAgdHlwZTogWyJodHRwczovL3NjaGVtYS5vcmcvUGVyc29uIl0sCiAgICBwcmVmTGFiZWw6IHsgZW46ICJBbGV4aXMgR2lyYXJkIChCZXJsaW4pIiwgZGU6ICJBbGV4aXMgR2lyYXJkIChCZXJsaW4pIiB9LAogIH0sCiAgewogICAgdXJpOiAiaHR0cHM6Ly9leGFtcGxlLm9yZy9iZXJsaW4iLAogICAgdHlwZTogWyJodHRwczovL3NjaGVtYS5vcmcvUGxhY2UiXSwKICAgIHByZWZMYWJlbDogeyBlbjogIkJlcmxpbiIsIGRlOiAiQmVybGluIiB9LAogIH0sCiAgewogICAgdXJpOiAiaHR0cHM6Ly9leGFtcGxlLm9yZy9hcmNoaXZlIiwKICAgIHR5cGU6IFsiaHR0cHM6Ly9zY2hlbWEub3JnL09yZ2FuaXphdGlvbiJdLAogICAgcHJlZkxhYmVsOiB7IGVuOiAiQmVybGluIG11bmljaXBhbCBhcmNoaXZlIiwgZGU6ICJTdGFkdGFyY2hpdiBCZXJsaW4iIH0sCiAgfSwKXQpjb25zdCB0eXBlZFNlbGVjdGVkID0gcmVmKG51bGwpCi8vIExvY2FsIG9wdGlvbnMgKGxhbmd1YWdlcykKY29uc3QgbGFuZ3VhZ2VPcHRpb25zID0gWwogIHsgdXJpOiAidXJuOmxhbmc6ZW4iLCBwcmVmTGFiZWw6IHsgZW46ICJFbmdsaXNoIiB9IH0sCiAgeyB1cmk6ICJ1cm46bGFuZzpkZSIsIHByZWZMYWJlbDogeyBlbjogIkdlcm1hbiIgfSB9LAogIHsgdXJpOiAidXJuOmxhbmc6aXQiLCBwcmVmTGFiZWw6IHsgZW46ICJJdGFsaWFuIiB9IH0sCl0KY29uc3QgbGFuZ3VhZ2VTZWxlY3RlZCA9IHJlZihbXSkKZnVuY3Rpb24gYWRkVW5pcXVlKGxpc3RSZWYsIGl0ZW0pIHsKICBpZiAoaXRlbT8udXJpICYmICFsaXN0UmVmLnNvbWUoaSA9PiBpPy51cmkgPT09IGl0ZW0udXJpKSkgewogICAgbGlzdFJlZi5wdXNoKGl0ZW0pCiAgfQp9Ci8vIFJlbW90ZSBEREMgZXhhbXBsZQpjb25zdCBzZWxlY3RlZCA9IHJlZihbXSkKY29uc3QgcmVnaXN0cnkgPSBjZGsuaW5pdGlhbGl6ZVJlZ2lzdHJ5KHsgcHJvdmlkZXI6ICJDb25jZXB0QXBpIiwgYXBpOiAiaHR0cHM6Ly9jb2xpLWNvbmMuZ2J2LmRlL2FwaS8iIH0pCmNvbnN0IHNjaGVtZSA9IHsgdXJpOiAiaHR0cDovL2JhcnRvYy5vcmcvZW4vbm9kZS8yNDEiIH0KPC9zY3JpcHQ+Cgo8aDM+TG9jYWwgb3B0aW9ucyB3aXRoIHR5cGUgZmlsdGVyPC9oMz4KPGl0ZW0tc2VsZWN0CiAgOm9wdGlvbnM9InR5cGVkT3B0aW9ucyIKICA6dHlwZXM9InR5cGVzIgogIHBsYWNlaG9sZGVyPSJTZWxlY3QgYSBCZXJsaW4gaXRlbeKApiIKICBAc2VsZWN0PSJ0eXBlZFNlbGVjdGVkID0gJGV2ZW50IiAvPgo8cD4KICBTZWxlY3RlZCBpdGVtOgogIDxpdGVtLW5hbWUKICAgIHYtaWY9InR5cGVkU2VsZWN0ZWQiCiAgICA6aXRlbT0idHlwZWRTZWxlY3RlZCIgLz4KICA8c3BhbiB2LWVsc2U+bm9uZTwvc3Bhbj4KPC9wPgoKPGgzPkxhbmd1YWdlcyAobG9jYWwgb3B0aW9ucyk8L2gzPgo8aXRlbS1zZWxlY3QKICA6b3B0aW9ucz0ibGFuZ3VhZ2VPcHRpb25zIgogIHBsYWNlaG9sZGVyPSJQaWNrIGEgbGFuZ3VhZ2XigKYiCiAgQHNlbGVjdD0iKGl0ZW0pID0+IGFkZFVuaXF1ZShsYW5ndWFnZVNlbGVjdGVkLCBpdGVtKSIgLz4KPGl0ZW0tc2VsZWN0ZWQgdi1tb2RlbD0ibGFuZ3VhZ2VTZWxlY3RlZCIgdmlldz0idGFncyIgLz4KCjxoMz5EREMgKHJlbW90ZSwgd2l0aCB0cmVlKTwvaDM+CjxpdGVtLXNlbGVjdAogIHBsYWNlaG9sZGVyPSJTZWFyY2ggRERD4oCmIgogIDpyZWdpc3RyeT0icmVnaXN0cnkiCiAgOnNjaGVtZT0ic2NoZW1lIgogIEBzZWxlY3Q9IihpdGVtKSA9PiBhZGRVbmlxdWUoc2VsZWN0ZWQsIGl0ZW0pIiA+CiAgPGl0ZW0tc2VsZWN0ZWQgdi1tb2RlbD0ic2VsZWN0ZWQiIHZpZXc9InRhYmxlIiA6b3JkZXJhYmxlPSJ0cnVlIiAvPgo8L2l0ZW0tc2VsZWN0Pg==",
    highlightedSrc: "PHByZSBjbGFzcz0ic2hpa2kgc2hpa2ktdGhlbWVzIGdpdGh1Yi1saWdodCBnaXRodWItZGFyayB2cC1jb2RlIiB0YWJpbmRleD0iMCIgdi1wcmU9IiI+PGNvZGU+PHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5zY3JpcHQ8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHNldHVwPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+aW1wb3J0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBJdGVtU2VsZWN0IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5mcm9tPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSXRlbVNlbGVjdC52dWUiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmltcG9ydDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gSXRlbVNlbGVjdGVkIDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5mcm9tPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSXRlbVNlbGVjdGVkLnZ1ZSI8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+aW1wb3J0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBJdGVtTmFtZSA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ZnJvbTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4gIi4uLy4uL3NyYy9jb21wb25lbnRzL0l0ZW1OYW1lLnZ1ZSI8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+aW1wb3J0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiB7IHJlZiwgcmVhY3RpdmUsIG9uTW91bnRlZCB9IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5mcm9tPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiAidnVlIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5pbXBvcnQ8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAwNUNDNTstLXNoaWtpLWRhcms6Izc5QjhGRiI+ICo8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+IGFzPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBqc2tvcyA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ZnJvbTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4gImpza29zLXRvb2xzIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5pbXBvcnQ8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IHsgY2RrIH0gPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmZyb208L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+ICJjb2NvZGEtc2RrIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkE3MzdEOy0tc2hpa2ktZGFyazojNkE3MzdEIj4vLyBMb2NhbCBvcHRpb25zIHdpdGggdHlwZXM8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+Y29uc3Q8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAwNUNDNTstLXNoaWtpLWRhcms6Izc5QjhGRiI+IHR5cGVzPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiA9PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBbPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgezwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgdXJpOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imh0dHBzOi8vc2NoZW1hLm9yZy9QZXJzb24iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHByZWZMYWJlbDogeyBlbjogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJQZXJzb24iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiwgZGU6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iUGVyc29uIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gIHs8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHVyaTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJodHRwczovL3NjaGVtYS5vcmcvUGxhY2UiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHByZWZMYWJlbDogeyBlbjogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJQbGFjZSI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LCBkZTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJPcnQiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gIH0sPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgezwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgdXJpOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imh0dHBzOi8vc2NoZW1hLm9yZy9Pcmdhbml6YXRpb24iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHByZWZMYWJlbDogeyBlbjogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJPcmdhbml6YXRpb24iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiwgZGU6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iT3JnYW5pc2F0aW9uIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij5dPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmNvbnN0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMDVDQzU7LS1zaGlraS1kYXJrOiM3OUI4RkYiPiB0eXBlZE9wdGlvbnM8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ID08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IFs8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB7PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgICB1cmk6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iaHR0cHM6Ly9leGFtcGxlLm9yZy9hbGV4aXMiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHR5cGU6IFs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imh0dHBzOi8vc2NoZW1hLm9yZy9QZXJzb24iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPl0sPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgICBwcmVmTGFiZWw6IHsgZW46IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iQWxleGlzIEdpcmFyZCAoQmVybGluKSI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LCBkZTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJBbGV4aXMgR2lyYXJkIChCZXJsaW4pIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gIHs8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHVyaTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJodHRwczovL2V4YW1wbGUub3JnL2JlcmxpbiI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgdHlwZTogWzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iaHR0cHM6Ly9zY2hlbWEub3JnL1BsYWNlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij5dLDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgcHJlZkxhYmVsOiB7IGVuOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+IkJlcmxpbiI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LCBkZTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJCZXJsaW4iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gIH0sPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgezwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgdXJpOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imh0dHBzOi8vZXhhbXBsZS5vcmcvYXJjaGl2ZSI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgdHlwZTogWzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iaHR0cHM6Ly9zY2hlbWEub3JnL09yZ2FuaXphdGlvbiI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+XSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAgIHByZWZMYWJlbDogeyBlbjogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJCZXJsaW4gbXVuaWNpcGFsIGFyY2hpdmUiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiwgZGU6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iU3RhZHRhcmNoaXYgQmVybGluIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB9LDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij5dPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmNvbnN0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMDVDQzU7LS1zaGlraS1kYXJrOiM3OUI4RkYiPiB0eXBlZFNlbGVjdGVkPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiA9PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiByZWY8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+KDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDA1Q0M1Oy0tc2hpa2ktZGFyazojNzlCOEZGIj5udWxsPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPik8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZBNzM3RDstLXNoaWtpLWRhcms6IzZBNzM3RCI+Ly8gTG9jYWwgb3B0aW9ucyAobGFuZ3VhZ2VzKTwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5jb25zdDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDA1Q0M1Oy0tc2hpa2ktZGFyazojNzlCOEZGIj4gbGFuZ3VhZ2VPcHRpb25zPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiA9PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBbPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgeyB1cmk6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4idXJuOmxhbmc6ZW4iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiwgcHJlZkxhYmVsOiB7IGVuOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+IkVuZ2xpc2giPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiB9IH0sPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgeyB1cmk6IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4idXJuOmxhbmc6ZGUiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiwgcHJlZkxhYmVsOiB7IGVuOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Ikdlcm1hbiI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IH0gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB7IHVyaTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJ1cm46bGFuZzppdCI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LCBwcmVmTGFiZWw6IHsgZW46IDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iSXRhbGlhbiI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IH0gfSw8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+XTwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5jb25zdDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDA1Q0M1Oy0tc2hpa2ktZGFyazojNzlCOEZGIj4gbGFuZ3VhZ2VTZWxlY3RlZDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj4gPTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gcmVmPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPihbXSk8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ZnVuY3Rpb248L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IGFkZFVuaXF1ZTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4oPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNFMzYyMDk7LS1zaGlraS1kYXJrOiNGRkFCNzAiPmxpc3RSZWY8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+LCA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0UzNjIwOTstLXNoaWtpLWRhcms6I0ZGQUI3MCI+aXRlbTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4pIHs8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ICBpZjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gKGl0ZW0/LnVyaSA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+JiN4MjY7JiN4MjY7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiAhPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPmxpc3RSZWYuPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPnNvbWU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+KDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRTM2MjA5Oy0tc2hpa2ktZGFyazojRkZBQjcwIj5pPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiA9Pjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gaT8udXJpIDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj49PT08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IGl0ZW0udXJpKSkgezwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICAgbGlzdFJlZi48L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+cHVzaDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4oaXRlbSk8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICB9PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPn08L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZBNzM3RDstLXNoaWtpLWRhcms6IzZBNzM3RCI+Ly8gUmVtb3RlIEREQyBleGFtcGxlPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmNvbnN0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMDVDQzU7LS1zaGlraS1kYXJrOiM3OUI4RkYiPiBzZWxlY3RlZDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj4gPTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gcmVmPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPihbXSk8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+Y29uc3Q8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAwNUNDNTstLXNoaWtpLWRhcms6Izc5QjhGRiI+IHJlZ2lzdHJ5PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPiA9PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBjZGsuPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPmluaXRpYWxpemVSZWdpc3RyeTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4oeyBwcm92aWRlcjogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJDb25jZXB0QXBpIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4sIGFwaTogPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJodHRwczovL2NvbGktY29uYy5nYnYuZGUvYXBpLyI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IH0pPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiNENzNBNDk7LS1zaGlraS1kYXJrOiNGOTc1ODMiPmNvbnN0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMDVDQzU7LS1zaGlraS1kYXJrOiM3OUI4RkYiPiBzY2hlbWU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+ID08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IHsgdXJpOiA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imh0dHA6Ly9iYXJ0b2Mub3JnL2VuL25vZGUvMjQxIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gfTwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4mI3gzQzsvPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPnNjcmlwdDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5oMzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+TG9jYWwgb3B0aW9ucyB3aXRoIHR5cGUgZmlsdGVyJiN4M0M7Lzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5oMzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5pdGVtLXNlbGVjdDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gIDpvcHRpb25zPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InR5cGVkT3B0aW9ucyI8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+ICA6dHlwZXM8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4idHlwZXMiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiAgcGxhY2Vob2xkZXI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iU2VsZWN0IGEgQmVybGluIGl0ZW3igKYiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiAgQHNlbGVjdDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJ0eXBlZFNlbGVjdGVkID0gJGV2ZW50Ijwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gLz48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+JiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPnA8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Pjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gIFNlbGVjdGVkIGl0ZW06PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgJiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPml0ZW0tbmFtZTwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gICAgdi1pZjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJ0eXBlZFNlbGVjdGVkIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gICAgOml0ZW08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4idHlwZWRTZWxlY3RlZCI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IC8+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgJiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPnNwYW48L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHYtZWxzZTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+bm9uZSYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+c3Bhbjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+cDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5oMzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+TGFuZ3VhZ2VzIChsb2NhbCBvcHRpb25zKSYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+aDM8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Pjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4mI3gzQzs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+aXRlbS1zZWxlY3Q8L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+ICA6b3B0aW9uczwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJsYW5ndWFnZU9wdGlvbnMiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiAgcGxhY2Vob2xkZXI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iUGljayBhIGxhbmd1YWdl4oCmIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gIEBzZWxlY3Q8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iKGl0ZW0pID0+IGFkZFVuaXF1ZShsYW5ndWFnZVNlbGVjdGVkLCBpdGVtKSI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+IC8+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5pdGVtLXNlbGVjdGVkPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiB2LW1vZGVsPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Imxhbmd1YWdlU2VsZWN0ZWQiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiB2aWV3PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InRhZ3MiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAvPjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4mI3gzQzs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+aDM8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PkREQyAocmVtb3RlLCB3aXRoIHRyZWUpJiN4M0M7Lzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5oMzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5pdGVtLXNlbGVjdDwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gIHBsYWNlaG9sZGVyPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+IlNlYXJjaCBEREPigKYiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiAgOnJlZ2lzdHJ5PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InJlZ2lzdHJ5Ijwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gIDpzY2hlbWU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4ic2NoZW1lIjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gIEBzZWxlY3Q8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iKGl0ZW0pID0+IGFkZFVuaXF1ZShzZWxlY3RlZCwgaXRlbSkiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiA+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgJiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPml0ZW0tc2VsZWN0ZWQ8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHYtbW9kZWw8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4ic2VsZWN0ZWQiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiB2aWV3PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InRhYmxlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gOm9yZGVyYWJsZTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJ0cnVlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gLz48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+JiN4M0M7Lzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5pdGVtLXNlbGVjdDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj48L2NvZGU+PC9wcmU+"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<h3${_scopeId}>Local options with type filter</h3>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          options: typedOptions,
          types: types,
          placeholder: "Select a Berlin item…",
          onSelect: $event => (typedSelected.value = $event)
        }, null, _parent, _scopeId));
        _push(`<p${_scopeId}> Selected item: `);
        if (typedSelected.value) {
          _push(ssrRenderComponent(_sfc_main$4, { item: typedSelected.value }, null, _parent, _scopeId));
        } else {
          _push(`<span${_scopeId}>none</span>`);
        }
        _push(`</p><h3${_scopeId}>Languages (local options)</h3>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          options: languageOptions,
          placeholder: "Pick a language…",
          onSelect: (item) => addUnique(languageSelected.value, item)
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(_sfc_main$5, {
          modelValue: languageSelected.value,
          "onUpdate:modelValue": $event => ((languageSelected).value = $event),
          view: "tags"
        }, null, _parent, _scopeId));
        _push(`<h3${_scopeId}>DDC (remote, with tree)</h3>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          placeholder: "Search DDC…",
          registry: unref(registry),
          scheme: scheme,
          onSelect: (item) => addUnique(selected.value, item)
        }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(_sfc_main$5, {
                modelValue: selected.value,
                "onUpdate:modelValue": $event => ((selected).value = $event),
                view: "table",
                orderable: true
              }, null, _parent, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$5, {
                  modelValue: selected.value,
                  "onUpdate:modelValue": $event => ((selected).value = $event),
                  view: "table",
                  orderable: true
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Local options with type filter"),
          createVNode(_sfc_main$1, {
            options: typedOptions,
            types: types,
            placeholder: "Select a Berlin item…",
            onSelect: $event => (typedSelected.value = $event)
          }, null, 8, ["onSelect"]),
          createVNode("p", null, [
            createTextVNode(" Selected item: "),
            (typedSelected.value)
              ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  item: typedSelected.value
                }, null, 8, ["item"]))
              : (openBlock(), createBlock("span", { key: 1 }, "none"))
          ]),
          createVNode("h3", null, "Languages (local options)"),
          createVNode(_sfc_main$1, {
            options: languageOptions,
            placeholder: "Pick a language…",
            onSelect: (item) => addUnique(languageSelected.value, item)
          }, null, 8, ["onSelect"]),
          createVNode(_sfc_main$5, {
            modelValue: languageSelected.value,
            "onUpdate:modelValue": $event => ((languageSelected).value = $event),
            view: "tags"
          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode("h3", null, "DDC (remote, with tree)"),
          createVNode(_sfc_main$1, {
            placeholder: "Search DDC…",
            registry: unref(registry),
            scheme: scheme,
            onSelect: (item) => addUnique(selected.value, item)
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$5, {
                modelValue: selected.value,
                "onUpdate:modelValue": $event => ((selected).value = $event),
                view: "table",
                orderable: true
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          }, 8, ["registry", "onSelect"])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/ItemSelect.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
