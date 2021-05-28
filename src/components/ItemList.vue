<template>
  <ul class="item-list">
    <li
      v-for="item in items"
      :key="item && item.uri"
      @click.stop="$emit('select', { item, row: true })">
      <template v-if="item">
        <slot
          name="beforeItem"
          :item="item" />
        <item-name
          :item="item"
          :show-notation="showNotation"
          :show-label="showLabel"
          :clickable="clickable"
          @click.stop="$emit('select', { item, row: false })" />
        <slot
          name="afterItem"
          :item="item" />
      </template>
      <template v-else>
        <!-- TODO -->
        ...
      </template>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue"
import ItemName from "./ItemName.vue"

export default defineComponent({
  name: "ItemList",
  components: {
    ItemName,
  },
  props: {
    items: {
      type: Array,
      required: true,
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
  },
  emits: ["select"],
})
</script>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
}
</style>
