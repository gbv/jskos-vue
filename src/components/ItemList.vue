<template>
  <div class="jskos-vue-itemList">
    <div
      v-for="item in items"
      :key="getItem(item) && getItem(item).uri"
      :class="{
        'jskos-vue-itemList-row': rowMode,
      }"
      :style="styleForItem(getItem(item))"
      :data-uri="getItem(item) && getItem(item).uri"
      :draggable="rowMode && !!getItem(item)"
      @dragstart="dragstart(getItem(item))"
      @dragend="dragend"
      @click.stop="rowMode && $emit('select', { item: getItem(item), row: true })">
      <!-- Slot before each item's ItemName -->
      <slot
        name="beforeItem"
        :item="item" />
      <item-name
        v-if="getItem(item)"
        v-bind="itemNameOptions"
        :item="getItem(item)"
        :draggable="!rowMode"
        @click.stop="$emit('select', { item: getItem(item), row: false })" />
      <!-- Show loading indicator for null values -->
      <!-- TODO: Reconsider. -->
      <loading-indicator
        v-else
        style="align-self: center;" />
      <!-- Slot after each item's ItemName -->
      <slot
        name="afterItem"
        :item="item" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import ItemName from "./ItemName.vue"
import LoadingIndicator from "./LoadingIndicator.vue"
import VueScrollTo from "vue-scrollto"
import { dragAndDrop } from "../utils"
const { dragstart, dragend } = dragAndDrop
import "../shared.css"

export default defineComponent({
  name: "ItemList",
  components: {
    ItemName,
    LoadingIndicator,
  },
  props: {
    // array of items
    items: {
      type: Array,
      required: true,
    },
    // property for the JSKOS item inside each object in `items` (no property by default)
    itemProperty: {
      type: String,
      default: null,
    },
    rowMode: {
      type: Boolean,
      default: true,
    },
    // options to be passed along to ItemName component
    itemNameOptions: {
      type: Object,
      default: () => ({}),
    },
    // show indicator to the right of each item in the list
    // values can be either boolean or string color values
    indicatorByUri: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["select"],
  data() {
    return {
      dragstart,
      dragend,
    }
  },
  methods: {
    // style object for item
    styleForItem(item) {
      let style = {}
      let color = this.indicatorByUri[item && item.uri]
      if (!color) {
        color = "transparent"
      }
      // only override color if it's not the default color (`true`)
      if (color !== true) {
        style["--jskos-vue-itemList-indicator-color"] = color
      }
      return style
    },
    // returns the actual JSKOS item
    getItem(item) {
      if (this.itemProperty) {
        return item[this.itemProperty]
      }
      return item
    },
    // scrolls to a certain URI in the list
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
  padding: 0;
}
.jskos-vue-itemList > div {
  position: relative;
  padding-left: 5px;
  box-shadow: inset -3px 0px var(--jskos-vue-itemList-indicator-color);
}
.jskos-vue-itemList > div:hover {
  box-shadow: inset -4px 0px var(--jskos-vue-itemList-indicator-color);
}
.jskos-vue-itemList-row:hover {
  cursor: pointer;
  background-color: var(--jskos-vue-itemList-hover-bgColor);
}
</style>
