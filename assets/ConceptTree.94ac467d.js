import{e,f as t,k as o,l as s,m as r,o as c,c as i,n as a,b as n,w as l,F as p,p as m,i as d,r as u,q as f,j as h}from"./app.a4c86903.js";import{_ as y}from"./ItemList.f96294f0.js";import{_ as v}from"./Arrow.af6af49d.js";import"./shared.99084317.js";const w=e({name:"ConceptTree",components:{ItemList:y,Arrow:v},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select","open","close","update:modelValue"],setup(e,{emit:r}){const c=t({}),i=e=>{c[e.uri]=!0,r("open",e)},a=e=>{delete c[e.uri],r("close",e)},n=t=>{let o=[],s=t.concept,r=t.depth+1;if(s&&c[s.uri])for(let c of s.narrower||[]){let t={concept:c,depth:r,isSelected:h.exports.compare(e.modelValue,c)};o.push(t),o=o.concat(n(t))}return o};return{items:o((()=>{let t=[];for(let o of e.concepts){let s={concept:o,depth:0,isSelected:h.exports.compare(e.modelValue,o)};t.push(s),e.hierarchy&&(t=t.concat(n(s)))}return t})),isOpen:c,open:i,close:a,toggle:e=>{c[e.uri]?a(e):i(e)},jskos:s}},methods:{scrollToUri(e){this.$refs.itemList.scrollToUri(e)}}}),k={key:1,class:"jskos-vue-conceptTree-selectedOverlay"};w.render=function(e,t,o,s,h,y){const v=r("arrow"),w=r("item-list");return c(),i(p,null,[a(" ConceptTree is basically an extension of ItemList "),n(w,f({ref:"itemList"},e.itemListOptions,{class:{"jskos-vue-conceptTree":!0,"jskos-vue-conceptTree-noHierarchy":!e.hierarchy},items:e.items,"item-property":"concept",onSelect:t[1]||(t[1]=t=>{e.$emit("select",t),e.$emit("update:modelValue",t.item)})}),{beforeItem:l((({item:t})=>[a(" Use divs for depth spacers so we can have visual lines for the hierarchy "),(c(!0),i(p,null,m(t.depth,(e=>(c(),i("div",{key:e,class:"jskos-vue-conceptTree-depthSpacer"})))),128)),a(" Show arrow for concepts with narrower concepts "),e.hierarchy?(c(),i("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:d((o=>e.toggle(t.concept)),["stop"])},[t.concept&&t.concept.narrower&&0!==t.concept.narrower.length?(c(),i(v,{key:0,direction:e.isOpen[t.concept.uri]?"down":"right",clickable:!0},null,8,["direction"])):a("v-if",!0)],8,["onClick"])):a("v-if",!0),a(" Highlight background for row if selected "),a(" Note: We're using a separate div here because we can't add a CSS class to an individual ItemList row "),t.isSelected?(c(),i("div",k)):a("v-if",!0),a(" Slot for additional content before item "),u(e.$slots,"beforeItem",{item:t.concept})])),afterItem:l((({item:t})=>[a(" Slot for additional content after item "),u(e.$slots,"afterItem",{item:t.concept})])),_:3},16,["class","items"])],2112)};export{w as _};
