import{f,_ as y,o as s,c as n,F as c,l as I,n as v,v as k,j as l,r as m,i as d,p as $,q as g}from"../app.5e7cbef3.js";import{I as w}from"./ItemName.a8738846.js";import{L}from"./LoadingIndicator.383bc321.js";import{V as b}from"./vue-scrollto.ec7616c3.js";import{d as h}from"./utils.a5bf753d.js";import"./shared.3f0a6f78.js";const{dragstart:C,dragend:j}=h,B=f({name:"ItemList",components:{ItemName:w,LoadingIndicator:L},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],data(){return{dragstart:C,dragend:j}},methods:{styleForItem(e){let r={},o=this.indicatorByUri[e&&e.uri];return o||(o="transparent"),o!==!0&&(r["--jskos-vue-itemList-indicator-color"]=o),r},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const r=this.$el,o=r.querySelectorAll(`[data-uri='${e}']`)[0],i={container:r,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};o&&b.scrollTo(o,200,i)}}}),M={class:"jskos-vue-itemList"},S=["data-uri","draggable","onDragstart","onClick"];function D(e,r,o,i,F,O){const p=g("item-name"),u=g("loading-indicator");return s(),n("div",M,[(s(!0),n(c,null,I(e.items,t=>(s(),n("div",{key:e.getItem(t)&&e.getItem(t).uri,class:v({"jskos-vue-itemList-row":e.rowMode}),style:k(e.styleForItem(e.getItem(t))),"data-uri":e.getItem(t)&&e.getItem(t).uri,draggable:e.rowMode&&!!e.getItem(t),onDragstart:a=>e.dragstart(e.getItem(t)),onDragend:r[0]||(r[0]=(...a)=>e.dragend&&e.dragend(...a)),onClick:l(a=>e.rowMode&&e.$emit("select",{item:e.getItem(t),row:!0}),["stop"])},[m(e.$slots,"beforeItem",{item:t}),e.getItem(t)?(s(),d(p,$({key:0},e.itemNameOptions,{item:e.getItem(t),draggable:!e.rowMode,onClick:l(a=>e.$emit("select",{item:e.getItem(t),row:!1}),["stop"])}),null,16,["item","draggable","onClick"])):(s(),d(u,{key:1,style:{"align-self":"center"}})),m(e.$slots,"afterItem",{item:t})],46,S))),128))])}var z=y(B,[["render",D]]);export{z as I};