<template>
  <div
    ref="itemSuggest"
    class="jskos-vue-itemSuggest"
    @mousemove="mousemove">
    <div class="jskos-vue-itemSuggest-inputRow">
      <!-- Input field -->
      <input
        ref="searchInput"
        v-model="query"
        type="search"
        :placeholder="placeholder === null ? t('placeholder') : placeholder"
        @click="openResults"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keyup.enter="onEnter"
        @keyup.esc="$refs && $refs.searchInput && $refs.searchInput.blur(); closeResults()"
        @focus="openResults">
      <details
        v-if="availableTypes.length"
        class="jskos-vue-itemSuggest-typeFilter">
        <summary
          :aria-label="t('filterByType')"
          :title="t('filterByType')">
          {{ t("types") }}
        </summary>
        <div class="jskos-vue-itemSuggest-typeOptions">
          <label
            v-for="type in availableTypes"
            :key="type.uri">
            <input
              v-model="selectedTypes"
              type="checkbox"
              :value="type.uri">
            {{ contentPrefLabel(type, { fallbackToUri: true }) }}
          </label>
        </div>
      </details>
    </div>
    <!-- Results -->
    <div
      v-show="isOpen"
      class="jskos-vue-itemSuggest-results jskos-vue-text-small">
      <!-- Loading indicator if necessary -->
      <div
        v-if="isLoading"
        class="jskos-vue-itemSuggest-loading">
        <loading-indicator size="md" />
      </div>
      <!-- If not loading, show results -->
      <ul
        v-else
        ref="resultList"
        class="jskos-vue-itemSuggest-results-list">
        <li
          v-for="(result, i) in results"
          :key="i"
          :class="{
            'jskos-vue-itemSuggest-selected': i === searchSelected,
          }"
          class="jskos-vue-itemSuggest-results-item"
          @click="chooseResult(i)"
          @mouseover="mouseover(i)">
          <span v-html="highlightQueryInResult(result[0])" />
        </li>
        <li
          v-if="results.length == 0"
          class="jskos-vue-itemSuggest-results-item">
          <!-- TODO: Add other languages -->
          <div>No results</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
/**
 * TODOs:
 * - add drag and drop for concepts
 */

import { nextTick, ref, watch, computed } from "vue"
import LoadingIndicator from "./LoadingIndicator.vue"
import VueScrollTo from "vue-scrollto"
import { addClickHandlers, debounce, localOptionsToSuggest, useContentLanguage, useLocale } from "../utils"

import "../shared.css"

// Localization
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
})
const { prefLabel: contentPrefLabel } = useContentLanguage()

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

const props = defineProps({
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
})
  
const emit = defineEmits(["select"])
  
const isLoading = ref(false)
const isOpen = ref(false)
const query = ref("")
const searchSelected = ref(-1)
const results = ref([])
const selectedTypes = ref([])

const availableTypes = computed(() =>
  (props.types || []).filter(type => type?.uri),
)

watch(
  () => availableTypes.value.map(type => type.uri),
  (typeUris) => {
    selectedTypes.value = typeUris
  },
  { immediate: true },
)

const preventHovering = ref(false)
// Template refs (will be set at mount)
const itemSuggest = ref(null)
const searchInput = ref(null)
const resultList = ref(null)

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
})

let searchRequest = 0

const runSearch = debounce(async (searchQuery, typeUris, request) => {
  searchQuery = searchQuery.trim()
  if (!searchQuery || typeUris?.length === 0) {
    return
  }

  results.value = []

  isLoading.value = true

  if (!searchProvider.value) {
    isLoading.value = false
    return
  }

  const promise = typeUris === null
    ? searchProvider.value(searchQuery)
    : searchProvider.value(searchQuery, typeUris)
  

  // Convert OpenSearch Suggest [query, labels, descriptions, uris]
  // into result rows [label, description, uri] used by the template.
  let suggestResults
  try {
    suggestResults = (await promise).slice(1).reduce((current, next) => {
      current = next.map((element, index) => (current[index] || []).concat(element)); return current 
    }, [])
  } catch (error) {
    if (error.message === "canceled") {
      return
    }
    // seems to be a network error, logging to console
    console.error(error)
    suggestResults = []
  }

  if (request === searchRequest) {
    results.value = suggestResults
    isLoading.value = false
  }
}, 200)

function startSearch() {
  const request = ++searchRequest
  const searchQuery = query.value.trim()
  const typeUris = availableTypes.value.length ? [...selectedTypes.value] : null

  searchSelected.value = -1
  // Calling the debounced function also replaces a search that has not started yet.
  runSearch(searchQuery, typeUris, request)

  if (!searchQuery) {
    results.value = []
    isLoading.value = false
    isOpen.value = false
    return
  }

  isOpen.value = true
  if (typeUris?.length === 0) {
    results.value = []
    isLoading.value = false
    return
  }

  results.value = ["Waiting for you to stop typing..."]
  isLoading.value = true
}

watch(query, startSearch)
watch(selectedTypes, startSearch)

const openResults = () => {
  isOpen.value = query.value !== ""
}
const closeResults = () => {
  isOpen.value = false
}
const chooseResult = (chosenIndex) => {
  closeResults()
  searchSelected.value = -1
  emit("select", {
    uri: results.value[chosenIndex][2],
  })
  // Remove focus
  if (document.activeElement !== document.body) {
    document.activeElement.blur()
  }
}

const highlightQueryInResult = (result) => {
  if (!query.value.length) {
    return result
  }
  // Find all occurrences of the search query and highlight them
  const searchQuery = query.value
  const regex = new RegExp(searchQuery, "ig")
  let match = regex.exec(result), currentIndex = 0, newResult = ""
  while (match) {
    let index = match.index
    newResult += escape(result.slice(currentIndex, index))
                  + "<span class='jskos-vue-text-bold'>"
                  + escape(result.slice(index, index + searchQuery.length))
                  + "</span>"
    currentIndex = index + searchQuery.length
    match = regex.exec(result)
  }
  newResult += escape(result.slice(currentIndex))
  return newResult
}
// scroll when using up/down arrows to go through the results
const scrollSelectedIntoView = () => {
  const target = resultList.value.childNodes[searchSelected.value + 1]
  if (target) {
    const parent = target.parentElement.parentElement
    const rect = target.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()
    VueScrollTo.scrollTo(target, 100, {
      container: parent,
      easing: "ease-in",
      offset: rect.bottom > parentRect.bottom ? -parentRect.height + rect.height : 0,
      cancelable: true,
      x: false,
      y: true,
      force: false,
    })
  }
}

addClickHandlers(() => [
  {
    elements: [
      itemSuggest.value,
    ],
    handler: () => {
      isOpen.value = false
      searchSelected.value = -1
    },
  },
])

function mouseover(index) {
  if (!preventHovering.value) {
    searchSelected.value = index
  }
}
function mousemove() {
  preventHovering.value = false
}
function onArrowDown() {
  preventHovering.value = true
  if (searchSelected.value >= results.value.length - 1) {
    searchSelected.value = 0
  } else {
    searchSelected.value += 1
  }
  scrollSelectedIntoView()
}
function onArrowUp() {
  preventHovering.value = true
  if (searchSelected.value <= 0) {
    searchSelected.value = results.value.length - 1
  } else {
    searchSelected.value -= 1
  }
  scrollSelectedIntoView()
}
function onEnter() {
  let chosenIndex
  if (isLoading.value || results.value.length === 0) {
    return
  } else if (searchSelected.value < 0 || searchSelected.value >= results.value.length) {
    chosenIndex = 0
  } else {
    chosenIndex = searchSelected.value
  }
  chooseResult(chosenIndex)
}

defineExpose({
  focus() {
    searchInput.value.focus() 
  },
  setQuery(newQuery, focus = false) {
    query.value = newQuery
    if (focus) {
      searchInput.value.focus()
    } else {
      // Workaround because results will open automatically when query changes to a non-empty string
      nextTick(() => {
        closeResults()
      })
    }
  },
})
</script>

<style>
.jskos-vue-itemSuggest {
  position: relative;
  height: 34px;
}
.jskos-vue-itemSuggest-inputRow {
  display: flex;
  gap: 0.25rem;
}
.jskos-vue-itemSuggest-inputRow > input {
  flex: 1;
  min-width: 0;
  padding: 4px 8px;
}

.jskos-vue-itemSuggest-typeFilter {
  position: relative;
}

.jskos-vue-itemSuggest-typeFilter > summary {
  cursor: pointer;
  padding: 4px 8px;
  white-space: nowrap;
}

.jskos-vue-itemSuggest-typeOptions {
  background-color: var(--jskos-vue-itemSuggest-results-bgColor);
  border: 1px solid var(--jskos-vue-border-color);
  box-shadow: 0 2px 4px 0 var(--jskos-vue-itemSuggest-results-shadowColor);
  display: grid;
  gap: 0.25rem;
  min-width: max-content;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: calc(100% + 3px);
  z-index: calc(var(--jskos-vue-itemSuggest-results-zIndex) + 1);
}

.jskos-vue-itemSuggest-results {
  position: absolute;
  overflow: auto;
  height: auto;
  max-height: 250px;
  width: 100%;
  padding: 0;
  margin: 3px 0;
  background-color: var(--jskos-vue-itemSuggest-results-bgColor);
  box-shadow: 0 2px 4px 0 var(--jskos-vue-itemSuggest-results-shadowColor);
  z-index: var(--jskos-vue-itemSuggest-results-zIndex);
}

.jskos-vue-itemSuggest-results-list {
  padding: 0;
  margin: 0;
}

.jskos-vue-itemSuggest-results-item {
  list-style: none;
  text-align: left;
  cursor: pointer;
  padding: 3px 0px 3px 12px;
}

.jskos-vue-itemSuggest-selected {
  color: var(--jskos-vue-itemSuggest-selected-color);
  background-color: var(--jskos-vue-itemSuggest-selected-bgColor);
}

.jskos-vue-itemSuggest-loading {
  width: 100%;
  height: 30px;
  padding: 4px 0 0 10px;
  z-index: var(--jskos-vue-itemSuggest-results-zIndex);
}
</style>
