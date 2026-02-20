<template>
  <div class="jskos-vue-itemSelected">
    <!-- TAGS -->
    <div
      v-if="view === 'tags' && items.length"
      class="jskos-vue-itemSelected-tags">
      <span
        v-for="(item, index) in items"
        :key="item?.uri || index"
        class="jskos-vue-itemSelected-tag">

        <ItemName
          :item="item"
          v-bind="tagItemNameProps"
          @click="emit('select', { item })" />
        
        <RemoveIcon @click.stop="removeItem(item)" />

      </span>
    </div>

    <!-- TABLE -->
    <div
      v-else-if="view === 'table' && items.length"
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
              @click="moveItem(index, index - 1)">
              <Arrow direction="up" />
            </button>

            <button
              v-if="orderable"
              type="button"
              class="jskos-vue-itemSelected-actionBtn"
              :disabled="index === items.length - 1"
              aria-label="Move down"
              title="Move down"
              @click="moveItem(index, index + 1)">
              <Arrow direction="down" />
            </button>

            <RemoveIcon
              class="jskos-vue-itemSelected-actionBtn"
              @click.stop="removeItem(item)" />
          </div>
        </div>
      </div>
    </div>

    <!-- LIST (minimal) -->
    <ItemList
      v-else-if="view === 'list' && items.length"
      class="jskos-vue-itemSelected-list"
      :items="items"
      :row-mode="false"
      :item-name-options="listItemNameOptions"
      @select="onListSelect">
      <template
        v-if="removableEffective"
        #afterItem="{ item }">
        <RemoveIcon
          class="jskos-vue-itemSelected-listRemove"
          @click.stop="removeItem(item)" />
      </template>
    </ItemList>
  </div>
</template>

<script setup>
import { computed } from "vue"
import Arrow from "./Arrow.vue"
import ItemList from "./ItemList.vue"
import ItemName from "./ItemName.vue"
import RemoveIcon from "./RemoveIcon.vue"

defineOptions({ name: "ItemSelected" })

const items = defineModel({ type: Array, default: () => [] })

const props = defineProps({
  view: { type: String, default: "tags" }, // "tags" | "table" | "list"
  labelField: { type: String, default: "__label" },
  orderable: { type: Boolean, default: false },
  itemNameOptions: { type: Object, default: () => ({}) },
  removeable: { type: Boolean, default: false },
  removable: { type: Boolean, default: false },
})

const emit = defineEmits(["select"])

const removableEffective = computed(() => props.removable || props.removeable)

const itemNameProps = computed(() => ({
  ...props.itemNameOptions,
  clickable: true,
  draggable: false,
}))

const tagItemNameProps = computed(() => ({
  ...props.itemNameOptions,
  draggable: false,
  clickable: true,
  showNotation: true,
  showLabel: true,
}))

const listItemNameOptions = computed(() => ({
  ...props.itemNameOptions,
  clickable: false,
  draggable: false,
  showNotation: true,
  showLabel: true,
}))


function indexOfItem(target) {
  if (!target) {
    return -1
  }
  const uri = target?.uri
  if (uri) {
    return items.value.findIndex(i => i?.uri === uri)
  }
  return items.value.indexOf(target)
}


function removeItem(item) {
  const idx = indexOfItem(item)
  if (idx === -1) {
    return
  }
  items.value.splice(idx, 1) // in-place
}

function moveItem(from, to) {
  if (from < 0 || from >= items.value.length) {
    return
  }
  if (to < 0 || to >= items.value.length) {
    return
  }
  if (from === to) {
    return
  }

  items.value.splice(to, 0, items.value.splice(from, 1)[0]) // in-place
}

function onListSelect(ev) {
  if (ev?.item) {
    emit("select", { item: ev.item })
  }
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

/* LIST */
.jskos-vue-itemSelected-list {
  border: 1px solid rgba(2, 6, 23, 0.12);
  border-radius: 10px;
  overflow: hidden;
  padding: 12px;
}
.jskos-vue-itemSelected-listRemove {
  opacity: 0.75;
  margin-left: 0.5em;
}
</style>
