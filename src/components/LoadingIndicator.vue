<template>
  <div
    :style="{
      border: `${sizePixels/3}px solid ${primaryColor}`,
      'border-top': `${sizePixels/3}px solid ${secondaryColor}`,
      width: `${sizePixels}px`,
      height: `${sizePixels}px`,
    }"
    class="jskos-vue-loader" />
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
     * `sm, md, lg`
     */
    size: {
      type: String,
      default: "sm",
    },
    primaryColor: {
      type: String,
      default: "lightgray",
    },
    secondaryColor: {
      type: String,
      default: "blue",
    },
  },
  setup(props) {
    return {
      sizePixels: computed(() => ({
        sm: 12,
        md: 18,
        lg: 24,
        xl: 30,
      }[props.size])),
    }
  },
})
</script>

<!-- from: https://www.w3schools.com/howto/howto_css_loader.asp -->
<style scoped>
.jskos-vue-loader {
  border-radius: 50%;
  animation: spin 2s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
