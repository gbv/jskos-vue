<template>
  <div
    :style="{
      border: `${sizePixels/3}px solid var(--jskos-vue-loadingIndicator-primary-color)`,
      'border-top': `${sizePixels/3}px solid var(--jskos-vue-loadingIndicator-secondary-color)`,
      width: `${sizePixels}px`,
      height: `${sizePixels}px`,
    }"
    class="jskos-vue-loadingIndicator" />
</template>

<script>
import { computed, defineComponent } from "vue"
/**
 * Component that displays a spinning loading indicator.
 */
export default defineComponent ({
  name: "LoadingIndicator",
  props: {
    /**
     * The size of the loading indicator.
     * `sm, md, lg, xl`
     */
    size: {
      type: String,
      default: "md",
    },
  },
  setup(props) {
    return {
      sizePixels: computed(() => ({
        sm: 9,
        md: 15,
        lg: 21,
        xl: 27,
      }[props.size])),
    }
  },
})
</script>

<!-- adjusted from: https://www.w3schools.com/howto/howto_css_loader.asp -->
<style scoped>
.jskos-vue-loadingIndicator {
  border-radius: 50%;
  animation: jskos-vue-loadingIndicator-spin 2s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes jskos-vue-loadingIndicator-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
