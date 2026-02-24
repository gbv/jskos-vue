<template>
  <div class="jskos-vue-itemSelect">
    <!-- Typeahead dropdown (coming from ItemSuggest) -->
    <ItemSuggest
      ref="itemSuggest"
      :search="searchForSuggest"
      :placeholder="placeholder"
      @select="onSuggestSelect" />

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
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from "vue"
import ItemSuggest from "./ItemSuggest.vue"
import ConceptTree from "./ConceptTree.vue"

defineOptions({ name: "ItemSelect" })

const props = defineProps({
  // Local options (for small sets like languages)
  options: { type: Array, default: () => [] },

  // Remote search returning OpenSearch Suggest: [q, labels[], desc[], uris[]]
  // (Same contract as ItemSuggest expects.)
  search: { type: Function, default: null },

  // Minimum query length before searching
  minChars: { type: Number, default: 1 },

  // Optional ConceptTree picker
  showTree: { type: Boolean, default: false },
  treeConcepts: { type: Array, default: () => [] }, // top concepts
  treeLoadNarrower: { type: Function, default: null },

  // Optional: resolve a URI into a full item object if it wasn't in the suggestion cache
  // resolve: async (uri) => concept/item
  resolve: { type: Function, default: null },

  placeholder: { type: String, default: "Search…" },
})

const emit = defineEmits(["select"])

const conceptTree = ref(null)
const itemSuggest = ref(null)
const treeSelected = ref(null) // highlighted/active concept in ConceptTree

// Cache last suggestion items by URI so we can emit full objects, not only { uri }
const cacheByUri = ref(Object.create(null))

// --- helpers (same normalization as before) ---
function notationFromUri(uri) {
  const m = (uri || "").match(/\/class\/([^/]+)\//)
  return m ? decodeURIComponent(m[1]) : null
}

function normalize(item) {
  if (!item?.uri) {
    return null
  }

  const pl = item.prefLabel || {}
  const rawLabel =
    item.__label ||
    pl.und ||
    pl.en ||
    pl.de ||
    pl.it ||
    Object.values(pl)[0] ||
    item.uri

  const notation =
    (Array.isArray(item.notation) && item.notation[0]) ||
    notationFromUri(item.uri)

  const rawLabelStr = String(rawLabel)
  const cleanedLabel =
    notation && rawLabelStr.startsWith(String(notation))
      ? rawLabelStr.slice(String(notation).length).trim()
      : rawLabelStr

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

// Build an OpenSearch Suggest response from local options.
// This makes ItemSuggest usable for languages etc.
function localOptionsToSuggest(q) {
  const query = (q || "").trim()
  if (!query || query.length < props.minChars) {
    return [query, [], [], []]
  }

  const qLower = query.toLowerCase()

  const matches = (props.options || [])
    .map(normalize)
    .filter(Boolean)
    .filter((it) => {
      const label = it.__label || ""
      return label.toLowerCase().includes(qLower) || it.uri.toLowerCase().includes(qLower)
    })
    .slice(0, 50)

  // Cache them so on select(uri) we can return full objects.
  const nextCache = Object.create(null)
  for (const it of matches) {
    nextCache[it.uri] = it
  }
  cacheByUri.value = nextCache

  return [
    query,
    matches.map((it) => it.__label),
    matches.map(() => ""), // no descriptions
    matches.map((it) => it.uri),
  ]
}

// Wrap remote search so we can also populate cacheByUri (labels+uris -> normalized objects)
function remoteSearchWrapped(q) {
  const query = (q || "").trim()
  if (!query || query.length < props.minChars) {
    const p = Promise.resolve([query, [], [], []])
    p.cancel = () => {}
    return p
  }

  const p0 = props.search(query)

  const p = Promise.resolve(p0).then((os) => {
    const labels = os?.[1] || []
    const uris = os?.[3] || []

    const nextCache = Object.create(null)
    for (let i = 0; i < uris.length; i++) {
      const uri = uris[i]
      const label = labels[i] || uri
      const it = normalize({ uri, __label: label })
      if (it) {
        nextCache[uri] = it
      }
    }
    cacheByUri.value = nextCache

    return os
  })

  // Preserve cancel if the underlying promise supports it
  p.cancel = p0?.cancel
  return p
}

// This is the function we pass to ItemSuggest.
const searchForSuggest = computed(() => {
  return props.search ? remoteSearchWrapped : localOptionsToSuggest
})

// --- tree sync ---
async function syncTreeTo(concept) {
  if (!props.showTree || !conceptTree.value || !concept?.uri) {
    return
  }
  treeSelected.value = concept
  await nextTick()
  await conceptTree.value.navigateToUri(concept, {
    select: false,
    onlyIfNotInView: true,
  })
}

// Resolve a selected URI to an item object (cache -> resolve() -> fallback {uri})
async function itemFromUri(uri) {
  const cached = cacheByUri.value?.[uri]
  if (cached) {
    return cached
  }

  if (props.resolve) {
    try {
      const full = await props.resolve(uri)
      return normalize(full) || { uri }
    } catch {
      return { uri }
    }
  }

  return { uri }
}

// --- event handlers ---
async function onSuggestSelect(ev) {
  const uri = ev?.uri
  if (!uri) {
    return
  }

  const concept = await itemFromUri(uri)
  emit("select", concept)

  await syncTreeTo(concept)
}

// ConceptTree emits { item, row, ... }
async function onTreeSelect(ev) {
  if (!ev?.item) {
    return
  }

  const concept = normalize(ev.item) || ev.item
  treeSelected.value = concept
  emit("select", concept)
}

function onTreeOpen(concept) {
  if (props.treeLoadNarrower) {
    return props.treeLoadNarrower(concept)
  }
}

defineExpose({
  focus() {
    itemSuggest.value?.focus?.()
  },
})
</script>

<style>
.jskos-vue-itemSelect {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>