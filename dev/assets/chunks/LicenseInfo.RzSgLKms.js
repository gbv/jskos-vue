import{j as p}from"./index.9go_Vv5Z.js";import{A as g}from"./AutoLink.BK1uvGVI.js";import{u as b,p as l,n as v}from"./utils.D0mDzsai.js";import{_ as d,d as f,h,B as k,o as n,c as i,F as y,C as L,b as _,w as $,t as B}from"./framework.BdF1Eaaz.js";const{t:j}=b({en:{license:"License"},de:{license:"Lizenz"}}),z=f({name:"LicenseInfo",components:{AutoLink:g},props:{item:{type:Object,required:!0}},setup(t){const c={"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","https://creativecommons.org/publicdomain/mark/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg"},a=s=>c[s.uri]?c[s.uri]:null,m=s=>{const r=l(s,{fallbackToUri:!1});let e=v(s);r&&e&&(e=` (${e})`);let o=r+e;return o||(o=s.uri),o};return{licenseAttribution:h(()=>{var e;const s=(t.item.publisher||[]).find(o=>o.url)??((e=t.item.publisher)==null?void 0:e[0]);return{url:(s==null?void 0:s.url)??t.item.url,label:l(s)||"?"}}),getLicenseBadge:a,getLicenseName:m,jskos:p,t:j}}}),A={class:"jskos-vue-itemDetails-licenseInfo"},I=["src"],x={key:1};function C(t,c,a,m,u,s){const r=k("auto-link");return n(),i("div",A,[(n(!0),i(y,null,L(t.item.license||[],(e,o)=>(n(),_(r,{key:o,href:e.uri,title:`${t.t("license")}: ${t.getLicenseName(e)} by ${t.licenseAttribution.label}`,class:"jskos-vue-itemDetails-licenseInfo-badge"},{default:$(()=>[t.getLicenseBadge(e)?(n(),i("img",{key:0,src:t.getLicenseBadge(e)},null,8,I)):(n(),i("span",x,B(t.getLicenseName(e)),1))]),_:2},1032,["href","title"]))),128))])}const q=d(z,[["render",C],["__scopeId","data-v-f9a7e913"]]);export{q as L};
