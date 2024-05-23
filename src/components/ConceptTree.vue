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
    item-property="concept"
    :highlight-by-uri="modelValue?.uri ? { [modelValue.uri]: true } : {}"
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
import "../shared.css"

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

    return {
      items,
      isOpen,
      open,
      close,
      toggle,
      jskos,
    }
  },
  methods: {
    // checks if a certain URI is in view
    isUriInView(...args) {
      return this.$refs.itemList.isUriInView(...args)
    },
    // scroll to a certain concept via URI
    scrollToUri(...args) {
      this.$refs.itemList.scrollToUri(...args)
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
  padding-left: 0px !important;
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
  padding-left: 5px !important;
}
</style>
