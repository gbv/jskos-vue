<template>
  <a
    v-if="href.startsWith('http://') || href.startsWith('https://')"
    :href="href"
    target="_blank"><slot>{{ text || href }}</slot></a>
  <span v-else><slot>{{ text || href }}</slot></span>
</template>

<script setup>
defineProps({
  // The string that is potentially a URL.
  href: {
    type: String,
    default: "",
  },
  //  The text that is shown (defaults to URL).
  text: {
    type: String,
    default: "",
  },
})
</script>
