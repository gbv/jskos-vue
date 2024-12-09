import{_ as I,d as b,B as p,o as m,c as f,r as u,F as h,C as k,n as $,N as v,Z as c,b as y,K as w}from"./framework.eEdxNogO.js";import{I as B}from"./ItemName.DtaFEKAp.js";import{L}from"./LoadingIndicator.CHo69-R7.js";import{V as j}from"./vue-scrollto.FOkUA__D.js";import{b as T}from"./utils.DojUxO_u.js";/* empty css               */const{dragstart:C,dragend:O}=T,M=b({name:"ItemList",components:{ItemName:B,LoadingIndicator:L},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},indent:{type:Boolean,default:!1},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})},highlightByUri:{type:Object,default:()=>({})}},emits:["select"],data(){return{dragstart:C,dragend:O}},computed:{itemNameOptions_(){return Object.assign({draggable:this.draggable},this.itemNameOptions||{})}},methods:{styleForItem(e,i){let o={},s=this.indicatorByUri[e&&e.uri];s||(s="transparent"),s!==!0&&(o["--jskos-vue-itemList-indicator-color"]=s);let r=this.highlightByUri[e&&e.uri];return r?o["background-color"]=r===!0?"var(--jskos-vue-conceptTree-selected-bgColor)":r:r="transparent",this.indent&&(o["padding-left"]=`${(i+1)*5}px`),o},getItem(e){return this.itemProperty?e[this.itemProperty]:e},isUriInView(e,i=60){const o=this.$el,s=o.querySelectorAll(`[data-uri='${e}']`)[0];if(!o||!s)return!1;let r=o.scrollTop,l=r+o.clientHeight,a=s.offsetTop-o.offsetTop,n=a+s.clientHeight,t=a>=r&&n<=l,d;return i===!0?d=a<r&&n>r||n>l&&a<l:typeof i=="number"&&(a<r&&n>r?d=(n-r)*100/s.clientHeight>i:n>l&&a<l&&(d=(l-a)*100/s.clientHeight>i)),!!(t||i&&d)},scrollToUri(e,i=!1){if(i&&this.isUriInView(e))return;const o=this.$el,s=o.querySelectorAll(`[data-uri='${e}']`)[0],r={container:o,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};s&&j.scrollTo(s,200,r)}}}),N={class:"jskos-vue-itemList"},U=["data-uri","draggable","onDragstart","onClick"];function S(e,i,o,s,r,l){const a=p("item-name"),n=p("loading-indicator");return m(),f("div",N,[u(e.$slots,"beforeList"),(m(!0),f(h,null,k(e.items,(t,d)=>(m(),f("div",{key:e.getItem(t)&&e.getItem(t).uri,class:$({"jskos-vue-itemList-item":!0,"jskos-vue-itemList-row":e.rowMode,"jskos-vue-itemList-row-selectable":e.rowMode&&!!e.getItem(t)}),style:v(e.styleForItem(e.getItem(t),d)),"data-uri":e.getItem(t)&&e.getItem(t).uri,draggable:e.rowMode&&e.draggable&&!!e.getItem(t),onDragstart:g=>e.dragstart(e.getItem(t)),onDragend:i[0]||(i[0]=(...g)=>e.dragend&&e.dragend(...g)),onClick:c(g=>e.rowMode&&e.getItem(t)&&e.$emit("select",{item:e.getItem(t),row:!0}),["stop"])},[u(e.$slots,"beforeItem",{item:t}),e.getItem(t)?(m(),y(a,w({key:0,ref_for:!0},e.itemNameOptions_,{item:e.getItem(t),draggable:e.itemNameOptions_.draggable!==!1&&!e.rowMode,onClick:c(g=>e.$emit("select",{item:e.getItem(t),row:!1}),["stop"])}),null,16,["item","draggable","onClick"])):(m(),y(n,{key:1,style:{"align-self":"center"}})),u(e.$slots,"afterItem",{item:t})],46,U))),128)),u(e.$slots,"afterList")])}const q=I(M,[["render",S]]);export{q as I};