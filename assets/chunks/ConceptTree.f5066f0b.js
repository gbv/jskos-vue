import{f as w,_ as C,g as T,k as $,o as c,i as k,w as y,c as l,l as I,F as O,m,j as L,r as v,p as S,q as _}from"../app.5e7cbef3.js";import{a as V,j as g}from"./utils.a5bf753d.js";import{I as b}from"./ItemList.2975cb63.js";import{A as B}from"./Arrow.3916db28.js";import"./shared.3f0a6f78.js";const A=w({name:"ConceptTree",components:{ItemList:b,Arrow:B},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select","open","close","update:modelValue"],setup(t,{emit:n}){const r=T({}),a=e=>{r[e.uri]=!0,n("open",e)},p=e=>{delete r[e.uri],n("close",e)},u=e=>{r[e.uri]?p(e):a(e)},i=e=>{let o=[],s=e.concept,j=e.depth+1;if(s&&r[s.uri])for(let f of s.narrower||[]){let h={concept:f,depth:j,isSelected:g.compare(t.modelValue,f)};o.push(h),o=o.concat(i(h))}return o};return{items:$(()=>{let e=[];for(let o of t.concepts){let s={concept:o,depth:0,isSelected:g.compare(t.modelValue,o)};e.push(s),t.hierarchy&&(e=e.concat(i(s)))}return e}),isOpen:r,open:a,close:p,toggle:u,jskos:V}},methods:{scrollToUri(t){this.$refs.itemList.scrollToUri(t)}}}),q=["onClick"],F={key:1,class:"jskos-vue-conceptTree-selectedOverlay"};function U(t,n,r,a,p,u){const i=_("arrow"),d=_("item-list");return c(),k(d,S({ref:"itemList"},t.itemListOptions,{class:{"jskos-vue-conceptTree":!0,"jskos-vue-conceptTree-noHierarchy":!t.hierarchy},items:t.items,"item-property":"concept",onSelect:n[0]||(n[0]=e=>{t.$emit("select",e),t.$emit("update:modelValue",e.item)})}),{beforeItem:y(({item:e})=>[(c(!0),l(O,null,I(e.depth,o=>(c(),l("div",{key:o,class:"jskos-vue-conceptTree-depthSpacer"}))),128)),t.hierarchy?(c(),l("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:L(o=>t.toggle(e.concept),["stop"])},[e.concept&&e.concept.narrower&&e.concept.narrower.length!==0?(c(),k(i,{key:0,direction:t.isOpen[e.concept.uri]?"down":"right",clickable:!0},null,8,["direction"])):m("",!0)],8,q)):m("",!0),e.isSelected?(c(),l("div",F)):m("",!0),v(t.$slots,"beforeItem",{item:e.concept})]),afterItem:y(({item:e})=>[v(t.$slots,"afterItem",{item:e.concept})]),_:3},16,["class","items"])}var z=C(A,[["render",U]]);export{z as C};
