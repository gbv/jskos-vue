import { computed, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext, ref, watch, resolveComponent, withDirectives, vModelText } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import FlexibleTable from 'vue-flexible-table';
import * as jskos from 'jskos-tools';
import { _ as _sfc_main$2 } from './ItemName.BpIluzQm.js';
import { u as useContentLanguage } from './utils.Br9Zv_eu.js';
/* empty css                */

const _sfc_main$1 = {
  __name: 'MappingTable',
  __ssrInlineRender: true,
  props: {
  mappings: {
    type: Array,
    required: true,
  },
  fields: {
    type: Array,
    default: () => ["fromScheme:10", "from:22", "type:8", "toScheme:10", "to:22", "creator:16", "date:12"], 
  },
  showLabels: {
    type: Boolean,
    default: false,
  },
  header: {
    type: Boolean,
    default: () => true,
  },
},
  emits: ["hover", "click"],
  setup(__props, { emit: __emit }) {

const emit = __emit;
const { prefLabel: contentPrefLabel } = useContentLanguage();

const props = __props;

const supportedFields = {
  fromScheme: {
    label: "",
  },
  from: {
    label: "from", // TODO: this.$t("mappingBrowser.from"),
    compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "from"),
  },
  type: {
    label: "",
    compare: (a ,b) => {
      let labelA = contentPrefLabel(a?.type, { fallbackToUri: false });
      let labelB = contentPrefLabel(b?.type, { fallbackToUri: false });
      return labelA.localeCompare(labelB)
    },
  },
  toScheme: {
    label: "",
  },
  to: {
    label: "to", // TODO: this.$t("mappingBrowser.to"),
    compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "to"),
  },
  creator: {
    label: "creator", // TODO this.$t("mappingBrowser.creator"),
  },
  date: {
    label: "date", // TODO: this.$t("mappingBrowser.date"),
  },
  confidence: {
    label: "confidence", // TODO: localization
  },
};

const items = computed(() => props.mappings.map(mapping => {
  if (mapping?.from && mapping?.to) {
    let item = {};
    item.mapping = mapping;
    item.fromScheme = jskos.notation(mapping.fromScheme);
    item.toScheme = jskos.notation(mapping.toScheme);
    item.from = mapping.from.memberSet || mapping.from.memberChoice;
    item.to = mapping.to.memberSet || mapping.to.memberChoice;
    item.creator = mapping.creator?.map(creator => contentPrefLabel(creator)).join("\n");
    item.type = jskos.mappingTypeByType(mapping.type);
    item.date = mapping.modified || mapping.created;
    item.date = item.date && item.date.slice(0, 10);
    item.confidence = typeof item.mappingRelevance === "number" ? `${item.mappingRelevance}%` : null;
    item._rowClass = mapping._rowClass;
    return item
  }
}).filter(Boolean));

const fields = computed(() => props.fields.map(field => {
  const [key, width] = field.split(":");
  return key in supportedFields ? {
    key,
    class: `jskos-vue-mappingTable-${key}`,
    width: `${width}%`,
    minWidth: "",
    sortable: false,
    ...supportedFields[key],
  } : null
}).filter(Boolean));

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(unref(FlexibleTable), mergeProps({
    class: "jskos-vue-mappingTable",
    fields: fields.value,
    items: items.value,
    "hide-header": !__props.header,
    onHover: item => emit('hover', item),
    onClick: item => emit('click', item)
  }, _attrs), {
    from: withCtx(({ value }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<span${_scopeId}><!--[-->`);
        ssrRenderList(value, (concept) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: concept.uri,
            item: concept,
            "show-text": __props.showLabels,
            "is-link": false,
            "is-highlighted": false
          }, null, _parent, _scopeId));
        });
        _push(`<!--]--></span>`);
      } else {
        return [
          createVNode("span", null, [
            (openBlock(true), createBlock(Fragment, null, renderList(value, (concept) => {
              return (openBlock(), createBlock(_sfc_main$2, {
                key: concept.uri,
                item: concept,
                "show-text": __props.showLabels,
                "is-link": false,
                "is-highlighted": false
              }, null, 8, ["item", "show-text"]))
            }), 128))
          ])
        ]
      }
    }),
    to: withCtx(({ value }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<span${_scopeId}><!--[-->`);
        ssrRenderList(value, (concept) => {
          _push(`<span${_scopeId}>`);
          _push(ssrRenderComponent(_sfc_main$2, {
            item: concept,
            "show-text": __props.showLabels,
            "is-link": false,
            "is-highlighted": false
          }, null, _parent, _scopeId));
          _push(`<br${_scopeId}></span>`);
        });
        _push(`<!--]--></span>`);
      } else {
        return [
          createVNode("span", null, [
            (openBlock(true), createBlock(Fragment, null, renderList(value, (concept) => {
              return (openBlock(), createBlock("span", {
                key: concept.uri
              }, [
                createVNode(_sfc_main$2, {
                  item: concept,
                  "show-text": __props.showLabels,
                  "is-link": false,
                  "is-highlighted": false
                }, null, 8, ["item", "show-text"]),
                createVNode("br")
              ]))
            }), 128))
          ])
        ]
      }
    }),
    type: withCtx(({ value }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<span${_scopeId}>`);
        if (value != null) {
          _push(`<span${
            _scopeId
          }>${
            ssrInterpolate(jskos.notation(value))
          }</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        return [
          createVNode("span", null, [
            (value != null)
              ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(jskos.notation(value)), 1))
              : createCommentVNode("", true)
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/MappingTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const __pageData = JSON.parse("{\"title\":\"MappingTable\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"components/MappingTable.md\",\"filePath\":\"components/MappingTable.md\"}");
const __default__ = {name:"components/MappingTable.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {

const mappings = ref([]);
const apiurl = ref("https://coli-conc.gbv.de/api/mappings?limit=10");

const load = async () => {
  try {
     const url = new URL(apiurl.value);
     mappings.value = await fetch(url).then(res => res.json());
  } catch {}
};

watch(apiurl, load, { immediate: true });

const selectMapping = item => {
  item.mapping._rowClass = item.mapping._rowClass ? "" : "selected";
};

return (_ctx, _push, _parent, _attrs) => {
  const _component_ComponentView = resolveComponent("ComponentView");

  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mappingtable" tabindex="-1">MappingTable <a class="header-anchor" href="#mappingtable" aria-label="Permalink to &quot;MappingTable&quot;">​</a></h1><p>A table of <a href="https://gbv.github.io/jskos/#mapping" target="_blank" rel="noreferrer">JSKOS mappings</a>.</p><p>Concept and creator labels, as well as type-label comparisons, use the shared <a href="./../utilities/useContentLanguage.html">content language selection</a>.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><ul><li><p><code>mappings</code> <em>array, required</em> — the list of mappings to be displayed.</p></li><li><p><code>fields</code> <em>array, optional</em> — which fields to show in which order and which width in percent. Default: <code>[&quot;fromScheme:10&quot;, &quot;from:22&quot;, &quot;type:8&quot;, &quot;toScheme:10&quot;, &quot;to:22&quot;, &quot;creator:16&quot;, &quot;date:12&quot;]</code></p><ul><li><code>fromScheme</code> — source concept scheme (notation)</li><li><code>from</code> — source concepts</li><li><code>toScheme</code> — target concept scheme (notation)</li><li><code>to</code> — target concepts</li><li><code>type</code> — mapping type (symbol)</li><li><code>date</code> — date of modification (if given) or creation (otherwise)</li><li><code>confidence</code> — JSKOS <code>mappingRelevance</code> in percent</li></ul></li><li><p><code>showLabels</code> <em>boolean, default <code>false</code></em> — whether to show the concepts&#39; labels</p></li><li><p><code>header</code> <em>boolean, default <code>true</code></em> — whether to show the table header</p></li></ul><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><ul><li><p><code>hover</code> when a mapping row is hovered or unhovered</p></li><li><p><code>click</code> when a mapping row is clicked</p></li></ul><h2 id="css-classes" tabindex="-1">CSS classes <a class="header-anchor" href="#css-classes" aria-label="Permalink to &quot;CSS classes&quot;">​</a></h2><ul><li><code>.jskos-vue-mappingTable</code> — the component element</li><li><code>.jskos-vue-mappingTable-\${FIELD}</code> — table cell for each of the fields</li></ul><p>The table is based on <a href="https://www.npmjs.com/package/vue-flexible-table" target="_blank" rel="noreferrer">vue-flexible-table</a>, so its configuration, CSS classes and variables can also be used.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_ComponentView, {
    src: "PGlucHV0IHYtbW9kZWwubGF6eT0iYXBpdXJsIiB0eXBlPSJ0ZXh0IiBwbGFjZWhvbGRlcj0iQVBJIHJlcXVlc3QgVVJMIiBzdHlsZT0id2lkdGg6IDEwMCUiIC8+CjxidXR0b24gQGNsaWNrPSJsb2FkIj5sb2FkPC9idXR0b24+CjxtYXBwaW5nLXRhYmxlIDptYXBwaW5ncz0ibWFwcGluZ3MiIDpzaG93LWxhYmVscz0idHJ1ZSIgQGNsaWNrPSJzZWxlY3RNYXBwaW5nIi8+Cgo8bWFwcGluZy10YWJsZSA6bWFwcGluZ3M9Im1hcHBpbmdzIiA6c2hvdy1sYWJlbHM9InRydWUiIDpmaWVsZHM9IlsndHlwZToxMCcsJ3RvU2NoZW1lOjE1JywndG86NzUnXSIgOmhlYWRlcj0iZmFsc2UiLz4=",
    highlightedSrc: "PHByZSBjbGFzcz0ic2hpa2kgc2hpa2ktdGhlbWVzIGdpdGh1Yi1saWdodCBnaXRodWItZGFyayB2cC1jb2RlIiB0YWJpbmRleD0iMCIgdi1wcmU9IiI+PGNvZGU+PHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5pbnB1dDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gdi1tb2RlbC5sYXp5PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+ImFwaXVybCI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHR5cGU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4idGV4dCI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHBsYWNlaG9sZGVyPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+IkFQSSByZXF1ZXN0IFVSTCI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHN0eWxlPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+IndpZHRoOiAxMDAlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gLz48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+JiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPmJ1dHRvbjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gQGNsaWNrPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+ImxvYWQiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj5sb2FkJiN4M0M7Lzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5idXR0b248L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Pjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4mI3gzQzs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+bWFwcGluZy10YWJsZTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gOm1hcHBpbmdzPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+Im1hcHBpbmdzIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gOnNob3ctbGFiZWxzPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InRydWUiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiBAY2xpY2s8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4ic2VsZWN0TWFwcGluZyI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Lz48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+JiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPm1hcHBpbmctdGFibGU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IDptYXBwaW5nczwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJtYXBwaW5ncyI8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IDpzaG93LWxhYmVsczwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJ0cnVlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gOmZpZWxkczwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJbJ3R5cGU6MTAnLCd0b1NjaGVtZToxNScsJ3RvOjc1J10iPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiM2RjQyQzE7LS1zaGlraS1kYXJrOiNCMzkyRjAiPiA6aGVhZGVyPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+ImZhbHNlIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4vPjwvc3Bhbj48L3NwYW4+PC9jb2RlPjwvcHJlPg=="
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<input${
          ssrRenderAttr("value", apiurl.value)
        } type="text" placeholder="API request URL" style="${
          ssrRenderStyle({"width":"100%"})
        }"${
          _scopeId
        }><button${
          _scopeId
        }>load</button>`);
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          mappings: mappings.value,
          "show-labels": true,
          onClick: selectMapping
        }, null, _parent, _scopeId));
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          mappings: mappings.value,
          "show-labels": true,
          fields: ['type:10','toScheme:15','to:75'],
          header: false
        }, null, _parent, _scopeId));
      } else {
        return [
          withDirectives(createVNode("input", {
            "onUpdate:modelValue": $event => ((apiurl).value = $event),
            type: "text",
            placeholder: "API request URL",
            style: {"width":"100%"}
          }, null, 8, ["onUpdate:modelValue"]), [
            [
              vModelText,
              apiurl.value,
              void 0,
              { lazy: true }
            ]
          ]),
          createVNode("button", { onClick: load }, "load"),
          createVNode(unref(_sfc_main$1), {
            mappings: mappings.value,
            "show-labels": true,
            onClick: selectMapping
          }, null, 8, ["mappings"]),
          createVNode(unref(_sfc_main$1), {
            mappings: mappings.value,
            "show-labels": true,
            fields: ['type:10','toScheme:15','to:75'],
            header: false
          }, null, 8, ["mappings"])
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
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/MappingTable.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
