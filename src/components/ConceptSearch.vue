<template>
  <div
    ref="conceptSearch"
    class="jskos-vue-conceptSearch"
    @mousemove="mousemove">
    <input
      ref="searchInput"
      v-model="query"
      placeholder="Type to search..."
      @click="openResults"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keyup.enter="onEnter"
      @keyup.esc="$refs.searchInput.blur(); closeResults()"
      @focus="openResults">
    <!-- Results -->
    <div
      v-show="isOpen"
      class="jskos-vue-conceptSearch-results jskos-vue-text-small">
      <div
        v-if="isLoading"
        class="jskos-vue-conceptSearch-loading">
        <!-- <loading-indicator /> -->
        Loading...
      </div>
      <ul
        v-else
        ref="resultList"
        class="jskos-vue-conceptSearch-results-list">
        <li
          v-for="(result, i) in results"
          :key="i"
          :class="{
            'jskos-vue-conceptSearch-selected': i === searchSelected,
          }"
          class="jskos-vue-conceptSearch-results-item"
          @click="chooseResult(i)"
          @mouseover="mouseover(i)">
          <span v-html="highlightQueryInResult(result[0])" />
        </li>
        <li
          v-if="results.length == 0"
          class="jskos-vue-conceptSearch-results-item">
          <div>No results</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * TODOs:
 * - add types popover (or at least provide a way to add it after the fact)
 * - add drag and drop for concepts
 */

import { computed, defineComponent, nextTick, ref, watch } from "vue"
import jskos from "jskos-tools"
import VueScrollTo from "vue-scrollto"
import { addClickHandlers, debounce } from "../utils"

function escape(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export default defineComponent({
  name: "ConceptSearch",
  props: {
    scheme: {
      type: Object,
      required: true,
    },
    registry: {
      type: Object,
      default: null,
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const _registry = computed(() => props.registry || props.scheme._registry)
    const isLoading = ref(false)
    const isOpen = ref(false)
    const cancel = ref(null)
    const query = ref("")
    const searchSelected = ref(-1)
    const results = ref([])
    const uniqueID = "abc"
    const preventHovering = ref(false)
    // Template refs (will be set at mount)
    const conceptSearch = ref(null)
    const searchInput = ref(null)
    const resultList = ref(null)

    const search = debounce(async (searchQuery) => {
      if (!_registry.value) {
        return []
      }
      searchQuery = searchQuery.trim()
      results.value = []

      isLoading.value = true

      const promise = _registry.value.suggest({ search: searchQuery, scheme: props.scheme })
      cancel.value = promise.cancel

      let suggestResults
      try {
        suggestResults = (await promise).slice(1).reduce((current, next) => { current = next.map((element, index) => (current[index] || []).concat(element)); return current }, [])
      } catch (error) {
        if (error.message === "canceled") {
          return
        }
        // seems to be a network error, logging to console
        console.error(error)
        suggestResults = []
      }

      if (searchQuery === query.value.trim()) {
        results.value = suggestResults
        cancel.value = null
        isLoading.value = false
      }
    }, 200)

    watch(query, (newQuery) => {
      searchSelected.value = -1
      // Already cancel previous request
      if (cancel.value != null) {
        cancel.value("There was a newer search query.")
        cancel.value = null
      }
      if (newQuery === "") {
        isLoading.value = false
        isOpen.value = false
      } else {
        results.value = ["Waiting for you to stop typing..."]
        isLoading.value = true
        isOpen.value = true
        search(newQuery)
      }
    })
    watch(() => props.scheme, (newValue, oldValue) => {
      if (!jskos.compare(oldValue, newValue)) {
        query.value = ""
        results.value = []
        isOpen.value = false
        isLoading.value = false
        searchSelected.value = -1
      }
    })

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
        inScheme: [props.scheme],
      })
      // Remove focus
      if (document.activeElement !== document.body) document.activeElement.blur()
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
      // Result list
      {
        elements: [
          conceptSearch.value,
        ],
        handler: () => {
          // if (!this.filterPopoverShow) {
          isOpen.value = false
          searchSelected.value = -1
          // }
        },
      },
      // Types popover
      // {
      //   elements: [
      //     document.getElementById(`conceptSearch-filter-${this.isLeft ? "left" : "right"}`),
      //     this.$refs.filterPopover,
      //   ],
      //   handler: () => {
      //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //     this.filterPopoverShow = false
      //   },
      // },
    ])

    return {
      isLoading,
      isOpen,
      query,
      searchSelected,
      results,
      uniqueID,
      openResults,
      closeResults,
      chooseResult,
      conceptSearch,
      searchInput,
      resultList,
      mouseover(index) {
        if (!preventHovering.value) {
          searchSelected.value = index
        }
      },
      mousemove() {
        preventHovering.value = false
      },
      onArrowDown() {
        preventHovering.value = true
        if (searchSelected.value >= results.value.length - 1) {
          searchSelected.value = 0
        } else {
          searchSelected.value += 1
        }
        scrollSelectedIntoView()
      },
      onArrowUp() {
        preventHovering.value = true
        if (searchSelected.value <= 0) {
          searchSelected.value = results.value.length - 1
        } else {
          searchSelected.value -= 1
        }
        scrollSelectedIntoView()
      },
      onEnter() {
        let chosenIndex
        if (isLoading.value || results.value.length === 0) {
          return
        } else if (searchSelected.value < 0 || searchSelected.value >= results.value.length) {
          chosenIndex = 0
        } else {
          chosenIndex = searchSelected.value
        }
        chooseResult(chosenIndex)
      },
      highlightQueryInResult,
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
    }
  },
})
</script>

<style scoped>
.jskos-vue-conceptSearch {
  position: relative;
  height: 34px;
}
.jskos-vue-conceptSearch > input {
  width: 100%;
  padding: 4px 8px;
}

.jskos-vue-conceptSearch-results {
  position: absolute;
  overflow: auto;
  height: auto;
  max-height: 250px;
  width: 100%;
  padding: 0;
  margin: 3px 0;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.jskos-vue-conceptSearch-results-list {
  padding: 0;
  margin: 0;
}

.jskos-vue-conceptSearch-results-item {
  list-style: none;
  text-align: left;
  cursor: pointer;
  padding: 3px 0px 3px 12px;
}

.jskos-vue-conceptSearch-selected {
  color: var(--jskos-vue-conceptSearch-selected-color);
  background-color: var(--jskos-vue-conceptSearch-selected-bg-color);
}

.jskos-vue-conceptSearch-loading {
  width: 100%;
  height: 50px;
  padding: 0px 0px 0px 12px;
  z-index: 3;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
