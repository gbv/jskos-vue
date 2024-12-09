import{e,V as t,m as r,o as a,c as o,F as s,p as i,i as m,n,r as d,q as l,b as c}from"./app.d6ab46c4.js";import{_ as g}from"./ItemName.69fd819b.js";import{_ as p}from"./LoadingIndicator.0ed36c8b.js";import{d as u}from"./utils.e2bdf247.js";import"./shared.99084317.js";const{dragstart:I,dragend:y}=u,f=e({name:"ItemList",components:{ItemName:g,LoadingIndicator:p},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],data:()=>({dragstart:I,dragend:y}),methods:{styleForItem(e){let t={},r=this.indicatorByUri[e&&e.uri];return r||(r="transparent"),!0!==r&&(t["--jskos-vue-itemList-indicator-color"]=r),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const r=this.$el,a=r.querySelectorAll(`[data-uri='${e}']`)[0],o={container:r,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};a&&t.scrollTo(a,200,o)}}}),b={class:"jskos-vue-itemList"};f.render=function(e,t,g,p,u,I){const y=r("item-name"),f=r("loading-indicator");return a(),o("div",b,[(a(!0),o(s,null,i(e.items,(r=>(a(),o("div",{key:e.getItem(r)&&e.getItem(r).uri,class:{"jskos-vue-itemList-row":e.rowMode},style:e.styleForItem(e.getItem(r)),"data-uri":e.getItem(r)&&e.getItem(r).uri,draggable:e.rowMode&&!!e.getItem(r),onDragstart:t=>e.dragstart(e.getItem(r)),onDragend:t[1]||(t[1]=(...t)=>e.dragend&&e.dragend(...t)),onClick:m((t=>e.rowMode&&e.$emit("select",{item:e.getItem(r),row:!0})),["stop"])},[n(" Slot before each item's ItemName "),d(e.$slots,"beforeItem",{item:r}),e.getItem(r)?(a(),o(y,l({key:0},e.itemNameOptions,{item:e.getItem(r),draggable:!e.rowMode,onClick:m((t=>e.$emit("select",{item:e.getItem(r),row:!1})),["stop"])}),null,16,["item","draggable","onClick"])):(a(),o(s,{key:1},[n(" Show loading indicator for null values "),n(" TODO: Reconsider. "),c(f,{style:{"align-self":"center"}})],2112)),n(" Slot after each item's ItemName "),d(e.$slots,"afterItem",{item:r})],46,["data-uri","draggable","onDragstart","onClick"])))),128))])};export{f as _};