<template>
  <ul class="item-list">
    <li
      v-for="item in items"
      :key="item && item.uri"
      :style="styleForItem(item)"
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
  },
})
</script>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
}
</style>
