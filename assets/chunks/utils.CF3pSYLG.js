import{l as g}from"./tools.CbaX9TL_.js";import{v as f,x as v,p as c}from"./framework.BSZrs2ug.js";function p(e,r=(n=>(n=g.getLanguages())==null?void 0:n[0])()||"en"){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let a={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(a=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},a)),t.toLocaleString(r,a)}else return e}function m(e,r=!1){const n=t=>{for(const a of e()){const o=(a.elements||[]).reduce((i,s)=>i||s&&s.contains(t.target),!1);(r||!o)&&a.handler({event:t,isInside:o})}};f(()=>{document.addEventListener("click",n)}),v(()=>{document.removeEventListener("click",n)})}function h(e,r,n){let t;return function(){const a=this,o=arguments,i=function(){t=null,n||e.apply(a,o)},s=n&&!t;clearTimeout(t),t=setTimeout(i,r),s&&e.apply(a,o)}}function L(e,{voc:r=!1,scheme:n}){return async t=>r?e.vocSuggest({search:t}):e.suggest({search:t,scheme:n})}const u=c(null),D={draggedItem:u,dragstart(e){u.value=e},dragend(){u.value=null},addDropzone(e,r){const n=c(!1);let t;const a=l=>{l.preventDefault()},o=l=>{t=l.target,n.value=!0},i=l=>{t===l.target&&(n.value=!1)},s=(l,...d)=>{l.preventDefault(),u.value&&r(u.value,...d),n.value=!1};return e&&(e.addEventListener("dragover",a),e.addEventListener("dragenter",o),e.addEventListener("dragleave",i),e.addEventListener("drop",s)),{dragover:a,dragenter:o,dragleave:i,drop:s,isDraggingOver:n}}},E=Object.freeze(Object.defineProperty({__proto__:null,addClickHandlers:m,cdkRegistryToSuggestFunction:L,dateToString:p,debounce:h,dragAndDrop:D},Symbol.toStringTag,{value:"Module"}));export{m as a,D as b,L as c,h as d,E as u};
