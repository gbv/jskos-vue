<template>
  <ul class="jskos-vue-itemList">
    <li
      v-for="item in items"
      :key="getItem(item) && getItem(item).uri"
      :style="styleForItem(getItem(item))"
      :data-uri="getItem(item) && getItem(item).uri"
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
import VueScrollTo from "vue-scrollto"

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
    scrollToUri(uri) {
      const container = this.$el
      const el = container.querySelectorAll(`[data-uri='${uri}']`)[0]
      const options = {
        container,
        easing: "ease-in",
        offset: -15,
        cancelable: true,
        x: false,
        y: true,
      }
      if (el) {
        VueScrollTo.scrollTo(el, 200, options)
      }
    },
  },
})
</script>

<style scoped>
.jskos-vue-itemList {
  list-style: none;
  padding: 0;
}
.jskos-vue-itemList > li {
  position: relative;
}
</style>
