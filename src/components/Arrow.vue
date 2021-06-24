<template>
  <div
    :class="{
      'jskos-vue-arrow': true,
      'jskos-vue-arrow-clickable': clickable,
    }">
    <div
      :class="`jskos-vue-arrow-${direction}`" />
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Arrow",
  props: {
    direction: {
      type: String,
      required: true,
      validator(value) {
        return ["up", "down", "left", "right"].includes(value)
      },
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
.jskos-vue-arrow {
  display: inline-block;
  vertical-align: middle;
  padding: 5px 3px;
}
.jskos-vue-arrow > div {
  border: solid var(--jskos-vue-arrow-color);
  border-width: 0 2px 2px 0;
  padding: 3px;
  margin: 2px 5px;
}
.jskos-vue-arrow-clickable:hover {
  cursor: pointer;
}
.jskos-vue-arrow-clickable:hover > div {
  border-color: var(--jskos-vue-arrow-hover-color);
}
.jskos-vue-arrow > .jskos-vue-arrow-right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.jskos-vue-arrow > .jskos-vue-arrow-left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.jskos-vue-arrow > .jskos-vue-arrow-up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.jskos-vue-arrow > .jskos-vue-arrow-down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
