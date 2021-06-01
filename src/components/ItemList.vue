<template>
  <ul class="item-list">
    <li
      v-for="item in items"
      :key="getItem(item) && getItem(item).uri"
      :style="styleForItem(getItem(item))"
      @click.stop="$emit('select', { item: getItem(item), row: true })">
      <slot
        name="beforeItem"
        :item="item" />
      <item-name
        v-if="getItem(item)"
        :item="getItem(item)"
        :show-notation="showNotation"
        :show-label="showLabel"
        :clickable="clickable"
        @click.stop="$emit('select', { item: getItem(item), row: false })" />
      <loading-indicator
        v-else
        size="sm" />
      <slot
        name="afterItem"
        :item="item" />
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue"
import ItemName from "./ItemName.vue"
import LoadingIndicator from "./LoadingIndicator.vue"

export default defineComponent({
  name: "ItemList",
  components: {
    ItemName,
    LoadingIndicator,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemProperty: {
      type: String,
      default: null,
    },
    showNotation: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    indicatorByUri: {
      type: Object,
      default: () => ({}),
    },
    indicatorColor: {
      type: String,
      default: "green",
    },
  },
  emits: ["select"],
  methods: {
    styleForItem(item) {
      let style = {}
      let color = this.indicatorByUri[item && item.uri]
      if (color === true) {
        color = this.indicatorColor
      }
      if (color) {
        style.borderRight = `5px solid ${color}`
      }
      return style
    },
    getItem(item) {
      if (this.itemProperty) {
        return item[this.itemProperty]
      }
      return item
    },
  },
})
</script>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
}
</style>
