import{e,V as t,v as s,x as o,n as i,o as a,c as r,F as m,q as l,k as n,p as c,r as d,s as p,b as u,w as I}from"./app.d85636fc.js";import{_ as y}from"./ItemName.1e241852.js";import{_ as g}from"./LoadingIndicator.10111b36.js";import"./shared.ae523b09.js";const f=e({name:"ItemList",components:{ItemName:y,LoadingIndicator:g},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},rowMode:{type:Boolean,default:!0},itemNameOptions:{type:Object,default:()=>({})},indicatorByUri:{type:Object,default:()=>({})}},emits:["select"],methods:{styleForItem(e){let t={},s=this.indicatorByUri[e&&e.uri];return s||(s="transparent"),!0!==s&&(t["--jskos-vue-itemList-indicator-color"]=s),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const s=this.$el,o=s.querySelectorAll(`[data-uri='${e}']`)[0],i={container:s,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};o&&t.scrollTo(o,200,i)}}}),k=I();s("data-v-1183227e");const v={class:"jskos-vue-itemList"};o();const h=k(((e,t,s,o,I,y)=>{const g=i("item-name"),f=i("loading-indicator");return a(),r("div",v,[(a(!0),r(m,null,l(e.items,(t=>(a(),r("div",{key:e.getItem(t)&&e.getItem(t).uri,class:{"jskos-vue-itemList-row":e.rowMode},style:e.styleForItem(e.getItem(t)),"data-uri":e.getItem(t)&&e.getItem(t).uri,onClick:n((s=>e.rowMode&&e.$emit("select",{item:e.getItem(t),row:!0})),["stop"])},[c(" Slot before each item's ItemName "),d(e.$slots,"beforeItem",{item:t},void 0,!0),e.getItem(t)?(a(),r(g,p({key:0},e.itemNameOptions,{item:e.getItem(t),onClick:n((s=>e.$emit("select",{item:e.getItem(t),row:!1})),["stop"])}),null,16,["item","onClick"])):(a(),r(m,{key:1},[c(" Show loading indicator for null values "),c(" TODO: Reconsider. "),u(f,{style:{"align-self":"center"}})],2112)),c(" Slot after each item's ItemName "),d(e.$slots,"afterItem",{item:t},void 0,!0)],14,["data-uri","onClick"])))),128))])}));f.render=h,f.__scopeId="data-v-1183227e";export{f as _};
