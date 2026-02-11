<template>
  <div class="jskos-vue-itemSelected">
    <!-- TAGS -->
    <div
      v-if="view === 'tags'"
      class="jskos-vue-itemSelected-tags">
      <span
        v-for="(item, index) in items"
        :key="item?.uri || index"
        class="jskos-vue-itemSelected-tag">

        <ItemName
          :item="item"
          v-bind="ourItemNameOptions"
          @click="emit('select', { item })" />

        <button
          type="button"
          class="jskos-vue-itemSelected-tagRemove"
          aria-label="Remove"
          @click="emit('remove', item)" />
      </span>
    </div>

    <!-- TABLE -->
    <div
      v-else-if="view === 'table'"
      class="jskos-vue-itemSelected-table">
      <div
        v-for="(item, index) in items"
        :key="item?.uri || index"
        class="jskos-vue-itemSelected-row">
        <div class="jskos-vue-itemSelected-cell">
          <ItemName
            :item="item"
            v-bind="itemNameProps"
            @click="emit('select', { item })" />
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
              @click="emit('move', { from: index, to: index - 1 })">
              <Arrow direction="up" />
            </button>

            <button
              v-if="orderable"
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              :disabled="index === items.length - 1"
              aria-label="Move down"
              title="Move down"
              @click="emit('move', { from: index, to: index + 1 })">
              <Arrow direction="down" />
            </button>

            <button
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              aria-label="Remove"
              title="Remove"
              @click="emit('remove', item)">
              ×
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- LIST (minimal) -->
    <ItemList
      v-else-if="view === 'list'"
      class="jskos-vue-itemSelected-list"
      :items="items"
      :row-mode="false"
      :item-name-options="ourItemNameOptions" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import Arrow from "./Arrow.vue"
import ItemList from "./ItemList.vue"
import ItemName from "./ItemName.vue"

defineOptions({ name: "ItemSelected" })

const props = defineProps({
  items: { type: Array, default: () => [] },
  view: { type: String, default: "tags" }, // "tags" | "table" | "list"
  labelField: { type: String, default: "__label" },
  orderable: { type: Boolean, default: false },
  itemNameOptions: { type: Object, default: () => ({}) },
})

const emit = defineEmits(["remove", "move", "select"])

const ourItemNameOptions = computed(() => ({
  ...props.itemNameOptions,
  draggable: false,
}))
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

.jskos-vue-itemSelected-actions {
  flex: 0 0 auto;
  display: flex;
  align-items: stretch;
}

.jskos-vue-itemSelected-actionGroup {
  display: flex;
  overflow: hidden;
  background: #fff;
}

.jskos-vue-itemSelected-actionBtn {
  width: 44px;
  border: 0;
  border-left: 1px solid rgba(2, 6, 23, 0.12);
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.jskos-vue-itemSelected-actionBtn:disabled {
  cursor: default;
}
.jskos-vue-itemSelected-actionBtn:disabled * {
  opacity: 0.35;
}

/* TAGS */
.jskos-vue-itemSelected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.jskos-vue-itemSelected-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.22rem 0.55rem;
  background: var(--jskos-vue-itemSelected-tags-bgColor);
  color: var(--jskos-vue-itemSelected-tags-color);
}

.jskos-vue-itemSelected-tagRemove {
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

.jskos-vue-itemSelected-tagRemove::after {
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
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
</style>
