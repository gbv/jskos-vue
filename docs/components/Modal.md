# Modal

## Props
- ...

## Examples

<script setup>
import Modal from "../../src/components/Modal.vue"
import { ref } from "vue"

// First example
const modalShown = ref(false)
const testModal = ref()
const showTestModal = () => {
  testModal.value.show()
}

// Second example
import { Tabs, Tab } from "jskos-vue-tabs"
import "jskos-vue-tabs/dist/style.css"
const tabsModalShown = ref(false)
</script>

<button v-on:click="modalShown = true">Show Modal</button>
<Modal v-model="modalShown">
  <template v-slot:footer>Test</template>
</Modal>

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

<button v-on:click="tabsModalShown = true">Show Modal</button>
<Modal v-model="tabsModalShown">
  <template v-slot:body>
    <tabs style="height: 100%">
      <tab title="Tab 1 with long title">
        Content of Tab 1
      </tab>
      <tab title="Tab 2 with long title">
        Content of Tab 2
      </tab>
      <tab title="Tab 3 with long title and long content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      </tab>
    </tabs>
  </template>
  <template v-slot:footer>Test</template>
</Modal>
