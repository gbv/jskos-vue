<template>
  <button
    type="button"
    class="jskos-vue-removeIcon"
    :aria-label="ariaLabel ?? t('remove')"
    :title="title ?? ariaLabel ?? t('remove')"
    @click="$emit('click', $event)">
    <span aria-hidden="true">×</span>
  </button>
</template>

<script setup>
import { useLocale } from "../utils.js"
defineOptions({ name: "RemoveIcon" })

defineProps({
  ariaLabel: { type: String, default: undefined },
  title: { type: String, default: undefined },
})

defineEmits(["click"])

const { t } = useLocale({
  en: { remove: "Remove" },
  de: { remove: "Entfernen" },
})
</script>

<style>
.jskos-vue-removeIcon {
  padding: 0.25em;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.jskos-vue-removeIcon:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
