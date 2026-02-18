<template>
  <button
    type="button"
    class="jskos-vue-removeIcon"
    :aria-label="ariaLabel"
    :title="title"
    :style="color ? { color } : undefined"
    @click="$emit('click', $event)">
    <span aria-hidden="true">×</span>
  </button>
</template>

<script setup>
defineOptions({ name: "RemoveIcon" })

defineProps({
  ariaLabel: { type: String, default: "Remove" },
  title: { type: String, default: "Remove" },
  // Any CSS color string, e.g. "white", "#fff", "red", "var(--...)"
  color: { type: String, default: "white" },
})

defineEmits(["click"])
</script>

<style scoped>
.jskos-vue-removeIcon {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 24px;
  line-height: 1;
}
.jskos-vue-removeIcon:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
