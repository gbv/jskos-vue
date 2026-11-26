import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
/* empty css                */

/**
 * Component that displays a spinning loading indicator.
 */

const _sfc_main = {
  __name: 'LoadingIndicator',
  __ssrInlineRender: true,
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
  setup(__props) {

const props = __props;

const sizePixels = computed(() => ({
  sm: 9,
  md: 15,
  lg: 21,
  xl: 27,
}[props.size]));

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: {
      border: `${sizePixels.value/3}px solid var(--jskos-vue-loadingIndicator-primary-color)`,
      'border-top': `${sizePixels.value/3}px solid var(--jskos-vue-loadingIndicator-secondary-color)`,
      width: `${sizePixels.value}px`,
      height: `${sizePixels.value}px`,
    },
    class: "jskos-vue-loadingIndicator"
  }, _attrs))}></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/LoadingIndicator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
