import { ref, computed, watch, nextTick, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './LoadingIndicator.e8vfq6Bx.js';
import 'vue-scrollto';
import { a as useLocale, u as useContentLanguage, l as localOptionsToSuggest, b as addClickHandlers, d as debounce } from './utils.Br9Zv_eu.js';
/* empty css                */

// Localization

const _sfc_main = {
  __name: 'ItemSuggest',
  __ssrInlineRender: true,
  props: {
  // async function that returns results in OpenSearch Suggest Format
  search: {
    type: Function,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  // Local options (for small sets like languages)
  options: { type: Array, default: null },
  // Optional JSKOS type resources available as filters
  types: { type: Array, default: null },
  // Minimum query length before searching local options
  minChars: { type: Number, default: 1 },
},
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {

/**
 * TODOs:
 * - add drag and drop for concepts
 */

const { t } = useLocale({
  de: {
    placeholder: "Tippen zum Suchen...",
    filterByType: "Nach Typ filtern",
    types: "Typen",
  },
  en: {
    placeholder: "Type to search...",
    filterByType: "Filter by type",
    types: "Types",
  },
});
const { prefLabel: contentPrefLabel } = useContentLanguage();

// HTML escape method
// TODO: Move to utils?
function escape(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const props = __props;
  
const isLoading = ref(false);
const isOpen = ref(false);
const query = ref("");
const searchSelected = ref(-1);
const results = ref([]);
const selectedTypes = ref([]);

const availableTypes = computed(() =>
  (props.types || []).filter(type => type?.uri),
);

watch(
  () => availableTypes.value.map(type => type.uri),
  (typeUris) => {
    selectedTypes.value = typeUris;
  },
  { immediate: true },
);

ref(false);
// Template refs (will be set at mount)
const itemSuggest = ref(null);
const searchInput = ref(null);
ref(null);

function normalizeLocalOption(item) {
  if (!item?.uri) {
    return null
  }
  return {
    uri: item.uri,
    __label: item.__label || contentPrefLabel(item) || item.uri,
  }
}

// Prefer an explicit search function; fall back to local options for small lists.
const searchProvider = computed(() => {
  if (props.search) {
    return props.search
  }
  if (props.options?.length) {
    return (q, types) => localOptionsToSuggest(props.options, q, {
      minChars: props.minChars,
      normalize: normalizeLocalOption,
      types,
    })
  }
  return null
});

let searchRequest = 0;

const runSearch = debounce(async (searchQuery, typeUris, request) => {
  searchQuery = searchQuery.trim();
  if (!searchQuery || typeUris?.length === 0) {
    return
  }

  results.value = [];

  isLoading.value = true;

  if (!searchProvider.value) {
    isLoading.value = false;
    return
  }

  const promise = typeUris === null
    ? searchProvider.value(searchQuery)
    : searchProvider.value(searchQuery, typeUris);
  

  // Convert OpenSearch Suggest [query, labels, descriptions, uris]
  // into result rows [label, description, uri] used by the template.
  let suggestResults;
  try {
    suggestResults = (await promise).slice(1).reduce((current, next) => {
      current = next.map((element, index) => (current[index] || []).concat(element)); return current 
    }, []);
  } catch (error) {
    if (error.message === "canceled") {
      return
    }
    // seems to be a network error, logging to console
    console.error(error);
    suggestResults = [];
  }

  if (request === searchRequest) {
    results.value = suggestResults;
    isLoading.value = false;
  }
}, 200);

function startSearch() {
  const request = ++searchRequest;
  const searchQuery = query.value.trim();
  const typeUris = availableTypes.value.length ? [...selectedTypes.value] : null;

  searchSelected.value = -1;
  // Calling the debounced function also replaces a search that has not started yet.
  runSearch(searchQuery, typeUris, request);

  if (!searchQuery) {
    results.value = [];
    isLoading.value = false;
    isOpen.value = false;
    return
  }

  isOpen.value = true;
  if (typeUris?.length === 0) {
    results.value = [];
    isLoading.value = false;
    return
  }

  results.value = ["Waiting for you to stop typing..."];
  isLoading.value = true;
}

watch(query, startSearch);
watch(selectedTypes, startSearch);
const closeResults = () => {
  isOpen.value = false;
};

const highlightQueryInResult = (result) => {
  if (!query.value.length) {
    return result
  }
  // Find all occurrences of the search query and highlight them
  const searchQuery = query.value;
  const regex = new RegExp(searchQuery, "ig");
  let match = regex.exec(result), currentIndex = 0, newResult = "";
  while (match) {
    let index = match.index;
    newResult += escape(result.slice(currentIndex, index))
                  + "<span class='jskos-vue-text-bold'>"
                  + escape(result.slice(index, index + searchQuery.length))
                  + "</span>";
    currentIndex = index + searchQuery.length;
    match = regex.exec(result);
  }
  newResult += escape(result.slice(currentIndex));
  return newResult
};

addClickHandlers(() => [
  {
    elements: [
      itemSuggest.value,
    ],
    handler: () => {
      isOpen.value = false;
      searchSelected.value = -1;
    },
  },
]);

__expose({
  focus() {
    searchInput.value.focus(); 
  },
  setQuery(newQuery, focus = false) {
    query.value = newQuery;
    if (focus) {
      searchInput.value.focus();
    } else {
      // Workaround because results will open automatically when query changes to a non-empty string
      nextTick(() => {
        closeResults();
      });
    }
  },
});

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(mergeProps({
      ref_key: "itemSuggest",
      ref: itemSuggest,
      class: "jskos-vue-itemSuggest"
    }, _attrs))
  }><div class="jskos-vue-itemSuggest-inputRow"><input${
    ssrRenderAttr("value", query.value)
  } type="search"${
    ssrRenderAttr("placeholder", __props.placeholder === null ? unref(t)('placeholder') : __props.placeholder)
  }>`);
  if (availableTypes.value.length) {
    _push(`<details class="jskos-vue-itemSuggest-typeFilter"><summary${
      ssrRenderAttr("aria-label", unref(t)('filterByType'))
    }${
      ssrRenderAttr("title", unref(t)('filterByType'))
    }>${
      ssrInterpolate(unref(t)("types"))
    }</summary><div class="jskos-vue-itemSuggest-typeOptions"><!--[-->`);
    ssrRenderList(availableTypes.value, (type) => {
      _push(`<label><input${
        (ssrIncludeBooleanAttr((Array.isArray(selectedTypes.value))
          ? ssrLooseContain(selectedTypes.value, type.uri)
          : selectedTypes.value)) ? " checked" : ""
      } type="checkbox"${
        ssrRenderAttr("value", type.uri)
      }> ${
        ssrInterpolate(unref(contentPrefLabel)(type, { fallbackToUri: true }))
      }</label>`);
    });
    _push(`<!--]--></div></details>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="jskos-vue-itemSuggest-results jskos-vue-text-small" style="${ssrRenderStyle((isOpen.value) ? null : { display: "none" })}">`);
  if (isLoading.value) {
    _push(`<div class="jskos-vue-itemSuggest-loading">`);
    _push(ssrRenderComponent(_sfc_main$1, { size: "md" }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<ul class="jskos-vue-itemSuggest-results-list"><!--[-->`);
    ssrRenderList(results.value, (result, i) => {
      _push(`<li class="${
        ssrRenderClass([{
            'jskos-vue-itemSuggest-selected': i === searchSelected.value,
          }, "jskos-vue-itemSuggest-results-item"])
      }"><span>${
        (highlightQueryInResult(result[0])) ?? ''
      }</span></li>`);
    });
    _push(`<!--]-->`);
    if (results.value.length == 0) {
      _push(`<li class="jskos-vue-itemSuggest-results-item"><div>No results</div></li>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</ul>`);
  }
  _push(`</div></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemSuggest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
