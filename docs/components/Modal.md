# Modal

A full-screen modal.

## Props
- `modelValue` (boolean, v-model) - whether the modal is currently shown
  - default: `undefined` (= value is kept track of internally)

## Slots
- default: Body content
- `header`: Header content
- `footer`: Footer content

## Methods
- `show()` - shows the modal
- `hide()` - hides the modal

## Events
- `update:modelValue`
  - Used to push changes to v-model value.

## CSS Variables
- `--jskos-vue-modal-bgColor` - background color for header and body of the modal
  - default: same as `--jskos-vue-bgColor` (white)
- `--jskos-vue-modal-footer-bgColor` - footer background color
  - default: `rgba(0, 0, 0, 0.05)`
- `--jskos-vue-modal-minWidth` - minimum width of the modal
  - default: `400px`
  - Useful tip: Set this value to `var(--jskos-vue-modal-maxWidth)` to have a consistently sized full-screen modal.
- `--jskos-vue-modal-maxWidth` - maximum width of the modal
  - default: `800px`
- `--jskos-vue-modal-minHeight` - minimum height of the modal
  - default: `300px`
  - Useful tip: Set this value to `var(--jskos-vue-modal-maxHeight)` to have a consistently sized full-screen modal.
- `--jskos-vue-modal-maxHeight` - maximum height of the modal
  - default: `calc(100% - 3.5rem)`
- `--jskos-vue-modal-zIndexBase` - base value for `z-index`
  - default: `1000`

## Examples

### Two different ways to show/hide modals

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

<button v-on:click="modalShown = true">Show Modal via v-model value</button>
<button v-on:click="showTestModal">Show Modal via method</button>
<modal
  v-model="modalShown"
  ref="testModal">
  <template v-slot:footer>Test Footer</template>
  <!-- Note that by default, there is no padding or margins for the content div. -->
  <div style="padding: 10px;">Test Content</div>
</modal>


```vue
<template>
  <button v-on:click="modalShown = true">Show Modal via v-model value</button>
  <button v-on:click="showTestModal">Show Modal via method</button>
  <modal
    v-model="modalShown"
    ref="testModal">
    <template v-slot:footer>Test Footer</template>
    <!-- Note that by default, there is no padding or margins for the content div. -->
    <div style="padding: 10px;">Test Content</div>
  </modal>
</template>

<script setup>
import { Modal } from "jskos-vue"
import { ref } from "vue"

const modalShown = ref(false)
const testModal = ref()
const showTestModal = () => {
  testModal.value.show()
}
</script>
```

### Modal with tabs and fixed size

<button v-on:click="tabsModalShown = true">Show Modal</button>
<modal
  v-model="tabsModalShown"
  style="--jskos-vue-modal-minWidth: var(--jskos-vue-modal-maxWidth); --jskos-vue-modal-minHeight: var(--jskos-vue-modal-maxHeight);">
  <template v-slot:footer>Test Footer</template>
  <tabs style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
    <tab title="Tab 1">
      <p>Because the "Tabs" component changes dimensions with the tab content, we fixate <code>minWidth</code> and <code>minHeight</code> via CSS variables.</p>
    </tab>
    <tab title="Tab 2 with long title">
      <p>Nothing to see here.</p>
    </tab>
    <tab title="Tab 3 with longer title and scrolling content">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
    </tab>
  </tabs>
</modal>

```vue
<template>
  <button v-on:click="tabsModalShown = true">Show Modal</button>
  <modal
    v-model="tabsModalShown"
    style="--jskos-vue-modal-minWidth: var(--jskos-vue-modal-maxWidth); --jskos-vue-modal-minHeight: var(--jskos-vue-modal-maxHeight);">
    <template v-slot:footer>Test Footer</template>
    <tabs style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
      <tab title="Tab 1">
        <p>Because the "Tabs" component changes dimensions with the tab content, we fixate <code>minWidth</code> and <code>minHeight</code> via CSS variables.</p>
      </tab>
      <tab title="Tab 2 with long title">
        <p>Nothing to see here.</p>
      </tab>
      <tab title="Tab 3 with longer title and scrolling content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>
      </tab>
    </tabs>
  </modal>
</template>

<script setup>
import { Modal } from "jskos-vue"
import { ref } from "vue"
// Include jskos-vue-tabs with necessary CSS
import { Tabs, Tab } from "jskos-vue-tabs"
import "jskos-vue-tabs/dist/style.css"

const tabsModalShown = ref(false)
</script>
```
