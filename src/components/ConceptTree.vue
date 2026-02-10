<template>
  <!-- ConceptTree is basically an extension of ItemList -->
  <item-list
    ref="itemList"
    v-bind="itemListOptions"
    :class="{
      'jskos-vue-conceptTree': true,
      'jskos-vue-conceptTree-noHierarchy': !hierarchy,
    }"
    :items="items"
    item-property="concept"
    :highlight-by-uri="modelValue?.uri ? { [modelValue.uri]: true } : {}"
    @select="$emit('select', $event); $emit('update:modelValue', $event.item)">
    <template #beforeItem="{ item }">
      <!-- Use divs for depth spacers so we can have visual lines for the hierarchy -->
      <div
        v-for="n in item.depth"
        :key="n"
        class="jskos-vue-conceptTree-depthSpacer" />
      <!-- Show arrow for concepts with narrower concepts -->
      <div
        v-if="hierarchy"
        class="jskos-vue-conceptTree-arrow"
        @click.stop="toggle(item.concept)">
        <arrow
          v-if="item.concept && item.concept.narrower && item.concept.narrower.length !== 0"
          :direction="isOpen[item.concept.uri] ? 'down' : 'right'"
          :clickable="true" />
      </div>
      <!-- Slot for additional content before item -->
      <slot
        name="beforeItem"
        :item="item.concept" />
    </template>
    <template #afterItem="{ item }">
      <!-- Slot for additional content after item -->
      <slot
        name="afterItem"
        :item="item.concept" />
    </template>
    <template #beforeList>
      <slot name="beforeList" />
    </template>
    <template #afterList>
      <slot name="afterList" />
    </template>
  </item-list>
</template>

<script setup>
import { computed, reactive, nextTick } from "vue"
import * as jskos from "jskos-tools"
import ItemList from "./ItemList.vue"
import Arrow from "./Arrow.vue"
import "../shared.css"

const props = defineProps({
  // v-model value is the selected concept and is marked specifically
  modelValue: {
    type: Object,
    default: null,
  },
  // array of concepts to be displayed
  concepts: {
    type: Array,
    required: true,
  },
  // whether to display concept hierarchy (via narrower concepts)
  hierarchy: {
    type: Boolean,
    default: true,
  },
  // options to be passed along to ItemList component
  itemListOptions: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(["select", "open", "close", "update:modelValue"])

// reactive object of concept URIs to open status values
const isOpen = reactive({})
// recursively get all children (narrower) items for a concept, depending on open status
const getChildrenItems = (item) => {
  let items = []
  let concept = item.concept
  let depth = item.depth + 1
  if (concept && isOpen[concept.uri]) {
    for (let child of concept.narrower || []) {
      let item = {
        concept: child,
        depth,
        isSelected: jskos.compare(props.modelValue, child),
      }
      items.push(item)
      items = items.concat(getChildrenItems(item))
    }
  }
  return items
}
// convert list of concepts into items with concept, depth, and isSelected
const items = computed(() => {
  let items = []
  for (let concept of props.concepts) {
    let item = {
      concept,
      depth: 0,
      isSelected: jskos.compare(props.modelValue, concept),
    }
    items.push(item)
    if (props.hierarchy) {
      items = items.concat(getChildrenItems(item))
    }
  }
  return items
})

const open = (concept) => {
  isOpen[concept.uri] = true
  // a certain concept's narrower concepts were opened
  emit("open", concept)
}
const close = (concept) => {
  // Prevent closing if selected concept is child
  let current = props.modelValue?.uri, initial = current
  while (current) {
    const currentConcept = items.value.find(i => jskos.compare(i.concept, { uri: current }))?.concept
    if (current !== initial && jskos.compare(currentConcept, concept)) {
      return
    }
    current = (currentConcept?.ancestors?.[0] || currentConcept?.broader?.[0])?.uri
  }
  delete isOpen[concept.uri]
  // a certain concept's narrower concepts were closed
  emit("close", concept)
}
const toggle = (concept) => {
  if (isOpen[concept.uri]) {
    close(concept)
  } else {
    open (concept)
  }
}

defineExpose({
  isUriInView(...args) {
    return this.$refs.itemList.isUriInView(...args) 
  },
  scrollToUri(...args) {
    return this.$refs.itemList.scrollToUri(...args) 
  },
  /**
     * Navigate to a concept URI in the hierarchy:
     * - If already rendered: scroll to it (and optionally select it)
     * - Else: best-effort open/load the path from top concepts down to the target (DDC/coli-conc works well)
     
     *   if the URI is already rendered → scroll + (optionally) select
     *   otherwise (hierarchy mode) → tries to open/load the path from top concepts down to the target, 
     *   using _getNarrower() + parent pointers (ancestors[0] / broader[0]) when available
     */
  async navigateToUri(uriOrConcept, { select = true, onlyIfNotInView = true } = {}) {
    const uri = typeof uriOrConcept === "string" ? uriOrConcept : uriOrConcept?.uri
    if (!uri) {
      return false
    }

    // 1) Fast path: concept already rendered
    const rendered = (this.items || []).find(i => this.jskos.compare(i.concept, { uri }))?.concept
    if (rendered) {
      if (select) {
        this.$emit("update:modelValue", rendered)
      }
      await nextTick()
      this.scrollToUri(uri, onlyIfNotInView)
      return true
    }

    // Without hierarchy we cannot "open a path"
    if (!this.hierarchy) {
      return false
    }

    // 2) Build parent chain (target -> parent -> ...), then reverse to (root -> ... -> target)
    // We try to use a registry if present on the top concepts (coli-conc / cocoda-sdk decorated concepts).
    const top0 = (this.concepts || [])[0]
    const registry = top0?._registry || top0?.inScheme?.[0]?._registry

    let chain = [{ uri }] // will become [root, ..., target]
    if (registry?.getConcepts) {
      try {
        const fetchOne = async (u) => (await registry.getConcepts({ concepts: [{ uri: u }] }))[0]
        let current = await fetchOne(uri)
        const seen = new Set([uri])

        while (current) {
          const parentUri = (current.ancestors?.[0] || current.broader?.[0])?.uri
          if (!parentUri || seen.has(parentUri)) {
            break
          }
          seen.add(parentUri)
          chain.push({ uri: parentUri })
          current = await fetchOne(parentUri)
        }
        chain.reverse()
      } catch (_) {
        // If we can't build a chain, we can't reliably open the hierarchy.
        return false
      }
    } else {
      return false
    }

    // 3) Walk from root to target, opening and loading narrower on each step
    let current = (this.concepts || []).find(c => this.jskos.compare(c, chain[0]))
    if (!current) {
      return false
    }

    for (let i = 1; i < chain.length; i++) {
      // Mark current as open
      this.isOpen[current.uri] = true

      // Load children if needed (common pattern: narrower = [null] until loaded)
      const needsLoad =
          !Array.isArray(current.narrower) ||
          (current.narrower && current.narrower.includes(null))

      if (needsLoad && typeof current._getNarrower === "function") {
        try {
          current.narrower = this.jskos.sortConcepts(await current._getNarrower())
        } catch (_) {
          // ignore; we'll fail gracefully below if child isn't found
        }
      }

      const next = (current.narrower || []).find(ch => this.jskos.compare(ch, chain[i]))
      if (!next) {
        return false
      }
      current = next
    }

    // 4) Select + scroll
    if (select) {
      this.$emit("update:modelValue", current)
    }
    await nextTick()
    this.scrollToUri(uri, onlyIfNotInView)
    return true
  },
})
</script>

<style>
.jskos-vue-conceptTree {
  user-select: none;
}
.jskos-vue-conceptTree > div {
  display: flex;
  padding-left: 0px !important;
}
.jskos-vue-conceptTree-depthSpacer {
  flex: 0 0 10px;
  border-right: 1px dashed lightgray;
}
.jskos-vue-conceptTree-arrow {
  flex: 0 0 20px;
  text-align: right;
}
.jskos-vue-conceptTree-arrow > div {
  padding-left: 0 !important;
}
/* Add padding to list elements when hierachy is turned off */
.jskos-vue-conceptTree-noHierarchy > div {
  padding-left: 5px !important;
}
</style>
