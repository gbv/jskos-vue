<template>
  <div class="jskos-vue-itemList">
    <div
      v-for="(item, index) in items"
      :key="getItem(item) && getItem(item).uri"
      :class="{
        'jskos-vue-itemList-row': rowMode,
      }"
      :style="styleForItem(getItem(item), index)"
      :data-uri="getItem(item) && getItem(item).uri"
      :draggable="rowMode && draggable && !!getItem(item)"
      @dragstart="dragstart(getItem(item))"
      @dragend="dragend"
      @click.stop="rowMode && $emit('select', { item: getItem(item), row: true })">
      <!-- Slot before each item's ItemName -->
      <slot
        name="beforeItem"
        :item="item" />
      <item-name
        v-if="getItem(item)"
        v-bind="itemNameOptions_"
        :item="getItem(item)"
        :draggable="(itemNameOptions_.draggable !== false) && !rowMode"
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
    draggable: {
      type: Boolean,
      default: true,
    },
    // option to add small indent to items further down the list (e.g. for ancestor concepts)
    indent: {
      type: Boolean,
      default: false,
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
  computed: {
    itemNameOptions_() {
      return Object.assign({ draggable: this.draggable }, this.itemNameOptions || {})
    },
  },
  methods: {
    // style object for item
    styleForItem(item, index) {
      let style = {}
      let color = this.indicatorByUri[item && item.uri]
      if (!color) {
        color = "transparent"
      }
      // only override color if it's not the default color (`true`)
      if (color !== true) {
        style["--jskos-vue-itemList-indicator-color"] = color
      }
      // add indent if necessary
      if (this.indent) {
        style["padding-left"] = `${(index + 1) * 5}px`
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
    // checks if a certain URI is in view
    isUriInView(uri, partial = 60) {
      const container = this.$el
      const element = container.querySelectorAll(`[data-uri='${uri}']`)[0]
      if (!container || !element) {
        return false
      }
      // Adapted from https://stackoverflow.com/a/49253390 and https://stackoverflow.com/a/43386795:
      let cTop = container.scrollTop
      let cBottom = cTop + container.clientHeight
      let eTop = element.offsetTop - container.offsetTop
      let eBottom = eTop + element.clientHeight
      let isTotal = (eTop >= cTop && eBottom <= cBottom)
      let isPartial
      if (partial === true) {
        isPartial = (eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom)
      } else if(typeof partial === "number"){
        if (eTop < cTop && eBottom > cTop) {
          isPartial = ((eBottom - cTop) * 100) / element.clientHeight > partial
        } else if (eBottom > cBottom && eTop < cBottom){ 
          isPartial = ((cBottom - eTop) * 100) / element.clientHeight > partial
        }
      }
      return !!(isTotal || partial && isPartial)
    },
    // scrolls to a certain URI in the list
    scrollToUri(uri, onlyIfNotInView = false) {
      if (onlyIfNotInView && this.isUriInView(uri)) {
        return
      }
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

<style>
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
