import{y as e,h as t,z as n}from"./app.b3c3cf0c.js";function r(e,r=!1){const a=t=>{for(const n of e()){const e=(n.elements||[]).reduce(((e,n)=>e||n&&n.contains(t.target)),!1);!r&&e||n.handler({event:t,isInside:e})}};t((()=>{document.addEventListener("click",a)})),n((()=>{document.removeEventListener("click",a)}))}function a(e,t,n){var r;return function(){var a=this,o=arguments,d=function(){r=null,n||e.apply(a,o)},s=n&&!r;clearTimeout(r),r=setTimeout(d,t),s&&e.apply(a,o)}}const o=e(null),d={draggedItem:o,dragstart(e){o.value=e},dragend(){o.value=null},addDropzone(t,n){const r=e(!1);let a;const d=e=>{e.preventDefault()},s=e=>{a=e.target,r.value=!0},i=e=>{a===e.target&&(r.value=!1)},c=(e,...t)=>{e.preventDefault(),o.value&&n(o.value,...t),r.value=!1};return t&&(t.addEventListener("dragover",d),t.addEventListener("dragenter",s),t.addEventListener("dragleave",i),t.addEventListener("drop",c)),{dragover:d,dragenter:s,dragleave:i,drop:c,isDraggingOver:r}}};var s=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",dateToString:function(e){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let n={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(n=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},n)),t.toLocaleString(void 0,n)}return"?"},addClickHandlers:r,debounce:a,cdkRegistryToSuggestFunction:function(e,{voc:t=!1,scheme:n}){return async r=>t?e.vocSuggest({search:r}):e.suggest({search:r,scheme:n})},dragAndDrop:d});export{r as a,a as b,d,s as u};
