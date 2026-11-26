import { computed, mergeProps, withCtx, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import * as jskos from 'jskos-tools';
import { _ as _sfc_main$1 } from './AutoLink.BuusOaCI.js';
import { a as useLocale, u as useContentLanguage } from './utils.Br9Zv_eu.js';

const _sfc_main = {
  __name: 'LicenseInfo',
  __ssrInlineRender: true,
  props: {
  // JSKOS item to be displayed
  item: {
    type: Object,
    required: true,
  },
},
  setup(__props) {

const props = __props;

// Localization
const { t } = useLocale({
  en: { license: "License" },
  de: { license: "Lizenz" },
});
const { prefLabel: contentPrefLabel } = useContentLanguage();

const licenseBadges = {
  "http://creativecommons.org/publicdomain/zero/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
  "https://creativecommons.org/publicdomain/mark/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
  "http://creativecommons.org/licenses/by/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg",
  "http://creativecommons.org/licenses/by-nc-nd/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
  "http://creativecommons.org/licenses/by-nc-nd/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
  "http://creativecommons.org/licenses/by-nc-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg",
  "http://creativecommons.org/licenses/by-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg",
};

const licenseBadge = license => {
  if (licenseBadges[license.uri]) {
    return licenseBadges[license.uri]
  }
  return null
};

const licenseName = license => {
  const prefLabel = contentPrefLabel(license, { fallbackToUri: false });
  let notation = jskos.notation(license);
  if (prefLabel && notation) {
    notation = ` (${notation})`;
  }
  let name = prefLabel + notation;
  if (!name) {
    name = license.uri;
  }
  return name
};

const attribution = computed(() => {
  const organisation = (props.item.publisher || []).find(o => o.url) ?? props.item.publisher?.[0];
  const url = organisation?.url ?? props.item.url;
  return {
    url,
    label: contentPrefLabel(organisation),
  }
});

const title = license => {
  const str = `${t("license")}: ${licenseName(license)}`;
  return attribution.value?.label ? `${str} by ${attribution.value.label}` : str
};

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jskos-vue-itemDetails-licenseInfo" }, _attrs))}><!--[-->`);
  ssrRenderList(__props.item.license || [], (license, index) => {
    _push(ssrRenderComponent(_sfc_main$1, {
      key: index,
      href: license.uri,
      title: title(license),
      class: "jskos-vue-itemDetails-licenseInfo-badge"
    }, {
      default: withCtx((_, _push, _parent, _scopeId) => {
        if (_push) {
          if (licenseBadge(license)) {
            _push(`<img${
              ssrRenderAttr("src", licenseBadge(license))
            }${
              _scopeId
            }>`);
          } else {
            _push(`<span${
              _scopeId
            }>${
              ssrInterpolate(licenseName(license))
            }</span>`);
          }
        } else {
          return [
            (licenseBadge(license))
              ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: licenseBadge(license)
                }, null, 8, ["src"]))
              : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(licenseName(license)), 1))
          ]
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/LicenseInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
