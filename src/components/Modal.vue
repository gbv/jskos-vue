<template>
  <teleport
    to="#jskos-vue-modal-area">
    <transition name="fade">
      <div
        v-if="shown"
        class="jskos-vue-modal">
        <!-- Actual modal -->
        <div class="jskos-vue-modal-dialog">
          <header class="jskos-vue-modal-header">
            <h1>Test Header</h1>
            <button
              type="button"
              aria-label="Close"
              @click="shown = false">
              ×
            </button>
          </header>
          <div class="jskos-vue-modal-body">
            Body
          </div>
          <footer class="jskos-vue-modal-footer">
            Footer
          </footer>
        </div>
        <!-- Semi-transparent backdrop -->
        <div
          class="jskos-vue-modal-backdrop"
          @click="shown = false" />
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed, defineComponent, onBeforeMount, ref } from "vue"
import "../shared.css"

export default defineComponent({
  name: "Modal",
  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    onBeforeMount(() => {
      // Check if #jskos-vue-modal-area already exists
      const id = "jskos-vue-modal-area"
      const existing = document.getElementById(id)
      if (!existing) {
        // Create element and append to body
        const element = document.createElement("div")
        element.id = id
        document.body.appendChild(element)
      }
    })
    const internalShown = ref(false)
    const shown = computed({
      get() {
        if (props.modelValue === undefined) {
          return internalShown.value
        }
        return props.modelValue
      },
      set(value) {
        internalShown.value = value
        emit("update:modelValue", value)
      },
    })
    return {
      shown,
      show() {
        shown.value = true
      },
      hide() {
        shown.value = false
      },
    }
  },
})
</script>

<style scoped>
.jskos-vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}
.jskos-vue-modal-dialog {
  height: 90%;
  min-height: calc(100% - 3.5rem);
  margin: 1.75em auto;
  max-width: 800px;
  background-color: white;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
.jskos-vue-modal-header {
  border-bottom: 1px solid #dee2e6;
  display: flex;
}
.jskos-vue-modal-header > h1 {
  font-size: 1.5rem;
  margin: 1rem 1rem;
  flex: 1;
}
.jskos-vue-modal-header > button {
  padding: 1rem 1rem;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;
  font-weight: 700;
  opacity: .5;
}
.jskos-vue-modal-header > button:hover {
  opacity: .75;
}
.jskos-vue-modal-body {
  flex: 1 1 auto;
}
.jskos-vue-modal-footer {
  border-top: 1px solid #dee2e6;
}
.jskos-vue-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #000;
  opacity: 0.5;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
