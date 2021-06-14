<template>
  <item-list
    ref="itemList"
    class="jskos-vue-conceptTree"
    :items="items"
    :style="style"
    item-property="concept"
    @select="$emit('select', $event)">
    <template #beforeItem="{ item }">
      <div
        v-for="n in item.depth"
        :key="n"
        class="jskos-vue-conceptTree-depthSpacer" />
      <div
        class="jskos-vue-conceptTree-arrow"
        @click.stop="toggle(item.concept)">
        <arrow
          v-if="item.concept && item.concept.narrower && item.concept.narrower.length !== 0"
          :direction="isOpen[item.concept.uri] ? 'down' : 'right'" />
      </div>
      <slot
        name="beforeItem"
        :item="item.concept" />
    </template>
    <template #afterItem="{ item }">
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
    modelValue: {
      type: Object,
      default: null,
    },
    concepts: {
      type: Array,
      required: true,
    },
    rowHoverColor: {
      type: String,
      default: "#fdbd58aa",
    },
    arrowHoverColor: {
      type: String,
      default: "#666",
    },
  },
  emits: ["select", "open", "close"],
  setup(props, { emit }) {
    const isOpen = reactive({})
    const open = (concept) => {
      isOpen[concept.uri] = true
      emit("open", concept)
    }
    const close = (concept) => {
      delete isOpen[concept.uri]
      emit("close", concept)
    }
    const toggle = (concept) => {
      if (isOpen[concept.uri]) {
        close(concept)
      } else {
        open (concept)
      }
    }
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
    const items = computed(() => {
      let items = []
      for (let concept of props.concepts) {
        let item = {
          concept,
          depth: 0,
          isSelected: jskos.compare(props.modelValue, concept),
        }
        items.push(item)
        items = items.concat(getChildrenItems(item))
      }
      return items
    })

    const style = computed(() => ({
      "--row-hover-color": props.rowHoverColor,
      "--arrow-hover-color": props.arrowHoverColor,
    }))

    return {
      items,
      isOpen,
      open,
      close,
      toggle,
      style,
    }
  },
  methods: {
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
.jskos-vue-conceptTree-arrow:hover > .jskos-vue-arrow {
  border-color: var(--arrow-hover-color);
}
</style>
