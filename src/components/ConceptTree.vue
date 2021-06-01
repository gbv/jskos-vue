<template>
  <div class="jskos-vue-conceptTree">
    <item-list
      class="jskos-vue-conceptTree-list"
      :items="items"
      item-property="concept"
      @select="$emit('select', $event)">
      <template #beforeItem="{ item }">
        <div
          class="jskos-vue-conceptTree-arrow"
          :style="{
            'padding-left': `${item.depth * 10}px`,
          }"
          @click.stop="toggle(item.concept)">
          <arrow
            v-if="item.concept && item.concept.narrower && item.concept.narrower.length !== 0"
            :direction="isOpen[item.concept.uri] ? 'down' : 'right'" />
        </div>
      </template>
    </item-list>
  </div>
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
    return {
      items,
      isOpen,
      open,
      close,
      toggle,
    }
  },
})
</script>

<style>
.jskos-vue-conceptTree {

}
.jskos-vue-conceptTree-list > li:hover {
  cursor: pointer;
  background: lightcoral;
}
.jskos-vue-conceptTree-arrow {
  width: 20px;
  display: inline-block;
  text-align: right;
}
</style>