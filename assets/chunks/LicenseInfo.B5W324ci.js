import{j as p,p as g}from"./jskos-tools.CpjLtWvA.js";import{A as u}from"./AutoLink.DdFLTQbv.js";import{_ as b,d as v,h,D as d,o as t,c as r,F as k,E as f,b as y,w as _,t as L}from"./framework.CXbGQEsj.js";const j=v({name:"LicenseInfo",components:{AutoLink:u},props:{item:{type:Object,required:!0}},setup(s){const c={"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","https://creativecommons.org/publicdomain/mark/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},m=h(()=>{var n;const e=(s.item.publisher||[]).find(i=>i.url)??((n=s.item.publisher)==null?void 0:n[0]);return{url:(e==null?void 0:e.url)??s.item.url,label:g(e)||"?"}});return{licenseBadges:c,licenseAttribution:m,jskos:p}}}),w={class:"jskos-vue-itemDetails-licenseInfo"},x=["src"],B={key:1};function D(s,c,m,e,a,n){const i=d("auto-link");return t(),r("div",w,[(t(!0),r(k,null,f(s.item.license||[],(o,l)=>(t(),y(i,{key:l,href:o.uri,title:`by ${s.licenseAttribution.label}`,class:"jskos-vue-itemDetails-licenseInfo-badge"},{default:_(()=>[s.licenseBadges[o.uri]?(t(),r("img",{key:0,src:s.licenseBadges[o.uri]},null,8,x)):(t(),r("span",B,L(s.jskos.prefLabel(o)),1))]),_:2},1032,["href","title"]))),128))])}const z=b(j,[["render",D]]);export{z as L};