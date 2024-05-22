import{f as y,_ as c,o as s,c as i,F as I,l as b,n as v,v as $,j as l,r as d,i as m,p as k,q as g}from"../app.58ffbb48.js";import{I as h}from"./ItemName.6cba955f.js";import{L as w}from"./LoadingIndicator.35e914a0.js";import{V as L}from"./vue-scrollto.ec7616c3.js";import{d as B}from"./utils.18cb2ff0.js";import"./shared.3f0a6f78.js";const{dragstart:O,dragend:j}=B,C=y({name:"ItemList",components:{ItemName:h,LoadingIndicator:w},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},indent:{type:Boolean,default:!1},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],data(){return{dragstart:O,dragend:j}},computed:{_itemNameOptions(){return Object.assign({draggable:this.draggable},this.itemNameOptions||{})}},methods:{styleForItem(e,r){let o={},a=this.indicatorByUri[e&&e.uri];return a||(a="transparent"),a!==!0&&(o["--jskos-vue-itemList-indicator-color"]=a),this.indent&&(o["padding-left"]=`${(r+1)*5}px`),o},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const r=this.$el,o=r.querySelectorAll(`[data-uri='${e}']`)[0],a={container:r,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};o&&L.scrollTo(o,200,a)}}}),M={class:"jskos-vue-itemList"},N=["data-uri","draggable","onDragstart","onClick"];function S(e,r,o,a,D,F){const p=g("item-name"),u=g("loading-indicator");return s(),i("div",M,[(s(!0),i(I,null,b(e.items,(t,f)=>(s(),i("div",{key:e.getItem(t)&&e.getItem(t).uri,class:v({"jskos-vue-itemList-row":e.rowMode}),style:$(e.styleForItem(e.getItem(t),f)),"data-uri":e.getItem(t)&&e.getItem(t).uri,draggable:e.rowMode&&e.draggable&&!!e.getItem(t),onDragstart:n=>e.dragstart(e.getItem(t)),onDragend:r[0]||(r[0]=(...n)=>e.dragend&&e.dragend(...n)),onClick:l(n=>e.rowMode&&e.$emit("select",{item:e.getItem(t),row:!0}),["stop"])},[d(e.$slots,"beforeItem",{item:t}),e.getItem(t)?(s(),m(p,k({key:0},e._itemNameOptions,{item:e.getItem(t),draggable:e._itemNameOptions.draggable!==!1&&!e.rowMode,onClick:l(n=>e.$emit("select",{item:e.getItem(t),row:!1}),["stop"])}),null,16,["item","draggable","onClick"])):(s(),m(u,{key:1,style:{"align-self":"center"}})),d(e.$slots,"afterItem",{item:t})],46,N))),128))])}var V=c(C,[["render",S]]);export{V as I};