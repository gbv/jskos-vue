import { useSSRContext, resolveComponent, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './LoadingIndicator.e8vfq6Bx.js';
/* empty css                */

const __pageData = JSON.parse("{\"title\":\"LoadingIndicator\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"components/LoadingIndicator.md\",\"filePath\":\"components/LoadingIndicator.md\"}");
const __default__ = {name:"components/LoadingIndicator.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {


return (_ctx, _push, _parent, _attrs) => {
  const _component_ComponentView = resolveComponent("ComponentView");

  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="loadingindicator" tabindex="-1">LoadingIndicator <a class="header-anchor" href="#loadingindicator" aria-label="Permalink to &quot;LoadingIndicator&quot;">​</a></h1><p>Spinning loading indicator.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><ul><li><code>size</code> <em>string, default <code>md</code></em> — size of the indicator: <code>sm | md | lg | xl</code></li></ul><h2 id="css-classes-and-variables" tabindex="-1">CSS classes and variables <a class="header-anchor" href="#css-classes-and-variables" aria-label="Permalink to &quot;CSS classes and variables&quot;">​</a></h2><ul><li><code>.jskos-vue-loadingIndicator</code> — the component element</li><li><code>--jskos-vue-loadingIndicator-primary-color</code> <em>string, default <code>lightgray</code></em> — color of the ring</li><li><code>--jskos-vue-loadingIndicator-secondary-color</code> <em>string, default <code>blue</code></em> — color of the spinner</li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_ComponentView, {
    src: "PHNjcmlwdCBzZXR1cD4KaW1wb3J0IExvYWRpbmdJbmRpY2F0b3IgZnJvbSAiLi4vLi4vc3JjL2NvbXBvbmVudHMvTG9hZGluZ0luZGljYXRvci52dWUiCjwvc2NyaXB0PgoKPHVsPgogIDxsaSB2LWZvcj0ic2l6ZSBpbiBbJ3NtJywgJ21kJywgJ2xnJywgJ3hsJ10iIDprZXk9InNpemUiPgogICAge3sgc2l6ZSB9fTogPGxvYWRpbmctaW5kaWNhdG9yIDpzaXplPSJzaXplIiAvPgogIDwvbGk+CiAgPGxpPgogICAgRGlmZmVyZW50IGNvbG9yOiA8bG9hZGluZy1pbmRpY2F0b3Igc3R5bGU9Ii0tanNrb3MtdnVlLWxvYWRpbmdJbmRpY2F0b3Itc2Vjb25kYXJ5LWNvbG9yOiByZWQ7IiAvPgogIDwvbGk+CjwvdWw+",
    highlightedSrc: "PHByZSBjbGFzcz0ic2hpa2kgc2hpa2ktdGhlbWVzIGdpdGh1Yi1saWdodCBnaXRodWItZGFyayB2cC1jb2RlIiB0YWJpbmRleD0iMCIgdi1wcmU9IiI+PGNvZGU+PHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5zY3JpcHQ8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHNldHVwPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6I0Q3M0E0OTstLXNoaWtpLWRhcms6I0Y5NzU4MyI+aW1wb3J0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiBMb2FkaW5nSW5kaWNhdG9yIDwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojRDczQTQ5Oy0tc2hpa2ktZGFyazojRjk3NTgzIj5mcm9tPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiAiLi4vLi4vc3JjL2NvbXBvbmVudHMvTG9hZGluZ0luZGljYXRvci52dWUiPC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+c2NyaXB0PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+JiN4M0M7PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPnVsPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj48L3NwYW4+PC9zcGFuPgo8c3BhbiBjbGFzcz0ibGluZSI+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+ICAmI3gzQzs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+bGk8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IHYtZm9yPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InNpemUgaW4gWydzbScsICdtZCcsICdsZycsICd4bCddIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gOmtleTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij49PC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMwMzJGNjI7LS1zaGlraS1kYXJrOiM5RUNCRkYiPiJzaXplIjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgICB7eyBzaXplIH19OiAmI3gzQzs8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+bG9hZGluZy1pbmRpY2F0b3I8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzZGNDJDMTstLXNoaWtpLWRhcms6I0IzOTJGMCI+IDpzaXplPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj08L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzAzMkY2MjstLXNoaWtpLWRhcms6IzlFQ0JGRiI+InNpemUiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAvPjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+bGk8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Pjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5saTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4+PC9zcGFuPjwvc3Bhbj4KPHNwYW4gY2xhc3M9ImxpbmUiPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAgICBEaWZmZXJlbnQgY29sb3I6ICYjeDNDOzwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjI4NjNBOy0tc2hpa2ktZGFyazojODVFODlEIj5sb2FkaW5nLWluZGljYXRvcjwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojNkY0MkMxOy0tc2hpa2ktZGFyazojQjM5MkYwIj4gc3R5bGU8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+PTwvc3Bhbj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMDMyRjYyOy0tc2hpa2ktZGFyazojOUVDQkZGIj4iLS1qc2tvcy12dWUtbG9hZGluZ0luZGljYXRvci1zZWNvbmRhcnktY29sb3I6IHJlZDsiPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPiAvPjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4gICYjeDNDOy88L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzIyODYzQTstLXNoaWtpLWRhcms6Izg1RTg5RCI+bGk8L3NwYW4+PHNwYW4gc3R5bGU9Ii0tc2hpa2ktbGlnaHQ6IzI0MjkyRTstLXNoaWtpLWRhcms6I0UxRTRFOCI+Pjwvc3Bhbj48L3NwYW4+CjxzcGFuIGNsYXNzPSJsaW5lIj48c3BhbiBzdHlsZT0iLS1zaGlraS1saWdodDojMjQyOTJFOy0tc2hpa2ktZGFyazojRTFFNEU4Ij4mI3gzQzsvPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyMjg2M0E7LS1zaGlraS1kYXJrOiM4NUU4OUQiPnVsPC9zcGFuPjxzcGFuIHN0eWxlPSItLXNoaWtpLWxpZ2h0OiMyNDI5MkU7LS1zaGlraS1kYXJrOiNFMUU0RTgiPj48L3NwYW4+PC9zcGFuPjwvY29kZT48L3ByZT4="
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<ul${_scopeId}><!--[-->`);
        ssrRenderList(['sm', 'md', 'lg', 'xl'], (size) => {
          _push(`<li${
            _scopeId
          }>${
            ssrInterpolate(size)
          }: `);
          _push(ssrRenderComponent(_sfc_main$1, { size: size }, null, _parent, _scopeId));
          _push(`</li>`);
        });
        _push(`<!--]--><li${_scopeId}> Different color: `);
        _push(ssrRenderComponent(_sfc_main$1, { style: {"--jskos-vue-loadingIndicator-secondary-color":"red"} }, null, _parent, _scopeId));
        _push(`</li></ul>`);
      } else {
        return [
          createVNode("ul", null, [
            (openBlock(), createBlock(Fragment, null, renderList(['sm', 'md', 'lg', 'xl'], (size) => {
              return createVNode("li", { key: size }, [
                createTextVNode(toDisplayString(size) + ": ", 1),
                createVNode(_sfc_main$1, { size: size }, null, 8, ["size"])
              ])
            }), 64)),
            createVNode("li", null, [
              createTextVNode(" Different color: "),
              createVNode(_sfc_main$1, { style: {"--jskos-vue-loadingIndicator-secondary-color":"red"} })
            ])
          ])
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/LoadingIndicator.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
