import{_ as I,d as b,o as m,c as f,r as u,F as h,E as $,n as k,P as v,$ as p,b as c,M as w,D as y}from"./framework.DOrQYd6A.js";import{I as B}from"./ItemName.21YJAH7_.js";import{L}from"./LoadingIndicator.BIFdSjTT.js";import{V as j}from"./vue-scrollto.FOkUA__D.js";import{b as T}from"./utils.k6y8VMrt.js";import"./shared.l0sNRNKZ.js";const{dragstart:O,dragend:C}=T,M=b({name:"ItemList",components:{ItemName:B,LoadingIndicator:L},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},indent:{type:Boolean,default:!1},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})},highlightByUri:{type:Object,default:()=>({})}},emits:["select"],data(){return{dragstart:O,dragend:C}},computed:{itemNameOptions_(){return Object.assign({draggable:this.draggable},this.itemNameOptions||{})}},methods:{styleForItem(e,i){let o={},s=this.indicatorByUri[e&&e.uri];s||(s="transparent"),s!==!0&&(o["--jskos-vue-itemList-indicator-color"]=s);let r=this.highlightByUri[e&&e.uri];return r?o["background-color"]=r===!0?"var(--jskos-vue-conceptTree-selected-bgColor)":r:r="transparent",this.indent&&(o["padding-left"]=`${(i+1)*5}px`),o},getItem(e){return this.itemProperty?e[this.itemProperty]:e},isUriInView(e,i=60){const o=this.$el,s=o.querySelectorAll(`[data-uri='${e}']`)[0];if(!o||!s)return!1;let r=o.scrollTop,l=r+o.clientHeight,a=s.offsetTop-o.offsetTop,n=a+s.clientHeight,t=a>=r&&n<=l,d;return i===!0?d=a<r&&n>r||n>l&&a<l:typeof i=="number"&&(a<r&&n>r?d=(n-r)*100/s.clientHeight>i:n>l&&a<l&&(d=(l-a)*100/s.clientHeight>i)),!!(t||i&&d)},scrollToUri(e,i=!1){if(i&&this.isUriInView(e))return;const o=this.$el,s=o.querySelectorAll(`[data-uri='${e}']`)[0],r={container:o,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};s&&j.scrollTo(s,200,r)}}}),U={class:"jskos-vue-itemList"},N=["data-uri","draggable","onDragstart","onClick"];function P(e,i,o,s,r,l){const a=y("item-name"),n=y("loading-indicator");return m(),f("div",U,[u(e.$slots,"beforeList"),(m(!0),f(h,null,$(e.items,(t,d)=>(m(),f("div",{key:e.getItem(t)&&e.getItem(t).uri,class:k({"jskos-vue-itemList-item":!0,"jskos-vue-itemList-row":e.rowMode,"jskos-vue-itemList-row-selectable":e.rowMode&&!!e.getItem(t)}),style:v(e.styleForItem(e.getItem(t),d)),"data-uri":e.getItem(t)&&e.getItem(t).uri,draggable:e.rowMode&&e.draggable&&!!e.getItem(t),onDragstart:g=>e.dragstart(e.getItem(t)),onDragend:i[0]||(i[0]=(...g)=>e.dragend&&e.dragend(...g)),onClick:p(g=>e.rowMode&&e.getItem(t)&&e.$emit("select",{item:e.getItem(t),row:!0}),["stop"])},[u(e.$slots,"beforeItem",{item:t}),e.getItem(t)?(m(),c(a,w({key:0,ref_for:!0},e.itemNameOptions_,{item:e.getItem(t),draggable:e.itemNameOptions_.draggable!==!1&&!e.rowMode,onClick:p(g=>e.$emit("select",{item:e.getItem(t),row:!1}),["stop"])}),null,16,["item","draggable","onClick"])):(m(),c(n,{key:1,style:{"align-self":"center"}})),u(e.$slots,"afterItem",{item:t})],46,N))),128)),u(e.$slots,"afterList")])}const q=I(M,[["render",P]]);export{q as I};