import{e,V as t,v as a,x as r,n as s,o,c as i,F as m,q as d,k as n,p as l,r as c,s as g,b as p,w as u}from"./app.84d78238.js";import{_ as I}from"./ItemName.ce49e6d4.js";import{_ as y}from"./LoadingIndicator.b951b7d2.js";import{d as f}from"./utils.2e583d56.js";import"./shared.99084317.js";const{dragstart:b,dragend:v}=f,k=e({name:"ItemList",components:{ItemName:I,LoadingIndicator:y},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],data:()=>({dragstart:b,dragend:v}),methods:{styleForItem(e){let t={},a=this.indicatorByUri[e&&e.uri];return a||(a="transparent"),!0!==a&&(t["--jskos-vue-itemList-indicator-color"]=a),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const a=this.$el,r=a.querySelectorAll(`[data-uri='${e}']`)[0],s={container:a,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};r&&t.scrollTo(r,200,s)}}}),j=u("data-v-29c56390");a("data-v-29c56390");const w={class:"jskos-vue-itemList"};r();const h=j(((e,t,a,r,u,I)=>{const y=s("item-name"),f=s("loading-indicator");return o(),i("div",w,[(o(!0),i(m,null,d(e.items,(a=>(o(),i("div",{key:e.getItem(a)&&e.getItem(a).uri,class:{"jskos-vue-itemList-row":e.rowMode},style:e.styleForItem(e.getItem(a)),"data-uri":e.getItem(a)&&e.getItem(a).uri,draggable:e.rowMode&&!!e.getItem(a),onDragstart:t=>e.dragstart(e.getItem(a)),onDragend:t[1]||(t[1]=(...t)=>e.dragend&&e.dragend(...t)),onClick:n((t=>e.rowMode&&e.$emit("select",{item:e.getItem(a),row:!0})),["stop"])},[l(" Slot before each item's ItemName "),c(e.$slots,"beforeItem",{item:a},void 0,!0),e.getItem(a)?(o(),i(y,g({key:0},e.itemNameOptions,{item:e.getItem(a),draggable:!e.rowMode,onClick:n((t=>e.$emit("select",{item:e.getItem(a),row:!1})),["stop"])}),null,16,["item","draggable","onClick"])):(o(),i(m,{key:1},[l(" Show loading indicator for null values "),l(" TODO: Reconsider. "),p(f,{style:{"align-self":"center"}})],2112)),l(" Slot after each item's ItemName "),c(e.$slots,"afterItem",{item:a},void 0,!0)],46,["data-uri","draggable","onDragstart","onClick"])))),128))])}));k.render=h,k.__scopeId="data-v-29c56390";export{k as _};
