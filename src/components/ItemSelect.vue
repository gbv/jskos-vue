<template>
  <div class="jskos-vue-itemSelect">
    <label
      v-if="label"
      class="jskos-vue-itemSelect-label">{{ label }}</label>

    <!-- Input: pick ONE item, then add to selected and reset -->
    <Multiselect
      v-model="picked"
      :options="computedOptions"
      :multiple="false"
      :close-on-select="true"
      :clear-on-select="true"
      :preserve-search="true"
      :internal-search="!search"
      :loading="loading"
      :placeholder="placeholder"
      label="__label"
      track-by="uri"
      @search-change="onSearchChange"
      @select="onPick">
      <template #option="{ option }">
        <span>{{ option.__label }}</span>
      </template>

      <template #noOptions>
        <span class="jskos-vue-itemSelect-noResult">
          {{ search ? "Start typing…" : "No options." }}
        </span>
      </template>

      <template #noResult>
        <span class="jskos-vue-itemSelect-noResult">No results.</span>
      </template>
    </Multiselect>

    <!-- Optional picker: ConceptTree (browse & pick) -->
    <div
      v-if="showTree && treeConcepts && treeConcepts.length"
      class="jskos-vue-itemSelect-tree">
      <div class="jskos-vue-itemSelect-subtitle">
        Browse
      </div>

      <ConceptTree
        ref="conceptTree"
        :concepts="treeConcepts"
        :model-value="treeSelected"
        @select="onTreeSelect"
        @open="onTreeOpen" />
    </div>

    <!-- Selected rendering delegated to ItemSelected -->
    <ItemSelected
      :items="modelValueProxy"
      :view="selectedView"
      :orderable="orderable"
      @remove="removeItem"
      @move="moveItem"
      @clear="clearItems" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue"
import Multiselect from "vue-multiselect"
import ItemSelected from "./ItemSelected.vue"
import ConceptTree from "./ConceptTree.vue"

const props = defineProps({
  // Selected items (JSKOS-like objects, or languages, etc.)
  modelValue: { type: Array, default: () => [] },

  // Local options (for small sets like languages)
  options: { type: Array, default: () => [] },

  // Remote search returning OpenSearch Suggest: [q, labels[], desc[], uris[]]
  search: { type: Function, default: null },
  minChars: { type: Number, default: 1 },

  // Optional ConceptTree picker
  showTree: { type: Boolean, default: false },
  treeConcepts: { type: Array, default: () => [] }, // top concepts
  treeLoadNarrower: { type: Function, default: null },

  label: { type: String, default: "" },
  placeholder: { type: String, default: "Search…" },

  // tags | list | table (rendered by ItemSelected)
  selectedView: { type: String, default: "tags" },
  orderable: { type: Boolean, default: false },
})

const picked = ref(null)
const loading = ref(false)
const pending = ref(null)
const remoteOptions = ref([])
const treeSelected = ref(null) // highlighted/active concept in ConceptTree
const conceptTree = ref(null)

const modelValueProxy = computed(() => {
  return dedupeByUri(props.modelValue || [])
})

const computedOptions = computed(() => {
  const list = props.search ? remoteOptions.value : (props.options || [])
  return list.map(normalize).filter(Boolean)
})

const emit = defineEmits(["update:modelValue", "select"])


// Extract DDC notation from URI if possible, TODO what about other schemes, i.e. ILC? Limitation: DDC only
function notationFromUri(uri) {
  const m = (uri || "").match(/\/class\/([^/]+)\//)
  return m ? decodeURIComponent(m[1]) : null
}
    
// Ensure every item has __label, and add notation when missing (DDC)
function normalize(item) {
  if (!item?.uri) {
    return null
  }

  const rawLabel =
      item.__label ||
      item.prefLabel?.und ||
      item.prefLabel?.en ||
      item.uri

  // Prefer existing notation, otherwise derive from DDC URI
  const notation =
      (Array.isArray(item.notation) && item.notation[0]) ||
      notationFromUri(item.uri)

  // If label already starts with the notation, remove it to avoid duplication in ItemName
  const cleanedLabel =
      notation && rawLabel.startsWith(notation)
        ? rawLabel.slice(notation.length).trim()
        : rawLabel

  return {
    ...item,
    __label: rawLabel,
    notation: (Array.isArray(item.notation) && item.notation.length)
      ? item.notation
      : (notation ? [notation] : undefined),
    // Keep existing prefLabel keys if present, but ensure a usable label
    prefLabel: item.prefLabel
      ? { ...item.prefLabel, und: cleanedLabel }
      : { und: cleanedLabel },
  }
}
    
// Dedupe items by `uri` while keeping the original insertion order.
// We run `normalize()` so every returned item has a consistent shape
// (e.g. ensures `__label` exists, drops invalid items).
function dedupeByUri(items) {
  const seen = new Set()
  const out = []

  for (const it of items || []) {
    // Normalize first: ensures shape + label, may return null if invalid.
    const n = normalize(it)

    // Skip if normalization failed or if there's no URI.
    if (!n?.uri) {
      continue
    }

    // Skip duplicates: if we already saw this URI, don't add it again.
    if (seen.has(n.uri)) {
      continue
    }

    // First time we see this URI: remember it and keep the item.
    seen.add(n.uri)
    out.push(n)
  }

  return out
}

async function syncTreeTo(concept) {
  // Only if ConceptTree is shown and mounted
  if (!props.showTree || !conceptTree.value) {
    return
  }

  // Highlight this concept in the tree
  treeSelected.value = concept

  // Wait for DOM update, then ask ConceptTree to reveal it
  await nextTick()

  // IMPORTANT: select=false because ItemSelect manages selection (array),
  // ConceptTree's modelValue is just for highlight/scroll here.
  await conceptTree.value.navigateToUri(concept, {
    select: false,
    onlyIfNotInView: true,
  })
}

// Add selected item to v-model,
function onPick(item) {
  const concept = normalize(item)
  if (!concept) {
    return
  }

  // Add to modelValue, deduping by URI
  const next = dedupeByUri([...(modelValueProxy.value || []), concept])
  emit("update:modelValue", next)
  emit("select", concept)

  // Reset input so it behaves like "add tag"
  picked.value = null

  // Reveal in the tree (open path + scroll)
  syncTreeTo(concept)
}

function moveItem({ from, to }) {
  const items = [...(modelValueProxy.value || [])]
  if (from < 0 || from >= items.length) {
    return
  }
  if (to < 0 || to >= items.length) {
    return
  }
  const [x] = items.splice(from, 1)
  items.splice(to, 0, x)
  emit("update:modelValue", items)
}

function removeItem(item) {
  if (!item?.uri) {
    return
  }
  emit(
    "update:modelValue",
    (modelValueProxy.value || []).filter((i) => i?.uri !== item.uri),
  )
}

function clearItems() {
  emit("update:modelValue", [])
}

// --- ConceptTree core ---
function onTreeSelect(ev) {
  // ConceptTree emits { item, row, ... }
  if (ev?.item) {
    onPick(ev.item)
  }
}

function onTreeOpen(concept) {
  if (props.treeLoadNarrower) {
    return props.treeLoadNarrower(concept)
  }
}

// Convert OpenSearch Suggest to options
function openSearchToOptions(os) {
  const labels = os?.[1] || []
  const uris = os?.[3] || []
  return uris
    .map((uri, i) => normalize({ uri, __label: labels[i] || uri }))
    .filter(Boolean)
}

// Remote search (only if search prop is provided)
async function onSearchChange(query) {
  if (!props.search) {
    return
  }

  // Abort if query is too short
  const q = (query ?? "").trim()
  if (q.length < props.minChars) {
    remoteOptions.value = []
    return
  }

  // Start new search
  const p = (pending.value = props.search(q))
  loading.value = true

  try {
    const result = await p
    // Ignore if a newer request started while we were waiting
    if (pending.value !== p) {
      return
    }

    remoteOptions.value = openSearchToOptions(result)
  } catch (err) {
    // If this request is still the latest, clear options on error
    if (pending.value === p) {
      remoteOptions.value = []
    }
  } finally {
    if (pending.value === p) {
      loading.value = false
      pending.value = null
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
.jskos-vue-itemSelect {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.jskos-vue-itemSelect-label {
  opacity: 0.8;
}

.jskos-vue-itemSelect-noResult {
  opacity: 0.75;
}
</style>