<template>
  <div
    :class="`jskos-vue-arrow jskos-vue-arrow-${direction}`" />
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
  },
})
</script>

<style scoped>
.jskos-vue-arrow {
  display: inline-block;
  border: solid black;
  border-width: 0 2px 2px 0;
  padding: 3px;
  margin: 2px 5px;
}
.jskos-vue-arrow.jskos-vue-arrow-right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.jskos-vue-arrow.jskos-vue-arrow-left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.jskos-vue-arrow.jskos-vue-arrow-up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.jskos-vue-arrow.jskos-vue-arrow-down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
