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
        :concepts="treeConcepts"
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

<script>
import Multiselect from "vue-multiselect"
import ItemSelected from "./ItemSelected.vue"
import ConceptTree from "./ConceptTree.vue"

export default {
  name: "ItemSelect",
  components: { Multiselect, ItemSelected, ConceptTree },
  props: {
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
  },
  emits: ["update:modelValue", "select"],
  data() {
    return {
      picked: null,
      loading: false,
      pending: null,
      remoteOptions: [],
    }
  },
  computed: {
    modelValueProxy() {
      return this.dedupeByUri(this.modelValue || [])
    },
    computedOptions() {
      const list = this.search ? this.remoteOptions : (this.options || [])
      return list.map(this.normalize).filter(Boolean)
    },
  },
  methods: {
    // Extract DDC notation from URI if possible, TODO what about other schemes, i.e. ILC? Limitation: DDC only
    notationFromUri(uri) {
      const m = (uri || "").match(/\/class\/([^/]+)\//)
      return m ? decodeURIComponent(m[1]) : null
    },

    // Ensure every item has __label, and add notation when missing (DDC)
    normalize(item) {
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
      this.notationFromUri(item.uri)

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
    },
    // Dedupe items by `uri` while keeping the original insertion order.
    // We run `normalize()` so every returned item has a consistent shape
    // (e.g. ensures `__label` exists, drops invalid items).
    dedupeByUri(items) {
      const seen = new Set()
      const out = []

      for (const it of items || []) {
        // Normalize first: ensures shape + label, may return null if invalid.
        const n = this.normalize(it)

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
    },

    // Add selected item to v-model, 
    onPick(item) {
      const concept = this.normalize(item)
      if (!concept) {
        return
      }

      // Add to modelValue, deduping by URI
      const next = this.dedupeByUri([...(this.modelValueProxy || []), concept])
      this.$emit("update:modelValue", next)
      this.$emit("select", concept)

      // Reset input so it behaves like "add tag"
      this.picked = null
    },

    moveItem({ from, to }) {
      const items = [...(this.modelValueProxy || [])]
      if (from < 0 || from >= items.length) {
        return
      }
      if (to < 0 || to >= items.length) {
        return
      }
      const [x] = items.splice(from, 1)
      items.splice(to, 0, x)
      this.$emit("update:modelValue", items)
    },

    removeItem(item) {
      if (!item?.uri) {
        return
      }
      this.$emit(
        "update:modelValue",
        (this.modelValueProxy || []).filter((i) => i?.uri !== item.uri),
      )
    },

    clearItems() {
      this.$emit("update:modelValue", [])
    },

    // --- ConceptTree core ---
    onTreeSelect(ev) {
      // ConceptTree emits { item, row, ... }
      if (ev?.item) {
        this.onPick(ev.item)
      }
    },

    onTreeOpen(concept) {
      if (this.treeLoadNarrower) {
        return this.treeLoadNarrower(concept)
      }
    },

    // Convert OpenSearch Suggest to options
    openSearchToOptions(os) {
      const labels = os?.[1] || []
      const uris = os?.[3] || []
      return uris
        .map((uri, i) => this.normalize({ uri, __label: labels[i] || uri }))
        .filter(Boolean)
    },

    // Remote search (only if search prop is provided)
    async onSearchChange(query) {
      if (!this.search) {
        return
      }

      // Abort if query is too short
      const q = (query ?? "").trim()
      if (q.length < this.minChars) {
        this.remoteOptions = []
        return
      }

      // Start new search
      const p = (this.pending = this.search(q))
      this.loading = true

      try {
        const result = await p
        // Ignore if a newer request started while we were waiting
        if (this.pending !== p) {
          return
        }

        this.remoteOptions = this.openSearchToOptions(result)
      } catch (err) {
        // If this request is still the latest, clear options on error
        if (this.pending === p) {
          this.remoteOptions = []
        }
      } finally {
        if (this.pending === p) {
          this.loading = false
          this.pending = null
        }
      }
    },

  },
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