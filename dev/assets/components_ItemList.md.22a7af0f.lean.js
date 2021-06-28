import{d as n,V as a,p as t,l as s,m as e,o,c as p,F as i,z as l,x as c,q as u,r,b as k,w as d,f as m,a as h,e as g}from"./app.555422d2.js";import{_ as f}from"./ItemName.c45cec94.js";import{_ as w}from"./LoadingIndicator.1f51dfd4.js";import"./shared.81340b07.js";const b=n({name:"ItemList",components:{ItemName:f,LoadingIndicator:w},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},clickable:{type:Boolean,default:!1},indicatorByUri:{type:Object,default:()=>({})},indicatorColor:{type:String,default:"green"}},emits:["select"],methods:{styleForItem(n){let a={},t=this.indicatorByUri[n&&n.uri];return!0===t&&(t=this.indicatorColor),t&&(a.boxShadow=`inset -4px 0px 0px 0px ${t}`),a},getItem(n){return this.itemProperty?n[this.itemProperty]:n},scrollToUri(n){const t=this.$el,s=t.querySelectorAll(`[data-uri='${n}']`)[0],e={container:t,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};s&&a.scrollTo(s,200,e)}}}),I=d();t("data-v-5c723d14");const v={class:"jskos-vue-itemList"};s();const y=I(((n,a,t,s,d,m)=>{const h=e("item-name"),g=e("loading-indicator");return o(),p("div",v,[(o(!0),p(i,null,l(n.items,(a=>(o(),p("div",{key:n.getItem(a)&&n.getItem(a).uri,style:n.styleForItem(n.getItem(a)),"data-uri":n.getItem(a)&&n.getItem(a).uri,onClick:c((t=>n.$emit("select",{item:n.getItem(a),row:!0})),["stop"])},[u(" Slot before each item's ItemName "),r(n.$slots,"beforeItem",{item:a},void 0,!0),n.getItem(a)?(o(),p(h,{key:0,item:n.getItem(a),"show-notation":n.showNotation,"show-label":n.showLabel,clickable:n.clickable,onClick:c((t=>n.$emit("select",{item:n.getItem(a),row:!1})),["stop"])},null,8,["item","show-notation","show-label","clickable","onClick"])):(o(),p(i,{key:1},[u(" Show loading indicator for null values "),u(" TODO: Reconsider. "),k(g,{size:"sm"})],2112)),u(" Slot after each item's ItemName "),r(n.$slots,"afterItem",{item:a},void 0,!0)],12,["data-uri","onClick"])))),128))])}));b.render=y,b.__scopeId="data-v-5c723d14";const _=h('',12),S=g(" 🚀 "),q=h('',1),x='{"title":"ItemList","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Methods","slug":"methods"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemList.md","lastUpdated":1624878705029}',$={};const j=Object.assign($,{expose:[],setup:function(n){const a=[];for(let s=0;s<=15;s+=1)a.push({uri:`uri:${s}`,notation:[`${s}`],prefLabel:{en:`Concept no. ${s}`}});const t=({item:n,row:a})=>{alert(`Item with URI ${n.uri} selected (row: ${a}).`)};return(n,s)=>(o(),p("div",null,[_,k(b,{items:a,clickable:!0,"indicator-by-uri":{"uri:2":!0,"uri:3":!0,"uri:12":"blue","uri:13":"yellow","uri:14":"black"},onSelect:t},{afterItem:m((({item:n})=>[u(" Show a rocket after all items with URIs starting with 1 "),n.uri.startsWith("uri:1")?(o(),p(i,{key:0},[S],2112)):u("v-if",!0)])),_:1}),q]))}});export default j;export{x as __pageData};
