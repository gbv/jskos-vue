import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
/* empty css                */

const _sfc_main = {
  __name: 'Arrow',
  __ssrInlineRender: true,
  props: {
  direction: {
    type: String,
    required: true,
    validator(value) {
      return ["up", "down", "left", "right"].includes(value)
    },
  },
  clickable: {
    type: Boolean,
    default: false,
  },
},
  setup(__props) {



return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(mergeProps({
      class: {
      'jskos-vue-arrow': true,
      'jskos-vue-clickable': __props.clickable,
    }
    }, _attrs))
  }><div class="${
    ssrRenderClass(`jskos-vue-arrow-${__props.direction}`)
  }"></div></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/Arrow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
