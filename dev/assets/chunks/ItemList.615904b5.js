import{f as y,_ as I,o as a,c as i,F as c,l as v,n as $,v as k,j as l,r as d,i as m,p as b,q as p}from"../app.58ffbb48.js";import{I as w}from"./ItemName.6cba955f.js";import{L}from"./LoadingIndicator.35e914a0.js";import{V as h}from"./vue-scrollto.ec7616c3.js";import{d as B}from"./utils.18cb2ff0.js";import"./shared.3f0a6f78.js";const{dragstart:C,dragend:j}=B,M=y({name:"ItemList",components:{ItemName:w,LoadingIndicator:L},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},indent:{type:Boolean,default:!1},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],data(){return{dragstart:C,dragend:j}},methods:{styleForItem(e,r){let o={},s=this.indicatorByUri[e&&e.uri];return s||(s="transparent"),s!==!0&&(o["--jskos-vue-itemList-indicator-color"]=s),this.indent&&(o["padding-left"]=`${(r+1)*5}px`),o},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const r=this.$el,o=r.querySelectorAll(`[data-uri='${e}']`)[0],s={container:r,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};o&&h.scrollTo(o,200,s)}}}),O={class:"jskos-vue-itemList"},S=["data-uri","draggable","onDragstart","onClick"];function D(e,r,o,s,F,N){const g=p("item-name"),u=p("loading-indicator");return a(),i("div",O,[(a(!0),i(c,null,v(e.items,(t,f)=>(a(),i("div",{key:e.getItem(t)&&e.getItem(t).uri,class:$({"jskos-vue-itemList-row":e.rowMode}),style:k(e.styleForItem(e.getItem(t),f)),"data-uri":e.getItem(t)&&e.getItem(t).uri,draggable:e.rowMode&&!!e.getItem(t),onDragstart:n=>e.dragstart(e.getItem(t)),onDragend:r[0]||(r[0]=(...n)=>e.dragend&&e.dragend(...n)),onClick:l(n=>e.rowMode&&e.$emit("select",{item:e.getItem(t),row:!0}),["stop"])},[d(e.$slots,"beforeItem",{item:t}),e.getItem(t)?(a(),m(g,b({key:0},e.itemNameOptions,{item:e.getItem(t),draggable:e.itemNameOptions.draggable!==!1&&!e.rowMode,onClick:l(n=>e.$emit("select",{item:e.getItem(t),row:!1}),["stop"])}),null,16,["item","draggable","onClick"])):(a(),m(u,{key:1,style:{"align-self":"center"}})),d(e.$slots,"afterItem",{item:t})],46,S))),128))])}var V=I(M,[["render",D]]);export{V as I};
