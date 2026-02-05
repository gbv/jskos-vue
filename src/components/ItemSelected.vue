<template>
  <div class="jskos-vue-itemSelected">
    <!-- TAGS -->
    <div
      v-if="view === 'tags'"
      class="jskos-vue-itemSelected-tags">
      <span
        v-for="(item, index) in items"
        :key="item?.uri || index"
        class="jskos-vue-itemSelected-chip">
        {{ item?.__label || labelFrom(item) }}
        <button
          type="button"
          class="jskos-vue-itemSelected-chipRemove"
          aria-label="Remove"
          @click="$emit('remove', item)" />
      </span>

      <button
        v-if="showClear && items.length"
        type="button"
        class="jskos-vue-itemSelected-clear"
        @click="$emit('clear')">
        Clear
      </button>
    </div>

    <!-- TABLE VIEW -->
    <div
      v-else-if="view === 'table'"
      class="jskos-vue-itemSelected-table">
      <div
        v-for="(item, index) in items"
        :key="item?.uri || index"
        class="jskos-vue-itemSelected-row">
        <div class="jskos-vue-itemSelected-cell">
          <item-name
            :item="item"
            :clickable="clickable"
            :draggable="false"
            v-bind="itemNameOptions"
            @click="$emit('select', { item })" />
        </div>

        <div class="jskos-vue-itemSelected-actions">
          <div class="jskos-vue-itemSelected-actionGroup">
            <button
              v-if="orderable"
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              :disabled="index === 0"
              aria-label="Move up"
              title="Move up"
              @click="$emit('move', { from: index, to: index - 1 })">
              ▲
            </button>

            <button
              v-if="orderable"
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              :disabled="index === items.length - 1"
              aria-label="Move down"
              title="Move down"
              @click="$emit('move', { from: index, to: index + 1 })">
              ▼
            </button>

            <button
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              aria-label="Remove"
              title="Remove"
              @click="$emit('remove', item)">
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- LIST VIEW (minimal) -->
    <ItemList
      v-else-if="view === 'list'"
      class="jskos-vue-itemSelected-list"
      :items="items"
      :row-mode="false"
      :item-name-options="{
        // ItemName props
        clickable: false,
        draggable: false,
        showNotation: true,
        showLabel: true,
      }" />
  </div>
</template>

<script>
import ItemList from "./ItemList.vue"
import ItemName from "./ItemName.vue"

export default {
  name: "ItemSelected",
  components: { ItemName, ItemList },
  props: {
    items: { type: Array, default: () => [] },
    view: { type: String, default: "tags" }, // "tags" | "table" | "list"
    labelField: { type: String, default: "__label" },
    orderable: { type: Boolean, default: false },
    showClear: { type: Boolean, default: true },
    clickable: { type: Boolean, default: true },
    itemNameOptions: { type: Object, default: () => ({}) },
  },
  emits: ["remove", "clear", "move", "select"],
  methods: {
    labelFrom(item) {
      const pl = item?.prefLabel || {}
      return (
        pl.en ||
        pl.und ||
        Object.values(pl)[0] ||
        item?.notation?.[0] ||
        item?.uri ||
        ""
      )
    },
  },
}
</script>

<style>
/* TABLE */
.jskos-vue-itemSelected-table {
  border: 1px solid rgba(2, 6, 23, 0.12);
  border-radius: 10px;
  overflow: hidden;
}

.jskos-vue-itemSelected-row {
  display: flex;
  align-items: stretch;
  background: #fff;
}

.jskos-vue-itemSelected-row + .jskos-vue-itemSelected-row {
  border-top: 1px solid rgba(2, 6, 23, 0.12);
}

.jskos-vue-itemSelected-cell {
  flex: 1 1 auto;
  padding: 0.7rem 0.85rem;
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  min-width: 0;
}

.jskos-vue-itemSelected-notation {
  font-weight: 700;
  flex: 0 0 auto;
}

.jskos-vue-itemSelected-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.jskos-vue-itemSelected-actions {
  flex: 0 0 auto;
  padding: 0.35rem;
  display: flex;
  align-items: stretch;
}

.jskos-vue-itemSelected-actionGroup {
  display: flex;
  border: 1px solid rgba(2, 6, 23, 0.12);
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.jskos-vue-itemSelected-actionBtn {
  width: 44px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.jskos-vue-itemSelected-actionBtn + .jskos-vue-itemSelected-actionBtn {
  border-left: 1px solid rgba(2, 6, 23, 0.12);
}

.jskos-vue-itemSelected-actionBtn:disabled {
  opacity: 0.35;
  cursor: default;
}

/* TAGS (minimal) */
.jskos-vue-itemSelected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.jskos-vue-itemSelected-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.22rem 0.55rem;
  border: 1px solid rgba(30, 41, 59, 0.12);
  background: #10B981;
  color: white;
  font-size: large;
  font-weight: bold;
}

.jskos-vue-itemSelected-chipRemove {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
}
.jskos-vue-itemSelected-chipRemove::after {
  content: "x";
  font-size: 18px;
  line-height: 1;
  color: white;
}

.jskos-vue-itemSelected-clear {
  border: 1px solid rgba(30, 41, 59, 0.18);
  background: #10B981;
  color: white;
  font-size: large;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
</style>