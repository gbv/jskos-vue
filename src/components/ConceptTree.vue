<template>
  <!-- ConceptTree is basically an extension of ItemList -->
  <item-list
    ref="itemList"
    v-bind="itemListOptions"
    :class="{
      'jskos-vue-conceptTree': true,
      'jskos-vue-conceptTree-noHierarchy': !hierarchy,
    }"
    :items="items"
    :style="style"
    item-property="concept"
    @select="$emit('select', $event); $emit('update:modelValue', $event.item)">
    <template #beforeItem="{ item }">
      <!-- Use divs for depth spacers so we can have visual lines for the hierarchy -->
      <div
        v-for="n in item.depth"
        :key="n"
        class="jskos-vue-conceptTree-depthSpacer" />
      <!-- Show arrow for concepts with narrower concepts -->
      <div
        v-if="hierarchy"
        class="jskos-vue-conceptTree-arrow"
        @click.stop="toggle(item.concept)">
        <arrow
          v-if="item.concept && item.concept.narrower && item.concept.narrower.length !== 0"
          :direction="isOpen[item.concept.uri] ? 'down' : 'right'"
          :clickable="true" />
      </div>
      <!-- Highlight background for row if selected -->
      <!-- TODO: Why use div instead of CSS class? -->
      <!-- TODO: Why not use item.isSelected? -->
      <div
        v-if="jskos.compare(item.concept, modelValue)"
        :style="`position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: -1; background-color: ${selectedColor};`" />
      <!-- Slot for additional content before item -->
      <slot
        name="beforeItem"
        :item="item.concept" />
    </template>
    <template #afterItem="{ item }">
      <!-- Slot for additional content after item -->
      <slot
        name="afterItem"
        :item="item.concept" />
    </template>
  </item-list>
</template>

<script>
import { computed, defineComponent, reactive } from "vue"
import * as jskos from "jskos-tools"
import ItemList from "./ItemList.vue"
import Arrow from "./Arrow.vue"

export default defineComponent({
  name: "ConceptTree",
  components: {
    ItemList,
    Arrow,
  },
  props: {
    // v-model value is the selected concept and is marked specifically
    modelValue: {
      type: Object,
      default: null,
    },
    // array of concepts to be displayed
    concepts: {
      type: Array,
      required: true,
    },
    // whether to display concept hierarchy (via narrower concepts)
    hierarchy: {
      type: Boolean,
      default: true,
    },
    // options to be passed along to ItemList component
    itemListOptions: {
      type: Object,
      default: () => ({}),
    },
    // row background color for the selected (v-model) concept
    selectedColor: {
      type: String,
      default: "#fdbd58aa",
    },
    // row hovel background color
    rowHoverColor: {
      type: String,
      default: "#fdbd58aa",
    },
  },
  emits: ["select", "open", "close", "update:modelValue"],
  setup(props, { emit }) {
    // reactive object of concept URIs to open status values
    const isOpen = reactive({})
    const open = (concept) => {
      isOpen[concept.uri] = true
      // a certain concept's narrower concepts were opened
      emit("open", concept)
    }
    const close = (concept) => {
      delete isOpen[concept.uri]
      // a certain concept's narrower concepts were closed
      emit("close", concept)
    }
    const toggle = (concept) => {
      if (isOpen[concept.uri]) {
        close(concept)
      } else {
        open (concept)
      }
    }
    // recursively get all children (narrower) items for a concept, depending on open status
    const getChildrenItems = (item) => {
      let items = []
      let concept = item.concept
      let depth = item.depth + 1
      if (concept && isOpen[concept.uri]) {
        for (let child of concept.narrower || []) {
          let item = {
            concept: child,
            depth,
            isSelected: jskos.compare(props.modelValue, child),
          }
          items.push(item)
          items = items.concat(getChildrenItems(item))
        }
      }
      return items
    }
    // convert list of concepts into items with concept, depth, and isSelected
    const items = computed(() => {
      let items = []
      for (let concept of props.concepts) {
        let item = {
          concept,
          depth: 0,
          isSelected: jskos.compare(props.modelValue, concept),
        }
        items.push(item)
        if (props.hierarchy) {
          items = items.concat(getChildrenItems(item))
        }
      }
      return items
    })

    // TODO: Move to CSS variable
    const style = computed(() => ({
      "--row-hover-color": props.rowHoverColor,
    }))

    return {
      items,
      isOpen,
      open,
      close,
      toggle,
      style,
      jskos,
    }
  },
  methods: {
    // scroll to a certain concept via URI
    scrollToUri(uri) {
      this.$refs.itemList.scrollToUri(uri)
    },
  },
})
</script>

<style>
.jskos-vue-conceptTree {
  user-select: none;
}
.jskos-vue-conceptTree > div {
  display: flex;
}
.jskos-vue-conceptTree > div:hover {
  cursor: pointer;
  background: var(--row-hover-color);
}
.jskos-vue-conceptTree-depthSpacer {
  flex: 0 0 10px;
  border-right: 1px dashed lightgray;
}
.jskos-vue-conceptTree-arrow {
  flex: 0 0 20px;
  text-align: right;
}
.jskos-vue-conceptTree-arrow > div {
  padding-left: 0 !important;
}
/* Add padding to list elements when hierachy is turned off */
.jskos-vue-conceptTree-noHierarchy > div {
  padding: 0 5px;
}
</style>
