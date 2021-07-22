# Modal

## Props
- ...

## Examples

<script setup>
import Modal from "../../src/components/Modal.vue"
import { ref } from "vue"

const modalShown = ref(false)
const testModal = ref()
const showTestModal = () => {
  testModal.value.show()
}
</script>

<button v-on:click="modalShown = true">Show Modal</button>
<Modal v-model="modalShown" />

<button v-on:click="showTestModal">Show Modal</button>
<Modal ref="testModal" />

```vue
<template>
  TODO
</template>

<script setup>
import { Modal } from "jskos-vue"
</script>
```
